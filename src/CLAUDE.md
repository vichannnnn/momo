# Claude Code Project Instructions

## Project Overview
<!-- auto-generated-start:overview -->
[Brief description of your project goes here]
<!-- auto-generated-end:overview -->

## Key Objectives
<!-- auto-generated-start:objectives -->
- [Objective 1]
- [Objective 2]
- [Objective 3]
<!-- auto-generated-end:objectives -->

## Project Structure

```
/momo/                 # Repository root
├── .gitignore         # Git ignore rules
├── LICENSE            # MIT License
├── README.md          # Main documentation (for GitHub)
├── package.sh         # Automated packaging script for Chrome Web Store
├── assets/            # Development assets (not included in ZIP)
│   └── screenshots/   # Chrome Web Store screenshots
├── docs/              # GitHub Pages documentation
│   └── privacy-policy.html  # Hosted privacy policy
└── src/               # Extension source code
    ├── CLAUDE.md      # This file - project instructions for Claude
    ├── .claude/       # Claude Code configuration
    │   ├── agents/    # Project-specific agents
    │   ├── commands/  # Custom slash commands
    │   ├── hooks/     # Git hooks and workflow automation
    │   └── settings.json  # Shared Claude settings
    ├── manifest.json  # Chrome extension manifest (v3)
    ├── background.js  # Service worker
    ├── content.js     # Content script
    ├── kuromoji.js    # Japanese tokenizer library
    ├── popup.html/css/js  # Extension popup
    ├── welcome.html   # First-install onboarding
    ├── privacy-policy.html  # Privacy policy (also in extension)
    ├── tooltip.css    # Translation tooltip styles
    ├── icons/         # Extension icons
    ├── data/          # JLPT lookup data (13,000+ words)
    └── dict/          # Kuromoji dictionary files (~15MB)
```

## Development Guidelines

### Code Style

- Follow existing code conventions in the project
- Use consistent naming patterns
- Maintain clean, readable code

### Testing

- Run tests before committing changes
- Add tests for new functionality
- Ensure all tests pass

### Git Workflow

- Create descriptive commit messages
- Keep commits focused and atomic
- Review changes before committing

## Commit Convention and Pull Request Guidelines

### Commit Message Format
Follow the conventional commits specification:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks (updating dependencies, build process, etc.)
- `perf`: Performance improvements

**Examples:**
```
feat(auth): add password reset functionality
fix(api): handle null values in user response
docs: update API documentation for book endpoints
refactor(frontend): extract BookTable into separate components
chore(deps): update FastAPI to 0.104.1
```

### Pull Request Guidelines

**PR Title**: Use the same format as commit messages

**PR Description Template:**
```markdown
## Summary
Brief description of what this PR does and why it's needed.

## Changes
- List of specific changes made
- Technical implementation details if relevant

## Testing
- [ ] Tests pass (if applicable)
- [ ] Manual testing completed
- [ ] No console errors or warnings

## Manual Testing Steps
1. Describe steps to manually test the feature
2. Expected behavior and edge cases tested

## Screenshots (if UI changes)
Attach relevant screenshots here

## Related Issues
Closes #XXX (if applicable)

## Checklist
- [ ] Code follows project conventions
- [ ] Self-documented code without unnecessary comments
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] No sensitive information exposed
```

## Common Commands
<!-- auto-generated-start:commands -->
```bash
# Add your common project commands here
# npm install
# npm run dev
# npm test
```
<!-- auto-generated-end:commands -->

## Important Context

[Add any project-specific context, dependencies, or requirements here]

## Agents

See .claude/agents/README.md for available agents and their purposes

## Agent Orchestration

After adding the agents you want to in `./.claude/agents` folder, setup the workflow for Claude code to follow

## Custom Commands

Custom slash commands are available in `.claude/commands/`:
- **/update-claude-md** - Automatically updates this file with project-specific information
- See `.claude/commands/README.md` for creating your own commands

## GitHub Repository

- **Repository**: https://github.com/vichannnnn/momo
- **License**: MIT
- **Privacy Policy**: https://vichannnnn.github.io/momo/privacy-policy.html
- **Issues**: https://github.com/vichannnnn/momo/issues
- **Discussions**: https://github.com/vichannnnn/momo/discussions

## Contributing

