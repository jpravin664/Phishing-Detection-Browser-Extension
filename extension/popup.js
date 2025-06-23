const whitelistKey = 'whitelist';

function render() {
  chrome.storage.local.get([whitelistKey], ({ whitelist = [] }) => {
    const ul = document.getElementById('whitelist');
    ul.innerHTML = '';
    whitelist.forEach(u => {
      const li = document.createElement('li'); li.textContent = u;
      ul.appendChild(li);
    });
  });
}

document.getElementById('addBtn').onclick = () => {
  const url = document.getElementById('addUrl').value;
  if (url) {
    chrome.storage.local.get([whitelistKey], ({ whitelist = [] }) => {
      whitelist.push(url);
      chrome.storage.local.set({ whitelist }, render);
    });
  }
};

document.getElementById('clearCache').onclick = () => {
  chrome.storage.local.clear(render);
};

render();