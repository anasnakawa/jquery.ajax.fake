## jQuery.ajax.fake
when you want to fake an ajax call, that's because your server's web service is just not ready yet, and whenever that web service is ready, switching back to it should cost nothing..

with `jquery.ajax.fake` you simply write pure jQuery ajax call, with only one extra property `fake: true`

## Why

## How to use it
include `jquery.ajax.fake.js` script into your markup, and create `webservices.fake.js` to handle fake ajax calls
```html
<script src="jquery.ajax.fake.js"></script>
<script src="webservices.fake.js"></script>
```
now lets say you want to fake a twitter timeline ajax call,  
first simply create a fake web service in `webservices.fake.js` using the same url that you would use in your ajax call as a first parameter

```js
$.ajax.fake.registerWebservice('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=anasnakawa', function(data) {
    return [{
        "text": "hey this is fake #tweet, retweet please :) #retweet"
    }]
});
```

now all you have to do is to add the property `fake: true` to your ajax call settings... and that's it!
```js
$.ajax({
    type:'GET',
    dataType:'jsonp',
    fake: true,	// <<<---- that's it !
    url:'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=anasnakawa',
    success:function(data, textStatus, XMLHttpRequest) {
    	// your fake tweet should be here!
    }
});
```

## Disabling fake ajax calls globally
you can disable fake ajax calls globally by either remove both `jquery.ajax.fake.js` & `webservices.fake.js` script files from your markup, 
or by just adding the following variable
```js
$.ajax.isFake = false;    // this will disable all fake ajax calls, and make the actual jQuery ajax handler work instead
```

## What about promises ?
don't worry, even fake ajax calls will work perfectly with `Deferred` objects that implements the `Promise` interface, as expected a fake ajax call will return a deferred object that will have a success & fail
```js
var deferred = $.ajax({
    type:'GET',
    dataType:'jsonp',
    fake: true,       // <<<---- that's it !
    url:'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=anasnakawa'
});

deferred.success(function(data) {
	// your fake tweet should be here!
}).error(function() {
    // handle some errors
});
```

## Installing via Bower
```
bower install jquery.ajax.fake
```

## Installing via Yeoman
```
yeoman install jquery.ajax.fake
```

## Reference
```js
fake    : false // is it fake ?
wait	: 1000	// how long should wait before return ajax response
```

## Todo
* failed requests
* provide some test cases

## Credits
created by Anas Nakawa [github](//github.com/anasnakawa), [twitter](//twitter.com/anasnakawa),  

## License
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php)