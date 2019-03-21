``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9530
npm run dev

├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── router                 // 路由
        |--ActivityManagement       //活动管理路由
           |--ActivityManagement.js       //活动管理路由
│   ├── store                  // 全局store管理
         │ ---  permission.js     //权限认证
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 前端导出方法
│   ├── view                   // 页面（保持路由和页面的命名相同）
         |---activityMrg           //活动管理
             |--activityMrg        //活动管理
                |--activityMrgList        //活动列表
                |--activityMrgDetail        //活动详情
                |--activityMrgAddMany        //多活动新增
                |--activityMrgAddSingle        //单活动新增
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
│   └── permission.js                // 入口 加载组件 初始化等
├── static                      // 第三方不打包资源
│   ├── style                  // 第三方字体图标
│   ├── theme                  // 主题样式
│   ├── workflow               // 流程
├── .babelrc                    // babel-loader 配置
├── eslintrc.js                 // eslint 配置项
├── .gitignore                  // git 忽略项
├── favicon.ico                 // favicon图标
├── index.html                  // html模板
└── package.json                // package.json

//组合票提交参数
{
	"id": "201903131130302096615ab5ad4f8b93c1b79c9f6c84f1",
	activityGoodsVoList: [{
		"id": "14",
		"originalPrice": "100",
		"payPrice": "0.05",
		"sort": 0
	}],
	activityGoodsGroupVoList: [{
		"originalPrice": "100",
		"payPrice": "0.05",
		"sort": 0,
		"groupRemark": "组合备注1",
		"openStatus": 1,
		"name":'', //活动title
		"activityGoodsIdList": ["14"]
	}, {
		"originalPrice": "100",
		"payPrice": "0.5",
		"sort": 1,
		"groupRemark": "组合备注2",
		"openStatus": 1
		"activityGoodsIdList": ["14"]
	}]
}
{
	"id": "201903131130302096615ab5ad4f8b93c1b79c9f6c84f1",
	activityGoodsVoList: [{
		"id": "14",
		"originalPrice": "100",
		"payPrice": "0.05",
		"sort": 0
	}],
	activityGoodsGroupVoList: [{
		"name":"组合名称1",
		"originalPrice": "100",
		"payPrice": "0.05",
		"sort": 0,
		"groupRemark": "组合备注1",
		"openStatus": 1
		"activityGoodsIdList": ["14"]
	}, {
		"name":"组合名称2",
		"originalPrice": "100",
		"payPrice": "0.5",
		"sort": 1,
		"groupRemark": "组合备注2",
		"openStatus": 1
		"activityGoodsIdList": ["14"]
	}]
}
