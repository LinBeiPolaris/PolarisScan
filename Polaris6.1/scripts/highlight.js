// 高亮设置对话框
function showHighlightDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';
  dialog.innerHTML = `
    <button class="dialog-close-btn">&times;</button>
    <h2>高亮提醒设置</h2>
    <div class="highlight-form">
      <input type="text" id="highlight-pattern" placeholder="输入要匹配的文本或正则表达式" class="highlight-input">
      <div class="button-group">
        <button class="save-btn">保存</button>
        <button class="dialog-close-btn-bottom">关闭</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(dialog);

  // 右上角关闭按钮事件
  const closeBtn = dialog.querySelector('.dialog-close-btn');
  closeBtn.addEventListener('click', () => {
    dialog.remove();
  });

  // 底部关闭按钮事件
  const closeBtnBottom = dialog.querySelector('.dialog-close-btn-bottom');
  closeBtnBottom.addEventListener('click', () => {
    dialog.remove();
  });

  // 点击对话框外部关闭
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.remove();
    }
  });

  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dialog.remove();
    }
  });

  // 保存按钮事件
  const saveBtn = dialog.querySelector('.save-btn');
  saveBtn.addEventListener('click', () => {
    const pattern = document.getElementById('highlight-pattern').value;
    if (pattern) {
      // TODO: 保存高亮规则的逻辑
      console.log('保存高亮规则:', pattern);
    }
    dialog.remove();
  });
}

// 添加样式
const style = document.createElement('style');
style.textContent = `
  .highlight-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .highlight-input {
    width: 100%;
    padding: 10px;
    background: #2B2B32;
    border: 1px solid rgba(64, 158, 255, 0.2);
    border-radius: 8px;
    color: #F0F0F0;
    font-size: 14px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .save-btn {
    padding: 8px 20px;
    background: linear-gradient(135deg, #409EFF 0%, #7C4DFF 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .save-btn:hover {
    background: linear-gradient(135deg, #357ACD 0%, #6239B0 100%);
    box-shadow: 0 0 15px rgba(140, 158, 255, 0.5);
  }

  .dialog-close-btn-bottom {
    padding: 8px 20px;
    background: linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .dialog-close-btn-bottom:hover {
    background: linear-gradient(135deg, #E43819 0%, #E63A5F 100%);
    box-shadow: 0 0 15px rgba(255, 75, 43, 0.5);
  }
`;

document.head.appendChild(style); 