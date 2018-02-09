// TODO 
// add a listener for the websites api for native, changelog, open heroku and open hub buttons 
// urls look like {{cms}}/api/websites/{{website_id}}
// <button class="btn">Hub</button>
// end TODO
chrome.webRequest.onCompleted.addListener(function (details) {
    console.log(details);
    console.log(details.tabId);
    //request is not from background script 
    //split the url on / and then combine the second to last and last one to get the "endpoint"
    splitUrl = details.url.split("/");
    details.endpoint = splitUrl[splitUrl.length - 3] + '/' + splitUrl[splitUrl.length - 2];
    if (details.endpoint === 'api/widgets') {
        if (details.tabId > 0) {
            //tab id of -1 is the background script
            //run a get to find out what widget is being editied
            var xhr = new XMLHttpRequest();
            xhr.open("GET", details.url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send();
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    //depending on the widget type inject the correct JS file to be used
                    injectWidgetJS(data.widget.slug, details);
                }
                else {
                    // there was an error
                    console.log('there was an error');
                }
            }
        }
    }
    else if (details.endpoint == "api/websites") {
        //tab id of -1 is the background script
        //run a get to find out what widget is being editied
        if (details.tabId > 0) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", details.url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send();
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    //depending on the widget type inject the correct JS file to be used
                    injectEnhancedUi(data, details);
                }
                else {
                    // there was an error
                    console.log('there was an error');
                }
            }
        }
    }
}, { urls: ["<all_urls>"] });

function injectWidgetJS(widgetSlug, details) {
    if (isHTMLWidget(widgetSlug) && details.method == "GET") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) {
                console.log(response);
            });
        });
    }
}

function isHTMLWidget(widgetSlug) {
    if (widgetSlug == 'html' || widgetSlug == 'accordion' || widgetSlug == "photo-cards") {
        return true;
    }
    else {
        return false;
    }

}

function injectEnhancedUi(data, details) {
    console.log('data');
    console.log(data);

    var domain = details.url.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", domain + '/api/clients', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            //depending on the widget type inject the correct JS file to be used
            chrome.tabs.sendMessage(details.tabId, { action: "enhance_ui", urn: data.clients[0].urn , cms: data.clients[0].cms_url }, function (response) {
                console.log(response);
            });
        }
        else {
            // there was an error
            console.log('there was an error');
        }
    }
}
