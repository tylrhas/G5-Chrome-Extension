//check if the button exists
if($('.delete-all')){

$('.cloudinary-upload').after('<a href="#" class="btn red delete-all">Delete All</a>')


$('.delete-all').click(function() {
  $('.cloudinary-remove-btn').click()
  $('.form-field-alt_tag input').val("").focus();
})

}