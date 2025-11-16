# Momo - Kanji Dictionary

A Chrome extension that shows Japanese Kanji translations and readings when you hover over them.

## Features (POC)

- Hover over Japanese Kanji to see instant translations
- **🎯 Manual selection priority**: Highlight text for precise translations (takes precedence over auto-detection)
- **🤖 Smart tokenization**: Uses Kuromoji.js for accurate Japanese word segmentation
- **📊 JLPT Level Display**: Shows color-coded JLPT proficiency badges (N5-N1)
  - N5 (green) → N1 (red) gradient for visual difficulty indication
  - 13,000+ words with JLPT level data
- Proper word boundary detection for compounds (e.g., 日本人学生 → 日本人 + 学生)
- Automatic fallback to simple detection if Kuromoji is loading
- Uses Jisho.org API for dictionary lookups
- Shows hiragana readings and English meanings
- Caches results for better performance
- Works on any webpage with Japanese text

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select this folder (`/Users/hima/Desktop/extension/extension`)
5. The extension should now be active!

## Testing

### Quick Test
1. Visit a website with Japanese text, for example:
   - https://www3.nhk.or.jp/news/ (NHK News)
   - https://ja.wikipedia.org/ (Japanese Wikipedia)

2. Hover your mouse over any Kanji character
3. A tooltip should appear with:
   - The word/kanji
   - Reading (hiragana)
   - English meanings

### Test with Sample Text
You can also create a simple HTML file to test:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Test Japanese Text</h1>
  <p>今日は良い天気です。</p>
  <p>私は日本語を勉強しています。</p>
  <p>漢字は難しいですが、面白いです。</p>
</body>
</html>
```

## How It Works

1. **Japanese Character Detection**: Uses Unicode ranges to identify Japanese text (Hiragana, Katakana, Kanji)
2. **Priority Check**: First checks if user has highlighted text (manual selection takes priority)
3. **Smart Tokenization**: Uses Kuromoji.js to split Japanese text into proper words
4. **Word Extraction**: Identifies the word at hover position from tokenized results
5. **Background API Call**: Service worker fetches translation from Jisho.org API (bypasses CORS)
6. **Caching**: Stores results to minimize API calls
7. **Tooltip Display**: Shows formatted translation near cursor

## Word Boundary Detection

Japanese doesn't use spaces, so the extension uses a **hybrid approach** with two methods:

### Method 1: Smart Auto-Detection with Kuromoji.js (Primary)
When hovering without selection, the extension uses **Kuromoji.js tokenizer** for accurate word segmentation:

```
Text: 彼は日本人学生です

Hover "日" → "日本人" (Japanese person)
Hover "学" → "学生" (student)
```

Kuromoji properly splits compounds like "日本人学生" into separate words: [彼, は, 日本人, 学生, です]

**Fallback**: If Kuromoji is still loading (first few seconds), the extension uses simple consecutive Kanji extraction with a 10-character limit.

### Method 2: Manual Selection (Highest Priority)
**Always takes precedence** over auto-detection:
1. **Highlight** the exact word/phrase you want to translate
2. **Hover** over the selection
3. The tooltip shows translation for your exact selection

**Pro tip**: Use manual selection for:
- Long compound words (e.g., 環境保護運動)
- Ambiguous phrases where you want specific boundaries
- When you want to translate entire sentences

## Files

- `manifest.json` - Extension configuration
- `background.js` - Service worker for CORS-free API calls
- `kuromoji.js` - Japanese morphological analyzer for word segmentation
- `content.js` - Main logic for hover detection, tokenization, and API integration
- `tooltip.css` - Styling for the translation popup

## Known Limitations (POC)

- No context-aware translations (coming with OpenAI integration)
- Basic tooltip positioning (may clip at screen edges)
- No icon images (placeholder paths in manifest)
- No persistent settings or preferences

## Next Steps

- [ ] Add OpenAI integration for context-aware translations
- [ ] Improve tooltip positioning (prevent screen overflow)
- [ ] Add user preferences (font size, color themes)
- [ ] Create extension icons
- [ ] Add keyboard shortcuts
- [ ] Support other Japanese scripts (Hiragana, Katakana lookups)

## Troubleshooting

**Extension not working?**
- Make sure Developer mode is enabled
- Check the Console for errors (F12 → Console tab)
- Reload the extension from `chrome://extensions/`

**No tooltip appearing?**
- Verify you're hovering over actual Kanji characters
- Check internet connection (Jisho API requires online access)
- Open DevTools and check Network tab for API responses

**Tooltip position is off?**
- This is a known limitation in the POC
- Will be improved in future versions

## Publishing to Chrome Web Store

### Prerequisites Checklist

Before publishing, complete these tasks:

- [ ] **Create extension icons** (see `icons/README.md`)
  - icon16.png (16x16)
  - icon48.png (48x48)
  - icon128.png (128x128)

- [ ] **Take screenshots** (5 images, 1280x800 recommended)
  - Show hovering over Japanese text
  - Display translation tooltip with JLPT badge
  - Demonstrate manual selection feature
  - Show example on Japanese website

- [ ] **Create promotional images**
  - Small tile: 440x280 pixels
  - Marquee (optional): 1400x560 pixels

- [ ] **Host privacy policy**
  - Upload `privacy-policy.html` to web hosting
  - Update contact email in the policy
  - Get public URL for Chrome Web Store listing

- [ ] **Register developer account**
  - Cost: $5 USD one-time fee
  - Visit: https://chrome.google.com/webstore/devconsole

### Publishing Steps

1. **Package Extension**
   ```bash
   # Create ZIP of extension directory (only include essential files)
   zip -r momo.zip \
     manifest.json \
     background.js \
     content.js \
     kuromoji.js \
     tooltip.css \
     welcome.html \
     icons/* \
     dict/*.dat.gz \
     data/jlpt-lookup.json
   ```

   Or exclude unnecessary files:
   ```bash
   zip -r momo.zip . -x \
     "*.git*" \
     "*.DS_Store" \
     "claude/*" \
     "README.md" \
     "CLAUDE.md" \
     "privacy-policy.html" \
     "icons/README.md"
   ```

2. **Upload to Chrome Web Store**
   - Go to Chrome Web Store Developer Dashboard
   - Click "New Item"
   - Upload ZIP file

3. **Complete Store Listing**
   - **Title**: Momo - Kanji Dictionary
   - **Summary** (132 chars max): Hover over Japanese text for instant translations, readings, and JLPT levels. Perfect for learners!
   - **Description**: Detailed overview with features
   - **Category**: Productivity
   - **Privacy Policy URL**: [Your hosted privacy-policy.html URL]

4. **Publish**
   - Choose visibility (Public/Unlisted/Private)
   - Select regions
   - Submit for review (3-7 days typical)

### Post-Install Onboarding

The extension automatically shows a welcome page on first install:
- Explains key features
- Shows how to pin the extension
- Demonstrates hover functionality
- Provides quick start guide

### Update Process

To publish an update:
1. Increment version in `manifest.json`
2. Create new ZIP package
3. Upload to Chrome Web Store
4. Review time: 1-3 days for updates

## Development

To make changes:
1. Edit the files in this directory
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload any test pages

## License

POC for personal use
