// Auto Fill the POI in the Hub
search_radius = prompt("Enter Search search radius in Miles ( Max is 3 Miles)","1");

// max search radius is about three miles
if(search_radius > 3){
  search_radius = 3;
}
search_radius_meters = search_radius * 1609.34 ;
search_radius_meters_whole = Math.round(search_radius_meters)

apiKey = "AIzaSyDhhgdOUDf2vvIwACZMjiOth_HLwb38w_s";
url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.0559514,-121.2990006&radius="+search_radius_meters_whole+"&type=restaurantt&rankby=prominence&key="+apiKey;
console.log(url);

foodDrink = httpGet(url);
  foodDrinkJSON = JSON.parse(foodDrink);

  //first location JSON
  FoodDrink1PlaceId = foodDrinkJSON['results'][0]['place_id'];
  console.log(FoodDrink1PlaceId);
  FoodDrink1PlaceName = foodDrinkJSON['results'][0]['name'];
  FoodDrink1PlaceAddress = foodDrinkJSON['results'][0]['name'];
  FoodDrink1PlaceCity = foodDrinkJSON['results'][0]['name'];
  FoodDrink1PlaceState = foodDrinkJSON['results'][0]['name'];
  FoodDrink1PlaceZip = foodDrinkJSON['results'][0]['name'];
  FoodDrink1PlaceLat = foodDrinkJSON['results'][0]['geometry']['location']['lat'];
  FoodDrink1PlaceLong = foodDrinkJSON['results'][0]['geometry']['location']['lng'];



//set values of the food drink
document.getElementById("place_id_10").value = FoodDrink1PlaceId;



console.log(foodDrinkJSON['results']);

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function get_food_drink(){

}



// get info from content script

// debugging
console.log(search_radius);
console.log(search_radius_meters);
console.log(search_radius_meters_whole);