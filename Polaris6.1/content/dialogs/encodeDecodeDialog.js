// content/dialogs/encodeDecodeDialog.js
function showEncodeDecodeDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  const title = document.createElement('h2');
  title.textContent = "编码解码工具";
  dialog.appendChild(title);

  const closeButton = document.createElement('button');
  closeButton.textContent = "关闭";
  closeButton.className = 'action-button';
  closeButton.style.cssText = "position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: linear-gradient(45deg, #dc3545, #e66471); font-size: 12px;";
  closeButton.addEventListener('click', () => dialog.remove());
  dialog.appendChild(closeButton);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'encode-decode-buttons';

  const methods = [
    { name: "URL", encode: urlEncode, decode: urlDecode },
    { name: "Base64", encode: base64Encode, decode: base64Decode },
    { name: "Base32", encode: base32Encode, decode: base32Decode },
    { name: "Unicode", encode: unicodeEncode, decode: unicodeDecode },
    { name: "ASCII", encode: asciiEncode, decode: asciiDecode }
  ];

  methods.forEach(method => {
    const encodeButton = document.createElement('button');
    encodeButton.textContent = `${method.name} 编码`;
    encodeButton.addEventListener('click', () => {
      const input = dialog.querySelector('textarea');
      const output = dialog.querySelector('#encode-decode-output');
      try {
        const result = method.encode(input.value);
        output.value = result;
      } catch (error) {
        output.value = `编码错误: ${error.message}`;
      }
    });
    buttonsDiv.appendChild(encodeButton);

    const decodeButton = document.createElement('button');
    decodeButton.textContent = `${method.name} 解码`;
    decodeButton.addEventListener('click', () => {
      const input = dialog.querySelector('textarea');
      const output = dialog.querySelector('#encode-decode-output');
      try {
        const result = method.decode(input.value);
        output.value = result;
      } catch (error) {
        output.value = `解码错误: ${error.message}`;
      }
    });
    buttonsDiv.appendChild(decodeButton);
  });

  dialog.appendChild(buttonsDiv);

  const inputTextarea = document.createElement('textarea');
  inputTextarea.placeholder = "请输入要编码/解码的内容";
  dialog.appendChild(inputTextarea);

  const outputTextarea = document.createElement('textarea');
  outputTextarea.id = 'encode-decode-output';
  outputTextarea.placeholder = "编码/解码结果";
  outputTextarea.readOnly = true;
  dialog.appendChild(outputTextarea);

  const copyButton = document.createElement('button');
  copyButton.textContent = "复制结果";
  copyButton.className = 'action-button';
  copyButton.addEventListener('click', () => {
    const output = dialog.querySelector('#encode-decode-output');
    navigator.clipboard.writeText(output.value).then(() => alert("已复制结果到剪贴板"));
  });
  dialog.appendChild(copyButton);

  document.body.appendChild(dialog);
}

// URL 编码/解码
function urlEncode(str) {
  return encodeURIComponent(str).replace(/'/g, "%27").replace(/"/g, "%22");
}

function urlDecode(str) {
  return decodeURIComponent(str.replace(/%27/g, "'").replace(/%22/g, '"'));
}

// Base64 编码/解码
function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

// Base32 编码/解码
function base32Encode(str) {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = '';
  let result = '';

  // Convert string to binary
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    bits += charCode.toString(2).padStart(8, '0');
  }

  // Pad bits to be divisible by 5
  while (bits.length % 5 !== 0) bits += '0';

  // Convert to Base32
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5);
    const index = parseInt(chunk, 2);
    result += base32Chars[index];
  }

  // Pad with '=' to make length divisible by 8
  while (result.length % 8 !== 0) result += '=';

  return result;
}

function base32Decode(str) {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  str = str.replace(/=+$/, ''); // Remove padding
  let bits = '';

  // Convert Base32 to binary
  for (let i = 0; i < str.length; i++) {
    const index = base32Chars.indexOf(str[i].toUpperCase());
    if (index === -1) throw new Error("无效的Base32字符");
    bits += index.toString(2).padStart(5, '0');
  }

  // Convert binary to string
  let result = '';
  for (let i = 0; i < bits.length - 4; i += 8) {
    const chunk = bits.slice(i, i + 8);
    const charCode = parseInt(chunk, 2);
    result += String.fromCharCode(charCode);
  }

  return result;
}

// Unicode 编码/解码
function unicodeEncode(str) {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    return `\\u${code.toString(16).padStart(4, '0')}`;
  }).join('');
}

function unicodeDecode(str) {
  return str.replace(/\\u([\dA-Fa-f]{4})/g, (_, code) => {
    return String.fromCharCode(parseInt(code, 16));
  });
}

// ASCII 编码/解码
function asciiEncode(str) {
  return str.split('').map(char => char.charCodeAt(0)).join(' ');
}

function asciiDecode(str) {
  return str.split(' ').map(num => String.fromCharCode(parseInt(num))).join('');
}