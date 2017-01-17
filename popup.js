//make it easy to debug
var background_console =  chrome.extension.getBackgroundPage().console;
console.log = function (message){
    background_console.log("["+new Date().toLocaleTimeString()+"  popup.js] "+message);
}

//--------------start coding ---------------------//

var app = {

  pageBehavior:{
    init: function() {
      this.domActionBind();
    },


    //Behavior
    setBtnActive: function(witch) {
      var btns = document.querySelectorAll(".btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("btn_selected");
      }
      var btn = document.querySelector("#" + witch);
      btn.classList.add("btn_selected");
    },
    // log: function(message) {
    //   var div_console = document.querySelector("#console");
    //   var output_message = "[" + new Date().toLocaleTimeString() + "] " + message;
    //   div_console.innerHTML += output_message + "<br/>";
    // },

    //Dom Button Click Action
    domActionBind: function() {
      var that = this;
      var btns = document.querySelectorAll(".btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          that.setBtnActive(this.id);
        });
      }
    }
  },
  pageController:{
    takeControl:function(){

    }
  },
  start:function(){
    this.pageController.takeControl();
  }
};

app.start();
