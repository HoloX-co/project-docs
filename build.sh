#!/bin/bash
set -e

# Specify the base URL
BASE_URL=${1:-"http://localhost:1313"}

echo "Using base URL: $BASE_URL"

# Version configuration - modify these arrays to specify versions to build
# Format: "ref:display_name" (ref can be tag, branch, or commit hash)
MAIN_VERSION="main:latest"
VERSIONS=(
  "main:latest"  # Current version
  # Add more versions as you create releases
  # "v1.0.0:v1.0"
  # "v0.9.0:v0.9"
)

# Parse main version
IFS=':' read -r MAIN_REF MAIN_NAME <<< "$MAIN_VERSION"

# Ensure clean public directory
rm -rf public
mkdir -p public
mkdir -p public/versions

# Store current branch to return to later
CURRENT_BRANCH=$(git branch --show-current)

# Checkout and build main site
echo "Building main site from $MAIN_REF"
git checkout $MAIN_REF
GIT_HASH=$(git rev-parse --short HEAD)
echo "Building from commit: $GIT_HASH"

# Build main site (no version prefix)
hugo \
  --minify \
  --baseURL "$BASE_URL/" \
  --destination=public

# Build all versions
for VERSION in "${VERSIONS[@]}"; do
  IFS=':' read -r REF NAME <<< "$VERSION"

  echo "Building version $NAME from $REF"
  git checkout $REF
  GIT_HASH=$(git rev-parse --short HEAD)
  echo "Building from commit: $GIT_HASH"

  mkdir -p "public/versions/$NAME"
  hugo \
    --minify \
    --baseURL "$BASE_URL/versions/$NAME/" \
    --destination="public/versions/$NAME"
done

# Return to original branch
git checkout $CURRENT_BRANCH

echo "Build completed successfully"
echo "Main site: $BASE_URL"
echo "Versions available at: $BASE_URL/versions/"