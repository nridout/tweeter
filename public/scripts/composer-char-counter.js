$(document).ready(function () {

  // Updates the character count to reflect the number of characters in the textbox
  $("textarea").keydown(function () {

    let maxChar = 140;
    let charCount = $(this).val().replace(/ /g, '').length;

    if (charCount <= maxChar) {
      maxChar = maxChar - charCount;
      return $(this).siblings("span").text(maxChar).removeClass('overcount');

    // If over the max amount, character count is red and negative
    } else {
      charCount = maxChar - charCount;
      return $(this).siblings("span").text(charCount).addClass('overcount');
    }

  });

});
