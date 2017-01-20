//make it easy to debug
var old_console = chrome.extension.getBackgroundPage().old_console;
console.log = function(msg) {
    old_console.log("[" + new Date().toLocaleTimeString() + "  popup.js] ");
    old_console.log(msg);
}

// share code area
var share = chrome.extension.getBackgroundPage();



//--------------start coding ---------------------//

var app = {
    view: {
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
            var textarea = document.querySelector("#console");
            console.log(textarea);
        },
        domActionBind: function() {
            var btns = document.querySelectorAll(".btn");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function() {
                    app.view.setBtnActive(this.id);
                    if(app.view.fn.btndown instanceof Function){
                        app.view.fn.btndown(this.id);
                    }
                    console.log("clicked "+this.id);
                });

            }
        },
        //call when button is push down
        fn:{
            btndown:{}
        },
    },
    // All action in controller
    controller: {
        init: function() {
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                if (request.fn in app.router) {
                    sendResponse({
                        msg: "ok"
                    });
                    app.router[request.fn](request, sender, sendResponse);
                } else {
                    sendResponse({
                        msg: "no matchs method in router"
                    });
                }
            });
            chrome.runtime.sendMessage({
                fn: "getProxy"
            }, function(response) {
                app.view.setBtnActive(response.proxy);
            });

            //
            app.view.fn.btndown = function(id){
                chrome.runtime.sendMessage({fn:"setProxy",proxy:id});
            }

        },
        takeControl: function() {
            app.view.init();
            app.controller.init();
        },
    },
    router: {
        log: function(request, sender, sendResponse) {
            console.log(request);
        }
    },
    start: function() {
        this.controller.takeControl();
    },
    test: function() {
        app.view.addLogToPopupDiv({
            time: "22",
            content: "hsihsi"
        });
    }
};




app.start();
app.test();
