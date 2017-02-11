/**
 * Created by taita on 2017/2/5.
 */

var rule = {
    direct_url:[
        "www.baidu.com",
        "bilibili.com",
        "www.taobao.com",
        "zhihu.com",
        "jd.com",
        "dangdang.com",
        "www.tuicool.com",
        "nowcoder.com",
        "www.sogou.com"
    ],
    proxy_url:["google",
        "ip.cn",
        "youtube.com",
        "chrome.com",
        "github.com",
        "chrome.google.com",
        "sourceforge.net",
        "www.coursera.org"
    ],

    /*return "proxy","direct" or "default"*/
    getProxyMethod:function(url){
        for(var item in rule.proxy_url){
            if(url.indexOf(rule.proxy_url[item])!=-1){
                return "proxy";
            }
        }
        for(var item in rule.direct_url){
            if(url.indexOf(rule.direct_url[item])!=-1){
                return "direct";
            }
        }
        return "default";
    }
};
var urltest = function(url){
    console.log(rule.getProxyMethod(url));
}