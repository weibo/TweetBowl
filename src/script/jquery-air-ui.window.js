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
			movable: true,
			tools: ['close','minimize']
		},opts||{});
		
		/**创建窗口*/
		$(document.body).append("<div class='nativewindow'><div class='windowheader'></div><div class='windowbody'></div><div class='windowfooter'></div></div>");
		
		/**皮肤修改*/
		$("<span>@author waltz_h@163.com</span>").appendTo(".windowfooter");
		
		/**拖动窗口事件*/
		if(opts.movable) {
			$('.windowheader')[0].onmousedown = function(){
				nativeWindow.startMove()
			};
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
    					
    					var exitingEvent = new air.Event(air.Event.EXITING, false, true);
    	                air.NativeApplication.nativeApplication.dispatchEvent(exitingEvent);
    	                if (!exitingEvent.isDefaultPrevented()) {
    	                	if($.state.enable) {
    	                		$.state.Manager.save();
    	                	}
    	                    air.NativeApplication.nativeApplication.exit();
    	                }
    				});
    			} else if(value == 'maximize') {
    				$('.windowheader').append("<div class='tools-maximize'></div>");
    				$('.windowheader .tools-maximize').click(function(){
      					
    					if($(this).attr('class') == 'tools-maximize'){
	    					nativeWindow.maximize();    					
	    					$(this).removeClass('tools-maximize');  
	    					$(this).addClass('tools-restore');
    					} else {
    						nativeWindow.restore();    					
	    					$(this).removeClass('tools-restore');  
	    					$(this).addClass('tools-maximize');
    					}
    				});  				
    			} else if(value == 'minimize') {
    				$('.windowheader').append("<div class='tools-minimize'></div>");
    				$('.windowheader .tools-minimize').click(function(){nativeWindow.minimize();});
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
	
	$.state = {
		enable		: true,
		storekey	: 'STATE_STORE_KEY',
		storevalue	: {}
	};	
	$.state.Manager = {};
	$.state.Manager.save = function() {
		$.account.save();
		var bytes = new air.ByteArray();
		var value = Ext.encode($.state.storevalue);
		bytes.writeUTFBytes(value);
		air.EncryptedLocalStore.setItem($.state.storekey, bytes);
	}
	$.state.Manager.read = function() {
		var storedValue = air.EncryptedLocalStore.getItem($.state.storekey);
		if (storedValue) {
			var value = storedValue.readUTFBytes(storedValue.length);
			if(value) {
				$.state.storevalue = Ext.decode(value);
			}
		}
	}
	
	if($.state.enable) {
		$.state.Manager.read();
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