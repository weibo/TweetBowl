(function($){
	
	$.twitter = {
		base_url : "http://twitter.com/",
		search_base_url : "http://twitter.com/",
		statuses : {},
		results  : {}
	}
	
	$.twitter.urls = {
		search         : $.twitter.search_base_url + "search",
		help_test      : $.twitter.base_url + "help/test",
			
		trends         : $.twitter.search_base_url + "trends",
		trends_current : $.twitter.search_base_url + "trends/current",
		trends_daily   : $.twitter.search_base_url + "trends/daily",
		trends_weekly  : $.twitter.search_base_url + "trends/weekly",
			
		statuses_public_timeline  : $.twitter.base_url + "statuses/public_timeline",
		statuses_home_timeline    : $.twitter.base_url + "statuses/home_timeline",
		statuses_friends_timeline : $.twitter.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.twitter.base_url + "statuses/user_timeline",
		statuses_mentions         : $.twitter.base_url + "statuses/mentions",
		statuses_show             : $.twitter.base_url + "statuses/show",
		statuses_update           : $.twitter.base_url + "statuses/update",
		statuses_retweet          : $.twitter.base_url + "statuses/retweet",
		statuses_destroy          : $.twitter.base_url + "statuses/destroy",
		statuses_friends          : $.twitter.base_url + "statuses/friends",
		statuses_followers        : $.twitter.base_url + "statuses/followers",
		
		users_show		: $.twitter.base_url + "users/show",
			
		direct_messages      : $.twitter.base_url + "direct_messages",
		direct_messages_sent : $.twitter.base_url + "direct_messages/sent",
		direct_messages_new  : $.twitter.base_url + "direct_messages/new",
		direct_messages      : $.twitter.base_url + "direct_messages/destroy",
			
		friendship_create    : $.twitter.base_url + "friendships/create",
		friendship_destroy   : $.twitter.base_url + "friendships/destroy",
		friendship_exists    : $.twitter.base_url + "friendships/exists",
			
		friends_ids          : $.twitter.base_url + "friends/ids",
		followers_ids        : $.twitter.base_url + "followers/ids",
			
		account_verify_credentials               : $.twitter.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.twitter.base_url + "account/rate_limit_status",
		account_end_session                      : $.twitter.base_url + "account/end_session",
		account_update_delivery_device           : $.twitter.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.twitter.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.twitter.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.twitter.base_url + "account/",
		account_update_profile                   : $.twitter.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.twitter.base_url + "favorites",
		favorites_create       : $.twitter.base_url + "favorites/create/",
		favorites_destroy      : $.twitter.base_url + "favorites/destroy",
			 
		notifications_follow   : $.twitter.base_url + "notifications/follow",
		notifications_leave    : $.twitter.base_url + "notifications/leave",
			
		blocks_create          : $.twitter.base_url + "blocks/create",
		blocks_destroy         : $.twitter.base_url + "blocks/destroy",
		blocks_exists          : $.twitter.base_url + "blocks/exists",
		blocks_blocking        : $.twitter.base_url + "blocks/blocking",
		blocks_ids             : $.twitter.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.twitter.base_url + "saved_searches",
		saved_searches_show    : $.twitter.base_url + "saved_searches/show",
		saved_searches_create  : $.twitter.base_url + "saved_searches/create",
		saved_searches_destroy : $.twitter.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.twitter.base_url + "oauth/request_token",
		oauth_authorize        : $.twitter.base_url + "oauth/authorize",
		oauth_authenticate     : $.twitter.base_url + "oauth/authenticate",
		oauth_access_token     : $.twitter.base_url + "oauth/access_token"			
	};
	
	$.twitter.search = function(params, successCallback){
		
		params = $.extend({
			rpp:20
		},params||{});
		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		Ext.Ajax.request({
			url: $.twitter.urls.search + ".json?" + Ext.urlEncode(params),
			success: $.twitter.results.search_results,
			failure: $.twitter.failure
		});
	};
	
	$.twitter.statuses.friends_timeline = function(params, successCallback) {
		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_friends_timeline + '.json',
			success: $.twitter.results.friends_timeline,
			failure: $.twitter.failure,
			method: 'GET',
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.statuses.home_timeline = function(params, successCallback) {
		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_home_timeline + '.json',
			success: $.twitter.results.home_timeline,
			failure: $.twitter.failure,
			method: 'GET',
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.statuses.user_timeline = function(params, successCallback) {
		
		params = $.extend({
			rpp:20
		},params||{});
		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_user_timeline + '.json',
			success: $.twitter.results.user_timeline,
			failure: $.twitter.failure,
			method: 'GET',
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.update = function(params, successCallback) {
		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_update + '.json',
			success: $.twitter.results.update,
			failure: $.twitter.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.verify = function(twitter, successCallback) {
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode(twitter.username + ':' + twitter.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.twitter.urls.account_verify_credentials + '.json',
			   success: $.twitter.results.verify,
			   failure: $.twitter.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	};
	
	$.twitter.retweet = function(params, successCallback) {		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_retweet + '/' + params.id + '.json',
			success: $.twitter.success,
			failure: $.twitter.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.destroy = function(params, successCallback) {		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_destroy + '/' + params.id + '.json',
			success: $.twitter.success,
			failure: $.twitter.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.friends = function(params, successCallback) {		
		$.twitter.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_friends + '.json',
			success: $.twitter.results.friends,
			failure: $.twitter.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.success = function(response,options) {
		$.message.hideLoadMask();
		$.twitter.results.callback();
	};
	
	$.twitter.failure = function(response,options) {
		air.trace(response.responseText);
		$.message.hideLoadMask();
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.twitter.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.twitter.results.update = function(response,options){
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);
		if(data.id) {
			$.twitter.results.callback();
		}
	}
	
	$.twitter.results.verify = function(response,options){
		$.message.hideLoadMask();
		
		var userInfo = $.parseJSON(response.responseText);		
		$.twitter.results.callback(userInfo);
	}
	
	$.twitter.results.search_results = function(response,options) {
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);		
		if(data.results && data.results.length) {
			
			$.each(data.results,function(index,value){
				if(!value.user) {
					value.user = {
						profile_image_url : value.profile_image_url,
						screen_name : value.from_user
					};
				}				
			});
						
			$.twitter.results.tweetcache.search_results = data.results;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.search_results);
			}
		}
	};
	
	$.twitter.results.home_timeline = function(response,options) {
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);		
		if(data && data.length) {			
			$.twitter.results.tweetcache.home_timeline = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.home_timeline);
			}
		}
	};
	
	$.twitter.results.friends_timeline = function(response,options) {
		$.message.hideLoadMask();
		
		//air.trace(response.responseText);
		var data = $.parseJSON(response.responseText);		
		if(data && data.length) {			
			$.twitter.results.tweetcache.friends_timeline = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.friends_timeline);
			}
		}
	};
	
	$.twitter.results.user_timeline = function(response,options) {
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);		
		if(data && data.length) {			
			$.twitter.results.tweetcache.user_timeline = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.user_timeline);
			}
		}
	};
	
	$.twitter.results.friends = function(response,options) {
		$.message.hideLoadMask();
		//alert(response.responseText);
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.twitter.results.tweetcache.friends[$.twitter.username] = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.friends[$.twitter.username]);
			}
		}
	};

})(jQuery);