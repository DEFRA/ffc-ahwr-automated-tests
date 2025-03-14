FROM node:20.18.1-bullseye

# Install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg

# Add Microsoft's signing key and repository for Azure CLI
RUN curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /usr/share/keyrings/microsoft.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/azure-cli/ bullseye main" | tee /etc/apt/sources.list.d/azure-cli.list

# Install Azure CLI
RUN apt-get update && apt-get install -y azure-cli

# Add Docker’s official GPG key
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the Docker stable repository
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker 27.4.0
RUN apt-get update && apt-get install -y docker-ce=5:27.4.0~3-0~debian-bullseye docker-ce-cli=5:27.4.0~3-0~debian-bullseye containerd.io

# Verify installations
RUN az --version && docker --version
