export function extractUrlFeatures(rawUrl) {
  const url = new URL(rawUrl);
  return {
    hasHttps: url.protocol === 'https:',
    length: rawUrl.length,
    subdomainCount: url.hostname.split('.').length - 2,
    specialCharCount: (rawUrl.match(/[^a-zA-Z0-9]/g) || []).length
  };
}
