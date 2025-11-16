#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$SCRIPT_DIR/src"
OUTPUT_ZIP="$SCRIPT_DIR/momo-extension.zip"

echo "📦 Packaging Momo Chrome Extension..."
echo ""

if [ ! -d "$SRC_DIR" ]; then
  echo "❌ Error: src/ directory not found"
  exit 1
fi

if [ -f "$OUTPUT_ZIP" ]; then
  echo "🗑️  Removing existing ZIP..."
  rm "$OUTPUT_ZIP"
fi

echo "📁 Creating ZIP package..."
cd "$SRC_DIR"

zip -r "$OUTPUT_ZIP" . \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x ".claude/*" \
  -x "README.md" \
  -x "CLAUDE.md" \
  -x "icons/README.md" \
  -x "icons/momo.png"

cd "$SCRIPT_DIR"

if [ -f "$OUTPUT_ZIP" ]; then
  SIZE=$(du -h "$OUTPUT_ZIP" | cut -f1)
  echo ""
  echo "✅ Package created successfully!"
  echo "📦 File: momo-extension.zip"
  echo "💾 Size: $SIZE"
  echo ""
  echo "📋 What's included:"
  echo "   - manifest.json"
  echo "   - All JavaScript files (background.js, content.js, kuromoji.js, popup.js)"
  echo "   - All HTML/CSS files (popup, welcome, tooltip, privacy-policy)"
  echo "   - Icons (icon16.png, icon48.png, icon128.png)"
  echo "   - Data files (jlpt-lookup.json, dict/*.dat.gz)"
  echo ""
  echo "🚫 What's excluded:"
  echo "   - .claude/ (Claude Code configuration)"
  echo "   - README.md, CLAUDE.md (documentation)"
  echo "   - icons/README.md, icons/momo.png (development files)"
  echo ""
  echo "🎯 Ready for Chrome Web Store submission!"
  echo "   Upload to: https://chrome.google.com/webstore/devconsole"
else
  echo "❌ Error: Failed to create ZIP package"
  exit 1
fi
