//TODO
//Fix the bug on save and then save and exit where it multiples the buttons by 2 
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg.action);
    if (msg.action == 'open_dialog_box') {
        sendResponse({ farewell: "goodbye" });
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('scripts/wysiwyg-script.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
        };
    }
    //open the hub 
    else if (msg.action == 'open_hub') {
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('functions/open_hub.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
        };
    }
    else if (msg.action == 'open_hub') {
        alert('auto alt');
    }
});

//script for hub updater
if (window.location.host == "g5-hub.herokuapp.com") {
    //check if there are query vars
    if (QueryStringToJSON() != null) {
        replaceData(QueryStringToJSON());
    }
}

// Read a page's GET URL variables and return them as an associative array.
function QueryStringToJSON() {
    var pairs = location.search.slice(1).split('&');

    var result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

function replaceData(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            placeData(key, data[key]);
            console.log(key + " -> " + data[key]);
        }
    }
}

function placeData(id, val) {
    document.getElementById(id).value = val;
}