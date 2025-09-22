const apiKeyInput = document.getElementById('apiKey');
const saveKeyBtn = document.getElementById('saveKey');
const fillBtn = document.getElementById('fillBtn');
const statusDiv = document.getElementById('status');

// Show status message
function showStatus(message, type = 'success') {
  if (statusDiv) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    setTimeout(() => {
      statusDiv.textContent = '';
      statusDiv.className = 'status';
    }, 3000);
  } else {
    console.log(`Status: ${message} (${type})`);
  }
}

// Verify API key
async function verifyApiKey(apiKey) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: 'test' }] }] })
    });
    return response.status !== 401 && response.status !== 403;
  } catch { return false; }
}

// Load saved API key when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.sync.get(['geminiApiKey', 'apiKeyVerified']);
  if (result.geminiApiKey && apiKeyInput) {
    apiKeyInput.value = result.geminiApiKey;
    if (result.apiKeyVerified) {
      document.querySelector('.form-group').style.display = 'none';
      saveKeyBtn.style.display = 'none';
      showStatus('API key verified ✓', 'success');
    }
  }
});

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Save API key
  if (saveKeyBtn) {
    saveKeyBtn.onclick = async () => {
      const apiKey = apiKeyInput?.value.trim();
      if (!apiKey) {
        showStatus('Please enter an API key', 'error');
        return;
      }
      
      showStatus('Verifying API key...', 'success');
      const isValid = await verifyApiKey(apiKey);
      
      if (isValid) {
        chrome.storage.sync.set({ geminiApiKey: apiKey, apiKeyVerified: true }, () => {
          document.querySelector('.form-group').style.display = 'none';
          saveKeyBtn.style.display = 'none';
          showStatus('API key verified and saved ✓', 'success');
        });
      } else {
        showStatus('Invalid API key. Please check and try again.', 'error');
      }
    };
  }

  // Fill form
  if (fillBtn) {
    fillBtn.onclick = async () => {
      try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        if (!tab) {
          showStatus('No active tab found', 'error');
          return;
        }
        
        // Check if API key exists and is verified
        const result = await chrome.storage.sync.get(['geminiApiKey', 'apiKeyVerified']);
        if (!result.geminiApiKey || !result.apiKeyVerified) {
          showStatus('Please verify your API key first', 'error');
          return;
        }
        
        showStatus('Filling form...', 'success');
        
        // Execute the content script
        const results = await chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['content.js']
        });
        
        console.log('Script execution results:', results);
        showStatus('Form filling completed!', 'success');
        
      } catch (error) {
        console.error('Error:', error);
        showStatus(`Error: ${error.message}`, 'error');
      }
    };
  }

  // Enter key support
  if (apiKeyInput) {
    apiKeyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && saveKeyBtn) {
        saveKeyBtn.click();
      }
    });
  }
});
