chrome.webRequest.onCompleted.addListener(function (details) {
    //split the url on / and then combine the second to last and last one to get the "endpoint"
    details.url.split("/");
    details.endpoint = splitUrl[splitUrl.length - 3] + '/' + splitUrl[splitUrl.length - 2];
    if (details.endpoint === 'api/widgets') {
        //run a get to find out what widget is being editied
        var xhr = new XMLHttpRequest();
        xhr.open("GET", details.url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                //depending on the widget type inject the correct JS file to be used
                injectWidgetJS(data.slug, details);

            } else {
                // there was an error
            }
        }
        xhr.send(data);

    }
}, { urls: ["<all_urls>"] });

function injectWidgetJS(widgetSlug, details) {
    if (widgetSlug == "html") {
        chrome.tabs.sendMessage(details.tabid, { action: "open_dialog_box" }, function (response) {
            console.log(response);
          });
    }
}