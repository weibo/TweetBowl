(function($){
	
	$.tongxue = {
		base_url	: "http://api.tongxue.com/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
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
		statuses_retweet          : $.tongxue.base_url + "statuses/retweet",
		statuses_destroy          : $.tongxue.base_url + "statuses/destroy",
		statuses_friends          : $.tongxue.base_url + "statuses/friends",
		statuses_followers        : $.tongxue.base_url + "statuses/followers",
		
		users_friends	: $.tongxue.base_url + "statuses/users/followings",
		users_show		: $.tongxue.base_url + "users/show",
			
		direct_messages      : $.tongxue.base_url + "direct_messages",
		direct_messages_sent : $.tongxue.base_url + "direct_messages/sent",
		direct_messages_new  : $.tongxue.base_url + "direct_messages/new",
		direct_messages      : $.tongxue.base_url + "direct_messages/destroy",
			
		friendship_create    : $.tongxue.base_url + "friendships/create",
		friendship_destroy   : $.tongxue.base_url + "friendships/destroy",
		friendship_exists    : $.tongxue.base_url + "friendships/exists",
			
		friends_ids          : $.tongxue.base_url + "friends/ids",
		followers_ids        : $.tongxue.base_url + "followers/ids",
			
		account_verify_credentials               : $.tongxue.base_url + "account/verify_credentials",
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
	
	/**
	 * 检索方法
	 */
	$.tongxue.search = function(params, successCallback){
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.tongxue.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.tongxue.results.search_results,
				error	: $.tongxue.failure
			});
		}
	};
	
	$.tongxue.statuses.friends_timeline = function(params, successCallback) {
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count:$.tongxue.config.count
			},params||{});
			
			$.ajax({
				url		: $.tongxue.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.tongxue.results.friends_timeline,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.statuses.user_timeline = function(params, successCallback) {
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count:$.tongxue.config.count
			},params||{});
			
			$.ajax({
				url		: $.tongxue.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.tongxue.results.user_timeline,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.tongxue.config.count
			},params||{});
			
			$.ajax({
				url		: $.tongxue.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.tongxue.results.friends_timeline,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.update = function(params, successCallback) {
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				source:$.tongxue.config.source
			},params||{});
			
			$.ajax({
				url		: $.tongxue.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.tongxue.results.update,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.verify = function(tongxue, successCallback) {
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.tongxue.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.tongxue.results.verify,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.retweet = function(params, successCallback) {		
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.tongxue.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.tongxue.success,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.destroy = function(params, successCallback) {		
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.tongxue.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.tongxue.success,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.friends = function(params, successCallback) {		
		if(!$.tongxue.statuses.busy) {
			$.tongxue.statuses.busy = true;
			$.tongxue.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.tongxue.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.tongxue.results.friends,
				error	: $.tongxue.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.tongxue.username + ':' + $.tongxue.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.tongxue.success = function(data,options) {
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
		$.tongxue.results.callback();
	};
	
	$.tongxue.failure = function(xhr, textStatus, errorThrown) {
		air.trace(textStatus);		
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.tongxue.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.tongxue.results.update = function(data,options){
		
		if(data && data.id) {
			$.tongxue.results.callback();
		}
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.tongxue.results.verify = function(userInfo,options){
		
		if(userInfo.status && userInfo.status.create_at) {
			userInfo.status.created_at = userInfo.status.create_at;
		}
		if(!userInfo.friends_count && userInfo.followings_count) {
			userInfo.friends_count = userInfo.followings_count;
		}
		$.tongxue.results.callback(userInfo);
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.tongxue.results.search_results = function(data,options) {
		
		if(data && data.length) {
			$.tongxue.results.tweetcache.search_results = data;
			if($.tongxue.results.callback) {
				$.tongxue.results.callback($.tongxue.results.tweetcache.search_results);
			}
		}
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.tongxue.results.friends_timeline = function(data,options) {
		
		if(data && data.length) {	
			$.each(data, function(index,value){
				if(!value.created_at && value.create_at) {
					value.created_at = value.create_at;
				}
			});
			
			$.tongxue.results.tweetcache.friends_timeline = data;
			if($.tongxue.results.callback) {
				$.tongxue.results.callback($.tongxue.results.tweetcache.friends_timeline);
			}
		}
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.tongxue.results.user_timeline = function(data,options) {
		
		if(data && data.length) {
			$.tongxue.results.tweetcache.user_timeline = data;
			if($.tongxue.results.callback) {
				$.tongxue.results.callback($.tongxue.results.tweetcache.user_timeline);
			}
		}
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.tongxue.results.friends = function(data,options) {
		
		if(data && data.length) {
			$.tongxue.results.tweetcache.friends[$.tongxue.username] = data;
			if($.tongxue.results.callback) {
				$.tongxue.results.callback($.tongxue.results.tweetcache.friends[$.tongxue.username]);
			}
		}
		
		$.tongxue.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);