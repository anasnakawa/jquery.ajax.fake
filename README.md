# jQuery Ajax Fake

Allow fake ajax calls to simulate it whenever you can't do it for real, on development environments.

This library was customized and it's original source was created by *Anas Nakawa* and is available at http://anasnakawa.github.com/jquery.ajax.fake.

## Files structure

```bash
/ (root)
- dummy.js
- jquery.ajax.fake.js
- webservices.fake.js
```

## Getting started

First include these files into your pages

```html
<body >
  ...
  <script type="text/javascript" src="path/to/jquery.js" defer ></script>
  <script type="text/javascript" src="dummy.js" defer ></script>
  <script type="text/javascript" src="jquery.ajax.fake.js" defer ></script>
  <script type="text/javascript" src="webservices.fake.js" defer ></script>
</body>
```

Edit `webservices.fake.js` and define what should be the responses your webservices will return.


```javascript
fake.registerWebservice('some/path/here', function( data ) {
  var response = {
    "success": {
      "propOne": "valueOne",
      "propTwo": 5,
      "...": "..."
    },
    "error": {
      "status": 500,
      "responseText": "{\"error\": \"server_error\", \"message\": \"This is the error message\"}"
    }
  };

  return response;
}, 'post', 'success');
```

Then, to make things simple, you can define some key variables in dummy.js (or even inline, but not advised) which you can change whenever you need to test your calls for success or error.

```javascript
// defines the response status
var dummyStatus = 'success';

// defines whenever ajax will fake or not your calls
var dummyAjax  = true;

// pretends a delay on the response 
var dummyDelay = 650; // 0.65 second;

```
