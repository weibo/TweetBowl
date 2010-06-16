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
	
	function reply(id) {
		alert(id);
	};
	
	$.buildTweetPanel = function(tweet) {
		var panelDiv = document.createElement("div");
		panelDiv.className = "tweetpanel";
		
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
		toolsDiv.innerHTML = "<li>收藏</li><li class='retweet'>转发</li><li class='reply'>回复</li>";
		titleDiv.appendChild(toolsDiv);
		
		var contentDiv = document.createElement("div");
		contentDiv.className = "tweetpanelbody";
		contentDiv.innerHTML = "<div class='tweetcontent'>" + tweet.text + "</div>";
		
		var footerDiv = document.createElement("div");
		footerDiv.className = "tweetpanelfooter";
		var createDate = new Date(tweet.created_at);
		footerDiv.innerHTML = "<div class='create_date'>" + createDate.format("Y-m-d H:i:s") + "</div>";
		
		panelDiv.appendChild(titleDiv);
		panelDiv.appendChild(contentDiv);
		panelDiv.appendChild(footerDiv);		
		
		return panelDiv;
	},
	
	$.fn.addTweetPanel = function(tweet) {		
		if($(this)[0]){
			var tweetPanel = $.buildTweetPanel(tweet);
			$(this).append(tweetPanel);
			$(tweetPanel).bind('click', function(){
				//$(this).hide();
			});
			$("li.reply", tweetPanel).bind('click', function(){
				//alert(tweet.id);
				
				$('#updatewindow').css('display','block');
			});
			
		}
	}
	
})(jQuery);