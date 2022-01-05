/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(document).ready(function() {}) REMEMBER THIS FROM NABEEL

$(document).ready(function() {

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet)); 
    };
  }
  
  const createTweetElement = function (tweetData) {
    let $tweet = $(`<article class="tweet">
      <div class="header">
        <div class="avatar-username">
          <img class="avatar-image" src="${tweetData.user.avatars}">
          <p class="fullname">${tweetData.user.name}</p>
        </div>
        <p class="username">${tweetData.user.handle}</p>
      </div>
      <section class="tweet-text">
        <p>${escape(tweetData.content.text)}</p>
      </section>
      <section class="footer">
        <p>${timeago.format(tweetData.created_at)}</p>
        <div class="icons">
          <i class="fas fa-flag" id="icon-1"></i>
          <i class="fas fa-retweet" id="icon-2"></i>
          <i class="fas fa-heart" id="icon-3"></i>
        </div>
      </section>
    </article>`);
    return $tweet
  }

  
  const $form = $('form');
  $(".error-short-container").hide();
  $(".error-long-container").hide();
  
  $form.submit(function (event) {
    event.preventDefault();

    const value = $form.find('input').val().length
    console.log('value', value);

    if (value === 0 || value === null) {
      $(".error-long-container").slideUp(500);
      $(".error-short-container").slideDown(500);
    } else if (value > 140) {
      $(".error-short-container").slideUp(500);
      $(".error-long-container").slideDown(500);
    } else {
      $(".error-short-container").slideUp(500);
      $(".error-long-container").slideUp(500);
      $.post('/tweets', $(this).serialize())
      .then((res) => {
        $form.find('input').val('');
        $('.counter').text(140);
        loadTweets();
        console.log('res-success!', res);
      }).catch((error) => {
        console.log('Error :(', error);
      })
    }
  });
  
  
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
    .then((res) => {
      renderTweets(res);
    })
  };

  loadTweets();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const safeHTML = `<p>${escape(textFromUser)}</p>`;

});