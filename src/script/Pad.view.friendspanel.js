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
	
	$.buildSearchPanel = function(tweet) {
		var searchPanel = document.createElement("div");
		searchPanel.className = "searchpanel";
		
		$("<div class='searchfield'><input type='text' name='keyword' class='searchtext'/><div class='searchbutton'>检索</div></div>").appendTo(searchPanel);
		
		if($.searchHistory && $.searchHistory.length) {
			$("<div class='historyfield'><span class=''>最近关注的话题</span><hr/></div>").appendTo(searchPanel);
			
			$.each($.searchHistory, function(index, value){
				$('.historyfield', searchPanel).append("<div>"+value+"</div>");
			});
		}
		
		return searchPanel;
	};
	
	$.fn.friendsPanel = function() {		
		if($(this)[0]){
			
			var friendsPanel = $.buildSearchPanel();
			$(".friendspanel").append(friendsPanel);
			$(".friendspanel").fadeIn('slow');
			
		}
	}
	
})(jQuery);