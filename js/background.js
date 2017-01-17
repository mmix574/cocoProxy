// make it easy to debug
var background_log = console.log;
console.log = function(message){
		background_log("["+new Date().toLocaleTimeString()+"  background.js] "+message);
}

//--------------start coding ---------------------//

var background = {
	proxy:{},
	log:{},
	init:function(){
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			
			console.log("requestcall",request);
		});
	}
};


background.init();


/*response all the message*/
