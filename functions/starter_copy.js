chrome.storage.sync.get("poikey", function (obj) {

    var Startercopy = {
        testData: {
            "html_attributions": [],
            "results": [
                {
                    "geometry": {
                        "location": {
                            "lat": 39.176676,
                            "lng": -75.5268966
                        },
                        "viewport": {
                            "northeast": {
                                "lat": 39.1780249802915,
                                "lng": -75.52554761970849
                            },
                            "southwest": {
                                "lat": 39.1753270197085,
                                "lng": -75.52824558029151
                            }
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
                    "id": "bb166663840127bbd8b34f48a92d42b11beb3821",
                    "name": "The Overlook on Silver Lake",
                    "photos": [
                        {
                            "height": 5312,
                            "html_attributions": [
                                "\u003ca href=\"https://maps.google.com/maps/contrib/115576562319988659796/photos\"\u003eJeremy Pentoney\u003c/a\u003e"
                            ],
                            "photo_reference": "CmRaAAAA12wTaXezXxSfCBVh6aQfrtIY6A3F6PfpUBUsGRbT0vCsHrDxgaXDnTZd4j6S6RB0batxsvLjZGJiosRUnOwulvscH4UxcUvN8eE_LL6ekvFtY1YCOWS1H0lRMsKy0IjIEhB4zBMRNAGmExtaqieWBJF0GhR_QmAI9aE4gGPQhhwkHqaBqo-8RQ",
                            "width": 2988
                        }
                    ],
                    "place_id": "ChIJ0eXsrMpkx4kRrLOEp0GIXHc",
                    "rating": 3,
                    "reference": "CmRRAAAAVry3C0DpZYg2RVPlOzdIzMLQHHIEkbvUvdtTGGysvUnLYSuN6jb5D987FgYahbeILVbedEePx9-9Si2l3gjE6cY8hbc-2g5pZp9dWO8hrtE7W5HWtJ2uaSZpLhuMq_X3EhAKpIC-S8gwZq3spF0zgRxIGhRbaR0xPKILw0QQ5V0kbFL-LP60HQ",
                    "scope": "GOOGLE",
                    "types": ["park", "point_of_interest", "establishment"],
                    "vicinity": "Dover"
                },
                {
                    "geometry": {
                        "location": {
                            "lat": 39.17289769999999,
                            "lng": -75.532583
                        },
                        "viewport": {
                            "northeast": {
                                "lat": 39.1744271302915,
                                "lng": -75.53015239999999
                            },
                            "southwest": {
                                "lat": 39.1717291697085,
                                "lng": -75.5340042
                            }
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                    "id": "fc42bb622bd98b57c4bf7ac72d07a8443a64f5ed",
                    "name": "Richardson Park",
                    "place_id": "ChIJ15VywEt7x4kRuZoKiSSxMgI",
                    "reference": "CmRbAAAAIKMi0ShdSomVUwuUCa2NhshuZKf1KGD4sArsrScxfH1bghGpd1zGESmiAkoFLc1Hg6-2L4fu7n68KIw4VFvcBJnPStKJcJjp48bkLtU28hiHfANBnCMTRDoSd5XJpV3aEhA4jAe_lSqW3yr8zKWCGaWJGhThSAnofFZcScgUI-pYpdHfsGcyGA",
                    "scope": "GOOGLE",
                    "types": ["park", "premise", "point_of_interest", "establishment"],
                    "vicinity": "Dover"
                },
                {
                    "geometry": {
                        "location": {
                            "lat": 39.1644178,
                            "lng": -75.55368919999999
                        },
                        "viewport": {
                            "northeast": {
                                "lat": 39.1656697302915,
                                "lng": -75.55239601970848
                            },
                            "southwest": {
                                "lat": 39.1629717697085,
                                "lng": -75.5550939802915
                            }
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                    "id": "6c3df9cfb2a73c4a5d707e5bed8263fa5588bbde",
                    "name": "Continental Park",
                    "place_id": "ChIJFYvEKmd7x4kRRIPf5qmy2Pk",
                    "reference": "CmRbAAAAbXzltM8Ua9ZhNMgOsAiWxt81PtzZzcv3bHN3Yn0nLQUYK8Dd8QyrOrs9s_ap_5y5gwUbDdALcOxWwpnUFPPVPJTvb1BkDah-7s9QzbBwuuDHlg8avYBWsQ8Y96WercRXEhD9EHyT_okTZVJcGWtzwUHnGhQPeXq7DhHD7ROMupqTl1nlWaNH8w",
                    "scope": "GOOGLE",
                    "types": ["park", "premise", "point_of_interest", "establishment"],
                    "vicinity": "Dover"
                }
            ],
            "status": "OK"
        },
        url: null,
        searchData: null,
        search_radius_meters_whole: null,
        pageWrapper: null,
        location_landmark_2_name: new Array(),
        locationNearbyEmployers: {},
        locationNearbySchools: {},
        locationLatitude: null,
        locationLongitude: null,
        chromePlacesApiKey: obj.poikey,
        numberNeeded: null,
        searchTerm: null,
        placedLocations: null,
        excludeFound: false,
        currentLocation: null,
        currentNumber: null,
        currentSearchTerm: null,
        NumberTermsNeeded: null,
        currentLiquid: null,
        currentLiquidIndex: null,
        placeTypeExcludes: new Array(
            "lodging"
        ),
        SearchTerms: {
            location_landmark_2_name: {
                searchInfo: [
                    {
                        numberNeeded: 2,
                        searchTerm: "natural_feature"
                    },
                    {
                        numberNeeded: 1,
                        searchTerm: "park"
                    },
                    {
                        numberNeeded: 1,
                        searchTerm: "stadium"
                    },
                    {
                        numberNeeded: 1,
                        searchTerm: "library"
                    }
                ]
            }
        },
        init: function () {
            this.pageWrapper = $('#wrapper');
            this.locationLandmark2Name = $('#location_landmark_2_name');
            this.locationNearbyEmployers = $('#location_nearby_employers');
            this.locationNearbySchools = $('#location_nearby_schools');
            this.locationLatitude = $("#location_latitude").val();
            this.locationLongitude = $("#location_longitude").val();

            this.getSearchRadius();
        },
        getSearchRadius: function () {
            search_radius = prompt("Enter Search search radius in Miles ( Max is 3 Miles)", "1");
            // three miles is the largest radius supported by the API
            if (search_radius > 3) {
                search_radius = 3;
            }
            search_radius_meters = search_radius * 1609.34;
            this.search_radius_meters_whole = Math.round(search_radius_meters);
            this.getTerm();
        },
        getTerm: function () {
            $.each(this.SearchTerms, function (i, liquidVariable) {
                Startercopy.currentLiquid = liquidVariable;
                Startercopy.currentLiquidIndex = i;
                //Get and set total number of terms for Liquid variable input
                Startercopy.getNumberOfTerms();
                $.each(liquidVariable.searchInfo, function (i2, searchInfoEach) {
                    Startercopy.searchTerm = searchInfoEach.searchTerm;
                    Startercopy.numberNeeded = searchInfoEach.numberNeeded;
                    console.log('BEGIN DEBUG');
                    console.log('debugging search term');
                    console.log(searchInfoEach.searchTerm);
                    console.log(searchInfoEach.numberNeeded);
                    console.log('end search term');
                    Startercopy.buildURL();
                    //set vals back to null
                });
            });
        },
        buildURL: function () {
            console.log('buildURL');
            this.url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.locationLatitude + "," + this.locationLongitude +
                "&radius=" + this.search_radius_meters_whole + "&type=" + this.searchTerm + "&rankby=prominence&key=" + this.chromePlacesApiKey;
            console.log(this.url);
            Startercopy.testGet();
        },
        testGet: function () {
            console.log('testGet');
            Startercopy.searchData = Startercopy.testData;
            if (Startercopy.searchData.status === "OK") {
                Startercopy.checkExcludes();
            }
        },
        httpGet: function () {
            $.getJSON(this.url, function (data, status) {
                Startercopy.searchData = data;
                if (data.status === "OK") {
                    Startercopy.checkExcludes();
                }
            });
        },
        checkExcludes: function () {
            console.log('checkExcludes');
            console.log('setting to 1');
            Startercopy.currentNumber = 1;
            $.each(this.searchData.results, function (i3, location) {
                $.each(location.types, function (key, value) {
                    var index = $.inArray(value, this.placeTypeExcludes);
                    if (index != -1) {
                        Startercopy.excludeFound = true;
                        console.log(this);
                    }
                });
                //proceed with location
                if (Startercopy.excludeFound === false) {
                    Startercopy.currentLocation = location;
                    Startercopy.GetNumberNeeded();
                }
            });
        },
        GetNumberNeeded: function () {
            console.log('GetNumberNeeded');
            console.log(Startercopy.searchTerm);
            console.log(Startercopy.currentNumber);
            console.log(Startercopy.numberNeeded);
            console.log(Startercopy.currentLocation);
            console.log(Startercopy.currentLiquidIndex);
            //get correct number for each search term
            if (Startercopy.currentNumber <= Startercopy.numberNeeded) {
                console.log('we here');
                Startercopy.addArray();
                this.currentNumber++
            }
            console.log('GetNumberNeeded End');
        },
        addArray: function () {
            Startercopy[Startercopy.currentLiquidIndex].push(Startercopy.currentLocation.name);
            // console.log(this.SearchTerms[Startercopy.currentLiquidIndex].searchInfo.length);
            //this.placeLocation();
            //check if the list is fully populated
            if(Startercopy.NumberTermsNeeded == Startercopy[Startercopy.currentLiquidIndex].length ){
                console.log('placing location');
                console.log('END DEBUG');
            this.placeLocation();
        }
        },
        placeLocation: function () {
            if (this.currentLiquidIndex === "location_landmark_2_name") {
                this.createSelect();
            }
            else {
                this.createList();
            }

        },
        getNumberOfTerms: function () {
            $.each(this.SearchTerms[Startercopy.currentLiquidIndex].searchInfo, function (i, searchterm) {
                Startercopy.NumberTermsNeeded = Startercopy.NumberTermsNeeded + searchterm.numberNeeded;
                console.log('calculating');
                console.log(Startercopy.NumberTermsNeeded);
            });
            console.log('Startercopy.NumberTermsNeeded');
            console.log(Startercopy.NumberTermsNeeded);
        },
        createSelect: function () {
            //console.log(this[Startercopy.currentLiquidIndex]);
            $.each(this[Startercopy.currentLiquidIndex], function (i, name) {
                console.log('name');
                console.log(name);
            });
        },
        createList: function () {
            $.each(this.currentLiquid, function (i, name) {
                console.log('name');
                console.log(name);
            });
        }
    }
    Startercopy.init();
});

