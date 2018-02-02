//TODO
//Fix the bug on save and then save and exit where it multiples the buttons by 2 
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
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
    else if (msg.action == 'enhance_ui') {
        currentURL = window.location.href;
        // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
        domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
        splitURL = currentURL.split('/');
        urn = msg.urn;
        hubURL = "https://g5-hub.herokuapp.com/admin/clients/" + urn;
        changelogsURL = 'https://' + splitURL[2] + '/api/websites/' + splitURL[4] + '/changelogs';
        sidekiqURL = domain + '/sidekiq/busy?poll=true';
        hub = '<a href="' + hubURL + '" style="color:#fff !important;" target="_blank" class="btn" id="hub" >Hub</a>';
        sidekiq = '<a href="' + sidekiqURL + '" style="color:#fff !important;" target="_blank" class="btn">Sidekiq</a>';
        changelogs = '<a href="' + changelogsURL + '" style="color:#fff !important;" target="_blank" class="btn">Changelogs</a>';
        //check if the buttons are placed already
        if(!document.getElementById('hub')){
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin',hub);
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin',sidekiq);
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin',changelogs)
        }
        console.log(hubURL);
        console.log(changelogsURL);
        console.log(sidekiqURL);
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
    //$('#submit-location-form').trigger('click');
}