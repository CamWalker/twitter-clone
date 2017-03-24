$('document').ready(function () {
  // Initially, the Tweet button and the character count button should be hidden
  // (CSS).
  $('#tweet-controls').hide();
  $('.tweet-actions').hide();
  $('.stats').hide();

  // jQuery(document).ready(function() {
  //   jQuery("time.timeago").timeago();
  // });

  //    INTERACTIVITY



  // When the user clicks on the textarea, the textarea should double in size and
  // the character count and Tweet buttons should be revealed.
  $('textarea.tweet-compose').on('focus',function () {
    $('#tweet-controls').show();
  });
  $('textarea.tweet-compose').on('blur',function () {
    if( charCount === 140) {
      $('#tweet-controls').hide();
    }
  });

  // * As the user types, the character count should decrease.
  var charCount = 140;
  var tweetText = "";
  $('textarea.tweet-compose').on('keyup',function () {
    charCount =  140 - $(this).val().length;
    tweetText = $(this).val();
    $('#char-count').text(charCount);
    // When there are 10 or less characters, the character counter should turn red.
    // If the user puts in more than 140 characters, the tweet button should be disabled
    // (and re-enabled when there are <= 140 chars).
    if (charCount < 0) {
      $('#tweet-submit').prop('disabled', true);
      $('#char-count').css('color','red');
    } else if (charCount < 10) {
      $('#char-count').css('color','red');
      $('#tweet-submit').prop('disabled', false);
    } else {
      $('#char-count').css('color','');
    }
  });

  // When the user successfully inputs characters and clicks the “Tweet” button,
  // a new tweet should be created and added to the tweet stream in the main column,
  // using the user’s fake profile image in the top left and username/fullname.

  $('#tweet-submit').on('click', function () {
    $('#stream').prepend('<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">Henry Ford <span class="username">@</span></strong><span class="username">HenryFord</span><p class="tweet-text" style="word-wrap: break-word;">'
    + tweetText +
    '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="stats"><div class="retweets"><p class="num-retweets">0</p><p>RETWEETS</p></div><div class="favorites"><p class="num-favorites">0</p><p>FAVORITES</p></div><div class="users-interact"><div></div></div><div class="time myTime" id="">'
     + "a few seconds ago" +
    '</div></div><div class="reply"><img class="avatar" src="img/alagoon.jpg" /><textarea class="tweet-compose" placeholder="Reply to @HenryFord"/></textarea></div></div></div>')
    $('textarea.tweet-compose').val('');
    $('#tweet-controls').hide();
    $('#char-count').text(140);
  });

  // The tweet actions (Reply, Retweet, etc) should only show up when you hover
  // over that individual tweet. Otherwise, they should be hidden.
  $('.tweet').on('mouseenter', function () {
    var tweetActions = $(this).find('.tweet-actions');
    tweetActions.show();
  });
  $('.tweet').on('mouseleave', function () {
    var tweetActions = $(this).find('.tweet-actions');
    tweetActions.hide();
  });
  $('.tweet').on('click', function () {
    var tweetActions = $(this).find('.stats');
    tweetActions.show();
  });


  // * Implement the icons for when a tweet is favorited/retweeted in the upper right of the tweet.
  //  - Clicking favorite should increase the favorite count.
  $(document).on('click', '.favorites', function (e) {
    e.preventDefault();
    var tweetActions = $(this).find('.num-favorites');
    tweetActions.text((Number(tweetActions.text()) + 1));

  });

  //  - Clicking retweet should increase the retweet count and take the text of the tweet and retweet it.
  function reTweet(tweetText1) {
    $('#stream').prepend('<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">Henry Ford <span class="username">@</span></strong><span class="username">HenryFord</span><p class="tweet-text" style="word-wrap: break-word;">'
    + tweetText1 +
    '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="stats"><div class="retweets"><p class="num-retweets">0</p><p>RETWEETS</p></div><div class="favorites"><p class="num-favorites">0</p><p>FAVORITES</p></div><div class="users-interact"><div></div></div><div class="time myTime" id="">'
     + "a few seconds ago" +
    '</div></div><div class="reply"><img class="avatar" src="img/alagoon.jpg" /><textarea class="tweet-compose" placeholder="Reply to @HenryFord"/></textarea></div></div></div>');
  }

  $(document).on('click', '.action-retweet', function (e) {
    e.preventDefault();
    var tweetActions = $(this);
    tweetActions = tweetActions.parent().parent().parent().next().find('.num-retweets');
    console.log(tweetActions);
    tweetActions.text((Number(tweetActions.text()) + 1));

    var tweetText1 = $(this).parent().parent().parent().prev();
    tweetText1 = tweetText1.text();
    console.log(tweetText1);
    reTweet(tweetText1);
  });


})
