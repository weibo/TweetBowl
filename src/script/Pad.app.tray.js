/**
 * System Tray Class.
 * 
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	var iconLoadComplete = function(event){ 
        air.NativeApplication.nativeApplication.icon.bitmaps = [event.target.content.bitmapData]; 
    }
	
    air.NativeApplication.nativeApplication.autoExit = false; 
    var iconLoad = new air.Loader(); 
    var iconMenu = new air.NativeMenu(); 
    //iconMenu.addItem(new air.NativeMenuItem("", true));//分隔符
    //退出菜单
    var exitCommand = iconMenu.addItem(new air.NativeMenuItem("退出")); 
    exitCommand.addEventListener(air.Event.SELECT,function(event){ 
            air.NativeApplication.nativeApplication.icon.bitmaps = []; 
            air.NativeApplication.nativeApplication.exit(); 
    });
    
    if (air.NativeApplication.supportsSystemTrayIcon) { 
        air.NativeApplication.nativeApplication.autoExit = false; 
        iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete); 
        iconLoad.load(new air.URLRequest("icons/bowl_16.png"));
        air.NativeApplication.nativeApplication.icon.tooltip = "百家微博"; 
        air.NativeApplication.nativeApplication.icon.menu = iconMenu; 
    } 
    
    if (air.NativeApplication.supportsDockIcon) { 
        iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE,iconLoadComplete); 
        iconLoad.load(new air.URLRequest("icons/bowl_128.png")); 
        air.NativeApplication.nativeApplication.icon.menu = iconMenu; 
    }
    
    //添加点击系统托盘图标事件
    air.NativeApplication.nativeApplication.icon.addEventListener(air.MouseEvent.CLICK,function(event){
    	if(nativeWindow.visible) {
    		nativeWindow.visible = false;
    	} else {
    		nativeWindow.visible = true;
    		nativeWindow.orderToFront();
    	}
    });
})(jQuery);