/**
 * Created by taita on 2017/2/5.
 */

var rule = {
    direct_url:["www.baidu.com","bilibili.com","www.taobao.com","zhihu.com","jd.com"],
    proxy_url:["google","ip.cn","youtube.com"],

    /*return "proxy","direct" or "default"*/
    getProxyMethod:function(url){
        for(var item in rule.direct_url){
            if(url.indexOf(rule.direct_url[item])!=-1){
                return "direct";
            }
        }

        for(var item in rule.proxy_url){
            if(url.indexOf(rule.proxy_url[item])!=-1){
                return "proxy";
            }
        }
        return "default";
    }
};