This is an open-source project! Contributions welcome:
- Report bugs via GitHub Issues
- Suggest features via GitHub Discussions
- Submit Pull Requests following the PR guidelines above
- See root README.md for development setup

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **No code comments**: Never add comments to any code you write - code should be self-documenting
4. **Test thoroughly**: Load extension in Chrome via "Load unpacked" and test on Japanese websites
5. **Follow commit conventions**: Use conventional commit format (see above)

## Publishing to Chrome Web Store

### Extension Information
- **Name**: Momo - Kanji Dictionary
- **Description**: Hover over Japanese text for instant translations, hiragana readings, and JLPT levels. Perfect for learners!
- **Category**: Productivity
- **Version**: 1.0.0

### Prerequisites Checklist

Before publishing, complete these tasks:

- [x] **Create extension icons** ✓ COMPLETED
  - icon16.png, icon48.png, icon128.png all created
  - Design: Peach theme (🍑) with purple/blue gradient
  - Located in `src/icons/`

- [x] **Take screenshots** ✓ COMPLETED (2 screenshots)
  - Stored in `/assets/screenshots/`
  - Files:
    1. `01-hover-tooltip.png` - Hovering over Japanese text with tooltip
    2. `02-jlpt-badge.png` - JLPT badge display
  - Dimensions: Check actual size, Chrome Web Store recommends 1280x800px
  - Note: Minimum 1 screenshot required, 2-5 recommended for best presentation

- [x] **Host privacy policy** ✓ COMPLETED
  - Hosted on GitHub Pages: https://vichannnnn.github.io/momo/privacy-policy.html
  - Contact email: violet@himaa.me
  - Last updated: November 17, 2025

- [ ] **Create promotional images** (OPTIONAL)
  - Small tile: 440x280 pixels (required for featured placement)
  - Marquee: 1400x560 pixels (optional)
  - Use saturated colors, minimal text
  - Should work when shrunk to half size

- [ ] **Register Chrome Web Store developer account**
  - Cost: **$5 USD one-time fee** (not per extension!)
  - Allows up to 20 extensions per account
  - Visit: https://chrome.google.com/webstore/devconsole
  - Choose email carefully (cannot be changed later)

### Packaging the Extension

**Automated Method (Recommended):**
```bash
# From repository root, run the packaging script
./package.sh
```

The script automatically creates `momo-extension.zip` with only the necessary files.

**Manual Method:**
```bash
# Navigate to src directory
cd /Users/hima/Desktop/momo/src

# Create ZIP file (exclude development files)
zip -r ../momo-extension.zip . -x \
  "*.git*" \
  "*.DS_Store" \
  ".claude/*" \
  "README.md" \
  "CLAUDE.md" \
  "icons/README.md"
```

**What gets INCLUDED in the ZIP:**
- manifest.json
- background.js
- content.js
- kuromoji.js
- popup.html, popup.css, popup.js
- tooltip.css
- welcome.html
- privacy-policy.html (for offline viewing)
- icons/ (icon16.png, icon48.png, icon128.png)
- dict/ (Kuromoji dictionaries ~15.3MB)
- data/jlpt-lookup.json (261KB)

**What gets EXCLUDED from the ZIP:**
- .claude/ directory (Claude Code configuration)
- README.md (development documentation)
- CLAUDE.md (this file)
- icons/README.md (icon documentation)
- icons/momo.png (source icon, not needed in extension)

