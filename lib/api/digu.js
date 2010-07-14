(function($){
	
	$.digu = {
		base_url	: "http://api.minicloud.com.cn/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
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
		statuses_retweet          : $.digu.base_url + "statuses/retweet",
		statuses_destroy          : $.digu.base_url + "statuses/destroy",
		statuses_friends          : $.digu.base_url + "statuses/friends",
		statuses_followers        : $.digu.base_url + "statuses/followers",
		
		users_show		: $.digu.base_url + "users/show",
			
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
	/**
	 * 检索方法
	 */
	$.digu.search = function(params, successCallback){
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.digu.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.digu.results.search_results,
				error	: $.digu.failure
			});
		}
	};

	$.digu.statuses.friends_timeline = function(params, successCallback) {
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count:$.digu.config.count
			},params||{});
			
			$.ajax({
				url		: $.digu.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.digu.results.friends_timeline,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.statuses.user_timeline = function(params, successCallback) {
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count:$.digu.config.count,
				userIdOrName: params.id
			},params||{});
			
			$.ajax({
				url		: $.digu.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.digu.results.user_timeline,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.digu.config.count
			},params||{});
			
			$.ajax({
				url		: $.digu.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.digu.results.friends_timeline,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.update = function(params, successCallback) {
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				source:$.digu.config.source,
				content: params.status
			},params||{});
			
			$.ajax({
				url		: $.digu.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.digu.results.update,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.verify = function(digu, successCallback) {
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.digu.urls.account_verify_credentials + '.json?isAllInfo=true',
				dataType: 'json',
				success	: $.digu.results.verify,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.retweet = function(params, successCallback) {		
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.digu.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.digu.success,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.destroy = function(params, successCallback) {		
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.digu.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.digu.success,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.friends = function(params, successCallback) {		
		if(!$.digu.statuses.busy) {
			$.digu.statuses.busy = true;
			$.digu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.digu.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.digu.results.friends,
				error	: $.digu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.digu.username + ':' + $.digu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.digu.success = function(data,options) {
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
		$.digu.results.callback();
	};
	
	$.digu.failure = function(xhr, textStatus, errorThrown) {
		air.trace(textStatus);		
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.digu.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.digu.results.update = function(data,options){
		
		if(data && data.id) {
			$.digu.results.callback();
		} else if(data.error) {
			$('.messagedialog').message('操作失败！！<br/>' + data.error,'error');
		}
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.digu.results.verify = function(userInfo,options){
			
		$.digu.results.callback(userInfo);
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.digu.results.search_results = function(data,options) {
		
		if(data && data.length) {
			$.digu.results.tweetcache.search_results = data;
			if($.digu.results.callback) {
				$.digu.results.callback($.digu.results.tweetcache.search_results);
			}
		}
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.digu.results.friends_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.digu.results.tweetcache.friends_timeline = data;
			if($.digu.results.callback) {
				$.digu.results.callback($.digu.results.tweetcache.friends_timeline);
			}
		}
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.digu.results.user_timeline = function(data,options) {
		
		if(data && data.length) {
			$.digu.results.tweetcache.user_timeline = data;
			if($.digu.results.callback) {
				$.digu.results.callback($.digu.results.tweetcache.user_timeline);
			}
		}
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.digu.results.friends = function(data,options) {
		
		if(data && data.length) {
			$.digu.results.tweetcache.friends[$.digu.username] = data;
			if($.digu.results.callback) {
				$.digu.results.callback($.digu.results.tweetcache.friends[$.digu.username]);
			}
		}
		
		$.digu.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);