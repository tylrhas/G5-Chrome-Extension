//listen to short keys and run functions
chrome.commands.onCommand.addListener(function (command) {
    if (command == "wysiwyg") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) {
                console.log(response);
            });
        });
    }
    else if (command == "HubPOI") {
    chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
        chrome.tabs.executeScript({ file: "functions/point_of_interest.js" });
        });
    }
    else if (command == "sidekiq") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentURL = tabs[0].url;
            // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
            var domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
            var url = domain + '/sidekiq/busy?poll=true';
            chrome.tabs.create({ url: url });
        });
    }
    else if (command == "redirects") {
        chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
            chrome.tabs.executeScript({ file: "functions/redirects.js" });
          });
    }
    else if (command == "search") {
        chrome.tabs.executeScript({ file: "functions/hub-Search.js" });
    }
    else if (command == "autoAlt") {
        chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
            chrome.tabs.executeScript({ file: "functions/auto_alt.js" });
        });
    }
    else if (command == "seoUpdater") {
        chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
            chrome.tabs.executeScript({ file: "functions/seo_updater.js" });
        });
    }
});

