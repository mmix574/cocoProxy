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
		} else { //Proxy Mode
			chrome.browserAction.setIcon({
				path: "/image/mushroom_green.png"
					// tabId: sender.tab.id
			});
			chrome.browserAction.setBadgeText({
				text: "P"
			});
		}
	}
};