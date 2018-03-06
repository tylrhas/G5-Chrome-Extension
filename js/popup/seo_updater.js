export function seo_updater() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "js/executable_scripts/seo_updater.js" });
  });
}