//make it easy to debug
var old_console = chrome.extension.getBackgroundPage().old_console;
console.log = function(msg) {
    old_console.log("[" + new Date().toLocaleTimeString() + "  popup.js] ");
    old_console.log(msg);
}

// share code area
var share = chrome.extension.getBackgroundPage();

