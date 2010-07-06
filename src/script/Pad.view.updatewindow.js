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
	
	$.updatewindow = {};
	
	$.updatewindow.show = function(position) {

		if(position.left + $('#updatewindow').outerWidth(true) > 800) {
			$('#updatewindow').css('left',position.left - $('#updatewindow').outerWidth(true));
		} else {
			$('#updatewindow').css('left',position.left);
		}
		
		if(position.top + $('#updatewindow').outerHeight(true) > 600) {
			$('#updatewindow').css('top',position.top - $('#updatewindow').outerHeight(true));
		} else {
			$('#updatewindow').css('top',position.top);
		}
		$('#updatewindow').fadeIn('slow');
		$("#updatewindow #updatetext").focus();
	}
	
	$.updatewindow.checkLength = function(textArea) {
		var length = 140 - textArea.value.length;
		if(length > 0) {
			$("#updatewindow #fontleft").html(length);
		} else {
			$("#updatewindow #fontleft").html('<font color="red">' + length + '</font>');
		}
	}
	
	$.updatewindow.update = function(form) {
		if(form) {
			var updatetext = form.elements["updatetext"].value;
			
			if(updatetext) {
				$.api.current().update({status:updatetext}, function(){
					form.reset();
					$('#updatewindow').fadeOut('slow');
					$("#updatewindow #fontleft").html(140);
					
					$('.messagedialog').message('发布成功！！！','info');
				});
			}
		}		
	}
	
	$.updatewindow.cancel = function(form) {
		if(form) {
			form.reset();
			$('#updatewindow').fadeOut('slow');
			$("#updatewindow #fontleft").html(140);
		}		
	}
	
	/**
	 * 回复窗口
	 */
	$.replywindow = {};
	
	$.replywindow.show = function(position, tweet) {
		if(tweet && tweet.id) {
			$.replywindow.tweet = tweet;
			
			$('#replywindow .profile_image_url').html("<img src='"+tweet.user.profile_image_url+"' width='32px' height='32px'/>");
			$('#replywindow .screen_name').html(tweet.user.screen_name);
			
			if(!$.api.current().config.reply_auto) {
				$('#replywindow #updatetext').val("@" + tweet.user.screen_name);
			}
			
			if(position.left + $('#replywindow').outerWidth(true) > 800) {
				$('#replywindow').css('left',position.left - $('#replywindow').outerWidth(true));
			} else {
				$('#replywindow').css('left',position.left);
			}
			
			if(position.top + $('#replywindow').outerHeight(true) > 600) {
				$('#replywindow').css('top',position.top - $('#replywindow').outerHeight(true));
			} else {
				$('#replywindow').css('top',position.top);
			}
			$('#replywindow').fadeIn('slow');
			$("#replywindow #updatetext").focus();
		}
	}
	
	$.replywindow.checkLength = function(textArea) {
		var length = 140 - textArea.value.length;
		if(length > 0) {
			$("#replywindow #fontleft").html(length);
		} else {
			$("#replywindow #fontleft").html('<font color="red">' + length + '</font>');
		}
	}
	
	$.replywindow.update = function(form) {
		if(form) {
			var updatetext = form.elements["updatetext"].value;
			
			if(updatetext) {
				$.api.current().update({status:updatetext,in_reply_to_status_id:$.replywindow.tweet.id}, function(){
					form.reset();
					$('#replywindow').fadeOut('slow');
					$("#replywindow #fontleft").html(140);
					
					$('.messagedialog').message('回复成功！！！','info');
				});
			}
		}		
	}
	
	$.replywindow.cancel = function(form) {
		if(form) {
			form.reset();
			$('#replywindow').fadeOut('slow');
			$("#replywindow #fontleft").html(140);
		}		
	}
	
})(jQuery);