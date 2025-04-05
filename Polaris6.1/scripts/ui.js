// scripts/ui.js
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  const onMouseDown = (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;

      newLeft = Math.max(0, Math.min(newLeft, windowWidth - elementWidth));
      newTop = Math.max(0, Math.min(newTop, windowHeight - elementHeight));

      element.style.left = newLeft + 'px';
      element.style.top = newTop + 'px';
    }
  };

  const onMouseUp = () => (isDragging = false);

  element.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  return () => {
    element.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
}

function showTableInfo(titleText, values, resultDiv) {
  resultDiv.innerHTML = '';
  const titleContainer = document.createElement('div');
  titleContainer.style.cssText = 'display: flex; align-items: center; justify-content: space-between;';

  const title = document.createElement('div');
  title.textContent = titleText;
  title.style.cssText = "font-size: 16px; font-weight: 600; color: #2c3e50; margin-bottom: 10px;";
  titleContainer.appendChild(title);

  const copyButton = document.createElement('button');
  copyButton.textContent = "一键复制";
  copyButton.className = 'action-button';
  copyButton.style.marginLeft = "10px";
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(values.join('\n')).then(() => alert(`已成功复制 ${titleText} 的内容到剪贴板`));
  });
  titleContainer.appendChild(copyButton);

  const exportButton = document.createElement('button');
  exportButton.textContent = "导出为JSON";
  exportButton.className = 'action-button';
  exportButton.style.marginLeft = "10px";
  exportButton.addEventListener('click', () => {
    const json = JSON.stringify(values, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${titleText}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  titleContainer.appendChild(exportButton);

  resultDiv.appendChild(titleContainer);

  const table = createTable(["内容"], values.map(value => [value]));
  resultDiv.appendChild(table);

  if (!values.length) {
    const p = document.createElement('p');
    p.textContent = "未收集到信息";
    p.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
    resultDiv.appendChild(p);
  }
}

function showTableInfoWithHighlight(titleText, values, resultDiv) {
  resultDiv.innerHTML = '';
  const titleContainer = document.createElement('div');
  titleContainer.style.cssText = 'display: flex; align-items: center; justify-content: space-between;';

  const title = document.createElement('div');
  title.textContent = titleText;
  title.style.cssText = "font-size: 16px; font-weight: 600; color: #2c3e50; margin-bottom: 10px;";
  titleContainer.appendChild(title);

  const copyButton = document.createElement('button');
  copyButton.textContent = "一键复制";
  copyButton.className = 'action-button';
  copyButton.style.marginLeft = "10px";
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(values.join('\n')).then(() => alert(`已成功复制 ${titleText} 的内容到剪贴板`));
  });
  titleContainer.appendChild(copyButton);

  const exportButton = document.createElement('button');
  exportButton.textContent = "导出为JSON";
  exportButton.className = 'action-button';
  exportButton.style.marginLeft = "10px";
  exportButton.addEventListener('click', () => {
    const json = JSON.stringify(values, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${titleText}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  titleContainer.appendChild(exportButton);

  resultDiv.appendChild(titleContainer);

  const table = createTable(["内容"], values.map(value => [value]), shouldHighlight);
  resultDiv.appendChild(table);

  if (!values.length) {
    const p = document.createElement('p');
    p.textContent = "未收集到信息";
    p.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
    resultDiv.appendChild(p);
  }
}

function createTable(headers, rows, shouldHighlight = false) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach(rowData => {
    const row = document.createElement('tr');
    rowData.forEach((cellData, index) => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      if (index === 0 && shouldHighlight) {
        getHighlightRules().then(rules => {
          if (rules.some(rule => cellData.includes(rule))) cell.style.color = "red";
        });
      }
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}