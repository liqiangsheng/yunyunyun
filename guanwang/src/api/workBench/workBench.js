import fetch from '@/utils/fetch';
import {home,process} from '@/utils/workBenchServer'

/*
 * home page
* */

//get Number
export function getNumbers(params){
	return fetch({
        method: 'GET',
        url: home.getNumber,
        data: params
    })
}

//获取消息列表
export function msgList(params){
	return fetch({
        method: 'POST',
        url: home.msgList,
        data: params
    })
}

//更改消息装填
export function changeRead(params){
	return fetch({
		method:'POST',
		url:home.readMsg,
		data:params
	})
}


//待审批流程
export function getList(params){
	return fetch({
		method:'POST',
		url:process.list,
		data:params
	})
}


//流程类型列表
export function processTypeList(params){
	return fetch({
		method:'GET',
		url:process.types,
		data:params
	})
}
// 分页查询客户服务记录 POST /
export function findServiceTrackList (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceTrack/findServiceTrackList',
        data:params
    })
}
// 查询驾校全部客户列表 POST
export function selectCustomerList (params){
    return fetch({
        method:'POST',
        url: '/cert/certServiceInfo/selectCustomerList',
        data: params
    })
}
//POST 新增客户服务记录 /marketCustomerServiceTrack/addServiceTrack

export function addCustomerServiceTrack (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceTrack/addServiceTrack',
        data: params
    })
}
//POST 修改客户服务记录 /marketCustomerServiceTrack/updateServiceTrack

export function updateCustomerServiceTrack (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceTrack/updateServiceTrack',
        data: params
    })
}
// POST 查询客户服务话术 /marketCustomerServiceSpeech/list
export function getCustomerServicelist (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceSpeech/list',
        data: params
    })
}

// POST 新增客户服务 记录，查询客户服务话术 /marketCustomerServiceSpeech/list
export function getCustomerServiceSpeechList(params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceSpeech/speechList',
        data: params
    })
}
export function addServiceTrackList (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceTrack/addServiceTrackList',
        data: params
    })
}
//POST 分页查询客户服务次数统计  /marketCustomerServiceTrack/findServiceTrackCount
export function findServiceTrackCount (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceTrack/findServiceTrackCount',
        data: params
    })
}
// 导出客户服务次数统计 POST /marketCustomerServiceTrack/exportServiceTrackCount
export function exportServiceTrackCount (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketCustomerServiceTrack/exportServiceTrackCount',
        data: params
    })
}
export function exportUserInfoByMarket (params){
    return fetch({
        method:'POST',
        url: '/cert/certStatisticItemSet/exportUserInfoByMarket',
        data: params
    })
}

//获取一级渠道 GET /marketChannel/getOneChannelList
export function getOneChannelList (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketChannel/getOneChannelList',
        data:params
    })
}
//二级营销渠道 /marketChannel/getTwoChannel/{parentId}
export function getTwoChannel (id){
    let params = {
        parentId:id
    }
    return fetch({
        method:'POST',
        url: '/marketing/marketChannel/getTwoChannel',
        data:params
    })
}
//分页查询潜在客户列表
export function findPotentialCustomers (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketPotentialCustomerManagement/findPotentialCustomers',
        data: params
    })
}
// 新增潜在客户 /marketPotentialCustomerManagement/addPotentialCustomer
export function addPotentialCustomer (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketPotentialCustomerManagement/addPotentialCustomer',
        data: params
    })
}
// 修改潜在客户信息 /marketPotentialCustomerManagement/updatePotentialCustomer
export function updatePotentialCustomer (params){
    return fetch({
        method:'POST',
        url: '/marketing/marketPotentialCustomerManagement/updatePotentialCustomer',
        data: params
    })
}
//获取登录人所在驾校所有员工 GET /sysEmployee/selectAll
export function staffList (params) {
    function param(data) {
        let url = ''
        for (var k in data) {
            let value = data[k] !== undefined ? data[k] : ''
            url += '&' + k + '=' + encodeURIComponent(value)
        }
        return url ? url.substring(1) : ''
    }
    var url = '/system/sysEmployee/selectAll'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(params)
    return fetch({
        method: 'GET',
        url: url,
        data: params
    })
}
// 获取训练场列表 POST /eduCourseTraining/getList
export function getTrainingList (params) {
    return fetch({
        method: 'POST',
        url: '/teaching/eduCourseTraining/getList',
        data: params
    })
}
//查询全部学员列表 /certServiceInfo/selectAllCustomerList
export function selectAllCustomerList (params) {
    return fetch({
        method: 'POST',
        url: '/cert/certServiceInfo/selectAllCustomerList',
        data: params
    })
}
//获取潜在客户回访记录 /marketPotentialCustomerManagement/getPotentialCustomerTrackRecord/{id}
export function getPotentialCustomerTrackRecord (id) {
    return fetch({
        method: 'get',
        url: '/marketing/marketPotentialCustomerManagement/getPotentialCustomerTrackRecord/' + id
    })
}
//保存潜在客户回访记录 /marketPotentialCustomerManagement/savePotentialCustomerTrackRecord
export function savePotentialCustomerTrackRecord (params) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketPotentialCustomerManagement/savePotentialCustomerTrackRecord',
        data: params
    })
}
//设置潜在客户状态为失效 /marketPotentialCustomerManagement/setPotentialCustomerInvalid
export function setPotentialCustomerInvalid (params) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketPotentialCustomerManagement/setPotentialCustomerInvalid',
        data: params
    })
}
//修改跟踪人 /marketPotentialCustomerManagement/setPotentialCustomerTrack
export function setPotentialCustomerTrack (params) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketPotentialCustomerManagement/setPotentialCustomerTrack',
        data: params
    })
}



//招生完成率统计
export function enrollmentFinishingRate (params) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketStatisticReport/enrollmentFinishingRateChart',
        data: params
    })
}
//科目统计
export function getCertStudentProgress (params) {
    return fetch({
        method: 'GET',
        url: '/cert/certServiceInfo/getCertStudentProgress',
        data: params
    })
}



//enrollmentFinishingRate
export const detailList = {

}
