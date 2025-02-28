# 📦 ffc-ahwr-automated-tests

## 📝 Table of Contents
- [📖 Overview](#-overview)
- [⚙️ Prerequisites](#️-prerequisites)
- [🧪 Running Automated Tests](#-running-automated-tests)

---

## 📖 Overview
This project is home to the Vets Visits teams automated tests. We pull the images for the services we need to run the project locally,
run them in a Docker container, and then run Webdriver IO automated tests to validate the key journeys work. These can be run in the pipeline
as well as locally.

We use the pull_lats_acr_images script inside the /scripts folder to pull the latest images from ACR in Azure for the services we need to run. Once we have these, 
we can use the run_tests script to set some env vars, and it uses docker compose to start the needed services, before the Webdriver IO tests execute.

---

## 🚀 Prerequisites
- Node version 20+
- Azure login for Dev tenant
- Docker
- Make sure you have MESSAGE_QUEUE_PASSWORD, AZURE_STORAGE_CONNECTION_STRING and APPLICATIONINSIGHTS_CONNECTION_STRING in a .env file in the root of the repo
- You can find these values by speaking to a dev

## 🧪 Running Automated Tests

```bash
# Install dependencies
npm install

# Log into Azure, and select the Dev tenant when prompted
az login

# Pull latest images
./scripts/pull_latest_acr_images.sh

# Run tests - click into the wduo-tests image in Docker desktop to see the logs, where you can see the test running
./scripts/run_tests.sh

```