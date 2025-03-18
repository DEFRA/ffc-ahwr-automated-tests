FROM --platform=linux/amd64 selenium/standalone-chrome:133.0-20250222

WORKDIR /app
ADD . /app

USER root

ENV NODE_VERSION=20.18.1
ENV NVM_DIR=/app/.nvm

# Install Node.js with NVM
RUN apt-get update && apt-get install -y curl bash libxss1 libappindicator3-1 libindicator7 \
    && mkdir -p "$NVM_DIR" \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" \
    && nvm install ${NODE_VERSION} \
    && nvm use ${NODE_VERSION} \
    && nvm alias default ${NODE_VERSION} \
    && ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/node" /usr/local/bin/node \
    && ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/npm" /usr/local/bin/npm \
    && ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/npx" /usr/local/bin/npx \
    && npm install --omit=dev --ignore-scripts \
    && useradd -m appuser \
    && chown -R appuser:appuser /app

# Switch to non-root user for runtime
USER appuser

ENV PATH="$NVM_DIR/versions/node/v${NODE_VERSION}/bin/:$PATH"

CMD ["tail", "-f", "/dev/null"]
