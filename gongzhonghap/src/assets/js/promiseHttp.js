
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
// 编辑资料 头像初始数据

export function IntallData(item){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/commonUser/findCommonUserById?userId=${item.id}`;

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
//获取手机认证码登录
export function login(tel,psd){
  return  new Promise((resolve,reject)=>{
    let url = `${window.common.apiDomain20020}/apis/operation/sysUserOperation/bindMobile`;
    let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
    axios.post(url,data,{ header: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
    
      resolve(res)
    })
  })
}