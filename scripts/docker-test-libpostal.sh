#!/bin/sh
# This script uses the docker image to test the application with `libpostal`

DOCKER_IMAGE_NAME="tester"

# Ensure the docker image is already built
docker images -q "$DOCKER_IMAGE_NAME" > /dev/null || exit 1

# Execute the test within a docker container
docker run --rm "$DOCKER_IMAGE_NAME" ./test-functional/test-strings.ci.js
