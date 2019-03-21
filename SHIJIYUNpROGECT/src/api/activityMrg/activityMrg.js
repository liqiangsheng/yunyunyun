import fetch from '@/utils/fetch';
/**
报名表设置,根据活动id加载设置数据
* */
export function activitySignupNoteSettingFindByActivityId(id) {
    return fetch({
        method: 'GET',
        url: '/activity/'+window.activityEdition+'/activitySignupNoteSetting/findByActivityId?activityId='+id,
    })
}
/**
报名表设置,保存设置 //传数组给后台settingList: [{},{}]
 http://172.16.0.54:10020/apis/activity/v1.0/activitySignupNoteSetting/update
 * */
export function activitySignupNoteSettingUpdate(res) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activitySignupNoteSetting/update',
        data:res,
    })
}
 /**
 活动列表 条件查活动列表
 http://172.16.0.54:10020/apis/activity/v1.0/activityInfo/listTob
  data={
  "activityStatus": "string",
  "keyword": "string",
  "orderField": "id",
  "orderString": "desc",
  "p": 1,
  "s": 20,
  "startTimeFrom": "2019-03-09T07:23:43.171Z",
  "startTimeTo": "2019-03-09T07:23:43.171Z"
}
 * */
export function activityInfoList(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activityInfo/listTob',
        data,
    })
}
/**
 初始化字典
 http://172.16.0.14:10020/apis/system/v1.0/init/loadDicTree
 * */
export function initLoadDicTree() {
    return fetch({
        method: 'GET',
        url: '/system/'+window.systemEdition+'/init/loadDicTree',
    })
}
/**
 国 省 市
 http://172.16.0.14:10020/apis/system/v1.0/sysRegion/tree
 * */
export function sysRegionTree() {
    return fetch({
        method: 'GET',
        url: '/system/'+window.systemEdition+'/sysRegion/tree',
    })
}
/**
 市
 let url = `${window.common.apiDomain20020}/apis/system/${systemEdition}/sysRegion/singlelevel?level=city`;
 * */
export function sysRegionsinglelevel() {
    return fetch({
        method: 'GET',
        url: '/system/'+window.systemEdition+'/sysRegion/singlelevel?level=city',
    })
}
/**
上传到七牛的token
 http://172.16.0.14:10020/apis/system/v1.0/sysAttachment/upPublicToken"
 * */
export function sysAttachmentUpPublicToken() {
    return fetch({
        method: 'GET',
        url: '/system/'+window.systemEdition+'/sysAttachment/upPublicToken',
    })
}

/**
 * 新增活动
 http://172.16.0.54:10020/apis/activity/v1.0/activityInfo/insert
 {
 address (string, optional): 详细地址 , //
 aloneEntrance (boolean, optional): 报名是否独立入口（0：否，1：是） ,
 bannerUrl (string, optional): 海报图片（七牛云） ,//
 coOrganizers (string, optional): 协办单位 ,//
 content (string, optional): 活动描述 ,//
 customContent (string, optional): 自定义活动描述 ,//
 endTime (string, optional): 活动结束时间 ,//
 entranceUrl (string, optional): 报名独立入口url ,//默认
 faceDetection (boolean, optional): 启用人脸识别（0：否，1：是） ,//
 hosts (string, optional): 主办单位 ,//
 latitude (number, optional): 纬度 ,//
 linkMan (string, optional): 联系人 ,
 linkPhone (string, optional): 联系电话 ,
 longitude (number, optional): 经度 ,//
 multiActivity (boolean, optional): 是否多活动（0：否，1：是） ,//默认
 multiSection (boolean, optional): 是否分段（0：否，1：是） ,//默认
 organizers (string, optional): 承办单位 ,//
 originalPrice (number, optional): 商品原价 ,//
 parentId (string, optional): 主活动id（若是单体活动则为0） ,
 payExpired (integer, optional): 付款时效（分钟） ,//
 payPrice (number, optional): 商品销售价 ,//
 payRemark (string, optional): 付款说明 ,//
 refundRemark (string, optional): 退款说明 ,//
 regionId (string, optional): 地点id（关联system.sys_region表id） ,
 shareUrl (string, optional): 分享页url ,//
 signEndTime (string, optional): 报名结束时间 ,//
 signStartTime (string, optional): 报名开始时间 ,//
 startTime (string, optional): 活动起始时间 ,//
 summary (string, optional): 活动简介 ,//
 title (string, optional): 活动标题 ,//
matters:this.mattersNeedingAttention, //注意事项 ,//
scheduleList:this.tableData //活动安排
 }
 * */
export function activityInfoInsert(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activityInfo/insert',
        data
    })
}
/**
 POST
  更新活动，编辑活动，参数同上
 http://172.16.0.13:10020/apis/activity/v1.0/activityInfo/update
 * */
