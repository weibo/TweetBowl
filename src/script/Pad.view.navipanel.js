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
	
	$.buildNaviPanel = function(tweet) {
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
	
	$.fn.addNaviPanel = function() {		
		if($(this)[0]){
			var tweetPanel = $.buildNaviPanel();
			$(this).append(tweetPanel);
			
			$(tweetPanel).bind('click', function(){
				$(this).fadeIn("slow");
				var position = $(this).position();
			});
			$("li.reply", tweetPanel).bind('click', function(){
				
				var position = $(this).position();
				
				$.replywindow.show(position,tweet);
			});
			$("li.retweet", tweetPanel).bind('click', function(){
				
				var position = $(this).position();
				
				$.updatewindow.show(position, tweet.id);
			});
		}
	}
	
})(jQuery);