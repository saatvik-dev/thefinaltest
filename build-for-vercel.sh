#!/bin/bash

# Build script for Vercel deployment

echo "Setting up environment..."
export NODE_ENV=production

echo "Building client application..."
npm run build

echo "Building server application..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"