**Total extension size:** ~16MB (well within Chrome's 20MB limit)

### Publishing Steps

1. **Go to Chrome Web Store Developer Dashboard**
   - URL: https://chrome.google.com/webstore/devconsole
   - Sign in with your Google account
   - Pay $5 registration fee (if first time)

2. **Click "New Item"**
   - Upload `momo.zip`
   - Wait for validation (10-30 seconds)

3. **Complete Store Listing** (all tabs)

   **Store Listing Tab:**
   - **Title**: Momo - Kanji Dictionary
   - **Summary** (132 chars max): Hover over Japanese text for instant translations, readings, and JLPT levels. Perfect for learners!
   - **Description**:
     ```
     Momo is your instant Japanese learning companion! 🍑

     Simply hover over any Japanese text on any website to see:
     ✓ Instant English translations
     ✓ Hiragana readings (furigana)
     ✓ JLPT proficiency levels (N5-N1)
     ✓ Smart word boundary detection

     FEATURES:

     🔍 Instant Hover Translations
     Hover your mouse over Japanese text for immediate dictionary lookups powered by Jisho.org

     📊 JLPT Level Indicators
     Color-coded badges show difficulty levels for 13,000+ words (N5 beginner → N1 advanced)

     🤖 Smart Tokenization
     Uses Kuromoji.js for intelligent Japanese word segmentation. No more guessing where words begin and end!

     🎯 Manual Selection Priority
     Highlight exact text you want to translate for precise control when auto-detection isn't perfect

     ⚡ Fast & Offline-Capable
     JLPT data stored locally for instant lookups. Only translation fetches require internet.

     🎌 Perfect for Japanese Learners
     Whether you're studying for JLPT exams, reading manga, browsing Japanese websites, or just curious about a word—Momo makes learning effortless!

     HOW TO USE:
     1. Install Momo
     2. Visit any website with Japanese text
     3. Hover your mouse over Japanese characters
     4. See instant translations in a beautiful tooltip!

     Pro tip: Highlight text before hovering for precise word selection.

     Privacy: We don't collect any personal data. Japanese text is only sent to Jisho.org API for translation. Everything else stays local to your browser.
     ```
   - **Category**: Productivity
   - **Language**: English

   **Privacy Tab:**
   - **Privacy Policy URL**: https://vichannnnn.github.io/momo/privacy-policy.html
   - **Justify Permissions**:
     - `activeTab`: Required to read Japanese text on webpages you're viewing
     - `storage`: Required to cache translations locally for faster performance
     - `https://jisho.org/*`: Required to fetch dictionary data from Jisho.org API

   **Distribution Tab:**
   - **Visibility**: Public (or Unlisted for testing)
   - **Geographic Distribution**: All countries
   - **Pricing**: Free

5. **Submit for Review**
   - Choose publishing option:
     - Automatic: Goes live immediately after approval
     - Staged: Manually control when to publish (must publish within 30 days)
   - Click "Submit for Review"
   - Expected review time: 3-7 days for first submission

### Review Process

**Timeline:**
- Initial submission: 3-7 days
- Updates: 1-3 days
- Sensitive permissions may trigger longer manual review

**What triggers manual review:**
- Sensitive permissions (downloads, history, broad host permissions)
- First-time submissions
- Major functionality changes
- Policy-sensitive features

**Common rejection reasons:**
- Insufficient permission justification
- Misleading descriptions or screenshots
- Technical bugs or crashes
- Privacy policy issues

### Post-Installation User Experience

**First Install:**
1. Extension automatically opens `welcome.html` in new tab
2. User sees features overview and pin instructions
3. Onboarding status saved to prevent showing again

**Clicking Extension Icon:**
1. Popup shows (popup.html)
2. Displays extension status and JLPT data load status
3. Quick usage reminder
4. "Need Help?" button reopens welcome guide

**Using the Extension:**
1. User hovers over Japanese text
2. Content script detects hover
3. Kuromoji tokenizes text
4. Background worker fetches translation from Jisho.org
5. Tooltip displays with JLPT badge

### Update Process

When publishing updates:

1. **Increment version** in manifest.json
   - Patch: 1.0.0 → 1.0.1 (bug fixes)
   - Minor: 1.0.0 → 1.1.0 (new features)
   - Major: 1.0.0 → 2.0.0 (breaking changes)

2. **Create new ZIP** package with same exclusions

3. **Upload to existing item** in Developer Dashboard
   - Don't create new item, update existing one
   - Fill out "What's new" field

4. **Submit for review**
   - Review typically faster for updates (1-3 days)

5. **Automatic updates** for users
   - Chrome updates extensions automatically
   - Users typically updated within 24-48 hours

### Cost Summary

**One-time costs:**
- Chrome Web Store developer account: **$5**
- Domain for privacy policy (optional): $10-15/year
- Total minimum: **$5**

**Ongoing costs:**
- $0 (completely free to maintain and update)

### Important Notes

- You can publish up to **20 extensions** with one $5 developer account
- No renewal fees - the $5 is truly one-time
- Updates are free and unlimited
- No hosting costs (Chrome Web Store hosts everything)
- Analytics and user feedback included free in Developer Dashboard

## Additional Notes
<!-- auto-generated-start:notes -->
Extension features:
- Hover-based Japanese translation with Jisho.org API integration
- JLPT proficiency level indicators (13,000+ words)
- Kuromoji.js for intelligent word segmentation
- Manual text selection priority for precise control
- Local JLPT data caching for performance
- Welcome page onboarding on first install
- Popup interface for quick help and status
<!-- auto-generated-end:notes -->