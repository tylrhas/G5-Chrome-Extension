//https://g5-hub.herokuapp.com/admin/clients/g5-c-injenfct-milestone-retirement-communities-client/locations.json?order=status_desc&page=8
function hub_poi() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/point_of_interest.js" });
  });
}

function googleCID() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/googleCID.js" });
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
function openHub() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "open_hub" }, function (response) {
      console.log(response);
    });
  });
}
function autoalt() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "autoalt" }, function (response) {
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
    var url = domain + '/sidekiq/busy?poll=true';
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

function transfer() {
  chrome.tabs.executeScript({ file: "scripts/jquery-3.2.1.min.js" }, function () {
    chrome.tabs.executeScript({ file: "functions/transfer.js" });
  });
}

function changelogs() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentURL = tabs[0].url;
    splitURL = currentURL.split('/');
    changelogsURL = 'https://' + splitURL[2] + '/api/websites/' + splitURL[4] + '/changelogs';
    console.log(changelogsURL);
    chrome.tabs.create({ url: changelogsURL });
  });
}

//Begin Hubupdater functions
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
function hubSearch() {
  chrome.tabs.executeScript({ file: "functions/hub-Search.js" });
}

function chatmeterCSV() {
  chrome.tabs.query({ active: true, currentWindow: true }, createChatmeterCSV);
}

function createChatmeterCSV(tabs) {
  currentURL = tabs[0].url.split("/");
  var clientURL = currentURL[0]+"//"+currentURL[2]+"/"+currentURL[4]+"/"+currentURL[5]+".json";
  var csv_object = []
  var xhr = new XMLHttpRequest();
  xhr.open("GET", clientURL, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send();
  xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    if (xhr.status === 200) {
      data = data.client
      console.log(data);
      if (data.domain_type == 'SingleDomainClient') {
        client_domain = data.domain
        console.log(data)
        secure_domain = data.secure_domain
      }
      vertical = data.vertical.toLowerCase();
      client_Name = data.branded_name;
      locations = data.locations
          for (i = 0; i < locations.length; i++) {
            if(locations[i].status == "Pending"){
              //location is pending
            hub_location = {};
            hub_location.ClientLocationId = locations[i].urn
            hub_location.ClientName = client_Name
            hub_location.BusinessName = locations[i].name
            hub_location.street_address_1 = locations[i].street_address_1
            hub_location.Suite = locations[i].street_address_2
            hub_location.city = locations[i].city
            hub_location.state = locations[i].state
            hub_location.postal_code = locations[i].postal_code
            hub_location.Country = locations[i].country
            hub_location.Phone = locations[i].phone_number
            hub_location.AlternatePhone = ''
            hub_location.WebsiteUrl = locations[i].home_page_url
            hub_location.PrimaryCategory = ''
            hub_location.AuditOnly = 'FALSE'
            csv_object.push(hub_location);
          }
        }
        //create CSV
        csv = Papa.unparse(csv_object);
        file = new Blob([csv], {type: "text/csv"});
        url = URL.createObjectURL(file);
        //date time for the file download
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;      // "+ 1" becouse the 1st month is 0
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var secconds = date.getSeconds()
        chrome.downloads.download({
          url: url,
          filename : client_Name+'_'+month+'_'+day+'_'+year+'_'+hour+'_'+minutes+'_'+secconds+'.csv'
          //saveAs : true
        });
      }
    }
  }

//event listeners
document.getElementById('hubpoi').addEventListener('click', hub_poi);
document.getElementById('redirects').addEventListener('click', redirects);
document.getElementById('wysiwyg').addEventListener('click', wysiwyg);
document.getElementById('seo').addEventListener('click', seo);
document.getElementById('structured_data').addEventListener('click', structured_data);
document.getElementById('sidekiq').addEventListener('click', sidekiq);
//document.getElementById('copy').addEventListener('click', copy);
//document.getElementById('open_hub').addEventListener('click', openHub);
//document.getElementById('autoalt').addEventListener('click', autoalt);
//document.getElementById('alt').addEventListener('click', alt);
document.getElementById('search').addEventListener('click', hubSearch);
document.getElementById('transfer').addEventListener('click', transfer);
document.getElementById('changelogs').addEventListener('click', changelogs);
document.getElementById('googleCID').addEventListener('click', googleCID);
document.getElementById('chatmeterCSV').addEventListener('click', chatmeterCSV);


//set the input value
chrome.storage.sync.get(['poikey', 'transferURL'], function (obj) {
  console.log(obj);
  $('#poikey').val(obj.poikey);
  $('#transferURL').val(obj.transferURL);
});


//save function
$(function () {
  $('#save').click(function () {
    // Get a value saved in a form.
    var poikey = $('#poikey').val();
    var transferURL = $('#transferURL').val();
    console.log(poikey);

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'poikey': poikey, 'transferURL': transferURL }, function () {
      // Notify that we saved.
      console.log('Settings saved');
      $('#save').addClass('btn-success');
      $('#save').addClass('btn-success');
      $("#save").html('Saved');
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