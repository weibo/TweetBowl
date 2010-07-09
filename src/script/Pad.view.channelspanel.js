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
	
	$.buildChannelsPanel = function() {
		var channelspanel = document.createElement("div");
		channelspanel.className = "channelspanel";
		
		var descripanel = document.createElement("div");
		descripanel.className = "descripanel";		
		$("<span>通过我的广播频道，可以做商品营销，做产品宣传，可以在没关注的情况下进行交流。<span>").appendTo(descripanel);
		
		var buttonpanel = document.createElement("div");
		buttonpanel.className = "buttonpanel";
		$("<input type='button' value='添加广播频道' class='btn-image'/>").appendTo(buttonpanel).bind('click', function(){
			$('.updatepanel').hide();
			$('.addsubject').toggle(100);
		});
		$("<input type='button' value='通过我的频道发布广播' class='btn-image'/>").appendTo(buttonpanel).appendTo(buttonpanel).bind('click', function(){
			$('.addsubject').hide();
			$('.updatepanel').toggle(100);
		});
		$("<div class='addsubject'><input type='text' class='channelsubject'/><input type='button' value='添加' class='btn-image'/><div>推荐给其它用户：<input type='checkbox'/></div></div>").appendTo(buttonpanel);
		$('<div class="updatepanel"><div class="updatewindowbody"><textarea wrap="on" style="margin:0 auto;height:150px;width:300px"></textarea></div><div class="updatewindowfooter"><div id="fontleft" class="fontleft">140</div><div class="bottonright"><input type="button" value="取消" class="btn-image btn-cancel"/><input type="button" value="发布" class="btn-image btn-update"/></div></div></div>').appendTo(buttonpanel);
				
		$(descripanel).appendTo(channelspanel);
		$(buttonpanel).appendTo(channelspanel);
		
		return channelspanel;
	},
	
	$.fn.buildSubjectPanel = function() {
		if($(this)[0] && $.channel.favorites && $.channel.favorites.length) {
			if(!$(".subjectpanel", this)[0]) {
				var subjectpanel = document.createElement("div");
				subjectpanel.className = "subjectpanel";
				subjectpanel.innerHTML = "<p>我添加的广播频道</p><hr><ul></ul>";
				
				$(subjectpanel).appendTo(this);
			} else {
				$(".subjectpanel ul").empty();
			}
			
			$.each($.channel.favorites, function(index,value){
				$('.subjectpanel ul').append('<li><p>'+(index + 1)+'</p><span>' + value + '</span><img src="src/icons/erase.png"/></li>');
			});
			
			$('.subjectpanel li').bind('click',	function() {
				var value = $('.updatepanel textarea').val();
				if(value.length) value = value + ' ';
				$('.updatepanel textarea').val(value + $(this).children('span').html());
			});
			
			$('.subjectpanel li img').bind('click',	function() {
				$.channel.remove($(this).parent().children('span').html());
				$(this).parent().remove();
			});
		}
	}
	
	$.fn.channelsPanel = function() {		
		if($(this)[0]){
			$(this).append($.buildChannelsPanel());
			$('.channelspanel').buildSubjectPanel();
			
			$('.addsubject :button').bind('click', function(){
				var subject = $('.addsubject .channelsubject').val();
				var submit = $('.addsubject :checkbox').attr('checked');
				$('.addsubject .channelsubject').val('');
				$('.addsubject :checkbox').attr('checked', false);
				if(subject) {
					subject = "#" + subject;
					if(!$.channel.favorites || !$.channel.favorites.length) {
						$.channel.favorites = [];
						$.channel.favorites.push(subject);
						$('.channelspanel').buildSubjectPanel();
						if(submit) {
							$.submitChannel(subject);
						}
						if($.channel.favorites && $.channel.favorites.length) {
							$('.navipanelchannels').show();
						}
					} else {
						if($.channel.merge(subject)) {
							$('.channelspanel').buildSubjectPanel();
							if(submit) {
								$.submitChannel(subject);
							}
						}
					}
				}
			});
			
			$('.updatepanel textarea').bind('keyup', function(){
				var length = 140 - $(this).val().length;
				if(length > 0) {
					$(".updatepanel #fontleft").html(length);
				} else {
					$(".updatepanel #fontleft").html('<font color="red">' + length + '</font>');
				}
			})
			
			$('.updatepanel .btn-update').bind('click', function(){
				var updatetext = $('.updatepanel textarea').val();
				if(updatetext) {
					$.api.current().update({status:updatetext}, function(){
						$('.updatepanel textarea').val('')
						$(".updatepanel #fontleft").html(140);
						
						$('.messagedialog').message('发布成功！！！','info');
					});
				}
			})
			
			$('.updatepanel .btn-cancel').bind('click', function(){
				$('.updatepanel textarea').val('')
				$(".updatepanel #fontleft").html(140);
			})
		}
	}
	$.submitChannel = function(subject) {
		var status = $.channel.keyword + " " + subject;
		$.api.current().update({status:status}, function(){});
	}
})(jQuery);