// make it easy to debug
var background_log = console.log;
console.log = function(message){
		if(message instanceof Object){
			background_log("["+new Date().toLocaleTimeString()+"  background.js] ");
			background_log(message);
		}else {
			background_log("["+new Date().toLocaleTimeString()+"  background.js] "+message);
		}
}

//--------------start coding ---------------------//

var background = {
	proxy:"system",//default_value
	log:[],
	init:function(){
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if(request.fn in background){
					background[request.fn](request,sender,sendResponse);
			}else{
				console.log("popup request for a function name "+ request.fn+"which is not defined in background.js");
			}
		});
	},
	setProxy:function(request,sender,sendResponse){
		this.proxy = requset.proxy;
	},
	getProxy:function(request,sender,sendResponse){
		sendResponse({proxy:this.proxy});
	},
	addLog:function(request,sender,sendResponse){
		
	}
};

background.init();
