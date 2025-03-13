#!/bin/bash
set -e

NODE_VERSION=20.18.1
export NVM_DIR="$HOME/.nvm"

# sudo apt-get update && sudo apt-get install -y curl bash

if [ ! -d "$NVM_DIR" ]; then
  git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout v0.39.0
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"
nvm alias default "$NODE_VERSION"

# Ensure Node.js and npm are available
ln -sf "$NVM_DIR/versions/node/v$NODE_VERSION/bin/node" "$HOME/bin/node"
ln -sf "$NVM_DIR/versions/node/v$NODE_VERSION/bin/npm" "$HOME/bin/npm"
ln -sf "$NVM_DIR/versions/node/v$NODE_VERSION/bin/npx" "$HOME/bin/npx"

# Verify installation
node -v
npm -v
