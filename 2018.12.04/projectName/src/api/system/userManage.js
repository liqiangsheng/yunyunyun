import fetch from '@/utils/fetch';
/**
*** Character 角色管理
**/
export function getCharTableList(res) {     //x
    return fetch({
        method: 'POST',
        url: '/system/sysRole/list',
        data: res,
    })
}

export function saveCharOrUpdate(res) {     //新增或编辑
    return fetch({
        method: 'POST',
        url: '/system/sysRole/saveOrUpdate',
        data: res,
    })
}

export function enableCharRoles(res) {     //批量启用
    return fetch({
        method: 'POST',
        url: '/system/sysRole/enableRoles',
        data: res,
    })
}

export function disableCharRoles(res) {     //批量停用
    return fetch({
        method: 'POST',
        url: '/system/sysRole/disableRoles',
        data: res,
    })
}

export function getCharInfo(res) {     //批量停用
    return fetch({
        method: 'GET',
        url: '/system/sysRole/getInfo/'+res,
    })
}

/**
 *** userManagement 用户管理
 **/
export function uMgrSaveOrUpdate(res){  // 新增 编辑
    return fetch({
        method: 'POST',
        url:'/system/sysUser/saveOrUpdate',
        data: res,
    });
}


export function uMgrEnabled(res){  // 启用
    return fetch({
        method: 'POST',
        url:'/system/sysUser/enableUsers',
        data: res,
    });
}


export function uMgrDisabled(res){  // 停用
    return fetch({
        method: 'POST',
        url:'/system/sysUser/disableUsers',
        data: res,
    });
}

export function uMgrList(res){  // list
    return fetch({
        method: 'POST',
        url:'/system/sysUser/list',
        data: res,
    });
}

export function uSysRoleSelectList(res){  // selectList
    return fetch({
        method: 'POST',
        url:'/system/sysRole/selectList',
        // data: res,
    });
}
/**
 ***  postSetting 岗位管理
 **/


export function positingList(res){  // list
    return fetch({
        method: 'POST',
        url:'/system/sysPosition/list',
        data: res,
    });
}

export function positingSaveOrUpdate(res){  // list
    return fetch({
        method: 'POST',
        url:'/system/sysPosition/saveOrUpdate',
        data: res,
    });
}

export function positingEnabled(res){  // 启用
    return fetch({
        method: 'POST',
        url:'/system/sysPosition/enablePositions',
        data: res,
    });
}


export function positingDisabled(res){  // 停用
    return fetch({
        method: 'POST',
        url:'/system/sysPosition/disablePositions',
        data: res,
    });
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

/**
 * 资源管理
 * @param res
 */
export function getResourceList(res){  //获取资源列表
    return fetch({
        method: 'POST',
        url:'/system/sysResource/tree',
        data: res,
    });
}

export function delResourcePost(res){  //删除资源
    return fetch({
        method: 'POST',
        url:'/system/sysResource/delete/'+res,
        data: {},
    });
}

export function saveResource(res){  //保存|更新资源
    return fetch({
        method: 'POST',
        url:'/system/sysResource/saveOrUpdate',
        data: res,
    });
}


/**
 * 地区管理
 * @param res
 */
export function getRegionList(res){  //获取地区列表
    return fetch({
        method: 'POST',
        url:'/system/sysRegion/tree',
        data: res,
    });
}

export function delRegionPost(res){  //删除地区
    return fetch({
        method: 'POST',
        url:'/system/sysRegion/delete/'+res,
        data: {},
    });
}

export function saveRegion(res){  //保存|更新地区
    return fetch({
        method: 'POST',
        url:'/system/sysRegion/saveOrUpdate',
        data: res,
    });
}

/**
 * 组织管理
 * @param res
 */
export function getOrgList(res){  //获取地区列表
    return fetch({
        method: 'POST',
        url:'/system/sysOrg/tree',
        data: res,
    });
}

/**
 * model
 * @param res
 */
export function modelList(res){  //获取地区列表
    return fetch({
        method: 'GET',
        url:'/workflow/api/v1/model/list?pageSize='+res.pageSize+'&page='+res.currentPage,
    });
}
export function newModel(res){  //获取地区列表
    return fetch({
        method: 'POST',
        url:'/workflow/api/v1/model/newModel',
        data: res,
    });
}
export function deployment(res){  //获取地区列表
    return fetch({
        method: 'POST',
        url:'/workflow/api/v1/deploye/'+ res +'/deployment',
    });
}
/**
 * 修改密码
 * @param res
 */
export function modify(res){  //获取地区列表
    return fetch({
        method: 'POST',
        url:'/system/sysUser/password/modify',
        data: res,
    });
}



















