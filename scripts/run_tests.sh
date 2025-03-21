#!/bin/bash

set -e

ENV_FILE=".env"
APP_HEALTHCHECK_URL="http://localhost:3001/healthy"
MAX_RETRIES=10

if [ ! -f "$ENV_FILE" ]; then
  echo "No .env file found... assuming this is running on pipeline and required values are injected"
else
  MESSAGE_QUEUE_PASSWORD=$(grep -E '^MESSAGE_QUEUE_PASSWORD=' "$ENV_FILE" | cut -d '=' -f2-)
  APPLICATIONINSIGHTS_CONNECTION_STRING=$(grep -E '^APPLICATIONINSIGHTS_CONNECTION_STRING=' "$ENV_FILE" | cut -d '=' -f2-)
fi

if [ -z "$MESSAGE_QUEUE_PASSWORD" ] || [ -z "$APPLICATIONINSIGHTS_CONNECTION_STRING" ]; then
  echo "❌ Error: One or more required environment variables are missing"
  exit 1
fi

echo "🚀 Starting services..."

# Use sed to inject environment variables into docker-compose without modifying the file
sed -E \
    -e "s|(MESSAGE_QUEUE_PASSWORD:).*|\1 ${MESSAGE_QUEUE_PASSWORD}|g" \
    -e "s|(APPLICATIONINSIGHTS_CONNECTION_STRING:).*|\1 ${APPLICATIONINSIGHTS_CONNECTION_STRING}|g" \
    docker-compose.yml | docker compose -f - up -d

WDIO_CONTAINER=$(docker ps -qf "name=wdio-tests")

if [ -z "$WDIO_CONTAINER" ]; then
  echo "❌ Error: WDIO container not found!"
  exit 1
fi

echo "🧪 Running WDIO tests..."

mkdir -p logs

docker compose logs -f "ffc-ahwr-application" > logs/application.log 2>&1 &
docker compose logs -f "ffc-ahwr-farmer-apply" > logs/farmer-apply.log 2>&1 &
docker compose logs -f "ffc-ahwr-farmer-claim" > logs/farmer-claim.log 2>&1 &
docker compose logs -f "ffc-ahwr-dashboard" > logs/dashboard.log 2>&1 &
docker compose logs -f "ffc-ahwr-backoffice" > logs/backoffice.log 2>&1 &

docker exec -i "$WDIO_CONTAINER" npm run test | tee logs/wdio_test_output.log
EXIT_CODE=${PIPESTATUS[0]}

echo "🛑 Stopping services..."
docker compose down

exit $EXIT_CODE
