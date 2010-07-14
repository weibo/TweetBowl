(function($){
	
	$.api9911 = {
		base_url	: "http://api.9911.com/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
	}
	
	$.api9911.urls = {
		search         : $.api9911.base_url + "search",
		help_test      : $.api9911.base_url + "help/test",
			
		trends         : $.api9911.base_url + "trends",
		trends_current : $.api9911.base_url + "trends/current",
		trends_daily   : $.api9911.base_url + "trends/daily",
		trends_weekly  : $.api9911.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.api9911.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.api9911.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.api9911.base_url + "statuses/user_timeline",
		statuses_mentions         : $.api9911.base_url + "statuses/mentions",
		statuses_show             : $.api9911.base_url + "statuses/show",
		statuses_update           : $.api9911.base_url + "statuses/update",
		statuses_retweet          : $.api9911.base_url + "statuses/retweet",
		statuses_destroy          : $.api9911.base_url + "statuses/destroy",
		statuses_friends          : $.api9911.base_url + "statuses/friends",
		statuses_followers        : $.api9911.base_url + "statuses/followers",
		
		users_show		: $.api9911.base_url + "users/show",
			
		direct_messages      : $.api9911.base_url + "direct_messages",
		direct_messages_sent : $.api9911.base_url + "direct_messages/sent",
		direct_messages_new  : $.api9911.base_url + "direct_messages/new",
		direct_messages      : $.api9911.base_url + "direct_messages/destroy",
			
		friendship_create    : $.api9911.base_url + "friendships/create",
		friendship_destroy   : $.api9911.base_url + "friendships/destroy",
		friendship_exists    : $.api9911.base_url + "friendships/exists",
			
		friends_ids          : $.api9911.base_url + "friends/ids",
		followers_ids        : $.api9911.base_url + "followers/ids",
			
		account_verify_credentials               : $.api9911.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.api9911.base_url + "account/rate_limit_status",
		account_end_session                      : $.api9911.base_url + "account/end_session",
		account_update_delivery_device           : $.api9911.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.api9911.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.api9911.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.api9911.base_url + "account/",
		account_update_profile                   : $.api9911.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.api9911.base_url + "favorites",
		favorites_create       : $.api9911.base_url + "favorites/create/",
		favorites_destroy      : $.api9911.base_url + "favorites/destroy",
			 
		notifications_follow   : $.api9911.base_url + "notifications/follow",
		notifications_leave    : $.api9911.base_url + "notifications/leave",
			
		blocks_create          : $.api9911.base_url + "blocks/create",
		blocks_destroy         : $.api9911.base_url + "blocks/destroy",
		blocks_exists          : $.api9911.base_url + "blocks/exists",
		blocks_blocking        : $.api9911.base_url + "blocks/blocking",
		blocks_ids             : $.api9911.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.api9911.base_url + "saved_searches",
		saved_searches_show    : $.api9911.base_url + "saved_searches/show",
		saved_searches_create  : $.api9911.base_url + "saved_searches/create",
		saved_searches_destroy : $.api9911.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.api9911.base_url + "oauth/request_token",
		oauth_authorize        : $.api9911.base_url + "oauth/authorize",
		oauth_authenticate     : $.api9911.base_url + "oauth/authenticate",
		oauth_access_token     : $.api9911.base_url + "oauth/access_token"			
	};
	/**
	 * 检索方法
	 */
	$.api9911.search = function(params, successCallback){
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				rpp : $.api9911.config.count
			},params||{});
			
			$.ajax({
				url		: $.api9911.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.api9911.results.search_results,
				error	: $.api9911.failure
			});
		}
	};

	$.api9911.statuses.friends_timeline = function(params, successCallback) {
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count : $.api9911.config.count
			},params||{});
			
			$.ajax({
				url		: $.api9911.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.api9911.results.friends_timeline,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.statuses.user_timeline = function(params, successCallback) {
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count : $.api9911.config.count
			},params||{});
			
			
			$.ajax({
				url		: $.api9911.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.api9911.results.user_timeline,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.api9911.config.count
			},params||{});
			
			$.ajax({
				url		: $.api9911.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.api9911.results.friends_timeline,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.update = function(params, successCallback) {
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				source:$.api9911.config.source
			},params||{});
			
			$.ajax({
				url		: $.api9911.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.api9911.results.update,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};

	$.api9911.verify = function(api9911, successCallback) {
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.api9911.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.api9911.results.verify,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.retweet = function(params, successCallback) {		
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.api9911.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.api9911.success,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.destroy = function(params, successCallback) {		
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.api9911.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.api9911.success,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.friends = function(params, successCallback) {		
		if(!$.api9911.statuses.busy) {
			$.api9911.statuses.busy = true;
			$.api9911.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.api9911.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.api9911.results.friends,
				error	: $.api9911.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.api9911.username + ':' + $.api9911.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.api9911.success = function(data,options) {
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
		$.api9911.results.callback();
	};
	
	$.api9911.failure = function(xhr, textStatus, errorThrown) {
		air.trace(errorThrown);		
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.api9911.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.api9911.results.update = function(data,options){
		
		if(data && data.update) {
			$.api9911.results.callback();
		}
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.api9911.results.verify = function(userInfo,options){
		
		$.api9911.results.callback(userInfo);
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.api9911.results.search_results = function(data,options) {
		
		if(data && data.length) {
			$.api9911.results.tweetcache.search_results = data;
			if($.api9911.results.callback) {
				$.api9911.results.callback($.api9911.results.tweetcache.search_results);
			}
		}
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.api9911.results.friends_timeline = function(data,options) {
		
		if(data && data.statuses && data.statuses.length) {			
			$.api9911.results.tweetcache.friends_timeline = data.statuses;
			if($.api9911.results.callback) {
				$.api9911.results.callback($.api9911.results.tweetcache.friends_timeline);
			}
		}
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.api9911.results.user_timeline = function(data,options) {
		
		if(data && data.statuses && data.statuses.length) {
			$.api9911.results.tweetcache.user_timeline = data.statuses;
			if($.api9911.results.callback) {
				$.api9911.results.callback($.api9911.results.tweetcache.user_timeline);
			}
		}
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.api9911.results.friends = function(data,options) {
		
		if(data && data.users && data.users.length) {
			$.api9911.results.tweetcache.friends[$.api9911.username] = data.users;
			if($.api9911.results.callback) {
				$.api9911.results.callback($.api9911.results.tweetcache.friends[$.api9911.username]);
			}
		}
		
		$.api9911.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);