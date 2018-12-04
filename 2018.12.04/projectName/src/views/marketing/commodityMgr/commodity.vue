<template>
    <div class="main-box" clz-type="table">
        <!--
            搜索表单：
            searchModel : 表单数据集合
            formData.sync ：表单输出值
            @refreshTable : 查询按钮事件
        -->
        <search-form
                :formModel="searchModel"
                :formDataDefault.sync="formData"
                @refreshTable="getList(1)">
        </search-form>
        <!--
             表格盒子：
             loading : 表格loading
             formDataLabel : 表头数据 类型Array
             leftButton : 左边按钮
             rightButton : 右边按钮
             tableShowDate : 显示的表格列 有字段设置的页面才加
             tableData : 表格数据源
             selection : 是否要勾选框

             //分页数据
             paginationShow : 是否显示 Boolean 默认true
             paginationData : 分页参数值

             selectChange : 多选框选中值
             refreshTable : 刷新方法
             //字段设置
             pageName: 字段设置请求的code 当前链接的最后一个单词
             tableShowData : 表格头要显示的字段
             popoverLabelData : 表格头所有的字段
         -->
        <table-box
                :loading.sync="loading"
                :popoverLabelData="popoverData"
                :userButtonCodesData="userButtonCodes"
                :formDataLabel="formDataLabel"
                :leftButton="leftButton"
                :rightButton="rightButton"
                :pageName.sync="pageName"
                :tableShowData="tableShow"
                :paginationData.sync="paginationData"
                :selectChange.sync="selectData"
                @refreshTable="getList()"
                :tableData="tableData">
        </table-box>
    </div>
</template>

