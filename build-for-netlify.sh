#!/bin/bash
set -e

echo "Building for Netlify deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Install specific dependencies that might be causing build issues
echo "Ensuring build dependencies are installed..."
npm install @babel/preset-typescript lightningcss --save-dev

# Build the client
echo "Building client..."
npm run build

# Create the necessary directories for Netlify functions
echo "Preparing Netlify functions directories..."
mkdir -p .netlify/functions
mkdir -p netlify/functions

# Copy any necessary files for serverless functions
echo "Processing Netlify functions..."
# Add any specific processing for functions here if needed

echo "Build completed successfully!"
echo "To deploy to Netlify, use:"
echo "  netlify deploy --prod"
echo " "
echo "Remember to set the DATABASE_URL and SESSION_SECRET in Netlify environment variables."