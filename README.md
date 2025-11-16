# Momo - Japanese Learning Chrome Extension

A Chrome extension that helps you learn Japanese by providing instant kanji translations and JLPT level indicators when hovering over Japanese text on any webpage.

## Features

- **Instant Translations**: Hover over Japanese text to see English definitions from Jisho.org
- **JLPT Level Indicators**: Color-coded badges (N5-N1) show the difficulty level of each word
- **Smart Word Detection**: Uses Kuromoji.js for accurate Japanese word boundary detection
- **Manual Selection**: Select specific text to get translations for multi-word phrases
- **Translation Caching**: Faster lookups for previously translated words
- **Clean UI**: Non-intrusive tooltip design that doesn't interfere with your reading

## Motivation

Learning Japanese through immersion is one of the most effective methods, but constantly looking up unknown words can break your flow. Momo makes it effortless to understand Japanese content on the web while reinforcing vocabulary through JLPT level awareness.

## Installation

### For End Users

**Option 1: Chrome Web Store (Recommended)**
- Coming soon! Will be published to the Chrome Web Store.

**Option 2: Load Unpacked (Development)**
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the `/src` directory
5. The extension will appear in your browser toolbar

### For Developers

```bash
# Clone the repository
git clone https://github.com/[username]/momo.git
cd momo

# The extension source is in /src
# No build step required - it's vanilla JavaScript!

# Load the extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked" and select the /src directory
```

## Project Structure

```
/momo/
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
├── README.md               # This file
├── src/                    # Extension source code
│   ├── .claude/            # Claude Code configuration
│   ├── manifest.json       # Chrome extension manifest (v3)
│   ├── background.js       # Service worker (JLPT data, API calls)
│   ├── content.js          # Content script (hover detection, tooltips)
│   ├── kuromoji.js         # Japanese tokenizer library
│   ├── popup.html          # Extension popup UI
│   ├── popup.css           # Popup styles
│   ├── popup.js            # Popup logic
│   ├── tooltip.css         # Translation tooltip styles
│   ├── welcome.html        # First-install onboarding page
│   ├── privacy-policy.html # Privacy policy
│   ├── icons/              # Extension icons (16px, 48px, 128px)
│   ├── data/               # JLPT lookup data (13,000+ words)
│   └── dict/               # Kuromoji dictionary files (~15MB)
└── docs/                   # Documentation (for GitHub Pages)
    └── privacy-policy.html # Hosted privacy policy
```

## Development

### Technology Stack

- **Vanilla JavaScript**: No build tools or frameworks required
- **Chrome Extension Manifest V3**: Latest extension standard
- **Kuromoji.js**: Japanese morphological analyzer for word segmentation
- **Jisho.org API**: Dictionary data source

### Testing

1. Load the extension using "Load unpacked" in Chrome
2. Navigate to any webpage with Japanese text (e.g., https://www3.nhk.or.jp/news/)
3. Hover over Japanese text to see tooltips
4. Select text manually to test multi-word translation
5. Check the extension popup to verify JLPT data is loaded

### Key Files

- **src/manifest.json**: Extension configuration and permissions
- **src/content.js**: Main logic for text detection and tooltip display
- **src/background.js**: Loads JLPT data and handles translation API calls
- **src/data/jlpt-lookup.json**: 13,000+ words mapped to JLPT levels

## Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue describing the problem
2. **Suggest Features**: Share ideas for new functionality
3. **Submit PRs**: Fork, create a branch, make changes, and submit a PR
4. **Improve Translations**: Help refine the dictionary or add new data sources
5. **Documentation**: Improve README, add tutorials, create guides

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes in the `/src` directory
4. Test thoroughly by loading the extension in Chrome
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Publishing to Chrome Web Store

### Prerequisites

- Google account
- $5 one-time developer registration fee
- Privacy policy hosted online (included in this repo)

### Publishing Steps

1. Create ZIP package: `zip -r momo-extension.zip src/`
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay the $5 registration fee (one-time)
4. Click "New Item" and upload the ZIP
5. Fill in store listing details:
   - Name: "Momo - Japanese Learning Assistant"
   - Description: See existing src/README.md for text
   - Screenshots: Capture tooltips, JLPT badges, popup
   - Privacy policy URL: `https://[username].github.io/momo/privacy-policy.html`
6. Submit for review (typically 1-3 business days)

### Updating the Extension

1. Update version in `src/manifest.json`
2. Create new ZIP package
3. Upload to Chrome Web Store Developer Dashboard
4. Submit for review

## Privacy

Momo respects your privacy:
- **No data collection**: We don't track, store, or transmit your browsing data
- **Local storage only**: JLPT data is stored locally in your browser
- **External API**: Translations are fetched from Jisho.org (see their privacy policy)
- **No accounts**: No sign-up or user accounts required

Read the full [Privacy Policy](https://[username].github.io/momo/privacy-policy.html)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

- **Kuromoji.js**: Japanese morphological analyzer
- **Jisho.org**: Japanese-English dictionary API
- **JLPT Data**: Community-contributed JLPT level classifications

## Support

- **Issues**: [GitHub Issues](https://github.com/[username]/momo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/[username]/momo/discussions)

---

Made with ❤️ for Japanese learners worldwide
