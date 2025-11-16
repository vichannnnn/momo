let jlptData = {};
let jlptDataLoaded = false;

async function loadJLPTData() {
  try {
    const url = chrome.runtime.getURL('data/jlpt-lookup.json');
    const response = await fetch(url);
    jlptData = await response.json();
    jlptDataLoaded = true;
    console.log(`JLPT data loaded: ${Object.keys(jlptData).length} entries`);
  } catch (error) {
    console.error('Failed to load JLPT data:', error);
  }
}

loadJLPTData();

function getJLPTLevel(word) {
  if (!jlptDataLoaded) return null;
  return jlptData[word] || null;
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'welcome.html' });

    chrome.storage.local.set({
      onboardingCompleted: false,
      installDate: new Date().toISOString()
    });

  } else if (details.reason === 'update') {
    const currentVersion = chrome.runtime.getManifest().version;

    chrome.storage.local.set({
      lastUpdateVersion: currentVersion,
      lastUpdateDate: new Date().toISOString()
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchTranslation') {
    fetchTranslation(request.word)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.action === 'checkJLPTStatus') {
    sendResponse({
      loaded: jlptDataLoaded,
      count: Object.keys(jlptData).length
    });
    return true;
  }
});

async function fetchTranslation(word) {
  try {
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return formatJishoResult(data.data[0], word);
    }

    return '<div class="kanji-error">No translation found</div>';
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

function formatJishoResult(entry, searchedWord) {
  const word = entry.japanese[0];
  const foundWord = word.word || word.reading;
  const jlptLevel = getJLPTLevel(foundWord);

  const jlptBadge = jlptLevel ? `<span class="jlpt-badge jlpt-${jlptLevel.toLowerCase()}">${jlptLevel}</span>` : '';
  const readings = word.reading ? `<div class="kanji-reading">${word.reading}</div>` : '';
  const meanings = entry.senses
    .slice(0, 3)
    .map(sense => sense.english_definitions.join(', '))
    .join('; ');

  const isPartialMatch = searchedWord !== foundWord;
  const searchedLabel = isPartialMatch ? `<div class="kanji-searched">Searched: ${searchedWord}</div>` : '';

  return `
    ${searchedLabel}
    <div class="kanji-word">${foundWord} ${jlptBadge}</div>
    ${readings}
    <div class="kanji-meaning">${meanings}</div>
  `;
}
