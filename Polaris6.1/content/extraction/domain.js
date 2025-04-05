// content/extraction/domain.js
function showDomainInfo(resultDiv) {
  const domainInfo = collectInfo(regexPatterns.域名);
  showTableInfo("域名提取结果", domainInfo, resultDiv);
}