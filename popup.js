// var app = chrome.runtime.getBackgroundPage();
function hub_poi() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/point_of_interest.js" });
  });
}

function redirects() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/redirects.js" });
  });
}

function wysiwyg() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) {
      console.log(response);
    });
  });
}

function seo() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/seo_updater.js" });
  });
}
function alt() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/auto_alt.js" });
  });
}
function structured_data() {
  chrome.tabs.query({ active: true, currentWindow: truegirt }, function (tabs) {
    var currentURL = tabs[0].url;
    var url = 'https://developers.google.com/webmasters/structured-data/testing-tool/?url=' + currentURL;
    chrome.tabs.create({ url: url });
  });
}

function sidekiq() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentURL = tabs[0].url;
    // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
    var domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
    var url = domain + '/sidekiq';
    chrome.tabs.create({ url: url });
  });
}
function copy() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "scripts/jquery-ui.js" }, function () {
      chrome.tabs.executeScript({ file: "functions/starter_copy.js" });
    });
  });
}
function hubUpdater(csvData) {
  //remove the header from the array
  header = csvData.shift();
  for (var i = 0; i < csvData.length; i++) {
    createQueryStringObj(header, csvData[i]);
  }
}
function createQueryStringObj(header, locationData) {
  obj = {};
  for (var i = 0; i < locationData.length; i++) {
    obj[header[i]] = locationData[i];
  }
  console.log(obj);
  createNewTab(obj);
}
function createNewTab(obj) {
  console.log(obj);
  urn = obj.urn;
  if (!delete obj.urn) { throw new Error(); }

  console.log(urn);
  console.log(obj);
}
  function createQueryString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  function hubSearch(){
    chrome.tabs.executeScript({ file: "functions/hub-Search.js" });
  }

//event listeners
document.getElementById('hubpoi').addEventListener('click', hub_poi);
document.getElementById('redirects').addEventListener('click', redirects);
document.getElementById('wysiwyg').addEventListener('click', wysiwyg);
document.getElementById('seo').addEventListener('click', seo);
document.getElementById('structured_data').addEventListener('click', structured_data);
document.getElementById('sidekiq').addEventListener('click', sidekiq);
//document.getElementById('copy').addEventListener('click', copy);
document.getElementById('alt').addEventListener('click', alt);
document.getElementById('search').addEventListener('click', hubSearch);



//set the input value
chrome.storage.sync.get('poikey', function (obj) {
  console.log(obj);
  $('#poikey').val(obj.poikey);
});


//save function
$(function () {
  $('#save').click(function () {
    // Get a value saved in a form.
    var theValue = $('#poikey').val();
    console.log(theValue);
    // Check that there's some code there.
    if (!theValue) {
      console.log('Error: No value specified');
      return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'poikey': theValue }, function () {
      // Notify that we saved.
      console.log('Settings saved');
    });

  });
});


// Used for CSV upload for the hub bulk update
$(document).ready(function () {
  // The event listener for the file upload
  document.getElementById('csvUpload').addEventListener('change', upload, false);

  // Method that checks that the browser supports the HTML5 File API
  function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isCompatible = true;
    }
    return isCompatible;
  }

  // Method that reads and processes the selected file
  function upload(evt) {
    if (!browserSupportFileUpload()) {
      alert('The File APIs are not fully supported in this browser!');
    } else {
      var data = null;
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (event) {
        var csvData = event.target.result;
        var data = Papa.parse(csvData);
        $('#hubUpdater').click(function () {
          console.log(data.data);
          hubUpdater(data.data);
        });
      }
    }
  }
});