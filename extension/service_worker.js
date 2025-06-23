import { extractUrlFeatures } from './utils/urlExtractor.js';
import { detectWithAPIs } from './utils/apiDetector.js';
import { mlDetect } from './utils/mlDetector.js';

// Listen for top-frame navigations
chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId !== 0) return;
  const url = details.url;

  // Whitelist stored URLs
  const { whitelist = [] } = await chrome.storage.local.get(['whitelist']);
  if (whitelist.includes(url)) return;

  try {
    // First: API-based detection (Google + VirusTotal)
    let isPhish = await detectWithAPIs(url);

    // Fallback: local ML model
    if (!isPhish) {
      const feats = extractUrlFeatures(url);
      isPhish = await mlDetect(feats);
    }

    if (isPhish) {
      chrome.tabs.sendMessage(details.tabId, {
        action: 'BLOCK_PHISH',
        url
      });
    }
  } catch (e) {
    console.error('Detection error:', e);
  }
});