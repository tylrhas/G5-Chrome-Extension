// @ts-check
//import in the functions

//WIS Button Function Imports
import {wysiwyg} from './js/popup/wysiwyg.js';
import {hub_poi} from './js/popup/hub_poi.js';
import {redirects} from './js/popup/auto_redirects.js';
import {hubSearch} from './js/popup/hub_search.js';
import {hubUpdater} from './js/popup/hub_updater.js';
import {googleCID} from './js/popup/google_cid.js';
import {chatmeterCSV}  from './js/popup/chatmeter.js'


//WIS Click Event Listeners
$('#wysiwyg').click(wysiwyg);
$('#hubpoi').click(hub_poi);
$('#redirects').click(redirects);
$('#search').click(hubSearch);
$('#googleCID').click(googleCID);
$('#chatmeterCSV').click(chatmeterCSV);



// document.getElementById('redirects').addEventListener('click', redirects);
// document.getElementById('wysiwyg').addEventListener('click', wysiwyg);
// document.getElementById('seo').addEventListener('click', seo);
// document.getElementById('structured_data').addEventListener('click', structured_data);
// document.getElementById('sidekiq').addEventListener('click', sidekiq);
// document.getElementById('search').addEventListener('click', hubSearch);
// document.getElementById('transfer').addEventListener('click', transfer);
// document.getElementById('changelogs').addEventListener('click', changelogs);
// document.getElementById('googleCID').addEventListener('click', googleCID);
// document.getElementById('chatmeterCSV').addEventListener('click', chatmeterCSV);

//save function
$(function () {
  //save function
  $('#save').click(function () {
    // Get a value saved in a form.
    var poikey = $('#poikey').val();
    var transferURL = $('#transferURL').val();
    var def_user = $('#def_user').val();
    console.log(def_user);

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'poikey': poikey, 'transferURL': transferURL, 'def_user': def_user }, function () {
      // Notify that we saved.
      console.log('Settings saved');
      $('#save').addClass('btn-success');
      $('#save').addClass('btn-success');
      $("#save").html('Saved');
    });

  });

  //get the input value
  chrome.storage.sync.get(['poikey', 'transferURL', 'def_user'], function (obj) {
    console.log(obj);
    $('#poikey').val(obj.poikey);
    $('#transferURL').val(obj.transferURL);

    //set the default active tab
    if (obj.def_user == 'SEO') {
      //set active tab to SEO 
      $('#seo_content').addClass('active');
      $('#seo_tab').addClass('active');
      $('#def_user').val(obj.def_user);
    }
    else {
      //set active tab to WIS
      $('#wis').addClass('active');
      $('#wis_tab').addClass('active');
      $('#def_user').val('WIS');
    }
  });

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
