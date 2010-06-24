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
		
		var searchfield = document.createElement("div");
		searchfield.className = "searchfield";
		searchfield.innerHTML = '<div class="searchtextdiv"><input type="text" id="condition" name="condition" class="searchtext round-left"/></div>'
		+'<div id="search_submit" class="searchbutton round-right" onclick="SearchWindow.search();"></div>'	;
		
		$(searchfield).appendTo(searchDiv);
		
		
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