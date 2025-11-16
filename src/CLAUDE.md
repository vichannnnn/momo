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
.
├── CLAUDE.md          # This file - project instructions for Claude
├── .claude/           # Claude Code configuration (auto-generated)
│   ├── agents/        # Project-specific agent overrides
│   └── commands/      # Custom slash commands for Claude Code
├── claude/            # Claude Code project organization
│   ├── agents/        # Custom agents for specialized tasks
│   ├── docs/          # Project documentation
│   ├── plans/         # Project plans and architectural documents
│   └── tickets/       # Task tickets and issues
└── [your project files and directories]
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

See @claude/agents/README.md for available agents and their purposes

## Agent Orchestration

After adding the agents you want to in `./claude/agents` folder, setup the workflow for Claude code to follow

## Custom Commands

Custom slash commands are available in `.claude/commands/`:
- **/update-claude-md** - Automatically updates this file with project-specific information
- See `.claude/commands/README.md` for creating your own commands

## Tickets

See @claude/tickets/README.md for ticket format and management approach

### Ticket Management
- **Ticket List**: Maintain @claude/tickets/ticket-list.md as a centralized index of all tickets
- **Update ticket-list.md** whenever you:
  - Create a new ticket (add to appropriate priority section)
  - Change ticket status (update emoji and move if completed)
  - Complete a ticket (move to completed section with date)
- **Status Emojis**: 🔴 Todo | 🟡 In Progress | 🟢 Done | 🔵 Blocked | ⚫ Cancelled

## Plans

See @claude/plans/README.md for planning documents and architectural decisions

## Development Context

- See @claude/docs/ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `claude/tickets` directory
- Use `claude/plans` directory for architectural decisions and implementation roadmaps

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **Create planning documents**: Before implementing any code or features, create a markdown file documenting the approach
4. **Use plans directory**: When discussing ideas or next steps, create timestamped files in the plans directory (e.g., `claude/plans/next-steps-YYYY-MM-DD-HH-MM-SS.md`) to maintain a record of decisions
5. **No code comments**: Never add comments to any code you write - code should be self-documenting
6. **Maintain ticket list**: Always update @claude/tickets/ticket-list.md when creating, updating, or completing tickets to maintain a clear project overview

## Publishing to Chrome Web Store

### Extension Information
- **Name**: Momo - Kanji Dictionary
- **Description**: Hover over Japanese text for instant translations, hiragana readings, and JLPT levels. Perfect for learners!
- **Category**: Productivity
- **Version**: 1.0.0

### Prerequisites Checklist

Before publishing, complete these tasks:

- [ ] **Create extension icons** (see `icons/README.md`)
  - icon16.png (16x16 pixels)
  - icon48.png (48x48 pixels)
  - icon128.png (128x128 pixels - actual icon 96x96 with 16px padding)
  - Design: Peach theme (🍑) with purple/blue gradient

- [ ] **Take screenshots** (5 images recommended)
  - Dimensions: 1280x800 pixels (or 640x400 minimum)
  - Format: PNG
  - Content to capture:
    1. Hovering over Japanese text with tooltip showing
    2. JLPT badge display (N5-N1 examples)
    3. Manual text selection feature
    4. Example on popular Japanese website (NHK, Wikipedia)
    5. Welcome page or popup interface

- [ ] **Create promotional images**
  - Small tile: 440x280 pixels (required)
  - Marquee: 1400x560 pixels (optional)
  - Use saturated colors, minimal text
  - Should work when shrunk to half size

- [ ] **Host privacy policy**
  - Upload `privacy-policy.html` to web hosting (GitHub Pages, etc.)
  - Update contact email in privacy-policy.html before hosting
  - Get public URL for Chrome Web Store listing

- [ ] **Register Chrome Web Store developer account**
  - Cost: **$5 USD one-time fee** (not per extension!)
  - Allows up to 20 extensions per account
  - Visit: https://chrome.google.com/webstore/devconsole
  - Choose email carefully (cannot be changed later)

### Packaging the Extension

```bash
# Navigate to extension directory
cd /Users/hima/Desktop/extension/extension

# Create ZIP file (exclude development files)
zip -r momo.zip . -x \
  "*.git*" \
  "*.DS_Store" \
  ".claude/*" \
  "claude/*" \
  "README.md" \
  "CLAUDE.md" \
  "privacy-policy.html" \
  "icons/README.md"
```

**What gets included in the ZIP:**
- manifest.json
- background.js
- content.js
- kuromoji.js
- tooltip.css
- welcome.html
- popup.html, popup.css, popup.js
- icons/ (all PNG files)
- dict/ (Kuromoji dictionaries ~15.2MB)
- data/jlpt-lookup.json (261KB)

**Total extension size:** ~16MB

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
   - **Privacy Policy URL**: [Your hosted privacy-policy.html URL]
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