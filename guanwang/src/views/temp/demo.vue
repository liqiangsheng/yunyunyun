<template>
    <div class="main-box" clz-type="table">
        <!--
            搜索表单：
            searchModel : 表单数据集合
            formDataDefault.sync ：表单输出值
            @refreshTable : 查询按钮事件
        -->
        <search-form
                :formModel="searchModel"
                :formDataDefault.sync="formData"
                @refreshTable="getList()">
        </search-form>
        <!--
             表格盒子：
             formDataLabel : 表头数据 类型Array
             leftButton : 左边按钮
             rightButton : 右边按钮
             tableShowDate : 显示的表格列 有字段设置的页面才加
             tableData : 表格数据源
             selection : 是否要勾选框
             index : 是否要序号
         -->
        <table-box
                :formDataLabel="formDataLabel"
                :leftButton="leftButton"
                :rightButton="rightButton"
                :tableShowDate="tableShow"
                :tableData="tableData">
        </table-box>
    </div>
</template>

<script>

    import searchForm from '@/views/temp/searchForm'
    import tableBox from '@/views/temp/tableBox'
    import { fileImport ,exportFinTransactionFlowingPos} from '@/utils/publicSever';
    export default {
        name: "commodity-item-new",
        components:{
            searchForm,
            tableBox,
        },
        /**
         //input
         * key : key和id相等
         * elemType : 设置input框类型
         * defaultValue : 默认值
         * name : input框头部显示名称
         * labelWidth : input框头部宽度 默认是30% 可以不填
         //select
         * colValue : 下拉列表的value值
         * colName  : 下拉列表的label值
         * child : 下拉数据
         * */
        data(){

            return {
                /*字段设置必须值*/
                pageName:'posSwingCardMg',  //字段设置请求值 当页面文件名
                tableShow: ['a', 'b', 'c'],   //显示的字段
                userButtonCodes:{}, //权限按钮
                /*字段设置结束*/
                /* 搜索表单 */
                formData:{}, //搜索表单值
                //搜索表单数据
                searchModel:[{
                    key:'date',
                    elemType:"datePicker",
                    name:'时间',
                    defaultValue:[new Date(),new Date()],
                    labelWidth:"20%", //文字宽度

                },{
                    key:'businessName8',
                    defaultValue:'123',
                    elemType:"input",
                    name:'流程名称8',
                    labelWidth:"20%", //文字宽度

                },{
                    key:'businessName1',
                    elemType:"select",
                    name:'流程名称',
                    labelWidth:"20%", //文字宽度
                    colValue:'value',
                    colName:'label',
                    defaultValue:'1',
                    child:[
                        {
                            label:'1',
                            value:'车务'
                        }
                    ]

                }],
                /**
                 * 表头数据
                 * prop : 数据源绑定值
                 * label : 表头label值
                 * linkType : 是否能点击
                 * method : 点击方法
                 * */
                formDataLabel:[
                    {
                        prop:'code',
                        label:'a',
                        linkType:true,
                        method:(scope) =>{
                            console.log(scope)
                        }
                    },
                    {
                        prop:'code1',
                        label:'b',
                    },
                    {
                        prop:'code2',
                        label:'c',
                    },
                ],
                /* 表格数据 */
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
                        console.log(1)
                    }
                },
                //上传按钮
                {
                    elemType:'upload',
                    showFileList:false,
                    id:'upload',
                    action:fileImport + this.$store.getters.access_token,
                    showButton:true,
                    onSuccess(response, file, fileList){
                        console.log(response, file, fileList)
                    }
                }],
                /* 右侧按钮 */
                rightButton:[{
                    type:'primary',
                    size:'small',
                    id:'output',
                    value:'导出',
                    elemType:'output',
                    method:(scope) =>{
                        this.DownLoadFile({
                            url: exportFinTransactionFlowingPos + this.$store.getters.access_token, //请求的url
                            data: this.formData//要发送的数据
                        });
                    }
                },{
                    type:'primary',
                    size:'small',
                    id:'popover',
                    pageName:'字段设置2222',
                    elemType:'popover',
                    method:(scope) =>{
                        console.log(1)
                    }
                }],
                /* 表格数据源 */
                tableData:[{
                    code:'2',
                    code1:'2',
                    code2:'2',
                },{
                    code:'2',
                    code1:'2',
                    code2:'2',
                }],
            }
        },
        methods:{
            _filters(){
                console.log(this.formData)
            },
            search(){

            },
            reset(){},
            more(){},
            selsChange(){},
            getList(){
               console.log(this.formData)
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 2000);
            }
        },
        created(){

        },
        mounted(){
            //formDataLabel = this.formDataLabel
            //console.log(this.rightButton)
        }
    }
</script>

<style scoped>

</style>
