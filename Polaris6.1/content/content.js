// content/content.js
(function () {
  'use strict';
  window.addEventListener('load', () => {
    fetch(chrome.runtime.getURL('ui.html'))
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const uiDiv = doc.querySelector('#combined-plugin-float-div');
        document.body.appendChild(uiDiv);
        initUI();
      })
      .catch(err => console.error("Failed to load UI:", err));
  });
})();