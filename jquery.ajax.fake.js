/*!------------------------------
 * jquery.ajax.fake.js
 * http://anasnakawa.github.com/jquery.ajax.fake
 * license: MIT (http://opensource.org/licenses/mit-license.php)
 * ------------------------------
 */
// ------------------------------
// author : Anas Nakawa
//			anas.nakawa@gmail.com
//			@anasnakawa
// ------------------------------

(function($){

	// caching original jquery ajax method
	var ajax = $.ajax
	, fakeWebServices = {}
	, deferred = $.Deferred()
	, defaults = {
		fake	: false	// is it fake ?
		, wait	: 1000	// how long should wait before return ajax response 
	}
	
	, ajaxFake = function(options) {
		
		// not fake, just return the original jquery ajax
		var fake = !$.ajax.isFake ? false : options.fake;
		if(!fake) {
			return ajax.apply(this, arguments);
		}
		
		options = $.extend(defaults, options);
		
		if( !fakeWebServices[options.url] ) {
			// options.error( deferred.reject() );
			$.error('{url} 404 not found'.replace(/{url}/, options.url));
			return deferred.reject('404');
		}

		// fake it..
		setTimeout(function() {
			var data = fakeWebServices[options.url](options.data);
			if(options.success) {
				options.success( data );
			}
			deferred.resolve( data )
			
		}, options.wait);
		
		// deferred ajax aliasing
		deferred.success = deferred.done;
		deferred.error = deferred.fail;
		
		return deferred;
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
		defaults				: defaults
		, registerWebservice	: registerFakeWebService
		, webServices			: fakeWebServices
	};

})(jQuery);