export function activityInfoupdate(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activityInfo/update',
        data
    })
}
export function activityInfoupupdateInList(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activityInfo/updateInList',
        data
    })
}
/**
 POST ids Array[string]
 删除活动
 http://172.16.0.13:10020/apis/activity/v1.0/activityInfo/remove
 * */
export function activityInforemove(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activityInfo/remove',
        data
    })
}
/**
 GET id string
 查询活动信息（编辑，查看活动）
 http://172.16.0.13:10020/apis/activity/v1.0/activityInfo/findOneTob?id=201903131130302096615ab5ad4f8b93c1b79c9f6c84f1
 * */
export function activityInfofindOneTob(data) {
    return fetch({
        method: 'GET',
        url: '/activity/'+window.activityEdition+'/activityInfo/findOneTob?id='+data,

    })
}
/**
 GET id string
 查询活动信息（编辑，查看活动） (报名详单)
 http://172.16.0.54:10020/apis/activity/v1.0/activityInfo/findOne?id=7
 * */
export function activityInfofindOne(data) {
    return fetch({
        method: 'GET',
        url: '/activity/'+window.activityEdition+'/activityInfo/findOne?id='+data,

    })
}
/**
 POST id string
  (报名详单) 报名详细
 http://172.16.0.54:10020/apis/activity/v1.0/customerActivitySignupNote/listTob
 id=7
 * */
export function ustomerActivitySignupNotelistTob(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/customerActivitySignupNote/listTob',
        data

    })
}
/**
 GET id string
  (报名详单) 报名详细
 http://172.16.0.54:10020/apis/activity/v1.0/activitySignupNoteSetting/findByActivityId?activityId=7
 id=7
 * */
export function activitySignupNoteSettingfindByActivityId(data) {
    return fetch({
        method: 'GET',
        url: '/activity/'+window.activityEdition+'/activitySignupNoteSetting/findByActivityId?activityId='+data,

    })
}
/**
 GET id string
组合票查询
 http://172.16.0.13:10020/apis/activity/v1.0/activityInfo/findOneWithGoods?id=201903131130302096615ab5ad4f8b93c1b79c9f6c84f1
 * */
export function activityInfofindOneWithGoods(data) {
    return fetch({
        method: 'GET',
        url: '/activity/'+window.activityEdition+'/activityInfo/findOneWithGoods?id='+data,

    })
}
/**
 GET id string
组合门票跟新POST activityInfo/updateOneWithGoods
 http://172.16.0.13:10020/apis/activity/v1.0/activityInfo/updateOneWithGoods
 * */
export function activityInfofindOneupdateOneWithGoods(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/activityInfo/updateOneWithGoods',
        data
    })
}
/**
 GET id string
报名独立页查询
 http://172.16.0.54:10020/apis/activity/v1.0/signupPageLayout/findOne?id=201903131130302096615ab5ad4f8b93c1b79c9f6c84f1
 http://172.16.0.54:10020/apis/activity/v1.0/signupPageLayout/findOneByActivityId?activityId=7
 * */
export function signupPageLayoutfindOne(data) {
    return fetch({
        method: 'GET',
        url: '/activity/'+window.activityEdition+'/signupPageLayout/findOneByActivityId?activityId='+data,

    })
}
/**
 POST
 新增报名独立页设置
 http://172.16.0.54:10020/apis/activity/v1.0/signupPageLayout/insert
 * */
export function signupPageLayoutinsert(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/signupPageLayout/insert',
        data
    })
}
/**
 POST
 报名独立页删除
 http://172.16.0.54:10020/apis/activity/v1/signupPageLayout/remove
 * */
export function signupPageLayoutremove(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/signupPageLayout/remove',
        data
    })
}
/**
 POST
 报名独立页更新
 http://172.16.0.54:10020/apis/activity/v1.0/signupPageLayout/update
 * */
export function signupPageLayoutupdata(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/signupPageLayout/update',
        data
    })
}
/**
 POST
  活动查嘉宾列表
 http://172.16.0.13:10020/apis/activity/v1.0/honoredGuest/list
 * */
export function honoredGuestList(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/honoredGuest/list',
        data
    })
}
/**
 POST
 新增嘉宾
 http://172.16.0.54:10020/apis/activity/v1.0/honoredGuest/insert
 * */
export function honoredGuestInsert(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/honoredGuest/insert',
        data
    })
}
/**
 POST
 新增嘉宾
 http://172.16.0.54:10020/apis/activity/v1.0/honoredGuest/update
 * */
export function honoredGuestupdate(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/honoredGuest/update',
        data
    })
}
/**
 POST
 新增嘉宾
 http://172.16.0.54:10020/apis/activity/v1.0/honoredGuest/remove
 * */
export function honoredGuestremove(data) {
    return fetch({
        method: 'POST',
        url: '/activity/'+window.activityEdition+'/honoredGuest/remove',
        data
    })
}