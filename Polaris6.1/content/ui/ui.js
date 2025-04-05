// content/ui/ui.js
function initUI() {
  const div = document.getElementById("combined-plugin-float-div");
  if (!div) {
    console.error("UI div not found!");
    return;
  }

  const title = document.getElementById("title");
  let longPressTimer;
  title.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => makeDraggable(div), 300);
  });
  title.addEventListener('mouseup', () => clearTimeout(longPressTimer));

  document.getElementById("highlight-button").addEventListener('click', showHighlightSettingsDialog);
  document.getElementById("encode-decode-button").addEventListener('click', showEncodeDecodeDialog);
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

  createBubbleControl(div);
  
  // 初始化渗透测试备忘录
  window.pentestDialog.init();
}

function handleButtonClick(action, resultDiv) {
  if (action === "domain") showDomainInfo(resultDiv);
  else if (action === "phone") showPhoneInfo(resultDiv);
  else if (action === "api") showApiInfo(resultDiv);
  else if (action === "path") showPathInfo(resultDiv);
  else if (action === "js") showJsFileInfo(resultDiv);
  else if (action === "regex") showRegexDialog();
  else if (action === "modules") showCustomRegexModules(resultDiv);
  else if (action === "pentest") PentestDialog.getInstance().show();
}

function showPentestMemoDialog() {
  window.pentestDialog.show();
}