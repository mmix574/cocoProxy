/**
 * Created by taita on 2017/2/5.
 */

var rule = {
    timeout:1000,//if not receive in 1000 ms ,switch to another proxy mode;
    direct_url:[
        "www.baidu.com",
        "bilibili.com",
        "taobao.com",
        "zhihu.com",
        "jd.com",
        "dangdang.com",
        "www.tuicool.com",
        "nowcoder.com",
        "www.sogou.com",
        "www.patest.cn",
        "163.com",
        "funshow.jnu.edu.cn",
        "tieba.baidu.com",
        "baidu.com",
        "jnu.edu.cn",
        "www.cskaoyan.com",
        "192.168.252.254",
        "www.jianshu.com",
        "wx.qq.com",
        "localhost",
        "cas.dgut.edu.cn",
        "mail.qq.com",
        "192.168",
        "snapflow.xyz"
    ],
    proxy_url:["google",
        "ip.cn",
        "youtube.com",
        "chrome.com",
        "github.com",
        "chrome.google.com",
        "sourceforge.net",
        "www.coursera.org",
        "kanbanflow.com",
        "tensorflow.org",
        "stackoverflow.com",
        "jsbin.com",
        "doc.scrapy.org",
        "getpocket.com",
        "leetcode.com",
        "www.vultr.com",
        "www.typing.com",
        "docs.djangoproject.com",
        "jp.myav.tv",
        "www.kaggle.com",
        "matplotlib.org"
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