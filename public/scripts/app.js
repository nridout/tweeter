// *** TWEETER APP **** //

$(document).ready(function () {

  // Takes in an array of tweet objects and appends each one to the #tweets - container
  function renderTweets(tweets) {

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
    let $content = $("<div>").addClass("content").append(tweet.content.text);
    let $footer = $("<footer>");
    let created = moment(tweet.created_at).startOf("hour").fromNow();
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


  let form = $('#post-tweet');

  // Posts tweet data to server
  form.submit(function (event) {

    event.preventDefault();

    let tweetText = $('textarea').val()

    if (!tweetText) {
      alert("Tweet content is empty! Please enter a tweet.");
    } else if (tweetText.length > 140) {
      alert("Tweet text is longer than 140 characters! Please shorted your tweet.");
    } else {
      $.ajax({
        type: "POST",
        url: form.attr('action'),
        data: form.serialize(), // serializes the form's elements.
        success: function () {
          console.log('Submission was successful.');
        },
        error: function () {
          console.log('An error occurred.');
        },
      });
    }

  })

  // Makes a request to Tweet page and receives the array of tweets as JSON
  function loadTweets() {

    $(function () {
      $.ajax({
        type: "GET",
        url: ('/tweets'),
        success: function(data) {
          renderTweets(data);
        },
        error: function () {
          console.log('An error occurred.');
        },
      });
    });

  }

  // Fetches tweets from /tweets
  loadTweets();


// End of Document Ready
});



