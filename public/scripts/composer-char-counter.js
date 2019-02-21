// **** CHARACTER COUNTER **** //

// Captures input from the Compose Tweet textarea to update the Character Counter
// Shows how many characters a user may still type (max allowable characters minus total typed)
// When over the character limit, the counter number turns red and displays as a negative

$(document).ready(function () {

  const $counter = $('span.counter')

  $("textarea").on('input', function () {

    let charCount = 140 - $(this).val().length
    // If over the max amount, character count is red & negative
    if (charCount < 0) {
      $counter.addClass('overcount')
    // If under the max amount, character count is normal
    } else {
      $counter.removeClass('overcount')
    }
    // Append the count to the page
    $counter.text(charCount)

  });

});
