// chrome.bookmarks.getTree(function (Tree){
//  console.log(Tree);
// });

// chrome.proxy.settings.get(
//          {'incognito': false},
//          function(config) {console.log(JSON.stringify(config));});

// var config = {
//        mode: "socks5",
//        rules: {
//          proxyForHttp: {
//            scheme: "socks5",
//            host: "127.0.0.1",
//            port: "1080"
//          }
//      }
// };
//      chrome.proxy.settings.set(
//          {value: config, scope: 'regular'},
//          function() {});

// document.addEventListener("DOMContentLoaded", function () {
// });


// chrome.webRequest.onBeforeRequest.addListener(function(){
//    var config = {
//         mode: "fixed_servers",
//         rules: {
//           proxyForHttp: {
//             scheme: "socks5",
//             host: "127.0.0.1",
//             port:"1080"
//           },
//           bypassList: ["foobar.com"]
//         }
//       };
//       chrome.proxy.settings.set(
//           {value: config, scope: 'regular'},
//           function() {});

// });

// var config = {
//      mode: "fixed_servers",
//      rules: {
//        proxyForHttp: {
//          scheme: "socks5",
//          host: "127.0.0.1",
//          port:1080
//        },
//        bypassList: ["foobar.com"]
//      }
//    };
//    chrome.proxy.settings.set(
//        {value: config, scope: 'regular'},
//        function() {});


// var config = {
//     mode: "direct",
//   };
//   chrome.proxy.settings.set(
//       {value: config, scope: 'regular'},
//       function() {});



// console.log(chrome.storage);


// var color = "bule";
// var likesColor = "green";
//  chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     console.log("saved");
//   });

// chrome.storage.sync.get({
//    favoriteColor: 'red',
//    likesColor: true
//  }, function(items) {
//    console.log(items);
//  });


// var change = document.getElementById("change");
// change.addEventListener("click",function(){
//  if(document.getElementById("type_direct").checked){
//    console.log("type_direct");
//    var config = {
//      mode: "direct",
//    };
//    chrome.proxy.settings.set({value: config, scope: 'regular'},
//       function() {});
//  }else if(document.getElementById("type_system").checked){
//    console.log("type_system");
//  }else if(document.getElementById("type_fix").checked){
//    console.log("type_fix");

//    var config = {
//        mode: "fixed_servers",
//        rules: {
//          proxyForHttp: {
//            scheme: "socks5",
//            host: "127.0.0.1",
//            port:1080
//          },
//          proxyForHttps: {
//            scheme: "socks5",
//            host: "127.0.0.1",
//            port:1080
//          },
//          bypassList: ["foobar.com"]
//        }
//      };
//      chrome.proxy.settings.set(
//          {value: config, scope: 'regular'},
//          function() {});

//  }
// });

// $(".click_button").click(function(){
//     $(".click_button").removeClass("btn-success");
//     $(this).addClass("btn-success");



//     console.log(this.id);
// });


// var config = {

// };

// function pageInit(){

// }

// function reloadPerference(){

// }

// function savePerference(config){

// }



// function sync(key, value) {
//   chrome.storage.sync.set({
//       key: value,
//   }, function() {
//     console.log("saved");
//   });
// }



// sync("test","content");

//  chrome.storage.sync.get({
//     test: '??',
//   }, function(items) {
//    console.log(items);
//   });

init();


function init() {
  //bind btns onClick event
  var btns = document.querySelectorAll(".btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      changeProxyMode(this.id);
      setBtnActive(this.id);
    });
  }
}

function changeProxyMode(way) {
  switch (way) {
    case "direct":
      console.log("you change the proxy mode to" + way);
      break;
    case "system":
      console.log("you change the proxy mode to" + way);
      break;
    case "socks5":
      console.log("you change the proxy mode to" + way);
      break;
    case "auto":
      console.log("you change the proxy mode to" + way);
      break;
    default:
      break;
  }
}

function setBtnActive(btnid) {
  var btns = document.querySelectorAll(".btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("btn_selected");
  }
  var btn = document.querySelector("#" + btnid);
  btn.classList.add("btn_selected");
}

function log(message) {

}

var storage = {
  test:function(){
    console.log("inner call");
  }
}

chrome.storage.sync.set({
  "123": "456",
  "1234": "5678"
}, function() {

});

chrome.storage.sync.get(
  "123",
  function(items) {
    console.log(items);
  });

storage.test();