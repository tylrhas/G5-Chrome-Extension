import { wysiwyg } from './js/popup/wysiwyg.js'
import { hub_poi } from './js/popup/hub_poi.js'
import { redirects } from './js/popup/auto_redirects.js'
import { hubSearch } from './js/popup/hub_search.js'
import { hubUpdater } from './js/popup/hub_updater.js'
import { googleCID } from './js/popup/google_cid.js'
import { chatmeterCSV }  from './js/popup/chatmeter.js'
import { seo_updater } from './js/popup/seo_updater.js'
import { structured_data } from './js/popup/structured_data.js'
import { sidekiq } from './js/popup/open_sidekiq.js'
import { changelogs } from './js/popup/changelogs.js'
import { download_assets } from './js/popup/asset_downloader.js'

$('#wysiwyg').click(wysiwyg)
$('#hubpoi').click(hub_poi)
$('#redirects').click(redirects)
$('#search').click(hubSearch)
$('#googleCID').click(googleCID)
$('#chatmeterCSV').click(chatmeterCSV)
$('#seo_updater').click(seo_updater)
$('#structured_data').click(structured_data)
$('#sidekiq').click(sidekiq)
$('#changelogs').click(changelogs)
$('#transfer').click(download_assets)

$(function () {
  $('#save').click(function () {
    var userOpts = {
      'poikey': $('#poikey').val(),
      'transferURL': $('#transferURL').val(),
      'def_user': $('#def_user').val(),
      'cm_pending': $('#cm_pending:checked').val() ? true : false,
      'cm_live': $('#cm_live:checked').val() ? true : false
    }
    chrome.storage.sync.set(userOpts, function () {
      console.log('Settings saved')
      $('#save').addClass('btn-success').html('Saved')
    })
  })
  
  var storedUserOpts = [
    'poikey',
    'transferURL', 
    'def_user',
    'cm_pending',
    'cm_live'
  ]

  chrome.storage.sync.get(storedUserOpts, function (obj) {
    console.log({ obj })
    $('#poikey').val(obj.poikey)
    $('#transferURL').val(obj.transferURL)

    if (obj.cm_pending) {
      $("#cm_pending").prop('checked', true)
    }
    if (obj.cm_live) {
      $("#cm_live").prop('checked', true)
    }
    if (obj.def_user == 'SEO') {
      $('#seo_content').addClass('active')
      $('#seo_tab').addClass('active')
      $('#def_user').val(obj.def_user)
    } else {
      $('#wis').addClass('active')
      $('#wis_tab').addClass('active')
      $('#def_user').val('WIS')
    }
  })
  
  $('#csvUpload').on('change', upload, false)

  function browserSupportFileUpload() {
    var isCompatible = false
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isCompatible = true
    }
    return isCompatible
  }
  
  function upload(evt) {
    if (!browserSupportFileUpload()) {
      alert('The File APIs are not fully supported in this browser!');
    } else {
      var data = null,
          file = evt.target.files[0],
          reader = new FileReader()
      reader.readAsText(file);
      reader.onload = function (event) {
        var csvData = event.target.result,
            data = Papa.parse(csvData)
        $('#hubUpdater').click(function () {
          hubUpdater(data.data)
        })
      }
    }
  }
})