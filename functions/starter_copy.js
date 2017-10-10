chrome.storage.sync.get("poikey", function (obj) {

    var Startercopy = {
        url: null,
        search_radius_meters_whole: null,
        pageWrapper: null,
        locationLatitude: null,
        locationLongitude: null,
        chromePlacesApiKey: obj.poikey,
        numberNeeded: null,
        placedLocations: null,
        excludeFound: false,
        currentLocation: null,
        currentNumber: null,
        currentSearchTerm: null,
        NumberTermsNeeded: null,
        currentLiquid: null,
        currentLiquidIndex: null,
        currentSearchIndex:null,
        currentSearchInfo:null,
        currentLiquidInfo:null,
        placeTypeExcludes: new Array(
            "lodging"
        ),
        SearchTerms: {
            location_landmark_2_name: {
                searchInfo: [
                    {
                        numberNeeded: 2,
                        searchTerm: "natural_feature",
                        url:null,
                        searchData:null
                    },
                    {
                        numberNeeded: 1,
                        searchTerm: "park",
                        url:null,
                        searchData:null
                    },
                    {
                        numberNeeded: 1,
                        searchTerm: "stadium",
                        url:null,
                        searchData:null
                    },
                    {
                        numberNeeded: 1,
                        searchTerm: "library",
                        url:null,
                        searchData:null
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
                Startercopy.currentLiquidIndex = i;
                //Get and set total number of terms for Liquid variable input
                Startercopy.getNumberOfTerms();
                $.each(liquidVariable.searchInfo, function (i2, searchInfoEach) {
                    Startercopy.currentSearchIndex = i2;
                    Startercopy.currentSearchTerm = searchInfoEach.searchTerm;
                    Startercopy.buildURL();
                    //set vals back to null
                });
            });
            this.popSearchTerms();
        },
        buildURL: function () {
            this.url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.locationLatitude + "," + this.locationLongitude +
                "&radius=" + this.search_radius_meters_whole + "&type=" + this.currentSearchTerm + "&rankby=prominence&key=" + this.chromePlacesApiKey;
            this.buildSearchObject();
        },
        buildSearchObject: function() {
            this.SearchTerms[this.currentLiquidIndex].searchInfo[this.currentSearchIndex].url= this.url;
            console.log(this.SearchTerms);
        },
        popSearchTerms: function() {
            for (var key in Startercopy.SearchTerms) {
                // set current liquid value
                Startercopy.currentLiquid = key;
                console.log(Startercopy.currentLiquid);
                Startercopy.currentLiquidInfo = Startercopy.SearchTerms[key];
                console.log(Startercopy.currentLiquidInfo);
              // If the property can't be deleted fail with an error.
              if (!delete Startercopy.SearchTerms[key]) { throw new Error(); }
              //proceed to get the search info
              Startercopy.popSearchInfo();
            }
        },
        popSearchInfo: function () {
            for (var key in Startercopy.currentLiquidInfo.searchInfo) {
                // set current liquid index
              console.log(key);
              Startercopy.currentSearchInfo = Startercopy.currentLiquidInfo.searchInfo[key];
              console.log(Startercopy.currentSearchInfo );
              // If the property can't be deleted fail with an error.
              if (!delete Startercopy.currentSearchInfo[key]) { throw new Error(); }
              console.log(Startercopy.currentSearchInfo);
              Startercopy.httpGet();
            }
        },
        httpGet: function() {
            $.getJSON(this.currentSearchInfo.url, function (data, status) {
                Startercopy.currentSearchInfo.searchData = data;
                //console.log(data);
                //console.log(Startercopy.currentSearchInfo.searchData);
                if (data.status === "OK") {
                    console.log('moving on');
                    console.log(Startercopy.currentSearchInfo);
                    //Startercopy.checkExcludes();
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