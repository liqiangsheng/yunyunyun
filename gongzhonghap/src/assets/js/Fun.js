// import MobileDetect from 'mobile-detect'
import * as qiniu from 'qiniu-js'
import { Indicator } from 'mint-ui';
export function UrlSearch(){
  let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
  str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
  let arr=str.split("&"); //各个参数放到数组里
  for(let i=0;i < arr.length;i++){
    num=arr[i].indexOf("=");
    if(num>0){
      name=arr[i].substring(0,num);
      value=arr[i].substr(num+1);
      this[name]=value;
    }
  }
  console.log(arr)
}

  /*
   * 时间戳转换为yyyy-MM-dd hh:mm:ss 格式  formatDate()
   * inputTime   时间戳
   */
  export function formatTime3(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '/' + m + '/' + d
  }

  export function formatTime5(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '/' + m + '/' + d + h + ':' + minute + ':' + second;
  }
  export function Rgba(n){
    let a =16;
    let b =173;
    let c =255;
    let d =252;
    let e =12;
    let f =129;
    let aa,bb,cc
    aa = ((d - a)*n.toFixed(1))+a;
    bb = ((e - b)*n.toFixed(1))+b;
    cc = ((f- c)*n.toFixed(1))+c;
    let arr = [aa,bb,cc]
    return arr;
  }
//手机正则
  export function telPhone(n){
    let reg  = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/

  }
// export function MobileDetect1(){ //判断手机型号
//     //判断数组中是否包含某字符串
//     Array.prototype.contains = function(needle) {
//       for (i in this) {
//         if (this[i].indexOf(needle) > 0)
//           return i;
//       }
//       return -1;
//     }
//     let obj= {}
//     var ua =window.navigator.userAgent;
//     console.log(ua)
//     var md = new MobileDetect(ua)
//     var model = "";
// //    console.log(ua,"手机版本")
//     var md = new MobileDetect(ua);//初始化mobile-detect
//     var os = md.os();//获取系统
//     var model = "";
//     if (os == "iOS") {//ios系统的处理
//       os = md.os() + md.version("iPhone");
//       model = md.mobile();
//     } else if (os == "AndroidOS") {//Android系统的处理
//       os = md.os() + md.version("Android");
//       var sss = ua.split(";");
//       var i = sss.contains("Build/");
//       if (i > -1) {
//         model = sss[i].substring(0, sss[i].indexOf("Build/"));
//       }
//     }
//     return obj={model,version:md.versionStr('Build')}
//   }
export function QINIUUpdata(event,qiniuToken){ //七牛云上传
   let headerImg = '';
     let mydate = new Date()
     var uuid = "btkjLQS"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
     var file = event.target.files[0];
     var formData = new FormData();
     let url1="https://pub.qinius.butongtech.com";
     let observable  = qiniu.upload(file, uuid+'.jpg', qiniuToken)
     let observer= {
       next(res){
         console.log(res,"上传")
         // ...
       },
       error(err){
         console.log(res,"错误")
         // ...
       },
       complete(res){
         console.log(res,"完成")
          return headerImg = url1+'/'+res.key;
         // ...
       }
     }
     var subscription = observable.subscribe(observer)
     Indicator.open("头像上传中")
     setTimeout(()=>{
       Indicator.close();
      return headerImg =subscription.observer.headerImg;

     },1000)
}
