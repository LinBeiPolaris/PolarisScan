// content/extraction/regex.js
const regexPatterns = {
  "IP": /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
  "IP_PORT": /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):[0-9]{1,5}\b/g,
  "域名": /[a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)/g,
  "手机号": /[^\w]((?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8})[^\w]/g,
  "邮箱": /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  "JWT": /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/g,
  "算法": /(sha1|sha256|md5|aes)/gi,
  "Secret": /\b(secret|key|token|password)\b/gi,
  "Path": /(?:\/[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]+)+/g,
  "JS文件路径": /(?:<script[^>]+src=["']([^"']+\.js)["']|["']([^"']+\.js)["'])/gi,
  "IncompletePath": /\/[^\s?#]*$/g,
  "Url": /https?:\/\/[^\s/$.?#].[^\s]*/g,
  "StaticUrl": /\.(jpg|jpeg|png|gif|css|js|ico|svg)$/gi
};

const source = document.documentElement.outerHTML;

function collectInfo(pattern) {
  const matches = source.match(pattern) || [];
  return [...new Set(matches)];
}

function dealUrl(u) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const href = window.location.href;
  if (u.startsWith("http")) return u;
  if (u.startsWith("//")) return protocol + u;
  if (u.startsWith('/')) return protocol + '//' + host + u;
  if (u.startsWith('./')) {
    const tmpHref = href.includes('#') ? href.slice(0, href.indexOf('#')) : href;
    return tmpHref.slice(0, tmpHref.lastIndexOf('/') + 1) + u.slice(2);
  }
  const tmpHref = href.includes('#') ? href.slice(0, href.indexOf('#')) : href;
  return tmpHref.slice(0, tmpHref.lastIndexOf('/') + 1) + u;
}