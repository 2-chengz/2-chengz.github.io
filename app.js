'use strict'

$(document).ready(function(){
  $('#submitbutton').on('click', function(){
    console.log('wow')
    var text = $('form-control').val();
    console.log(text)
    if (text == ''|| text == null){
      alert("You must type in an animal!")
    } else {
      console.log('something here')
      $('.responseArea h1').text("Yes, my favorite animal is also the "+text+"!")
    }
  });
});
