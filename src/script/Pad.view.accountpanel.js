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
	
	$.buildAccountPanel = function(account) {
		var accountDiv = document.createElement("div");
		accountDiv.className = "accountpanel";
		
		var detailDiv = document.createElement("div");
		detailDiv.className = "accountdetail";
		
		$("<img src='"+account.profile_image_url+"' />").appendTo(detailDiv);
		//$("<div>"+account.screen_name+"</div>").appendTo(detailDiv);
		
		$(accountDiv).append(detailDiv);
		
		return accountDiv;
	},
	
	$.fn.accountPanel = function(account) {		
		if($(this)[0]){
			var accountInfo = $.account.find(account);
			
			if(accountInfo) {
				$.api(accountInfo).verify(accountInfo, function(response,options){
					air.trace(response.responseText);
					var userInfo = Ext.decode(response.responseText);
					accountInfo = $.extend(accountInfo,userInfo||{});
					var accountPanel = $.buildAccountPanel(accountInfo);
					
					air.trace($(accountPanel).context);
					//$(accountPanel).appendTo(this);
					$(this).append("<div>"+accountInfo.screen_name+"</div>");
				});
			}
			
		}
	}
	
})(jQuery);