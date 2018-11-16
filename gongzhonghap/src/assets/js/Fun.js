  export function UrlSearch(){
  let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
  str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
  let arr=str.split("&"); //各个参数放到数组里
  console.log(arr)
  for(let i=0;i < arr.length;i++){
    num=arr[i].indexOf("=");
    if(num>0){
      name=arr[i].substring(0,num);
      value=arr[i].substr(num+1);
      this[name]=value;
    }
  }
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

