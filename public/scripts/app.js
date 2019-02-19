$(document).ready(function () {

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
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
  }

  //takes in a tweet object and is responsible for returning a tweet < article > element
  //containing the entire HTML structure of the tweet.
  function createTweetElement(tweetData) {

    // var for each class

    var $article = $("<article>").addClass("tweet");
    var $header = $("<header>");
    var $avatar = $("<img>").addClass("avatar").attr("src", tweetData.user.avatars.small);
    var $name = $("<h2>").addClass("name").append(tweetData.user.name);
    var $username = $("<span>").addClass("handle").append(tweetData.user.handle);
    var $content = $("<div>").addClass("content").append(tweetData.content.text);
    var $footer = $("<footer>");
    var $daysOld = $("<span>").addClass("created-at").append(tweetData.created_at);
    var $heartIcon = $("<span>").addClass("fa fa-heart");
    var $retweetIcon = $("<span>").addClass("fa fa-retweet");
    var $flagIcon = $("<span>").addClass("fa fa-flag");

    // append items to the dom

    $article.append($header);
    $header.append($avatar);
    $header.append($name);
    $header.append($username);
    $article.append($content);
    $article.append($footer);
    $footer.append($daysOld);
    $footer.append($heartIcon);
    $footer.append($retweetIcon);
    $footer.append($flagIcon);


    // return article
    return $article;
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});




