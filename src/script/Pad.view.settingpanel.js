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
		leftDiv.innerHTML = "<ul></ul>";
		
		$("ul", leftDiv).append("<li><a class='cnfol'>中金在线微博</a></li>");
		//$("ul", leftDiv).append("<li><a class='twitter'>Twitter(推特)</a></li>");
		//$("ul", leftDiv).append("<li><a class='sohu'>搜狐微博</a></li>");
		//$("ul", leftDiv).append("<li><a class='sina'>新浪微博</a></li>");
		//$("ul", leftDiv).append("<li><a class='api9911'>9911微博客</a></li>");
		//$("ul", leftDiv).append("<li><a class='digu'>digu嘀咕</a></li>");
		//$("ul", leftDiv).append("<li><a class='renjian'>人间网微社区</a></li>");
		//$("ul", leftDiv).append("<li><a class='tongxue'>同学网</a></li>");
		//$("ul", leftDiv).append("<li><a class='zuosa'>做啥网zuosa</a></li>");
		
		if($.account.accounts.length) {
			$(leftDiv).append("<div>已经添加的微博<ul></ul></div>");
			$.each($.account.accounts, function(index, value){				
				$('div ul', leftDiv).addAccountItem(value);
			});
		}
		
		$("<ul><li><a class='setting'>系统设置</a></li></ul>").appendTo(leftDiv).bind('click', function(){
			$(".settingpanel .rightcontainer").empty();
			$(".settingpanel .rightcontainer").skinPanel();
		});
		
		
		var rightDiv = document.createElement("div");
		rightDiv.className = "settingpanelright";
		rightDiv.innerHTML = "<div class='rightcontainer'></div>";
		
		settingDiv.appendChild(leftDiv);
		settingDiv.appendChild(rightDiv);
		
		return settingDiv;
	},
	
	$.fn.addAccountItem = function(account) {
		var namelist = document.createElement("li");
		
		var link = document.createElement("a");
		link.name = account.username;
		link.type = account.type;
		link.innerHTML = "<img src='"+account.profile_image_url+"' width='16' height='16'/>" + account.screen_name;
		
		$(link).appendTo(namelist).bind('click', function(){
			if($(this)[0]){
				var account = {
					username: $(this).attr('name'),
					type : $(this).attr('type')
				};
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").accountPanel(account);
			}
		});
		
		if($(this)[0]) {
			$(this).append(namelist);
		} else {
			$(".settingpanelleft").append("<div>已经添加的微博<ul></ul></div>");
			$(".settingpanelleft div ul").append(namelist);
		}
		
	}
	
	$.fn.settingPanel = function() {		
		if($(this)[0]){
			var settingPanel = $.buildSettingPanel();
			$(this).empty();
			$(this).append(settingPanel);			
			
			$(".settingpanel .rightcontainer").append("<div class='descri'>百家微博可以帮你同时管理多个微博帐户。帐户之间切换方便。</div>");			
			
			$('li',settingPanel).bind('click', function(){
				if($(this)[0]){
					$(".settingpanel li.selected").removeClass("selected");
					$(this).addClass("selected");
				}
			});
			
			$('a.cnfol',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("cnfol");
			});
			
			$('a.twitter',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("twitter");
			});
			
			$('a.sohu',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("sohu");
			});
			
			$('a.api9911',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("api9911");
			});
			
			$('a.digu',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("digu");
			});
			
			$('a.renjian',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("renjian");
			});
			
			$('a.sina',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("sina");
			});
			
			$('a.tongxue',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("tongxue");
			});
			
			$('a.zuosa',this).bind('click', function(){
				$(".settingpanel .rightcontainer").empty();
				$(".settingpanel .rightcontainer").loginPanel("zuosa");
			});
		}
	}
	
})(jQuery);