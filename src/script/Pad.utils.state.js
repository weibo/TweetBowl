/**
 * This jQuery plugin about system state.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.state = {
		enable		: true,
		storekey	: 'STATE_STORE_KEY',
		storevalue	: {}
	};	
	$.state.Manager = {};
	$.state.Manager.save = function() {
		$.account.save();
		var bytes = new air.ByteArray();
		var value = $.encode($.state.storevalue);
		bytes.writeUTFBytes(value);
		air.EncryptedLocalStore.setItem($.state.storekey, bytes);
	}
	$.state.Manager.read = function() {
		var storedValue = air.EncryptedLocalStore.getItem($.state.storekey);
		if (storedValue) {
			var value = storedValue.readUTFBytes(storedValue.length);
			if(value) {
				$.state.storevalue = $.decode(value);
			}
		}
	}
	
})(jQuery);