(function($){
	
	$.sohu = {
		base_url	: "http://api.t.sohu.com/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
	}
	
	$.sohu.urls = {
		search         : $.sohu.base_url + "search",
		help_test      : $.sohu.base_url + "help/test",
			
		trends         : $.sohu.base_url + "trends",
		trends_current : $.sohu.base_url + "trends/current",
		trends_daily   : $.sohu.base_url + "trends/daily",
		trends_weekly  : $.sohu.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.sohu.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.sohu.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.sohu.base_url + "statuses/user_timeline",
		statuses_mentions         : $.sohu.base_url + "statuses/mentions",
		statuses_show             : $.sohu.base_url + "statuses/show",
		statuses_update           : $.sohu.base_url + "statuses/update",
		statuses_retweet          : $.sohu.base_url + "statuses/retweet",
		statuses_destroy          : $.sohu.base_url + "statuses/destroy",
		statuses_friends          : $.sohu.base_url + "statuses/friends",
		statuses_followers        : $.sohu.base_url + "statuses/followers",
			
		users_show : $.sohu.base_url + "users/show",
			
		direct_messages      : $.sohu.base_url + "direct_messages",
		direct_messages_sent : $.sohu.base_url + "direct_messages/sent",
		direct_messages_new  : $.sohu.base_url + "direct_messages/new",
		direct_messages      : $.sohu.base_url + "direct_messages/destroy",
			
		friendship_create    : $.sohu.base_url + "friendships/create",
		friendship_destroy   : $.sohu.base_url + "friendships/destroy",
		friendship_exists    : $.sohu.base_url + "friendships/exists",
			
		friends_ids          : $.sohu.base_url + "friends/ids",
		followers_ids        : $.sohu.base_url + "followers/ids",
			
		account_verify_credentials               : $.sohu.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.sohu.base_url + "account/rate_limit_status",
		account_end_session                      : $.sohu.base_url + "account/end_session",
		account_update_delivery_device           : $.sohu.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.sohu.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.sohu.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.sohu.base_url + "account/",
		account_update_profile                   : $.sohu.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.sohu.base_url + "favorites",
		favorites_create       : $.sohu.base_url + "favorites/create/",
		favorites_destroy      : $.sohu.base_url + "favorites/destroy",
			 
		notifications_follow   : $.sohu.base_url + "notifications/follow",
		notifications_leave    : $.sohu.base_url + "notifications/leave",
			
		blocks_create          : $.sohu.base_url + "blocks/create",
		blocks_destroy         : $.sohu.base_url + "blocks/destroy",
		blocks_exists          : $.sohu.base_url + "blocks/exists",
		blocks_blocking        : $.sohu.base_url + "blocks/blocking",
		blocks_ids             : $.sohu.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.sohu.base_url + "saved_searches",
		saved_searches_show    : $.sohu.base_url + "saved_searches/show",
		saved_searches_create  : $.sohu.base_url + "saved_searches/create",
		saved_searches_destroy : $.sohu.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.sohu.base_url + "oauth/request_token",
		oauth_authorize        : $.sohu.base_url + "oauth/authorize",
		oauth_authenticate     : $.sohu.base_url + "oauth/authenticate",
		oauth_access_token     : $.sohu.base_url + "oauth/access_token"			
	};
	/**
	 * 检索方法
	 */
	$.sohu.search = function(params, successCallback){
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
		
		params = $.extend({
			rpp:$.sohu.config.count
		},params||{});
		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		Ext.Ajax.request({
			url: $.sohu.urls.search + ".json?" + Ext.urlEncode(params),
			success: $.sohu.results.search_results,
			failure: $.sohu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	}
		});
	};
	
	$.sohu.statuses.friends_timeline = function(params, successCallback) {
		params = $.extend({
			count	: $.sohu.config.count
		},params||{});
		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
		
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_friends_timeline + '.json',
			success: $.sohu.results.friends_timeline,
			failure: $.sohu.failure,
			method: 'GET',
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.statuses.user_timeline = function(params, successCallback) {
		params = $.extend({
			count	: $.sohu.config.count
		},params||{});
		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_user_timeline + '/' + params.id + '.json',
			success: $.sohu.results.user_timeline,
			failure: $.sohu.failure,
			method: 'GET',
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.statuses.statuses_mentions = function(params, successCallback) {
		
		params = $.extend({
			count	: $.sohu.config.count
		},params||{});
		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);		
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_mentions + '.json',
			success: $.sohu.results.friends_timeline,
			failure: $.sohu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.update = function(params, successCallback) {
		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
		
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_update + '.json',
			success: $.sohu.results.update,
			failure: $.sohu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.verify = function(sohu, successCallback) {
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode(sohu.username + ':' + sohu.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.sohu.urls.account_verify_credentials + '.json',
			   success: $.sohu.results.verify,
			   failure: $.sohu.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	};
	
	$.sohu.retweet = function(params, successCallback) {		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
		
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_retweet + '/' + params.id + '.json',
			success: $.sohu.success,
			failure: $.sohu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.destroy = function(params, successCallback) {		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
		
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_destroy + '/' + params.id + '.json',
			success: $.sohu.success,
			failure: $.sohu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.friends = function(params, successCallback) {		
		$.sohu.results.callback = successCallback;
		$.message.showLoadMask();
		
		var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);		
		Ext.Ajax.request({
			url: $.sohu.urls.statuses_friends + '.json',
			success: $.sohu.results.friends,
			failure: $.sohu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sohu.success = function(response,options) {
		air.trace(response.responseText);
		
		$.message.hideLoadMask();
		$.sohu.results.callback();
	};
	
	$.sohu.failure = function(response,options) {
		air.trace(response.responseText);
		$.message.hideLoadMask();
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.sohu.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.sohu.results.update = function(response,options){
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);
		if(data.id) {
			$.sohu.results.callback();
		}
	}
	
	$.sohu.results.verify = function(response,options){
		$.message.hideLoadMask();
		
		var userInfo = $.parseJSON(response.responseText);		
		$.sohu.results.callback(userInfo);
	}
	
	$.sohu.results.search_results = function(response,options) {
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.sohu.results.tweetcache.search_results = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.search_results);
			}
		}
	};
	
	$.sohu.results.friends_timeline = function(response,options) {
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);		
		if(data && data.length) {			
			$.sohu.results.tweetcache.friends_timeline = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.friends_timeline);
			}
		}
	};
	
	$.sohu.results.user_timeline = function(response,options) {
		$.message.hideLoadMask();
		
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.sohu.results.tweetcache.user_timeline = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.user_timeline);
			}
		}
	};
	
	$.sohu.results.friends = function(response,options) {
		$.message.hideLoadMask();
		//alert(response.responseText);
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.sohu.results.tweetcache.friends[$.sohu.username] = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.friends[$.sohu.username]);
			}
		}
	};
})(jQuery);