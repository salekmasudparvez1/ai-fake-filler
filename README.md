# AI Fake Filler Chrome Extension

A Chrome extension that automatically fills web forms with realistic fake data using Google's Gemini API.

## Setup

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create an API key for Gemini

2. **Install the Extension:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select this folder

3. **Configure:**
   - Click the extension icon in Chrome toolbar
   - Enter your Gemini API key and click "Save API Key"

## Usage

1. Navigate to any webpage with a form
2. Click the extension icon
3. Click "Fill Form" button
4. The extension will automatically fill visible input fields with realistic fake data

## Features

- Automatically detects form fields (input, textarea)
- Uses Gemini AI to generate contextually appropriate fake data
- Securely stores API key in Chrome's sync storage
- Works on any website with forms

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality and API key management
- `content.js` - Main form filling logic with Gemini API integration
- `background.js` - Service worker (minimal for now)

## Security Note

Your API key is stored locally in Chrome's secure storage and only used to make requests to Google's Gemini API.