/**/
// chrome.bookmarks.onCreated.addListener(function(callback) {
// 	console.log(callback);
// });

// var i = 0;
// setInterval(function(){
// 		chrome.runtime.sendMessage({"addlog":"this is the content of the log"+i});
// 		i++;
// },1000);



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