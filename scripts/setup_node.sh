#!/bin/bash

set -e
set -x

node --version

# NODE_VERSION="20.18.1"
# NVM_DIR="$HOME/.nvm"

# sudo apt-get update && sudo apt-get install -y curl bash
# sudo touch ~/.bash_profile

export NVM_DIR="/var/lib/jenkins/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

nvm install 20.18.1
nvm use 20.18.1
nvm alias default 20.18.1

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

npm install --omit=dev --ignore-scripts


# mkdir -p "$NVM_DIR"
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# export NVM_DIR="$HOME/.nvm"
# . "$NVM_DIR/nvm.sh"

# nvm install "$NODE_VERSION"
# nvm use "$NODE_VERSION"
# nvm alias default "$NODE_VERSION"

# ln -sf "$NVM_DIR/versions/node/v$NODE_VERSION/bin/node" /usr/local/bin/node
# ln -sf "$NVM_DIR/versions/node/v$NODE_VERSION/bin/npm" /usr/local/bin/npm
# ln -sf "$NVM_DIR/versions/node/v$NODE_VERSION/bin/npx" /usr/local/bin/npx

# command -v node && node -v
# command -v npm && npm -v
# command -v npx && npx -v

# npm install --omit=dev --ignore-scripts
