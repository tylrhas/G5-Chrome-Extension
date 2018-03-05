export function hubSearch() {
    chrome.tabs.executeScript({ file: "functions/hub-Search.js" });
  }