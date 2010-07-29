function Application(){
	this.initializeUpdater();
}  

Application.prototype = {

	initializeUpdater: function(){
		var that = this;
		var appUpdater = this.appUpdater = new runtime.air.update.ApplicationUpdaterUI();

		// start updater config  

		//change this to point to the online update.xml.
		appUpdater.updateURL = "http://www.zunpaixj.com/tweetbowl/update.xml";

		//by default all the dialogs are hidden
		appUpdater.isCheckForUpdateVisible = true;
		appUpdater.isDownloadUpdateVisible = true;
		appUpdater.isDownloadProgressVisible = true;
		appUpdater.isInstallUpdateVisible = true;

		// end updater config

		// Or you can write all the config in an xml file
		// appUpdater.configurationFile = new air.File("app:/config/update.xml");

            			
		//it is necessary to add an ErrorEvent listener because this type of events are catched by the debugger
		appUpdater.addEventListener( runtime.flash.events.ErrorEvent.ERROR, function(ev){  } );
        			
		appUpdater.initialize();
	},

	checkForUpdates: function(){
		this.appUpdater.checkNow();
	}
}

var application = new Application();