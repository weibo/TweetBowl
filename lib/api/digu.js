(function($){
	
	$.digu = {
		base_url : "http://api.minicloud.com.cn/",
		username : "waltz_h",
		password : "welcome8298"
	}
	
	$.digu.urls = {
		search         : $.digu.base_url + "search_statuses",
		help_test      : $.digu.base_url + "help/test",
			
		trends         : $.digu.base_url + "trends",
		trends_current : $.digu.base_url + "trends/current",
		trends_daily   : $.digu.base_url + "trends/daily",
		trends_weekly  : $.digu.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.digu.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.digu.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.digu.base_url + "statuses/user_timeline",
		statuses_mentions         : $.digu.base_url + "statuses/mentions",
		statuses_show             : $.digu.base_url + "statuses/show",
		statuses_update           : $.digu.base_url + "statuses/update",
		statuses_destroy          : $.digu.base_url + "statuses/destroy",
		statuses_friends          : $.digu.base_url + "statuses/friends",
		statuses_followers        : $.digu.base_url + "statuses/followers",
			
		users_show : $.digu.base_url + "users/show",
			
		direct_messages      : $.digu.base_url + "direct_messages",
		direct_messages_sent : $.digu.base_url + "direct_messages/sent",
		direct_messages_new  : $.digu.base_url + "direct_messages/new",
		direct_messages      : $.digu.base_url + "direct_messages/destroy",
			
		friendship_create    : $.digu.base_url + "friendships/create",
		friendship_destroy   : $.digu.base_url + "friendships/destroy",
		friendship_exists    : $.digu.base_url + "friendships/exists",
			
		friends_ids          : $.digu.base_url + "friends/ids",
		followers_ids        : $.digu.base_url + "followers/ids",
			
		account_verify_credentials               : $.digu.base_url + "account/verify",
		account_rate_limit_status                : $.digu.base_url + "account/rate_limit_status",
		account_end_session                      : $.digu.base_url + "account/end_session",
		account_update_delivery_device           : $.digu.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.digu.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.digu.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.digu.base_url + "account/",
		account_update_profile                   : $.digu.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.digu.base_url + "favorites",
		favorites_create       : $.digu.base_url + "favorites/create/",
		favorites_destroy      : $.digu.base_url + "favorites/destroy",
			 
		notifications_follow   : $.digu.base_url + "notifications/follow",
		notifications_leave    : $.digu.base_url + "notifications/leave",
			
		blocks_create          : $.digu.base_url + "blocks/create",
		blocks_destroy         : $.digu.base_url + "blocks/destroy",
		blocks_exists          : $.digu.base_url + "blocks/exists",
		blocks_blocking        : $.digu.base_url + "blocks/blocking",
		blocks_ids             : $.digu.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.digu.base_url + "saved_searches",
		saved_searches_show    : $.digu.base_url + "saved_searches/show",
		saved_searches_create  : $.digu.base_url + "saved_searches/create",
		saved_searches_destroy : $.digu.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.digu.base_url + "oauth/request_token",
		oauth_authorize        : $.digu.base_url + "oauth/authorize",
		oauth_authenticate     : $.digu.base_url + "oauth/authenticate",
		oauth_access_token     : $.digu.base_url + "oauth/access_token"			
	};
	
	$.digu.search = function(params, successCallback){
		
		//var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
				
		Ext.Ajax.request({
			url: $.digu.urls.search + ".json?" + Ext.urlEncode(params),
			success: successCallback,
			failure: $.digu.failure
		});
	};
	
	$.digu.update = function(params, successCallback) {
		
		params = $.extend({
			source:'测试API',
			content: params.status
		},params||{});
		
		var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
		
		Ext.Ajax.request({
			url: $.digu.urls.statuses_update + '.json',
			success: successCallback,
			failure: $.digu.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.digu.verify = function(digu, successCallback) {		
		var authz = $.base64.encode(digu.username + ':' + digu.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.digu.urls.account_verify_credentials + '.json',
			   success: successCallback,
			   failure: $.digu.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	},
	
	$.digu.failure = function(response,options) {
		air.trace(response.responseText);
		air.trace(options);
	};

})(jQuery);