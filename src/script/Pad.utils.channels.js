/**
 * This jQuery plugin about channel.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.channel = {
		channels	: [],
		favorites	: [],
		keyword		: '#somechannelkey'
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
	
	$.channel.merge = function(subject) {
		if(!$.channel.favorites) {
			$.channel.favorites = [];
			$.channel.favorites.push(subject);
			return true;
		} else {
			$.each($.channel.favorites, function(index, value) {
				if(value == subject) {
					subject = null;
					return false;
				}
			});
			if(subject) {
				$.channel.favorites.push(subject);
				return true;
			}
		}
		return false;
	}
	$.channel.remove = function(subject) {
		$.each($.channel.favorites, function(index, value) {
			if(value == subject) {
				$.channel.favorites.splice(index,1);
				return false;
			}
		});
	}
})(jQuery);