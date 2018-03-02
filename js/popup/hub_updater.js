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

//Begin Hubupdater functions
function hubUpdater(csvData) {
    //remove the header from the array
    let header = csvData.shift();
    for (var i = 0; i < csvData.length; i++) {
      createQueryStringObj(header, csvData[i]);
    }
  }
  function createQueryStringObj(header, locationData) {
    let obj = {};
    for (var i = 0; i < locationData.length; i++) {
      obj[header[i]] = locationData[i];
    }
    createNewTab(obj);
  }
  function createNewTab(obj) {
    //if (!delete obj.urn) { throw new Error(); }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentURL = tabs[0].url;
      var createNewTab = currentURL + "/" + obj.urn + "/edit?" + createQueryString(obj);
      console.log(createNewTab);
      chrome.tabs.create({ url: createNewTab, active: false });
    });
  
  }
  function createQueryString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        if (p != "urn") {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
    return str.join("&");
  }
  //end hub updater functions