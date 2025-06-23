import { GOOGLE_API_KEY, VIRUSTOTAL_API_KEY } from './config.js';

const SAFE_BROWSING_URL =
  `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`;
const VIRUSTOTAL_URL = 'https://www.virustotal.com/api/v3/urls/';

async function querySafeBrowsing(url) {
  try {
    const body = {
      client: { clientId: 'phish-detector', clientVersion: '1.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }]
      }
    };
    const res = await fetch(SAFE_BROWSING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return Array.isArray(data.matches) && data.matches.length > 0;
  } catch (err) {
    console.error('Safe Browsing fetch error:', err);
    return false;
  }
}


async function queryVirusTotal(url) {
  try {
    const encoded = btoa(url).replace(/=+$/, '');
    const res = await fetch(`${VIRUSTOTAL_URL}${encoded}`, {
      headers: { 'x-apikey': VIRUSTOTAL_API_KEY }
    });
    const data = await res.json();
    const stats = data?.data?.attributes?.last_analysis_stats || {};
    return (stats.malicious || 0) > 0;
  } catch (err) {
    console.error('VirusTotal fetch error:', err);
    return false;
  }
}

export async function detectWithAPIs(url) {
  const [sb, vt] = await Promise.all([
    querySafeBrowsing(url),
    queryVirusTotal(url)
  ]);
  return sb || vt;
}