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


const renderTweets = function(tweets) {
  for (let obj of tweets) {
    let newTweet = createTweetElement(obj);
    let $tweetsContainer = $(".tweetsContainer")
    $tweetsContainer.append(newTweet);
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweetBox");
  const date = timeago.format(tweet.created_at);
  let tweetContent = 
  `<header>
    <div class="profile">
      <img src=${tweet.user.avatars} width="50" height="50">
      <p>${tweet.user.name}</p>
    </div>
      <p class="tag">${tweet.user.handle}</p> 
  </header>
  <p class="content">${tweet.content.text}</p>
  <footer>
    <p> ${date} </p>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>`

  let newTweet = $tweet.append(tweetContent);
  return newTweet;
};
