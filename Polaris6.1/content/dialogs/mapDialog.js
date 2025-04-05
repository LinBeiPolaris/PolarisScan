// content/dialogs/mapDialog.js
function showMapDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  const title = document.createElement('h2');
  title.textContent = "提取Map文件";
  dialog.appendChild(title);

  const closeButton = document.createElement('button');
  closeButton.textContent = "关闭";
  closeButton.className = 'action-button';
  closeButton.style.cssText = "position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: linear-gradient(45deg, #dc3545, #e66471); font-size: 12px;";
  closeButton.addEventListener('click', () => dialog.remove());
  dialog.appendChild(closeButton);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'map-dialog-content';

  // 显示加载动画
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  contentDiv.appendChild(loadingSpinner);

  dialog.appendChild(contentDiv);

  // 添加历史记录区域
  const historyDiv = document.createElement('div');
  historyDiv.className = 'map-history';

  const historyTitle = document.createElement('h3');
  historyTitle.textContent = "历史记录";
  historyDiv.appendChild(historyTitle);

  // 添加清空历史记录按钮
  const clearButton = document.createElement('button');
  clearButton.textContent = "清空历史记录";
  clearButton.className = 'clear-history-button';
  clearButton.addEventListener('click', () => {
    if (confirm("确定要清空历史记录吗？")) {
      clearMapHistory().then(() => {
        historyContent.innerHTML = '';
        const noHistoryText = document.createElement('p');
        noHistoryText.textContent = "暂无历史记录";
        noHistoryText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
        historyContent.appendChild(noHistoryText);
      });
    }
  });
  historyDiv.appendChild(clearButton);

  const historyContent = document.createElement('div');
  historyContent.className = 'map-history-content';
  historyDiv.appendChild(historyContent);

  // 加载历史记录
  getMapHistory().then(history => {
    if (history.length === 0) {
      const noHistoryText = document.createElement('p');
      noHistoryText.textContent = "暂无历史记录";
      noHistoryText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
      historyContent.appendChild(noHistoryText);
    } else {
      history.forEach(item => {
        const historyEntry = document.createElement('div');
        const historyLink = document.createElement('p');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = item.url;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          chrome.runtime.sendMessage({ action: "downloadFile", url: item.url }, (response) => {
            if (response && response.success) {
              console.log("Download started:", item.url);
            } else {
              alert("下载失败，请检查URL或网络连接");
            }
          });
        });
        historyLink.appendChild(link);

        const sourceText = document.createElement('div');
        sourceText.className = 'source';
        sourceText.textContent = `来源: ${item.source}`;
        historyEntry.appendChild(sourceText);

        const timestampText = document.createElement('div');
        timestampText.className = 'timestamp';
        timestampText.textContent = `提取时间: ${new Date(item.timestamp).toLocaleString()}`;
        historyEntry.appendChild(timestampText);

        historyEntry.appendChild(historyLink);
        historyContent.appendChild(historyEntry);
      });
    }
  });

  dialog.appendChild(historyDiv);
  document.body.appendChild(dialog);

  // 提取潜在的Map文件URL
  const potentialMapUrls = extractPotentialMapUrls();

  if (potentialMapUrls.length === 0) {
    contentDiv.innerHTML = '';
    const noMapText = document.createElement('p');
    noMapText.textContent = "该网站暂无泄露Map文件";
    noMapText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
    contentDiv.appendChild(noMapText);
    return;
  }

  // 验证Map文件是否存在（限制并发请求）
  verifyMapFiles(potentialMapUrls, (verifiedUrls) => {
    contentDiv.innerHTML = ''; // 移除加载动画
    if (verifiedUrls.length === 0) {
      const noMapText = document.createElement('p');
      noMapText.textContent = "该网站暂无泄露Map文件";
      noMapText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
      contentDiv.appendChild(noMapText);
    } else {
      verifiedUrls.forEach(url => {
        const mapLink = document.createElement('p');
        const link = document.createElement('a');
        link.href = '#'; // 防止默认跳转
        link.textContent = url;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          // 使用chrome.downloads API下载文件
          chrome.runtime.sendMessage({ action: "downloadFile", url: url }, (response) => {
            if (response && response.success) {
              console.log("Download started:", url);
              // 成功下载后保存到历史记录
              const source = window.location.href; // 当前页面URL作为来源
              saveMapHistory(url, source).then(history => {
                historyContent.innerHTML = '';
                if (history.length === 0) {
                  const noHistoryText = document.createElement('p');
                  noHistoryText.textContent = "暂无历史记录";
                  noHistoryText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
                  historyContent.appendChild(noHistoryText);
                } else {
                  history.forEach(item => {
                    const historyEntry = document.createElement('div');
                    const historyLink = document.createElement('p');
                    const hLink = document.createElement('a');
                    hLink.href = '#';
                    hLink.textContent = item.url;
                    hLink.addEventListener('click', (e) => {
                      e.preventDefault();
                      chrome.runtime.sendMessage({ action: "downloadFile", url: item.url }, (response) => {
                        if (response && response.success) {
                          console.log("Download started:", item.url);
                        } else {
                          alert("下载失败，请检查URL或网络连接");
                        }
                      });
                    });
                    historyLink.appendChild(hLink);

                    const sourceText = document.createElement('div');
                    sourceText.className = 'source';
                    sourceText.textContent = `来源: ${item.source}`;
                    historyEntry.appendChild(sourceText);

                    const timestampText = document.createElement('div');
                    timestampText.className = 'timestamp';
                    timestampText.textContent = `提取时间: ${new Date(item.timestamp).toLocaleString()}`;
                    historyEntry.appendChild(timestampText);

                    historyEntry.appendChild(historyLink);
                    historyContent.appendChild(historyEntry);
                  });
                }
              });
            } else {
              alert("下载失败，请检查URL或网络连接");
            }
          });
        });
        mapLink.appendChild(link);
        contentDiv.appendChild(mapLink);
      });
    }
  });

  // 监控动态加载的内容
  observeDynamicContent(contentDiv, historyContent);
}

