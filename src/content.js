const KANJI_REGEX = /[\u4e00-\u9faf]/;
const KANJI_COMPOUND_REGEX = /[\u4e00-\u9faf]+/g;
const JAPANESE_REGEX = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;

let tooltip = null;
let currentRequest = null;
let cache = new Map();
let kuromojiTokenizer = null;
let kuromojiReady = false;

function createTooltip() {
  const div = document.createElement('div');
  div.id = 'kanji-translator-tooltip';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

function showTooltip(x, y, content) {
  if (!tooltip) {
    tooltip = createTooltip();
  }

  tooltip.innerHTML = content;
  tooltip.style.display = 'block';
  tooltip.style.left = `${x + 10}px`;
  tooltip.style.top = `${y + 10}px`;
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

async function fetchTranslation(word) {
  if (cache.has(word)) {
    return cache.get(word);
  }

  try {
    const response = await chrome.runtime.sendMessage({
      action: 'fetchTranslation',
      word: word
    });

    if (response.success) {
      cache.set(word, response.data);
      return response.data;
    }

    return '<div class="kanji-error">Translation unavailable</div>';
  } catch (error) {
    console.error('Translation error:', error);
    return '<div class="kanji-error">Translation unavailable</div>';
  }
}

function getWordAtPosition(element, offset) {
  const text = element.textContent;

  if (!text || offset >= text.length) return null;

  const char = text[offset];
  if (!JAPANESE_REGEX.test(char)) return null;

  if (kuromojiReady && kuromojiTokenizer) {
    try {
      const tokens = kuromojiTokenizer.tokenize(text);
      let currentPos = 0;

      for (const token of tokens) {
        const tokenLength = token.surface_form.length;
        const tokenEnd = currentPos + tokenLength;

        if (offset >= currentPos && offset < tokenEnd) {
          if (JAPANESE_REGEX.test(token.surface_form)) {
            return token.surface_form;
          }
        }

        currentPos = tokenEnd;
      }
    } catch (error) {
      console.error('Kuromoji tokenization error:', error);
    }
  }

  const MAX_WORD_LENGTH = 10;
  let start = offset;
  let end = offset;

  while (start > 0 && KANJI_REGEX.test(text[start - 1]) && (offset - start) < MAX_WORD_LENGTH) {
    start--;
  }

  while (end < text.length && KANJI_REGEX.test(text[end]) && (end - start) < MAX_WORD_LENGTH) {
    end++;
  }

  const word = text.substring(start, end);

  if (word.length > MAX_WORD_LENGTH) {
    const halfLength = Math.floor(MAX_WORD_LENGTH / 2);
    const relativeOffset = offset - start;
    const extractStart = Math.max(0, relativeOffset - halfLength);
    const extractEnd = Math.min(word.length, extractStart + MAX_WORD_LENGTH);
    return word.substring(extractStart, extractEnd);
  }

  return word;
}

function getTextNodeAtPoint(x, y) {
  const range = document.caretRangeFromPoint(x, y);
  if (!range) return null;

  const node = range.startContainer;
  if (node.nodeType === Node.TEXT_NODE) {
    return { node, offset: range.startOffset };
  }

  return null;
}

function getSelectedText() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const selectedText = selection.toString().trim();
  if (!selectedText) return null;

  if (JAPANESE_REGEX.test(selectedText)) {
    return selectedText;
  }

  return null;
}

async function handleMouseMove(event) {
  let word = getSelectedText();

  if (!word) {
    const textInfo = getTextNodeAtPoint(event.clientX, event.clientY);

    if (!textInfo) {
      hideTooltip();
      return;
    }

    word = getWordAtPosition(textInfo.node, textInfo.offset);

    if (!word) {
      hideTooltip();
      return;
    }
  }

  if (currentRequest) {
    clearTimeout(currentRequest);
  }

  currentRequest = setTimeout(async () => {
    const translation = await fetchTranslation(word);
    showTooltip(event.pageX, event.pageY, translation);
  }, 300);
}

function handleMouseOut(event) {
  if (event.relatedTarget === tooltip || tooltip?.contains(event.relatedTarget)) {
    return;
  }
  hideTooltip();
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseout', handleMouseOut);

tooltip = createTooltip();

if (typeof kuromoji !== 'undefined') {
  const dictPath = chrome.runtime.getURL('dict/');
  kuromoji.builder({ dicPath: dictPath }).build((err, tokenizer) => {
    if (err) {
      console.error('Kuromoji initialization error:', err);
      console.log('Falling back to simple tokenization');
      return;
    }
    kuromojiTokenizer = tokenizer;
    kuromojiReady = true;
    console.log('Kuromoji tokenizer ready!');
  });
} else {
  console.log('Kuromoji not loaded, using fallback tokenization');
}
