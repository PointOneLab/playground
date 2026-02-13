#!/bin/bash

# ============================================
# Build Script — PointOneLab Playground
# Concatenates vendor libs + project scripts
# into a single bundle: dist/bundle.js
#
# Each file is wrapped in a try-catch IIFE to
# isolate errors (mimics separate <script> tags).
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

OUTPUT="dist/bundle.js"

# Ensure dist/ directory exists
mkdir -p dist

# File list in dependency order
FILES=(
  vendor/gsap.min.js
  vendor/Draggable.min.js
  vendor/rough.min.js
  vendor/prism.min.js
  get-page-id.js
  collection-visibility.js
  itemhovershow-sizing.js
  audio-processing.js
  widget-code-injection.js
  posts-structure.js
  code-display.js
  info-guide-visibility.js
  dark-light-mode.js
  main-ui.js
  dynamic-sizing.js
  dev-mode.js
)

echo "Building bundle..."

# Clear the output file
> "$OUTPUT"

# Wrap each file in a try-catch IIFE for error isolation
for FILE in "${FILES[@]}"; do
  echo "/* === $FILE === */" >> "$OUTPUT"
  echo ";(function() { try {" >> "$OUTPUT"
  cat "$FILE" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo "} catch(e) { console.error('[${FILE}]', e); } })();" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
done

# Report result
FILE_SIZE=$(wc -c < "$OUTPUT" | tr -d ' ')
echo "Build complete: $OUTPUT ($FILE_SIZE bytes)"
