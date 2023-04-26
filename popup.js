function toggleColorBlindMode() {
  chrome.runtime.sendMessage({toggleColorBlindMode: true}, function(response) {
    var colorBlindMode = response.colorBlindMode;
    var toggleColorBlindModeButton = document.getElementById('toggleColorBlindModeButton');
    if (colorBlindMode) {
      toggleColorBlindModeButton.textContent = 'Turn Off Color-blind Mode';
    } else {
      toggleColorBlindModeButton.textContent = 'Turn On Color-blind Mode';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var toggleColorBlindModeButton = document.getElementById('toggleColorBlindModeButton');
  toggleColorBlindModeButton.addEventListener('click', toggleColorBlindMode);
});
