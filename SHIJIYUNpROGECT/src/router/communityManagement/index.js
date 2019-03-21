const _import = require('../_import');
const communityManagement = [
    { path: 'communityManagement', component: _import('layout/routerView'), name: '社区管理菜单', children: [
        //用户管理子页面
        {path:"notice",component:_import("communityManagement/notice"),name:"通知管理", children: [
            //通知管理子页面
            {path:"default",component:_import("communityManagement/default"),name:"通知默认设置"},
            {path:"active",component:_import("communityManagement/active"),name:"主动通知管理"},
        ]},
        {path:"comment",component:_import("communityManagement/comment"),name:"评论管理"
        },
        {path:"opinion",component:_import("communityManagement/opinion"),name:"意见管理", children: [
            //意见管理子页面
            {path:"feedback",component:_import("communityManagement/feedback"),name:"意见反馈"},
            {path:"common_problem",component:_import("communityManagement/common_problem"),name:"常见问题"},
        ]
        },
        {path:"report",component:_import("communityManagement/report"),name:"举报列表", children: [
            //举报列表子页面
            {path:"comment_and_report",component:_import("communityManagement/comment_and_report"),name:"评论举报"},
            {path:"information_reporting",component:_import("communityManagement/information_reporting"),name:"资讯举报"},
            {path:"report_of_works",component:_import("communityManagement/report_of_works"),name:"作品举报"},
        ]
        },
    ]
    }
]
export default communityManagement;