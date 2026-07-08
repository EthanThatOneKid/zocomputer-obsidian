function copyPrompt(btn) {
  var pre = btn.parentElement.querySelector('pre');
  var text = pre.textContent.trim();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function () {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  }
}
