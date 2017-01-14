/****/
// chrome.bookmarks.getTree(function(tree) {
// 	var Trees = tree[0].children;
// 	for (var i = 0; i < Trees.length; i++) {
// 		console.log(Trees[i].title);
// 	}
// });

/****/
// chrome.bookmarks.onCreated.addListener(function(callback) {

// });


// 保存配置

// var color = "bule";
// var likesColor = "green";
//  chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     console.log("saved");
//   });

// chrome.storage.sync.get({
//    favoriteColor: 'red',
//    likesColor: true
//  }, function(items) {
//  	console.log(items);
//  });

// chrome.webRequest.onResponseStarted.addListener(function(requestId,...){
// 	console.log(requestId);
// });


// var changePath = ["/image/mushroom_green.png", "/image/mushroom_red.png"];

// var current_loop = 0;
// var current_count = 0;
// setInterval(function() {
// 	chrome.browserAction.setIcon({
// 		path: changePath[current_loop++],
// 		// tabId: sender.tab.id
// 	});
// 	current_loop = current_loop % changePath.length;
// 	chrome.browserAction.setBadgeText({
// 		text: "" + current_count++
// 	});
// }, 500);

// console.log(chrome.browserAction);

//  chrome.webRequest.onBeforeSendHeaders.addListener(
//         function(details) {
//           // for (var i = 0; i < details.requestHeaders.length; ++i) {
//           //   if (details.requestHeaders[i].name === 'User-Agent') {
//           //     details.requestHeaders.splice(i, 1);
//           //     break;
//           //   }
//           // }
//           console.log(details);
//           return {requestHeaders: details.requestHeaders};
//         },
//         {urls: ["<all_urls>"]}
//         // ["blocking", "requestHeaders"]
// );

// chrome.webRequest.onBeforeSendHeaders.addListener(
// 	function(details) {
// 		console.log(details);
// 		return {
// 			requestHeaders: details.requestHeaders
// 		};
// 	}, {
// 		urls: ['<all_urls>']
// 	}, ['requestHeaders']
// );

// setInterval(function(){
// 	chrome.runtime,sendMessage();
// },1000);



var proxyhandler = {
	changeProxyMode: function(way) {
		switch (way) {
			case "direct":
				var config = {
					mode: "direct",
				};
				chrome.proxy.settings.set({
						value: config,
						scope: 'regular'
					},
					function() {});
				break;
			case "system":
				break;
			case "shadowsocks":
				var config = {
					mode: "fixed_servers",
					rules: {
						proxyForHttp: {
							scheme: "socks5",
							host: "127.0.0.1",
							port: 1080
						},
						proxyForHttps: {
							scheme: "socks5",
							host: "127.0.0.1",
							port: 1080
						},
						bypassList: ["foobar.com"]
					}
				};
				chrome.proxy.settings.set({
						value: config,
						scope: 'regular'
					},
					function() {});
				break;
			case "auto":
				break;
			default:
				break;
		}
	}
};


/*response all the message*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("what does the fox say" + request);
	switch (request) {
		case "config":
			console.log("config");
			break;
		case "log":
			console.log("log");
			break;
		case "proxy":
			console.log("proxy");
			break;
		default:
			if (request instanceof Object) {
				if ("proxy" in request) {
					var way = request["proxy"];
					switch (way){
						case "direct":
							proxyhandler.changeProxyMode("direct");
							break;
						case "system":
							// add code here
							break;
						case "shadowsocks":
							proxyhandler.changeProxyMode("shadowsocks");
							break;
						case "auto":
							//add code here							
							break;
						default:
							console.log("unknown proxy type");
							break;
					}
				}else {
					console.log("unrecongnized message type object");
					console.log(request);
				}
			} else {
				console.log("unknow message type" + request);
				break;
			}
	}
});
