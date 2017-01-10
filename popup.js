// chrome.bookmarks.getTree(function (Tree){
// 	console.log(Tree);
// });

 // chrome.proxy.settings.get(
 //          {'incognito': false},
 //          function(config) {console.log(JSON.stringify(config));});

 // var config = {
 //        mode: "socks5",
 //       	rules: {
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
//   	var config = {
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


	var config = {
	    mode: "direct",
	  };
	  chrome.proxy.settings.set(
	      {value: config, scope: 'regular'},
	      function() {});
      


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
 //  	console.log(items);
 //  });


 var change = document.getElementById("change");
 change.addEventListener("click",function(){
 	if(document.getElementById("type_direct").checked){
 		console.log("type_direct");
 		var config = {
	    	mode: "direct",
	  	};
	  	chrome.proxy.settings.set({value: config, scope: 'regular'},
	      function() {});
 	}else if(document.getElementById("type_system").checked){
 		console.log("type_system");
 	}else if(document.getElementById("type_fix").checked){
 		console.log("type_fix");

  	var config = {
        mode: "fixed_servers",
        rules: {
          proxyForHttp: {
            scheme: "socks5",
            host: "127.0.0.1",
            port:1080
          },
          bypassList: ["foobar.com"]
        }
      };
      chrome.proxy.settings.set(
          {value: config, scope: 'regular'},
          function() {});

 	}
 });