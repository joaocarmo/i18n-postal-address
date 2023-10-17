#!/bin/sh
# This script builds the docker image to test the application with `libpostal`

DOCKER_IMAGE_NAME="tester"

# Enable BuildKit
export DOCKER_BUILDKIT=1

docker build --target "$DOCKER_IMAGE_NAME" -t "$DOCKER_IMAGE_NAME" .
