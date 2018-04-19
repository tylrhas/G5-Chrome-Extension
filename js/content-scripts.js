var url = window.location.href
splitUrl = url.split("/");

if (splitUrl[2] === 'g5-hub.herokuapp.com' && splitUrl[splitUrl.length - 1] === 'updatables') {

    var s = document.createElement('script')
    s.src = chrome.extension.getURL('js/injected_scripts/sync-all.js')
        (document.head || document.documentElement).appendChild(s)
    s.onload = function () {
        s.parentNode.removeChild(s);
    }
} else if (splitUrl[2] === 'g5-hub.herokuapp.com' && splitUrl[splitUrl.length - 1] !== 'edit') {
    //check if there are query vars
    if (QueryStringToJSON() != null) {
        replaceData(QueryStringToJSON());
    }
} else if (splitUrl[2] === 'g5-hub.herokuapp.com' && splitUrl[splitUrl.length - 1] === 'edit') {

    chrome.storage.sync.get(['poikey'], function (obj) {

        var chromeMapsAPIKey = obj.poikey

        $('#activities_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_activities">Submit</button>')
        $('#entertainment_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_entertainment">Submit</button>')
        $('#food_drink_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_food">Submit</button>')
        $('#schools_community_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_schools">Submit</button>')
        $('#shopping_accordion').prepend('<textarea class="poi_activities"></textarea><button class="poi_shopping">Submit</button>')

        // Add these CSS rules for the buttons
        // position: relative;
        // top: -20px;
        // margin-left: 10px;

        $('button.poi_activities').click(function () {
            event.preventDefault()
            //get location names and split on linebreak
            let locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
            getLocations(locationNames, 'activities', chromeMapsAPIKey)
        })
        $('button.poi_entertainment').click(function () {
            event.preventDefault()
            //get location names and split on linebreak
            let locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
            getLocations(locationNames, 'entertainment', chromeMapsAPIKey)
        })
        $('button.poi_food').click(function () {
            event.preventDefault()
            //get location names and split on linebreak
            let locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
            getLocations(locationNames, 'food_drink', chromeMapsAPIKey)
        })
        $('button.poi_schools').click(function () {
            event.preventDefault()
            //get location names and split on linebreak
            let locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
            getLocations(locationNames, 'schools_community', chromeMapsAPIKey)
        })
        $('button.poi_shopping').click(function () {
            event.preventDefault()
            //get location names and split on linebreak
            let locationNames = $('textarea.poi_activities').val().split(/\r?\n/)
            getLocations(locationNames, 'shopping', chromeMapsAPIKey)
        })
    })
}

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.action == 'open_dialog_box') {
        sendResponse({ farewell: "goodbye" });
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('js/injected_scripts/wysiwyg-script.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
        };
    }
    else if (msg.action == 'enhance_ui') {
        currentURL = window.location.href;
        // https://stackoverflow.com/questions/3689423/google-chrome-plugin-how-to-get-domain-from-url-tab-url
        domain = currentURL.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
        var splitURL = currentURL.split('/');
        cmsApp = splitURL[2].split('.')[0]
        urn = msg.urn;
        hubURL = "https://g5-hub.herokuapp.com/admin/clients/" + urn;
        if (msg.changelogs) {
            changelogsURL = 'https://' + splitURL[2] + '/api/websites/' + splitURL[4] + '/changelogs';
            changelogs = '<a href="' + changelogsURL + '" style="color:#fff !important;" target="_blank" id="changelogs" class="btn">Changelogs</a>';
        }
        sidekiqURL = domain + '/sidekiq/busy?poll=true';
        herokuURL = 'https://dashboard.heroku.com/apps/' + cmsApp;
        hub = '<a href="' + hubURL + '" style="color:#fff !important;" target="_blank" class="btn" id="hub" >Hub</a>';
        sidekiq = '<a href="' + sidekiqURL + '" style="color:#fff !important;" target="_blank" class="btn">Sidekiq</a>';
        heroku = '<a href="' + herokuURL + '" style="color:#fff !important;" target="_blank" id="heroku" class="btn">Heroku</a>';
        console.log('loading')
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('js/injected_scripts/changelog-check.js');
        (document.head || document.documentElement).appendChild(s);
        s.onload = function () {
            s.parentNode.removeChild(s);
        };


        //check if the buttons are placed already
        if (!document.getElementById('hub')) {
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', hub);
            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', sidekiq);

            if (msg.changelogs) {
                document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', changelogs);
            }

            document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', heroku);
        }
        else {
            //check if the button URLs have changed for changelog
            if (msg.changelogs) {
                if (document.getElementById('changelogs') == null) {
                    document.getElementsByClassName('version')[0].insertAdjacentHTML('afterbegin', changelogs);
                }
                else {
                    document.getElementById('changelogs').href = changelogsURL
                    console.log(document.getElementById('changelogs').href);
                }
            }
        }
    }
    else if (msg.action == 'add_sync_all') {
        console.log('woot! Woot!');
        sendResponse({ farewell: "goodbye" });

    }
    else if (msg.action == 'inject_delete_all') {
        console.log('injecting')
        var checkExist = setInterval(function () {
            if ($('.photo-gallery-preview').length) {
                console.log("Exists!");
                clearInterval(checkExist);
                //    var s = document.createElement('script')
                //     s.src = chrome.extension.getURL('js/injected_scripts/delete_all_gallery.js')
                //     (document.head || document.documentElement).appendChild(s)
                //     s.onload = function () {
                //         s.parentNode.removeChild(s)
                //     }
                $('.cloudinary-upload').after('<a href="#" class="btn red delete-all">Delete All</a>')

                $('.delete-all').click(function () {
                    console.log('removing all ')
                    $('.form-field-url input[type=text]').val("")
                    $('.photo-gallery-preview .photo').html('<i class="fa fa-plus"></i>')
                    $('.photo-gallery-preview .photo').removeClass('photo-real')
                    $('.photo-gallery-preview .photo').addClass('photo-placeholder')
                    // $('.photo-real img').removeAttr('src')
                    $('.img-thumbnail-preview img').attr('src', 'http://placehold.it/100x100')
                    $('.form-field-alt_tag input').val("")
                })
            }
        }, 1000, chrome); // check every 100ms
    }
});


