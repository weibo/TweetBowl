(function($){
	
	$.sohu = {
		base_url	: "http://api.t.sohu.com/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
	}
	
	$.sohu.urls = {
		search         : $.sohu.base_url + "search",
		help_test      : $.sohu.base_url + "help/test",
			
		trends         : $.sohu.base_url + "trends",
		trends_current : $.sohu.base_url + "trends/current",
		trends_daily   : $.sohu.base_url + "trends/daily",
		trends_weekly  : $.sohu.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.sohu.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.sohu.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.sohu.base_url + "statuses/user_timeline",
		statuses_mentions         : $.sohu.base_url + "statuses/mentions",
		statuses_show             : $.sohu.base_url + "statuses/show",
		statuses_update           : $.sohu.base_url + "statuses/update",
		statuses_retweet          : $.sohu.base_url + "statuses/retweet",
		statuses_destroy          : $.sohu.base_url + "statuses/destroy",
		statuses_friends          : $.sohu.base_url + "statuses/friends",
		statuses_followers        : $.sohu.base_url + "statuses/followers",
			
		users_show : $.sohu.base_url + "users/show",
			
		direct_messages      : $.sohu.base_url + "direct_messages",
		direct_messages_sent : $.sohu.base_url + "direct_messages/sent",
		direct_messages_new  : $.sohu.base_url + "direct_messages/new",
		direct_messages      : $.sohu.base_url + "direct_messages/destroy",
			
		friendship_create    : $.sohu.base_url + "friendships/create",
		friendship_destroy   : $.sohu.base_url + "friendships/destroy",
		friendship_exists    : $.sohu.base_url + "friendships/exists",
			
		friends_ids          : $.sohu.base_url + "friends/ids",
		followers_ids        : $.sohu.base_url + "followers/ids",
			
		account_verify_credentials               : $.sohu.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.sohu.base_url + "account/rate_limit_status",
		account_end_session                      : $.sohu.base_url + "account/end_session",
		account_update_delivery_device           : $.sohu.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.sohu.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.sohu.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.sohu.base_url + "account/",
		account_update_profile                   : $.sohu.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.sohu.base_url + "favorites",
		favorites_create       : $.sohu.base_url + "favorites/create/",
		favorites_destroy      : $.sohu.base_url + "favorites/destroy",
			 
		notifications_follow   : $.sohu.base_url + "notifications/follow",
		notifications_leave    : $.sohu.base_url + "notifications/leave",
			
		blocks_create          : $.sohu.base_url + "blocks/create",
		blocks_destroy         : $.sohu.base_url + "blocks/destroy",
		blocks_exists          : $.sohu.base_url + "blocks/exists",
		blocks_blocking        : $.sohu.base_url + "blocks/blocking",
		blocks_ids             : $.sohu.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.sohu.base_url + "saved_searches",
		saved_searches_show    : $.sohu.base_url + "saved_searches/show",
		saved_searches_create  : $.sohu.base_url + "saved_searches/create",
		saved_searches_destroy : $.sohu.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.sohu.base_url + "oauth/request_token",
		oauth_authorize        : $.sohu.base_url + "oauth/authorize",
		oauth_authenticate     : $.sohu.base_url + "oauth/authenticate",
		oauth_access_token     : $.sohu.base_url + "oauth/access_token"			
	};
	/**
	 * 检索方法
	 */
	$.sohu.search = function(params, successCallback){		
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
		
			params = $.extend({
				rpp:$.sohu.config.count
			},params||{});
			
			$.ajax({
				url		: $.sohu.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sohu.results.search_results,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.statuses.friends_timeline = function(params, successCallback) {		
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.sohu.config.count
			},params||{});
			
			$.ajax({
				url		: $.sohu.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sohu.results.friends_timeline,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.statuses.user_timeline = function(params, successCallback) {
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.sohu.config.count
			},params||{});
			
			$.ajax({
				url		: $.sohu.urls.statuses_user_timeline + '/' + params.id + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sohu.results.user_timeline,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.sohu.config.count
			},params||{});
			
			$.ajax({
				url		: $.sohu.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sohu.results.friends_timeline,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.update = function(params, successCallback) {
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.sohu.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.sohu.results.update,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.verify = function(sohu, successCallback) {
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.sohu.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.sohu.results.verify,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.retweet = function(params, successCallback) {		
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.sohu.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.sohu.success,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.destroy = function(params, successCallback) {		
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.sohu.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.sohu.success,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.friends = function(params, successCallback) {		
		if(!$.sohu.statuses.busy) {
			$.sohu.statuses.busy = true;
			$.sohu.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.sohu.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.sohu.results.friends,
				error	: $.sohu.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.sohu.username + ':' + $.sohu.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.sohu.success = function(data,options) {
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
		$.sohu.results.callback();
	};
	
	$.sohu.failure = function(xhr, textStatus, errorThrown) {
		air.trace(textStatus);		
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.sohu.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.sohu.results.update = function(data,options){
		
		if(data && data.id) {
			$.sohu.results.callback();
		}
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.sohu.results.verify = function(userInfo,options){
		
		$.sohu.results.callback(userInfo);
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.sohu.results.search_results = function(data,options) {
		
		if(data && data.length) {
			$.sohu.results.tweetcache.search_results = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.search_results);
			}
		}
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.sohu.results.friends_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.sohu.results.tweetcache.friends_timeline = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.friends_timeline);
			}
		}
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.sohu.results.user_timeline = function(data,options) {
		
		if(data && data.length) {
			$.sohu.results.tweetcache.user_timeline = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.user_timeline);
			}
		}
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.sohu.results.friends = function(data,options) {
		
		if(data && data.length) {
			$.sohu.results.tweetcache.friends[$.sohu.username] = data;
			if($.sohu.results.callback) {
				$.sohu.results.callback($.sohu.results.tweetcache.friends[$.sohu.username]);
			}
		}
		
		$.sohu.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);