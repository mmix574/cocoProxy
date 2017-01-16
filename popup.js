var background = {
    init:function(){
      this.bindMessageAction();
    },
    bindMessageAction:function(){
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request){
          case "addlog":
            break;
          default:
            break;
        }
        console.log("get some message form background.js");
      });
    },
    setProxy:function(way){
       chrome.runtime.sendMessage({proxy:way},function(callback){
          console.log(callback);
       });
    },
    getProxy:function(callback){
        chrome.runtime.sendMessage("proxy",callback);
    }
};

var pageBehavior = {
  init: function() {
    this.bindBtnAction();
  },
  setBtnActive: function(witch) {
    var btns = document.querySelectorAll(".btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("btn_selected");
    }
    var btn = document.querySelector("#" + witch);
    btn.classList.add("btn_selected");
  },
  log: function(message) {
    var div_console = document.querySelector("#console");
    var output_message = "[" + new Date().toLocaleTimeString() + "] " + message;
    div_console.innerHTML += output_message+"<br/>";
  },
  bindBtnAction: function() {
    var that = this;
    var btns = document.querySelectorAll(".btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        background.setProxy(this.id);
        that.setBtnActive(this.id);
      });
    }
  }
}

  
var pageController= {
    init:function(){

    },
    render:function(config){

    },
    start:function(){
      pageBehavior.init();
      background.init();
      this.loadConfigFromBackground();
    },
    loadConfigFromBackground:function(){
        background.getProxy(function(btn){
          pageBehavior.setBtnActive(btn);
        });
    }
};


function init() {
    pageController.start();
}

init();