import fetch from '@/utils/fetch';
/**
 * 商品管理
 *
 *** /marketing/commodityMgr/commodityItem 商品单元管理
 **/
let goodsUnitURL01 = "/marketing/marketGoodsUnit/searchGoodsUnitList";
let goodsUnitURL02 = "/marketing/marketGoodsUnit/saveOrUpdateGoodUnit";

export function goodsUnit01(res) {     // 商品单元列表
    return fetch({
        method: 'POST',
        url: goodsUnitURL01,
        data: res,
    })
}

export function goodsUnit02(res) {     // 新增或更新商品单元
    return fetch({
        method: 'POST',
        url: goodsUnitURL02,
        data: res,
    })
}
/*****新增接口*****/
export function updateStatusGoodsUnit(res) {     // 批量启用停用删除
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoodsUnit/updateStatusGoodsUnit',
        data: res,
    })
}

//1
export function marketGoodsUnitList(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoodsUnit/list',
        data: res,
    })
}

export function saveOrUpdate(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoodsUnit/saveOrUpdate',
        data: res,
    })
}
export function marketGoodsUnitDetail(id) {
    return fetch({
        method: 'GET',
        url: '/marketing/marketGoodsUnit/detail?id='+ id,
       // params: { id }
    })
}
export function updateStatus(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoodsUnit/updateStatus',
        data: res,
    })
}
export function saveGoodsOrUpdate(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoods/saveOrUpdate',
        data: res,
    })
}

export function marketGoodsDetail(id) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoods/detail?id='+ id,
    })
}

/**
 * 商品管理
 *
 *** marketing/commodityMgr/saleByProxy 代销合作商家管理
 **/

let saleByProxyURL01 = "/marketing/marketAgencySell/getAgencySellList";
let saleByProxyURL02 = "/marketing/marketAgencySell/searchAgencySells";
let saleByProxyURL03 = "/marketing/marketAgencySell/saveOrUpdateAgencySell";

export function saleByProxy01() {     // 商品单元列表
    return fetch({
        method: 'GET',
        url: saleByProxyURL01,
        //data: res,
    })
}



export function saleByProxy02(res) {     // 商品单元列表 代销商家
    return fetch({
        method: 'POST',
        url: saleByProxyURL02,
        data: res,
    })
}


export function saleByProxy03(res) {     // 新增/编辑
    return fetch({
        method: 'POST',
        url: saleByProxyURL03,
        data: res,
    })
}

/***** 新增接口 ******/
export function updateStatusAgencySell(res) {     // 新增/编辑
    return fetch({
        method: 'POST',
        url: '/marketing/marketAgencySell/updateStatusAgencySell',
        data: res,
    })
}

//新页面 1
export function marketGoodsList(res) {     // 新增/编辑
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoods/list',
        data: res,
    })
}

//

export function marketComboList(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/list',
        data: res,
    })
}





/**
 * 商品管理/商品核销
 *
 *** /marketing/commodityMgr/commodityMgr 商品管理 商品信息设置
 **/
let commodityMgrURL01 = "/marketing/marketGoods/searchGoodsList";
let commodityMgrURL02 = "/marketing/marketGoodsUnit/goodUnitList";    // 新增用 商品单元列表
let commodityMgrURL03 = "/marketing/marketAgencySell/getAgencySellList";  // 获取代销商家列表
let certProjectSetControllerURL01 = "/cert/certProjectSet/findCertProjectSetByCondition"; // cert-project-set-controller : 办证科目设置
let commodityMgrURL04 = "/marketing/marketGoods/saveOrUpdateGoods";
let verificationURL01 = "/marketing/marketGoods/updateGoodsVerification"; // 设置商品核销点

export function commodityMgr01(res) {     // 商品单元列表
    return fetch({
        method: 'POST',
        url: commodityMgrURL01,
        data: res,
    })
}

export function commodityMgr02(res) {     // 新增用 商品单元列表
    return fetch({
        method: 'POST', // GET 改成 POST , 废弃..带上参数 disable=true 获得过滤禁用后的数据
        url: commodityMgrURL02,
        data: res,
    })
}
export function commodityMgr03() {     // 获取代销商家列表
    return fetch({
        method: 'GET',
        url: commodityMgrURL03,
        //data: res,
    })
}

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

export function commodityMgr04(res) {     // 新增
    return fetch({
        method: 'POST',
        url: commodityMgrURL04,
        data: res,
    })
}
export function commodityMgr05(res) {     // 商品详情,用于编辑
    return fetch({
        method: 'GET',
        url: "/marketing/marketGoods/getGoodsDetail?id="+res,  // 2017102900294489315db1cf1e44a78a22fbde372eb95d
        //data: res,
    })
}

