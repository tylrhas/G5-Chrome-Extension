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

        uploadButton = document.getElementsByClassName('asset-uploader-wrapper')[0];
        downloadButton = document.createElement('a');
        downloadButtonWrapper = document.createElement('div');
        downloadButtonWrapper.className = 'file-field input-field';
        downloadButton.innerText = 'Zipping Assets....';
        downloadButton.className = 'btn grey';
        downloadButtonWrapper.appendChild(downloadButton)
        uploadButton.appendChild(downloadButtonWrapper)

        var xhr = new XMLHttpRequest(),
            url = assetdownloadLocation,
            data = JSON.stringify(assetLocations)

        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data.url);
                //downloadButton.setAttribute('href', xhr.response.url)
                downloadButton.innerText = 'Download Assets';
                downloadButton.setAttribute('download', data.url);
                downloadButton.setAttribute('href', data.url);
                downloadButton.className = 'green btn';
            } else {
                downloadButton.className = 'red btn';
                downloadButton.innerText = 'An Error Occured';
                alert('An Error occured');
            }
        }
        xhr.send(data);
    }
});