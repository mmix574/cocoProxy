var app = {
  background:{
    init: function() {
      this.bindMessageAction();
    },
    bindMessageAction: function() {
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request) {
          case "addlog":
            break;
          default:
            break;
        }
        console.log("get some message form background.js"+request);
      });
    },
    setProxy: function(way) {
      chrome.runtime.sendMessage({
        proxy: way
      }, function(callback) {
        console.log(callback);
      });
    },
    getProxy: function(callback) {
      chrome.runtime.sendMessage("proxy", callback);
    }
  },
  pageBehavior:{
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
      div_console.innerHTML += output_message + "<br/>";
    },
    bindBtnAction: function() {
      var that = this;
      var btns = document.querySelectorAll(".btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          app.background.setProxy(this.id);
          that.setBtnActive(this.id);
        });
      }
    }
  },
  pageController:{
    init: function() {
    },
    takeControl: function() {
      this.init();
      app.pageBehavior.init();
      app.background.init();
      this.loadConfigFromBackground();
    },
    loadConfigFromBackground: function() {
        app.background.getProxy(function(which){
          app.pageBehavior.setBtnActive(which);
        })
    }
  },
  start:function(){
    this.pageController.takeControl();
  }
};

app.start();
