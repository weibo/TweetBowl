(function($){
	
	$.zuosa = {
		base_url : "http://api.zuosa.com/",
		username : "waltz_h@163.com",
		password : "welcome8298"
	}
	
	$.zuosa.urls = {
		search         : $.zuosa.base_url + "search",
		help_test      : $.zuosa.base_url + "help/test",
			
		trends         : $.zuosa.base_url + "trends",
		trends_current : $.zuosa.base_url + "trends/current",
		trends_daily   : $.zuosa.base_url + "trends/daily",
		trends_weekly  : $.zuosa.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.zuosa.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.zuosa.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.zuosa.base_url + "statuses/user_timeline",
		statuses_mentions         : $.zuosa.base_url + "statuses/mentions",
		statuses_show             : $.zuosa.base_url + "statuses/show",
		statuses_update           : $.zuosa.base_url + "statuses/update",
		statuses_destroy          : $.zuosa.base_url + "statuses/destroy",
		statuses_friends          : $.zuosa.base_url + "statuses/friends",
		statuses_followers        : $.zuosa.base_url + "statuses/followers",
			
		users_show : $.zuosa.base_url + "users/show",
			
		direct_messages      : $.zuosa.base_url + "direct_messages",
		direct_messages_sent : $.zuosa.base_url + "direct_messages/sent",
		direct_messages_new  : $.zuosa.base_url + "direct_messages/new",
		direct_messages      : $.zuosa.base_url + "direct_messages/destroy",
			
		friendship_create    : $.zuosa.base_url + "friendships/create",
		friendship_destroy   : $.zuosa.base_url + "friendships/destroy",
		friendship_exists    : $.zuosa.base_url + "friendships/exists",
			
		friends_ids          : $.zuosa.base_url + "friends/ids",
		followers_ids        : $.zuosa.base_url + "followers/ids",
			
		account_verify_credentials               : $.zuosa.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.zuosa.base_url + "account/rate_limit_status",
		account_end_session                      : $.zuosa.base_url + "account/end_session",
		account_update_delivery_device           : $.zuosa.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.zuosa.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.zuosa.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.zuosa.base_url + "account/",
		account_update_profile                   : $.zuosa.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.zuosa.base_url + "favorites",
		favorites_create       : $.zuosa.base_url + "favorites/create/",
		favorites_destroy      : $.zuosa.base_url + "favorites/destroy",
			 
		notifications_follow   : $.zuosa.base_url + "notifications/follow",
		notifications_leave    : $.zuosa.base_url + "notifications/leave",
			
		blocks_create          : $.zuosa.base_url + "blocks/create",
		blocks_destroy         : $.zuosa.base_url + "blocks/destroy",
		blocks_exists          : $.zuosa.base_url + "blocks/exists",
		blocks_blocking        : $.zuosa.base_url + "blocks/blocking",
		blocks_ids             : $.zuosa.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.zuosa.base_url + "saved_searches",
		saved_searches_show    : $.zuosa.base_url + "saved_searches/show",
		saved_searches_create  : $.zuosa.base_url + "saved_searches/create",
		saved_searches_destroy : $.zuosa.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.zuosa.base_url + "oauth/request_token",
		oauth_authorize        : $.zuosa.base_url + "oauth/authorize",
		oauth_authenticate     : $.zuosa.base_url + "oauth/authenticate",
		oauth_access_token     : $.zuosa.base_url + "oauth/access_token"			
	};
	
	$.zuosa.search = function(params, successCallback){
		
		//var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
				
		Ext.Ajax.request({
			url: $.zuosa.urls.search + ".json?" + Ext.urlEncode(params),
			success: successCallback,
			failure: $.zuosa.failure
		});
	};
	
	$.zuosa.update = function(params, successCallback) {
		
		params = $.extend({
			source:'测试API'
		},params||{});
		
		var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
		
		Ext.Ajax.request({
			url: $.zuosa.urls.statuses_update + '.json',
			success: successCallback,
			failure: $.zuosa.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.zuosa.verify = function(zuosa, successCallback) {		
		var authz = $.base64.encode(zuosa.username + ':' + zuosa.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.zuosa.urls.account_verify_credentials + '.json',
			   success: successCallback,
			   failure: $.zuosa.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	},
	
	$.zuosa.failure = function(response,options) {
		air.trace(response.responseText);
		air.trace(options);
	};

})(jQuery);