export function verification01(res) {     // 设置商品核销点
    return fetch({
        method: 'POST',
        url: verificationURL01,
        data: res,
    })
}
/** 新接口 1 **/
export function updateStatusGoods(res) {     // 批量修改状态
    return fetch({
        method: 'POST',
        url: '/marketing/marketGoods/updateStatusGoods',
        data: res,
    })
}

/*****
 * ** 商品管理
 * 商品套餐管理
 * ** /marketing/commodityMgr/setMeal
 * ********/

let comboURL01 = "/marketing/marketCombo/getGoodsType";    // 选择套餐 商品类型 基础类型,描述性商品
let comboURL02 = "/marketing/marketComboGoods/saveCombo"; // 新增商品套餐
let comboURL03 = "/marketing/marketCombo/getComboDetail/"; // 套餐详情
let comboURL04 = "/marketing/marketCombo/searchCombo"; // 商品套餐管理 list
let comboURL05 = "/marketing/marketCombo/updateStatusCombo"; // 上架下架删除 原接口 updateBatchCombo

export function combo01(res) {     // 基础类型 list 及 描述性商品 list
    return fetch({
        method: 'POST',
        url: comboURL01,
        data: res,
    })
}
export function combo02(res) {     // 新增商品套餐
    return fetch({
        method: 'POST',
        url: comboURL02,
        data: res,
    })
}

export function combo03(res) {     // 套餐详情
    return fetch({
        method: 'GET',
        url: comboURL03+res,
        // data: res,
    })
}

export function combo04(res) {     // 商品套餐管理 list
    return fetch({
        method: 'POST',
        url: comboURL04,
        data: res,
    })
}


export function combo05(res) {     // 上架下架删除
    return fetch({
        method: 'POST',
        url: comboURL05,
        data: res,
    })
}

/*** 新增接口 ****/
export function saveNewCombo(res) {     // 新增套餐
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/saveNewCombo',
        data: res,
    })
}

export function updateCombo(res) {     // 编辑套餐
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/updateCombo',
        data: res,
    })
}

export function getGoodsType(res) {     // 选择商品套餐 基础商品 查询
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/getGoodsType',
        data: res,
    })
}

//新增保存套餐
export function saveCombo(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/saveCombo',
        data: res,
    })
}
//编辑保存套餐
export function updateMarketCombo(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/updateCombo',
        data: res,
    })
}

//套餐详情
export function marketComboDetail(res) {
    return fetch({
        method: 'GET',
        url: '/marketing/marketCombo/detail?id='+res,
    })
}
//套餐详情
export function updateStatusCombo(res) {
    return fetch({
        method: 'POST',
        url: '/marketing/marketCombo/updateStatusCombo',
        data: res,
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
        url: "/system/sysRegion/findCitys",
        // data: res,
    })
}

export function classMgr01(res) {     // /marketCombo/getComboListDetails 新增班别时，所选套餐列表
    return fetch({
        method: 'POST',
        url: "/marketing/marketCombo/getComboListDetails",
        data: res,
    })
}

export function classMgr02(res) {     // /marketClass/saveOrUpdateClass 添加或者修改班别信息
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/saveOrUpdateClass",
        data: res,
    })
}

/* 班别新页面 */
//班别列表
export function marketClassList(res) {
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/list",
        data: res,
    })
}
//新增班别详情

export function getComboListDetails(res) {
    return fetch({
        method: 'POST',
        url: "/marketing/marketCombo/getComboListDetails",
        data: res,
    })
}
//新增班别保存
export function saveClass(res) {
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/saveClass",
        data: res,
    })
}
//编辑班别保存
export function updateClass(res) {
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/updateClass",
        data: res,
    })
}
//班别详情
export function marketClassDetail(res) {
    return fetch({
        method: 'GET',
        url: "/marketing/marketClass/detail?id="+res,
    })
}
//更改班别状态或删除
export function updateClassStatus(res) {
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/updateClassStatus",
        data: res,
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

export function classMgr00(res) {     // 获取班别列表
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/searchClassList",
        data: res,
    })
}

export function classMgr04(res) {     // 上架下架删除
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/updateClassStatus",
        data: res,
    })
}

export function classMgr05(res) {     // 编辑或查看详情时获取班别信息
    return fetch({
        method: 'GET',
        url: "/marketing/marketClass/getClassDetail?id="+res,
        //data: res,
    })
}

export function classMgr06(res) {     //  修改班别信息
    return fetch({
        method: 'POST',
        url: "/marketing/marketClass/modifyComboInCombo",
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




