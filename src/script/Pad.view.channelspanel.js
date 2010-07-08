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
	
	$.buildChannelsPanel = function() {
		var channelspanel = document.createElement("div");
		channelspanel.className = "channelspanel";
		
		var descripanel = document.createElement("div");
		descripanel.className = "descripanel";
		
		$("<span>通过我的广播频道，可以做商品营销，做产品宣传，可以跟客户进行交流。<span>").appendTo(descripanel);
		
		$(descripanel).appendTo(channelspanel);
		
		return channelspanel;
	},
	
	$.fn.channelsPanel = function() {		
		if($(this)[0]){
			$(this).append($.buildChannelsPanel());
			
			
		}
	}
	
})(jQuery);