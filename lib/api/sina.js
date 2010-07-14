(function($){
	
	$.sina = {
		base_url : "http://api.t.sina.com.cn/",
		search_base_url : "http://api.t.sina.com.cn/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses : {},
		results  : {}
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
		statuses_retweet          : $.sina.base_url + "statuses/retweet",
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
	/**
	 * 检索方法
	 */
	$.sina.search = function(params, successCallback){
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
			
			params = $.extend({
				rpp:$.sina.config.count
			},params||{});
			
			$.ajax({
				url		: $.sina.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sina.results.search_results,
				error	: $.sina.failure
			});
		}
	};

	$.sina.statuses.friends_timeline = function(params, successCallback) {
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
			
			params = $.extend({
				count:$.sina.config.count
			},params||{});
			
			$.ajax({
				url		: $.sina.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sina.results.friends_timeline,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.statuses.user_timeline = function(params, successCallback) {
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
			
			params = $.extend({
				count:$.sina.config.count
			},params||{});
			
			$.ajax({
				url		: $.sina.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sina.results.user_timeline,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
			
			params = $.extend({
				count	: $.sina.config.count
			},params||{});
			
			$.ajax({
				url		: $.sina.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sina.results.friends_timeline,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.update = function(params, successCallback) {
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
		
			$.ajax({
				url		: $.sina.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.sina.results.update,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.verify = function(sina, successCallback) {
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
		
			$.ajax({
				url		: $.sina.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.sina.results.verify,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.retweet = function(params, successCallback) {		
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
		
			$.ajax({
				url		: $.sina.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.sina.success,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.destroy = function(params, successCallback) {		
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
		
			$.ajax({
				url		: $.sina.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.sina.success,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.friends = function(params, successCallback) {		
		if(!$.sina.statuses.busy) {
			$.sina.statuses.busy = true;
			$.sina.results.callback = successCallback;
			$.sina.showLoadMask();
		
			$.ajax({
				url		: $.sina.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sina.results.friends,
				error	: $.sina.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sina.username + ':' + $.sina.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sina.success = function(data,options) {
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
		$.sina.results.callback();
	};
	
	$.sina.failure = function(xhr, textStatus, errorThrown) {
		air.trace(textStatus);		
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.sina.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.sina.results.update = function(data,options){
		
		if(data && data.update) {
			$.sina.results.callback();
		}
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.sina.results.verify = function(userInfo,options){
		
		$.sina.results.callback(userInfo);
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.sina.results.search_results = function(data,options) {
		
		if(data && data.length) {
			$.sina.results.tweetcache.search_results = data;
			if($.sina.results.callback) {
				$.sina.results.callback($.sina.results.tweetcache.search_results);
			}
		}
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.sina.results.friends_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.sina.results.tweetcache.friends_timeline = data;
			if($.sina.results.callback) {
				$.sina.results.callback($.sina.results.tweetcache.friends_timeline);
			}
		}
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.sina.results.user_timeline = function(data,options) {
		
		if(data && data.length) {
			$.sina.results.tweetcache.user_timeline = data;
			if($.sina.results.callback) {
				$.sina.results.callback($.sina.results.tweetcache.user_timeline);
			}
		}
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.sina.results.friends = function(data,options) {
		
		if(data && data.length) {
			$.sina.results.tweetcache.friends[$.sina.username] = data;
			if($.sina.results.callback) {
				$.sina.results.callback($.sina.results.tweetcache.friends[$.sina.username]);
			}
		}
		
		$.sina.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);