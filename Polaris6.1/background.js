// background.js
console.log("Polaris Scan background script loaded.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCookies") {
    chrome.cookies.getAll({ url: request.url }, (cookies) => {
      if (chrome.runtime.lastError) {
        console.error("Error getting cookies:", chrome.runtime.lastError);
        sendResponse({ cookies: [] });
      } else {
        sendResponse({ cookies: cookies });
      }
    });
    return true; // 异步响应
  } else if (request.action === "checkUrl") {
    fetch(request.url, { method: 'HEAD' })
      .then(response => {
        sendResponse({ exists: response.ok });
      })
      .catch(error => {
        console.error("Error checking URL:", error);
        sendResponse({ exists: false });
      });
    return true; // 异步响应
  } else if (request.action === "fetchContent") {
    fetch(request.url)
      .then(response => response.text())
      .then(content => {
        sendResponse({ content: content });
      })
      .catch(error => {
        console.error("Error fetching content:", error);
        sendResponse({ content: '' });
      });
    return true; // 异步响应
  } else if (request.action === "downloadFile") {
    chrome.downloads.download({
      url: request.url,
      filename: request.url.split('/').pop(), // 使用URL中的文件名
      conflictAction: 'uniquify'
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error("Error downloading file:", chrome.runtime.lastError);
        sendResponse({ success: false });
      } else {
        sendResponse({ success: true });
      }
    });
    return true; // 异步响应
  }
});