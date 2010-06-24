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
		text = $.link.jsubb(text);
		var regexp = /[^'"=>]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?([.\w+\/%-_]+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
		var number = 0;
		while((urlArray = regexp.exec(" " + text))) {
			var url = urlArray[1];
			var a = '<a href="#" src="'+url+'" class="urllink">' + url + '</a>';
			text = text.replace(url,a);
			number ++;
			if(number > 9) {
				break;
			}
		}
		return text;
	}
	
	$.fn.addLink = function() {
		if($(this)[0]) {
			$('.urllink', this).bind('click', function(){
				var url = $(this).attr('src');
				var urlReq = new air.URLRequest(url); 
				air.navigateToURL(urlReq);
			});
		}
	}
	
	$.link.jsubb = function(text) {
		
		var regexp = /\[url=((ftp|http|https):\/\/(\w+:{0,1}\w*@)?[.\w+\/%-_]+)\]([^:\]@]+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\[\/url\]/gi;
		var number = 0;
		while((arr = regexp.exec(text))) {			
			var a = '<a href="#" src="'+arr[1]+'" class="urllink">' + arr[4] + '</a>';
			text = text.replace(arr[0],a);	
			number ++;
			if(number > 9) {
				break;
			}
		}
		return text;
	}
})(jQuery);