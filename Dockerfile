FROM docker:dind

RUN apk update && apk add --no-cache \
    curl \
    bash \
    ca-certificates \
    libmagic \
    gnupg \
    && update-ca-certificates

ENV NODE_VERSION=20.18.1
ENV NVM_DIR=/app/.nvm

RUN mkdir -p "$NVM_DIR" \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
    && bash -c "source $NVM_DIR/nvm.sh && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION} && nvm alias default ${NODE_VERSION}" \
    && ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/node" /usr/local/bin/node \
    && ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/npm" /usr/local/bin/npm \
    && ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/npx" /usr/local/bin/npx

RUN bash -c "source /app/.nvm/nvm.sh && node --version && docker --version"
