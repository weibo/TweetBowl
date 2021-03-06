/**
 * This jQuery plugin is about renjian api.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.renjian = {
		base_url	: "http://api.renjian.com/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results		: {}
	}
	
	$.renjian.urls = {
		search         : $.renjian.base_url + "search",
		help_test      : $.renjian.base_url + "help/test",
			
		trends         : $.renjian.base_url + "trends",
		trends_current : $.renjian.base_url + "trends/current",
		trends_daily   : $.renjian.base_url + "trends/daily",
		trends_weekly  : $.renjian.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.renjian.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.renjian.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.renjian.base_url + "statuses/user_timeline",
		statuses_mentions         : $.renjian.base_url + "statuses/mentions",
		statuses_show             : $.renjian.base_url + "statuses/show",
		statuses_update           : $.renjian.base_url + "statuses/update",
		statuses_retweet          : $.renjian.base_url + "statuses/retweet",
		statuses_destroy          : $.renjian.base_url + "statuses/destroy",
		statuses_friends          : $.renjian.base_url + "statuses/friends",
		statuses_followers        : $.renjian.base_url + "statuses/followers",
			
		users_show : $.renjian.base_url + "users/show",
			
		direct_messages      : $.renjian.base_url + "direct_messages",
		direct_messages_sent : $.renjian.base_url + "direct_messages/sent",
		direct_messages_new  : $.renjian.base_url + "direct_messages/new",
		direct_messages      : $.renjian.base_url + "direct_messages/destroy",
			
		friendship_create    : $.renjian.base_url + "friendships/create",
		friendship_destroy   : $.renjian.base_url + "friendships/destroy",
		friendship_exists    : $.renjian.base_url + "friendships/exists",
			
		friends_ids          : $.renjian.base_url + "friends/ids",
		followers_ids        : $.renjian.base_url + "followers/ids",
			
		account_verify_credentials               : $.renjian.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.renjian.base_url + "account/rate_limit_status",
		account_end_session                      : $.renjian.base_url + "account/end_session",
		account_update_delivery_device           : $.renjian.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.renjian.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.renjian.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.renjian.base_url + "account/",
		account_update_profile                   : $.renjian.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.renjian.base_url + "favorites",
		favorites_create       : $.renjian.base_url + "favorites/create/",
		favorites_destroy      : $.renjian.base_url + "favorites/destroy",
			 
		notifications_follow   : $.renjian.base_url + "notifications/follow",
		notifications_leave    : $.renjian.base_url + "notifications/leave",
			
		blocks_create          : $.renjian.base_url + "blocks/create",
		blocks_destroy         : $.renjian.base_url + "blocks/destroy",
		blocks_exists          : $.renjian.base_url + "blocks/exists",
		blocks_blocking        : $.renjian.base_url + "blocks/blocking",
		blocks_ids             : $.renjian.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.renjian.base_url + "saved_searches",
		saved_searches_show    : $.renjian.base_url + "saved_searches/show",
		saved_searches_create  : $.renjian.base_url + "saved_searches/create",
		saved_searches_destroy : $.renjian.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.renjian.base_url + "oauth/request_token",
		oauth_authorize        : $.renjian.base_url + "oauth/authorize",
		oauth_authenticate     : $.renjian.base_url + "oauth/authenticate",
		oauth_access_token     : $.renjian.base_url + "oauth/access_token"			
	};
	/**
	 * 检索方法
	 */
	$.renjian.search = function(params, successCallback){
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
		
			$.ajax({
				url		: $.renjian.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.renjian.results.search_results,
				error	: $.renjian.failure
			});
		}
	};

	$.renjian.statuses.friends_timeline = function(params, successCallback) {
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
		
			params = $.extend({
				count:$.renjian.config.count
			},params||{});
			
			$.ajax({
				url		: $.renjian.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.renjian.results.friends_timeline,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.statuses.user_timeline = function(params, successCallback) {
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
			
			params = $.extend({
				count:$.renjian.config.count
			},params||{});
			
			$.ajax({
				url		: $.renjian.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.renjian.results.user_timeline,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
			
			params = $.extend({
				count	: $.renjian.config.count
			},params||{});
			
			$.ajax({
				url		: $.renjian.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.renjian.results.friends_timeline,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.update = function(params, successCallback) {
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
			
			params = $.extend({
				source:$.renjian.config.source,
				text: params.status
			},params||{});
			
			$.ajax({
				url		: $.renjian.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.renjian.results.update,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.verify = function(renjian, successCallback) {
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
		
			$.ajax({
				url		: $.renjian.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.renjian.results.verify,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.retweet = function(params, successCallback) {		
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
		
			$.ajax({
				url		: $.renjian.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.renjian.success,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.destroy = function(params, successCallback) {		
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
		
			$.ajax({
				url		: $.renjian.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.renjian.success,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.friends = function(params, successCallback) {		
		if(!$.renjian.statuses.busy) {
			$.renjian.statuses.busy = true;
			$.renjian.results.callback = successCallback;
			$.renjian.showLoadMask();
		
			$.ajax({
				url		: $.renjian.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.renjian.results.friends,
				error	: $.renjian.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.renjian.username + ':' + $.renjian.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.renjian.success = function(data,options) {
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
		$.renjian.results.callback();
	};
	
	$.renjian.failure = function(xhr, textStatus, errorThrown) {
		air.trace(textStatus);		
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.renjian.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.renjian.results.update = function(data,options){
		
		if(data && data.update) {
			$.renjian.results.callback();
		}
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.renjian.results.verify = function(userInfo,options){
		
		var userInfo = $.parseJSON(response.responseText);		
		$.renjian.results.callback(userInfo);
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.renjian.results.search_results = function(data,options) {
		
		if(data && data.length) {
			$.renjian.results.tweetcache.search_results = data;
			if($.renjian.results.callback) {
				$.renjian.results.callback($.renjian.results.tweetcache.search_results);
			}
		}
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.renjian.results.friends_timeline = function(data,options) {
		
		if(data && data.length) {			
			$.renjian.results.tweetcache.friends_timeline = data;
			if($.renjian.results.callback) {
				$.renjian.results.callback($.renjian.results.tweetcache.friends_timeline);
			}
		}
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.renjian.results.user_timeline = function(data,options) {
		
		if(data && data.length) {
			$.renjian.results.tweetcache.user_timeline = data;
			if($.renjian.results.callback) {
				$.renjian.results.callback($.renjian.results.tweetcache.user_timeline);
			}
		}
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.renjian.results.friends = function(data,options) {
		
		if(data && data.length) {
			$.renjian.results.tweetcache.friends[$.renjian.username] = data;
			if($.renjian.results.callback) {
				$.renjian.results.callback($.renjian.results.tweetcache.friends[$.renjian.username]);
			}
		}
		
		$.renjian.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);