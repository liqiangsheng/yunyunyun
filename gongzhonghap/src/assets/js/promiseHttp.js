
import axios from "axios"
import { Toast } from 'mint-ui';  //弹框
// 详情数据
export function InitializationData(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityInfo/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
//活动列表数据
export function activityListData(p,s){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/activityInfo/list`;
    let data = {p:p,s:s}
    axios.post(url,data,{header:{'Content-Type': 'application/json','Accept': '*/*'}}).then(res=>{
      resolve(res)
    })
  })
}
// 我的 头像初始数据

export function IntallData(item){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/commonUser/findCommonUserById?userId=${item.data.id}`;
    axios.get(url,{header:{'Content-Type': 'application/json','Accept': '*/*','Authorization':'Bearer '+item.data.access_token}}).then(res=>{
      resolve(res)
    })
  })
}

//获取手机认证码
export function telCode(tel){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/sysUserOperation/generateMobileVerifyCode?mobileType="XCX"&mobile=${tel}`;

    axios.get(url).then(res=>{

      resolve(res)
    })
  })
}
// //获取手机认证码登录
export function login(tel,psd){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/sysUserOperation/bindMobile`;
    let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
    axios.post(url,data,{ header: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{

      resolve(res)
    })
  })
}
//国 省 市
export function  regionTree(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/sysRegion/tree`;
    axios.get(url).then(res=>{

      resolve(res)
    })
  })
}
//  城市
export function  levelCity(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/sysRegion/singlelevel?level=city`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}

//  编辑页面初始化数据
export function  EditingInformationIntall(userId,token){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/commonUser/findCommonUserById?userId=${userId}`;
    axios.get(url, {header: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization": "Bearer " + token
    }},).then(res=>{
      resolve(res)
    })
  })
}

//确定编辑 有参数的 Post
export function OkEditingInformation (data,token) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/sysUserOperation/updateUserInfo",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}

//  上传图片拿7牛的token
export function qiniuToken(token) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/system/sysAttachment/upPublicToken");
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
// 上传图片到7牛
export function upImgQiniu(event,qiniuToken){
  var file = event.target.files[0];
  var formData = new FormData();
  formData.append('file', file);
  formData.append('token',qiniuToken);
  let url='https://upload-z2.qiniup.com';
  let url1="https://pub.qinius.butongtech.com";
  return new Promise(function (resolve,reject) {
    axios.post(url,formData,{header:{ "Content-Type": "multipart/form-data"}}).then(res=>{
      if(res.status ==200){
        resolve(url1+ "/" + res.data.key)
      }else{
        Toast("头像上传失败，请重试");
        return
      }

    })
  })
}
//我的活动数据 有参数的 Post
export function meActivityData (data,token) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/activity/customerActivitySignupNote/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//数据请求  有参数的 Post //获取手机认证码登录
// export function login (tel,psd) { //请求数据
//   let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
//
//   return new Promise(function (resolve,reject) {
//     let ajax = new XMLHttpRequest();
//     ajax.open('post',window.common.apiDomain20020+'/apis/operation/sysUserOperation/bindMobile',true);
//     ajax.setRequestHeader("Content-Type","application/json");
//     ajax.setRequestHeader("Accept","application/json");
//     ajax.send(JSON.stringify(data));
//     ajax.onreadystatechange = function () {
//       if (ajax.readyState==4 &&ajax.status==200) {
//         let res= JSON.parse(ajax.responseText)
//         resolve(res) ;
//       }
//     }
//   })
// }
