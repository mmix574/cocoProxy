var storage = {
	set:function(key,value){
		return chrome.storage.sync.set(key,value);
	}
	get:function(key){
		return chrome.storage.sync.get(key);
	}
}