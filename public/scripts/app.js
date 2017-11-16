function parseHumanDate(timeCreated) {
    var created = new Date(timeCreated);
    var seconds = Math.floor((Date.now() - created) / 1000);
    var interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) {
        return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
};

$(document).ready(function() {

  function createTweetElement(tweet){
    var safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    var $tweet = 
     `<article class="display-tweet-container">
        <header class="display-tweets">
          <img class="twitter-image" src=${tweet.user.avatars.small} alt="user-image">
          <h2 class="name">${tweet.user.name}</h4>
          <h4 class="username">${tweet.user.handle}</h4>
        </header>
        <div class="tweet-body">
          ${safeHTML}
        </div>
        <footer class="display-tweets">
          <div class="tools">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
          </div>
          <h3 class="time-stamp">${parseHumanDate(tweet.created_at)}</h3>
        </footer> 
      </article>`
    
    return $tweet;
  };

  function renderTweets(tweets) {
    for (var i = 0; i < tweets.length; i++){
      var createdTweet = createTweetElement(tweets[i])
      $("#tweets-container").prepend(createdTweet)
    };
  };

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function loadTweets(){
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: renderTweets
    });
  };

  loadTweets();

  $(".tweets").on("submit", function(event) {
    event.preventDefault();

    var data = $(this).serialize();
    var inputData = $(".tweet").val();

    if (inputData === "" || null) {
      alert ("No Empty Tweets Allowed!")
    } else if (inputData >= 141) {
      alert ("Keep it under 140 characters bro!")
    } else {
      $.post("/tweets/", data, function(result) {
        loadTweets();
      });
    };
  });

  $(".compose-button").click(function(){
    $(".container-new-tweet").slideToggle();
    $("textarea").focus();
  })
});