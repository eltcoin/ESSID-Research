#!/bin/bash

# Create a new directory for the webapp
mkdir my-webapp
cd my-webapp

# Initialize npm
npm init -y

# Install dependencies
npm install graphology d3 bootstrap

# Create index.html file
touch index.html

rm init.sh
