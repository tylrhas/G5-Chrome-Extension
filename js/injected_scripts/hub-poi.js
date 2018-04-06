$('#activities_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#entertainment_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#food_drink_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#schools_community_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#shopping_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')

$('button.poi_activities').click(function () {
  //get location names and split on linebreak
  locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
  getLocations(locationNames)
})

getLocations(locationNames){
  let locationLatitude = $("#location_latitude").val()
  let locationLongitude = $("#location_longitude").val()
  let searchRadius = 4828.03

  for (i = 0 ; i < locationNames.length; i++) {
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + locationLatitude + "," + locationLongitude + "&radius=" + searchRadius + "&name=" + locationName[i] + "&rankby=prominence&key=" + apiKey

    $.get(url, function (data) {
      let locationPlaceId = data.results[0].place_id
      getLocationInfo(locationPlaceId)
    }
}
}

function getLocationInfo (locationPlaceId) {
  let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+ locationPlaceId+ '&key=' + apiKey

  $.get(url, function (data) {
    let locationName = data.result.name
    let locationPhone = data.result.formatted_phone_number
    let locationWebsite = data.result.website
    let locationMapsUrl = data.result.url
    let locationAddress = data.result.formatted_address.split(',')[0]
    let locationCity = data.result.formatted_address.split(',')[1]
    let locationState = data.result.formatted_address.split(',')[2].split(' ')[0]
    let locationZip = data.result.formatted_address.split(',')[2].split(' ')[1]
    let locationLat = data.result.geometry.location.lat
    let locationLong = data.result.geometry.location.lng

    //find the next open field 

  }
}