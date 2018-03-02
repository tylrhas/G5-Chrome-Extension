function autoalt() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "autoalt" }, function (response) {
        console.log(response);
      });
    });
  }
  