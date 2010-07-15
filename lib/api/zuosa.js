/**
 * This jQuery plugin is about zuosa api.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.zuosa = {
		base_url	: "http://api.zuosa.com/",
		config		: {count: 20, source: 'TweetBowl'},
		statuses	: {},
		results 	: {}
	}
	
	$.zuosa.urls = {
		search         : $.zuosa.base_url + "search",
		help_test      : $.zuosa.base_url + "help/test",
			
		trends         : $.zuosa.base_url + "trends",
		trends_current : $.zuosa.base_url + "trends/current",
		trends_daily   : $.zuosa.base_url + "trends/daily",
		trends_weekly  : $.zuosa.base_url + "trends/weekly",
			
		statuses_public_timeline  : $.zuosa.base_url + "statuses/public_timeline",
		statuses_friends_timeline : $.zuosa.base_url + "statuses/friends_timeline",
		statuses_user_timeline    : $.zuosa.base_url + "statuses/user_timeline",
		statuses_mentions         : $.zuosa.base_url + "statuses/mentions",
		statuses_show             : $.zuosa.base_url + "statuses/show",
		statuses_update           : $.zuosa.base_url + "statuses/update",
		statuses_retweet          : $.zuosa.base_url + "statuses/retweet",
		statuses_destroy          : $.zuosa.base_url + "statuses/destroy",
		statuses_friends          : $.zuosa.base_url + "statuses/friends",
		statuses_followers        : $.zuosa.base_url + "statuses/followers",
			
		users_show : $.zuosa.base_url + "users/show",
			
		direct_messages      : $.zuosa.base_url + "direct_messages",
		direct_messages_sent : $.zuosa.base_url + "direct_messages/sent",
		direct_messages_new  : $.zuosa.base_url + "direct_messages/new",
		direct_messages      : $.zuosa.base_url + "direct_messages/destroy",
			
		friendship_create    : $.zuosa.base_url + "friendships/create",
		friendship_destroy   : $.zuosa.base_url + "friendships/destroy",
		friendship_exists    : $.zuosa.base_url + "friendships/exists",
			
		friends_ids          : $.zuosa.base_url + "friends/ids",
		followers_ids        : $.zuosa.base_url + "followers/ids",
			
		account_verify_credentials               : $.zuosa.base_url + "account/verify_credentials",
		account_rate_limit_status                : $.zuosa.base_url + "account/rate_limit_status",
		account_end_session                      : $.zuosa.base_url + "account/end_session",
		account_update_delivery_device           : $.zuosa.base_url + "account/update_delivery_device",
		account_update_profile_colors            : $.zuosa.base_url + "account/update_profile_colors",
		account_update_profile_image             : $.zuosa.base_url + "account/update_profile_image",
		account_update_profile_background_image  : $.zuosa.base_url + "account/",
		account_update_profile                   : $.zuosa.base_url + "account/update_profile/update_profile_background_image",
			
		favorites              : $.zuosa.base_url + "favorites",
		favorites_create       : $.zuosa.base_url + "favorites/create/",
		favorites_destroy      : $.zuosa.base_url + "favorites/destroy",
			 
		notifications_follow   : $.zuosa.base_url + "notifications/follow",
		notifications_leave    : $.zuosa.base_url + "notifications/leave",
			
		blocks_create          : $.zuosa.base_url + "blocks/create",
		blocks_destroy         : $.zuosa.base_url + "blocks/destroy",
		blocks_exists          : $.zuosa.base_url + "blocks/exists",
		blocks_blocking        : $.zuosa.base_url + "blocks/blocking",
		blocks_ids             : $.zuosa.base_url + "blocks/blocking/ids",
			
		saved_searches         : $.zuosa.base_url + "saved_searches",
		saved_searches_show    : $.zuosa.base_url + "saved_searches/show",
		saved_searches_create  : $.zuosa.base_url + "saved_searches/create",
		saved_searches_destroy : $.zuosa.base_url + "saved_searches/destroy",
			
		oauth_request_token    : $.zuosa.base_url + "oauth/request_token",
		oauth_authorize        : $.zuosa.base_url + "oauth/authorize",
		oauth_authenticate     : $.zuosa.base_url + "oauth/authenticate",
		oauth_access_token     : $.zuosa.base_url + "oauth/access_token"			
	};
	/**
	 * 检索方法
	 */
	$.zuosa.search = function(params, successCallback){
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
		
			$.ajax({
				url		: $.zuosa.urls.search + '.json',
				data	: params,
				dataType: 'json',
				success	: $.zuosa.results.search_results,
				error	: $.zuosa.failure
			});
		}
	};
	
	$.zuosa.statuses.friends_timeline = function(params, successCallback) {
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
		
			params = $.extend({
				count: $.zuosa.config.count
			},params||{});
			
			$.ajax({
				url		: $.zuosa.urls.statuses_friends_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.zuosa.results.friends_timeline,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.statuses.user_timeline = function(params, successCallback) {
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
			
			params = $.extend({
				count: $.zuosa.config.count
			},params||{});
			
			$.ajax({
				url		: $.zuosa.urls.statuses_user_timeline + '.json',
				data	: params,
				dataType: 'json',
				success	: $.zuosa.results.user_timeline,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.statuses.statuses_mentions = function(params, successCallback) {
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
			
			params = $.extend({
				count	: $.zuosa.config.count
			},params||{});
			
			$.ajax({
				url		: $.zuosa.urls.statuses_mentions + '.json',
				data	: params,
				dataType: 'json',
				success	: $.zuosa.results.friends_timeline,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.update = function(params, successCallback) {
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
			
			params = $.extend({
				source:'TweetBowl'
			},params||{});
			
			$.ajax({
				url		: $.zuosa.urls.statuses_update + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.zuosa.results.update,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.verify = function(zuosa, successCallback) {
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
			
			$.ajax({
				url		: $.zuosa.urls.account_verify_credentials + '.json',
				dataType: 'json',
				success	: $.zuosa.results.verify,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.retweet = function(params, successCallback) {		
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
		
			var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
			
			$.ajax({
				url		: $.zuosa.urls.statuses_retweet + '/' + params.id + '.json',
				data	: params,
				type	: 'POST',
				dataType: 'json',
				success	: $.zuosa.success,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.destroy = function(params, successCallback) {		
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
		
			$.ajax({
				url		: $.zuosa.urls.statuses_destroy + '/' + params.id + '.json',
				type	: 'POST',
				dataType: 'json',
				success	: $.zuosa.success,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.friends = function(params, successCallback) {		
		if(!$.zuosa.statuses.busy) {
			$.zuosa.statuses.busy = true;
			$.zuosa.results.callback = successCallback;
			$.zuosa.showLoadMask();
		
			$.ajax({
				url		: $.zuosa.urls.statuses_friends + '.json',
				data	: params,
				dataType: 'json',
				success	: $.zuosa.results.friends,
				error	: $.zuosa.failure,
				beforeSend: function(xhr){
					var authz = $.base64.encode($.zuosa.username + ':' + $.zuosa.password);
					xhr.setRequestHeader("Authorization",'Basic ' + authz);
				}
			});
		}
	};
	
	$.zuosa.success = function(data,options) {
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
		$.zuosa.results.callback();
	};
	
	$.zuosa.failure = function(xhr, textStatus, errorThrown) {
		air.trace(textStatus);		
		
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
		$('.messagedialog').message('操作失败！！','error');
	};
	
	/**
	 * 定义一个数据缓存
	 */
	$.zuosa.results.tweetcache = {
		search_results	: [],
		user_timeline	: [],
		friends			: []
	}
	
	$.zuosa.results.update = function(response,options){
		
		air.trace(response.responseText);
		var data = $.parseJSON(response.responseText);
		//if(data.id) {
			$.zuosa.results.callback();
		//}
			
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.zuosa.results.verify = function(response,options){
		
		var userInfo = $.parseJSON(response.responseText);		
		$.zuosa.results.callback(userInfo);
		
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
	}
	
	$.zuosa.results.search_results = function(response,options) {
		
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.zuosa.results.tweetcache.search_results = data;
			if($.zuosa.results.callback) {
				$.zuosa.results.callback($.zuosa.results.tweetcache.search_results);
			}
		}
		
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.zuosa.results.friends_timeline = function(response,options) {
		
		var data = $.parseJSON(response.responseText);		
		if(data && data.length) {			
			$.zuosa.results.tweetcache.friends_timeline = data;
			if($.zuosa.results.callback) {
				$.zuosa.results.callback($.zuosa.results.tweetcache.friends_timeline);
			}
		}
		
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.zuosa.results.user_timeline = function(response,options) {
		
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.zuosa.results.tweetcache.user_timeline = data;
			if($.zuosa.results.callback) {
				$.zuosa.results.callback($.zuosa.results.tweetcache.user_timeline);
			}
		}
		
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
	};
	
	$.zuosa.results.friends = function(response,options) {
		
		var data = $.parseJSON(response.responseText);
		if(data.length) {
			$.zuosa.results.tweetcache.friends[$.zuosa.username] = data;
			if($.zuosa.results.callback) {
				$.zuosa.results.callback($.zuosa.results.tweetcache.friends[$.zuosa.username]);
			}
		}
		
		$.zuosa.statuses.busy = false;
		$.message.hideLoadMask();
	};
})(jQuery);