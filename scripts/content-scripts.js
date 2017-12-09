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
//$('#submit-location-form').trigger('click');

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

function checkIframeLoad(iframe) {
    if (typeof iframe[0] == 'undefined') {

        setTimeout(checkIframeLoad.bind(null, iframe), 100);
    }
    else {
        setTimeout(checkIframeHTML.bind(null, iframe[0]), 100);
        iframe = iframe[0];
    }
}

function checkIframeHTML(iframe) {
    if (typeof iframe.contentDocument.body.innerHTML == 'undefined') {
        setTimeout(checkIframeLoad.bind(null, iframe), 100);
    }
    else {
        var iframe_document = iframe.contentWindow.document;
        setTimeout(checkForEditor.bind(null, iframe_document), 100);
    }
}

function checkForEditor(iframe_document) {
    if (document.getElementById('preview').getElementsByTagName('iframe')[0].contentWindow.document == 'undefined') {
        setTimeout(checkForEditor.bind(null, iframe_document), 100);
    }
    else {
        checkReadyState();
    }
}

function checkReadyState() {
    if (document.getElementById('preview').getElementsByTagName('iframe')[0].contentWindow.document.getElementById('g5-c2e-edit') == null) {
        setTimeout(checkReadyState.bind(null, null), 100);
    }
    else {
        document.getElementById('preview').getElementsByTagName('iframe')[0].contentWindow.document.getElementById('g5-c2e-edit').addEventListener("click", function (e) {
            var widgetType = document.getElementById('preview').getElementsByTagName('iframe')[0].contentWindow.document.getElementById('g5-c2e-text').textContent;
            getWidgetScript(widgetType);
            console.log(widgetType);
        }, false);
    }
}

function getWidgetScript(widgetType) {
    if (widgetType = 'HTML') {
        wysiwygOnSrc();
    }
}

function wysiwygOnSrc() {
    if (document.getElementsByClassName('cke_button__source')[0] == null) {
        console.log('waiting');
        setTimeout(wysiwygOnSrc.bind(null, null), 100);
    }
    else {
        addButton();
        document.getElementById('cke_wysiwyg').addEventListener("click", function (e) {
            console.log('clicked');
            console.log('do something');   
            injectJs(chrome.extension.getURL('/scripts/wysiwyg-script.js'));
  
        });
    }
}
function injectJs(link) {
    var scr = document.createElement("script");
    scr.type="text/javascript";
    scr.src=link;
    (document.head || document.body || document.documentElement).appendChild(scr);
}
function addButton(){
    var b = '<span class="cke_toolgroup" role="presentation"><a class="cke_button cke_button__source"><span  class="cke_button_label cke_button__source_label" id="cke_wysiwyg">WYSIWYG</span></a></span>';
    var wrapper = document.getElementById("cke_1_top");
    wrapper.innerHTML+=b;
}