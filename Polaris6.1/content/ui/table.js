// content/ui/table.js
function showTableInfo(titleText, values, resultDiv) {
  resultDiv.innerHTML = '';
  
  // 创建主容器
  const container = document.createElement('div');
  container.style.cssText = `
    background: linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%);
    padding: 20px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  `;

  // 添加科技网格背景
  const gridOverlay = document.createElement('div');
  gridOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(64, 158, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(64, 158, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  `;
  container.appendChild(gridOverlay);

  // 创建标题容器
  const titleContainer = document.createElement('div');
  titleContainer.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #3E3E3E;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 15px;
    position: relative;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.2);
  `;

  const title = document.createElement('div');
  title.textContent = titleText;
  title.style.cssText = "font-size: 18px; font-weight: 600; color: #F0F0F0; text-shadow: 0 0 10px rgba(74, 144, 226, 0.3);";
  titleContainer.appendChild(title);

  // 创建按钮组
  const buttonGroup = document.createElement('div');
  buttonGroup.style.cssText = 'display: flex; gap: 10px;';

  const copyButton = document.createElement('button');
  copyButton.textContent = "一键复制";
  copyButton.className = 'action-button';
  copyButton.style.cssText = `
    background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
    color: white;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  `;
  copyButton.addEventListener('mouseover', () => {
    copyButton.style.background = 'linear-gradient(135deg, #357ACD 0%, #6239B0 100%)';
    copyButton.style.boxShadow = '0 0 15px rgba(140, 158, 255, 0.5)';
  });
  copyButton.addEventListener('mouseout', () => {
    copyButton.style.background = 'linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%)';
    copyButton.style.boxShadow = 'none';
  });
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(values.join('\n')).then(() => alert(`已成功复制 ${titleText} 的内容到剪贴板`));
  });
  buttonGroup.appendChild(copyButton);

  const exportButton = document.createElement('button');
  exportButton.textContent = "导出为JSON";
  exportButton.className = 'action-button';
  exportButton.style.cssText = `
    background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
    color: white;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  `;
  exportButton.addEventListener('mouseover', () => {
    exportButton.style.background = 'linear-gradient(135deg, #357ACD 0%, #6239B0 100%)';
    exportButton.style.boxShadow = '0 0 15px rgba(140, 158, 255, 0.5)';
  });
  exportButton.addEventListener('mouseout', () => {
    exportButton.style.background = 'linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%)';
    exportButton.style.boxShadow = 'none';
  });
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
  buttonGroup.appendChild(exportButton);

  titleContainer.appendChild(buttonGroup);
  container.appendChild(titleContainer);

  // 创建表格
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    background: #2B2B32;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  `;

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.cssText = 'background: #3E3E3E;';
  
  const thContent = document.createElement('th');
  thContent.textContent = "内容";
  thContent.style.cssText = 'padding: 12px; text-align: left; color: #F0F0F0; font-weight: 600; border-bottom: 1px solid rgba(74, 144, 226, 0.2);';
  
  const thAction = document.createElement('th');
  thAction.textContent = "操作";
  thAction.style.cssText = 'padding: 12px; text-align: center; color: #F0F0F0; font-weight: 600; width: 100px; border-bottom: 1px solid rgba(74, 144, 226, 0.2);';
  
  headerRow.appendChild(thContent);
  headerRow.appendChild(thAction);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  values.forEach(value => {
    const row = document.createElement('tr');
    row.style.cssText = 'border-bottom: 1px solid rgba(74, 144, 226, 0.1);';
    
    const cellContent = document.createElement('td');
    cellContent.textContent = value;
    cellContent.style.cssText = 'padding: 12px; color: #AAAAAA;';
    
    const cellAction = document.createElement('td');
    cellAction.style.cssText = 'padding: 12px; text-align: center;';
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = "复制";
    copyBtn.style.cssText = `
      background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
      color: white;
      border: 0.5px solid rgba(255, 255, 255, 0.3);
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    `;
    copyBtn.addEventListener('mouseover', () => {
      copyBtn.style.background = 'linear-gradient(135deg, #357ACD 0%, #6239B0 100%)';
      copyBtn.style.boxShadow = '0 0 15px rgba(140, 158, 255, 0.5)';
    });
    copyBtn.addEventListener('mouseout', () => {
      copyBtn.style.background = 'linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%)';
      copyBtn.style.boxShadow = 'none';
    });
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(value).then(() => alert('已复制到剪贴板'));
    });
    
    cellAction.appendChild(copyBtn);
    row.appendChild(cellContent);
    row.appendChild(cellAction);
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  container.appendChild(table);

  if (!values.length) {
    const p = document.createElement('p');
    p.textContent = "未收集到信息";
    p.style.cssText = "color: #AAAAAA; font-size: 14px; text-align: center; padding: 20px; background: #2B2B32; border-radius: 6px;";
    container.appendChild(p);
  }

  resultDiv.appendChild(container);
}

