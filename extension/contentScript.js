chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action !== 'BLOCK_PHISH') return;

  fetch(chrome.runtime.getURL('phishOverlay.html'))
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // 1) Inject all <link> tags (e.g. your @import font)
      temp.querySelectorAll('link, style').forEach(node => {
        // avoid duplicating if already injected
        const selector = node.outerHTML.slice(0, 200);
        if (!Array.from(document.head.childNodes)
                 .some(n => n.outerHTML && n.outerHTML.includes(selector))) {
          document.head.appendChild(node.cloneNode(true));
        }
      });

      // 2) Grab the overlay element
      const overlay = temp.querySelector('#phish-block-overlay');
      if (!overlay) {
        console.error('⚠️ phishOverlay.html did not contain #phish-block-overlay');
        return;
      }

      // Only append once
      if (!document.querySelector('#phish-block-overlay')) {
        document.body.appendChild(overlay);
      }

      // 3) Populate the URL text
      const urlEl = document.getElementById('phish-url');
      if (urlEl) urlEl.textContent = msg.url;

      // 4) Inject fadeOut keyframes (if not already present)
      if (!document.getElementById('phish-fadeout-keyframes')) {
        const style = document.createElement('style');
        style.id = 'phish-fadeout-keyframes';
        style.textContent = `
          @keyframes fadeOut {
            to { opacity: 0; transform: translateY(20px); }
          }
        `;
        document.head.appendChild(style);
      }

      // 5) Wire up buttons
      const backBtn    = document.getElementById('phish-block-back');
      const proceedBtn= document.getElementById('phish-block-proceed');
      const reportBtn  = document.getElementById('phish-block-report');

      const dismiss = () => {
        overlay.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(() => overlay.remove(), 400);
      };

      if (backBtn) {
        backBtn.addEventListener('click', () => {
          overlay.style.animation = 'fadeOut 0.4s ease-out forwards';
          setTimeout(() => window.history.back(), 400);
        });
      }

      if (proceedBtn) {
        proceedBtn.addEventListener('click', dismiss);
      }

    if (reportBtn) {
  reportBtn.addEventListener('click', () => {
    // 1) Immediately go back
    window.history.back();

    // 2) Send the report message
    chrome.runtime.sendMessage({ action: 'REPORT_URL', url: msg.url });

    // 3) Then do your UI feedback
    reportBtn.textContent = 'Report Submitted';
    reportBtn.disabled = true;

    // 4) Optionally fade out (though user is already navigating away)
    overlay.style.animation = 'fadeOut 0.4s ease-out forwards';
    setTimeout(() => overlay.remove(), 400);
  });
}

    })
    .catch(err => console.error('Error loading phishOverlay.html:', err));
});
