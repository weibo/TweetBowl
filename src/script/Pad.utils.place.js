/**
 * This jQuery plugin about native window's place in screen.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Helio (waltz_h@163.com)
 * @version 1.0
 */
(function($){
	
	$.place = {};
	
	$.place.rightBottom = function(bound){
		var screen = $.place.getCurrentScreen();		
		var place = {x:0,y:0};
		
		place.x = screen.visibleBounds.width - bound.width + screen.visibleBounds.left;;
		place.y = screen.visibleBounds.height - bound.height + screen.visibleBounds.top;
		
		return place;
	}
	
	$.place.center = function(bound){
		var screen = $.place.getCurrentScreen();		
		var place = {x:0,y:0};
		
		place.x = (screen.visibleBounds.width - bound.width)/2 + screen.visibleBounds.left;;
		place.y = (screen.visibleBounds.height - bound.height)/2 + screen.visibleBounds.top;
		
		return place;
	}
	
	$.place.random = function(bound) {
		var screen = $.place.getCurrentScreen();		
		var place = {x:0,y:0};
		
		place.x = parseInt(Math.random()*(screen.visibleBounds.width - bound.width)) + screen.visibleBounds.left;
		place.y = parseInt(Math.random()*(screen.visibleBounds.height - bound.height)) + screen.visibleBounds.top;
		
		return place;
	}
	
	$.place.getCurrentScreen = function(mainWindow) {
		var current;
		mainWindow = mainWindow ? mainWindow : window.nativeWindow;
		var screens = air.Screen.getScreensForRectangle(mainWindow.bounds);
		(screens.length > 0) ? current = screens[0] : current = air.Screen.mainScreen;
		return current;
	}
})(jQuery);