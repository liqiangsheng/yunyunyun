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

  export function  getData (mode,url,token) { //ajax原生请求
    let ajax = new XMLHttpRequest();
    ajax.open('get','http://172.16.0.54:10020/apis/system/sysAttachment/upPublicToken');
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Accept","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
        console.log(JSON.parse(ajax.responseText));//输入相应的内容
      }
    }
  }
