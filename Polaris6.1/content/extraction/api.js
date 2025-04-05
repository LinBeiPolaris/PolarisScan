// content/extraction/api.js
function showApiInfo(resultDiv) {
  const apiInfo = collectInfo(regexPatterns.Url).filter(url => !url.match(regexPatterns.StaticUrl));
  showTableInfo("API 提取结果", apiInfo, resultDiv);
}