(function($){
	
	$.twitter = {
		base_url : "http://twitter.com/",
		search_base_url : "http://search.twitter.com/",
		username : "hlwaltz",
		password : "welcome8298"
	}
	
	$.twitter.urls = {
		search         : $.twitter.search_base_url + "search",
		help_test      : $.twitter.base_url + "help/test",
			
		trends         : $.twitter.search_base_url + "trends",
		trends_current : $.twitter.search_base_url + "trends/current",
		trends_daily   : $.twitter.search_base_url + "trends/daily",
		trends_weekly  : $.twitter.search_base_url + "trends/weekly",
			
		statuses_public_timeline  : $.twitter.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.twitter.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.twitter.base_url + "statuses/user_timeline",
		statuses_mentions         : $.twitter.base_url + "statuses/mentions",
		statuses_show             : $.twitter.base_url + "statuses/show",
		statuses_update           : $.twitter.base_url + "statuses/update",
		statuses_destroy          : $.twitter.base_url + "statuses/destroy",
		statuses_friends          : $.twitter.base_url + "statuses/friends",
		statuses_followers        : $.twitter.base_url + "statuses/followers",
			
		users_show : $.twitter.base_url + "users/show",
			
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
		
		Ext.Ajax.request({
			url: $.twitter.urls.search + ".json?" + Ext.urlEncode(params),
			success: successCallback,
			failure: $.twitter.failure
		});
	};
	
	$.twitter.update = function(params, successCallback) {
				
		var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
		
		Ext.Ajax.request({
			url: $.twitter.urls.statuses_update + '.json',
			success: successCallback,
			failure: $.twitter.failure,
			headers: {
		       	'Content-Type': 'application/x-www-form-urlencoded',
		       	'Authorization': 'Basic ' + authz
		   	},
		   	params: params
		});
	};
	
	$.twitter.verify = function(twitter, successCallback) {		
		var authz = $.base64.encode(twitter.username + ':' + twitter.password);
		if(authz) {
			Ext.Ajax.request({
			   url: $.twitter.urls.account_verify_credentials + '.json',
			   success: successCallback,
			   failure: $.twitter.failure,
			   headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
				   'Authorization': 'Basic ' + authz
			   }
			});
		}
	},
	
	$.twitter.failure = function(response,options) {
		air.trace(response.responseText);
		air.trace(options);
	};

})(jQuery);