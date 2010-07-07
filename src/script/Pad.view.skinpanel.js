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
	
	$.buildSkinPanel = function() {
		var skinDiv = document.createElement("div");
		skinDiv.className = "skinpanel";
		
		var skinsettingDiv = document.createElement("div");
		skinsettingDiv.className = "skinsetting";
		
		$("<span>窗口样式设定<span><hr/><ul class='skin'></ul>").appendTo(skinsettingDiv);		
		$("ul.skin", skinsettingDiv).append("<li><label>颜色：</label><div id='colorSelector'></div></li>");
		$("ul.skin", skinsettingDiv).append("<li><label>透明度：</label><div class='sliderdemo'><div id='slider'></div></div></li>");
		
		$("<span>实时信息设定<span><hr/><ul class='realtimeline'></ul>").appendTo(skinsettingDiv);		
		$("ul.realtimeline", skinsettingDiv).append("<li><div>开启实时信息监听：<input type='checkbox'/></div><ul><li><div class='time'>通信时间间隔：<input type='text' maxlength='4'/>秒(60-9999)</div></li></ul></li>");
				
		$(skinsettingDiv).appendTo(skinDiv);
		
		return skinDiv;
	},
	
	$.fn.skinPanel = function() {		
		if($(this)[0]){
			$(this).append($.buildSkinPanel());
			
			$('#colorSelector').ColorPicker({
				
				onShow: function (colpkr) {
					$(colpkr).fadeIn(500);
					return false;
				},
				onHide: function (colpkr) {
					$(colpkr).fadeOut(500);
					return false;
				},
				onChange: function (hsb, hex, rgb) {
					$('#colorSelector').css('backgroundColor', '#' + hex);
					//Pad.rgb = rgb;
					$('.nativewindow').backgroundColor(rgb);
					//$("link.changeme").attr("href","lib/jquery/css/overcast/jquery-ui-1.8.custom.css");
				}
			});
			
			$("#slider").slider({
				value:$.nativeWindow.config.rgba.a,
				min: 0,
				max: 1,
				step: 0.1,
				//orientation: "vertical",
				slide: function(event, ui) {
					//air.trace('$' + ui.value);
					$('.nativewindow').backgroundColor({a:ui.value});
					//$('.nativewindow').css('background-color', 'rgba(' + Pad.rgb.r + ',' +Pad.rgb.g +',' + Pad.rgb.b + ','+ui.value+')');
				}

			});
			
			if($.app.config.backing.enable) {
				$('.realtimeline :checkbox').attr('checked', true);
				$('.realtimeline .time :input').val($.app.config.backing.time);
				$('.realtimeline .time').css('display', 'block');
			}
			
			$('.realtimeline :checkbox').bind("click", function(){
				if($(this).attr('checked')){
					$('.realtimeline .time').css('display', 'block');
					$('.realtimeline .time :input').val($.app.config.backing.time);
				} else {
					$('.realtimeline .time').css('display', 'none');
				}
				
				$.app.config.backing.enable = $(this).attr('checked');
				$.app.changeTimelineListener();
			});
			
			$('.realtimeline .time :input').bind('change', function(){
				$.app.config.backing.time = $(this).val();
				$.app.changeTimelineListener();
			});
		}
	}
	
})(jQuery);