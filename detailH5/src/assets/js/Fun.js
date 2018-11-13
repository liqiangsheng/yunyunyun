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
