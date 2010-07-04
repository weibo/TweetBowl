/**
 * Tweet Cache
 * @author helio
 */
(function($){
	
	$.tweetCache = {
		tweets : new Array(),	
		busy : false
	}
	
	$.tweetCache.merge = function(newtweets) {		
		$.merge(newtweets, $.tweetCache.tweets);
		$.tweetCache.tweets = newtweets;
		$.unique($.tweetCache.tweets);
	}
	
	$.tweetCache.pop = function() {
		var length = $.tweetCache.tweets.length;
		if(length) {
			var tweet = $.tweetCache.tweets[length - 1];
			$.tweetCache.tweets.splice(length - 1, 1);
			return tweet;
		}
	}
	
	$.tweetCache.empty = function() {
		$.tweetCache.tweets = new Array();
	}
	
	$.tweetCache.length = function() {
		return $.tweetCache.tweets.length;
	}
	
})(jQuery);