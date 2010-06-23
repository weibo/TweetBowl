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
			
			return $.cnfol;
		}
		
		if(account.type == 'twitter') {
			if(account.username && account.password) {
				$.twitter.username = account.username;
				$.twitter.password = account.password;
			}
			
			return $.twitter;
		}
		
		if(account.type == 'sohu') {
			if(account.username && account.password) {
				$.sohu.username = account.username;
				$.sohu.password = account.password;
			}
			
			return $.sohu;
		}
	}
})(jQuery);