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
	
	$.buildLoginPanel = function(tweet) {
		var loginDiv = document.createElement("div");
		loginDiv.className = "loginpanel";
		loginDiv.innerHTML = "<form><div></div><table></table></form>"
			
		$("form div",loginDiv).first().html("＂中金在线 微博 是一个全新打造的互动社区，我们用140个字记录，关注财经你我，分享投资生活。＂");
		
		$("table",loginDiv).append("<tr><td style='text-align:right; width:100px;'>用户名：</td><td><input type='text' name='username' style='width:120px;height:20px;'></td></tr>");
		
		$("table",loginDiv).append("<tr><td style='text-align:right;'>密码：</td>	<td><input type='password' name='password' style='width:120px;height:20px;'></td></tr>");
		
		$("table",loginDiv).append("<tr><td colspan='2' style='text-align:center;'><input type='button' value='添加' class='btn-image btn-login'/></td></tr>");
		
		return loginDiv;
	},
	
	$.fn.loginPanel = function() {		
		if($(this)[0]){
			var loginPanel = $.buildLoginPanel();
			$(this).append(loginPanel);
			
			$('input.btn-login',loginPanel).bind('click', function(){
				if($(this)[0]){
					var account = {
						username : $("input[name='username']").val(),
						password : $("input[name='password']").val(),
						type: 'twitter'
					}
					
					if(account.username && account.password) {
						$.login(account);
					}
				}
			});
			
		}
	}
	
	$.login = function(account) {
		$.twitter.verify(account, function(response,options){
			//air.trace(response.responseText);
			var userInfo = Ext.decode(response.responseText);
			userInfo.username = account.username;
			userInfo.password = account.password;
			userInfo.type = account.type;
			$.account.add(userInfo);
			$.account.save();
			
			air.trace('Varify OK');
			
		})
	}
	
})(jQuery);