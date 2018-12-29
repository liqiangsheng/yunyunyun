
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// 订单门票图片
export function packagejson(){
  return  new Promise((resolve,reject)=>{
    let url = `./static/js/package.json`;
    axios.get(url).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// 详情数据
export function InitializationData(id){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityInfo/findOne?id=${id}`;
    axios.get(url).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// 活动安排
export function activitySchedulelist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activitySchedule/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// 嘉宾列表
export function honoredGuestlist(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/honoredGuest/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}

// 我的 头像初始数据
export function IntallData(item){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=${item.data.id}`;
    // let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=200`;
    axios.get(url,{header:{'Content-Type': 'application/json','Accept': '*/*','Authorization':'Bearer '+item.data.access_token}}).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}

//获取手机认证码
export function telCode(tel){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/generateMobileVerifyCode?mobileType=XCX&mobile=${tel}`;

    axios.get(url).then(res=>{

      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
//国 省 市
export function  regionTree(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/${systemEdition}/sysRegion/tree`;
    axios.get(url).then(res=>{

      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
//  城市
export function  levelCity(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/system/${systemEdition}/sysRegion/singlelevel?level=city`;
    axios.get(url).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
  }).catch(res=>{
    Toast("500后台服务器错误！")
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
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/tagLib/match",true);
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
export function informationId(id,userId,userType) { //请求数据 资讯id userId当前登录的id userType当前登录的type
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/findInformationDetailById?informationId="+id+"&userId="+userId+"&userType="+userType);
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
  Indicator.open("加载中...");
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImages/findOne?id=${id}`;
    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
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
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/activity/${activityEdition}/activityImagesBook/list`;
    console.log(url)
    axios.post(url,data).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
// 智慧团
export function operationTeamInfos(p,s){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/teamInfos?p=${p}&s=${s}`;
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
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/list`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    })
  })
}
// 设计咖
export function commonUserList(){
  Indicator.open("加载中...")
  let obj = {"userCat":"2"}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/list`;
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
    let url = `${window.common.apiDomain20020}/apis/content/${contentEdition}/specialSubject/findSubjectInfoByCategory`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
//详情里面的关注个人
export function commonUserCareUser(userId,currentUser,userType){ //userId关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/careUser?userId=${userId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
//详情里面的取消关注个人
export function commonUserCancelCareUser(userId,currentUser,userType){ //userId取消关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/careUser?userId=${userId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
//详情里面的关注企业
export function companyInfoCareCompany(companyId,currentUser,userType){ //companyId关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/careCompany?companyId=${companyId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
//详情里面的取消关注企业
export function companyInfoCancelCareCompany(companyId,currentUser,userType){ //companyId取消关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/cancelCareCompany?companyId=${companyId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
//详情里面的文章的点赞
export function informationLaudInformation(informationId,token) { //informationId 点赞谁informationId
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/laudInformation?informationId="+informationId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//详情里面的文章的取消点赞
export function informationCancelLaudInformation(informationId,token) { //informationId 点赞谁informationId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/cancelLaudInformation?informationId="+informationId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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

//详情里面的评论的点赞
export function commentlaudComment(commentId,token) { //commentId 点赞谁commentId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/comment/laudComment?commentId="+commentId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//详情里面的评论的取消点赞
export function commentCancelLaudComment(commentId,token) { //commentId 取消点赞谁commentId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/comment/cancelLaudComment?commentId="+commentId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//详情里面的评论的点赞 第二级
export function replylaudReply(replyId,token) { //replyId 点赞谁replyId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/reply/laudReply?replyId="+replyId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//详情里面的评论的取消点赞 第二级
export function replyCancelLaudReply(replyId,token) { //reply 取消点赞谁replyId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/reply/cancelLaudReply?replyId="+replyId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//详情里面的评论点击展开的评论 第二级
export function commentFindReplysByCommentId(commentId,token) { //commentId 点击获取更多评论的commentId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/comment/findReplysByCommentId?commentId="+commentId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//我的关注列表
export function customerCareNoteListCare(id,token,p,s) { //id 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let data={userId:id,p:p,s:s}
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerCareNote/listCare",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//我的粉丝列表
export function customerCareNoteListCared(id,token,p,s) { //id 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let data={userId:id,p:p,s:s}
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerCareNote/listCared",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 我的收藏文章
export function customerFavoriteNoteMyFavoriteList(id,token,p,s) { //id 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/customerFavoriteNote/myFavoriteList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 我的点赞文章
export function customerLaudNoteLaudList(id,token,p,s) { //id 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/customerLaudNote/myLaudList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 我的常见问题
export function questionAndAnswerList(token,p,s) { //id 用户id
  Indicator.open("加载中...")
  let data ={p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/questionAndAnswer/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 我的点赞作品
export function customerLaudNoteListFavoredContent(id,token,p,s) { //userId 用户id
  Indicator.open("加载中...")
  let data ={userId:id,p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerLaudNote/listFavoredContent",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 我的收藏作品
export function customerFavoriteNoteListFavoredContent(id,token,p,s) { //userId 用户id
  Indicator.open("加载中...")
  let data ={userId:id,p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerFavoriteNote/listFavoredContent",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 我的评论
export function commentFindMyCommentList(id,token,p,s) { //userId 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/comment/findMyCommentList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 评论 我的
export function commentFindForMeCommentList(id,token,p,s) { //userId 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/comment/findForMeCommentList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// 点赞我的
export function customerLaudNoteLaudForMeList(id,token,p,s) { //userId 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/customerLaudNote/laudForMeList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}

// 发现的详情页 评论
export function commentFindCommentsByPubId(id,p,s){ //pubId 作品id
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/content/${contentEdition}/comment/findCommentsByPubId?pubId=${id}&p=${p}&s=${s}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast("500评论数据出错啦")
    })
  })
}
// POST /customerPubContent/listOwner 查登录用户发布的内容列表，草稿pubStatus:false，已发布pubStatus:true
export function customerPubContentListOwner(id,pubStatus,p,s,token) { // 用户id，草稿pubStatus:false，已发布pubStatus:true
  Indicator.open("加载中...")
  let data = {userId:id,pubStatus:pubStatus,p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/listOwner",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// POST /customerPubContent/list 传参是吃瓜页userId
export function customerPubContentList(id,p,s) { // 用户id，
  Indicator.open("加载中...")
  let data = {userId:id,p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// POST /customerPubContent/list 发现
export function customerPubContentListHomePage(p,s) { // pubStatus 固定参数true
  Indicator.open("加载中...")
  let data = {p:p,s:s,pubStatus:true}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//作品详情
// GET /customerPubContent/findOne
export function customerPubContentFindOne(id) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/findOne?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//作品的点赞/customerPubContent/laudContent
export function customerPubContentLaudContent(id,token) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/laudContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText);
        resolve(res) ;
      }
    }
  })
}
//作品的取消点赞/customerPubContent/cancelLaudContent
export function customerPubContentCancelLaudContent(id,token) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/cancelLaudContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//作品的收藏/customerPubContent/favorContent
export function customerPubContentFavorContent(id,token) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/favorContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
//作品的取消收藏/customerPubContent/cancelFavorContent
export function customerPubContentCancelFavorContent(id,token) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/cancelFavorContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}
// POST /customerPubContent/listWithCare 关注列表
export function customerPubContentListWithCare(p,s,token) {
  Indicator.open("加载中...")
  let data = {p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/listWithCare",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
    }
  })
}

