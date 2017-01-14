
var background = {
    init:function(){
      this.bindMessageAction();
    },
    message:function(request,callback){
        if(callback instanceof Function){
          chrome.runtime.sendMessage(request,callback);
        }else{
          chrome.runtime.sendMessage(request);
        }
    },
    bindMessageAction:function(){
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("get some message form background.js");
      });
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
        changeProxyMode(this.id);
        that.setBtnActive(this.id);
      });
    }
  }
}

pageBehavior.log("load ready");
pageBehavior.log("load ready+1");
pageBehavior.log("load ready addListener shadowsocs ss");

for (var i = 0; i < 20; i++) {
  pageBehavior.log("hello world"+i);
}
  
function init() {
  pageBehavior.init();
  background.init();

  // chrome.runtime.sendMessage("config", function(response) {
  //   console.log(response);
  // });
  // chrome.runtime.sendMessage("log", function(response) {
  //   console.log(response);
  // });
  chrome.runtime.sendMessage({proxy:"shadowsocks"}, function(response) {
    console.log(response);
  });
}

init();