// 提取潜在的Map文件URL
function extractPotentialMapUrls() {
  const potentialUrls = new Set();

  // 支持更多Map文件类型
  const mapFileExtensions = ['.js.map'];//, '.css.map', '.ts.map'

  // 提取<script>和<link>标签中的URL
  const scripts = document.getElementsByTagName('script');
  const links = document.getElementsByTagName('link');

  // 处理<script>标签
  for (const script of scripts) {
    // 提取src属性
    const src = script.getAttribute('src');
    if (src && (src.endsWith('.js') || src.endsWith('.ts') || src.endsWith('.css'))) {
      mapFileExtensions.forEach(ext => {
        const mapUrl = src.replace(/\.(js|ts|css)$/, ext);
        potentialUrls.add(resolveUrl(mapUrl));
      });
    }

    // 提取内联脚本中的sourceMappingURL
    const scriptContent = script.textContent;
    if (scriptContent) {
      const sourceMappingRegex = /\/\/#\s*sourceMappingURL=([^\s]+)/g;
      let match;
      while ((match = sourceMappingRegex.exec(scriptContent)) !== null) {
        const mapUrl = match[1];
        potentialUrls.add(resolveUrl(mapUrl));
      }
    }
  }

  // 处理<link>标签
  for (const link of links) {
    const href = link.getAttribute('href');
    if (href && (href.endsWith('.css') || href.endsWith('.js') || href.endsWith('.ts'))) {
      mapFileExtensions.forEach(ext => {
        const mapUrl = href.replace(/\.(js|ts|css)$/, ext);
        potentialUrls.add(resolveUrl(mapUrl));
      });

      // 提取CSS文件中的sourceMappingURL
      if (href.endsWith('.css')) {
        fetchCssContent(href, (content) => {
          const sourceMappingRegex = /\/\*#\s*sourceMappingURL=([^\s]+)\*\//g;
          let match;
          while ((match = sourceMappingRegex.exec(content)) !== null) {
            const mapUrl = match[1];
            potentialUrls.add(resolveUrl(mapUrl));
          }
        });
      }
    }
  }

  // 提取页面源码中的sourceMappingURL
  const source = document.documentElement.outerHTML;
  const sourceMappingRegex = /\/\/#\s*sourceMappingURL=([^\s]+)/g;
  let match;
  while ((match = sourceMappingRegex.exec(source)) !== null) {
    const mapUrl = match[1];
    potentialUrls.add(resolveUrl(mapUrl));
  }

  return Array.from(potentialUrls);
}

