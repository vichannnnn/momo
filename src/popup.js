document.addEventListener('DOMContentLoaded', async () => {
  loadVersion();
  checkJLPTStatus();
  setupHelpButton();
});

function loadVersion() {
  const manifest = chrome.runtime.getManifest();
  const versionElement = document.getElementById('version');
  versionElement.textContent = `v${manifest.version}`;
}

async function checkJLPTStatus() {
  const jlptStatusIcon = document.getElementById('jlpt-status');
  const jlptStatusText = document.getElementById('jlpt-text');

  try {
    const response = await chrome.runtime.sendMessage({ action: 'checkJLPTStatus' });

    if (response && response.loaded) {
      jlptStatusIcon.textContent = '✓';
      jlptStatusText.textContent = `JLPT data loaded (${response.count.toLocaleString()} words)`;
    } else {
      jlptStatusIcon.textContent = '⏳';
      jlptStatusText.textContent = 'Loading JLPT data...';
    }
  } catch (error) {
    jlptStatusIcon.textContent = '⚠️';
    jlptStatusText.textContent = 'JLPT data unavailable';
  }
}

function setupHelpButton() {
  const helpButton = document.getElementById('help-button');

  helpButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'welcome.html' });
    window.close();
  });
}
