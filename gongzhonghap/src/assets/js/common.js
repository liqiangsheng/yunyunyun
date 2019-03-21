import { Toast } from 'mint-ui';  //弹框
export function Base64(){
  // var str = 'hello world!';
// var enstr = BASE64.encode(str); 加密
// console.log(enstr);
// var destr = BASE64.decode(enstr); 解析
// console.log(destr);
  var BASE64={

    enKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

    deKey: new Array(
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
    ),

    encode: function(src){
      //用一个数组来存放编码后的字符，效率比用字符串相加高很多。
      var str=new Array();
      var ch1, ch2, ch3;
      var pos=0;
      //每三个字符进行编码。
      while(pos+3<=src.length){
        ch1=src.charCodeAt(pos++);
        ch2=src.charCodeAt(pos++);
        ch3=src.charCodeAt(pos++);
        str.push(this.enKey.charAt(ch1>>2), this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
        str.push(this.enKey.charAt(((ch2<<2)+(ch3>>6))&0x3f), this.enKey.charAt(ch3&0x3f));
      }
      //给剩下的字符进行编码。
      if(pos<src.length){
        ch1=src.charCodeAt(pos++);
        str.push(this.enKey.charAt(ch1>>2));
        if(pos<src.length){
          ch2=src.charCodeAt(pos);
          str.push(this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
          str.push(this.enKey.charAt(ch2<<2&0x3f), '=');
        }else{
          str.push(this.enKey.charAt(ch1<<4&0x3f), '==');
        }
      }
      //组合各编码后的字符，连成一个字符串。
      return str.join('');
    },

    decode: function(src){
      //用一个数组来存放解码后的字符。
      var str=new Array();
      var ch1, ch2, ch3, ch4;
      var pos=0;
      //过滤非法字符，并去掉'='。
      src=src.replace(/[^A-Za-z0-9\+\/]/g, '');
      //decode the source string in partition of per four characters.
      while(pos+4<=src.length){
        ch1=this.deKey[src.charCodeAt(pos++)];
        ch2=this.deKey[src.charCodeAt(pos++)];
        ch3=this.deKey[src.charCodeAt(pos++)];
        ch4=this.deKey[src.charCodeAt(pos++)];
        str.push(String.fromCharCode(
          (ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2), (ch3<<6&0xff)+ch4));
      }
      //给剩下的字符进行解码。
      if(pos+1<src.length){
        ch1=this.deKey[src.charCodeAt(pos++)];
        ch2=this.deKey[src.charCodeAt(pos++)];
        if(pos<src.length){
          ch3=this.deKey[src.charCodeAt(pos)];
          str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2)));
        }else{
          str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4)));
        }
      }
      //组合各解码后的字符，连成一个字符串。
      return str.join('');
    }
  };
  return BASE64;

}
export function formatTime3(inputTime) {
  /*
 * 时间戳转换为yyyy-MM-dd hh:mm:ss 格式  formatDate()
 * inputTime   时间戳
 */
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
  return y + '年' + m + '月' + d + '日　 ' + h + ':' + minute + ':' + second;
}

export function formatTime4(inputTime) {
  /*
 * 时间戳转换为yyyy-MM-dd hh:mm:ss 格式  formatDate()
 * inputTime   时间戳
 */
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
  return h + ':' + minute ;
}

export function shujike(v) {
  if(v=='关注'){ //关注
     if(window.location.href.split('#')[0]=='https://dcloud.butongtech.com/'){ //正式
       window._dgt.push(['trackEvent', 'Care',['d_sjkCare'], ['关注']]);
     }else{ //测试
       window._dgt.push(['trackEvent', 'Care',['d_sjkCare'], ['关注']]);
    }

  }else if(v=='收藏'){ //收藏
    if(window.location.href.split('#')[0]=='https://dcloud.butongtech.com/'){ //正式
      window._dgt.push(['trackEvent', 'Favorate',['d_sjkFavorate'], ['收藏']]);
    }else{ //测试
      window._dgt.push(['trackEvent', 'Favorate',['d_sjkFavorate'], ['收藏']]);
    }
  }else if(v=='点赞'){ //点赞
    if(window.location.href.split('#')[0]=='https://dcloud.butongtech.com/'){ //正式
      window._dgt.push(['trackEvent', 'Laud',['d_sjkLaud'], ['点赞']]);
    }else{ //测试
      window._dgt.push(['trackEvent', 'Laud',['d_sjkLaud'], ['点赞']]);
    }
  }else if(v=='分享'){ //分享
    if(window.location.href.split('#')[0]=='https://dcloud.butongtech.com/'){ //正式
      window._dgt.push(['trackEvent', 'Share',['d_sjkShare'], ['分享']]);
    }else{ //测试
      window._dgt.push(['trackEvent', 'Share',['d_sjkShare'], ['分享']]);
    }
  }else if(v=='登陆'){ //登陆
    if(window.location.href.split('#')[0]=='https://dcloud.butongtech.com/'){ //正式
      window._dgt.push(['trackEvent', 'Login',['d_sjkLogin'], ['登陆']]);
    }else{ //测试
      window._dgt.push(['trackEvent', 'Login',['d_sjkLogin'], ['登陆']]);
    }
  }else if(v=='注册'){ //注册
    if(window.location.href.split('#')[0]=='https://dcloud.butongtech.com/'){ //正式
      window._dgt.push(['trackEvent', 'Regist',['d_sjkRegist'], ['注册']]);
    }else{ //测试
      window._dgt.push(['trackEvent', 'Regist',['d_sjkRegist'], ['注册']]);
    }
  }

}
export function isWeixin(){  //判断是否是微信浏览器的函数
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
    }else{
      return false;
    }

}



