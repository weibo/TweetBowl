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
		$("<span>通过我的广播频道，可以做商品营销，做产品宣传，可以跟客户进行交流。<span>").appendTo(descripanel);
		
		var buttonpanel = document.createElement("div");
		buttonpanel.className = "buttonpanel";
		$("<input type='button' value='添加广播频道' class='btn-image'/>").appendTo(buttonpanel).bind('click', function(){
			$('.updatepanel').hide();
			$('.addsubject').slideDown(100);
		});
		$("<input type='button' value='通过我的频道发布广播' class='btn-image'/>").appendTo(buttonpanel).appendTo(buttonpanel).bind('click', function(){
			$('.addsubject').hide();
			$('.updatepanel').slideDown(100);
		});
		$("<div class='addsubject'><input type='text' class='channelsubject'/><input type='button' value='添加' class='btn-image'/><div>推荐给其它用户：<input type='checkbox'/></div></div>").appendTo(buttonpanel);
		$('<div class="updatepanel"><form onsubmit="$.updatewindow.update(this)"><div class="updatewindowbody"><textarea id="updatetext" name="updatetext" wrap="on" style="margin:0 auto;height:150px;width:300px" onkeyup="$.updatewindow.checkLength(this);"></textarea></div><div class="updatewindowfooter"><div id="fontleft" class="fontleft">140</div><div class="bottonright"><input type="button" value="发布" onclick="$.updatewindow.update(this.form)" class="btn-image btn-update"/></div></div></form></div>').appendTo(buttonpanel);
				
		$(descripanel).appendTo(channelspanel);
		$(buttonpanel).appendTo(channelspanel);
		
		return channelspanel;
	},
	
	$.fn.buildSubjectPanel = function() {
		
		if($(this)[0] && $.channel.favorites && $.channel.favorites.length) {
			var channelspanel = $(this);
			
			var subjectpanel = document.createElement("div");
			subjectpanel.className = "subjectpanel";
			subjectpanel.innerHTML = "<p>我添加的广播频道</p><hr><ul></ul>";
			
			$.each($.channel.favorites, function(index,value){
				$('ul', subjectpanel).append('<li>' + value + '</li>');
			});
			
			$(subjectpanel).appendTo(channelspanel);
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
					} else {
						if($.channel.merge(subject)) {
							$('.channelspanel .subjectpanel ul').append('<li>' + subject + '</li>');
							if(submit) {
								$.submitChannel(subject);
							}
						}
					}
				}
			});
		}
	}
	$.submitChannel = function(subject) {
		var status = $.channel.keyword + " " + subject;
		$.api.current().update({status:status}, function(){});
	}
})(jQuery);