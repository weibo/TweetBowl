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
	
	$.buildSettingPanel = function(tweet) {
		var settingDiv = document.createElement("div");
		settingDiv.className = "settingpanel";
		
		var leftDiv = document.createElement("div");
		leftDiv.className = "settingpanelleft";
			
		$("<ul><li><a class='cnfol'>中金在线微博</a></li></ul>").appendTo(leftDiv);
		
		
		if($.account.accounts.length) {
			$(leftDiv).append("<div>已经添加的微博<ul></ul></div>");
			$.each($.account.accounts, function(index, value){
				
				var namelist = document.createElement("li");
				
				var link = document.createElement("a");
				link.name = value.username;
				link.type = value.type;
				link.innerHTML = "<img src='"+value.profile_image_url+"' width='16' height='16'/>" + value.screen_name;
				
				$(link).appendTo(namelist).bind('click', function(){
					if($(this)[0]){
						air.trace($(this).attr('name'));
					}
				});
				
				$("div ul", leftDiv).append(namelist);
			});
		}
		
		
		var rightDiv = document.createElement("div");
		rightDiv.className = "settingpanelright";
		rightDiv.innerHTML = "<div class='rightcontainer'></div>";
		
		settingDiv.appendChild(leftDiv);
		settingDiv.appendChild(rightDiv);
		
		return settingDiv;
	},
	
	$.fn.settingPanel = function() {		
		if($(this)[0]){
			var settingPanel = $.buildSettingPanel();
			$(this).append(settingPanel);
			
			$('li',settingPanel).bind('click', function(){
				if($(this)[0]){
					$(".settingpanel li.selected").removeClass("selected");
					$(this).addClass("selected");
				}
			});
			
			$('a.cnfol',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel();
			});
		}
	}
	
})(jQuery);