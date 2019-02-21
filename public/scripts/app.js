// *** TWEETER APP **** //

$(document).ready(function () {

  // --------------------------- TWEETS DISPLAY CREATION --------------------------- //

  // Loads the initial page tweets
  loadTweets();

  // Makes a request to Tweet page and receives the array of tweets as JSON
  function loadTweets() {

    $(function () {
      $.ajax({
        type: "GET",
        url: ('/tweets'),
        success: function (data) {
          renderTweets(data);
        },
        error: function () {
          console.log('An error occurred.');
        },
      });
    });

  }

  // Takes in an array of tweet objects and appends each one to the #tweets - container
  function renderTweets(tweets) {
    // Clears the Tweet container of previous tweets
    $('#tweets-container').empty();
    // Append tweets to tweet container
    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      return $('#tweets-container').append($tweet);
    })

  }

  // Takes in a tweet object and returns a tweet < article > element
  // containing the entire HTML structure of the tweet
  function createTweetElement(tweet) {

    // Define all of the tweet elements for the Tweet article
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small);
    let $name = $("<h2>").addClass("name").append(tweet.user.name);
    let $username = $("<span>").addClass("handle").append(tweet.user.handle);
    let $content = $("<div>").addClass("content").text(tweet.content.text);
    let $footer = $("<footer>");
    let created = moment(tweet.created_at).fromNow();
    let $daysOld = $("<span>").addClass("created-at").append(created);
    let $heartIcon = $("<span>").addClass("fa fa-heart");
    let $retweetIcon = $("<span>").addClass("fa fa-retweet");
    let $flagIcon = $("<span>").addClass("fa fa-flag");

    // Append Elements to the Tweet article
    $tweet.append($header);
    $header.append($avatar);
    $header.append($name);
    $header.append($username);
    $tweet.append($content);
    $tweet.append($footer);
    $footer.append($daysOld);
    $footer.append($heartIcon);
    $footer.append($retweetIcon);
    $footer.append($flagIcon);

    // Return formatted Tweet article
    return $tweet;
  }

 // --------------------------- NEW TWEET SUBMISSION --------------------------- //

  const form = $('#post-tweet');

  // Allows "Enter" key to submit tweet
  $('textarea').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
      // As ASCII code for ENTER key is "13"
      form.submit(); // Submit form code
    }
  });

  // Posts tweet data to server
  form.submit(function (event) {

    event.preventDefault();

    let tweetText = $('textarea').val()

    if (!tweetText) {
      // display the error content
      $('.error-message').slideToggle("fast");
      // add the error text
      $('.error-message').text("Nothing to Tweet! Please enter some text.");
      event.stopPropagation();
    } else if (tweetText.length > 140) {
      // display the error content
      $('.error-message').slideToggle("fast");
      // add the error text
      $('.error-message').text("Tweet text is longer than 140 characters! Please shorted your tweet.");
      event.stopPropagation();
    } else {
      $('.error-message').slideToggle("fast");
      // Post submission to server
      $.ajax({
        type: "POST",
        url: form.attr('action'),
        data: form.serialize(), // serializes the form's elements.
        success: function () {
          console.log('Submission was successful.');
          // Reload tweets
          loadTweets();
          // Clear the textarea
          $('textarea').val("");
          // Reset the counter
          $('span.counter').text(140);
        },
        error: function () {
          console.log('An error occurred.');
        },
      });
    }

  })

  // function displayError() {
  //   // display the error box
  //   $('.error-message').slideToggle("fast");
  //   // add the textbox red border ??
  //   // $('textarea').addClass("error");
  // }

  // ------------------------ COMPOSE TOGGLE BUTTON -------------------------- //

  // Hide New Tweet box on load
  $(".new-tweet").hide();

  // Toggle Compose button - slides up and down
  // Focuses on text area when visible
  $("#compose").click(function () {

    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideToggle("fast");
      $('textarea').focus();
    } else {
      $(".new-tweet").slideToggle("fast");
    }

  });

  // --------------------------------------------------------------------------//



// End of Document Ready
});