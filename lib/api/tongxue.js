(function($){
	
	$.tongxue = {
		base_url : "http://api.tongxue.com/",
		username : "helio",
		password : "welcome8298"
	}
	
	$.tongxue.urls = {
		search         : $.tongxue.base_url + "search/public_timeline",
		help_test      : $.tongxue.base_url + "help/test",
			
		trends         : $.tongxue.base_url + "trends",
		trends_current : $.tongxue.base_url + "trends/current",
		trends_daily   : $.tongxue.base_url + "trends/daily",
		trends_weekly  : $.tongxue.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.tongxue.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.tongxue.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.tongxue.base_url + "statuses/user_timeline",
		statuses_mentions         : $.tongxue.base_url + "statuses/mentions",
		statuses_show             : $.tongxue.base_url + "statuses/show",
		statuses_update           : $.tongxue.base_url + "statuses/update",
		statuses_destroy          : $.tongxue.base_url + "statuses/destroy",
		statuses_friends          : $.tongxue.base_url + "statuses/friends",
		statuses_followers        : $.tongxue.base_url + "statuses/followers",
			
		users_show : $.tongxue.base_url + "users/show",
			
		direct_messages      : $.tongxue.base_url + "direct_messages",
		direct_messages_sent : $.tongxue.base_url + "direct_messages/sent",
		direct_messages_new  : $.tongxue.base_url + "direct_messages/new",
		direct_messages      : $.tongxue.base_url + "direct_messages/destroy",
			
		friendship_create    : $.tongxue.base_url + "friendships/create",
		friendship_destroy   : $.tongxue.base_url + "friendships/destroy",
		friendship_exists    : $.tongxue.base_url + "friendships/exists",
			
		friends_ids          : $.tongxue.base_url + "friends/ids",
		followers_ids        : $.tongxue.base_url + "followers/ids",
			
		account_verify_credentials               : $.tongxue.base_url + "account/verify",
		account_rate_limit_status                : $.tongxue.base_url + "account/rate_limit_status",
		account_end_session                      : $.tongxue.base_url + "account/end_session",
		account_update_delivery_device           : $.tongxue.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.tongxue.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.tongxue.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.tongxue.base_url + "account/",
		account_update_profile                   : $.tongxue.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.tongxue.base_url + "favorites",
		favorites_create       : $.tongxue.base_url + "favorites/create/",
		favorites_destroy      : $.tongxue.base_url + "favorites/destroy",
			 
		notifications_follow   : $.tongxue.base_url + "notifications/follow",
		notifications_leave    : $.tongxue.base_url + "notifications/leave",
			
		blocks_create          : $.tongxue.base_url + "blocks/create",
		blocks_destroy         : $.tongxue.base_url + "blocks/destroy",
		blocks_exists          : $.tongxue.base_url + "blocks/exists",
		blocks_blocking        : $.tongxue.base_url + "blocks/blocking",
		blocks_ids             : $.tongxue.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.tongxue.base_url + "saved_searches",
		saved_searches_show    : $.tongxue.base_url + "saved_searches/show",
		saved_searches_create  : $.tongxue.base_url + "saved_searches/create",
		saved_searches_destroy : $.tongxue.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.tongxue.base_url + "oauth/request_token",
		oauth_authorize        : $.tongxue.base_url + "oauth/authorize",
		oauth_authenticate     : $.tongxue.base_url + "oauth/authenticate",
		oauth_access_token     : $.tongxue.base_url + "oauth/access_token"			
	};
	
	$.tongxue.search = function(params, successCallback){
		
		//var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
				
		Ext.Ajax.request({
			url: $.tongxue.urls.search + ".json?" + Ext.urlEncode(params),
			success: successCallback,
			failure: $.tongxue.failure
		});
	};
	
	$.tongxue.update = function(params, successCallback) {
		
		params = $.extend({
			source:'测试API',
		},params||{});
		
		var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
		
		Ext.Ajax.request({
			url: $.tongxue.urls.statuses_update + '.json',
			success: successCallback,
			failure: $.tongxue.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.tongxue.verify = function(tongxue, successCallback) {		
		var authz = $.base64.encode(tongxue.username + ':' + tongxue.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.tongxue.urls.account_verify_credentials + '.json',
			   success: successCallback,
			   failure: $.tongxue.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	},
	
	$.tongxue.failure = function(response,options) {
		air.trace(response.responseText);
		air.trace(options);
	};

})(jQuery);