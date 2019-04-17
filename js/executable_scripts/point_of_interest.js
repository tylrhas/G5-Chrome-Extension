chrome.storage.sync.get('poikey', function(obj) {
  var text = 'Enter Search search radius in Miles ( Max is 3 Miles)'
  var search_radius = prompt(text, "1")
  if (search_radius > 3) {
      search_radius = 3
  }
  search_radius_meters = search_radius * 1609.34
  search_radius_meters_whole = Math.round(search_radius_meters)
  var locationLatitude = $("#location_latitude").val()
  var locationLongitude = $("#location_longitude").val()
  var apiKey = obj.poikey

  chrome.runtime.sendMessage({
    action: 'get pois',
    locationLatitude,
    locationLongitude,
    apiKey,
    search_radius_meters_whole
  })

  chrome.runtime.onMessage.addListener(function(req, sender, res) {
    console.log({ req })
    if (req.action === 'add poi') {
      place_location(req)
      res({ msg: 'thanks, background!' })
    }
  })

  function place_location({ location, inputNumber, location_address }) {
    locationPlaceId = location['place_id'];
    locationPlaceName = location['name'];
    locationStreetNumber = location_address['locationStreetNumber'];
    locationRoute = location_address['locationRoute'];
    locationCity = location_address['locationCity'];
    locationState = location_address['locationState'];
    locationZip = location_address['locationZip'];
    locationLat = location['geometry']['location']['lat'];
    locationLong = location['geometry']['location']['lng'];

    $("#place_id_" + inputNumber).val(locationPlaceId).focus();
    $("#name_" + inputNumber).val(locationPlaceName).focus();
    $("#address_" + inputNumber).val(locationStreetNumber + ' ' + locationRoute);
    $("#city_" + inputNumber).val(locationCity);
    $("#state_" + inputNumber).val(locationState);
    $("#postal_code_" + inputNumber).val(locationZip);
    $("#latitude_" + inputNumber).val(locationLat);
    $("#longitude_" + inputNumber).val(locationLong);
  }
})
