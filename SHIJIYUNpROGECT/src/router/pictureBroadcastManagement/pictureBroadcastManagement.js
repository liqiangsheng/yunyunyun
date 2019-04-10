const _import = require('../_import');
const pictureBroadcastMrg  = [
    { path: 'pictureBroadcastMrg', component: _import('layout/routerView'), name: '火图管理菜单', children: [
        { path: 'pictureList', component: _import('PictureBroadcastManagement/pictureList/pictureList'), name: '图播管理' },
        {path: 'addpictureAll', name: '图集管理',children: [
            {path: 'addpicture', component: _import('PictureBroadcastManagement/alter/addpicture'),name: '新增图集', },
            {path: 'eidepicture', component: _import('PictureBroadcastManagement/alter/eidepicture'),name: '编辑图集',hidden:true },
            {path: 'lookpicture', component: _import('PictureBroadcastManagement/alter/lookpicture'),name: '查看图集',hidden:true }
        ] },
    ] }
]
export default pictureBroadcastMrg ;