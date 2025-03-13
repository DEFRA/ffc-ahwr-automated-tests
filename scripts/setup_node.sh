#!/bin/bash

set -e

node --version

ldd --version

export NVM_DIR="/var/lib/jenkins/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

nvm install 16.20.2
nvm install 20.18.1
nvm use 20.18.1
nvm alias default 20.18.1

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

npm install --omit=dev --ignore-scripts
