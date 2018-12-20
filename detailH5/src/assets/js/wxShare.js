//微信分享
// import wx from "weixin-js-sdk";
console.log(wx)
export default {
     wxShare(newVal, _shareObj,_this){ //newVal后台返回的分享参数 ，_shareObj分享的内容 ，_this == this
        if(newVal == null || newVal == undefined ){//
            return;
        }
        // console.log("微信分享：");
        console.log(newVal,"fdsjkfksdjfkskdk");
        // console.log( _shareObj);
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: newVal.appid || null, // 必填，公众号的唯一标识
            timestamp: newVal.timestamp || null, // 必填，生成签名的时间戳
            nonceStr: newVal.nonce_str || null, // 必填，生成签名的随机串
            signature: newVal.signature || null, // 必填，签名，见附录1
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
            title: _shareObj.title || "", // 分享标题
            desc: _shareObj.desc || "", // 分享描述
            link: _shareObj.url || "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _shareObj.imgUrl || "", // 分享图标
            //   type: _shareObj.desc || "", // 分享类型,music、video或link，不填默认为link
            //   dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
                alert("分享成功");
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
            title: _shareObj.title || "", // 分享标题
            link: _shareObj.url || location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _shareObj.imgUrl || "", // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
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
