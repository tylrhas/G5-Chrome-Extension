chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
      if (msg.action == 'open_dialog_box') {
        alert("Message recieved!");
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('scripts/wysiwyg-script.js');
        (document.head||document.documentElement).appendChild(s);
        s.onload = function() {
            s.parentNode.removeChild(s);
        };
      }
    });