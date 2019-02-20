$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];




  function renderTweets(tweets) {

    // loops through tweets
    tweets.forEach(function(tweet) {

      // calls createTweetElement for each tweet
      var $tweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      return $('#tweets-container').append($tweet);

    })
  }

  // takes in a tweet object and is responsible for returning a tweet < article > element
  // containing the entire HTML structure of the tweet.
  function createTweetElement(tweet) {

    // var for each class
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

    // append items to the dom
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

    // return formatted tweet
    return $tweet;
  }

  renderTweets(data);


});



