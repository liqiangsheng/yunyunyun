import fetch from '@/utils/fetch';


/**
 * 商品管理/商品核销
 *
 *** /marketing/commodityMgr/commodityMgr 商品管理 商品信息设置
 **/
let certProjectSetControllerURL01 = "/cert/certProjectSet/findCertProjectSetByCondition"; // cert-project-set-controller : 办证科目设置

export function certProjectSetController01(res) {     // cert-project-set-controller : 办证科目设置
    return fetch({
        method: 'POST',
        url: certProjectSetControllerURL01,
        data: res,
    })
}

export function certProjectSetController02(res) {     // 所有办证状态信息表
    return fetch({
        method: 'GET',
        url: "/cert/certProjectState/findByCertProjectId?certProjectId="+res,  // 20171025144232595413689892478bb4e777dd9e24d38f
        //data: res,
    })
}

/*****
 * ** 商品管理
 * 班别管理
 * ** /marketing/commodityMgr/classMgr
 * ********/

export function getCity() {     // 选择所属城市
    return fetch({
        method: 'GET',
        url: "/system/"+systemEdition+"/sysRegion/findCitys",
        // data: res,
    })
}


/**
 * 获取车型选中列表
 * @param res
 */
export function getMotoTypeCheckList(res) {
    return fetch({
        method: 'POST',
        url: '/teaching/eduTeachingCar/getCarTypeListMes',
        data: res,
    })
}

//办证状态统计项
export function getAllStatisticItemList(res) {
    return fetch({
        method: 'GET',
        url: "/cert/certStatisticItemSet/getAllStatisticItemList",
    })
}

export function certProjectSetController03(res) {     // cert-project-set-controller : 办证科目设置
    return fetch({
        method: 'POST',
        url: "/cert/certProjectSet/findCertProjectSetByConditionForTeach",
        data: res,
    })
}




