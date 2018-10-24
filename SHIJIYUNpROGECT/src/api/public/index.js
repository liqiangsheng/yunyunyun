import fetch from '@/utils/fetch';
/**
 *** 字段设置
 **/
export function saveHiddenColumn(res) {     //获取列表
    return fetch({
        method: 'POST',
        url: '/system/sysResource/saveHiddenColumn',
        data: res
    })
}

export function saveHiddenColumn1(res) {     //获取列表
    return fetch({
        method: 'POST',
        url: '/system/sysResource/saveHiddenColumn',
        data: res
    })
}

/**
 *** 用户页面资源
 **/
export function findPageResource(res) {     //获取列表
    return fetch({
        method: 'POST',
        url: '/system/sysResource/findPageResource?pageCode='+res,
    })
}