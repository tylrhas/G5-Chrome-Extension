// var app = chrome.runtime.getBackgroundPage();

//js for vertical nav tabs

  $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
      e.preventDefault();
      $(this).siblings('a.active').removeClass("active");
      $(this).addClass("active");
      var index = $(this).index();
      $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
      $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
  });

function hub_poi() {
    chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function() {
      chrome.tabs.executeScript({ file: "point_of_interest.js" });
  });
}

function redirects(){
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function() {
      chrome.tabs.executeScript({ file: "functions/redirects.js" });
  });
}

function wysiwyg(){
  console.log('we sending');
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

//hubPOI script
document.getElementById('hubpoi').addEventListener('click', hub_poi);
document.getElementById('redirects').addEventListener('click', redirects);
document.getElementById('wysiwyg').addEventListener('click', wysiwyg);
document.getElementById('seo').addEventListener('click', seo);



//set the input value
chrome.storage.sync.get('poikey',function(obj){
  console.log(obj);
  $('#poikey').val(obj.poikey);
});



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