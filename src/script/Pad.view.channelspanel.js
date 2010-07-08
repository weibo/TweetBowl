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
		$("<input type='button' value='我要广播' class='btn-image'/>").appendTo(buttonpanel).appendTo(buttonpanel).bind('click', function(){
			$('.addsubject').hide();
			$('.updatepanel').slideDown(100);
		});
		$("<div class='addsubject'><input type='text' class='channelsubject'/><input type='button' value='添加' class='btn-image'/><div>推荐给其它用户：<input type='checkbox'/></div></div>").appendTo(buttonpanel);
		$('<div class="updatepanel"><form onsubmit="$.updatewindow.update(this)"><div class="updatewindowbody"><textarea id="updatetext" name="updatetext" wrap="on" style="margin:0 auto;height:150px;width:250px" onkeyup="$.updatewindow.checkLength(this);"></textarea></div><div class="updatewindowfooter"><div id="fontleft" class="fontleft">140</div><div class="bottonright"><input type="button" value="发布" onclick="$.updatewindow.update(this.form)" class="btn-image btn-update"/></div></div></form></div>').appendTo(buttonpanel);
		
		var subjectpanel = document.createElement("div");
		subjectpanel.className = "subjectpanel";
		$("<span>通过我的广播频道，可以做商品营销，做产品宣传，可以跟客户进行交流。<span>").appendTo(subjectpanel);
		
		$(descripanel).appendTo(channelspanel);
		$(buttonpanel).appendTo(channelspanel);
		$(subjectpanel).appendTo(channelspanel);
		
		return channelspanel;
	},
	
	$.fn.channelsPanel = function() {		
		if($(this)[0]){
			$(this).append($.buildChannelsPanel());
			
			
		}
	}
	
})(jQuery);