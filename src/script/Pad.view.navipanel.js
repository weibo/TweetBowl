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
	
	$.buildNaviPanel = function() {
		var panelDiv = document.createElement("div");
		panelDiv.className = "navipanel";
		
		var homeDiv = document.createElement("div");
		homeDiv.className = "navipanelhome";
		
		var updateDiv = document.createElement("div");
		updateDiv.className = "navipanelupdate";
			
		var searchDiv = document.createElement("div");
		searchDiv.className = "navipanelsearch";
		
		panelDiv.appendChild(homeDiv);
		panelDiv.appendChild(updateDiv);	
		panelDiv.appendChild(searchDiv);	
		
		return panelDiv;
	},
	
	$.buildTitleMenu = function() {
		var menu = document.createElement("ul");
		menu.className = "menu";
			
		$("<li>添加微博用戶</li>").appendTo(menu).bind('click', function(){
			$("#content").settingPanel();
		});
		
		$.each($.account.accounts, function(index, value){
			$("<li name='"+value.username+"' type='"+value.type+"'><img src='"+value.profile_image_url+"' width='16' height='16'/>"+value.screen_name+"</li>").appendTo(menu).bind('click', function(){
				var account = {
					username: $(this).attr('name'),
					type : $(this).attr('type')
				}
				
				$.account.current = $.account.find(account);
				var api = $.api.find($.account.current);
				$.api.current(api).statuses.friends_timeline({}, function(results){
					$("#content").empty();
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
			
			$(".navipanelupdate",naviPanel).bind('click', function(){
				var position = $(this).position();				
				$.updatewindow.show(position);
			});
			
			$(".navipanelhome",naviPanel).bind('click', function(){
				$.api.current().statuses.friends_timeline({}, function(results){
					$("#content").empty();
					$.each(results, function(index, value){						
						$("#content").addTweetPanel(value);						
		    		});
				});
			});
			
			$(".navipanelsearch",naviPanel).bind('click', function(){
				$("#content").searchPanel();
			});
		}
	}
	
})(jQuery);