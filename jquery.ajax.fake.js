/*!------------------------------
 * jquery.ajax.fake.js
 * http://anasnakawa.github.com/jquery.ajax.fake
 * license: MIT (http://opensource.org/licenses/mit-license.php)
 * ------------------------------
 */
// ------------------------------
// author : Anas Nakawa
//      anas.nakawa@gmail.com
//      @anasnakawa
// ------------------------------

(function($){

  // caching original jquery ajax method
  var ajax = $.ajax
  , fakeWebServices = {}
  , defaults = {
    fake  : false  // is it fake ?
    , wait  : 1000  // how long should wait before return ajax response 
  }
  
  , ajaxFake = function(options) {

    // Create a new deferred object for each request
    var deferred = $.Deferred();
    
    // not fake, just return the original jquery ajax
    if( $.ajax.isFake === false ) {
      return ajax.apply(this, arguments);
    }
    
    if( !options.fake ) {
      return ajax.apply(this, arguments);
    }
    
    options = $.extend({}, defaults, options);
    
    if( !fakeWebServices[options.url] ) {
      $.error('{url} 404 not found'.replace(/{url}/, options.url));
      return deferred.reject('404');
    }

    // fake it..
    setTimeout(function() {
      var data = fakeWebServices[options.url](options.data);
      if(options.success) {
        options.success( data );
      }
      if(options.complete) {
        options.complete( data );
      }
      deferred.resolve( data );
      
    }, options.wait);
    
    // return a promise object
    return deferred.promise();
  }
  
  , registerFakeWebService = function(url, callback) {
    fakeWebServices[url] = function(data) {
      return callback(data);
    }
  }
  
  // expose to jquery api
  // --------------------
  $.ajax = ajaxFake;
  $.ajax.fake = {
    defaults              : defaults
    , registerWebservice  : registerFakeWebService
    , webServices         : fakeWebServices
  };

})(jQuery);