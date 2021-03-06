
import axios from "axios"
import { Toast } from 'mint-ui';  //弹框
import { Indicator } from 'mint-ui';
export function InitializationData(id){
  return  new Promise((resolve,reject)=>{
    let url = window.common.apiDomain+'/apis/activity/activityInfo/findOne?id='+id;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })

}
// 活动安排
export function activitySchedulelist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activitySchedule/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
// 根据活动图册主键id获取信息
export function activityImagesBookFindOne(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityImagesBook/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
// 根据活动图册主键id获取信息
export function activityImageslistHot(id,s){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityImages/listHot?bookId=${id}&size=${s}`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
// 图片直播封面
export function activityImagesFindOne(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityImages/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
// 图片直播
export function activityImagesList(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityImages/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
// 火图直播
export function activityImagesBookList(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/activityImagesBook/list`;
    console.log(url)
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
// 嘉宾列表
export function honoredGuestlist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/honoredGuest/list`;
    axios.post(url,data).then(res=>{
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

//  个人企业详情
export function informationId(id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/content/information/findInformationDetailById?informationId="+id);
    ajax.setRequestHeader("Content-Type","application/json");

    ajax.send();
    ajax.onreadystatechange = function () {
      Indicator.close();
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//  个人企业页面
export function companyInfoFindOne(id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/operation/companyInfo/findOne?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      Indicator.close();
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//  个人主页页面
export function commonUserFindOne(id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/operation/commonUser/findOne?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      Indicator.close();
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//  个人主页企业列表页面
export function findInformationListByUserIdUserId(id,p,s) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/content/information/findInformationListByUserId?userId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      Indicator.close();
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//  个人主页企业评论
export function findCommentsByInfoId(id,p,s) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/content/comment/findCommentsByInfoId?informationId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      Indicator.close();
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//  关于不同
export function proposalContactTrack(obj) { //请求数据
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/proposalContactTrack`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
//获取手机认证码
export function telCode(tel){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/sysUserOperation/generateMobileVerifyCode?mobileType=XCX&mobile=${tel}`;

    axios.get(url).then(res=>{

      resolve(res)
    })
  })
}
