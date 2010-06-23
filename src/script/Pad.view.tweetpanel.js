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
	
	$.buildTweetPanel = function(tweet) {
		var panelDiv = document.createElement("div");
		panelDiv.className = "tweetpanel";
		
		var titleDiv = document.createElement("div");
		titleDiv.className = "tweetpaneltitle";
		
		var imageDiv = document.createElement("div");
		imageDiv.className = "profile_image_url";
		imageDiv.innerHTML = "<img src='"+tweet.user.profile_image_url+"' width='32px' height='32px'/>";
		titleDiv.appendChild(imageDiv);
		
		var nameDiv = document.createElement("div");
		nameDiv.className = "user_name";
		nameDiv.innerHTML = tweet.user.screen_name;
		titleDiv.appendChild(nameDiv);
		
		var toolsDiv = document.createElement("div");
		toolsDiv.className = "tweetpaneltools";
		toolsDiv.innerHTML = "<li>收藏</li><li class='retweet'>转发</li><li class='reply'>回复</li>";
		titleDiv.appendChild(toolsDiv);
		
		var contentDiv = document.createElement("div");
		contentDiv.className = "tweetpanelbody";
		contentDiv.innerHTML = "<div class='tweetcontent'>" + $.link.check(tweet.text) + "</div>";
		
		var footerDiv = document.createElement("div");
		footerDiv.className = "tweetpanelfooter";
		var createDate = new Date(tweet.created_at);
		footerDiv.innerHTML = "<div class='create_date'>" + createDate.format("Y-m-d H:i:s") + "</div>";
		
		panelDiv.appendChild(titleDiv);
		panelDiv.appendChild(contentDiv);
		panelDiv.appendChild(footerDiv);		
		
		return panelDiv;
	},
	
	$.fn.addTweetPanel = function(tweet) {		
		if($(this)[0]){
			var tweetPanel = $.buildTweetPanel(tweet);
			$(this).append(tweetPanel);
			
			$(tweetPanel).bind('click', function(){
				$(this).fadeIn("slow");
				var position = $(this).position();
			});
			
			$(tweetPanel).addLink();
			
			$("li.reply", tweetPanel).bind('click', function(){
				
				var position = $(this).position();
				
				$.replywindow.show(position,tweet);
			});
			$("li.retweet", tweetPanel).bind('click', function(){
				
				var position = $(this).position();
				
				$.updatewindow.show(position, tweet.id);
			});
		}
	}
	
	/**
	 * 发布窗口
	 */
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
		$('#updatewindow').show();
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
			
			$.tweet.update({status:updatetext}, function(){
				form.reset();
				$('#updatewindow').hide();
				$("#updatewindow #fontleft").html(140);
			});
		}		
	}
	
	$.updatewindow.cancel = function(form) {
		if(form) {
			form.reset();
			$('#updatewindow').hide();
			$("#updatewindow #fontleft").html(140);
		}		
	}
	
	/**
	 * 回复窗口
	 */
	$.replywindow = {};
	
	$.replywindow.show = function(position, tweet) {
		$.replywindow.tweet = tweet;
		
		$('#replywindow .profile_image_url').html("<img src='"+tweet.user.profile_image_url+"' width='32px' height='32px'/>");
		$('#replywindow .screen_name').html(tweet.user.screen_name);
		$('#replywindow #updatetext').val("@" + tweet.user.screen_name);
		
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
		$('#replywindow').show();
		$("#replywindow #updatetext").focus();
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
			
			$.tweet.update({status:updatetext,in_reply_to_status_id:$.replywindow.tweet.id}, function(){
				form.reset();
				$('#replywindow').hide();
				$("#replywindow #fontleft").html(140);
			});
		}		
	}
	
	$.replywindow.cancel = function(form) {
		if(form) {
			form.reset();
			$('#replywindow').hide();
			$("#replywindow #fontleft").html(140);
		}		
	}
	
})(jQuery);