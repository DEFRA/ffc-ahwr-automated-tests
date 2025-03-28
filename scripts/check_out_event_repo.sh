#!/bin/bash

# Load environment variables from .env
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Variables
REPO_URL="https://github.com/DEFRA/ffc-ahwr-event"
TARGET_DIR="event-repo"

# Remove the directory if it already exists
if [ -d "$TARGET_DIR" ]; then
  echo "Removing existing directory: $TARGET_DIR"
  rm -rf "$TARGET_DIR"
fi

# Clone the repository
git clone "$REPO_URL" "$TARGET_DIR"

# Verify success
if [ $? -eq 0 ]; then
  echo "Repository cloned successfully into $TARGET_DIR"
else
  echo "Failed to clone repository"
  exit 1
fi

# Navigate into the repository
cd "$TARGET_DIR" || exit

# Check if .local.settings.json exists
if [ -f ".local.settings.json" ]; then
  cp .local.settings.json local.settings.json
  echo "Copied .local.settings.json to local.settings.json"

  # Update ServiceBusConnectionString with environment variable
  if [ -n "$SERVICE_BUS_CONNECTION_STRING" ]; then
    jq --arg sbcs "$SERVICE_BUS_CONNECTION_STRING" '.Values.ServiceBusConnectionString = $sbcs' local.settings.json > temp.json && mv temp.json local.settings.json
    echo "Updated ServiceBusConnectionString in local.settings.json"
  else
    echo "SERVICE_BUS_CONNECTION_STRING environment variable is not set!"
    exit 1
  fi

  # Update AHWR_EVENT_QUEUE with MESSAGE_QUEUE_SUFFIX
  if [ -n "$MESSAGE_QUEUE_SUFFIX" ]; then
    jq --arg suffix "$MESSAGE_QUEUE_SUFFIX" '.Values.AHWR_EVENT_QUEUE += $suffix' local.settings.json > temp.json && mv temp.json local.settings.json
    echo "Updated AHWR_EVENT_QUEUE with suffix: $MESSAGE_QUEUE_SUFFIX"
  else
    echo "MESSAGE_QUEUE_SUFFIX environment variable is not set!"
    exit 1
  fi

else
  echo "File .local.settings.json not found!"
  exit 1
fi

npm i
