document.getElementById('fileInput').addEventListener('change', async function () {
  const file = this.files[0];
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('fileHash').value = hashHex;
  }
});

function compareHashes() {
  const calculated = document.getElementById('fileHash').value.trim().toLowerCase();
  const expected = document.getElementById('expectedHash').value.trim().toLowerCase();
  const result = document.getElementById('result');

  if (!calculated) {
    result.textContent = 'Please upload a file first.';
    result.style.color = 'red';
    return;
  }

  if (!expected) {
    result.textContent = 'Please enter the expected hash value.';
    result.style.color = 'red';
    return;
  }

  if (calculated === expected) {
    result.textContent = '✅ File integrity verified. Hashes match.';
    result.style.color = 'green';
  } else {
    result.textContent = '❌ File integrity compromised. Hashes do not match.';
    result.style.color = 'red';
  }
}
