// v2
// Object.keys(CKEDITOR.instances).forEach(function(e,i){console.log(e,i,CKEDITOR.instances[e]);})
/* global CKEDITOR, $ */
var inst,data;
Object.keys(CKEDITOR.instances).forEach(function(key,i) {
    
    //debugger;
    //console.log(key);
    
    // get instance and data
    inst = CKEDITOR.instances[key];
    data = inst.getData();
    
    //console.log(data);
    
    // remove nbsp's
    data = data.replace(/&nbsp;/g, ' ');
    
    // set to jquery element - wrap it so we can get the inner html later
    data = $("<div>"+data+"</div>");
    
    // remove spans
    data.find("span").each(function(index) {
       var text = $(this).text();
       $(this).replaceWith(text);
    });
    
    // remove styling
    $("[style]", data).removeAttr('style');
    
    // set/save data
    inst.setData(data.html());
    
});