var url = window.location.href
splitUrl = url.split("/");

if (splitUrl[2] === 'g5-hub.herokuapp.com' && splitUrl[splitUrl.length - 1] === 'updatables') {
    // chrome.runtime.sendMessage({action: "getMapsApiKey"}, function(response) {
    //     console.log(response);
    // });
      //get the input value
  chrome.storage.sync.get(['poikey'], function (obj) {
    console.log(obj.poikey);
    var ApiKey = '<script> var chromeMapsAPIKey =' + obj.poikey + '</script>'
    (document.head || document.documentElement).appendChild(ApiKey);
    s.onload = function () {
        s.parentNode.removeChild(ApiKey);
    };

    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/injected_scripts/sync-all.js');
    (document.head || document.documentElement).appendChild(s);
    s.onload = function () {
        s.parentNode.removeChild(s);
    };
  });
} else if (splitUrl[2] === 'g5-hub.herokuapp.com' && splitUrl[splitUrl.length - 1] !== 'edit') {
    //check if there are query vars
    if (QueryStringToJSON() != null) {
        replaceData(QueryStringToJSON());
    }
} else if (splitUrl[2] === 'g5-hub.herokuapp.com' && splitUrl[splitUrl.length - 1] === 'edit') {

    https://stackoverflow.com/questions/17567624/pass-a-parameter-to-a-content-script-injected-using-chrome-tabs-executescript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/injected_scripts/hub-poi.js');
    (document.head || document.documentElement).appendChild(s);
    s.onload = function () {
        s.parentNode.removeChild(s);
    }
 }

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.action == 'open_dialog_box') {
        sendResponse({ farewell: "goodbye" });
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('js/injected_scripts/wysiwyg-script.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
        };
    }
    else if (msg.action == 'enhance_ui') {
        currentURL = window.location.href;
        // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
        domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
        var splitURL = currentURL.split('/');
        cmsApp = splitURL[2].split('.')[0]
        urn = msg.urn;
        hubURL = "https://g5-hub.herokuapp.com/admin/clients/" + urn;
        if (msg.changelogs) {
            changelogsURL = 'https://' + splitURL[2] + '/api/websites/' + splitURL[4] + '/changelogs';
            changelogs = '<a href="' + changelogsURL + '" style="color:#fff !important;" target="_blank" id="changelogs" class="btn">Changelogs</a>';
        }
        sidekiqURL = domain + '/sidekiq/busy?poll=true';
        herokuURL = 'https://dashboard.heroku.com/apps/' + cmsApp;
        hub = '<a href="' + hubURL + '" style="color:#fff !important;" target="_blank" class="btn" id="hub" >Hub</a>';
        sidekiq = '<a href="' + sidekiqURL + '" style="color:#fff !important;" target="_blank" class="btn">Sidekiq</a>';
        heroku = '<a href="' + herokuURL + '" style="color:#fff !important;" target="_blank" id="heroku" class="btn">Heroku</a>';
        console.log('loading')
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('js/injected_scripts/changelog-check.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
        };


        //check if the buttons are placed already
        if (!document.getElementById('hub')) {
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', hub);
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', sidekiq);

            if (msg.changelogs) {
                document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', changelogs);
            }

            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', heroku);
        }
        else {
            //check if the button URLs have changed for changelog
            if (msg.changelogs) {
                if (document.getElementById('changelogs') == null) {
                    document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', changelogs);
                }
                else {
                    document.getElementById('changelogs').href = changelogsURL
                    console.log(document.getElementById('changelogs').href);
                }
            }
        }
    }
    else if (msg.action == 'add_sync_all') {
        console.log('woot! Woot!');
        sendResponse({ farewell: "goodbye" });

    }
});


// Read a page's GET URL variables and return them as an associative array.
function QueryStringToJSON () {
    var pairs = location.search.slice(1).split('&');
    if(pairs == [""] ){
        return null;
    } else {

    var result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}
}

function replaceData (data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            placeData(key, data[key]);
            console.log(key + " -> " + data[key]);
        }
    }
}

function placeData (id, val) {
    document.getElementById(id).value = val;
    //$('#submit-location-form').trigger('click');
}