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
	
	$.account = {
		accounts:[],
		storekey:'ACCOUNTS_STORE_KEY'
	}
	
	$.account.save = function() {
		$.state.storevalue.accounts = $.account.accounts;
	}
	
	$.account.read = function() {		
		if($.state.storevalue.accounts) {
			$.account.accounts = $.state.storevalue.accounts;
		}
	}
	
	$.account.add = function(account) {
		if($.account.find(account)) {
			$.account.remove(account);
		}
		$.account.accounts.push(account);
	}
	
	$.account.remove = function(account) {
		for(var i = 0; i < $.account.accounts.length; i++) {			
			var current = $.account.accounts[i];
			if(current.type == account.type && current.username == account.username) {
				$.account.accounts.splice(i,1);
				return current;
			}
		}
	}
	
	$.account.find = function(account) {
		for(var i = 0; i < $.account.accounts.length; i++) {			
			var current = $.account.accounts[i];
			if(current.type == account.type && current.username == account.username) {
				return current;
			}
		}
	}
})(jQuery);