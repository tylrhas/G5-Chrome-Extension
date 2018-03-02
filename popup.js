// @ts-check
//import in the functions
import {hub_poi} from './js/popup/hub_poi.js';


//event listeners
$('#hubpoi').click(hub_poi);

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

  //set the input value
  chrome.storage.sync.get(['poikey', 'transferURL', 'def_user'], function (obj) {
    console.log(obj);
    $('#poikey').val(obj.poikey);
    $('#transferURL').val(obj.transferURL);

    // set the default active tab
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

});