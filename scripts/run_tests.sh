#!/bin/bash

set -e

ENV_FILE=".env"
APP_HEALTHCHECK_URL="http://localhost:3001/healthy"
MAX_RETRIES=10

# Dynamically resolve host IP for use inside containers (works on Linux/Jenkins)
HOST_INTERNAL_IP=$(ip -4 addr show docker0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')

if [ -z "$HOST_INTERNAL_IP" ]; then
  echo "❌ Could not resolve Docker bridge IP. Are you running in Jenkins or a non-Docker environment?"
  exit 1
fi
echo "🔌 Using host IP for host.docker.internal: $HOST_INTERNAL_IP"

if [ ! -f "$ENV_FILE" ]; then
  echo "No .env file found... assuming this is running on pipeline and required values are injected"
else
  MESSAGE_QUEUE_PASSWORD=$(grep -E '^MESSAGE_QUEUE_PASSWORD=' "$ENV_FILE" | cut -d '=' -f2-)
  APPLICATIONINSIGHTS_CONNECTION_STRING=$(grep -E '^APPLICATIONINSIGHTS_CONNECTION_STRING=' "$ENV_FILE" | cut -d '=' -f2-)
  AZURE_STORAGE_CONNECTION_STRING=$(grep -E '^AZURE_STORAGE_CONNECTION_STRING=' "$ENV_FILE" | cut -d '=' -f2-)
fi

if [ -z "$MESSAGE_QUEUE_PASSWORD" ] || [ -z "$APPLICATIONINSIGHTS_CONNECTION_STRING" ] || [ -z "$AZURE_STORAGE_CONNECTION_STRING" ]; then
  echo "❌ Error: One or more required environment variables are missing"
  exit 1
fi

echo "🚀 Starting services..."

# Inject secrets and run docker compose with the correct host IP mapping
sed -E \
  -e "s|(MESSAGE_QUEUE_PASSWORD:).*|\1 ${MESSAGE_QUEUE_PASSWORD}|g" \
  -e "s|(APPLICATIONINSIGHTS_CONNECTION_STRING:).*|\1 ${APPLICATIONINSIGHTS_CONNECTION_STRING}|g" \
  -e "s|(AZURE_STORAGE_CONNECTION_STRING:).*|\1 ${AZURE_STORAGE_CONNECTION_STRING}|g" \
  docker-compose.yml | docker compose --add-host host.docker.internal:$HOST_INTERNAL_IP -f - up -d

WDIO_CONTAINER=$(docker ps -qf "name=wdio-tests")

if [ -z "$WDIO_CONTAINER" ]; then
  echo "❌ Error: WDIO container not found!"
  exit 1
fi

echo "🧪 Running WDIO tests..."

mkdir -p logs
docker image ls --format "{{.Repository}}" | grep '^ffc-ahwr-' | grep -v '^ffc-ahwr-application-development$' | xargs -I {} sh -c 'docker compose logs -f "{}" > logs/{}.log 2>&1 &'

docker exec -i --user root "$WDIO_CONTAINER" npm run test | tee logs/wdio_test_output.log
EXIT_CODE=${PIPESTATUS[0]}

echo "🛑 Stopping services..."
docker compose down

exit $EXIT_CODE
