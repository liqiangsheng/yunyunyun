<template>
    <div class="main-box">
        <div class="drafts_header" >
            <el-button type="primary" @click="modeClick('新建')">新建</el-button>
            <el-button type="primary" @click="modeClick('普通')">普通</el-button>
            <el-button type="primary" @click="modeClick('认证')">认证</el-button>
            <el-button type="primary" @click="modeClick('数据库')">数据库</el-button>
            <el-button type="primary" @click="modeClick('内部')">内部</el-button>
            用户类型
            <el-select v-model="select1Value" placeholder="请选择">
                <el-option
                        v-for="item in select1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            状态
            <el-select v-model="select2Value" placeholder="请选择">
                <el-option
                        v-for="item in select2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="drafts_header" >
            用户号
            <el-input  v-model="seachValue" placeholder="请输入用户号"></el-input>
            <el-input  v-model="seachAllValue" placeholder="输入用户号、姓名进行搜索"></el-input>
            <el-button type="primary" @click="AllseachClick">全文搜索</el-button>
        </div>
        <div class="drafts_message">
            <span>C端用户列表</span>
            <el-button type="primary" @click="all_election">全选</el-button>
            <el-button type="primary" @click="reverse_election">反选</el-button>
            <el-button type="primary" @click="batch_down_shelf">批量封禁</el-button>
            <el-button type="primary" @click="batch_audit">批量解封</el-button>
            <el-button type="primary" @click="batch_deletion">批量失效</el-button>
        </div>
        <div class="drafts_table">
            <el-table :data="tableData"  max-height="900" border style="width: 100%" @row-click="goDetail" :row-class-name="tableRowClassName">
            <el-table-column width="50">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="用户名"  width="180"> </el-table-column>
            <el-table-column prop="nameNum"  label="用户号" width="180"> </el-table-column>
            <el-table-column prop="userState"  label="用户类别" width="100"> </el-table-column>
            <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
            <el-table-column prop="reading"  label="总获读量" width="100"> </el-table-column>
            <el-table-column prop="zan"  label="总获赞数" width="100"> </el-table-column>
            <el-table-column prop="wenzhangNum"  label="文章数" width="100"> </el-table-column>
            <el-table-column prop="state"  label="状态" width="100"> </el-table-column>
            <el-table-column label="注册时间" width="180">
                  <template slot-scope="scope">
                      <span>{{scope.row.zhuce|moment('YYYY-MM-DD HH:mm:ss')}}</span>
                  </template>
            </el-table-column>
            <el-table-column   label="操作" width="780">
                <template slot-scope="scope">
                    <el-button type="primary" @click="operation('编辑',scope.$index, scope.row)">编辑</el-button>
                    <el-button type="primary" @click="operation('设置主页',scope.$index, scope.row)">设置主页</el-button>
                    <el-button type="primary" @click="operation('账号封禁',scope.$index, scope.row)">账号封禁</el-button>
                    <el-button type="primary" @click="operation('账号解封',scope.$index, scope.row)">账号解封</el-button>
                    <el-button type="primary" @click="operation('失效',scope.$index, scope.row)">失效</el-button>
                    <el-button type="primary" @click="operation('私信',scope.$index, scope.row)">私信</el-button>
                    <el-button type="primary" @click="operation('文章',scope.$index, scope.row)">文章</el-button>
                    <el-button type="primary" @click="operation('订单',scope.$index, scope.row)">订单</el-button>
                </template>
            </el-table-column>
            </el-table>

        </div>
        <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
            <!--<el-dialog :append-to-body="true" title="提示" class="dialog" :visible.sync="shortMessageaShow"  width="375px" top="20%">-->
                  <!--<Root></Root>-->
                <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" @click="shortMessageaShow = false" style="margin-bottom: 10px">确 定</el-button>-->
              <!--</span>-->
            <!--</el-dialog>-->
        <el-dialog :append-to-body="true" title="提示" class="dialog" :visible.sync="detailShow"  width="1000px" top="10%">
                  <Detail :detailItem="detailItem"></Detail>
            </el-dialog>
    </div>
