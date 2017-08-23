search_radius = prompt("Enter Search search radius in Miles ( Max is 3 Miles)", "1");

// max search radius is about three miles
if (search_radius > 3) {
    search_radius = 3;
}
search_radius_meters = search_radius * 1609.34;
search_radius_meters_whole = Math.round(search_radius_meters);

locationLatitude = $("#location_latitude").val();
locationLongitude = $("#location_longitude").val();

apiKey = "AIzaSyBjoiu0ay7yIbj7x92gtZlAhKMocAeC5ek";

activitiesInputRange = $(0, 4);
entertainmentInputRange = $(5, 9);
foodInputRange = $(10, 14);
schoolInputRange = $(15, 19);
shoppingInputRange = $(20, 24);
placed_locations = new Array();

//get activities locations
get_locations("park", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 0, null, 1, "activities", placed_locations);
get_locations("aquarium", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 1, null, 1, "activities", placed_locations);
get_locations("amusement_park", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 2, null, 1, "activities", placed_locations);
get_locations("stadium", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 3, null, 1, "activities", placed_locations);
get_locations("zoo", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 4, null, 1, "activities", placed_locations);
//get entertainment locations
get_locations("movie_theater", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 5, null, 2, "entertainment", placed_locations);
get_locations("art_gallery", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 7, null, 1, "entertainment", placed_locations);
get_locations("museum", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 8, null, 1, "entertainment", placed_locations);
get_locations("natural_feature", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 9, null, 1, "entertainment", placed_locations);

//get Food & Drink locations
get_locations("restaurant", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 10, "lodging", 3, "food", placed_locations);
get_locations("cafe", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 13, "lodging", 1, "food", placed_locations);
get_locations("convenience_store", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 14, "lodging", 1, "food", placed_locations);
//get School locations
get_locations("school", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 15, null, 4, "school", placed_locations);
get_locations("library", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 19, null, 1, "school", placed_locations);
//get Shopping locations
get_locations("store", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 20, null, 2, "shopping", placed_locations);
get_locations("department_store", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 22, null, 2, "shopping", placed_locations);
get_locations("shopping_mall", locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, 24, null, 1, "shopping", placed_locations);

function get_locations(type, locationLatitude, locationLongitude, search_radius_meters_whole, apiKey, inputStartNumber, typeExclude, numberOfLocations, category, placed_locations) {
    //category for future tooling - ie fill in extra blanks

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + locationLatitude + "," + locationLongitude +
        "&radius=" + search_radius_meters_whole + "&type=" + type + "&rankby=prominence&key=" + apiKey;

    results = httpGet(url);
    resultsJSON = JSON.parse(results);
    location_types_excludes(resultsJSON, typeExclude, inputStartNumber, apiKey, numberOfLocations, placed_locations);

}

function location_types_excludes(resultsJSON, typeExclude, inputStartNumber, apiKey, numberOfLocations, placed_locations) {
    //set the location number to 0
    location_number = 0;
    //check foodDrinkJSON so it does not contain invalid types
    $.each(resultsJSON['results'], function(index, location) {
        if ($.inArray(typeExclude, location.types) == -1) {
            //place the location becasue it is not a hotel
            //check if location number is less than or equal to 5 - looking if place to place.
            if (location_number <= numberOfLocations) {
                inputNumber = inputStartNumber + location_number;
                location_address = get_location_address(location, apiKey, inputNumber, placed_locations);
              console.log("true or false");
                console.log(location_address);
                if (location_address == true) {
                  console.log('increasing');
                    location_number = increment(location_number);
                }

            }
        }
    })
};


function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


function increment(n) {

    n++;
    return n;
}


function place_location(location, inputNumber, location_address) {

    //first location JSON
    locationPlaceId = location['place_id'];
    locationPlaceName = location['name'];
    locationStreetNumber = location_address['locationStreetNumber'];
    locationRoute = location_address['locationRoute'];
    locationCity = location_address['locationCity'];
    locationState = location_address['locationState'];
    locationZip = location_address['locationZip'];
    locationLat = location['geometry']['location']['lat'];
    locationLong = location['geometry']['location']['lng'];

    // set values
    $("#place_id_" + inputNumber).val(locationPlaceId).focus();
    $("#name_" + inputNumber).val(locationPlaceName).focus();
    $("#address_" + inputNumber).val(locationStreetNumber + ' ' + locationRoute);
    $("#city_" + inputNumber).val(locationCity);
    $("#state_" + inputNumber).val(locationState);
    $("#postal_code_" + inputNumber).val(locationZip);
    $("#latitude_" + inputNumber).val(locationLat);
    $("#longitude_" + inputNumber).val(locationLong);

}

function get_location_address(location, apiKey, inputNumber, placed_locations) {

    locationPlaceId = location['place_id'];
    //validate the location has not been used already
    console.log(locationPlaceId);
    if ($.inArray(locationPlaceId, placed_locations) == -1) {

      console.log('not in array');

        //get info on the locations.
        addressUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + locationPlaceId + '&key=' + apiKey
        locationaddress = httpGet(addressUrl);
        locationaddressJSON = JSON.parse(locationaddress);
       //validate the location has enough information
        if (locationaddressJSON['result']['address_components'].length >= 6) {
            location_address = [];
            address_components = locationaddressJSON['result']['address_components'];
            console.log('address_components');
            console.log(address_components);
            // run a for each and check the type for each component and then log the info
            $.each(address_components, function(index, address_component) {
                    if (address_component.types[0] == "street_number") {
                    location_address['locationStreetNumber'] = address_component['short_name'];
                } else if (address_component.types[0] == "route") {
                    location_address['locationRoute'] = address_component['short_name'];
                } else if (address_component.types[0] == "locality") {
                    location_address['locationCity'] = address_component['short_name'];
                } else if (address_component.types[0] == "administrative_area_level_1") {
                    location_address['locationState'] = address_component['short_name'];
                } else if (address_component.types[0] == "postal_code") {
                    location_address['locationZip'] = address_component['short_name'];
                }
            })
            if (Object.keys(location_address).length >= 5) {
                    console.log('placing');
                    place_location(location, inputNumber, location_address);
                    //push placed locations into array
                    placed_locations.push(locationPlaceId);
                    console.log('true');
                    return true;
                }
        } else {
            return false;
        }
    }
}