/*!------------------------------
 * webservice.fake.js
 * http://anasnakawa.github.com/jquery.ajax.fake
 * license: MIT (http://opensource.org/licenses/mit-license.php)
 * author : Anas Nakawa anas.nakawa@gmail.com @anasnakawa
 * ------------------------------
 */

;(function($) {

  var fake = $.ajax.fake;

  // @use registerWebservice(path, callback [, method [, responseStatus]])
  // @param {string} path             - Path to the webservice
  // @param {function} callback       - A callback containing the return object with two states (success and error).
  // @param {string} [method]         - Optional. Request method.
  // @param {string} [responseStatus] - Optional. What response will be returned (success, error).


  // using default request type (get) and response status (success)
  fake.registerWebservice('some/path/here', function( data ) {
    var response = {
      "success": {
        "propOne": "valueOne",
        "propTwo": 5,
        "...": "..."
      },
      "error": {
        "status": 500,
        "responseText": "{\"error\": \"server_error\", \"message\": \"This is the error messaage\"}"
      }
    };

    return response;
  });

  // force request type to 'post' and response status to what is set on dummy.js
  fake.registerWebservice('some/path/here', function( data ) {
    var response = {
      "success": {
        "propOne": "valueOne",
        "propTwo": 5,
        "...": "..."
      },
      "error": {
        "status": 500,
        "responseText": "{\"error\": \"server_error\", \"message\": \"This is the error messaage\"}"
      }
    };

    return response;
  }, 'post' /* http method */, 'success' /* response status */);

})(jQuery);
