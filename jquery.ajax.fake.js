// ------------------------------
// jquery.ajax.fake.js
// http://anasnakawa.github.com/jquery.ajax.fake
// ------------------------------
// author : Anas Nakawa
//			anas.nakawa@gmail.com
//			@anasnakawa
// license: MIT (http://opensource.org/licenses/mit-license.php)
// ------------------------------

// ------------------------------
// table of content
// ------------------------------
// some title
//  - sub title
//  - sub title 2
// some mixin
// ------------------------------

(function($){

	// caching original jquery ajax method
	var ajax = $.ajax
	, fakeWebServices = {}
	, deferred = $.Deferred()
	, defaults = {
		fake		: false
		, randomFail: 0			// (number between 0 to 1) should the fake ajax randomly fail ? 
	}
	
	/*\
	 * 
	 * var deferred = $.Deferred();

		deferred.done(function(value) {
   			alert(value);
		});

		deferred.resolve("hello world");
	 */
	
	, ajaxFake = function(options) {
		
		// debugger;
		// not fake, just return the original jquery ajax
		var fake = !$.ajax.isFake ? false : options.fake;
		if(!fake) {
			return ajax.apply(this, arguments);
		}
		
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
			
		}, 1000);
		
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