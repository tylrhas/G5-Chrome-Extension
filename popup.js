// var app = chrome.runtime.getBackgroundPage();
function hub_poi() {
    chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function() {
      chrome.tabs.executeScript({ file: "functions/point_of_interest.js" });
  });
}

function redirects(){
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function() {
      chrome.tabs.executeScript({ file: "functions/redirects.js" });
  });
}

function wysiwyg(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {
      console.log(response);
    });  
});
}

function seo(){
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function() {
      chrome.tabs.executeScript({ file: "functions/seo_updater.js" });
  });
}
function structured_data(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var currentURL = tabs[0].url;
    var url = 'https://developers.google.com/webmasters/structured-data/testing-tool/?url='+ currentURL;
    chrome.tabs.create({url:url});    
});
}

function sidekiq(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var currentURL = tabs[0].url;
    // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
    var domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
    var url = domain + '/sidekiq';
    chrome.tabs.create({url:url});   
});
}

//event listeners
document.getElementById('hubpoi').addEventListener('click', hub_poi);
document.getElementById('redirects').addEventListener('click', redirects);
document.getElementById('wysiwyg').addEventListener('click', wysiwyg);
document.getElementById('seo').addEventListener('click', seo);
document.getElementById('structured_data').addEventListener('click', structured_data);
document.getElementById('sidekiq').addEventListener('click', sidekiq);



//set the input value
chrome.storage.sync.get('poikey',function(obj){
  console.log(obj);
  $('#poikey').val(obj.poikey);
});


//save function
$(function() {
  $('#save').click(function(){
// Get a value saved in a form.
var theValue = $('#poikey').val();
console.log(theValue);
// Check that there's some code there.
if (!theValue) {
  console.log('Error: No value specified');
  return;
}
// Save it using the Chrome extension storage API.
chrome.storage.sync.set({'poikey': theValue}, function() {
  // Notify that we saved.
  console.log('Settings saved');
});

  });
});