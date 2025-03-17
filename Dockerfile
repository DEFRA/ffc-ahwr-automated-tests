FROM --platform=linux/amd64 node:20.18.1-bullseye

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    sudo \
    libnss \
    libnss3-dev \
    libgdk-pixbuf2.0-dev \
    libgtk-3-dev \
    libxss-dev

# Add Docker’s official GPG key and set up the stable repository
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker engine packages from the Docker repository
RUN apt-get update && apt-get install -y \
    docker-ce-cli \
    docker-buildx-plugin \
    docker-compose-plugin

# Verify Docker installation
RUN docker --version
