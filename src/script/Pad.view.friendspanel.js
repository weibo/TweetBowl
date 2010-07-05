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
	
	$.buildFriendsPanel = function() {
		var friendsPanel = document.createElement("div");
		friendsPanel.className = "friendspanel";
		
		$("<ul></ul>").appendTo(friendsPanel);
		
		return friendsPanel;
	};
	
	$.buildFriendsList = function(friends) {
		$(".friendspanel ul").empty();
		$.each(friends, function(index, value){
			$("<li name='"+value.name+"'><img src='"+value.profile_image_url+"' width='24' height='24'/><span>"+value.screen_name+"</span></li>").appendTo(".friendspanel ul").bind('click', function(){
				$.app.addTrackAction('user_timeline');
				$.app.track.user = {id:value.id,name:value.name};
				$.api.current().statuses.user_timeline($.app.track.user, function(results){
					$("#content").empty();
					$.each(results, function(index, value){						
						$("#content").addTweetPanel(value);						
		    		});
				});
			});
		});
	}
	
	$.fn.friendsPanel = function() {
		
		if(!$(this)[0]){
			var friendsPanel = $.buildFriendsPanel();
			$('.navipanelfriends').append(friendsPanel);
			
			$('.navipanelfriends').hover(
				function () {
					if($.api.current().results.tweetcache.friends[$.api.current().username]) {
						$.buildFriendsList($.api.current().results.tweetcache.friends[$.api.current().username]);
					} else {
						$.api.current().friends({}, function(friends) {
							$.buildFriendsList(friends);
						});
					}			
					$('.friendspanel').slideDown(100);				
				}, 
				function () {
					$('.friendspanel').slideUp(100);			
				}
			);
		}
		
		$('.friendspanel').slideDown(100);
		$.api.current().friends({}, function(friends) {
			$.buildFriendsList(friends);
		});
	}
	
})(jQuery);