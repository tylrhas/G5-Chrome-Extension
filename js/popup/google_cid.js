export function googleCID() {
    chrome.tabs.executeScript({ file: "js/popup/popup_ui/jquery-3.2.1.min.js" }, function () {
      chrome.tabs.executeScript({ file: "js/executable_scripts/googleCID.js" });
    });
  }