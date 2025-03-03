# 📦 ffc-ahwr-automated-tests

## 📝 Table of Contents
- [📖 Overview](#-overview)
- [🚀 Prerequisites](#️-prerequisites)
- [🧪 Running Automated Tests](#-running-automated-tests)
- [🙈 Gotchas](#-gotchas)

---

## 📖 Overview
This project is home to the Vets Visits teams automated tests. We pull the images for the services we need to run the project locally,
run them in a Docker container, and then run Webdriver IO automated tests to validate the key journeys work. These can be run in the pipeline
as well as locally.

We use the pull_lats_acr_images script inside the /scripts folder to pull the latest images from ACR in Azure for the services we need to run. Once we have these, 
we can use the run_tests script to set some env vars, and it uses docker compose to start the needed services, before the Webdriver IO tests execute.

---

## 🚀 Prerequisites
- macOS (this repo has been developed on a Macbook laptop, so if you are running Windows it probably needs some changes to get it to work)
- Node version 20+
- Azure login for Dev tenant
- Make sure you are on the VPN
- Docker
- Create a .env file in the root of the repo
- Make sure you have MESSAGE_QUEUE_PASSWORD, AZURE_STORAGE_CONNECTION_STRING and APPLICATIONINSIGHTS_CONNECTION_STRING in your .env file
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

## 🙈 Gotchas

- We use the -auto queues that have been created in the SND2 environment. When the tests run in the pipeline, they will use the -pipe queues. This
is to avoid clashes where if someone still has the images running locally, they might consume the messages for someone else running them. If wanted,
this could be avoided by people creating their own -auto-INITIALS_HERE queues - but it likely wont be needed because its likely only 1 person is
working on these tests at one moment.

- The repo has been developed to work on macOS. This means you might struggle to run it on Windows, unless you can make alterations to scripts etc.