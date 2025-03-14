#!/bin/bash

set -e  # Exit script on error

ENV_FILE=".env"
APP_HEALTHCHECK_URL="http://localhost:3001/healthy"
MAX_RETRIES=10

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: .env file not found!"
  exit 1
fi

APPLICATIONINSIGHTS_CONNECTION_STRING=$(grep -E '^APPLICATIONINSIGHTS_CONNECTION_STRING=' "$ENV_FILE" | cut -d '=' -f2-)
MESSAGE_QUEUE_PASSWORD=$(grep -E '^MESSAGE_QUEUE_PASSWORD=' "$ENV_FILE" | cut -d '=' -f2-)

if [ -z "$MESSAGE_QUEUE_PASSWORD" ] || [ -z "$APPLICATIONINSIGHTS_CONNECTION_STRING" ]; then
  echo "❌ Error: One or more values missing from .env!"
  exit 1
fi

# Use sed to inject environment variables into docker-compose without modifying the file
sed -E \
    -e "s|(MESSAGE_QUEUE_PASSWORD:).*|\1 ${MESSAGE_QUEUE_PASSWORD}|g" \
    -e "s|(APPLICATIONINSIGHTS_CONNECTION_STRING:).*|\1 ${APPLICATIONINSIGHTS_CONNECTION_STRING}|g" \
    docker-compose.yml | docker compose -f - up -d

echo "🚀 Starting main application services..."
echo "⏳ Waiting for the application service to respond..."

RETRIES=0
until [[ "$(curl -s -o /dev/null -w "%{http_code}" $APP_HEALTHCHECK_URL)" == "200" ]]; do
  if [[ $RETRIES -ge $MAX_RETRIES ]]; then
    echo "❌ Error: Application service did not become ready in time!"
    docker compose logs application  # Show logs for debugging
    exit 1
  fi
  sleep 1
  ((RETRIES++))
  echo "🔄 Still waiting for application service... ($RETRIES/$MAX_RETRIES)"
done

echo "✅ Application service is ready!"

WDIO_CONTAINER=$(docker ps -qf "name=wdio-tests")

if [ -z "$WDIO_CONTAINER" ]; then
  echo "❌ Error: WDIO container not found!"
  exit 1
fi

echo "🧪 Running WDIO tests..."
mkdir -p logs
docker exec -it "$WDIO_CONTAINER" npm run wdio | tee logs/wdio_test_output.log
EXIT_CODE=${PIPESTATUS[0]}

echo "🛑 Stopping services..."
docker compose down

exit $EXIT_CODE
