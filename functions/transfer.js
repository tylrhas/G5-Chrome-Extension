chrome.storage.sync.get('transferURL', function (obj) {
    assetdownloadLocation = obj.transferURL;
    getAssets();
    function getAssets() {
        var Urls = document.getElementsByClassName('asset-url');
        alert(Urls.length);
        assetLocations = [];
        for (i = 0; i < Urls.length; i++) {
            assetLocations.push(Urls[i]['innerText'].split("\n")[0])
        }
        downloadAssets(assetLocations);
    }

    function downloadAssets(assetLocations) {
        const xhr = new XMLHttpRequest();
        const url = assetdownloadLocation;
        const data = JSON.stringify(assetLocations);
        console.log(data);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
               console.log(xhr.response);
              html ='<a class="green btn" href="'+xhr.response.url+'"download>Download Assets</a>';
                uploadButton = document.getElementsByClassName('upload-files')[0];
                uploadButton.insertAdjacentHTML('afterend', html);
            }
        }
        xhr.open('POST', url);
        xhr.send(data);
    }
});