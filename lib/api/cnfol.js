/**
 * This jQuery plugin is about cnfol api.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.cnfol = {
		base_url	: "http://api.t.cnfol.com/",
		config		: {count: 20, source: 'TweetBowl', reply_auto: true},
		statuses	: {},
		results		: {}
	}
	
	/**
	 * 定义API接口
	 */
	$.cnfol.urls = {
		search         : $.cnfol.base_url + "search",
		help_test      : $.cnfol.base_url + "help/test",
			
		trends         : $.cnfol.base_url + "trends",
		trends_current : $.cnfol.base_url + "trends/current",
		trends_daily   : $.cnfol.base_url + "trends/daily",
		trends_weekly  : $.cnfol.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.cnfol.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.cnfol.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.cnfol.base_url + "statuses/user_timeline",
		statuses_mentions         : $.cnfol.base_url + "statuses/mentions",
		statuses_show             : $.cnfol.base_url + "statuses/show",
		statuses_update           : $.cnfol.base_url + "statuses/update",
		statuses_retweet          : $.cnfol.base_url + "statuses/retweet",
		statuses_destroy          : $.cnfol.base_url + "statuses/destroy",
		statuses_friends          : $.cnfol.base_url + "statuses/friends",
		statuses_followers        : $.cnfol.base_url + "statuses/followers",
			
		users_friends	: $.cnfol.base_url + "users/friends",
		users_show		: $.cnfol.base_url + "users/show",
			
		direct_messages      : $.cnfol.base_url + "direct_messages",
		direct_messages_sent : $.cnfol.base_url + "direct_messages/sent",
		direct_messages_new  : $.cnfol.base_url + "direct_messages/new",
		direct_messages      : $.cnfol.base_url + "direct_messages/destroy",
			
		friendship_create    : $.cnfol.base_url + "friendships/create",
		friendship_destroy   : $.cnfol.base_url + "friendships/destroy",
		friendship_exists    : $.cnfol.base_url + "friendships/exists",
			
		friends_ids          : $.cnfol.base_url + "friends/ids",
		followers_ids        : $.cnfol.base_url + "followers/ids",
			
		account_verify_credentials               : $.cnfol.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.cnfol.base_url + "account/rate_limit_status",
		account_end_session                      : $.cnfol.base_url + "account/end_session",
		account_update_delivery_device           : $.cnfol.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.cnfol.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.cnfol.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.cnfol.base_url + "account/",
		account_update_profile                   : $.cnfol.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.cnfol.base_url + "favorites",
		favorites_create       : $.cnfol.base_url + "favorites/create/",
		favorites_destroy      : $.cnfol.base_url + "favorites/destroy",
			 
		notifications_follow   : $.cnfol.base_url + "notifications/follow",
		notifications_leave    : $.cnfol.base_url + "notifications/leave",
			
		blocks_create          : $.cnfol.base_url + "blocks/create",
		blocks_destroy         : $.cnfol.base_url + "blocks/destroy",
		blocks_exists          : $.cnfol.base_url + "blocks/exists",
		blocks_blocking        : $.cnfol.base_url + "blocks/blocking",
		blocks_ids             : $.cnfol.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.cnfol.base_url + "saved_searches",
		saved_searches_show    : $.cnfol.base_url + "saved_searches/show",
		saved_searches_create  : $.cnfol.base_url + "saved_searches/create",
		saved_searches_destroy : $.cnfol.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.cnfol.base_url + "oauth/request_token",
		oauth_authorize        : $.cnfol.base_url + "oauth/authorize",
		oauth_authenticate     : $.cnfol.base_url + "oauth/authenticate",
		oauth_access_token     : $.cnfol.base_url + "oauth/access_token"			
	};
	
	/**
	 * 检索方法
	 */
	$.cnfol.search = function(params, successCallback){
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.cnfol.config.count
			},params||{});
			
			$.ajax({
				url		: $.cnfol.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.cnfol.results.search_results,
				error	: $.cnfol.failure
			});
		}		
	};
	
	$.cnfol.statuses.friends_timeline = function(params, successCallback) {
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.cnfol.config.count
			},params||{});
			
			$.ajax({
				url		: $.cnfol.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.cnfol.results.friends_timeline,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.statuses.user_timeline = function(params, successCallback) {
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			if(params.name) {
				params.id = params.name;
			}
			params = $.extend({
				count	: $.cnfol.config.count
			},params||{});
			
			$.ajax({
				url		: $.cnfol.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.cnfol.results.user_timeline,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				count	: $.cnfol.config.count
			},params||{});
			
			$.ajax({
				url		: $.cnfol.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.cnfol.results.friends_timeline,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.update = function(params, successCallback) {
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			params = $.extend({
				source	: $.cnfol.config.source
			},params||{});
			
			$.ajax({
				url		: $.cnfol.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.cnfol.results.update,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.verify = function(cnfol, successCallback) {
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.cnfol.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.cnfol.results.verify,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.retweet = function(params, successCallback) {		
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.cnfol.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.cnfol.success,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.destroy = function(params, successCallback) {		
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.cnfol.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.cnfol.success,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.friends = function(params, successCallback) {		
		if(!$.cnfol.statuses.busy) {
			$.cnfol.statuses.busy = true;
			$.cnfol.results.callback = successCallback;
			$.message.showLoadMask();
			
			$.ajax({
				url		: $.cnfol.urls.users_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.cnfol.results.friends,
				error	: $.cnfol.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.cnfol.username + ':' + $.cnfol.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.cnfol.success = function(data,options) {
		//air.trace(response.responseText);
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
		$.cnfol.results.callback();
	};
	
	$.cnfol.failure = function(xhr, textStatus, errorThrown) {
		air.trace(errorThrown);		
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.cnfol.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.cnfol.results.update = function(data,options){
		
		if(data.update) {
			$.cnfol.results.callback();
		}
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.cnfol.results.verify = function(userInfo,options){
		
		$.cnfol.results.callback(userInfo);
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.cnfol.results.search_results = function(data) {
		
		if(data.length && data[0].id) {
			
			$.each(data, function(index,value){
				if(value.created_at) {
					value.created_at = value.created_at.substring(0,20) + "UTC+0000" + value.created_at.substring(25);
				}
			});
			
			$.cnfol.results.tweetcache.search_results = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.search_results);
			}
		}
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.cnfol.results.friends_timeline = function(data, textStatus) {
			
		if(data && data.length) {
				
			$.each(data, function(index,value){
				if(value.created_at) {
					value.created_at = value.created_at.substring(0,20) + "UTC+0000" + value.created_at.substring(25);
				}
			});
				
			$.cnfol.results.tweetcache.friends_timeline = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.friends_timeline);
			}
		}
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.cnfol.results.user_timeline = function(data,options) {
		
		if(data.length) {
			
			$.each(data, function(index,value){
				if(value.created_at) {
					value.created_at = value.created_at.substring(0,20) + "UTC+0000" + value.created_at.substring(25);
				}
			});
			
			$.cnfol.results.tweetcache.user_timeline = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.user_timeline);
			}
		}
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.cnfol.results.friends = function(data,options) {
		
		if(data.length) {
			$.cnfol.results.tweetcache.friends[$.cnfol.username] = data;
			if($.cnfol.results.callback) {
				$.cnfol.results.callback($.cnfol.results.tweetcache.friends[$.cnfol.username]);
			}
		}
		
		$.cnfol.statuses.busy = false;
		$.message.hideLoadMask();
	};

})(jQuery);