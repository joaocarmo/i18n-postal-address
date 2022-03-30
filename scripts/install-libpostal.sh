#!/bin/sh
# This script installs libpostal
# @source: https://github.com/openvenues/libpostal

BASE_DIR=$HOME/.libpostal
DATA_DIR=$BASE_DIR/data

git clone https://github.com/openvenues/libpostal "$BASE_DIR"

cd "$BASE_DIR" || exit 1

make distclean

./bootstrap.sh

mkdir -p "$DATA_DIR"

if [ "$(uname)" = "Darwin" ] && [ "$(uname -m)" = "arm64" ]; then
  # Handle macOS with Apple silicon
  ./configure --disable-sse2 --datadir="$DATA_DIR"
else
  ./configure --datadir="$DATA_DIR"
fi

make -j4

if [ -x "$(command -v sudo)" ]; then
  sudo make install

  if [ "$(uname)" = "Linux" ]; then
    # On Linux it's probably a good idea to run
    sudo ldconfig
  fi
else
  # For Docker builds, sudo is not available
  make install

  if [ "$(uname)" = "Linux" ]; then
    ldconfig
  fi
fi
