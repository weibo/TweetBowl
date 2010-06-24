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
		var searchDiv = document.createElement("div");
		searchDiv.className = "searchpanel";
		searchDiv.innerHTML = "TEST";
		
		
		return searchDiv;
	};
	
	$.fn.searchPanel = function() {		
		if($(this)[0]){
			var searchPanel = $.buildSearchPanel();
			$(this).empty();
			$(this).append(searchPanel);
		}
	}
	
})(jQuery);