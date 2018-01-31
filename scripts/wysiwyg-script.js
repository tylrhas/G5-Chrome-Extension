//insert the button for html editor and then bind to the click of the button
//check for cke to be defined
checkCKE();
function checkCKE() {
    if (document.getElementsByClassName("cke")[0] != null) {
        insertWYSIWYGButton();
    }
    else {
        setTimeout(checkCKE.bind(null, null), 100);
    }
}
function insertWYSIWYGButton() {
    //check if WYSIWYG Button exists
    if ($(".cke_wysiwyg").length == 0) {
        console.log('button is not placed yet')
        var b = '<span class="cke_toolgroup" role="presentation"><a class="cke_button cke_button__source"><span  class="cke_button_label cke_button__source_label cke_wysiwyg">WYSIWYG</span></a></span>';
        var wrappers = document.getElementsByClassName("cke_top");
        Object.keys(CKEDITOR.instances).forEach(function (key, i) {
            wrappers[i].innerHTML += b;
        });

        //has not been placed yet so go ahead and place script
        $(".cke_wysiwyg").click(function(){
            // v2
            // Object.keys(CKEDITOR.instances).forEach(function(e,i){console.log(e,i,CKEDITOR.instances[e]);})
            /* global CKEDITOR, $ */
            var inst, data;
            Object.keys(CKEDITOR.instances).forEach(function (key, i) {

                //debugger;
                //console.log(key);

                // get instance and data
                inst = CKEDITOR.instances[key];
                data = inst.getData();

                //console.log(data);

                // remove nbsp's
                data = data.replace(/&nbsp;/g, ' ');

                // set to jquery element - wrap it so we can get the inner html later
                data = $("<div>" + data + "</div>");

                // remove spans
                data.find("span").each(function (index) {
                    var text = $(this).text();
                    $(this).replaceWith(text);
                });

                // remove styling
                $("[style]", data).removeAttr('style');

                // set/save data
                inst.setData(data.html());

            });

        });
    }
}