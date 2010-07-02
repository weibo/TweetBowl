/**
 * This jQuery plugin displays native window in adobe air.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
(function($){
	
	$.app = {
		config	: {backing : {enable:true,time:60}},
		track	: {action: 'init'}
	};
	
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
		}
		
		//初始化系历史记录
		if($.state.storevalue.track) {
			$.app.track = $.state.storevalue.track;
			$.app.track.action = 'init';
		}
		
		$.app.addTimelineListener();
	}
	
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
	
	$.app.addTimelineListener = function() {
		if($.app.config && $.app.config.backing && $.app.config.backing.enable) {
			$.app.timelineListening = setInterval(function(){$.app.getNewFriendsTimeline();}, $.app.config.backing.time * 1000);
		}	
	}
	
	$.app.clearTimelineListener = function() {
		if($.app.timelineListening) {
			clearInterval($.app.timelineListening);
			$.app.timelineListening = null;
		}	
	}
	
	$.app.addTrackAction = function(action) {
		if(!$.app.track) {
			$.app.track = {};
			$.state.storevalue.track = $.app.track;
		}
		$.app.track.action = action;
	}
	
	$.app.addTrackSinceId = function(id) {
		if(!$.app.track) {
			$.app.track = {};
			$.state.storevalue.track = $.app.track;
		}
		$.app.track.since_id = id;
	}
	
	$.app.getNewFriendsTimeline = function() {
		var api = $.api.current();
		if(api) {
			
			var params = {};
			
			if($.app.track && $.app.track.since_id) {
				params.since_id = $.app.track.since_id;
			}
			
			api.statuses.friends_timeline(params, function(results){
				if($.app.track) {
					$.app.track.since_id = results[0].id;
				}
				$.each(results, function(index, value){					
					if($.app.track && $.app.track.action == 'friends_timeline') {
						$("#content").addTweetPanel(value);
					}
	    		});
			});
			//$.app.clearTimelineListener();
		}
	}
	
})(jQuery);