/**
 * Created by taita on 2017/2/5.
 */

var rule = {
    direct_url:["www.baidu.com","ip.cn","bilibili.com"],
    proxy_url:["google","ip.cn"],

    /*return "proxy","direct" or "default"*/
    getProxyMethod:function(url){
        for(var durl in rule.direct_url){
            if(url.indexOf(durl)!=-1){
                return "direct";
            }
        }

        for(var purl in rule.proxy_url){
            if(url.indexOf(purl)!=-1){
                return "proxy";
            }
        }
        return "default";
    }
};