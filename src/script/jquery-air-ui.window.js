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
		$(document.body).append("<div class='nativewindow'><div class='windowheader'></div><div class='windowbody'></div></div>");
		
		/**拖动窗口事件*/
		if(opts.movable) {
			$('.windowheader')[0].onmousedown = function(){
				nativeWindow.startMove()
			};
		}
		
		/**窗口名称*/
		if(opts.title) {
    		$('.windowheader').append("<div class='title'>" + opts.title + "</div>");
    	}
    	
		/**窗口工具*/
    	if(opts.tools) {
    		$.each(opts.tools, function(index, value){
    			if(value == 'close') {
    				$('.windowheader').append("<div class='tools-close'></div>");
    				$('.windowheader .tools-close').click(function(){
    					
    					var exitingEvent = new air.Event(air.Event.EXITING, false, true);
    	                air.NativeApplication.nativeApplication.dispatchEvent(exitingEvent);
    	                if (!exitingEvent.isDefaultPrevented()) {
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
	}
	$.fn.nativeWindow = function(opts) {		
		if(!$(this).length){
			$.nativeWindow(opts);
		}
	}
})(jQuery);