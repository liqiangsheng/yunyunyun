
import axios from "axios"
import { Toast } from 'mint-ui';  //弹框
import { Indicator } from 'mint-ui';
const activityEdition = "v1.0";
const systemEdition= "v1.0";
const operationEdition= "v1.0";
const contentEdition= "v1.0";
export function InitializationData(id){
  return  new Promise((resolve,reject)=>{
    let url = window.common.apiDomain+'/apis/activity/'+activityEdition+'/activityInfo/findOne?id='+id;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })

}
export function login(tel,psd){  //登录的接口
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/sysUserOperation/bindMobile`;
    let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
    axios.post(url,data,{ header: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
      resolve(res)
    })
  })
}
// 轮播
export function tsconfigjson(){
  return  new Promise((resolve,reject)=>{
    let url = `./static/js/tsconfig.json`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
// 订单门票图片
export function packagejson(){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `./static/js/package.json`;
    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 活动安排
export function activitySchedulelist(data){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activitySchedule/list`;
    axios.post(url,data).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 根据活动图册主键id获取信息
export function activityImagesBookFindOne(id){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImagesBook/findOne?id=${id}`;
    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 根据活动图册主键id获取信息
export function activityImageslistHot(id,s){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImages/listHot?bookId=${id}&size=${s}`;
    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 图片直播封面
export function activityImagesFindOne(id){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImages/findOne?id=${id}`;
    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 图片直播
export function activityImagesList(data){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImages/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
// 火图直播
export function activityImagesBookList(data){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImagesBook/list`;
    console.log(url)
    axios.post(url,data).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 嘉宾列表
export function honoredGuestlist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/honoredGuest/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
//数据请求 没参数的 GET
export function getData (token) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+'/apis/operation/'+operationEdition+'/tagGroup/all');
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
export function getDataPost (token,data) { //请求数据
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/tagLib/match",true);
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/information/findInformationDetailById?informationId="+id);
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
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/companyInfo/findOne?id="+id);
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
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/commonUser/findOne?id="+id);
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/information/findInformationListByUserId?userId="+id+"&p="+p+"&s="+s);
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/comment/findCommentsByInfoId?informationId="+id+"&p="+p+"&s="+s);
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
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/proposalContactTrack`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
//获取手机认证码
export function telCode(tel){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/sysUserOperation/generateMobileVerifyCode?mobileType=XCX&mobile=${tel}`;

    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 智慧团
export function operationTeamInfos(p,s){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/teamInfos?p=${p}&s=${s}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
// 资源池
export function companyList(p,s){
  Indicator.open("加载中...")
  let obj = {companyCat:"2",p:p,s:s};
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/companyInfo/list`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 设计咖
export function commonUserList(p,s){
  Indicator.open("加载中...")
  let obj = {"userCat":"2",p:p,s:s}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/commonUser/list`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
// 大咖说4 风向标3 新视界5
export function specialSubjectFindSubjectInfoByCategory(state,p,s){
  Indicator.open("加载中...")
  let obj = {"subjectCategory":state,p:p,s:s}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/content/${contentEdition}/specialSubject/findSubjectInfoByCategory`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
