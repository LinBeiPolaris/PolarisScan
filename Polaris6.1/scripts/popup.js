// scripts/popup.js
document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSource" }, response => {
      if (response && response.source) {
        source = response.source;
        initUI();
      } else {
        console.error("Failed to get page source");
        document.getElementById("combined-plugin-result").textContent = "无法获取页面数据，请刷新页面后重试。";
      }
    });
  });
});

function initUI() {
  const div = document.getElementById("combined-plugin-float-div");
  const title = document.getElementById("title");
  let longPressTimer;
  title.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => makeDraggable(div), 300);
  });
  title.addEventListener('mouseup', () => clearTimeout(longPressTimer));

  document.getElementById("highlight-button").addEventListener('click', showHighlightSettingsDialog);
  document.getElementById("dark-mode-button").addEventListener('click', () => {
    div.classList.toggle('dark-mode');
    const isDark = div.classList.contains('dark-mode');
    document.getElementById("combined-plugin-result").classList.toggle('dark-mode', isDark);
  });

  document.querySelectorAll(".action-button").forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const resultDiv = document.getElementById("combined-plugin-result");
      handleButtonClick(action, resultDiv);
    });
  });

  getCustomRegexPatterns().then(patterns => {
    const buttonsDiv = document.getElementById("buttons-div");
    patterns.forEach(({ label, pattern }) => {
      const button = document.createElement('button');
      button.textContent = label;
      button.className = 'action-button';
      button.addEventListener('click', () => {
        const matches = collectInfo(new RegExp(pattern, 'g'));
        showTableInfo(`${label} 提取结果`, matches, document.getElementById("combined-plugin-result"));
      });
      buttonsDiv.appendChild(button);
    });
  });
}

function handleButtonClick(action, resultDiv) {
  if (action === "domain") showDomainInfo(resultDiv);
  else if (action === "phone") showPhoneInfo(resultDiv);
  else if (action === "api") showApiInfo(resultDiv);
  else if (action === "path") showPathInfo(resultDiv);
  else if (action === "js") showJsFileInfo(resultDiv);
  else if (action === "regex") showRegexDialog();
  else if (action === "modules") showCustomRegexModules(resultDiv);
}