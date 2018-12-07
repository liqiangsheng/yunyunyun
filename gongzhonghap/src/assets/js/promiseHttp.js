
import axios from "axios"
import { Toast } from 'mint-ui';  //弹框
import { Indicator } from 'mint-ui';
const activityEdition = "v1.0";
const systemEdition= "v1.0";
const operationEdition= "v1.0";
const contentEdition= "v1.0";
// 字典缓存本地
export function loadDicTree(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/${systemEdition}/init/loadDicTree`;
    axios.get(url).then(res=>{
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
  return  new Promise((resolve,reject)=>{
    let url = `./static/js/package.json`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
// 详情数据
export function InitializationData(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityInfo/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}
// 活动安排
export function activitySchedulelist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activitySchedule/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
// 嘉宾列表
export function honoredGuestlist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/honoredGuest/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  })
}
//活动列表数据
export function activityListData(p,s){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityInfo/list`;
    let data = {p:p,s:s}
    axios.post(url,data,{header:{'Content-Type': 'application/json','Accept': '*/*'}}).then(res=>{
      resolve(res)
    })
  })
}

// 我的 头像初始数据

export function IntallData(item){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=${item.data.id}`;
    axios.get(url,{header:{'Content-Type': 'application/json','Accept': '*/*','Authorization':'Bearer '+item.data.access_token}}).then(res=>{
      resolve(res)
    })
  })
}

//获取手机认证码
export function telCode(tel){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/generateMobileVerifyCode?mobileType=XCX&mobile=${tel}`;

    axios.get(url).then(res=>{

      resolve(res)
    })
  })
}
// //获取手机认证码登录
export function login(tel,psd){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/bindMobile`;
    let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
    axios.post(url,data,{ header: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{

      resolve(res)
    })
  })
}
//国 省 市
export function  regionTree(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/${systemEdition}/sysRegion/tree`;
    axios.get(url).then(res=>{

      resolve(res)
    })
  })
}
//  城市
export function  levelCity(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/${systemEdition}/sysRegion/singlelevel?level=city`;
    axios.get(url).then(res=>{
      resolve(res)
    })
  })
}

//  编辑页面初始化数据
export function  EditingInformationIntall(userId,token){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=${userId}`;
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
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/sysUserOperation/updateUserInfo",true);
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
    ajax.open('get',window.common.apiDomain20020+"/apis/system/"+systemEdition+"/sysAttachment/upPublicToken");
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
  Indicator.open()
  return new Promise(function (resolve,reject) {
    axios.post(url,formData,{header:{ "Content-Type": "multipart/form-data"}}).then(res=>{
      if(res.status ==200){
        resolve(url1+ "/" + res.data.key)
        Indicator.close()
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
    ajax.open('post',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/customerActivitySignupNote/list",true);
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
//购票数据接口
export function findOneWithGoods(token,id) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/activityInfo/findOneWithGoods?id="+id);
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
//填写报名信息数据
export function findByVersionToClient(token,id) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/activitySignupNoteSetting/findByVersionToClient");
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



//智能匹配数据请求列表
export function tagGroupAll (token) { //请求数据
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/tagGroup/all");
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
//智能匹配数据匹配到的数据
export function tagLibMatch (token,data) { //请求数据
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"tagLib/match",true);
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
// 订单生成数据
export function insertSignupNoteAndOrder (token,data) { //请求数据
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/customerActivitySignupNote/insertSignupNoteAndOrder",true);
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
//  生成订单号
export function findSimpleOneToClient (token,id) { //请求数据
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/customerActivitySignupNote/findSimpleOneToClient?id="+id);
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
//  个人企业详情
export function informationId(id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/findInformationDetailById?informationId="+id);
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
//  个人企业页面
export function companyInfoFindOne(id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/companyInfo/findOne?id="+id);
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
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/commonUser/findOne?id="+id);
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
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/findInformationListByUserId?userId="+id+"&p="+p+"&s="+s);
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
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/comment/findCommentsByInfoId?informationId="+id+"&p="+p+"&s="+s);
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
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/proposalContactTrack`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 根据活动图册主键id获取信息
export function activityImagesBookFindOne(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImagesBook/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 根据活动图册主键id获取信息
export function activityImageslistHot(id,s){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImages/listHot?bookId=${id}&size=${s}`;
    axios.get(url).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 图片直播封面
export function activityImagesFindOne(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImages/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 图片直播
export function activityImagesList(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImages/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 火图直播
export function activityImagesBookList(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImagesBook/list`;
    console.log(url)
    axios.post(url,data).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 智慧团
export function operationTeamInfos(p,s){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/teamInfos?p=${p}&s=${s}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 资源池
export function companyList(p,s){
  let obj = {companyCat:"2",p:p,s:s};
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/list`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      resolve(res)
    })
  })
}
// 设计咖
export function commonUserList(){
  let obj = {"userCat":"2"}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/list`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
        resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
// 大咖说4 风向标3 新视界5
export function specialSubjectFindSubjectInfoByCategory(state,p,s){
  let obj = {"subjectCategory":state,p:p,s:s}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/content/${contentEdition}/specialSubject/findSubjectInfoByCategory`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast(error)
    })
  })
}
