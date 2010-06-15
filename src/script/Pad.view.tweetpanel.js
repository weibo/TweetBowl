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
		
		var contentDiv = document.createElement("div");
		contentDiv.className = "tweetpanelbody";
		contentDiv.innerHTML = "<div class='tweetcontent'>" + tweet.text + "</div>";
		
		panelDiv.appendChild(titleDiv);
		panelDiv.appendChild(contentDiv);
		
		return panelDiv;
	},
	
	$.fn.addTweetPanel = function(tweet) {		
		if($(this)[0]){
			var tweetPanel = $.buildTweetPanel(tweet);
			$(this).append(tweetPanel);
			
			//$(this).append("<div class='tweetpanel'><div class='tweetpaneltitle'><div class='profile_image_url'></div>"+tweet.name+"</div><div class='tweetcontent'>"+tweet.text+"</div></div>");
			
		}
	}
	
})(jQuery);