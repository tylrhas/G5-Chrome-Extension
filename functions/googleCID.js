chrome.storage.sync.get('poikey', function (obj) {
    //get lat and long of the location
    locationLatitude = $("#location_latitude").val();
    locationLongitude = $("#location_longitude").val();
    //get the name of the location
    location_name = $('#location_name').val();

    get_location_CID(locationLatitude, locationLongitude, location_name, obj.poikey);

    function get_location_CID(lat, long, location_name, apiKey) {
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + locationLatitude + "," + locationLongitude + "&rankby=distance&key=" + apiKey;
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                match_branded_name(JSON.parse(xhr.responseText), location_name);
            }
            else {
                alert('Something Went Wrong');
            }
        }
        xhr.send();
    }

    function match_branded_name(data, location_name) {
        for (i = 0; i < Object.keys(data.results).length; i++) {
            console.log(data.results[i]);
            if (location_name == data.results[i].name) {
                place_id_search(data.results[i].place_id);
            }
        }
    }

    function place_id_search(place_id) {
        place_id_url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place_id + "&key=" + obj.poikey;
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", place_id_url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();
        xhr.onload = function () {
            if (xhr.status === 200) {
                //get cid and place it
                data = JSON.parse(xhr.responseText);
                console.log(data);
                cidURL = data.result.url; 
                $('#location_google_cid').val(cidURL.split("cid=")[1]);
            }
            else {
                alert('Something Went Wrong');
            }
        }
    }
});
