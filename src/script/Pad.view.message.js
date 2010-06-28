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
	
	$.message = {};
	
	$.fn.message = function(info, type){
		if(type && type == 'info') {
			$(this).backgroundColor($.nativeWindow.config.rgba);
			$(this).css('left', (window.nativeWindow.width - 250) / 2);
			$(this).css('top',  (window.nativeWindow.height - 250) / 2);
			$(this).fadeIn("slow");
			
			$('.message', this).html(info);
		} else if(info == 'close' || type == 'close') {
			$(this).fadeOut("slow");
		}
	}
	
	$.message.showLoadMask = function(){
		$('.windowfooter .loading').fadeIn("slow");
	}
	
	$.message.hideLoadMask = function(){
		$('.windowfooter .loading').fadeOut("slow");
	}
	
})(jQuery);