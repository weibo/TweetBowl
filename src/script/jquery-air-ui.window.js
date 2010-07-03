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
	$.nativeWindow = function(opts) {
		opts = jQuery.extend({
			id: 'nativewindow',
			cln: 'nativewindow',
			title: 'Native Window',
			position: 'center',
			closable: true,
			minimizable: true,
			maximizable: true,
			movable: true,
			tools: ['close','minimize']
		},opts||{});
		
		/**创建窗口*/
		$(document.body).append("<div class='nativewindow'><div class='windowheader'></div><div class='windowbody'></div><div class='windowfooter'></div></div>");
		
		/**皮肤修改*/
		$("<span>@author waltz_h@163.com</span>").appendTo(".windowfooter");
		$("<div class='loading'><img src='src/icons/loading.gif' width='48px' hight='24px'></img></div>").appendTo(".windowfooter");
		
		/**拖动窗口事件*/
		if(opts.movable) {
			$('.windowheader')[0].onmousedown = function(){
				nativeWindow.startMove()
			};
		}
		if(opts.maximizable) {
			$('.windowheader').bind('dblclick', function(){
				if(!$.nativeWindow.displayState || $.nativeWindow.displayState == runtime.flash.display.StageDisplayState.NORMAL) {
					nativeWindow.stage.displayState = runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE;
					$.nativeWindow.displayState = runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE;
				} else if($.nativeWindow.displayState == runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE) {
					nativeWindow.stage.displayState = runtime.flash.display.StageDisplayState.NORMAL;
					$.nativeWindow.displayState = runtime.flash.display.StageDisplayState.NORMAL;
				}
				$.nativeWindow.onMaximize();
			});
			
		}
		
		/**窗口名称*/
		if(opts.title) {
    		$('.windowheader').append("<div class='title'><ul id='titlenenu'><li>" + opts.title + "<li></ul></div>");
    	}
    	
		/**窗口工具*/
    	if(opts.tools) {
    		$.each(opts.tools, function(index, value){
    			if(value == 'close') {
    				$('.windowheader').append("<div class='tools-close'></div>");
    				$('.windowheader .tools-close').click(function(){
    					
    					if($.nativeWindow.state == 'preserve') {
    						$.nativeWindow.config.position = {
    							x: window.nativeWindow.x,
    							y: window.nativeWindow.y
    						}
    						var bytes = new air.ByteArray();
    						bytes.writeUTFBytes($.encode($.nativeWindow.config));
    						air.EncryptedLocalStore.setItem('windowstate', bytes);
    					}
    					
    					$.nativeWindow.onClose();
    				});
    			} else if(value == 'maximize') {
    				$('.windowheader').append("<div id='tools-maximize' class='tools-maximize'></div>");
    				$('.windowheader .tools-maximize').click(function(){
    					
    					if(!$.nativeWindow.displayState || $.nativeWindow.displayState == runtime.flash.display.StageDisplayState.NORMAL) {
    						nativeWindow.stage.displayState = runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE;
    						$.nativeWindow.displayState = runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE;
    					} else if($.nativeWindow.displayState == runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE) {
    						nativeWindow.stage.displayState = runtime.flash.display.StageDisplayState.NORMAL;
    						$.nativeWindow.displayState = runtime.flash.display.StageDisplayState.NORMAL;
    					}
    					$.nativeWindow.onMaximize();
    				});  				
    			} else if(value == 'minimize') {
    				$('.windowheader').append("<div class='tools-minimize'></div>");
    				$('.windowheader .tools-minimize').click(function(){
    					nativeWindow.minimize();
    				});
    				
    			}
    		});
    	}
    	
    	if(opts.items) {
    		$.each(opts.items, function(index, value){
    			$('.windowbody').append(value);
    		});
    	}
    	
    	/**窗口坐标*/
    	if(opts.position) {
    		if(opts.position == 'center') {
    			window.nativeWindow.x = (air.Capabilities.screenResolutionX - window.nativeWindow.width)/2;
    			window.nativeWindow.y = (air.Capabilities.screenResolutionY - window.nativeWindow.height)/2;
    		} else if(opts.position.x && opts.position.y) {
    			window.nativeWindow.x = opts.position.x;
    			window.nativeWindow.y = opts.position.y;
    		}
    	}
    	
    	if($.nativeWindow.state == 'preserve') {
	    	var storedValue = air.EncryptedLocalStore.getItem("windowstate");
			if (storedValue) {
				var config = storedValue.readUTFBytes(storedValue.length); 
				$.nativeWindow.config = $.decode(config);
				
				if($.nativeWindow.config.rgba) {
					$(".nativewindow").backgroundColor($.nativeWindow.config.rgba);
				}
				
				if($.nativeWindow.config.position) {
					var position = $.nativeWindow.config.position;
					window.nativeWindow.x = position.x;
	    			window.nativeWindow.y = position.y;
				}
			}
    	}
    	
    	nativeWindow.addEventListener(air.Event.CLOSING, function(event){
    		$.nativeWindow.onClose();
    	});
    	
    	nativeWindow.addEventListener(air.NativeWindowBoundsEvent.RESIZE, function(event){
    		//air.trace(event);
    	});
    	
    	nativeWindow.addEventListener(air.NativeWindowDisplayStateEvent.DISPLAY_STATE_CHANGE, function(event){
    		$.nativeWindow.displayState = event.afterDisplayState;
    		$.nativeWindow.onMaximize();
    	});
	}
	$.nativeWindow.onDisplay = function(afterDisplayState){
		if(afterDisplayState == 'minimized') {
			
		}
		air.trace(afterDisplayState);
	}
	$.nativeWindow.onMaximize = function(){
		if($.nativeWindow.displayState && $.nativeWindow.displayState == runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE) {
			$('#tools-maximize').removeClass('tools-maximize');
			$('#tools-maximize').addClass('tools-restore');
		} else {
			$('#tools-maximize').removeClass('tools-restore');
			$('#tools-maximize').addClass('tools-maximize');
		}
	}
	$.nativeWindow.onClose = function(){
		var exitingEvent = new air.Event(air.Event.EXITING, true, true);
        air.NativeApplication.nativeApplication.dispatchEvent(exitingEvent);
        if (!exitingEvent.isDefaultPrevented()) {
        	if($.app && $.app.saveState) {
        		$.app.saveState();
        	}
            air.NativeApplication.nativeApplication.exit();
        }
	}
	$.fn.nativeWindow = function(opts) {		
		if(!$(this).length){
			$.nativeWindow(opts);
		}
	}
	
	$.nativeWindow.state = 'preserve';
	$.nativeWindow.config = {};
	$.nativeWindow.config.rgba = {r: 75, g: 175, b: 175, a: 0.8};
	
	$.fn.backgroundColor = function(rgba) {
		$.nativeWindow.config.rgba = jQuery.extend($.nativeWindow.config.rgba, rgba||{});
		rgba = $.nativeWindow.config.rgba;
		if($(this).length){
			$(this).css('backgroundColor', 'rgba(' + rgba.r + ',' +rgba.g +',' + rgba.b + ',' + rgba.a + ')');
		}
	}
	
	$.decode = function(text) {
		if(!text) {
			return null;
		}
		return eval("("+text+")");
	}
	$.encode = function(json) {
		if(!json) {
			return null;
		}
		return $.toJSON(json);
	}
})(jQuery);