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
	
	$.buildSearchPanel = function(tweet) {
		var searchPanel = document.createElement("div");
		searchPanel.className = "searchpanel";
		
		$("<div class='searchfield'><input type='text' name='keyword' class='searchtext'/><div class='searchbutton'>检索</div></div>").appendTo(searchPanel);
		
		if($.searchHistory && $.searchHistory.length) {
			$("<div class='historyfield'><span class=''>最近关注的话题</span><hr/></div>").appendTo(searchPanel);
			
			$.each($.searchHistory, function(index, value){
				$('.historyfield', searchPanel).append("<div>"+value+"</div>");
			});
		}
		
		return searchPanel;
	};
	
	$.buildHashTagPanel
	
	$.historyKeyword = function(keyword) {
		if(!$.searchHistory) {
			$.searchHistory = [keyword];
			$.state.storevalue.searchhistory = $.searchHistory;
		} else {			
			$.each($.searchHistory, function(index, value){
				if(value == keyword) {
					$.searchHistory.splice(index,1);
					return false;
				}
			});
			
			$.searchHistory.push(keyword);
			if($.searchHistory.length > 20) {
				$.searchHistory.splice(0,1);
			}			
		}
	}
	
	$.fn.searchPanel = function() {		
		if($(this)[0]){
			
			if($.state.storevalue.searchhistory) {
				$.searchHistory = $.state.storevalue.searchhistory;
			}
			
			var searchPanel = $.buildSearchPanel();
			$(this).empty();
			$(this).append(searchPanel);
			
			$('.searchbutton', searchPanel).bind('click', function(){
				var keyword = $(':input[name=keyword]', searchPanel).val();
				if(keyword) {
					
					$.api.current().search({q:keyword}, function(results){
						$("#content").empty();
						$.each(results, function(index, value){						
							$("#content").addTweetPanel(value);						
			    		});
					});
					
					$.historyKeyword(keyword);
				}
			});
			
			$('.historyfield div', searchPanel).bind('click', function(){
				var keyword = $(this).html();
				if(keyword) {
					
					$.api.current().search({q:keyword}, function(results){
						$("#content").empty();
						$.each(results, function(index, value){						
							$("#content").addTweetPanel(value);						
			    		});
					});
					
					$.historyKeyword(keyword);
				}
			});
			
			$.api.current().search({q:$.channel.keyword}, function(results){
				
				$.each(results, function(index, value){
					var channel = $.trim(value.text.replace($.channel.keyword, ''));
					if(channel) {
						$.channel.push(channel);
					}
	    		});
				
				if($.channel.channels && $.channel.channels.length) {
					$("<br/><br/><div class='channelsfield'><span class=''>推荐广播频道</span><hr/></div>").appendTo('.searchpanel');
					
					$.each($.channel.channels, function(index, value){
						$('.searchpanel .channelsfield').append("<div>"+value.text+"</div>");
					});
					
					$('.channelsfield div').bind('click', function(){
						var keyword = $(this).html();
						if(keyword) {
							
							$.api.current().search({q:keyword}, function(results){
								$("#content").empty();
								$.each(results, function(index, value){						
									$("#content").addTweetPanel(value);						
					    		});
							});
						}
						$.channel.current = keyword;
					});
				}
			});
		}
	}
	
})(jQuery);