// content/dialogs/cookieDialog.js
function showCookieDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  const title = document.createElement('h2');
  title.textContent = "提取Cookie";
  dialog.appendChild(title);

  const closeButton = document.createElement('button');
  closeButton.textContent = "关闭";
  closeButton.className = 'action-button';
  closeButton.style.cssText = "position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: linear-gradient(45deg, #dc3545, #e66471); font-size: 12px;";
  closeButton.addEventListener('click', () => dialog.remove());
  dialog.appendChild(closeButton);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'cookie-dialog-content';

  // 获取当前页面的URL
  const currentUrl = window.location.href;

  // 使用chrome.cookies API获取Cookie
  chrome.runtime.sendMessage({ action: "getCookies", url: currentUrl }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error getting cookies:", chrome.runtime.lastError);
      const errorText = document.createElement('p');
      errorText.textContent = "无法获取Cookie，请检查权限或页面是否有Cookie";
      errorText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
      contentDiv.appendChild(errorText);
      return;
    }

    if (response && response.cookies && response.cookies.length > 0) {
      const cookies = response.cookies;
      cookies.forEach(cookie => {
        // 只显示name和value，避免其他无关字段
        const cookieText = document.createElement('p');
        cookieText.textContent = `${cookie.name}=${cookie.value}`;
        contentDiv.appendChild(cookieText);
      });

      const copyButton = document.createElement('button');
      copyButton.textContent = "一键复制";
      copyButton.className = 'action-button';
      copyButton.addEventListener('click', () => {
        const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
        navigator.clipboard.writeText(cookieString).then(() => alert("已复制Cookie到剪贴板"));
      });
      dialog.appendChild(copyButton);
    } else {
      const noCookieText = document.createElement('p');
      noCookieText.textContent = "未找到Cookie";
      noCookieText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
      contentDiv.appendChild(noCookieText);
    }
  });

  dialog.appendChild(contentDiv);
  document.body.appendChild(dialog);
}