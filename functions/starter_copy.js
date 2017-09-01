chrome.storage.sync.get("poikey", function (obj) {

    var Startercopy = {
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
                $.each(liquidVariable.searchInfo, function (i2, searchInfoEach) {
                    Startercopy.searchTerm = searchInfoEach.searchTerm;
                    Startercopy.numberNeeded = searchInfoEach.numberNeeded;
                    Startercopy.buildURL();
                });
            });
        },
        buildURL: function () {
            this.url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.locationLatitude + "," + this.locationLongitude +
                "&radius=" + this.search_radius_meters_whole + "&type=" + this.searchTerm + "&rankby=prominence&key=" + this.chromePlacesApiKey;
            console.log(this.url);
            //Set current number to 1
            Startercopy.currentNumber = 1;
            this.httpGet();
        },
        httpGet: function () {
            $.getJSON(this.url, function (data, status) {
                Startercopy.searchData = data;
                if (data.status !== "ZERO_RESULTS") {
                    Startercopy.checkExcludes();
                }
            });
        },
        checkExcludes: function () {
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
            console.log(Startercopy.currentLocation);
            console.log(Startercopy.currentLiquidIndex);
            console.log(this.numberNeeded);
            console.log(this.currentNumber);
            console.log('GetNumberNeeded End');
            if (this.numberNeeded <= this.currentNumber) {
                // Startercopy.addArray();
                this.currentNumber++
            }
        },
        addArray: function () {
            Startercopy[Startercopy.currentLiquidIndex].push(Startercopy.currentLocation.name);
            //console.log('SearchTerms_var');
            // console.log(this[Startercopy.currentLiquidIndex].length);
            // console.log('liquidIndex_var');
            // console.log(this.SearchTerms[Startercopy.currentLiquidIndex].searchInfo.length);
            //this.placeLocation();
        },
        placeLocation: function () {
            //console.log(this[Startercopy.currentLiquidIndex].length());

            if (this.currentLiquidIndex === "location_landmark_2_name") {
                this.createSelect();
            }
            else {
                this.createList();
            }

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

