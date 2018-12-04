const columns = {
    state: {
        tableData:[],
        authority:[],
        roleId:[],
        findPageResource:[],
        demo:'',
        flag:'',    // 通用状态标记: 0为查看, -1为编辑, 1为新增
        type:'',    // 通用类型标记
        detail:'',   //详情页
        btnResource:[], //按钮传值到新窗口
        coachListBackups:[] //教练列表备份
    },
    mutations: {
        tableData:(state, view) => {
            //console.log(view)
        }
    },
    actions: {
        addVisitedViews: ({ commit }, view) => {
            //commit('tableData', view)
        },
    },

};


export default columns;