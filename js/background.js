chrome.webRequest.onCompleted.addListener(function (details) {

  splitUrl = details.url.split('/')
  details.endpoint = `${splitUrl[splitUrl.length - 3]}/${splitUrl[splitUrl.length - 2]}`
  details.fullendpoint = `${splitUrl[splitUrl.length - 2]}/${splitUrl[splitUrl.length - 1]}`
  
  // console.log({ details })
  
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

var places = [
  {
    type: 'park',
    category: 'activities',
    inputStartNumber: 0,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'aquarium',
    category: 'activities',
    inputStartNumber: 1,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'amusement_park',
    category: 'activities',
    inputStartNumber: 2,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'stadium',
    category: 'activities',
    inputStartNumber: 3,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'zoo',
    category: 'activities',
    inputStartNumber: 4,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'movie_theater',
    category: 'entertainment',
    inputStartNumber: 10,
    typeExclude: null,
    numberOfLocations: 2
  }, {
    type: 'art_gallery',
    category: 'entertainment',
    inputStartNumber: 12,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'museum',
    category: 'entertainment',
    inputStartNumber: 13,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'natural_feature',
    category: 'entertainment',
    inputStartNumber: 14,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'restaurant',
    category: 'food',
    inputStartNumber: 20,
    typeExclude: 'lodging',
    numberOfLocations: 3
  }, {
    type: 'cafe',
    category: 'food',
    inputStartNumber: 23,
    typeExclude: 'lodging',
    numberOfLocations: 2
  }, {
    type: 'school',
    category: 'school',
    inputStartNumber: 30,
    typeExclude: null,
    numberOfLocations: 4
  }, {
    type: 'library',
    category: 'school',
    inputStartNumber: 34,
    typeExclude: null,
    numberOfLocations: 1
  }, {
    type: 'store',
    category: 'shopping',
    inputStartNumber: 40,
    typeExclude: null,
    numberOfLocations: 2
  }, {
    type: 'department_store',
    category: 'shopping',
    inputStartNumber: 42,
    typeExclude: null,
    numberOfLocations: 2
  }, {
    type: 'shopping_mall',
    category: 'shopping',
    inputStartNumber: 44,
    typeExclude: null,
    numberOfLocations: 1
  }],
    placed_locations = []

chrome.runtime.onMessage.addListener(async function(req, sender, res) {
  if (req.action === 'messageFromPopup') {
    console.log('received')
  } else if (req.action === 'download assets') {
    console.log({ req })
    downloadAssets(req.images)
  } else if (req.action === 'get pois') {
    for (let place of places) {
      await get_locations(place.type, req.locationLatitude, req.locationLongitude, req.search_radius_meters_whole, req.apiKey, place.inputStartNumber, place.typeExclude,  place.numberOfLocations, place.category, placed_locations)
    }
  }
})

function downloadAssets(assetLocations) {
  var xhr = new XMLHttpRequest(),
      url = 'https://g5-transfer-tool.herokuapp.com/downloadassets',
      imgArr = JSON.stringify(assetLocations)

  xhr.open("POST", url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.send(imgArr)
  xhr.onload = function () {
    console.log(xhr.status)
    
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText)
      console.log(data.url)
      var assetResStatus = 'success'
    } else {
      var assetResStatus = 'error'
      var data = { url: null }
    }

    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'assets download link',
        url: data.url,
        status: assetResStatus
      }, function(res) {
        console.log({ res })
      })
    })
  }
}

function get_locations(type, locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, inputStartNumber, typeExclude, numberOfLocations, category, placed_locations) {

  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + locationLatitude + "," + locationLongitude + "&radius=" + search_radius_meters_whole + "&type=" + type + "&rankby=prominence&key=" + apiKey

  var results = httpGet(url)
  var resultsJSON = JSON.parse(results)

  location_types_excludes(resultsJSON, typeExclude, inputStartNumber, apiKey, numberOfLocations, placed_locations)
}

function location_types_excludes(resultsJSON, typeExclude, inputStartNumber, apiKey, numberOfLocations, placed_locations) {
  var location_number = 0
  if (resultsJSON['results'].length === -1) {
    console.log({ error: 'no results' })
  } else {
    resultsJSON['results'].forEach(function(location, index) {
      if (location.types.indexOf(typeExclude) === -1) {
        if (location_number <= numberOfLocations) {
          var inputNumber = inputStartNumber + location_number
          var location_address = get_location_address(location, apiKey, inputNumber, placed_locations)
          if (location_address === true) {
            location_number++
          }
        }
      }
    })
  }
}

function httpGet(url) {
  var xhr = new XMLHttpRequest()
  xhr.open('get', url, false)
  xhr.send(null)
  return xhr.responseText
}

function get_location_address(location, apiKey, inputNumber, placed_locations) {
  var locationPlaceId = location['place_id']
  if (placed_locations.indexOf(locationPlaceId) === -1) {
    var addressUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + locationPlaceId + '&key=' + apiKey
    var locationaddress = httpGet(addressUrl)
    var locationaddressJSON = JSON.parse(locationaddress)

    if (locationaddressJSON['result']['address_components'].length >= 6) {
      var location_address = {}
      var address_components = locationaddressJSON['result']['address_components']

      address_components.forEach(function(address_component, index) {
        if (address_component.types[0] == "street_number") {
          location_address['locationStreetNumber'] = address_component['short_name']
        } else if (address_component.types[0] == "route") {
          location_address['locationRoute'] = address_component['short_name']
        } else if (address_component.types[0] == "locality") {
          location_address['locationCity'] = address_component['short_name']
        } else if (address_component.types[0] == "administrative_area_level_1") {
          location_address['locationState'] = address_component['short_name']
        } else if (address_component.types[0] == "postal_code") {
          location_address['locationZip'] = address_component['short_name']
        }
      })

      if (Object.keys(location_address).length >= 5) {
        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'add poi',
            location,
            inputNumber,
            location_address
          }, function(res) {
            console.log({ res })
          })
        })
        placed_locations.push(locationPlaceId)
        return true
      } else {
        return false
      }
    }
  } else {
    console.log('%c Location ' + locationPlaceId + ' already added; skipping', 'color: red;')
  }
}

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
