importScripts(
  'utils/urlExtractor.js',
  'utils/apiDetector.js',
  'utils/mlDetector.js',
  'utils/config.js'
);

chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId !== 0) return;
  const url = details.url;

  // Whitelist check
  const { whitelist = [] } = await new Promise(res =>
    chrome.storage.local.get(['whitelist'], res)
  );
  if (whitelist.includes(url)) return;

  try {
    // Run both checks in parallel
    const [apiRes, expandRes] = await Promise.all([
      checkApis(url),
      expandShortUrl(url)
    ]);

    let isPhish = false;
    if (apiRes) {
      isPhish = true;
    } else if (expandRes.expanded) {
      // ML on expanded URL
      const feats2 = extractUrlFeatures(expandRes.expanded);
      isPhish = await mlDetect(feats2);
    } else {
      // ML on original
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
    console.error('Detection error', e);
  }
});