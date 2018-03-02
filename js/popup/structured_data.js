function structured_data() {
    chrome.tabs.query({ active: true, currentWindow: truegirt }, function (tabs) {
      var currentURL = tabs[0].url;
      var url = 'https://developers.google.com/webmasters/structured-data/testing-tool/?url=' + currentURL;
      chrome.tabs.create({ url: url });
    });
  }