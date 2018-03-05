export function hubUpdater(csvData) {
    //remove the header from the array
    let header = csvData.shift();
    for (var i = 0; i < csvData.length; i++) {
      createQueryStringObj(header, csvData[i]);
    }
  }
  function createQueryStringObj(header, locationData) {
    let obj = {};
    for (var i = 0; i < locationData.length; i++) {
      obj[header[i]] = locationData[i];
    }
    createNewTab(obj);
  }
  function createNewTab(obj) {
    //if (!delete obj.urn) { throw new Error(); }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentURL = tabs[0].url;
      var createNewTab = currentURL + "/" + obj.urn + "/edit?" + createQueryString(obj);
      console.log(createNewTab);
      chrome.tabs.create({ url: createNewTab, active: false });
    });
  
  }
  function createQueryString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        if (p != "urn") {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
    return str.join("&");
  }