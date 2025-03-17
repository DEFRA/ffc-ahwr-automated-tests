FROM node:20.18.1-bullseye

# Install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg

# Add Docker’s official GPG key
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the Docker stable repository
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker (substitute with an available version)
RUN apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io

# Create docker group and add node user to it
# RUN groupadd -g 999 docker && usermod -aG docker node

# Ensure Docker socket has proper permissions
RUN chmod 666 /var/run/docker.sock

# Verify Docker installation
RUN docker --version