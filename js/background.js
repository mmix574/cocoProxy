// make it easy to debug
var old_console = {};
old_console.log = console.log;
console.log = function(msg) {
	old_console.log("[" + new Date().toLocaleTimeString() + "  background.js] ");
	old_console.log(msg);
}

//--------------start coding ---------------------//


//share code area
var share = this;
share.storage = {};
share.has = function(obj){
	if(obj in share.storage){
		return true;
	}else{
		return false;
	}
}
share.put = function(key,value){
	if(key in share.storage){return false;}
	else{
		share.storage.key = value;
	}
}
share.get = function(key){
	if(key in share.storage){
		return share.storage.key;
	}else{
		return null;
	}
}


var background = {
	proxy: "system", //default_value
	log: [],
	init: function() {
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.fn in background) {
				background[request.fn](request, sender, sendResponse);
			} else {
				console.log("popup request for a function name " + request.fn + "which is not defined in background.js");
			}
		});
	},
	setProxy: function(request, sender, sendResponse) {
		this.proxy = request.proxy;
	},
	getProxy: function(request, sender, sendResponse) {
		sendResponse({
			proxy: this.proxy
		});
	},
	addLog: function(request, sender, sendResponse) {

	},
	test: function() {
		setInterval(function(){
			if(share.has("key")){
				console.log(share.get("key"));
			}
		},1000);
	}
};

var front = {
	log: function(msg) {
		var mssg = {};
		mssg.time = "20000";
		mssg.content = "this is the content of msg.content";
		chrome.runtime.sendMessage({
			fn:"log",
			mssg:mssg
		}, function(response) {
			console.log(response);
		});
	}
};

background.init();
background.test();

console.log();