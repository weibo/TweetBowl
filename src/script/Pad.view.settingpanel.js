/**
 * This jQuery plugin displays native window in adobe air.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.buildSettingPanel = function(tweet) {
		var settingDiv = document.createElement("div");
		settingDiv.className = "settingpanel";
		
		var leftDiv = document.createElement("div");
		leftDiv.className = "settingpanelleft";
		leftDiv.innerHTML = "<ul></ul>";
		
		$("ul", leftDiv).append("<li><a class='sina'>新浪微博</a></li>");
		$("ul", leftDiv).append("<li><a class='sohu'>搜狐微博</a></li>");
		$("ul", leftDiv).append("<li><a class='twitter'>Twitter</a></li>");
		$("ul", leftDiv).append("<li><a class='cnfol'>中金在线微博</a></li>");
		$("ul", leftDiv).append("<li><a class='api9911'>9911微博客</a></li>");
		$("ul", leftDiv).append("<li><a class='digu'>digu嘀咕</a></li>");
		$("ul", leftDiv).append("<li><a class='renjian'>人间网微社区</a></li>");
		$("ul", leftDiv).append("<li><a class='tongxue'>同学网</a></li>");
		//$("ul", leftDiv).append("<li><a class='zuosa'>做啥网zuosa</a></li>");
		
		if($.account.accounts.length) {
			$(leftDiv).append("<div>已经添加的微博<ul></ul></div>");
			$.each($.account.accounts, function(index, value){				
				$('div ul', leftDiv).addAccountItem(value);
			});
		}
		
		var othersDiv = document.createElement("ul");
		othersDiv.className = "others";
		leftDiv.appendChild(othersDiv);
//		$("<li><a class='channels'>我的广播频道</a></li>").appendTo(othersDiv).bind('click', function(){
//			$(".settingpanel .rightcontainer").empty();
//			$(".settingpanel .rightcontainer").channelsPanel();
//		});		
		$("<li><a class='setting'>系统设置</a></li>").appendTo(othersDiv).bind('click', function(){
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
			
			$(".settingpanel .rightcontainer").append("<div class='descri'></div>");
			$("<p>1.支持我的主页、@我的、好友微博、发布微博、转发微博等基本操作。<p>").appendTo(".rightcontainer .descri");
			$("<p>2.支持多个微博帐户同时登录，可以帮你同时管理多个微博帐户，帐户之间切换方便。<p>").appendTo(".rightcontainer .descri");
			$("<p>3.支持实时信息监听，可以监听好友实时发布的微博。<p>").appendTo(".rightcontainer .descri");
			$("<p>目前支持的微博有：<br/>新浪微博、搜狐微博、Twitter（大陆以外地区）、中金在线微博、9911微博、Digu嘀咕、人间网微博、同学网。<p>").appendTo(".rightcontainer .descri");
			
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