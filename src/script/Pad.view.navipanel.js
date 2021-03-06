/**
 * This jQuery plugin displays native window in adobe air.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.buildNaviPanel = function() {
		var panelDiv = document.createElement("div");
		panelDiv.className = "navipanel";
		
		$("<div class='navipanelhome'></div>").appendTo(panelDiv).bind('click', function(){
			$.app.addTrackAction('friends_timeline');
			
			$.api.current().statuses.friends_timeline({}, function(results){
				$("#content").empty();
				$.app.addTrackSinceId(results[0].id);
				
				$.each(results, function(index, value){						
					$("#content").addTweetPanel(value);						
	    		});
			});
		});
		$("<div class='navipanelmentions'></div>").appendTo(panelDiv).bind('click', function(){
			$.app.addTrackAction('statuses_mentions');
			
			$.api.current().statuses.statuses_mentions({}, function(results){
				$("#content").empty();
				
				$.each(results, function(index, value){						
					$("#content").addTweetPanel(value);						
	    		});
			});
		});
		$("<div class='navipanelfriends'><img src='src/icons/navibar/friends.png' width='16px' height='16px' class='friendsimg'></img></div>").appendTo(panelDiv);
				
		$("<div class='navipanelupdate'></div>").appendTo(panelDiv).bind('click', function(){
			var position = $(this).position();
			position.top = position.top + $(this).outerHeight();
			$.updatewindow.show(position);
		});
		
//		$("<div class='navipanelsearch'></div>").appendTo(panelDiv).bind('click', function(){
//			$.app.addTrackAction('search');
//			$("#content").searchPanel();
//		});
		
		$("<div class='navipanelchannels'><img src='src/icons/navibar/channels.png' width='16px' height='16px' class='channelsimg'/></div>").appendTo(panelDiv);
		
		return panelDiv;
	},
	
	$.buildChannelMenu = function() {		
		if(!$(".navipanelchannels .channelmenu")[0]) {
			$(".navipanelchannels").append("<div class='channelmenu'><ul></ul></div>");
		} else {
			$(".channelmenu ul").empty();
		}
		
		$.each($.channel.favorites, function(index, value){
			$("<li><p>"+(index + 1)+"</p><span>"+value+"</span></li>").appendTo(".channelmenu ul").bind('click', function(){
				$.app.addTrackAction('search_channel');
				$.channel.current = value;
				$.api.current().search({q:value}, function(results){
					$.app.addTrackSinceId(results[0].id);
					$("#content").empty();
					$.each(results, function(index, value){						
						$("#content").addTweetPanel(value);						
			    	});
				});
			});
		});
	}
	
	$.buildTitleMenu = function() {
		var menu = document.createElement("ul");
		menu.className = "menu";
			
		$("<li>添加微博帐户</li>").appendTo(menu).bind('click', function(){
			$.app.addTrackAction('gotosetting');
			$("#content").settingPanel();
		});
		
		$.each($.account.accounts, function(index, value){
			$("<li name='"+value.username+"' type='"+value.type+"'><img src='"+value.profile_image_url+"' width='24' height='24'/><span>"+value.screen_name+"<span></li>").appendTo(menu).bind('click', function(){
				var account = {
					username: $(this).attr('name'),
					type : $(this).attr('type')
				}
				
				$.app.addTrackAction('friends_timeline');
				
				$.account.current = $.account.find(account);
				var api = $.api.find($.account.current);
				$.api.current(api).statuses.friends_timeline({}, function(results){
					$("#content").empty();
					$.app.addTrackSinceId(results[0].id);
					
					$.each(results, function(index, value){
						
						$("#content").addTweetPanel(value);
						
		    		});
				});
			});
		});		
		
		return menu;
	}
	
	$.fn.addNaviPanel = function() {		
		if($(this)[0]){
			
			$('#titlenenu').hover(
				function () {
					$("#titlenenu ul").first().remove();
					$("#titlenenu li").first().append($.buildTitleMenu());
					//show its submenu
					$('ul', this).slideDown(100);
		
				}, 
				function () {
					//hide its submenu
					$('ul', this).slideUp(100);			
				}
			);
			
			var naviPanel = $.buildNaviPanel();
			$(this).append(naviPanel);
			
			$('.navipanelfriends .friendsimg').bind('click', function(){
				$(".friendspanel").friendsPanel();
			});
			
			$('.navipanelchannels').hover(
				function () {
					if($.channel.favorites && $.channel.favorites.length) {
						$.buildChannelMenu();
						$('.channelmenu').slideDown(100);
					}	
				}, 
				function () {
					$('.channelmenu').slideUp(100);			
				}
			);
			
			if($.channel.favorites && $.channel.favorites.length) {
				$('.navipanelchannels').show();
			}
		}
	}
	
})(jQuery);