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
		
		if(account.type == 'api9911') {
			if(account.username && account.password) {
				$.api9911.username = account.username;
				$.api9911.password = account.password;
			}
			
			return $.api9911;
		}
		
		if(account.type == 'digu') {
			if(account.username && account.password) {
				$.digu.username = account.username;
				$.digu.password = account.password;
			}
			
			return $.digu;
		}
		
		if(account.type == 'renjian') {
			if(account.username && account.password) {
				$.renjian.username = account.username;
				$.renjian.password = account.password;
			}
			
			return $.renjian;
		}
		
		if(account.type == 'sina') {
			if(account.username && account.password) {
				$.sina.username = account.username;
				$.sina.password = account.password;
			}
			
			return $.sina;
		}
		
		if(account.type == 'tongxue') {
			if(account.username && account.password) {
				$.tongxue.username = account.username;
				$.tongxue.password = account.password;
			}
			
			return $.tongxue;
		}
		
		if(account.type == 'zuosa') {
			if(account.username && account.password) {
				$.zuosa.username = account.username;
				$.zuosa.password = account.password;
			}
			
			return $.zuosa;
		}
	}
})(jQuery);