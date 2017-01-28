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

