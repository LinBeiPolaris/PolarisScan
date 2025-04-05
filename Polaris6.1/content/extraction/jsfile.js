// content/extraction/jsfile.js
function showJsFileInfo(resultDiv) {
  const rawJsPathInfo = collectInfo(regexPatterns["JS文件路径"]);
  
  // 处理提取到的数据
  const jsPathInfo = [];
  
  rawJsPathInfo.forEach(text => {
    // 从script标签或引号中提取js路径
    const matches = text.match(/(?:src=["']([^"']+\.js)["']|["']([^"']+\.js)["'])/i);
    if (matches) {
      // 获取匹配到的路径（可能在第一个或第二个捕获组中）
      const jsPath = matches[1] || matches[2];
      if (jsPath) {
        // 处理相对路径，转换为完整URL
        const fullPath = dealUrl(jsPath);
        jsPathInfo.push(fullPath);
      }
    }
  });

  // 去重并过滤空值
  const uniqueJsPathInfo = [...new Set(jsPathInfo)].filter(path => path && path.trim());
  
  showTableInfoWithHighlight("JS 文件路径提取结果", uniqueJsPathInfo, resultDiv);
}