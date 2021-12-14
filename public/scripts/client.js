/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(document).ready(function() {}) REMEMBER THIS FROM NABEEL

$(document).ready(function() {

  const data =  [
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

    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet)); 
    }
  }
  
  const createTweetElement = function (tweetData) {
    let $tweet = $(`<article class="tweet">
      <header class="header">
        <div class="avatar-username">
          <img class="avatar-image" src="${tweetData.user.avatars}">
          <p class="fullname">${tweetData.user.name}</p>
        </div>
        <p class="username">${tweetData.user.handle}</p>
      </header>
      <section class="tweet-text">
        <p>${tweetData.content.text}</p>
      </section>
      <section class="footer">
        <p>timeago.format(${tweetData.created_at})</p>
        <div class="icons">
          <i class="fas fa-flag" id="icon-1"></i>
          <i class="fas fa-retweet" id="icon-2"></i>
          <i class="fas fa-heart" id="icon-3"></i>
        </div>
      </section>
    </article>`);
    return $tweet
  }
  
  renderTweets(data);

  const $form = $('form');
  $form.submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.post('/tweets', $(this).serialize())
    .then((res) => {
      //console.log('Anything really', res)
    }).catch((error) => {
      //console.log('Error', error)
    })
  });

  const loadTweets = function() {
    $.get('/tweets', renderTweets(data))
  };

});