function showTableInfoWithHighlight(titleText, values, resultDiv) {
  resultDiv.innerHTML = '';
  
  // 创建主容器
  const container = document.createElement('div');
  container.style.cssText = `
    background: linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%);
    padding: 20px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  `;

  // 添加科技网格背景
  const gridOverlay = document.createElement('div');
  gridOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(64, 158, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(64, 158, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  `;
  container.appendChild(gridOverlay);

  // 创建标题容器
  const titleContainer = document.createElement('div');
  titleContainer.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #3E3E3E;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 15px;
    position: relative;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.2);
  `;

  const title = document.createElement('div');
  title.textContent = titleText;
  title.style.cssText = "font-size: 18px; font-weight: 600; color: #F0F0F0; text-shadow: 0 0 10px rgba(74, 144, 226, 0.3);";
  titleContainer.appendChild(title);

  // 创建按钮组
  const buttonGroup = document.createElement('div');
  buttonGroup.style.cssText = 'display: flex; gap: 10px;';

  const copyButton = document.createElement('button');
  copyButton.textContent = "一键复制";
  copyButton.className = 'action-button';
  copyButton.style.cssText = `
    background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
    color: white;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  `;
  copyButton.addEventListener('mouseover', () => {
    copyButton.style.background = 'linear-gradient(135deg, #357ACD 0%, #6239B0 100%)';
    copyButton.style.boxShadow = '0 0 15px rgba(140, 158, 255, 0.5)';
  });
  copyButton.addEventListener('mouseout', () => {
    copyButton.style.background = 'linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%)';
    copyButton.style.boxShadow = 'none';
  });
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(values.join('\n')).then(() => alert(`已成功复制 ${titleText} 的内容到剪贴板`));
  });
  buttonGroup.appendChild(copyButton);

  const exportButton = document.createElement('button');
  exportButton.textContent = "导出为JSON";
  exportButton.className = 'action-button';
  exportButton.style.cssText = `
    background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
    color: white;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  `;
  exportButton.addEventListener('mouseover', () => {
    exportButton.style.background = 'linear-gradient(135deg, #357ACD 0%, #6239B0 100%)';
    exportButton.style.boxShadow = '0 0 15px rgba(140, 158, 255, 0.5)';
  });
  exportButton.addEventListener('mouseout', () => {
    exportButton.style.background = 'linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%)';
    exportButton.style.boxShadow = 'none';
  });
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
  buttonGroup.appendChild(exportButton);

  titleContainer.appendChild(buttonGroup);
  container.appendChild(titleContainer);

  // 创建表格
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    background: #2B2B32;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  `;

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.cssText = 'background: #3E3E3E;';
  
  const thContent = document.createElement('th');
  thContent.textContent = "内容";
  thContent.style.cssText = 'padding: 12px; text-align: left; color: #F0F0F0; font-weight: 600; border-bottom: 1px solid rgba(74, 144, 226, 0.2);';
  
  const thAction = document.createElement('th');
  thAction.textContent = "操作";
  thAction.style.cssText = 'padding: 12px; text-align: center; color: #F0F0F0; font-weight: 600; width: 100px; border-bottom: 1px solid rgba(74, 144, 226, 0.2);';
  
  headerRow.appendChild(thContent);
  headerRow.appendChild(thAction);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  
  // 获取高亮规则并应用
  getHighlightRules().then(rules => {
    values.forEach(value => {
      const row = document.createElement('tr');
      row.style.cssText = 'border-bottom: 1px solid rgba(74, 144, 226, 0.1);';
      
      const cellContent = document.createElement('td');
      cellContent.textContent = value;
      cellContent.style.cssText = 'padding: 12px; color: #AAAAAA;';
      
      // 检查是否需要高亮
      if (rules.some(rule => value.includes(rule))) {
        cellContent.style.color = "#00FFC8";
        cellContent.style.fontWeight = "bold";
        cellContent.style.textShadow = "0 0 10px rgba(0, 255, 200, 0.5)";
      }
      
      const cellAction = document.createElement('td');
      cellAction.style.cssText = 'padding: 12px; text-align: center;';
      
      const copyBtn = document.createElement('button');
      copyBtn.textContent = "复制";
      copyBtn.style.cssText = `
        background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
        color: white;
        border: 0.5px solid rgba(255, 255, 255, 0.3);
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      `;
      copyBtn.addEventListener('mouseover', () => {
        copyBtn.style.background = 'linear-gradient(135deg, #357ACD 0%, #6239B0 100%)';
        copyBtn.style.boxShadow = '0 0 15px rgba(140, 158, 255, 0.5)';
      });
      copyBtn.addEventListener('mouseout', () => {
        copyBtn.style.background = 'linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%)';
        copyBtn.style.boxShadow = 'none';
      });
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(value).then(() => alert('已复制到剪贴板'));
      });
      
      cellAction.appendChild(copyBtn);
      row.appendChild(cellContent);
      row.appendChild(cellAction);
      tbody.appendChild(row);
    });
  });

  table.appendChild(tbody);
  container.appendChild(table);

  if (!values.length) {
    const p = document.createElement('p');
    p.textContent = "未收集到信息";
    p.style.cssText = "color: #AAAAAA; font-size: 14px; text-align: center; padding: 20px; background: #2B2B32; border-radius: 6px;";
    container.appendChild(p);
  }

  resultDiv.appendChild(container);
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