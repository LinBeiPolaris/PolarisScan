// content/extraction/path.js
function showPathInfo(resultDiv) {
  const pathInfo = [...new Set(collectInfo(regexPatterns.Path))];
  showTableInfoWithHighlight("Path 提取结果", pathInfo, resultDiv);
}