// @ts-check
export function hub_poi() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "js/executable_scripts/point_of_interest.js" });
  });
}
