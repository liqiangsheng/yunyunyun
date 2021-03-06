//微信分享
// import wx from "weixin-js-sdk";
// console.log(wx)
import {shujike} from './common'
export default {
     wxShare(newVal, _shareObj,_this){ //newVal后台返回的分享参数 ，_shareObj分享的内容 ，_this == this
        if(newVal == null || newVal == undefined ){//
            return;
        }
        // console.log("微信分享：");
        // console.log(newVal);
        // console.log( _shareObj,"     wxShare(newVal, _shareObj,_this){ //newVal后台返回的分享参数 ，_shareObj分享的内容 ，_this == this\n");
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: newVal.appId , // 必填，公众号的唯一标识
            timestamp: newVal.timestamp, // 必填，生成签名的时间戳
            nonceStr: newVal.noncestr , // 必填，生成签名的随机串
            signature: newVal.signature, // 必填，签名，见附录1
            jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(() => {
            // if (_shareObj.isOpenAllMenu) {
            //   //显示所有功能按钮接口
            //   wx.showAllNonBaseMenuItem();
            // }
            //分享给朋友
            wx.onMenuShareAppMessage({
            title: _shareObj.title||"「不同」" , // 分享标题
            desc: _shareObj.desc ||'「不同」，以“让科技赋能设计，设计驱动产业升级”为使命，致力于打造以设计师品牌为核心的设计资源生态圈，通过建立行业资源的数字化链接，提升设计服务与产业需求的匹配效率，推动设计向产业聚焦，产业与设计融合。同时，我们推动最前沿的设计资讯分享和跨行业深度交流，聚焦海量原生设计第一现场，让大众领略设计之美，与广大设计师一起探索未来生活。', // 分享描述
            link: _shareObj.url||window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: _shareObj.imgUrl||'https://pub.qinius.butongtech.com/ios1024x1024%E6%A1%8C%E9%9D%A2%E5%9B%BE%E6%A0%87.png', // 分享图标
            //   type: _shareObj.desc || "", // 分享类型,music、video或link，不填默认为link
            //   dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
                shujike('分享');
                alert("分享成功");

            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
              alert("取消");
            }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
            title: _shareObj.title||"「不同」", // 分享标题
              link: _shareObj.url||window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _shareObj.imgUrl||'https://pub.qinius.butongtech.com/ios1024x1024%E6%A1%8C%E9%9D%A2%E5%9B%BE%E6%A0%87.png', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
               console.log(res)
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
            });
        });
        wx.error(function(res) {
            // alert("error"+res);
            // location.reload();
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }
}