// 解析相对URL为绝对URL
function resolveUrl(url) {
  try {
    return new URL(url, window.location.href).href;
  } catch (error) {
    console.error(`Error resolving URL: ${url}`, error);
    return url; // 返回原始URL作为备用
  }
}

// 提取CSS文件内容
function fetchCssContent(url, callback) {
  chrome.runtime.sendMessage({ action: "fetchContent", url: url }, (response) => {
    if (response && response.content) {
      callback(response.content);
    }
  });
}

// 验证Map文件是否存在（限制并发请求）
function verifyMapFiles(urls, callback) {
  const verifiedUrls = [];
  const maxConcurrent = 5; // 最大并发请求数
  let currentIndex = 0;
  let activeRequests = 0;

  function processNext() {
    while (currentIndex < urls.length && activeRequests < maxConcurrent) {
      const url = urls[currentIndex];
      activeRequests++;
      currentIndex++;

      chrome.runtime.sendMessage({ action: "checkUrl", url: url }, (response) => {
        if (response && response.exists) {
          verifiedUrls.push(url);
        }
        activeRequests--;
        if (currentIndex === urls.length && activeRequests === 0) {
          callback(verifiedUrls);
        } else {
          processNext();
        }
      });
    }
  }

  if (urls.length === 0) {
    callback(verifiedUrls);
    return;
  }

  processNext();
}

// 监控动态加载的内容
function observeDynamicContent(contentDiv, historyContent) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        const potentialUrls = extractPotentialMapUrls();
        if (potentialUrls.length > 0) {
          verifyMapFiles(potentialUrls, (verifiedUrls) => {
            if (verifiedUrls.length > 0) {
              contentDiv.innerHTML = ''; // 清空现有内容
              verifiedUrls.forEach(url => {
                const mapLink = document.createElement('p');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = url;
                link.addEventListener('click', (e) => {
                  e.preventDefault();
                  chrome.runtime.sendMessage({ action: "downloadFile", url: url }, (response) => {
                    if (response && response.success) {
                      console.log("Download started:", url);
                      // 成功下载后保存到历史记录
                      const source = window.location.href;
                      saveMapHistory(url, source).then(history => {
                        historyContent.innerHTML = '';
                        if (history.length === 0) {
                          const noHistoryText = document.createElement('p');
                          noHistoryText.textContent = "暂无历史记录";
                          noHistoryText.style.cssText = "color: #999; font-size: 14px; text-align: center; padding: 10px;";
                          historyContent.appendChild(noHistoryText);
                        } else {
                          history.forEach(item => {
                            const historyEntry = document.createElement('div');
                            const historyLink = document.createElement('p');
                            const hLink = document.createElement('a');
                            hLink.href = '#';
                            hLink.textContent = item.url;
                            hLink.addEventListener('click', (e) => {
                              e.preventDefault();
                              chrome.runtime.sendMessage({ action: "downloadFile", url: item.url }, (response) => {
                                if (response && response.success) {
                                  console.log("Download started:", item.url);
                                } else {
                                  alert("下载失败，请检查URL或网络连接");
                                }
                              });
                            });
                            historyLink.appendChild(hLink);

                            const sourceText = document.createElement('div');
                            sourceText.className = 'source';
                            sourceText.textContent = `来源: ${item.source}`;
                            historyEntry.appendChild(sourceText);

                            const timestampText = document.createElement('div');
                            timestampText.className = 'timestamp';
                            timestampText.textContent = `提取时间: ${new Date(item.timestamp).toLocaleString()}`;
                            historyEntry.appendChild(timestampText);

                            historyEntry.appendChild(historyLink);
                            historyContent.appendChild(historyEntry);
                          });
                        }
                      });
                    } else {
                      alert("下载失败，请检查URL或网络连接");
                    }
                  });
                });
                mapLink.appendChild(link);
                contentDiv.appendChild(mapLink);
              });
            }
          });
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}