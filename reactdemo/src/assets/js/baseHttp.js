import axios from "axios"
const   apiDomain120020 = "http://dcloud.butongtech.com:20019";//登录数据请求url
const   apiDomain20020 = "http://172.16.0.12:10020"; //ajax数据请求url
// const   apiDomain20020 = "http://172.16.0.54:10020"; //ajax数据请求url
// const   apiDomain20020 = "http://172.16.0.58:10020"; //ajax数据请求url
const activityEdition = "v1.0";
const systemEdition= "v1.0";
const operationEdition= "v1.0";
const contentEdition= "v1.0";
export function homePage() {
 return new Promise(function(resolve,reject){
     let url = `${apiDomain20020}/apis/system/${systemEdition}/init/loadDicTree`;
     axios.get(url).then(res=>{
         resolve(res)
     })
 })

}
// 大咖说4 风向标3 新视界5
export function specialSubjectFindSubjectInfoByCategory(state,p,s){
    let obj = {"subjectCategory":state,p:p,s:s}
    return  new Promise((resolve,reject)=>{
        let url = `${apiDomain20020}/apis/content/${contentEdition}/specialSubject/findSubjectInfoByCategory`;
        axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
            resolve(res)
        }).catch(function (error) {
            Toast(error)
        })
    })
}