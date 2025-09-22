// Background service worker for Gemini Fake Filler
chrome.runtime.onInstalled.addListener(() => {
  console.log('Gemini Fake Filler extension installed');
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
