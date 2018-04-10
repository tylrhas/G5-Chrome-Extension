$('#activities_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#entertainment_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#food_drink_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#schools_community_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
$('#shopping_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')

// Add these CSS rules for the buttons
// position: relative;
// top: -20px;
// margin-left: 10px;

$('button.poi_activities').click(function () {
  //get location names and split on linebreak
  let locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
  getLocations(locationNames, 'activities')
})

function getLocations(locationNames, poiCategory) {
  let locationLatitude = $("#location_latitude").val()
  let locationLongitude = $("#location_longitude").val()
  let searchRadius = 4828.03

  for (i = 0; i < locationNames.length; i++) {
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + locationLatitude + "," + locationLongitude + "&radius=" + searchRadius + "&name=" + locationName[i] + "&rankby=prominence&key=" + apiKey

    $.get(url, function (data) {
      let locationPlaceId = data.results[0].place_id
      getLocationInfo(locationPlaceId, poiCategory)
    })
}
}

function getLocationInfo (locationPlaceId, poiCategory) {
  let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + locationPlaceId + '&key=' + apiKey

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
    let inputs = $('.poi_'+ poiCategory + 'input.poi_place_id')

    for(i = 0; i < inputs.length; i++){
      if(inputs[i].val() ===''){
        // fill in the location becasue it is empty
        $('.poi_'+ poiCategory + 'input.poi_place_id')[i].val() = locationPlaceId
        $('.poi_'+ poiCategory + 'input.poi_name')[i].val() = locationName
        $('.poi_'+ poiCategory + 'input.poi_phone_number')[i].val() = locationPhone
        $('.poi_'+ poiCategory + 'input.poi_website')[i].val() = locationWebsite
        $('.poi_'+ poiCategory + 'input.poi_google_map_url')[i].val() = locationMapsUrl
        $('.poi_'+ poiCategory + 'input.poi_address')[i].val() = locationAddress
        $('.poi_'+ poiCategory + 'input.poi_city')[i].val() = locationCity
        $('.poi_'+ poiCategory + 'input.poi_state')[i].val() = locationState
        $('.poi_'+ poiCategory + 'input.poi_postal_code')[i].val() = locationZip
        $('.poi_'+ poiCategory + 'input.poi_latitude')[i].val() = locationLat
        $('.poi_'+ poiCategory + 'input.poi_longitude')[i].val() = locationLong
      }
    }
  })
}