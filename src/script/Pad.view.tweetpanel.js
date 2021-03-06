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
	function Todate(num) 
	{ //Fri Oct 31 18:00:00 UTC+0800 2008 
	num=num+"";
	var date="";
	var month=new Array();
	month["Jan"]=1;month["Feb"]=2;month["Mar"]=3;month["Apr"]=4;month["May"]=5;month["Jan"]=6;
	month["Jul"]=7;month["Aug"]=8;month["Sep"]=9;month["Oct"]=10;month["Nov"]=11;month["Dec"]=12;
	var week=new Array();
	week["Mon"]="一";week["Tue"]="二";week["Wed"]="三";week["Thu"]="四";week["Fri"]="五";week["Sat"]="六";week["Sun"]="日";
	str=num.split(" ");
	date=str[5]+"-";
	date=date+month[str[1]]+"-"+str[2]+"-"+str[3];
	//date=date+" 周"+week[str[0]];
	return date;
	}
	$.buildTweetPanel = function(tweet) {
		if(tweet && tweet.id) {
			var panelDiv = document.createElement("div");
			panelDiv.className = "tweetpanel";
			panelDiv.id = tweet.id;
			//air.trace(panelDiv.name);
			
			var titleDiv = document.createElement("div");
			titleDiv.className = "tweetpaneltitle";
			
			var imageDiv = document.createElement("div");
			imageDiv.className = "profile_image_url";
			imageDiv.innerHTML = "<img src='"+tweet.user.profile_image_url+"' width='32px' height='32px'/>";
			titleDiv.appendChild(imageDiv);
			
			var nameDiv = document.createElement("div");
			nameDiv.className = "user_name";
			nameDiv.innerHTML = tweet.user.screen_name;
			titleDiv.appendChild(nameDiv);
			
			var toolsDiv = document.createElement("div");
			toolsDiv.className = "tweetpaneltools";
			if(tweet.user.name && (tweet.user.name != $.account.current.name)) {
				toolsDiv.innerHTML = "<li class='retweet'>转发</li><li class='reply'>回复</li>";
			} else if(tweet.user.name == $.account.current.name) {
				toolsDiv.innerHTML = "<li class='delete'>删除</li>";
			}
			titleDiv.appendChild(toolsDiv);
			
			var contentDiv = document.createElement("div");
			contentDiv.className = "tweetpanelbody";
			contentDiv.innerHTML = "<div class='tweetcontent'>" + $.link.check(tweet.text) + "</div>";
			
			var footerDiv = document.createElement("div");
			footerDiv.className = "tweetpanelfooter";
			var createDate = new Date(tweet.created_at);
			footerDiv.innerHTML = "<div class='create_date'>" + createDate.format("yyyy-mm-dd HH:MM:ss") + "</div>";
			
			panelDiv.appendChild(titleDiv);
			panelDiv.appendChild(contentDiv);
			panelDiv.appendChild(footerDiv);		
			
			return panelDiv;
		}
	};
	
	$.fn.addTweetPanel = function(tweet) {		
		if($(this)[0]){
			var tweetPanel = $.buildTweetPanel(tweet);
			$(this).append(tweetPanel);
			
			$(tweetPanel).bind('click', function(){
				$(this).fadeIn("slow");
				var position = $(this).position();
			});
			
			$(tweetPanel).addLink();
			
			$("li.reply", tweetPanel).bind('click', function(){
				
				var position = $(this).position();				
				$.replywindow.show(position,tweet);
			});
			$("li.retweet", tweetPanel).bind('click', function(){
				
				$.api.current().retweet({id:tweet.id}, function(){
					$('.messagedialog').message('转发成功！！！','info');
				});
			});
			$("li.delete", tweetPanel).bind('click', function(){
				
				$.api.current().destroy({id:tweet.id}, function(){
					$(".tweetpanel[id='"+tweet.id+"']").remove();
					$('.messagedialog').message('删除成功！！！','info');
				});
			});
		}
	};
	
	$.fn.insertTweetPanel = function(tweet) {		
		if($(this)[0]){
			var tweetPanel = $.buildTweetPanel(tweet);
			if($('.tweetpanel', this).first()) {
				$(tweetPanel).insertBefore($('.tweetpanel', this).first());
			} else {
				$(this).append(tweetPanel);
			}		
			
			$(tweetPanel).bind('click', function(){
				$(this).fadeIn("slow");
				var position = $(this).position();
			});
			
			$(tweetPanel).addLink();
			
			$("li.reply", tweetPanel).bind('click', function(){
				
				var position = $(this).position();				
				$.replywindow.show(position,tweet);
			});
			$("li.retweet", tweetPanel).bind('click', function(){
				
				$.api.current().retweet({id:tweet.id}, function(){
					$('.messagedialog').message('转发成功！！！','info');
				});
			});
			$("li.delete", tweetPanel).bind('click', function(){
				
				$.api.current().destroy({id:tweet.id}, function(){
					$(".tweetpanel[id='"+tweet.id+"']").remove();
					$('.messagedialog').message('删除成功！！！','info');
				});
			});
		}
	}
})(jQuery);