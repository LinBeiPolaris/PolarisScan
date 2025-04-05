// scripts/dialogs.js
function showRegexDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  const title = document.createElement('h2');
  title.textContent = "自定义正则表达式";
  dialog.appendChild(title);

  const closeButton = document.createElement('button');
  closeButton.textContent = "关闭";
  closeButton.className = 'action-button';
  closeButton.style.cssText = "position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: linear-gradient(45deg, #dc3545, #e66471); font-size: 12px;";
  closeButton.addEventListener('click', () => dialog.remove());
  dialog.appendChild(closeButton);

  const list = document.createElement('ul');
  getCustomRegexPatterns().then(patterns => {
    patterns.forEach(({ label, pattern }, index) => {
      const item = document.createElement('li');
      const labelInput = document.createElement('input');
      labelInput.type = "text";
      labelInput.value = label;
      labelInput.addEventListener('change', () => {
        patterns[index].label = labelInput.value;
        setCustomRegexPatterns(patterns);
      });

      const patternInput = document.createElement('input');
      patternInput.type = "text";
      patternInput.value = pattern;
      patternInput.addEventListener('change', () => {
        try {
          patterns[index].pattern = patternInput.value;
          setCustomRegexPatterns(patterns);
        } catch (error) {
          alert(`无效的正则表达式: ${error.message}`);
        }
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = "删除";
      deleteButton.className = 'action-button delete';
      deleteButton.addEventListener('click', () => {
        if (confirm(`确定要删除 ${label} 规则吗？`)) {
          patterns.splice(index, 1);
          setCustomRegexPatterns(patterns).then(() => {
            item.remove();
            initUI();
          });
        }
      });

      item.appendChild(labelInput);
      item.appendChild(patternInput);
      item.appendChild(deleteButton);
      list.appendChild(item);
    });

    const addButton = document.createElement('button');
    addButton.textContent = "添加新规则";
    addButton.className = 'action-button';
    addButton.addEventListener('click', () => {
      const newItem = document.createElement('li');
      const newLabelInput = document.createElement('input');
      newLabelInput.type = "text";
      newLabelInput.placeholder = "模块标签";

      const newPatternInput = document.createElement('input');
      newPatternInput.type = "text";
      newPatternInput.placeholder = "正则表达式";

      const newDeleteButton = document.createElement('button');
      newDeleteButton.textContent = "删除";
      newDeleteButton.className = 'action-button delete';
      newDeleteButton.addEventListener('click', () => {
        if (confirm("确定要删除这个新规则吗？")) newItem.remove();
      });

      const saveButton = document.createElement('button');
      saveButton.textContent = "保存";
      saveButton.className = 'action-button';
      saveButton.addEventListener('click', () => {
        const label = newLabelInput.value;
        const pattern = newPatternInput.value;
        if (label && pattern) {
          try {
            patterns.push({ label, pattern });
            setCustomRegexPatterns(patterns).then(() => {
              initUI();
              dialog.remove();
            });
          } catch (error) {
            alert(`无效的正则表达式: ${error.message}`);
          }
        } else {
          alert("请输入模块标签和正则表达式");
        }
      });

      newItem.appendChild(newLabelInput);
      newItem.appendChild(newPatternInput);
      newItem.appendChild(newDeleteButton);
      newItem.appendChild(saveButton);
      list.appendChild(newItem);
    });
    dialog.appendChild(list);
    dialog.appendChild(addButton);
  });

  document.body.appendChild(dialog);
}

function showCustomRegexModules(resultDiv) {
  resultDiv.innerHTML = '';
  const title = document.createElement('div');
  title.textContent = "自定义正则表达式模块";
  title.style.cssText = "font-size: 16px; font-weight: 600; color: #2c3e50; margin-bottom: 10px;";
  resultDiv.appendChild(title);

  getCustomRegexPatterns().then(patterns => {
    patterns.forEach(({ label, pattern }) => {
      const moduleDiv = document.createElement('div');
      moduleDiv.style.cssText = "margin-bottom: 10px;";

      const moduleTitle = document.createElement('div');
      moduleTitle.textContent = label;
      moduleTitle.style.cssText = "font-size: 14px; font-weight: 500; color: #2c3e50;";
      moduleDiv.appendChild(moduleTitle);

      const modulePattern = document.createElement('div');
      modulePattern.textContent = pattern;
      modulePattern.style.cssText = "font-size: 12px; color: #666;";
      moduleDiv.appendChild(modulePattern);

      const runButton = document.createElement('button');
      runButton.textContent = "运行";
      runButton.className = 'action-button';
      runButton.addEventListener('click', () => {
        const matches = collectInfo(new RegExp(pattern, 'g'));
        showTableInfo(`${label} 提取结果`, matches, resultDiv);
      });
      moduleDiv.appendChild(runButton);

      resultDiv.appendChild(moduleDiv);
    });

    if (patterns.length === 0) {
      const p = document.createElement('p');
      p.textContent = "暂无自定义正则表达式模块";
      p.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
      resultDiv.appendChild(p);
    }
  });
}

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