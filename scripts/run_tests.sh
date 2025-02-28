#!/bin/bash

# Path to .env and docker-compose.yml
ENV_FILE=".env"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Load environment variables from .env
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: .env file not found!"
  exit 1
fi

# Extract values safely, preserving special characters
MESSAGE_QUEUE_PASSWORD=$(grep -E '^MESSAGE_QUEUE_PASSWORD=' "$ENV_FILE" | cut -d '=' -f2-)
AZURE_STORAGE_CONNECTION_STRING=$(grep -E '^AZURE_STORAGE_CONNECTION_STRING=' "$ENV_FILE" | cut -d '=' -f2-)
APPLICATIONINSIGHTS_CONNECTION_STRING=$(grep -E '^APPLICATIONINSIGHTS_CONNECTION_STRING=' "$ENV_FILE" | cut -d '=' -f2-)

# Ensure values are not empty
if [ -z "$MESSAGE_QUEUE_PASSWORD" ] || [ -z "$AZURE_STORAGE_CONNECTION_STRING" ] || [ -z "$APPLICATIONINSIGHTS_CONNECTION_STRING" ]; then
  echo "❌ Error: One or more required environment variables are missing in .env!"
  exit 1
fi

# Use sed to substitute values correctly without extra quotes
sed -E \
    -e "s|(MESSAGE_QUEUE_PASSWORD:).*|\1 ${MESSAGE_QUEUE_PASSWORD}|g" \
    -e "s|(AZURE_STORAGE_CONNECTION_STRING:).*|\1 ${AZURE_STORAGE_CONNECTION_STRING}|g" \
    -e "s|(APPLICATIONINSIGHTS_CONNECTION_STRING:).*|\1 ${APPLICATIONINSIGHTS_CONNECTION_STRING}|g" \
    "$DOCKER_COMPOSE_FILE" | docker compose -f - up -d

echo "✅ Docker Compose started with updated environment variables!"
