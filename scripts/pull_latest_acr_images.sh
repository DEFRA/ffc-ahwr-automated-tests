#!/bin/bash

ACR_NAME="DEVFFCINFAC1001"
IMAGES=(
  "ffc-ahwr-dashboard"
  "ffc-ahwr-application"
  "ffc-ahwr-farmer-apply"
  "ffc-ahwr-farmer-claim"
  "ffc-ahwr-backoffice"
)

# Log in to ACR
az acr login --name "$ACR_NAME"

# Log Docker into ACR
TOKEN=$(az acr login --name "$ACR_NAME" --expose-token --output tsv --query accessToken)
echo "$TOKEN" | docker login "$ACR_NAME.azurecr.io" --username 00000000-0000-0000-0000-000000000000 --password-stdin

get_latest_tag() {
  az acr repository show-tags \
    --name "$ACR_NAME" \
    --repository "$1" \
    --orderby time_desc \
    --query "[0]" \
    --output tsv
}

# Pull latest images
for IMAGE in "${IMAGES[@]}"; do
  LATEST_TAG=$(get_latest_tag "$IMAGE")
  VERSION="${LATEST_TAG#helm-}"

  if [ -z "$LATEST_TAG" ]; then
    echo "⚠️  No tags found for $IMAGE. Skipping."
    continue
  fi

  FULL_IMAGE="$ACR_NAME.azurecr.io/$IMAGE:$VERSION"
  echo "🚀 Pulling $FULL_IMAGE..."
  docker pull "$FULL_IMAGE"

  # Retag to 'latest' and remove the old tag to avoid duplicates
  docker tag "$FULL_IMAGE" "$IMAGE:latest"
  docker rmi "$FULL_IMAGE" >/dev/null 2>&1

  echo "🔄 Tagged $IMAGE:latest and removed $FULL_IMAGE."
done


echo "✅ Latest images pulled and tagged as 'latest'."
