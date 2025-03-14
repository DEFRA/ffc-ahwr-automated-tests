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

# Install Docker
RUN apt-get update && apt-get install -y \
    docker.io \
    && rm -rf /var/lib/apt/lists/*  # Clean up APT cache

# Verify installations
RUN az --version && docker --version
