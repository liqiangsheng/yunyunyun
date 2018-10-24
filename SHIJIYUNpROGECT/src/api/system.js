import fetch from '@/utils/fetch';
export function getTableList(res) {
    return fetch({
        method: 'POST',
        url: '/system/sysRole/list',
        data: res,
    })
}


/**
 * 上传图片前拿TOKEN
 */

export function imageUpToken() {
    return fetch({
        method: 'GET',
        url: '/system/sysAttachment/upToken',
    })
}