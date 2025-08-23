#!/bin/bash
set -e

# Specify the base URL
BASE_URL=${1:-"http://localhost:1313/project-docs/"}
Folder_Name=${2:-"project-docs"}

echo "Using base URL: $BASE_URL"

# Ensure clean public directory
rm -rf ${Folder_Name}
mkdir -p ${Folder_Name}

# Get current git hash for reference
GIT_HASH=$(git rev-parse --short HEAD)
echo "Building from commit: $GIT_HASH"

# Build the site
npm run build:css
hugo \
  --minify \
  --baseURL "$BASE_URL/" \
  --destination="${Folder_Name}"

echo "Build completed successfully"
echo "Site available at: $BASE_URL"