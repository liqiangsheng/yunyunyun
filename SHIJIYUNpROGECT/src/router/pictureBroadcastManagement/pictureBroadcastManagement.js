const _import = require('../_import');
const pictureBroadcastMrg  = [
    { path: 'pictureBroadcastMrg', component: _import('layout/routerView'), name: '火图管理菜单', children: [
        { path: 'pictureBroadcastMrg', component: _import('PictureBroadcastManagement/pictureBroadcastManagement'), name: '活动图片' },
    ] }
]
export default pictureBroadcastMrg ;