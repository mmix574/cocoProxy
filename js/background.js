// make it easy to debug
var old_console = {};
old_console.log = console.log;
console.log = function(msg) {
	old_console.log("[" + new Date().toLocaleTimeString() + "  background.js] ");
	old_console.log(msg);
}



//share code area
var share = this;
share.storage = {};
share.has = function(obj) {
	if (obj in share.storage) {
		return true;
	} else {
		return false;
	}
}
share.put = function(key, value) {
	if (key in share.storage) {
		return false;
	} else {
		share.storage.key = value;
	}
}
share.get = function(key) {
	if (key in share.storage) {
		return share.storage.key;
	} else {
		return null;
	}
}



//----------------start coding ---------------------//
var background = {
	proxy: "system", //default_value
	logs: [],
	proxyController:{},
	bookmarkController:{},
	init: function() {
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.fn in background) {
				background[request.fn](request, sender, sendResponse);
			} else {
				console.log("popup request for a function name " + request.fn + "which is not defined in background.js");
			}
		});
		if (background.fn.onload instanceof Function) {
			// chrome.windows.onCreated.addListener(function(windowId) {
			// 	console.log("onCreated");
			// });
			background.fn.onload();
		}
		if (background.fn.ondepart instanceof Function) {
			chrome.windows.onRemoved.addListener(function(windowId) {
				background.fn.ondepart();
			});
		}
		this.loadOtherController();
	},
	setProxy: function(request, sender, sendResponse) {
		this.proxy = request.proxy;
		this.proxyController.changeProxyMode(request.proxy,function(){
			console.log("Proxy Mode Change to "+request.proxy);
		});
	},
	getProxy: function(request, sender, sendResponse) {
		sendResponse({
			proxy: this.proxy
		});
	},
	addLog: function(request, sender, sendResponse) {

	},
	getLogs: function(request, sender, sendResponse) {

	},
	fn: {
		onload: {},
		ondepart: {},
		job:{}
	},
	start: function() {
		this.init();
	},
	loadPerference: function() {
		chrome.storage.local.get("proxy",function(items){
			background.proxy = items.proxy;
			console.log("proxy mode loaded: "+background.proxy);
		});
	},
	savePerference: function(){
		chrome.storage.local.set({proxy:background.proxy},function(){
			console.log("proxy mode saved: "+background.proxy);
		});
	},
	loadOtherController:function(){
		this.proxyController = proxyFactory.getProxyController();
	}
};

var front = {
	log: function(msg) {
		var mssg = {};
		mssg.time = "20000";
		mssg.content = "this is the content of msg.content";
		chrome.runtime.sendMessage({
			fn: "log",
			mssg: mssg
		}, function(response) {
			console.log(response);
		});
	}
};

background.fn.onload = function() {
	background.loadPerference();
}
background.fn.ondepart = function(){
	background.savePerference();
}



// chrome.storage.local.set({proxy:background.proxy},function(){
// 	console.log("save!");
// });

//last after all jobs finished
background.start();
