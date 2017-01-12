chrome.bookmarks.getTree(function(tree){
	var Trees = tree[0].children;
	for (var i = 0; i < Trees.length; i++) {
		console.log(Trees[i].title);
	}
});

chrome.bookmarks.onCreated.addListener(function(callback){
	console.log(callback);
});


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





 /**allow to access
	Object
Event
:
Event()
app
:
Object
bookmarks
:
Object
browserAction
:
Object
csi
:
()
debugger
:
Object
extension
:
Object
i18n
:
Object
loadTimes
:
()
management
:
Object
permissions
:
Object
proxy
:
Object
runtime
:
Object
storage
:
Object
tabs
:
Object
webRequest
:
Object
windows
:
Object
__proto__
:
Object
 */
var changePath = ["/image/mushroom_green.png","/image/mushroom_red.png"];

var current_loop = 0;
var current_count = 0;
setInterval(function(){
	chrome.browserAction.setIcon({
    path: changePath[current_loop++],
    // tabId: sender.tab.id
});
    current_loop = current_loop%changePath.length;
	// chrome.browserAction.setBadgeText({text: ""+current_count++});
},500);

console.log(chrome.browserAction);