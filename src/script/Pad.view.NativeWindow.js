
if(!Pad) var Pad = {};
if(!Pad.view) Pad.view = {};
Pad.view.NativeWindow = function(config) {
	this.config = config;
	
	if(typeof Pad.view.NativeWindow.initialized == "undefined"){
		Pad.view.NativeWindow.prototype.init = function (){
			this.buildNativeWindow();
			this.buildNaviPanel();
			
            this.moveActionRegister();
            
            if(this.config.closable) {
            	this.closeActionRegister();
            }
            
            if(this.config.minimizable) {
            	this.minimizeActionRegister();
            }
            
            if(this.config.maximizable) {
            	this.maximizeActionRegister();
            }
        };
        /**创建窗口*/
        Pad.view.NativeWindow.prototype.buildNativeWindow = function (){
        	$(document.body).append("<div class='nativewindow'><div class='windowheader'></div><div class='windowbody'></div></div>");
        	
        	if(this.config.title) {
        		$('.windowheader').append("<div class='title'>" + this.config.title + "</div>");
        	}
        	
        	if(this.config.tools) {
        		$.each(this.config.tools, function(index, value){
        			if(value == 'close') {
        				$('.windowheader').append("<div class='tools-close'></div>");
        			} else if(value == 'maximize') {
        				$('.windowheader').append("<div class='tools-maximize'></div>");
        			} else if(value == 'minimize') {
        				$('.windowheader').append("<div class='tools-minimize'></div>");
        			}
        		});
        	}
        	
        	if(this.config.position) {
        		if(this.config.position == 'center') {
        			window.nativeWindow.x = (air.Capabilities.screenResolutionX - window.nativeWindow.width)/2;
        			window.nativeWindow.y = (air.Capabilities.screenResolutionY - window.nativeWindow.height)/2;
        		} else if(this.config.position.x && this.config.position.y) {
        			window.nativeWindow.x = this.config.position.x;
        			window.nativeWindow.y = this.config.position.y;
        		}
        	}
        };
        
        /**创建窗口*/
        Pad.view.NativeWindow.prototype.buildNaviPanel = function (){
        	
        	$('.windowbody').append("<div class='navipanel'></div>");

        	$('.windowbody .navipanel').append("<div class='homenavi'></div>");        	
        	$('.windowbody .navipanel').append("<div class='onlinenavi'></div>");
        	$('.windowbody .navipanel').append("<div class='clientsnavi'></div>");
        	$('.windowbody .navipanel').append("<div class='storagenavi'></div>");
        	$('.windowbody .navipanel').append("<div class='billchecknavi'></div>");
        	$('.windowbody .navipanel').append("<div class='billinputnavi'></div>");
        };
        
        /**关闭窗口事件*/
        Pad.view.NativeWindow.prototype.closeActionRegister = function (){        	
        	var close = $('.windowheader .tools-close')[0];
        	if(close) {
        		close.onclick = function(){
        		
	        		var exitingEvent = new air.Event(air.Event.EXITING, false, true);
	                air.NativeApplication.nativeApplication.dispatchEvent(exitingEvent);
	                if (!exitingEvent.isDefaultPrevented()) {
	                    air.NativeApplication.nativeApplication.exit();
	                }
	    		};
        	}
        };
        /**最小化窗口事件*/
        Pad.view.NativeWindow.prototype.minimizeActionRegister = function (){
        	var minimize = $('.windowheader .tools-minimize')[0];        	
        	if(minimize) {
        		minimize.onclick = function(){
	        		nativeWindow.minimize();
	    		};
        	}
        };
        /**最大化窗口事件*/
        Pad.view.NativeWindow.prototype.maximizeActionRegister = function (){
        	var maximize = $('.windowheader .tools-maximize')[0];        	
        	if(maximize) {
        		maximize.onclick = function(){
	        		nativeWindow.maximize();
	    		};
        	}
        };
        /**拖动窗口事件*/
        Pad.view.NativeWindow.prototype.moveActionRegister = function (){
        	$('.windowheader')[0].onmousedown = function(){
    			nativeWindow.startMove()
    		};
        };
        
        Pad.view.NativeWindow.initialized = true;
	}
}

Pad.show = function(config) {
	var nativeWindow = new Pad.view.NativeWindow(config);
	nativeWindow.init();
}