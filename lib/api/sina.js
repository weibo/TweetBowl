(function($){
	
	$.sina = {
		base_url : "http://api.t.sina.com.cn/",
		search_base_url : "http://api.t.sina.com.cn/",
		username : "scorpio_xinxin@sina.com",
		password : "welcome8298"
	}
	
	$.sina.urls = {
		search         : $.sina.search_base_url + "search",
		help_test      : $.sina.base_url + "help/test",
			
		trends         : $.sina.search_base_url + "trends",
		trends_current : $.sina.search_base_url + "trends/current",
		trends_daily   : $.sina.search_base_url + "trends/daily",
		trends_weekly  : $.sina.search_base_url + "trends/weekly",
			
		statuses_public_timeline  : $.sina.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.sina.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.sina.base_url + "statuses/user_timeline",
		statuses_mentions         : $.sina.base_url + "statuses/mentions",
		statuses_show             : $.sina.base_url + "statuses/show",
		statuses_update           : $.sina.base_url + "statuses/update",
		statuses_destroy          : $.sina.base_url + "statuses/destroy",
		statuses_friends          : $.sina.base_url + "statuses/friends",
		statuses_followers        : $.sina.base_url + "statuses/followers",
			
		users_show : $.sina.base_url + "users/show",
			
		direct_messages      : $.sina.base_url + "direct_messages",
		direct_messages_sent : $.sina.base_url + "direct_messages/sent",
		direct_messages_new  : $.sina.base_url + "direct_messages/new",
		direct_messages      : $.sina.base_url + "direct_messages/destroy",
			
		friendship_create    : $.sina.base_url + "friendships/create",
		friendship_destroy   : $.sina.base_url + "friendships/destroy",
		friendship_exists    : $.sina.base_url + "friendships/exists",
			
		friends_ids          : $.sina.base_url + "friends/ids",
		followers_ids        : $.sina.base_url + "followers/ids",
			
		account_verify_credentials               : $.sina.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.sina.base_url + "account/rate_limit_status",
		account_end_session                      : $.sina.base_url + "account/end_session",
		account_update_delivery_device           : $.sina.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.sina.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.sina.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.sina.base_url + "account/",
		account_update_profile                   : $.sina.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.sina.base_url + "favorites",
		favorites_create       : $.sina.base_url + "favorites/create/",
		favorites_destroy      : $.sina.base_url + "favorites/destroy",
			 
		notifications_follow   : $.sina.base_url + "notifications/follow",
		notifications_leave    : $.sina.base_url + "notifications/leave",
			
		blocks_create          : $.sina.base_url + "blocks/create",
		blocks_destroy         : $.sina.base_url + "blocks/destroy",
		blocks_exists          : $.sina.base_url + "blocks/exists",
		blocks_blocking        : $.sina.base_url + "blocks/blocking",
		blocks_ids             : $.sina.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.sina.base_url + "saved_searches",
		saved_searches_show    : $.sina.base_url + "saved_searches/show",
		saved_searches_create  : $.sina.base_url + "saved_searches/create",
		saved_searches_destroy : $.sina.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.sina.base_url + "oauth/request_token",
		oauth_authorize        : $.sina.base_url + "oauth/authorize",
		oauth_authenticate     : $.sina.base_url + "oauth/authenticate",
		oauth_access_token     : $.sina.base_url + "oauth/access_token"			
	};
	
	$.sina.search = function(params, successCallback){
		
		params = $.extend({
			rpp:20
		},params||{});
		
		Ext.Ajax.request({
			url: $.sina.urls.search + ".json?" + Ext.urlEncode(params),
			success: successCallback,
			failure: $.sina.failure
		});
	};
	
	$.sina.update = function(params, successCallback) {
				
		var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
		
		Ext.Ajax.request({
			url: $.sina.urls.statuses_update + '.json',
			success: successCallback,
			failure: $.sina.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.sina.verify = function(sina, successCallback) {
		params = {
			source:'123'
		};
		
		var authz = $.base64.encode(sina.username + ':' + sina.password);
		if(authz) {
			Ext.Ajax.request({
				url: $.sina.urls.account_verify_credentials + '.json',
				success: successCallback,
				failure: $.sina.failure,
				headers: {
			       	'Content-Type': 'application/x-www-form-urlencoded',
			       	'Authorization': 'Basic ' + authz
			   	},
			   	params: params
			});
		}
	},
	
	$.sina.failure = function(response,options) {
		air.trace(response.responseText);
		air.trace(options);
	};

})(jQuery);