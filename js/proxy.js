// ProxyManager Factory Class
var proxyFactory = {
    app:null,
    getProxyController: function(app) {
        if(app){
            this.app = app;
        }
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
                case "pac_script":
                    var config = {
                        mode: "pac_script",
                        pacScript: {
                            data: "function FindProxyForURL(url, host) {\n" +
                                "  if (host == 'ip.cn')\n" +
                                "    return 'PROXY 127.0.0.1:1080';\n" +
                                "  return 'DIRECT';\n" +
                                "}"
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
                case "system":
                    var config = {
                        mode: "system"
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
                            bypassList: ["127.0.0.1","192.168.1.1/24","192.168.252.1/24","<local>"]
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
                case "proxy":
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
                            bypassList: ["127.0.0.1","192.168.1.1/24","<local>"]
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
                    //base on bookmark
                    break;
                default:
                    break;
            }
        }
        return pm;
    }
}