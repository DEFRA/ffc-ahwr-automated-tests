# Start from the Docker-in-Docker image
FROM docker:latest

# Install dependencies for NVM and Node.js
RUN apk add --no-cache \
    curl \
    bash \
    git \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && source $NVM_DIR/nvm.sh \
    && nvm install 20.18.1 \
    && nvm use 20.18.1 \
    && nvm alias default 20.18.1 \
    && echo "source $NVM_DIR/nvm.sh" >> ~/.bashrc \
    && adduser root docker \
    && ln -s $NVM_DIR/versions/node/v20.18.1/bin/node /usr/local/bin/node \
    && ln -s $NVM_DIR/versions/node/v20.18.1/bin/npm /usr/local/bin/npm \
    && ln -s $NVM_DIR/versions/node/v20.18.1/bin/npx /usr/local/bin/npx \
    && echo "source $NVM_DIR/nvm.sh" >> /etc/profile

# Set the default command to bash
CMD ["/bin/bash", "-c", "source $HOME/.nvm/nvm.sh && bash"]