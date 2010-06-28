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
	
	$.buildLoginPanel = function(type) {
		var loginDiv = document.createElement("div");
		loginDiv.className = "loginpanel";
		loginDiv.innerHTML = "<form><div></div><table></table></form>"
		
		if(type == 'cnfol') {
			$("form div",loginDiv).first().html("＂中金在线 微博 是一个全新打造的互动社区，我们用140个字记录，关注财经你我，分享投资生活。＂");
		} else if(type == 'twitter') {
			$("form div",loginDiv).first().html("\"Discover what’s happening right now, anywhere in the world\"")
		} else if(type == 'sohu') {
			$("form div",loginDiv).first().html("＂写句话，发张图片，记录点滴瞬间。＂");
		} else if(type == 'sina') {
			$("form div",loginDiv).first().html("＂暂未不支持。＂");
		} else if(type == 'digu') {
			$("form div",loginDiv).first().html("＂嘀咕是我们普通人交流平凡生活的微博客，随时随地拍照记录所见所感，分享每一个生活点滴。＂");
		} else if(type == 'renjian') {
			$("form div",loginDiv).first().html("＂人与人之间的网络。＂");
		} else if(type == 'tongxue') {
			$("form div",loginDiv).first().html("＂创造你的影响力！＂");
		} else if(type == 'zuosa') {
			$("form div",loginDiv).first().html("＂迷你博客。记录生活。一次一句。即时分享。关注好友。你在做啥？＂");
		}
		
		$("table",loginDiv).append("<tr><td style='text-align:right; width:100px;'>用户名：</td><td><input type='text' name='username' style='width:120px;height:20px;'></td></tr>");
		
		$("table",loginDiv).append("<tr><td style='text-align:right;'>密码：</td>	<td><input type='password' name='password' style='width:120px;height:20px;'></td></tr>");
		
		$("table",loginDiv).append("<tr><td colspan='2' style='text-align:center;'><input type='button' value='添加' class='btn-image btn-login'/></td></tr>");
		
		return loginDiv;
	},
	
	$.fn.loginPanel = function(type) {		
		if($(this)[0]){
			var loginPanel = $.buildLoginPanel(type);
			$(this).append(loginPanel);
			
			$('input.btn-login',loginPanel).bind('click', function(){
				if($(this)[0]){
					var account = {
						username : $("input[name='username']").val(),
						password : $("input[name='password']").val(),
						type: type
					}
					
					if(account.username && account.password) {
						$.login(account);
					}
				}
			});
			
		}
	}
	
	$.login = function(account) {
		$.api.find(account).verify(account, function(userInfo){
			userInfo.username = account.username;
			userInfo.password = account.password;
			userInfo.type = account.type;
			
			$.account.add(userInfo);
			
			$('.messagedialog').message('添加微博帐户成功！！！','info');
			$(".settingpanelleft div ul").addAccountItem(userInfo);
			$(".loginpanel form")[0].reset();
		})
	}
	
})(jQuery);