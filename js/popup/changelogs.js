function changelogs() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentURL = tabs[0].url;
      splitURL = currentURL.split('/');
      changelogsURL = 'https://' + splitURL[2] + '/api/websites/' + splitURL[4] + '/changelogs';
      console.log(changelogsURL);
      chrome.tabs.create({ url: changelogsURL });
    });
  }