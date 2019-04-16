chrome.webRequest.onCompleted.addListener(function (details) {

  splitUrl = details.url.split('/')
  details.endpoint = `${splitUrl[splitUrl.length - 3]}/${splitUrl[splitUrl.length - 2]}`
  details.fullendpoint = `${splitUrl[splitUrl.length - 2]}/${splitUrl[splitUrl.length - 1]}`
  
  if (details.endpoint === 'api/widgets') {
    if (details.tabId > 0) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', details.url, true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.send()
      xhr.onload = function () {
        var data = JSON.parse(xhr.responseText)
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText)
          injectWidgetJS(data.widget.slug, details)
        } else {
          console.log('there was an error')
        }
      }
    }
  } else if (details.endpoint == "api/websites") {
    if (details.tabId > 0) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', details.url, true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.send()
      xhr.onload = function () {
        var data = JSON.parse(xhr.responseText)
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText)
          injectEnhancedUi(data, details, true)
        } else {
          console.log('there was an error')
        }
      }
    }
  } else if (details.fullendpoint == "api/websites") {
    if (details.tabId > 0) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', details.url, true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.send()
      xhr.onload = function () {
        var data = JSON.parse(xhr.responseText)
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText)
          injectEnhancedUi(data, details, false)
        } else {
          console.log('there was an error')
        }
      }
    }
  }
}, { urls: ["<all_urls>"] })

function injectWidgetJS (widgetSlug, details) {
  var queryTarget = {
    active: true,
    currentWindow: true
  }
  if (isHTMLWidget(widgetSlug) && details.method == 'get') {
    chrome.tabs.query(queryTarget, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "open_dialog_box"
      }, function (response) {
        console.log(response)
      })
    })
  } else if (widgetSlug == 'gallery') {
    chrome.tabs.query(queryTarget, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "inject_delete_all"
      }, function (response) {
        console.log(response)
      })
    })
  }
}

function isHTMLWidget (widgetSlug) {
  return (widgetSlug == 'html' || widgetSlug == 'accordion' || widgetSlug == 'photo-cards')
}

function injectEnhancedUi (data, details, changelogs) {
  var domain = details.url.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0]
  var xhr = new XMLHttpRequest()
  xhr.open('get', `${domain}/api/clients`, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.send()
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText)
      chrome.tabs.sendMessage(details.tabId, {
        action: "enhance_ui",
        urn: data.clients[0].urn,
        cms: data.clients[0].cms_url,
        changelogs: changelogs
      }, function (response) {
        console.log(response)
      })
    } else {
      console.log('there was an error')
    }
  }
}
