/**
 * Pop Window Event
 * @author helio
 */
(function($){
	
	$.popwindow = {
		width	: 200,
		height	: 150
	}
	
	$.popwindow.init = function() {
		CALLBACK.init($.popwindow.build);
	}
	
	$.popwindow.build = function(tweet) {
		
		var tweetpanel = $.popwindow.buildTweetPanel(tweet);
		$(tweetpanel).appendTo('.popwindow');
		
		$(tweetpanel).addLink();
		
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
		toolsDiv.innerHTML = "<li class='close'>关闭</li>";
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