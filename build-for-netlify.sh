#!/bin/bash
set -e

echo "Building for Netlify deployment..."

# Install dependencies
npm ci

# Build the client and server
echo "Building client..."
npm run build

# Create the necessary directories for Netlify functions
mkdir -p .netlify/functions
mkdir -p netlify/functions

echo "Build completed successfully!"
echo "To deploy to Netlify, use:"
echo "  netlify deploy --prod"
echo " "
echo "Remember to set the DATABASE_URL and SESSION_SECRET in Netlify environment variables."