$('.alert').after('<a class="btn btn-default" id="syncAll" style="float:right;">Sync All</a>')
$('#syncAll').click(function () {
  $('.table .btn').each(function (i , el) {
    var dataParams = $(el).attr('data-params')
    console.log(dataParams)
    dataParams = JSON.parse(dataParams)
    console.log(dataParams)
    var url = 'https://g5-hub.herokuapp.com/synchronizations?'
    var queryString = 'updatable_url' + '=' + encodeURIComponent(dataParams.updatable_url) + '&' + 'client_urn=' + dataParams.client_urn
    console.log(url + queryString)
    $.post(url + queryString)
  })
})