chrome.storage.sync.get('transferURL', function (obj) {
    assetdownloadLocation = obj.transferURL;
    getAssets();
    function getAssets() {
        var Urls = document.getElementsByClassName('asset-url');
        // alert(Urls.length);
        assetLocations = [];
        for (i = 0; i < Urls.length; i++) {
            assetLocations.push(Urls[i]['innerText'].split("\n")[0])
        }
        downloadAssets(assetLocations);
    }

    function downloadAssets(assetLocations) {

        var xhr = new XMLHttpRequest(),
            url = assetdownloadLocation,
            data = JSON.stringify(assetLocations)

        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            if (xhr.status == "200") {
                console.log(data.url);
                uploadButton = document.getElementsByClassName('asset-uploader-wrapper')[0];
                downloadButton = document.createElement('a');
                downloadButtonWrapper = document.createElement('div');
                downloadButtonWrapper.className = 'file-field input-field';
                //downloadButton.setAttribute('href', xhr.response.url)
                downloadButton.setAttribute('download', data.url);
                downloadButton.setAttribute('href', data.url);
                downloadButton.innerText = 'Download Assets';
                downloadButton.className = 'green btn';
                downloadButtonWrapper.appendChild(downloadButton)
                uploadButton.appendChild(downloadButtonWrapper)
            } else {
                console.error(xhr.response);
            }
        }
        xhr.send(data);
    }
});