</template>


<script>
 import Root from "../common/rootAlter.vue" // 提示框
 import Detail from "./alter/detailAlter.vue" // 提示框
    export default {
        components:{
          Root,Detail
        },
        data() {
            return {
                detailItem:{}, //传给详情页的数据
                detailShow:false, //详情页面显示
                shortMessageaShow:false, //权限提示框
                select1: [{
                    value: '1',
                    label: '普通'
                }, {
                    value: '2',
                    label: '内部'
                }, {
                    value: '3',
                    label: '数据库'
                }, {
                    value: '4',
                    label: '认证'
                }, {
                    value: '5',
                    label: '新建'
                }],
                select2:[{
                    value: '4',
                    label: '活跃'
                }, {
                    value: '5',
                    label: '不活跃'
                }, {
                    value: '6',
                    label: '封禁'
                }],
                select1Value: '', // 用户类型
                select2Value: '', // 状态
                seachValue:"", //用户号
                seachAllValue:"", //全文搜索
                tableData:[
                    {sex:"男",checked:false,nameNum:"U10000996",wenzhangNum:"3984",userState:"普通",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",state:"封禁",zhuce:1541584800000},
                    {sex:"男",checked:true,nameNum:"U10000996",wenzhangNum:"3984",userState:"普通",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",state:"不活跃",zhuce:1541584800000},
                    {sex:"女",checked:false,nameNum:"U10000996",wenzhangNum:"3984",userState:"普通",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",state:"活跃",zhuce:1541584800000},
                    {sex:"男",checked:true,nameNum:"U10000996",wenzhangNum:"3984",userState:"数据库",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",state:"不活跃",zhuce:1541584800000},
                    {sex:"女",checked:false,nameNum:"U10000996",wenzhangNum:"3984",userState:"普通",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",state:"不活跃",zhuce:1541584800000},
                ],
                pageSize:10, //当前页面
                currentPage:1,  //跳转页面
                total:0,   //分页总数量
            }
        },

        methods: {
            tableRowClassName({row,rowIndex}){  //给每一列加上下标
//             row.row = row;
             row.index = rowIndex;
            },
//            goDetail(...result){  //拿id去详情页
            goDetail(row, event, column){  //拿id去详情页
//
                this.detailItem = row;
                this.detailShow = true;
             },
            modeClick(v){ //方式 新建 普通 认证 数据库 内部

            },
            operation(v,item,index){ //操作的方法 编辑 账号封禁 账号解封 失效 私信 文章 订单
               if(v==='编辑'){
                 console.log(v,"ashdhaskdk")
                 console.log(item,"ashdhaskdk")
                 console.log(index,"ashdhaskdk")
                   this.shortMessageaShow =true;
               }else if(v==='账号封禁'){

               }else if(v==='账号解封'){

               }else if(v==='失效'){

               }else if(v==='私信'){

               }else if(v==='文章'){

               }else if(v==='订单'){

               }else if(v==='设置主页'){

               }
            },
            reverse_election(){//反选

            },
            all_election(){//全选

            },
            batch_down_shelf(){//批量封禁

            },
            batch_audit(){//批量解封

            },
            batch_deletion(){//批量失效

            },

            AllseachClick(){//全文搜索

            },
            getList(){ // 获取数据
                console.log(1)
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
        }
    };
</script>

<style scoped lang="scss">
    img{
        display: block;
        width: 60px;
        height: 40px;
    }
    .drafts_header{
        width: 100%;
        height: 100px;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;
        .el-input{
            width: 300px;
            line-height: 60px;
        }
        /*.el-button{*/
            /*margin: 0 20px;*/
        /*}*/
    }
    .drafts_message{
        width: 100%;
        height: 60px;
        line-height: 60px;
        span{
            margin-right: 30px;
        }
    }
    .drafts_table{
        width: 100%;
        overflow-x:auto ;
        max-height: 900px;
    }
</style>