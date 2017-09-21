Startercopy = {
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
}
}
function popObject(SearchTerms){
    for (var key in SearchTerms) {
        // set current liquid index
      Startercopy.currentLiquidIndex = key ;
      var result = SearchTerms[key];
      // If the property can't be deleted fail with an error.
      if (!delete SearchTerms[key]) { throw new Error(); }
      return result;
    }
}

popObject(Startercopy.SearchTerms);