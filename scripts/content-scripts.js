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

var scr = document.createElement("script");
scr.type = "text/javascript";
scr.src = chrome.extension.getURL('/scripts/wysiwyg-script.js');
(document.head || document.body || document.documentElement).appendChild(scr);
$('#submit-location-form').trigger('click');

(function deferpreview() {
    if (document.getElementById('preview') != null) {
        var preview = document.getElementById('preview');
        var iframe = preview.getElementsByTagName('iframe');
        checkIframeLoad(iframe);
    }
    else {
        setTimeout(function () { deferpreview() }, 50);
    }
})();
wysiwygOnSrc();
function checkModal() {
    console.log('checking modal');
    if (document.getElementsByClassName('modal show')[0] == null) {
        console.log('checking');
        setTimeout(checkModal.bind(null, null), 100);
    }
    else {
        //get widget type
        return wysiwygOnSrc();
    }
}

function wysiwygOnSrc() {
    if (document.getElementsByClassName('cke_button__source')[0] == null) {
        console.log('waiting');
        setTimeout(wysiwygOnSrc.bind(null, null), 100);
    }
    else {
        ckeEditors = document.getElementsByClassName('cke');

        for (var i = 0; i < ckeEditors.length; i++) {
            if(!document.getElementById('cke_wysiwyg')){
            addButton(ckeEditors[i], i);
        }
        }

        document.getElementById('cke_wysiwyg').addEventListener("click", function (e) {
            console.log('clicked');
            console.log('do something');
            injectJs(chrome.extension.getURL('/scripts/wysiwyg-script.js'));
        });
        //listen for a click of exit go back or save and continue save and exit and then re listen for modal
        modalClose = document.getElementsByClassName("modal-close");

        for (var i = 0; i < modalClose.length; i++) {
            onetime(modalClose[i], 'click', modalClosing);
        }

        onetime(document.getElementsByClassName("goback-button")[0], 'click' ,goingBack);
        onetime(document.getElementsByClassName("save-progress")[0], 'click' ,save_progress);
        onetime(document.getElementsByClassName("save-button")[0], 'click' ,modalClosing);
        onetime(document.getElementsByClassName("cancel-button")[0], 'click' ,modalClosing);
        onetime(document.getElementsByClassName("close-button")[0], 'click' ,modalClosing);
        
    }
}
function injectJs(link) {
    var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = link;
    (document.head || document.body || document.documentElement).appendChild(scr);
}
function addButton(editor, i) {
    var b = '<span class="cke_toolgroup" role="presentation"><a class="cke_button cke_button__source"><span  class="cke_button_label cke_button__source_label" id="cke_wysiwyg">WYSIWYG</span></a></span>';
    var wrapper = editor.getElementsByClassName("cke_top")[0];
    wrapper.innerHTML += b;
}
function modalClosing(e) {
    console.log('closing');
    checkModal();
}

function goingBack(e) {
    console.log('going back');
    checkModal();
}

function save_progress(e){
    console.log('saving progress');
    wysiwygOnSrc()
}

// create a one-time event
function onetime(node, type, callback) {
    // create event
    node.addEventListener(type, function (e) {
        // remove event
        e.target.removeEventListener(e.type, arguments.callee);
        // call handler
        return callback(e);
    });

}