var background = {
	proxy: "direct", //default_value
	is_auto: false,
	logs: [],
	tabs: [],
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
	service: {
		proxyModeChangeService: function(way) {
			if (way == "direct" || way == "proxy") {
				background.proxy = way;
				common.changePopupIcon(background.proxy);
				background.proxyController.changeProxyMode(background.proxy, function() {
					console.log("Proxy Mode Change to " + background.proxy);
				});
			}
		},
		takeThisUrlIntoConsider: function(url) {
			var way = rule.getProxyMethod(url);
			if (way == "direct" || way == "proxy") {
				background.service.proxyModeChangeService(way);
			} else {
				console.log("default proxy mode calling .." + url);
			}
		}

	},
	interface: {
		onload: {},
			ondepart: {},
			job: {}
	},
	fn: {
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
	loadPerference: function(time) {
		background.proxyController.changeProxyMode("direct");
		setTimeout(function() {
			chrome.storage.local.get("proxy", function(items) {
				if (items.proxy) {
					background.proxy = items.proxy;
				}
				background.proxyController.changeProxyMode(background.proxy);
				common.changePopupIcon(background.proxy);
				console.log("proxy mode loaded: " + background.proxy);
			});
		}, time);
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
	background.loadOtherController();
	background.loadPerference(2000);
}
background.interface.ondepart = function() {
	background.savePerference();
}



//call after all jobs finished
background.start();



chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.type == "main_frame") {
			background.service.takeThisUrlIntoConsider(details.url);
		}
	}, {
		urls: ["<all_urls>"]

	}, ["blocking"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (details.type == "main_frame" && details.url) {
			background.service.takeThisUrlIntoConsider(details.url);
		}
	}, {
		urls: ["<all_urls>"]

	}, ["blocking"]);

chrome.webRequest.onErrorOccurred.addListener(function(details) {
	if (details.error == "net::ERR_CONNECTION_REFUSED" && background.proxy == "direct") {

		//todo 20170211
	}
}, {
	urls: ["<all_urls>"]
});



//tab点击切换
chrome.tabs.onActiveChanged.addListener(function() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		if (tabs[0].url) {
			background.service.takeThisUrlIntoConsider(tabs[0].url);
		}
	});
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		if (tabs[0].url) {
			background.service.takeThisUrlIntoConsider(tabs[0].url);
		}
	});
});


// create right click menu
searchUrbanDict = function(word) {
	var query = word.selectionText;
	chrome.tabs.create({
		url: "http://www.urbandictionary.com/define.php?term=" + query
	});
};

chrome.contextMenus.create({
	title: "Proxy Setting",
	contexts: ["page"], // ContextType
	onclick: function() {
		console.log("you click me ");
		alert("clicked");
	}
});



// these code are used for testing
// Chrome inspect functions
function tab_status() {
	chrome.tabs.query({
		active: true,
		currentWindow: true,
		lastFocusedWindow: true
	}, function(tabs) {
		console.log(tabs);
	});
}

function backgroundtest() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(xhttp.responseText);
		}
	};
	xhttp.open("GET", "http://www.baidu.com", true);
	xhttp.send();
}