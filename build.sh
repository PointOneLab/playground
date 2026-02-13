#!/bin/bash

# ============================================
# Build Script — PointOneLab Playground
# Concatenates vendor libs + project scripts
# into a single bundle: dist/bundle.js
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

OUTPUT="dist/bundle.js"

# Ensure dist/ directory exists
mkdir -p dist

echo "Building bundle..."

# Concatenate in dependency order
# Each file is separated by a newline + semicolon for safety
cat \
  vendor/gsap.min.js \
  vendor/Draggable.min.js \
  vendor/rough.min.js \
  vendor/prism.min.js \
  vendor/typed.min.js \
  get-page-id.js \
  collection-visibility.js \
  itemhovershow-sizing.js \
  audio-processing.js \
  widget-code-injection.js \
  posts-structure.js \
  code-display.js \
  info-guide-visibility.js \
  dark-light-mode.js \
  typewriter.js \
  main-ui.js \
  dynamic-sizing.js \
  dev-mode.js \
  > "$OUTPUT"

# Report result
FILE_SIZE=$(wc -c < "$OUTPUT" | tr -d ' ')
echo "Build complete: $OUTPUT ($FILE_SIZE bytes)"
