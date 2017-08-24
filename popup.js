// var app = chrome.runtime.getBackgroundPage();

function hub_poi() {
    chrome.tabs.executeScript({ file: "jquery-3.2.1.min.js" }, function() {
      chrome.tabs.executeScript({ file: "point_of_interest.js" });
  });
}
//hubPOI script
document.getElementById('hubpoi').addEventListener('click', hub_poi);

document.getElementById('hubpoi').addEventListener('click', hub_poi);

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