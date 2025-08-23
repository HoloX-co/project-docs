#!/bin/bash
set -e

# Specify the base URL
BASE_URL=${1:-"http://localhost:1313"}

echo "Using base URL: $BASE_URL"

# Ensure clean public directory
rm -rf public
mkdir -p public

# Get current git hash for reference
GIT_HASH=$(git rev-parse --short HEAD)
echo "Building from commit: $GIT_HASH"

# Build the site
hugo \
  --minify \
  --baseURL "$BASE_URL/" \
  --destination=public

echo "Build completed successfully"
echo "Site available at: $BASE_URL"