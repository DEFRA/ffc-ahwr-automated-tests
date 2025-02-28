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

We use the script inside the /scripts folder in conjunction with the images.txt file, to pull the latest images from ACR in Azure for the
services we need to run. Once we have these, we can use the docker compose to start the needed services, before the Webdriver IO tests
execute.

---

## 🚀 Prerequisites
- Node version 20+
- Azure login for Dev tenant
- Docker

## 🧪 Running Automated Tests

```bash
# Install dependencies
npm install

# Pull latest images
cd scripts
./pull_latest_acr_images.sh

# Run tests
docker compose up
```