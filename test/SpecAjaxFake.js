/*!
 * ------------------------------
 * jQuery.ajax.fake tests
 * http://anasnakawa.github.com/jquery.ajax.fake
 * license: MIT license (http://opensource.org/licenses/MIT)
 * ------------------------------
 */

// ------------------------------
// table of content
// ------------------------------
// creating fake web services
// testing real web services
// testing fake calls
// ------------------------------

// creating fake web services
// ------------------------------
var twitter_url = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=anasnakawa&count=2'
  , duration = 1000;
$.ajax.fake.registerWebservice(twitter_url, function(data) {
  return [
      {
          "user": {
              "id": 1,
              "name": "Anas Nakawa",
              "screen_name": "anasnakawa"
          }
      }
  ]
});

// testing real web services
// ------------------------------
describe("calling out twitter web service", function() {
  
  beforeEach(function() {
    $.ajax.isFake =  false;
  });
  
  it("should get user name, screen name and ID", function() {
    
    var promise
    , isDone;
    
    runs(function() {
      promise = $.ajax({
        type:'GET',
        dataType:'jsonp',
        url:twitter_url
      }).always(function() {
        isDone = true;
      });
    });
    
    waitsFor(function() {
      return isDone;
    }, "call ended", duration);
    
    runs(function() {
      
      promise.always(function( data ) {
        
        expect( data[ 0 ].user.id_str ).toBe( '15413769' );
        
      });
      
    });
    
  });
  
});

// tesing fake calls
// ------------------------------
describe('testing fake calls', function() {
  
  beforeEach(function() {
    $.ajax.isFake = true;
  });
  
  it('should bring data from fake one', function() {
    
    var promise
    , isDone;
    
    runs(function() {
      promise = $.ajax({
        type:'GET',
        fake: true,
        dataType:'jsonp',
        url:twitter_url
      }).always(function() {
        isDone = true;
      });
    });
    
    waitsFor(function() {
      return isDone;
    }, duration);
    
    runs(function() {
      promise.always(function(data) {
        expect(data[0].user.id).toEqual( 1 );
      });
      promise.done(function(data) {
        expect(data[0].user.id).toEqual( 1 );
      });
    });
    
  });
  
});
