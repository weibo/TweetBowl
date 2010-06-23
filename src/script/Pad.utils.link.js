/**
 * This jQuery plugin check url in adobe air.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.link = {};
	
	$.link.check = function(text) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
		var urlArray = regexp.exec(text);
		if(urlArray && urlArray.length > 0) {
			var url = urlArray[0];
			var a = '<a href="#" class="urllink">' + url + '</a>';
			text = text.replace(url,a);
		}
		return text;
	}
	
	$.fn.addLink = function() {
		if($(this)[0]) {
			$('.urllink', this).bind('click', function(){
				var url = $(this).html();
				var urlReq = new air.URLRequest(url); 
				air.navigateToURL(urlReq);
			});
		}
	}
})(jQuery);