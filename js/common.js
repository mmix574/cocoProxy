// [] or {} return true
var empty = function(obj) {
	if (Object.keys(obj).length == 0) {
		return false;
	} else {
		return true;
	}
}


var common = {
	changePopupIcon: function(whichtype) {
		if (whichtype == "direct") {
			chrome.browserAction.setIcon({
				path: "/image/mushroom_red.png"
					// tabId: sender.tab.id
			});
			chrome.browserAction.setBadgeText({
				text: "D"
			});
			chrome.browserAction.setBadgeBackgroundColor({color: [74,202,187, 255]});
		} else { //Proxy Mode
			chrome.browserAction.setIcon({
				path: "/image/mushroom_green.png"
					// tabId: sender.tab.id
			});
			chrome.browserAction.setBadgeText({
				text: "P"
			});
			chrome.browserAction.setBadgeBackgroundColor({color: [74,202,187, 255]});
		}
	}
};

var config = {
	proxyList:["*.baidu.com"],
	directList:["*.google.com.hk"],
	default:"direct"
};