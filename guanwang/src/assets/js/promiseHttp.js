
import axios from "axios"
// const activityEdition = "v1.0";
// const systemEdition= "v1.0";
const operationEdition= "v1.0";
// const contentEdition= "v1.0";
// const apiDomain =  "http://172.16.0.12:10020";//ajax数据请求url
const apiDomain =  "https://dcloud.butongtech.com:20020";//ajax数据请求url
// const apiDomain =  "http://172.16.0.58:10020";//ajax数据请求url


//  关于不同
export function proposalContactTrack(obj) { //请求数据

  return  new Promise((resolve)=>{
    let url = `${apiDomain}/apis/operation/${operationEdition}/proposalContactTrack`;
    axios.post(url,obj,{header:{"Content-Type":"application/json"}}).then(res=>{
      resolve(res)
    })
  })
}

