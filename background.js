chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({colorBlindMode: false}, function() {
    console.log("Color-blind mode is set to off.");
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggleColorBlindMode) {
    chrome.storage.sync.get(['colorBlindMode'], function(result) {
      var colorBlindMode = !result.colorBlindMode;
      chrome.storage.sync.set({colorBlindMode: colorBlindMode}, function() {
        console.log("Color-blind mode is set to " + colorBlindMode + ".");
        sendResponse({colorBlindMode: colorBlindMode});
      });
    });
    return true;
  }
});
