// content/dialogs/highlightDialog.js
function showHighlightSettingsDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  const title = document.createElement('h2');
  title.textContent = "高亮提醒设置";
  dialog.appendChild(title);

  const input = document.createElement('input');
  input.type = "text";
  getHighlightRules().then(rules => input.value = rules.join(','));
  dialog.appendChild(input);

  const saveButton = document.createElement('button');
  saveButton.textContent = "保存";
  saveButton.className = 'action-button';
  saveButton.addEventListener('click', () => {
    const rules = input.value.split(',').map(rule => rule.trim()).filter(rule => rule);
    setHighlightRules(rules).then(() => dialog.remove());
  });
  dialog.appendChild(saveButton);

  document.body.appendChild(dialog);
}

function shouldHighlight(value) {
  return getHighlightRules().then(rules => rules.some(rule => value.includes(rule)));
}