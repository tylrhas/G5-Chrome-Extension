chrome.storage.sync.get('transferURL', function(obj) {
  assetdownloadLocation = obj.transferURL

  function getAssets() {
    var urls = document.getElementsByClassName('asset-url'),
        assetLocations = []

    for (i = 0; i < urls.length; i++) {
      assetLocations.push(urls[i]['innerText'].split("\n")[0])
    }

    uploadButton = document.getElementsByClassName('asset-uploader-wrapper')[0]
    downloadButton = document.createElement('a')
    downloadButtonWrapper = document.createElement('div')
    downloadButtonWrapper.className = 'file-field input-field'
    downloadButton.innerText = 'Zipping Assets....'
    downloadButton.className = 'btn grey'
    downloadButtonWrapper.appendChild(downloadButton)
    uploadButton.appendChild(downloadButtonWrapper)
    
    downloadAssets(assetLocations)
  }

  function downloadAssets(assetLocations) {
    chrome.runtime.sendMessage({
      action: 'download assets',
      images: assetLocations
    })
    chrome.runtime.onMessage.addListener(function(req) {
      if (req.status === 'success') {
        downloadButton.setAttribute('href', req.url)
        downloadButton.innerText = 'Download Assets'
        downloadButton.className = 'green btn'
      } else {
        downloadButton.className = 'red btn'
        downloadButton.innerText = 'An Error Occurred'
      }
    })
  }

  getAssets()
})