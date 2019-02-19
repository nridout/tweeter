$(document).ready(function () {
  // Updates the count to reflect the number of characters in the textbox
  // If over the max amount, count is red and negative
  $("textarea").keydown(function () {
    let maxChar = 140;
    let charCount = $(this).val().replace(/ /g, '').length;
    if (charCount <= maxChar) {
      maxChar = maxChar - charCount;
      return $(this).siblings("span").text(maxChar);

    } else {
      charCount = maxChar - charCount;
      return $(this).siblings("span").text(charCount);
    }
  });

});
