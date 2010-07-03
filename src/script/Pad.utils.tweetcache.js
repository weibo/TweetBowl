/**
 * Tweet Cache
 * @author helio
 */
(function($){
	
	$.tweetCache = {
		cache : new Array(),	
		busy : false,
		
		add : function(record) {
			this.busy = true;
			if(!this.existed(record)) {
				this.cache.push({'data':record,'status':0});
			}
			this.busy = false;
			
		},
		addAll : function(records) {
			this.busy = true;
			for(var i = 0; i < records.length; i++){
				var tweet = records[i];
				if(this.cache.length == 0) {
					this.cache.push({'data':tweet,'status':0});
				} else {
					for(var j = this.cache.length; j > 0; j--){
						var record = this.cache[j-1];
						
						if(new Date(tweet.created_at).getTime() < new Date(record.data.created_at).getTime()) {
							for (var m = this.cache.length; m > j; m--) {              
								this.cache[m] = this.cache[m-1];  
					        }  
							this.cache[j] = {'data':tweet,'status':0};
							break;
						} else if(new Date(tweet.created_at).getTime() == new Date(record.data.created_at).getTime()) {
							if(record.data.text == tweet.text) {
								break;
							}
						}
						
						if(j == 1) {
							for (var m = this.cache.length; m > 0; m--) {              
								this.cache[m] = this.cache[m-1];  
					        }  
							this.cache[0] = {'data':tweet,'status':0};
						}
					}
				}
			}
			this.busy = false;
		},
		clear : function() {
			this.busy = true;
			this.cache = new Array();
			this.busy = false;
		},
		pop : function() {
			if(!this.busy) {
				for(var i = this.cache.length -1 ; i >= 0; i--){
					var record = this.cache[i];
					if(!record.status) {				
						record.status = 1;
						return record.data;
					}
				}
			}
		},
		existed : function(check) {
			for(var i = 0; i < this.cache.length; i++){
				var record = this.cache[i];
				if(record.data.from_user == check.from_user && record.data.text == check.text) {
					return true;
				}
			}
		},
		searchById : function(id) {
			if(!this.busy) {
				for(var i = 0; i < this.cache.length; i++){
					var record = this.cache[i];
					if(record.data.id == id) {
						return record;
					}
				}
			}
		},
		remove : function(record) {
			for(var i = 0; i < this.cache.length; i++) {
				if(this.cache[i] == record) {
					this.cache.splice(i,1);
					return record;
				}
			}
		},
		removeById : function(id) {
			if(!this.busy) {
				for(var i = 0; i < this.cache.length; i++){
					var record = this.cache[i];
					if(record.data.id == id) {
						this.cache.splice(i,1);
						return record;
					}
				}
			}
		}
	}
	
})(jQuery);