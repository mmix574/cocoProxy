var background = {
	proxy: "direct", //default_value
	is_auto:false,
	logs: [],
    tabs:[],
	proxyController: {},
	bookmarkController: {},
	networkController: {},
	init: function() {
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.fn in background.fn) {
				background.fn[request.fn](request, sender, sendResponse);
			} else {
				console.log("popup request for a function name " + request.fn + "which is not defined in background.js");
			}
		});
		if (background.interface.onload instanceof Function) {
			// chrome.windows.onCreated.addListener(function(windowId) {
			// 	console.log("onCreated");
			// });
			background.interface.onload();
		}
		if (background.interface.ondepart instanceof Function) {
			chrome.windows.onRemoved.addListener(function(windowId) {
				background.interface.ondepart();
			});
		}
		this.loadOtherController();
	},
    service:{
        proxyModeChange:function(way){
            if(way=="direct"||way=="proxy"){
                background.proxy = way;
                common.changePopupIcon(background.proxy);
                background.proxyController.changeProxyMode(background.proxy, function() {
                    console.log("Proxy Mode Change to " +  background.proxy);
                });
            }
        }
    },
	interface: {
		onload: {},
		ondepart: {},
		job: {}
	},
	fn:{
		//Message Calling
		setProxy: function(request, sender, sendResponse) {
			background.proxy = request.proxy;
			background.proxyController.changeProxyMode(request.proxy, function() {
				console.log("Proxy Mode Change to " + request.proxy);
			});
		},
		getProxy: function(request, sender, sendResponse) {
			sendResponse({
				proxy: background.proxy
			});
		},
		addLog: function(request, sender, sendResponse) {

		},
		getLogs: function(request, sender, sendResponse) {

		},
		stopTab: function(request, sender, sendResponse) {
			console.log(sender.tab.id);
		}
	},
	start: function() {
		this.init();
	},
	loadPerference: function() {
		chrome.storage.local.get("proxy", function(items) {
		    if(items.proxy){
                background.proxy = items.proxy;
            }
			background.proxyController.changeProxyMode(background.proxy);
			common.changePopupIcon(background.proxy);
			console.log("proxy mode loaded: " + background.proxy);
		});
	},
	savePerference: function() {
		chrome.storage.local.set({
			proxy: background.proxy
		}, function() {
			console.log("proxy mode saved: " + background.proxy);
		});
	},
	loadOtherController: function() {
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

background.interface.onload = function() {
	background.loadPerference();
}
background.interface.ondepart = function() {
	background.savePerference();
}




//call after all jobs finished
background.start();



chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
        if(details.type=="main_frame"){
           var way = rule.getProxyMethod(details.url);
               console.log("url:"+details.url+"methods"+way);

            if(way=="direct"){
                background.service.proxyModeChange(way);
            }else if(way=="proxy"){
                background.service.proxyModeChange(way);
            }else{
                //default calling here
            }
        }
	}, {
		urls: ["<all_urls>"]
	});


// chrome.webRequest.onCompleted.addListener(
// 	function(details) {
// 		console.log("onCompleted...");
// 		console.log(details);
// 	}, {
// 		urls: ["*://www.evil.com/*"]
// 		// urls: ["<all_urls>"]
// 	});





// Chrome inspect functions
function tab_status(){
    chrome.tabs.query({active:true,currentWindow:true,lastFocusedWindow:true},function(tabs){
        console.log(tabs);
    });
}

function test(){

}
