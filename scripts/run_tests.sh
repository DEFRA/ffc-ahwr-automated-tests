#!/bin/bash

set -e

TEST_COMMAND="$1"
CLAIM_COMPLIANCE_CHECK_RATIO="$2"

if [ -z "$TEST_COMMAND" ]; then
  echo "❌ Error: No test command provided. Usage: ./run-tests.sh <preMH|postMH|comp|compFA>"
  exit 1
fi

if [[ "$TEST_COMMAND" == "postMH" ]]; then
  MULTI_HERDS_ENABLED="true"
elif [[ "$TEST_COMMAND" == "preMH" ]]; then
  MULTI_HERDS_ENABLED="false"
elif [[ "$TEST_COMMAND" == "comp" ]]; then
  MULTI_HERDS_ENABLED="true"
elif [[ "$TEST_COMMAND" == "compFA" ]]; then
  MULTI_HERDS_ENABLED="true"
  FEATURE_ASSURANCE_ENABLED="true"
else
  echo "❌ Invalid TEST_COMMAND: $TEST_COMMAND (expected 'preMH' or 'postMH' or 'comp' or 'compFA')"
  exit 1
fi

ENV_FILE=".env"
APP_HEALTHCHECK_URL="http://localhost:3001/healthy"
MAX_RETRIES=10

# Resolve Docker host IP (only needed for Linux/Jenkins)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  HOST_INTERNAL_IP=$(ip -4 addr show docker0 | awk '/inet / {print $2}' | cut -d/ -f1)
  if [ -z "$HOST_INTERNAL_IP" ]; then
    echo "❌ Could not resolve Docker bridge IP. Are you running inside Jenkins/Docker?"
    exit 1
  fi
  echo "🔌 Using host IP for host.docker.internal: $HOST_INTERNAL_IP"
else
  echo "🖥️  Detected non-Linux OS ($OSTYPE) — skipping IP mapping, Docker handles host.docker.internal on Mac/Windows"
  HOST_INTERNAL_IP="host-gateway"
fi


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

# Run docker compose after injecting secrets and replacing host IP placeholder
SED_ARGS=(
  -e "s|(MESSAGE_QUEUE_PASSWORD:).*|\1 ${MESSAGE_QUEUE_PASSWORD}|g"
  -e "s|(APPLICATIONINSIGHTS_CONNECTION_STRING:).*|\1 ${APPLICATIONINSIGHTS_CONNECTION_STRING}|g"
  -e "s|(AZURE_STORAGE_CONNECTION_STRING:).*|\1 ${AZURE_STORAGE_CONNECTION_STRING}|g"
  -e "s|(MULTI_HERDS_ENABLED:).*|\1 ${MULTI_HERDS_ENABLED}|g"
  -e "s|host.docker.internal:JENKINS-PORT|host.docker.internal:${HOST_INTERNAL_IP}|g"
)

if [[ -n "${CLAIM_COMPLIANCE_CHECK_RATIO:-}" ]]; then
  SED_ARGS+=(-e "s|(CLAIM_COMPLIANCE_CHECK_RATIO:).*|\1 ${CLAIM_COMPLIANCE_CHECK_RATIO}|g")
fi
if [[ -n "${FEATURE_ASSURANCE_ENABLED:-}" ]]; then
  SED_ARGS+=(-e "s|(FEATURE_ASSURANCE_ENABLED:).*|\1 ${FEATURE_ASSURANCE_ENABLED}|g")
fi

sed -E "${SED_ARGS[@]}" docker-compose.yml | docker compose -f - up -d

WDIO_CONTAINER=$(docker ps -qf "name=wdio-tests")

if [ -z "$WDIO_CONTAINER" ]; then
  echo "❌ Error: WDIO container not found!"
  exit 1
fi

echo "🧪 Running WDIO tests: "$TEST_COMMAND""

LOG_DIR="logs"
if [[ "$TEST_COMMAND" == "postMH" ]]; then
  LOG_DIR="logsMH"
elif [[ "$TEST_COMMAND" == "comp" ]]; then
  LOG_DIR="logsComp"
elif [[ "$TEST_COMMAND" == "compFA" ]]; then
  LOG_DIR="logsCompFA"
fi

mkdir -p "$LOG_DIR"

docker image ls --format "{{.Repository}}" | grep '^ffc-ahwr-' | grep -v '^ffc-ahwr-application-development$' | xargs -I {} sh -c "docker compose logs -f \"{}\" > $LOG_DIR/{}.log 2>&1 &"

docker exec -i --user root "$WDIO_CONTAINER" npm run test:"$TEST_COMMAND" | tee "$LOG_DIR/wdio_test_output.log"
EXIT_CODE=${PIPESTATUS[0]}

echo "🛑 Stopping services..."
docker compose down

exit $EXIT_CODE
