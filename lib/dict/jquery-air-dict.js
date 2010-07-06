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
	
	$.dict = {
		path	: 'lib/dict/dict.txt',
		result	: []
	};
	
	$.dict.readDict = function(){
		var prefsFile = air.File.applicationDirectory;
		var file = prefsFile.resolvePath($.dict.path);
		var fileStream = new air.FileStream(); 
		try {
			fileStream.open(file, air.FileMode.READ); 		
		
			$.dict.text = fileStream.readUTFBytes(fileStream.bytesAvailable);
			//air.trace($.dict.text);
			fileStream.close();
			
		} catch(err) {
			air.trace('加载字库文件失败！');
		}
	}
	
	$.dict.divide = function(text){
	    if(text.length==0) return true;
	    var word = text.substring(0,1)+"";
	    var regExp = /\w/;
	    //英文
	    if(regExp.test(word)){
	        var tmp = text.replace(/^\s*(\w+)\s*.*$/,"$1");
	        text = text.replace(/^\s*\w+\s*/,"");
	        $.dict.result.push(tmp);
	        divide(text);
	        return;
	    }
	    
	    var words = [];
	    var end = 0;
	    var start = -1;
	    while((start = $.dict.text.indexOf('\r\n'+word,end))!=-1){
	        end = $.dict.text.indexOf('\r\n',start+1);
	        if(start==-1||end==-1) return false;
	        if(start>end) return false;
	        words.push($.dict.text.substr(start,end-start).replace(/(\r\n|\s)/g,""));
	    }    
	    
	    var tmp = "";
	    for(j=0;j<words.length;j++){
	        //找到最长的词，当然也可以将所有词保留
	        if(text.indexOf(words[j])!=-1&&words[j].length>tmp.length){
	            tmp=words[j];
	        }
	    }
	    //词库不存在的词
	    if(tmp == ""){
	        tmp = word;        
	    }
	    text=text.replace(tmp,"");
	    if(tmp.replace(/\s/g,'')!="") {
	    	$.dict.result.push(tmp);
	    }
	    $.dict.divide(text);
	}
	
	$.dict.readDict();
	
	$.dict.divide("我爱中国,大家一起去世博会");
	
	alert($.dict.result);
	
})(jQuery);