// ProxyManager Fatory Class
function getProxyManager(){
  var pm = {};
  pm.changeProxyMode = function(way) {
  	 switch (way) {
  		 case "direct":
  			 var config = {
  				 mode: "direct",
  			 };
  			 chrome.proxy.settings.set({
  					 value: config,
  					 scope: 'regular'
  				 },
  				 function() {});
  			 break;
  		 case "system":
  			 break;
  		 case "shadowsocks":
  			 var config = {
  				 mode: "fixed_servers",
  				 rules: {
  					 proxyForHttp: {
  						 scheme: "socks5",
  						 host: "127.0.0.1",
  						 port: 1080
  					 },
  					 proxyForHttps: {
  						 scheme: "socks5",
  						 host: "127.0.0.1",
  						 port: 1080
  					 },
  					 bypassList: ["foobar.com"]
  				 }
  			 };
  			 chrome.proxy.settings.set({
  					 value: config,
  					 scope: 'regular'
  				 },
  				 function() {});
  			 break;
  		 case "auto":
  			 break;
  		 default:
  			 break;
  	 }
   }
  return pm;
}
