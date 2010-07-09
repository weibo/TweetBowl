/**
 * System Tray Class.
 * 
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
(function($){
	
	var iconLoadComplete = function(event){ 
        air.NativeApplication.nativeApplication.icon.bitmaps = [event.target.content.bitmapData]; 
    } 
    
	function preventMinimize(event){ 
	    if(event.afterDisplayState == air.NativeWindowDisplayState.MINIMIZED){ 
	        event.preventDefault(); 
	        event.target.visible = false; 
	    } 
	}
	
    air.NativeApplication.nativeApplication.autoExit = false; 
    var iconLoad = new air.Loader(); 
    var iconMenu = new air.NativeMenu(); 
    var showCommand = iconMenu.addItem(new air.NativeMenuItem("显示窗口")); 
    showCommand.addEventListener(air.Event.SELECT,function(event){ 
    	nativeWindow.visible = true;
    }); 
    var hideCommand = iconMenu.addItem(new air.NativeMenuItem("隐藏窗口")); 
    hideCommand.addEventListener(air.Event.SELECT,function(event){ 
    	nativeWindow.visible = false;
    }); 
    iconMenu.addItem(new air.NativeMenuItem("", true));
    var exitCommand = iconMenu.addItem(new air.NativeMenuItem("退出")); 
    exitCommand.addEventListener(air.Event.SELECT,function(event){ 
            air.NativeApplication.nativeApplication.icon.bitmaps = []; 
            air.NativeApplication.nativeApplication.exit(); 
    });
 
    if (air.NativeApplication.supportsSystemTrayIcon) { 
        air.NativeApplication.nativeApplication.autoExit = false; 
        iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete); 
        iconLoad.load(new air.URLRequest("icons/bowl_16.png")); 
        iconLoad.addEventListener(air.MouseEvent.CLICK,function(event){
        	air.trace('click');
        });
        air.NativeApplication.nativeApplication.icon.tooltip = "百家微博"; 
        air.NativeApplication.nativeApplication.icon.menu = iconMenu; 
    } 
 
    if (air.NativeApplication.supportsDockIcon) { 
        iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete); 
        iconLoad.load(new air.URLRequest("icons/bowl_128.png")); 
        air.NativeApplication.nativeApplication.icon.menu = iconMenu; 
    }
})(jQuery);