// Read a page's GET URL variables and return them as an associative array.
function QueryStringToJSON () {
    var pairs = location.search.slice(1).split('&');
    if (pairs == [""]) {
        return null;
    } else {

        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });

        return JSON.parse(JSON.stringify(result));
    }
}

function replaceData (data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            placeData(key, data[key]);
            console.log(key + " -> " + data[key]);
        }
    }
}

function placeData (id, val) {
    document.getElementById(id).value = val;
    //$('#submit-location-form').trigger('click');
}

function getLocations (locationNames, poiCategory, chromeMapsAPIKey) {
    let locationLatitude = $("#location_latitude").val()
    let locationLongitude = $("#location_longitude").val()
    let searchRadius = 4828.03

    for (i = 0; i < locationNames.length; i++) {
        let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + locationLatitude + "," + locationLongitude + "&radius=" + searchRadius + "&name=" + locationNames[i] + "&rankby=prominence&key=" + chromeMapsAPIKey
        console.log(url)
        $.get(url, function (data) {
            let locationPlaceId = data.results[0].place_id
            getLocationInfo(locationPlaceId, poiCategory, chromeMapsAPIKey)
        })
    }
}

function getLocationInfo (locationPlaceId, poiCategory, chromeMapsAPIKey) {
    let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + locationPlaceId + '&key=' + chromeMapsAPIKey

    $.get(url, function (data) {
        let locationName = data.result.name
        let locationPhone = data.result.formatted_phone_number
        let locationWebsite = data.result.website
        let locationMapsUrl = data.result.url
        let locationAddress = data.result.formatted_address.split(',')[0]
        let locationCity = data.result.formatted_address.split(',')[1]
        let locationState = data.result.formatted_address.split(',')[2].split(/\s+/)[1]
        let locationZip = data.result.formatted_address.split(',')[2].split(/\s+/)[2]
        let locationLat = data.result.geometry.location.lat
        let locationLong = data.result.geometry.location.lng

        //find the next open field 
        let inputs = $('#' + poiCategory + '_accordion input.poi_place_id')
        for (i = 0; i < inputs.length; i++) {
            if ($(inputs.eq(i)).val() == '') {
                // fill in the location becasue it is empty
                $('#' + poiCategory + '_accordion input.poi_place_id').eq(i).val(locationPlaceId)
                $('#' + poiCategory + '_accordion input.poi_name').eq(i).val(locationName)
                $('#' + poiCategory + '_accordion input.poi_phone_number').eq(i).val(locationPhone)
                $('#' + poiCategory + '_accordion input.poi_website').eq(i).val(locationWebsite)
                $('#' + poiCategory + '_accordion input.poi_google_map_url').eq(i).val(locationMapsUrl)
                $('#' + poiCategory + '_accordion input.poi_address').eq(i).val(locationAddress)
                $('#' + poiCategory + '_accordion input.poi_city').eq(i).val(locationCity)
                $('#' + poiCategory + '_accordion input.poi_state').eq(i).val(locationState)
                $('#' + poiCategory + '_accordion input.poi_postal_code').eq(i).val(locationZip)
                $('#' + poiCategory + '_accordion input.poi_latitude').eq(i).val(locationLat)
                $('#' + poiCategory + '_accordion input.poi_longitude').eq(i).val(locationLong)
                break
            }
        }
    })
}