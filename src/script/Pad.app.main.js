/**
 * Main Class.
 * 
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
(function($){
	
	$.app = {
		config	: {
			backing		: {enable:true,time:60},
			popwindow	: {enable:true,time:10}
		},
		track	: {action: 'init'}
	};
	
	/**
	 * 初始化方法
	 */
	$.app.init = function(){
		
		//读取存储区的数据
		if($.state.enable) {
			$.state.Manager.read();
		}
		
		//初始化帐户信息
		$.account.read();
		
		//初始化系统配置
		if($.state.storevalue.config) {
			$.app.config = $.state.storevalue.config;
			//$.app.config.backing.time = 60;
		}
		
		//初始化系历史记录
		if($.state.storevalue.track) {
			$.app.track = $.state.storevalue.track;
			$.app.track.action = 'init';
		}
		
		$.app.addTimelineListener();
	}
	/**
	 * 保存软件状态，包括系统配置，操作记录等
	 */
	$.app.saveState = function() {
		
		//存储系统配置
		if(!$.state.storevalue.config && $.app.config) {
			$.state.storevalue.config = $.app.config;
		}
		
		//存储历史记录
		if(!$.state.storevalue.track && $.app.track) {
			$.state.storevalue.track = $.app.track;
		}
		
		//存储数据到存储区
		if($.state.enable) {
    		$.state.Manager.save();
    	}
	}
	/**
	 * 实时信息监听器，获取新发布的微博内容。
	 */
	$.app.addTimelineListener = function() {
		if($.app.config && $.app.config.backing && $.app.config.backing.enable) {
			$.app.timelineListening = setInterval(function(){$.app.getNewFriendsTimeline();}, $.app.config.backing.time * 1000);
		}	
	}
	/**
	 * 取消实时信息监听。
	 */
	$.app.clearTimelineListener = function() {
		if($.app.timelineListening) {
			clearInterval($.app.timelineListening);
			$.app.timelineListening = null;
		}	
	}
	/**
	 * 记录当前操作。
	 */
	$.app.addTrackAction = function(action) {
		if(!$.app.track) {
			$.app.track = {};
			$.state.storevalue.track = $.app.track;
		}
		$.app.track.action = action;
		
		if($.app.track.action == 'friends_timeline') {
			$.tweetCache.empty();
		}
	}
	/**
	 * 记录当前最大的微博ID.
	 */
	$.app.addTrackSinceId = function(id) {
		if(!$.app.track) {
			$.app.track = {};
			$.state.storevalue.track = $.app.track;
		}
		$.app.track.since_id = id;
	}
	/**
	 * 获取自己和好友新新发布的微博内容。
	 */
	$.app.getNewFriendsTimeline = function() {
		var api = $.api.current();
		if(api && api.username) {
			
			var params = {};
			
			if($.app.track && $.app.track.since_id) {
				params.since_id = $.app.track.since_id;
			}
			
			api.statuses.friends_timeline(params, function(results){
				if($.app.track) {
					$.app.track.since_id = results[0].id;
				}
				$.tweetCache.merge(results);
				
				if($.tweetCache.length() && !$.app.popthread) {
					$.app.addPopListener();
				} else if(!$.tweetCache.length() && $.app.popthread) {
					$.app.clearPopListener();
				}
			});
		}
	}
	/**
	 * 弹出窗口监听器，定时弹出新发布的微博内容。
	 */
	$.app.addPopListener = function() {
		if(!$.app.popthread) {
			$.app.popthread = setInterval(function(){
				var tweet = $.tweetCache.pop();
				
				if($.app.track && $.app.track.action == 'friends_timeline') {
					$("#content").insertTweetPanel(tweet);
					
					if($.nativeWindow.displayState && $.nativeWindow.displayState == 'minimized' && $.app.config.popwindow.enable) {
						$.app.showPopWindow(tweet);
					}
				} else {
					if($.app.config.popwindow.enable) {
						$.app.showPopWindow(tweet);
					}
				}
			}, $.app.config.popwindow.time * 1000);
		}	
	}
	/**
	 * 取消弹出窗口监听器。
	 */
	$.app.clearPopListener = function() {
		if($.app.popthread) {
			clearInterval($.app.popthread);
			$.app.popthread = null;
		}	
	}
	/**
	 * 显示最新微博内容提示窗口。
	 */
	$.app.showPopWindow = function(tweet) {
		var options = new air.NativeWindowInitOptions();
		options.systemChrome = "none";
		options.transparent = true;
		options.type = "lightweight";
		
		var place = $.place.rightBottom({width:300,height:200});
		var windowBounds = new air.Rectangle(place.x,place.y,300,200);
		
		var popHtmlLoader = air.HTMLLoader.createRootWindow(true, options, true, windowBounds);
		popHtmlLoader.load(new air.URLRequest("src/html/popwindow.html"));
		popHtmlLoader.window.CALLBACK = {
			init : function(buildViewCallBack) {
				buildViewCallBack({
					config: $.nativeWindow.config,
					tweet : tweet});
			}
		}			
	}
})(jQuery);