
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


