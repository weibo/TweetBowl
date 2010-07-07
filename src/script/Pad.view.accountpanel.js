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
		$("<div class='screen_name'>"+account.screen_name+"</div>").appendTo(detailDiv);
		$("<div class='followers_count'>被关注<b>"+account.followers_count+"</b></div>").appendTo(detailDiv);
		$("<div class='friends_count'>关注<b>"+account.friends_count+"</b></div>").appendTo(detailDiv);
		if(account.statuses_count) {
			$("<div class='statuses_count'>我的微博<b>"+account.statuses_count+"</b></div>").appendTo(detailDiv);
		}
		
		$("<div class='btn_delete' name='"+account.username+"' type='"+account.type+"'>删除</div>").appendTo(detailDiv);
		$("<hr/>").appendTo(detailDiv);
		
		if(account.status) {
			$("<div class='text'>"+$.link.check(account.status.text)+"</div>").appendTo(detailDiv).addLink();
			var date = new Date(account.status.created_at);
			$("<div class='created_at'>"+date.format("yyyy-mm-dd HH:MM:ss")+"</div>").appendTo(detailDiv);
		}
		
		$(accountDiv).append(detailDiv);
		
		return accountDiv;
	},
	
	$.fn.accountPanel = function(account) {		
		if($(this)[0]){
			var currentObj = $(this);
			var accountInfo = $.account.find(account);
			
			if(accountInfo) {
				$.api.find(accountInfo).verify(accountInfo, function(userInfo){
					accountInfo = $.extend(accountInfo,userInfo||{});
					var accountPanel = $.buildAccountPanel(accountInfo);
					
					currentObj.empty();
					currentObj.append(accountPanel);
					
					$('.btn_delete', accountPanel).bind('click', function(){
						var account = {
							username: $(this).attr('name'),
							type : $(this).attr('type')
						};
						$.account.remove(account);
						
						$(".settingpanel .rightcontainer").empty();
						$(".settingpanelleft a[name='"+account.username+"'][type='"+account.type+"']").parent().remove();
					});
				});
			}
			
		}
	}
	
})(jQuery);