<script>
    import searchForm from '@/views/temp/searchForm'
    import tableBox from '@/views/temp/tableBox'
    import dialogForm from '@/views/temp/dialogForm'
    import { marketGoodsList ,updateStatusGoods } from '@/api/marketing/commodityMgr';
    import { marketGoodsExport } from '@/utils/publicSever';
    export default {
        name: "commodity-mgr-new",
        components:{
            searchForm,
            tableBox,
            dialogForm
        },
        data(){
            return {
                /*************************** 表单模块 *********************************/
                formData:{ //搜索表单值
                    p:1,
                    s:10
                },
                cloneFormData:{},
                searchModel:[{
                    key:'goodsCode',
                    elemType:"input",
                    name:'商品编码',
                },{
                    key:'goodsName',
                    elemType:"input",
                    name:'商品名称',
                }],
                /*************************** 表格模块 *********************************/
                /* 左侧按钮 */
                /***
                 * type : 按钮显示类型
                 * size : 按钮大小
                 * value : 名字
                 * elemType : 按钮类型
                 * method : 方法
                 * */

                //一般按钮
                leftButton:[{
                    type:'primary',
                    size:'small',
                    id:'add',
                    value:'新增',
                    elemType:'button',
                    method:(scope) =>{
                        this.$router.push({
                            path: '/marketing/commodityMgr/commodityMgrAdd'
                        })
                    }
                },{
                    type:'primary',
                    size:'small',
                    id:'edit',
                    value:'编辑',
                    elemType:'button',
                    method:(scope) =>{
                        //selectTableData(勾选表格,是否单选,提示,是否二次确认)
                        if(this.selectTableData(this.selectData,true,'编辑')) {
                            this.$router.push({
                                path: '/marketing/commodityMgr/commodityMgrEdit',
                                query: {
                                    id: this.selectData[0].id,
                                }
                            })
                        }
                    }
                },{
                    type:'primary',
                    size:'small',
                    id:'delete',
                    value:'删除',
                    class:'btn-warning',
                    elemType:'button',
                    method:(scope) =>{
                        let selectData = this.selectData;
                        if(this.selectTableData(selectData,false,'删除')){
                            this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let data = {deleteFlag:true,ids:[]};
                                selectData.forEach(res=>{
                                    data.ids.push(res.id)
                                });
                                updateStatusGoods(data).then(res=>{
                                    if(res.data.status){
                                        this.$message({
                                            message: res.data.message,
                                            type: 'success'
                                        });
                                        this.getList();
                                    }
                                })

                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                });
                            });
                        }
                    }
                },{
                    type:'primary',
                    size:'small',
                    id:'enable',
                    value:'上架',
                    elemType:'button',
                    method:(scope) =>{
                        this.enabledDisabled(this.selectData,false,updateStatusGoods,'ids','状态已为上架')//选中值 true fun
                        /*let Selected = this.selectData
                        if (Selected.length <= 0) {
                            this.$message({
                                message: '请勾选选项',
                                type: 'warning'
                            });
                            return false
                        }
                        let postData = Object.assign({ids: [], disable: false});
                        for (let item in Selected) {
                            postData.ids.push(Selected[item].id);
                        }
                        this.$confirm('此操作将改变该条数据状态, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            updateStatusGoods(postData).then(res => {
                                if (res.data.status) {
                                    this.$message({
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    this.getList();
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });*/
                    }
                },{
                    type:'primary',
                    size:'small',
                    id:'disable',
                    value:'下架',
                    elemType:'button',
                    method:(scope) =>{
                        this.enabledDisabled(this.selectData,true,updateStatusGoods,'ids','状态已为下架')//选中值 true fun
                    }
                }],
                /* 右侧按钮 */
                rightButton:[
                    {
                        type:'primary',
                        size:'small',
                        id:'output',
                        value:'导出',
                        elemType:'output',
                        method:(scope) =>{
                            this.DownLoadFile({
                                url: marketGoodsExport + this.$store.getters.access_token, //请求的url
                                data: this.cloneFormData//要发送的数据
                            });
                        }
                    },{
                        type:'primary',
                        size:'small',
                        id:'fieldSetting',
                        elemType:'popover',
                    }
                ],
                /*字段设置必须值*/
                pageName:'commodity',  //字段设置请求值 当页面文件名
                popoverData: ['商品编码', '商品名称', '基本商品单元','附加商品单元','价格（元）','代销商家','核销方式','自动过期','状态'],   //显示的字段
                tableShow: [],   //显示的字段
                userButtonCodes:{}, //权限按钮
                /*字段设置结束*/

                /* 表格数据源 */
                tableData:[],

                paginationData:{},//分页的数据
                selectData:[], //勾选数据1
                loading:false,
                /**
                 * 表头数据
                 * prop : 数据源绑定值
                 * label : 表头label值
                 * linkType : 是否能点击 true 或 false 默认false
                 * method : 点击方法
                 * */
                formDataLabel:[
                    {
                        prop:'goodsCode',
                        label:'商品编码',
                    },{
                        prop:'goodsName',
                        label:'商品名称',
                    },{
                        prop:'goodsUnitName',
                        label:'基本商品单元',
                    },{
                        prop:'attachedGoodsUnitNames',//overdue
                        label:'附加商品单元',
                        width:'400px'
                    },{
                        prop:'price',
                        label:'价格（元）',
                    },{
                        prop:'agencySellerId',
                        label:'代销商家',
                        formatter(row,col,colVal){
                            if(cache.loadDictCache.market_agency_sell){
                                return cache.loadDictCache.market_agency_sell[colVal]
                            }
                        }
                    },{
                        prop:'checkWay',
                        label:'核销方式',
                        formatter(row,col,colVal){
                            if(colVal === '1'){
                                return '自动核销'
                            }else if(colVal === '2'){
                                return '手动核销'
                            }else{
                                return '-'
                            }
                        }
                    },{
                        prop:'overdue',
                        label:'自动过期',
                        formatter(row,col,colVal){
                            return colVal?'是':'否'
                        }
                    },{
                        prop:'disable',
                        label:'状态',
                        formatter(row,col,colVal){
                            return colVal?'下架':'上架'
                        }
                    }]
            }
        },
        methods:{
            getList(val){
                this.cloneFormData = this.cloneData(this.formData) //导出处理
                let data = Object.assign(this.formData,this.paginationData);
                if(val){
                    this.paginationData.p = 1;
                    data.p = 1;
                }
                this.loading = true;
                marketGoodsList(data).then(res=>{
                    this.loading = false;
                    if(res.data.status){
                        this.tableData = res.data.data;
                        this.paginationData.total = res.data.total;
                    }
                })
                this.Jurisdiction(['marketing','commodityMgr','commodity']); //资源权限 页面地址
            }
        },
        created(){
            this.getList();
        },
    }
</script>

<style scoped>

</style>
