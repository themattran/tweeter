$(document).ready(function() {

  $('#tweet-text').keyup(function(e){
    let allowedCharacters = 140;
    let totalCharacters = $('#tweet-text').val().length;
    let remainingChars = allowedCharacters - totalCharacters;
    console.log(remainingChars);
    $('.counter').text(remainingChars);

    if (totalCharacters > 140) {
      $('.counter').css("color", "red")
    } else {
      $('.counter').css("color", "#4f4f4f")
    }
  });

});