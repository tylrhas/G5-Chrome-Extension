hookButtonClick()
function hookButtonClick() {
  $('.copy-to-production-btn').click(function () {
    $('.sa-confirm-button-container .confirm').prop("disabled", true)
    var websiteRow = $(this).parents('.website-index-row').find('.edit-button')
    var websiteIDs = $.map(websiteRow, function (val, i) {
      var href = $(websiteRow[i]).attr('href');
      var regex = /\/(\d*)$/; // caputres digits at the end preceeded by a forward slash
      var match = regex.exec(href);
      return match[1];
    })
    compareChangeLogs(websiteIDs).then(function (values) {
      console.log(values)
      if (values[0].changelogs.length !== 0 && values[1].changelogs.length !== 0) {
        var productionPublishDate = values[0].changelogs[0].created_at
        var StagingFirstPublishDate = values[1].changelogs[values[1].changelogs.length - 1].created_at
        console.log(productionPublishDate)
        console.log(StagingFirstPublishDate)

        if ((new Date(productionPublishDate).getTime() > new Date(StagingFirstPublishDate).getTime())) {
          $('.sa-confirm-button-container .confirm').prop("disabled", false)
          $('.sa-confirm-button-container .confirm').addClass('red')
          var alertHTML = '<h5 style="display: block; color: red; font-weight: bold; text-transform: uppercase; font-size: 106%;margin-top: 35px;">Warning! Edits have been made to production</h5><p>Please make sure they have also been made to staging</p>'
          $('.sweet-alert p:first').append(alertHTML)
        } else {
          $('.sa-confirm-button-container .confirm').prop("disabled", false)
          var alertHTML = '<h5 style="display: block; color: green; font-weight: bold; text-transform: uppercase; font-size: 106%;margin-top: 35px;">No changes have been made to production</h5>'
          $('.sweet-alert p:first').append(alertHTML)
        }
      } else {
        $('.sa-confirm-button-container .confirm').prop("disabled", false)
        $('.sa-confirm-button-container .confirm').addClass('red')
        var alertHTML = '<h5 style="display: block; color: red; font-weight: bold; text-transform: uppercase; font-size: 106%;margin-top: 35px;">No publish date for production or staging</h5>'
          $('.sweet-alert p:first').append(alertHTML)
        console.log('no publish Date')
      }

    })
  })
}

function compareChangeLogs(websiteIDs) {
  currentURL = window.location.href;
  // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
  domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
  var splitURL = currentURL.split('/');
  for (let i = 0; i < websiteIDs.length; i++) {

    var ProductionChangelogsURL = 'https://' + splitURL[2] + '/api/websites/' + websiteIDs[0] + '/changelogs'
    var StagingChangelogsURL = 'https://' + splitURL[2] + '/api/websites/' + websiteIDs[1] + '/changelogs?user_action=publish'

    var productionPublishDate
    var stagingPublishDate
    var productionChangelogs = $.ajax({
      'url': ProductionChangelogsURL,
      'type': 'GET',
      'success': function (data) {
        return data
        // productionPublishDate = new Date(data.changelogs[data.changelogs.length - 1].created_at)
        // var lastIndex = data.changelogs[loc_array.length-1]
        // console.log(new Date(data.changelogs[data.changelogs.length - 1].created_at))
      },
      'error': function (request, error) {
        alert("Request: " + JSON.stringify(request));
      }
    })

    var stagingChangeLogs = $.ajax({
      'url': StagingChangelogsURL,
      'type': 'GET',
      'success': function (data) {
        return data
      },
      'error': function (request, error) {
        alert("Request: " + JSON.stringify(request));
      }
    })
    return Promise.all([productionChangelogs, stagingChangeLogs])
    // console.log(websiteId)
    // console.log(stagingWebsiteId)
    // var staging = websiteRows[i].getElementsByTagName('div')[0]
    // websiteRows[i]
  }
}