export function download_assets() {
    chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
      chrome.tabs.executeScript({ file: "js/executable_scripts/transfer.js" });
    });
  }