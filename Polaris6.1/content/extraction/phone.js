// content/extraction/phone.js
function showPhoneInfo(resultDiv) {
  const phoneInfo = collectInfo(regexPatterns.手机号);
  showTableInfo("电话提取结果", phoneInfo, resultDiv);
}