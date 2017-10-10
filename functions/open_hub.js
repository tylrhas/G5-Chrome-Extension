// Opens the associated hub for the given CMS or Live Site
/* global dataLayer G5Header */
var urn = typeof dataLayer !== 'undefined' 
    ? dataLayer[0].G5_CLIENT_ID 
    : G5Header.dashboard_notifications_view_url.match(/https:\/\/g5marketingcloud.com\/notifications\/(.*)/)[1];
    url = "https://g5-hub.herokuapp.com/admin/clients/"+urn;
    var win = window.open(url, '_blank');
    win.focus();