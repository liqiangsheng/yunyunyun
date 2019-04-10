import fetch from '@/utils/fetch';
/**
 *** 获取七牛云token
 **/
export function sysAttachmentUpPublicToken() {     //获取列表
    return fetch({
        method: 'get',
        url: "/system/"+window.systemEdition+"/sysAttachment/upPublicToken",
    })
}

/***
 * 图播列表
 * http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/backList?searchParam=1&orderField=1&orderString=1&p=1&s=20
 * searchParam搜索用
 orderField排序字段ry	string
 orderString排序方式（ASC（升序）/DESC（降序）
 p第几页
 s每页几条
 */
export function activityImagesBookBackList(searchParam,orderField,orderString,p,s) {     //获取列表
    return fetch({
        method: 'get',
        url: `/activity/${window.activityEdition}/activityImagesBook/backList?searchParam=${searchParam}&orderField=${orderField}&orderString=${orderString}&p=${p}&s=${s}`,
    })
}
/***
 * 图播列表排序
 * http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/updateSorts
 * bookId
 sort
 */
export function activityImagesBookUpdateSorts(data) {     //获取列表
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/updateSorts`,
        data
    })
}
/***
 * 新建图播
 * http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/insert
 * bookId
 sort
 */
export function activityImagesBookinsert(data) {     //获取列表
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/insert`,
        data
    })
}
/***
 * 查看图播
 * http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/findOne?id=7
 * bookId
 sort
 */
export function activityImagesBookfindOne(data) {     //获取列表
    return fetch({
        method: 'get',
        url: `/activity/${window.activityEdition}/activityImagesBook/findOne?id=${data}`,
        data
    })
}
/***
 * 删除活动相册
 * http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/remove?ids=7
 * bookId
 sort
 */
export function activityImagesBookremove(data) {
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/remove`,
        data
    })
}
/***
 * 相册
 * http://172.16.0.59:10020/apis/activity/v1.0/activityImages/list
 * bookId
 sort
 */
export function activityImagesList(data) {
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImages/list`,
        data
    })
}
/***
 * 相册
 *http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/update
 * bookId
 sort
 */
export function activityImagesBookupdate(data) {
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/update`,
        data
    })
}
/***
 * 上架下架
 *http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/updatePubStatus
 * updatePubStatus
 sort
 */
export function activityImagesBookupdatePubStatus(data) {
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/updatePubStatus`,
        data
    })
}
/***
 * 清空本业排序
 *http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/clearCurrentPageSort
 * updatePubStatus
 sort
 */
export function activityImagesBookupdateclearCurrentPageSort(data) {
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/clearCurrentPageSort`,
        data
    })
}
/***
 * 清空本业排序
 *http://172.16.0.59:10020/apis/activity/v1.0/activityImagesBook/clearAllSort
 * updatePubStatusPOST /activityImagesBook/clearAllSort
 sort
 */
export function activityImagesBookupdateclearAllSort(data) {
    return fetch({
        method: 'post',
        url: `/activity/${window.activityEdition}/activityImagesBook/clearAllSort`,
        data
    })
}