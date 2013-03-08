(function($) {
  
  var fake = $.ajax.fake;
  
  fake.registerWebservice('http://www.twitter.com/userfeeds', function(data) {
    return {
      username: 'AnasNakawa'
      , url:  'http://anasnakawa.wordpress.com'
    };
  });
  
  fake.registerWebservice('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=anasnakawa&count=2', function(data) {
    return [
          {
              "text": "hey this is fake #tweet, retweet please :) #retweet"
          }
      ]
  });
  
})(jQuery);