
import axios from "axios"
import { Toast } from 'mint-ui';  //弹框
export function InitializationData(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityInfo/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })

}
//数据请求 没参数的 GET
export function getData (token,api) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+api);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//数据请求  有参数的 Post
export function getDataPost (token,api,data) { //请求数据
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+api,true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(data);
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}



