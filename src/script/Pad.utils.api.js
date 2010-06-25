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
	
	$.api = function(account){
		if(account.type == 'cnfol') {
			if(account.username && account.password) {
				$.cnfol.username = account.username;
				$.cnfol.password = account.password;
			}
			$.api.current = $.cnfol;
			return $.cnfol;
		}
		
		if(account.type == 'twitter') {
			if(account.username && account.password) {
				$.twitter.username = account.username;
				$.twitter.password = account.password;
			}
			$.api.current = $.twitter;
			return $.twitter;
		}
		
		if(account.type == 'sohu') {
			if(account.username && account.password) {
				$.sohu.username = account.username;
				$.sohu.password = account.password;
			}
			$.api.current = $.sohu;
			return $.sohu;
		}
		
		if(account.type == 'api9911') {
			if(account.username && account.password) {
				$.api9911.username = account.username;
				$.api9911.password = account.password;
			}
			$.api.current = $.api9911;
			return $.api9911;
		}
		
		if(account.type == 'digu') {
			if(account.username && account.password) {
				$.digu.username = account.username;
				$.digu.password = account.password;
			}
			$.api.current = $.digu;
			return $.digu;
		}
		
		if(account.type == 'renjian') {
			if(account.username && account.password) {
				$.renjian.username = account.username;
				$.renjian.password = account.password;
			}
			$.api.current = $.renjian;
			return $.renjian;
		}
		
		if(account.type == 'sina') {
			if(account.username && account.password) {
				$.sina.username = account.username;
				$.sina.password = account.password;
			}
			$.api.current = $.sina;
			return $.sina;
		}
		
		if(account.type == 'tongxue') {
			if(account.username && account.password) {
				$.tongxue.username = account.username;
				$.tongxue.password = account.password;
			}
			$.api.current = $.tongxue;
			return $.tongxue;
		}
		
		if(account.type == 'zuosa') {
			if(account.username && account.password) {
				$.zuosa.username = account.username;
				$.zuosa.password = account.password;
			}
			$.api.current = $.zuosa;
			return $.zuosa;
		}
	}
	
	$.api.current = $.cnfol;
})(jQuery);