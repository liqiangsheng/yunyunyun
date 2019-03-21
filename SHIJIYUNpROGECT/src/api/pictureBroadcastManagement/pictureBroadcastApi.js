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