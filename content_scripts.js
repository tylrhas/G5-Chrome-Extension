// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');

  chrome.tabs.executeScript(null, { file: "jquery-3.2.1.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "point_of_interest.js" });
});
});