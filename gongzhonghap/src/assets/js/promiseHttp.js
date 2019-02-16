
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
    axios.post(url,data,{headers:{'Content-Type': 'application/json','Accept': '*/*'}}).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}

// 我的 头像初始数据 //个人
export function IntallData(item){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=${item.data.id}`;
    // let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=200`;
    axios.get(url,{headers:{'Content-Type': 'application/json','Accept': '*/*','Authorization':'Bearer '+item.data.access_token}}).then(res=>{
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// 我的 头像初始数据 //企业
export function companyInfofindCompanyInfoById(item){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/findCompanyInfoById?companyId=${item.data.id}`;
    axios.get(url,{headers:{'Content-Type': 'application/json','Accept': '*/*','Authorization':'Bearer '+item.data.access_token}}).then(res=>{
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
//判断有没有绑定过手机
export function sysUserOperationVerifyBindStatus(openId){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/verifyBindStatus`;
    let data = {wechat:openId}
    axios.post(url,data).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
//获取微信的OpenId
export function wxOpenOpenInfo(code){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/wxOpen/openInfo?code=${code}`;
    axios.get(url).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
//修改手机密码
export function sysUserOperationUpdateUserPassword(tel,psd,setPsd,token){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/updateUserPassword`;
    let data = {mobile:tel,verifyCode:psd,password:setPsd,mobileType:"XCX"}
    axios.post(url,data,{ headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": "Bearer " + token}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// //获取手机认证码登录
export function login(tel,psd){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/bindMobile`;
    let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
    axios.post(url,data,{ headers: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
// //微信绑定自动登陆
export function bangdingLogin(tel,psd,password,wechat){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/sysUserOperation/bindMobile`;
    let data = {mobile:tel,verifyCode:psd,password:password,wechat:wechat,mobileType:"XCX",}
    axios.post(url,data,{ headers: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(res=>{
      Toast("500后台服务器错误！")
    })
  })
}
//退出登录
export function loginout(){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/logout`;
    axios.post(url,{ headers: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
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

//  编辑页面初始化数据//个人
export function  EditingInformationIntall(userId,token){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/findCommonUserById?userId=${userId}`;
    axios.get(url, {headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization": "Bearer " + token
    }},).then(res=>{
      Indicator.close()
      resolve(res)
    }).catch(res=>{
      Indicator.close()
      Toast("500后台服务器错误！")
    })
  })
}
//  编辑页面初始化数据 //企业
export function  EditingInformationIntall1(userId,token){
  Indicator.open("加载中...")
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/findCompanyInfoById?companyId=${userId}`;
    axios.get(url, {headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization": "Bearer " + token
    }},).then(res=>{
      Indicator.close()
      resolve(res)
    }).catch(res=>{
      Indicator.close()
      Toast("500后台服务器错误！")
    })
  })
}

//确定编辑 有参数的 Post
export function OkEditingInformation (data,token) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/sysUserOperation/updateUserInfo",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      console.log(ajax)
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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

//  上传图片拿7牛的token
export function qiniuToken(token) { //请求数据
  Indicator.open("上传中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/system/"+systemEdition+"/sysAttachment/upPublicToken");
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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
// 上传图片到7牛
export function upImgQiniu(event,qiniuToken){

  var file = event.target.files[0];
  var formData = new FormData();
  formData.append('file', file);
  formData.append('token',qiniuToken);
  let url='https://upload-z2.qiniup.com';
  let url1="https://pub.qinius.butongtech.com";
  Indicator.open("上传中...")
  return new Promise(function (resolve,reject) {
    axios.post(url,formData,{headers:{ "Content-Type": "multipart/form-data"}}).then(res=>{
      if(res.status ==200){
        resolve(url1+ "/" + res.data.key)
        Indicator.close()
      }else{
        Indicator.close()
        Toast("头像上传失败，请重试");
        return
      }

    })
  })
}
//我的活动数据 有参数的 Post
export function meActivityData (data,token) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/customerActivitySignupNote/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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
//购票数据接口
export function findOneWithGoods(token,id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/activityInfo/findOneWithGoods?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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
//填写报名信息数据
export function findByVersionToClient(token,id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/activitySignupNoteSetting/findByVersionToClient");
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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



//智能匹配数据请求列表
export function tagGroupAll (token) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/tagGroup/all");
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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
//智能匹配数据匹配到的数据
export function tagLibMatch (token,data) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/tagLib/match",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send(data);
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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
// 订单生成数据
export function insertSignupNoteAndOrder (token,data) { //请求数据
  Indicator.open("加载中...")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//  生成订单号
export function findSimpleOneToClient (token,id) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/activity/"+activityEdition+"/customerActivitySignupNote/findSimpleOneToClient?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close()
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//  个人企业页面
export function companyInfoFindOne(id,userId,userType) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/companyInfo/findOne?id="+id+"&userId="+userId+"&userType="+userType);
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
export function commonUserFindOne(id,userId,userType) { //请求数据
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/commonUser/findOne?id="+id+"&userId="+userId+"&userType="+userType);
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
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/proposalContactTrack`;
    axios.post(url,obj,{headers:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(res=>{
        Indicator.close()
        Toast("500后台服务器错误！")
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
    axios.get(url,{headers:{"Content-Type":"application/json"}}).then(res=>{
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
  let obj = {companyCat:"2",p:p,s:s,userType:"",currentUser:""};
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/list`;
    axios.post(url,obj,{headers:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast("网络错误工坊500，请重试")
    })
  })
}
// 匠星
export function commonUserList(p,s){
  Indicator.open("加载中...")
  let obj = {"userCat":"2",p:p,s:s}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/list`;
    axios.post(url,obj,{headers:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
        resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast("网络错误匠星500，请重试")
    })
  })
}
// 大咖说4 风向标3 新视界5
export function specialSubjectFindSubjectInfoByCategory(state,p,s){
  Indicator.open("加载中...")
  let obj = {"subjectCategory":state,p:p,s:s}
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/content/${contentEdition}/specialSubject/findSubjectInfoByCategory`;
    axios.post(url,obj,{headers:{"Content-Type":"application/json"}}).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(function (error) {
      Indicator.close();
      Toast(error)
    })
  })
}
//详情里面的关注个人
export function commonUserCareUser(userId,currentUser,userType,token){ //userId关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/careUser?userId=${userId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{headers:{"Content-Type":"application/json","Authorization":"bearer "+token}}).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast("点赞500后台出错啦")
    })
  })
}
//详情里面的取消关注个人
export function commonUserCancelCareUser(userId,currentUser,userType,token){ //userId取消关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/commonUser/cancelCareUser?userId=${userId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{headers:{"Content-Type":"application/json","Authorization":"bearer "+token}}).then(res=>{
      resolve(res)
    }).catch(function (error) {
      Toast("取消点赞500后台出错啦")
    })
  })
}
//详情里面的关注企业
export function companyInfoCareCompany(companyId,currentUser,userType,token){ //companyId关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token

  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/careCompany?companyId=${companyId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{headers:{"Content-Type":"application/json","Authorization":"bearer "+token}}).then(res=>{
      resolve(res)
    }).catch(function (error) {

      Toast("点赞500后台出错啦")
    })
  })
}
//详情里面的取消关注企业
export function companyInfoCancelCareCompany(companyId,currentUser,userType,token){ //companyId取消关注谁id currentUser当前用户id userType当前用户类型，1问企业，2位个人 Authorization token

  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/${operationEdition}/companyInfo/cancelCareCompany?companyId=${companyId}&currentUser=${currentUser}&userType=${userType}`;
    axios.get(url,{headers:{"Content-Type":"application/json","Authorization":"bearer "+token}}).then(res=>{

      resolve(res)
    }).catch(function (error) {
      Toast("取消点赞500后台出错啦")
    })
  })
}
//详情里面的文章的点赞
export function informationLaudInformation(informationId,token) { //informationId 点赞谁informationId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/laudInformation?informationId="+informationId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("点赞500后台服务器错误！")
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

      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("取消点赞500后台服务器错误！")
      }
    }
  })
}
//详情里面的文章的收藏
export function informationFavoriteInformation(informationId,token) { //informationId 收藏谁informationId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/favoriteInformation?informationId="+informationId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
//详情里面的文章的取消收藏
export function informationCancelFavoriteInformation(informationId,token) { //informationId 收藏谁informationId
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/information/cancelFavoriteInformation?informationId="+informationId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
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
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){

        Toast("点赞500后台服务器错误！")
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
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("取消点赞500后台服务器错误！")
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
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("点赞500后台服务器错误！")
      }
    }
  })
}
//详情里面的评论的取消点赞 第二级
export function replyCancelLaudReply(replyId,token) { //reply 取消点赞谁replyId
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/reply/cancelLaudReply?replyId="+replyId);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("取消点赞500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
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
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/suggestionTrack/listOwner",true);
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
    let url = `${window.common.apiDomain20020}/apis/content/${contentEdition}/comment/findCommentsByPubId?pubId=${id}&p=${p}&s=${s}`;
    axios.get(url,{headers:{"Content-Type":"application/json"}}).then(res=>{
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
// POST /customerPubContent/list 传参是吃瓜页userId
export function customerPubContentList(id,p,s,pubStatus) { // 用户id，
  Indicator.open("加载中...")
  let data = {userId:id,p:p,s:s,pubStatus:pubStatus}
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
      if(ajax.status==500){
        Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
// POST /customerPubContent/list 发现
export function customerPubContentListHomePage(p,s) { // pubStatus 固定参数true
  // Indicator.open("加载中...")
  let data = {p:p,s:s,pubStatus:true}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('post',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/list",true);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.send(JSON.stringify(data));
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        // Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        // Indicator.close()
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品详情
// GET /customerPubContent/findOne
export function customerPubContentFindOne(id,userId,userType) { // 作品id
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/findOne?id="+id+"&userId="+userId+"&userType="+userType);
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
export function customerPubContentLaudContent(id,token) { // 作品id
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/laudContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText);
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的取消点赞/customerPubContent/cancelLaudContent
export function customerPubContentCancelLaudContent(id,token) { // 作品id
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/cancelLaudContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的收藏/customerPubContent/favorContent
export function customerPubContentFavorContent(id,token) { // 作品id
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/favorContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("500后台服务器错误！")
      }
    }
  })
}
//作品的取消收藏/customerPubContent/cancelFavorContent
export function customerPubContentCancelFavorContent(id,token) { // 作品id
  return new Promise(function (resolve,reject) {
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/customerPubContent/cancelFavorContent?id="+id);
    ajax.setRequestHeader("Content-Type","application/json");
    ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Toast("500后台服务器错误！")
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
  let data = {loginUser:loginUser,userType:userType,p:p,s:s}
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/content/"+contentEdition+"/allInformationAndPub/findMyCaredList?loginUser="+loginUser+"&userType="+userType+"&p="+p+"&s="+s);
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
// 分享
export function shareInfoShareUrl(url) { //url域名
  Indicator.open("加载中...")
  return new Promise(function (resolve,reject) {
    // var data =data
    let ajax = new XMLHttpRequest();
    ajax.open('get',window.common.apiDomain20020+"/apis/operation/"+operationEdition+"/wxShare/shareInfo?shareUrl="+url);
    ajax.setRequestHeader("Content-Type","application/json");
    // ajax.setRequestHeader("Authorization","bearer "+token);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
        Indicator.close();
        let res= JSON.parse(ajax.responseText)
        resolve(res) ;
      }
      if(ajax.status==500){
        Indicator.close()
        Toast("500分享后台服务器错误！")
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
    ajax.open('post',`${window.common.apiDomain20020}/apis/operation/${operationEdition}/notification/list`,true);
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
    ajax.open('get',`${window.common.apiDomain20020}/apis/operation/${operationEdition}/notification/findOne?id=${id}`);
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
    ajax.open('post',`${window.common.apiDomain20020}/apis/operation/${operationEdition}/notification/remove`,true);
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
