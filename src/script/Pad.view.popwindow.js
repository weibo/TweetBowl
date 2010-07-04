/**
 * Pop Window Event
 * @author helio
 */
(function($){
	
	$.popwindow = {
		time	: 8
	}
	
	$.popwindow.init = function() {
		
		CALLBACK.init($.popwindow.build);
		
		nativeWindow.alwaysInFront = true;		
		setTimeout(function(){nativeWindow.close();}, $.popwindow.time * 1000);
	}
	
	$.popwindow.build = function(result) {
		
		$.popwindow.config = result.config;
		$.popwindow.tweet = result.tweet;
		//创建窗口
		var tweetpanel = $.popwindow.buildTweetPanel($.popwindow.tweet);
		$(tweetpanel).appendTo('.popwindow');
		//设置窗口背景色
		var rgba = $.popwindow.config.rgba;
		$('.popwindow').css('backgroundColor', 'rgba(' + rgba.r + ',' +rgba.g +',' + rgba.b + ',' + rgba.a + ')');
		//设置超连接
		$(tweetpanel).addLink();
		//添加关闭事件
		$("li.close", tweetpanel).bind('click', function(){
			nativeWindow.close();
		});
	}
	
	$.popwindow.buildTweetPanel = function(tweet) {
		var panelDiv = document.createElement("div");
		panelDiv.className = "tweetpanel";
		panelDiv.id = tweet.id;
		
		var titleDiv = document.createElement("div");
		titleDiv.className = "tweetpaneltitle";
		
		var imageDiv = document.createElement("div");
		imageDiv.className = "profile_image_url";
		imageDiv.innerHTML = "<img src='"+tweet.user.profile_image_url+"' width='32px' height='32px'/>";
		titleDiv.appendChild(imageDiv);
		
		var nameDiv = document.createElement("div");
		nameDiv.className = "user_name";
		nameDiv.innerHTML = tweet.user.screen_name;
		titleDiv.appendChild(nameDiv);
		
		var toolsDiv = document.createElement("div");
		toolsDiv.className = "tweetpaneltools";		
		toolsDiv.innerHTML = "<ul><li class='close'>关闭</li></ul>";
		titleDiv.appendChild(toolsDiv);
		
		var contentDiv = document.createElement("div");
		contentDiv.className = "tweetpanelbody";
		contentDiv.innerHTML = "<div class='tweetcontent'>" + $.link.check(tweet.text) + "</div>";
		
		var footerDiv = document.createElement("div");
		footerDiv.className = "tweetpanelfooter";
		var createDate = new Date(tweet.created_at);
		footerDiv.innerHTML = "<div class='create_date'>" + createDate.format("Y-m-d H:i:s") + "</div>";
		
		panelDiv.appendChild(titleDiv);
		panelDiv.appendChild(contentDiv);
		panelDiv.appendChild(footerDiv);		
		
		return panelDiv;
	};
})(jQuery);