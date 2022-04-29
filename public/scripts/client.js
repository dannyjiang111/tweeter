const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const obj of tweets) {
      let newTweet = createTweetElement(obj);
      let $tweetsContainer = $(".tweetsContainer")
      $tweetsContainer.append(newTweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let $tweet = $("<article>").addClass("tweetBox");
    const date = timeago.format(tweet.created_at);
    let tweetContent = 
    `<header>
      <div class="profile">
        <img src=${escape(tweet.user.avatars)} width="50" height="50">
        <p>${escape(tweet.user.name)}</p>
      </div>
        <p class="tag">${escape(tweet.user.handle)}</p> 
    </header>
      <p class="content">${escape(tweet.content.text)}</p>
    <footer>
      <p> ${escape(date)} </p>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>`

    let newTweet = $tweet.append(tweetContent);
    return newTweet;
  };

  const getTweet = () => {
    $.ajax({
      url: "/tweets",
      type: "GET"
    }).then (function(data) {
      renderTweets(data);
    })
  }

  getTweet();

  $(".alertBox").hide();
  $(".alertBox2").hide();

  $('#tweetForm').on('submit', function(e) {
    e.preventDefault();
    const content = $("#tweetForm").serialize();
    const tweet = $("#tweet-text").val();

    if (tweet.length >= 140) {
      return $("#box").slideDown();
    }
    if (tweet === null || tweet === "") {
      return $("#box2").slideDown();
    }
    $.ajax ({
      type: "POST",
      url: "/tweets",
      data: content
    }). then((data) => {
      getTweet();
      $("#tweet-text").val("");
    })
  })
});