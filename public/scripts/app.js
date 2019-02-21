$(document).ready(function () {

  // --------------------------- TWEETS CONTAINER DISPLAY --------------------------- //

  // Makes a request to Tweet page
  // Receives the array of tweet objects
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

  // Takes in an array of tweet articles
  // Appends each tweet to the Tweets container
  function renderTweets(tweets) {
    // Clears the Tweet container of previous tweets
    $('#tweets-container').empty();
    // Append tweets to tweet container
    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      return $('#tweets-container').append($tweet);
    });

  }

  // Takes in a tweet object and returns a tweet < article >
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

  // Loads the initial page tweets
  loadTweets();

 // --------------------------- NEW TWEET SUBMISSION --------------------------- //

  const $form = $('#post-tweet');
  const $tweetText = $('textarea');
  const $errorBox = $('.error-message');

  // Posts tweet data to server
  $form.submit(function (event) {

    event.preventDefault();

    // Textarea validation - if no tweet text
    if (!$tweetText.val()) {
      showError("Nothing to Tweet! Please enter some text.");
    // Textarea validation - if tweet is longer than 140 characters
    } else if ($tweetText.val().length > 140) {
      showError("Tweet text is longer than 140 characters! Please shorten your tweet.");
    } else {
      // Remove error box if submission is valid
      $errorBox.slideUp("fast");
      // Post submission to server
      $.ajax({
        type: "POST",
        url: $form.attr('action'),
        data: $form.serialize(), // serializes the form's elements.
        success: function () {
          console.log('Submission was successful.');
          // Reload tweets
          loadTweets();
          // Clear the textarea
          $tweetText.val("");
          // Reset the counter
          $('span.counter').text(140);
        },
        error: function () {
          console.log('An error occurred.');
        },
      });
    }
  })

  // Allows "Enter" key to submit tweet
  $tweetText.keydown(function (e) {
    var key = e.which;
    if (key == 13) {
      // As ASCII code for ENTER key is "13"
      $form.submit(); // Submit form code
    }
  });

  // Error box messages
  function showError(message) {
    // display the error content
    $errorBox.slideDown("fast");
    // add the error text
    $errorBox.text(message);
  }

  // ------------------------ COMPOSE TOGGLE BUTTON -------------------------- //

  const $newTweetBox = $(".new-tweet")

  // Hide New Tweet box on load
  $newTweetBox.hide();

  // Toggle Compose button - slides up and down
  // Focuses on text area when visible
  $("#compose").click(function () {

    if ($newTweetBox.is(":hidden")) {
      $newTweetBox.slideDown("fast");
      $tweetText.focus();
    } else {
      $newTweetBox.slideUp("fast");
    }

  });

  // --------------------------------------------------------------------------//


// End of Document Ready
});