/*
	jquery.twitterbutton.js - http://socialmediaautomat.com/jquery-twitterbutton-js.php
	Copyright (c) 2011 Stephan Helbig
	This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
*/

(function($){  
$.fn.twitterbutton = function(options) {  
	
  //Set the default values, use comma to separate the settings 
  var defaults = {  
		user: false,
		user_description: false,
		url: false,
		count_url: false,
		title: false,
		mode: 'insert',
		layout: 'vertical', //vertical|horizontal|none
		action: 'tweet',		//tweet|follow
		lang: 'en',					//en|de|ja|fr|es
		hideafterlike:false,
		googleanalytics:false,							//true|false
		googleanalytics_obj: 'pageTracker',	//pageTracker|_gaq
		ontweet: function(){return true;},
		onretweet: function(){return true;},
		onfollow: function(){return true;}
	}  

	var options =  $.extend(defaults, options);  
	var script_loaded = false;
  return this.each(function() {
  var o = options;  
  var obj = $(this);
  if(!o.url) var dynUrl = document.location;
  else var dynUrl = o.url;
  if(!o.title)var dynTitle = document.title;
  else var dynTitle = o.title;
	
	if(!o.count_url)o.count_url=dynUrl;
	
	if(!script_loaded){
		var e = document.createElement('script'); e.type="text/javascript"; e.async = true; 
		e.src = 'http://platform.twitter.com/widgets.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(e);
		
		$(e).load(function() {
			function clickEvent(intent_event) {
			  if (intent_event) {
					var label = intent_event.region;
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			  };      
			}       
			function tweetIntent(intent_event) {
			  if (intent_event) {
					var label = intent_event.data.tweet_id;
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			 		o.ontweet.call(intent_event);
			  	if(o.hideafterlike)$(obj).hide();
			  };      
			}       
			function favIntent(intent_event) {
				tweetIntent(intent_event);
			}       
			function retweetIntent(intent_event) {
			  if (intent_event) {
					var label = intent_event.data.source_tweet_id;
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			 		o.onretweet.call(intent_event);
			  	if(o.hideafterlike)$(obj).hide();
			  };      
			}       
			function followIntent(intent_event) {
			  if (intent_event) {
					var label = intent_event.data.user_id + " (" + intent_event.data.screen_name + ")";
				  if(o.googleanalytics){
						if(o.googleanalytics_obj!='_gaq'){
							_gaq.push(['_trackEvent', 'twitter_web_intents', intent_event.type, label]);
						} else {
							pageTracker._trackEvent('twitter_web_intents', intent_event.type, label);
						}
					}
			 		o.onfollow.call(intent_event);
			  	if(o.hideafterlike)$(obj).hide();
			  };      
			}       
			twttr.events.bind('click',    clickEvent);
			twttr.events.bind('tweet',    tweetIntent);
			twttr.events.bind('retweet',  retweetIntent);
			twttr.events.bind('favorite', favIntent);
			twttr.events.bind('follow',   followIntent);
			script_loaded = true;
		});
	}

	
	  if(o.action=='tweet'){
	  	var via = '';
	  	var related = '';
	  	if(o.user!=false){
	  		via = 'data-via="'+o.user+'" ';
	  		if(o.user_description!=false){
	  			related = 'data-related="'+o.user+':'+o.user_description+'" ';
	  		}
	  	}
	  	var counturl = '';
	  	if(o.count_url!=dynUrl)counturl = 'data-counturl="'+o.count_url+'" ';
	  	var thtml = '<div><a href="http://twitter.com/share" class="twitter-share-button" data-url="'+dynUrl+'" '+counturl+''+via+'data-text="'+dynTitle+'" data-lang="'+o.lang+'" '+related+'data-count="'+o.layout+'">Tweet</a></div>';
	  } else {
	  	var thtml = '<div><a href="http://twitter.com/'+o.user+'" class="twitter-follow-button">Follow</a></div>';
	  }
	  if(o.mode=='append')$(obj).append(thtml);
	  else $(obj).html(thtml);

  });  
}  
})(jQuery);






