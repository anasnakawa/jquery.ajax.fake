/*!------------------------------
 * jquery.ajax.fake.js
 * http://anasnakawa.github.com/jquery.ajax.fake
 * license: MIT (http://opensource.org/licenses/mit-license.php)
 * author : Anas Nakawa anas.nakawa@gmail.com @anasnakawa
 * ------------------------------
 */

(function($){

  // caching original jquery ajax method
  var

    ajax = $.ajax,

    fakeWebServices = {},

    defaults = {
      fake  : false,  // is it fake ?
      wait  : 1000  // how long should wait before return ajax response
    },

    _runComplete = function ( options, data ) {

      if(options.complete) {
        if(options.context) {
          $.proxy(options.complete, options.context)( data );
        } else {
          options.complete( data );
        }
      }

    },

    ajaxFake = function(options) {
      // Create a new deferred object for each request
      var deferred = $.Deferred();

      // not fake, just return the original jquery ajax
      if ( $.ajax.isFake === false ) {
        return ajax.apply(this, arguments);
      }

      if ( !options.fake ) {
        return ajax.apply(this, arguments);
      }

      if ( !options.type ) {
        options.type = 'get';
      } else {
        options.type = options.type.toLowerCase();
      }

      options = $.extend({}, defaults, options);

      console.info(
        '[FAKE] Request (url + sent data): ', 
        options.url, 
        undefined === options.data ? '[no data sent]' : options.data
      );

      // isn't webservices registered and request type valid?
      if( !fakeWebServices[options.url] || !fakeWebServices[options.url][options.type] ) {

        // is webservers missing?
        if ( !fakeWebServices[options.url] ) {
          $.error('{url} 404 not found'.replace(/{url}/, options.url));
          return deferred.reject('404');
        }

        // or is request type wrong?
        else if( !fakeWebServices[options.url][options.type] ) {
          $.error(
            'Method {type} is not allowed for {url}'
              .replace(/{url}/, options.url)
              .replace(/{type}/, options.type.toUpperCase())
            );

          return deferred.reject('405');
        }

      }

      // fakes timeout error ...
      if (options.timeout !== undefined && options.timeout < options.wait) {

        setTimeout(function () {
          var data = fakeWebServices[options.url][options.type](options.data);

          $.error('{url} 408 timeout'.replace(/{url}/, options.url));

          if (options.error) {
            if (options.context) {
              $.proxy(options.error, options.context)( data.type.error, 'timeout' );
            } else {
              options.error( data.type.error, 'timeout' );
            }
          }

          // call complete callback from jquery
          _runComplete(options, data.type.error);
          return deferred.reject('408');

        }, options.timeout);

        return false;
      }

      // fake it..
      setTimeout(function() {
        var data = fakeWebServices[options.url][options.type](options.data);

        if (options[data.status]) {
          if(options.context) {
            $.proxy(options[data.status], options.context)( data.type[data.status] );
          } else {

            options[data.status]( data.type[data.status], data.status );

          }
        }

        // call complete callback from jquery
        _runComplete(options, data.type[data.status]);

        // return the promise object according to status
        switch (data.status) {
          case 'success':
            console.info(
              '[FAKE] Response (received data): ', 
              undefined === data ? '[no data received]' : data
            );

            deferred.resolve( data.type.success );
            break;

          case 'error':
            console.error(
              '[FAKE] Response (received data): ', 
              undefined === data ? '[no data received]' : data
            );

            deferred.reject( data.type.error );
            break;

          default:
            console.log(
              '[FAKE] Response (received data): ', 
              undefined === data ? '[no data received]' : data
            );

            deferred.reject({});
        }
      }, options.wait);

      // return a promise object
      return deferred.promise();
    },

    registerFakeWebService = function(url, callback, requestType, status) {
      if (!requestType) {
        requestType = 'get';
      }

      if (!status) {
        status = 'success';
      }

      if (!fakeWebServices[url]) {
        fakeWebServices[url] = {};
      }

      fakeWebServices[url][requestType.toLowerCase()] = function(data) {
        return {
          type: callback(data),
          status: status
        };
      };
    };

    // expose to jquery api
    // --------------------
    $.ajax = ajaxFake;
    $.ajax.fake = {
      defaults            : defaults,
      registerWebservice  : registerFakeWebService,
      webServices         : fakeWebServices
    };

  // console.log('Fake ajax calls was initialised');

})(jQuery);
