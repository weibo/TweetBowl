/**
 * API of cnfol.
 * 
 * @author helio
 */
(function($){
	
	$.cnfol = {
		base_url : "http://api.t.cnfol.com/",
		statuses : {},
		results  : {},
		username : "helio",
		password : "welcome8298"
	}
	
	/**
	 * 定义API接口
	 */
	$.cnfol.urls = {
		search         : $.cnfol.base_url + "search",
		help_test      : $.cnfol.base_url + "help/test",
			
		trends         : $.cnfol.base_url + "trends",
		trends_current : $.cnfol.base_url + "trends/current",
		trends_daily   : $.cnfol.base_url + "trends/daily",
		trends_weekly  : $.cnfol.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.cnfol.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.cnfol.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.cnfol.base_url + "statuses/user_timeline",
		statuses_mentions         : $.cnfol.base_url + "statuses/mentions",
		statuses_show             : $.cnfol.base_url + "statuses/show",
		statuses_update           : $.cnfol.base_url + "statuses/update",
		statuses_destroy          : $.cnfol.base_url + "statuses/destroy",
		statuses_friends          : $.cnfol.base_url + "statuses/friends",
		statuses_followers        : $.cnfol.base_url + "statuses/followers",
			
		users_show : $.cnfol.base_url + "users/show",
			
		direct_messages      : $.cnfol.base_url + "direct_messages",
		direct_messages_sent : $.cnfol.base_url + "direct_messages/sent",
		direct_messages_new  : $.cnfol.base_url + "direct_messages/new",
		direct_messages      : $.cnfol.base_url + "direct_messages/destroy",
			
		friendship_create    : $.cnfol.base_url + "friendships/create",
		friendship_destroy   : $.cnfol.base_url + "friendships/destroy",
		friendship_exists    : $.cnfol.base_url + "friendships/exists",
			
		friends_ids          : $.cnfol.base_url + "friends/ids",
		followers_ids        : $.cnfol.base_url + "followers/ids",
			
		account_verify_credentials               : $.cnfol.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.cnfol.base_url + "account/rate_limit_status",
		account_end_session                      : $.cnfol.base_url + "account/end_session",
		account_update_delivery_device           : $.cnfol.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.cnfol.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.cnfol.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.cnfol.base_url + "account/",
		account_update_profile                   : $.cnfol.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.cnfol.base_url + "favorites",
		favorites_create       : $.cnfol.base_url + "favorites/create/",
		favorites_destroy      : $.cnfol.base_url + "favorites/destroy",
			 
		notifications_follow   : $.cnfol.base_url + "notifications/follow",
		notifications_leave    : $.cnfol.base_url + "notifications/leave",
			
		blocks_create          : $.cnfol.base_url + "blocks/create",
		blocks_destroy         : $.cnfol.base_url + "blocks/destroy",
		blocks_exists          : $.cnfol.base_url + "blocks/exists",
		blocks_blocking        : $.cnfol.base_url + "blocks/blocking",
		blocks_ids             : $.cnfol.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.cnfol.base_url + "saved_searches",
		saved_searches_show    : $.cnfol.base_url + "saved_searches/show",
		saved_searches_create  : $.cnfol.base_url + "saved_searches/create",
		saved_searches_destroy : $.cnfol.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.cnfol.base_url + "oauth/request_token",
		oauth_authorize        : $.cnfol.base_url + "oauth/authorize",
		oauth_authenticate     : $.cnfol.base_url + "oauth/authenticate",
		oauth_access_token     : $.cnfol.base_url + "oauth/access_token"			
	};
	
	/**
	 * 检索方法
	 */
	$.cnfol.search = function(params, successCallback){
		
		params = $.extend({
			rpp:20
		},params||{});
		
		$.cnfol.results.callback = successCallback;
		
		Ext.Ajax.request({
			url: $.cnfol.urls.search + ".json?" + Ext.urlEncode(params),
			success: $.cnfol.results.search_results,
			failure: $.cnfol.failure
		});
	};
	
	$.cnfol.statuses.friends_timeline = function(params, successCallback) {
		
		$.cnfol.results.callback = successCallback;
		
		var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
		
		Ext.Ajax.request({
			url: $.cnfol.urls.statuses_friends_timeline + '.json',
			success: $.cnfol.results.friends_timeline,
			failure: $.cnfol.failure,
			method: 'GET',
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.cnfol.statuses.user_timeline = function(params, successCallback) {
		
		params = $.extend({
			count:15
		},params||{});
		
		$.cnfol.results.callback = successCallback;
		
		var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
		
		Ext.Ajax.request({
			url: $.cnfol.urls.statuses_user_timeline + '.json',
			success: $.cnfol.results.user_timeline,
			failure: $.cnfol.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.cnfol.update = function(params, successCallback) {
		
		params = $.extend({
			source:'微泡泡'
		},params||{});
		
		$.cnfol.results.callback = successCallback;
		
		var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
		
		Ext.Ajax.request({
			url: $.cnfol.urls.statuses_update + '.json',
			success: $.cnfol.results.update,
			failure: $.cnfol.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.cnfol.verify = function(cnfol, successCallback) {		
		var authz = $.base64.encode(cnfol.username + ':' + cnfol.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.cnfol.urls.account_verify_credentials + '.json',
			   success: successCallback,
			   failure: $.cnfol.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	};
	
	$.cnfol.failure = function(response,options) {
		air.trace(response.responseText);
		air.trace(options);
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.cnfol.results.tweetcache = {
		search_results : [],
		user_timeline  : []
	}
	
	$.cnfol.results.update = function(response,options){
		var data = Ext.decode(response.responseText);
		if(data.update) {
			$.cnfol.results.callback();
		}
	}
	
	$.cnfol.results.search_results = function(response,options) {
		var data = Ext.decode(response.responseText);
		if(data.length) {
			$.cnfol.results.tweetcache.search_results = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.search_results);
			}
		}
	};
	
	$.cnfol.results.friends_timeline = function(response,options) {
		
		var data = Ext.decode(response.responseText);
		
		if(data && data.length) {			
			$.cnfol.results.tweetcache.friends_timeline = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.friends_timeline);
			}
		}
	};
	
	$.cnfol.results.user_timeline = function(response,options) {
		var data = Ext.decode(response.responseText);
		if(data.length) {
			$.cnfol.results.tweetcache.user_timeline = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.user_timeline);
			}
		}
	};

})(jQuery);