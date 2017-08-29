chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  alert('we here');
      if (msg.action == 'open_dialog_box') {
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('scripts/wysiwyg-script.js');
        (document.head||document.documentElement).appendChild(s);
        s.onload = function() {
            s.parentNode.removeChild(s);
        };
      }
    });