// content/storage/storage.js
function getCustomRegexPatterns() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['customRegexPatterns'], (result) => {
      resolve(result.customRegexPatterns || []);
    });
  });
}

function setCustomRegexPatterns(patterns) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ customRegexPatterns: patterns }, () => {
      resolve();
    });
  });
}

// 修改：存储Map文件历史记录，包含URL、来源和时间
function saveMapHistory(url, source) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['mapHistory'], (result) => {
      let history = result.mapHistory || [];
      const timestamp = new Date().toISOString(); // 记录当前时间
      // 避免重复记录（基于URL去重）
      if (!history.some(item => item.url === url)) {
        history.unshift({ url, source, timestamp }); // 添加到数组开头
        if (history.length > 10) {
          history = history.slice(0, 10); // 限制最多10条
        }
        chrome.storage.local.set({ mapHistory: history }, () => {
          resolve(history);
        });
      } else {
        resolve(history);
      }
    });
  });
}

// 获取Map文件历史记录
function getMapHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['mapHistory'], (result) => {
      resolve(result.mapHistory || []);
    });
  });
}

// 新增：清空Map文件历史记录
function clearMapHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.set({ mapHistory: [] }, () => {
      resolve();
    });
  });
}

// 获取高亮规则
function getHighlightRules() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['highlightRules'], (result) => {
      resolve(result.highlightRules || []);
    });
  });
}

// 设置高亮规则
function setHighlightRules(rules) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ highlightRules: rules }, () => {
      resolve();
    });
  });
}