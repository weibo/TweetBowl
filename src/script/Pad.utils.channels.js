/**
 * This jQuery plugin check url in adobe air.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.channel = {
		channels : []
	};
	
	$.channel.push = function(text) {
		
		$.each($.channel.channels, function(index,value){
			if(value.text == text) {
				value.number++;
				text = null;
				return false;
			}
		});
		
		if(text) {
			$.channel.channels.push({text:text,number:1});
		}
	}
})(jQuery);