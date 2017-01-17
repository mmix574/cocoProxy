//make it easy to debug
var background_console =  chrome.extension.getBackgroundPage().console;
console.log = function (message){
  if(message instanceof Object){
    background_console.log("["+new Date().toLocaleTimeString()+"  popup.js] ");
    var output_message = "";
    for(var key in message){
      output_message+=key+":";
      output_message+=message[key]+" ";
    }
    background_console.log(output_message);
  }else{
    background_console.log("["+new Date().toLocaleTimeString()+"  popup.js] "+message);
  }
}

//--------------start coding ---------------------//

var app = {
  pageBehavior:{
    init: function() {
      this.domActionBind();
    },
    //Only for dom Behavior operation
    setBtnActive: function(witch) {
      var btns = document.querySelectorAll(".btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("btn_selected");
      }
      var btn = document.querySelector("#" + witch);
      btn.classList.add("btn_selected");
    },
    addLogToPopupDiv: function(message) {
      // message.time ,message.content
      console.log(message.time,message.content);
    },
    domActionBind: function() {
      var btns = document.querySelectorAll(".btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          app.pageBehavior.setBtnActive(this.id);
        });
      }
    }
  },
  // All action in pageController
  pageController:{
    init:function(){
      chrome.runtime.sendMessage({fn:"getProxy"},function(response){
          app.pageBehavior.setBtnActive(response.proxy);
      });
    },
    takeControl:function(){
        app.pageBehavior.init();
        app.pageController.init();
    },
    bindBackgroundMessageAction:function(){
        chrome.runtime.onMessage.addListener(function(request.sender,sendResponse){
            if(request.fn in app.router){
              app.router[request.fn](request.sender,sendResponse);
            }else{
                console.log("");
            }
        });
    },
  },
  router:{

  },
  start:function(){
    this.pageController.takeControl();
  }
};

app.start();
