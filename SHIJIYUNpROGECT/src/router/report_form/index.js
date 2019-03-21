const _import = require('../_import');
const reportForm = [
    { path: 'reportForm', component: _import('layout/routerView'), name: '报表数据管理', children: [
        //报表管理子页面
        {path:"reportFormManagement",component:_import("report_form/reportFormManagement"),name:"报表监控",},
      ]
    }
]
export default reportForm;