var storage = {
	set: function(key, value) {
		var data = {
			[key]: value
		};
		return chrome.storage.sync.set(data);
	},
	get: function(key,callback) {
		chrome.storage.sync.get(key,callback);
	}
};

// storage.set("say","what does the fox said");
// storage.get("say",function(items){
// 	console.log(items);
// });