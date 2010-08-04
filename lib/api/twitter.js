/**
 * This jQuery plugin is about twitter api.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.twitter = {
		base_url	: "http://cytest.xsrv.jp/twitterbot/twitter/",
		search_base_url : "http://cytest.xsrv.jp/twitterbot/twitter/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
	}
	
	$.twitter.urls = {
		search         : $.twitter.base_url + "search",
		help_test      : $.twitter.base_url + "help/test",
			
		trends         : $.twitter.search_base_url + "trends",
		trends_current : $.twitter.search_base_url + "trends/current",
		trends_daily   : $.twitter.search_base_url + "trends/daily",
		trends_weekly  : $.twitter.search_base_url + "trends/weekly",
			
		statuses_public_timeline  : $.twitter.base_url + "statuses/public_timeline",
		statuses_home_timeline    : $.twitter.base_url + "statuses/home_timeline",
		statuses_friends_timeline : $.twitter.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.twitter.base_url + "statuses/user_timeline",
		statuses_mentions         : $.twitter.base_url + "statuses/mentions",
		statuses_show             : $.twitter.base_url + "statuses/show",
		statuses_update           : $.twitter.base_url + "statuses/update",
		statuses_retweet          : $.twitter.base_url + "statuses/retweet",
		statuses_destroy          : $.twitter.base_url + "statuses/destroy",
		statuses_friends          : $.twitter.base_url + "statuses/friends",
		statuses_followers        : $.twitter.base_url + "statuses/followers",
		
		users_show		: $.twitter.base_url + "users/show",
			
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
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				rpp:$.twitter.config.count
			},params||{});
			
			$.ajax({
				url		: $.twitter.urls.search + '.php',
				data	: params,
				dataType: 'json',
				success	: $.twitter.results.search_results,
				error	: $.twitter.failure
			});
		}
	};
	
	$.twitter.statuses.friends_timeline = function(params, successCallback) {
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.twitter.config.count
			},params||{});
			
			$.ajax({
				url		: $.twitter.urls.statuses_friends_timeline + '.php',
				data	: params,
				dataType: 'json',
				success	: $.twitter.results.friends_timeline,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.statuses.user_timeline = function(params, successCallback) {
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.twitter.config.count
			},params||{});
			
			$.ajax({
				url		: $.twitter.urls.statuses_user_timeline + '.php',
				data	: params,
				dataType: 'json',
				success	: $.twitter.results.user_timeline,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.twitter.config.count
			},params||{});
			
			$.ajax({
				url		: $.twitter.urls.statuses_mentions + '.php',
				data	: params,
				dataType: 'json',
				success	: $.twitter.results.friends_timeline,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	$.twitter.update = function(params, successCallback) {
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.twitter.urls.statuses_update + '.php',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.twitter.results.update,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.verify = function(twitter, successCallback) {
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.twitter.urls.account_verify_credentials + '.php',
				dataType: 'json',
				success	: $.twitter.results.verify,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.retweet = function(params, successCallback) {		
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.twitter.urls.statuses_retweet + '.php',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.twitter.success,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.destroy = function(params, successCallback) {		
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.twitter.urls.statuses_destroy + '.php',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.twitter.success,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.friends = function(params, successCallback) {		
		if(!$.twitter.statuses.busy) {
			$.twitter.statuses.busy = true;
			$.twitter.results.callback = successCallback;
			$.message.showLoadMask();
		
			$.ajax({
				url		: $.twitter.urls.statuses_friends + '.php',
				data	: params,
				dataType: 'json',
				success	: $.twitter.results.friends,
				error	: $.twitter.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.twitter.username + ':' + $.twitter.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.twitter.success = function(data,options) {
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
		$.twitter.results.callback();
	};
	
	$.twitter.failure = function(xhr, textStatus, errorThrown) {
		air.trace(errorThrown);		
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.twitter.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.twitter.results.update = function(data,options){
		
		if(data && data.id) {
			$.twitter.results.callback();
		}
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.twitter.results.verify = function(userInfo,options){
		
		$.twitter.results.callback(userInfo);
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.twitter.results.search_results = function(data,options) {
		
		if(data && data.results && data.results.length) {
			
			$.each(data.results,function(index,value){
				if(!value.user) {
					value.user = {
						profile_image_url : value.profile_image_url,
						screen_name : value.from_user
					};
				}				
			});
						
			$.twitter.results.tweetcache.search_results = data.results;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.search_results);
			}
		}
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.twitter.results.home_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.twitter.results.tweetcache.home_timeline = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.home_timeline);
			}
		}
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.twitter.results.friends_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.twitter.results.tweetcache.friends_timeline = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.friends_timeline);
			}
		}
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.twitter.results.user_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.twitter.results.tweetcache.user_timeline = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.user_timeline);
			}
		}
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.twitter.results.friends = function(data,options) {
		
		if(data && data.length) {
			$.twitter.results.tweetcache.friends[$.twitter.username] = data;
			if($.twitter.results.callback) {
				$.twitter.results.callback($.twitter.results.tweetcache.friends[$.twitter.username]);
			}
		}
		
		$.twitter.statuses.busy = false;
		$.message.hideLoadMask();
	};

})(jQuery);