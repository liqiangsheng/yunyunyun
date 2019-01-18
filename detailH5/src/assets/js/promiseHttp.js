
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })

}
export function login(tel,psd){  //登录的接口
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/sysUserOperation/bindMobile`;
    let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
    axios.post(url,data,{ header: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
//活动列表数据
export function activityListData(p,s){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityInfo/list`;
    let data = {p:p,s:s}
    axios.post(url,data,{header:{'Content-Type': 'application/json','Accept': '*/*'}}).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// 图片直播
export function activityImagesList(data){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImages/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    })
  }).catch(res=>{
    Toast("500后台服务器错误！")
  })
}
// 火图直播
export function activityImagesBookList(data){

  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/activityImagesBook/list`;
    console.log(url)
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
    let url = `${window.common.apiDomain}/apis/activity/${activityEdition}/honoredGuest/list`;
    axios.post(url,data).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    }).catch(res=>{
        Indicator.close()
        Toast("500后台服务器错误！")
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
    }).catch(res=>{
        Indicator.close()
        Toast("500后台服务器错误！")
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
    }).catch(res=>{
        Indicator.close()
        Toast("500后台服务器错误！")
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
//我的关注列表
export function customerCareNoteListCare(id,token,p,s) { //id 用户id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let data={userId:id,p:p,s:s}
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerCareNote/listCare",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerCareNote/listCared",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/customerFavoriteNote/myFavoriteList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/customerLaudNote/myLaudList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
// 我的常见问题
export function questionAndAnswerList(token,p,s) {
  Indicator.open("加载中...")
  let data ={p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/questionAndAnswer/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerLaudNote/listFavoredContent",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerFavoriteNote/listFavoredContent",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/comment/findMyCommentList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/comment/findForMeCommentList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/customerLaudNote/laudForMeList?loginUserId="+id+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
// 发现的详情页 评论
export function commentFindCommentsByPubId(id,p,s){ //pubId 作品id
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/content/${contentEdition}/comment/findCommentsByPubId?pubId=${id}&p=${p}&s=${s}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast("500评论数据出错啦")
    })
  })
}
// POST /customerPubContent/list 传参是吃瓜页userId
export function customerPubContentList(id,p,s) { // 用户id， pubStatus:true,就是不包括草稿
  Indicator.open("加载中...")
  let data = {userId:id,p:p,s:s,pubStatus:true}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/findOne?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的点赞/customerPubContent/laudContent
export function customerPubContentLaudContent(id) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/laudContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的取消点赞/customerPubContent/cancelLaudContent
export function customerPubContentCancelLaudContent(id) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/cancelLaudContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的收藏/customerPubContent/favorContent
export function customerPubContentFavorContent(id) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/favorContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的取消收藏/customerPubContent/cancelFavorContent
export function customerPubContentCancelFavorContent(id) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/cancelFavorContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//详情里面的关注个人
export function commonUserCareUser(userId,currentUser,userType){ //userId关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/commonUser/careUser?userId=${userId}&currentUser=${currentUser}&userType=${userType}`;
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
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/commonUser/cancelCareUser?userId=${userId}&currentUser=${currentUser}&userType=${userType}`;
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
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/companyInfo/careCompany?companyId=${companyId}&currentUser=${currentUser}&userType=${userType}`;
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
    let url = `${window.common.apiDomain}/apis/operation/${operationEdition}/companyInfo/cancelCareCompany?companyId=${companyId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{header:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
// POST /customerPubContent/listWithCare 关注列表
export function customerPubContentListWithCare(p,s,token) {
  Indicator.open("加载中...")
  let data = {p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/customerPubContent/listWithCare",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}

// GET /allInformationAndPub/findMyCaredList 关注列表
export function allInformationAndPubFindMyCaredList(loginUser,userType,p,s,token) {//loginUser登录的id  //userType登录的状态
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain+"/apis/content/"+contentEdition+"/allInformationAndPub/findMyCaredList?loginUser="+loginUser+"&userType="+userType+"&p="+p+"&s="+s);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
// 意见反馈
export function suggestionTrackListOwner(token,p,s) { //id 用户id
  Indicator.open("加载中...")
  let data ={p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain+"/apis/operation/"+operationEdition+"/suggestionTrack/listOwner",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {

      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
// 通知列表notification/list
export function notificationList(p,s,token) {
  Indicator.open("加载中...")
  let data = {p:p,s:s}
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('post',`${window.common.apiDomain}/apis/operation/${operationEdition}/notification/list`,true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500通知后台服务器错误！")
      }
    }
  })
}
// 通知列表notification/list
export function notificationFindOne(id,token) {
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',`${window.common.apiDomain}/apis/operation/${operationEdition}/notification/findOne?id=${id}`);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500通知后台服务器错误！")
      }
    }
  })
}
// 通知列表删除notification/remove
export function notificationRemove(id,token) { //传数组
  let arr = [];
  arr.push(id);
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('post',`${window.common.apiDomain}/apis/operation/${operationEdition}/notification/remove`,true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(arr));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("500通知后台服务器错误！")
      }
    }
  })
}
