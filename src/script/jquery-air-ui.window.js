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
	$.fn.nativeWindow = function(opts) {
		opts = jQuery.extend({
			title: 'Native Window'
		},opts||{});
		
		$('.nativewindow').hide();
	}
})(jQuery);