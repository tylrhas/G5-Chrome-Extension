/*
	Todo: 
	
	v1.3
		- Remove number prefix and gallery post-fix
	
	Ideass: 
		- Small thumb next to the normal form
		- Auto Gather from assets - grab assets json, look for 
			post-fix of -gallery order by number prefix
	
*/

var titleCase = confirm("OK for Title Case, Cancel for Lower Case");

var gallery = $(".edit_widget");
//var title = $("div:nth-child(2)", gallery);
var photos = $(".photo-fields", gallery);


// clear any previous data
// $('.photo-field input[type=text]').val("");

var i = 0; // our loop counter
$('.photo-field').each(function(){
	
	var pPhotoUrl = $(".form-field_url .form-field input[type=text]", this);
	var pThumbUrl = $(".form-field_thumb_url .form-field input[type=text]", this);
	var pAltTag = $(".form-field-alt_tag input[type=text]", this);
	var pTitle = $(".form-field-title input[type=text]", this);
	var pCaption = $(".form-field-caption input[type=text]", this);
	
	var url = pPhotoUrl.val();
	
	// https://gist.github.com/jlong/2428561
	// http://www.sitepoint.com/url-parsing-isomorphic-javascript/
	var parser = document.createElement("a");
	parser.href = url;
	
	var path = decodeURIComponent(parser.pathname);
	var lastSlash = path.lastIndexOf("/")+1;
	var lastDot = path.lastIndexOf(".");
	var fileName = path.substr(lastSlash, lastDot-lastSlash);
	var lastUnderScore = fileName.lastIndexOf("_");
	var altText = fileName.substr(0,lastUnderScore);
	
	var cleanedFileName = cleanFileName(altText);
	
	console.log(cleanedFileName);
	
	pAltTag.val(cleanedFileName);
});

function cleanFileName(fileName)
{
    // replaces hyphens and underscores to spaces
    // http://stackoverflow.com/questions/7005784/regex-to-match-a-string-not-surrounded-by-brackets
    fileName = liquidize(fileName);
    
    fileName = fileName.replace(/-|_(?![^{]*\})/g, ' ');
    
    // remove default postfix of a number and prefix of gallery
    fileName = removePostFixAndSuffix(fileName);
    
    // Title case or  Captalize first letter
    fileName = titleCase ? toTitleCase(fileName) : capitalizeFirstLetter(fileName);

    return fileName;
}

// defaully removes a number prefix and "gallery" postfix
function removePostFixAndSuffix(fileName, prefix, suffix)
{
	// defaults for optional parameters
	prefix = prefix == undefined ? /^\d+/g : prefix;
	suffix = suffix == undefined ? "gallery" : suffix; // use spaces not hyphens
	
	if (prefix instanceof RegExp)
	{
		fileName = fileName.replace(prefix, "");
	}
	else if (fileName.indexOf(prefix) === 0)
	{
		fileName = fileName.substr(prefix.length);
	}
	
	if (fileName.endsWith(suffix))
	{
		fileName = fileName.substr(0, fileName.length - suffix.length)
	}
	
	// general cleanup rather than worring about spaces
	return fileName.trim();
}

function defaultPrefix(fileName)
{
	
}

// http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str)
{
    return str.replace(/(?![^{]*\})\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


// http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function liquidize(string) {
	
	var liquids = [
		"page_name",
		"page_slug",
		"page_created",
		"page_updated",
		"website_urn",
		"website_slug",
		"location_uid",
		"location_urn",
		"location_domain",
		"location_corporate",
		"location_name",
		"location_name_slug",
		"location_city",
		"location_city_slug",
		"location_state",
		"location_state_slug",
		"location_state_name",
		"location_state_name_slug",
		"location_street_address",
		"location_neighborhood",
		"location_neighborhood_slug",
		"location_neighborhood_2",
		"location_postal_code",
		"location_phone_number",
		"location_office_hours",
		"location_access_hours",
		"location_floor_plans",
		"location_primary_amenity",
		"location_qualifier",
		"location_primary_landmark",
		"location_office_hours",
		"location_access_hours",
		"location_google_plus_id",
		"location_go_squared_id",
		"location_go_squared_tag",
		"location_ga_tracking_id",
		"location_ga_profile_id",
		"location_facebook_id",
		"location_twitter_id",
		"location_yelp_id",
		"location_pinterest_id",
		"location_instagram_id",
		"location_youtube_id",
		"location_foursquare_id",
		"location_tumblr_id",
		"location_vimeo_id",
		"location_nearby_schools",
		"location_nearby_employers",
		"location_apartment_amenity_1",
		"location_apartment_amenity_2",
		"location_community_amenity_1",
		"location_community_amenity_2",
		"location_landmark_1_type",
		"location_landmark_1_name",
		"location_landmark_2_type",
		"location_landmark_2_name",
		"location_property_feature_1",
		"location_property_feature_2",
		"location_property_feature_3",
		"client_name",
		"client_name_slug",
		"client_domain",
		"client_vertical",
		"client_vertical_slug",
		"client_urn",
		"client_uid",
		"client_type",
		"client_single_domain",
		"client_go_squared_id",
		"client_go_squared_tag",
		"client_cls_url",
		"client_cxm_url",
		"client_dsh_url",
		"client_cpas_url",
		"client_cpns_url",
		"client_nae_url",
		"client_vls_url",
		"theme_name",
		"theme_slug",
		"theme_primary_color",
		"theme_secondary_color",
		"theme_tertiary_color",
		"theme_primary_font",
		"theme_secondary_font"
	];
	
	liquids.forEach(function(liquid){
		if (string.indexOf(liquid) > -1)
		{
			string = string.replace(liquid, "{{"+liquid+"}}");
		}
	});
	
	return string;
}