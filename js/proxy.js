// ProxyManager Factory Class
var proxyFactory = {
  getProxyController: function() {
    var pm = {};
    pm.changeProxyMode = function(way, fn) {
      switch (way) {
        case "direct":
          var config = {
            mode: "direct",
          };
          chrome.proxy.settings.set({
              value: config,
              scope: 'regular'
            },
            function() {
              if (fn instanceof Function) {
                fn();
              }
            });
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
              bypassList: ["ip.cn"]
            }
          };
          chrome.proxy.settings.set({
              value: config,
              scope: 'regular'
            },
            function() {
              if (fn instanceof Function) {
                fn();
              }
            });
          break;
        case "auto":
          break;
        default:
          break;
      }
    }
    return pm;
  }

}