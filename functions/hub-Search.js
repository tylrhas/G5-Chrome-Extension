var searchTerm = prompt('Enter Search Term');
console.log(searchTerm);
var newURL = "https://g5-hub.herokuapp.com/admin/clients?utf8=%E2%9C%93&q%5Bname_contains%5D="+searchTerm+"&commit=Filter&order=name_asc";
console.log(newURL);
window.open(newURL);
chrome.tabs.create({ url: newURL });