<template>
    <div class="main-box">
        <div class="drafts_header" >
            <el-date-picker
                    v-model="timeValue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
            审核状态
            <el-select v-model="select1Value" placeholder="请选择">
                <el-option
                        v-for="item in select1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            发布状态
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
            <el-input  v-model="seachValue" placeholder="输入内容号、标题、作者进行搜索"></el-input>
            <el-button type="primary" @click="seachClick">搜索</el-button>
            <el-input  v-model="seachAllValue" placeholder="输入文章内容进行搜索"></el-input>
            <el-button type="primary" @click="AllseachClick">全文搜索</el-button>
        </div>
        <div class="drafts_message">
            <span>内容列表（图文{{3}}条，视频{{1}}条，直播{{3}}条，音频{{5}}条）</span>
            <el-button type="primary" @click="all_election">全选</el-button>
            <el-button type="primary" @click="reverse_election">反选</el-button>
            <el-button type="primary" @click="batch_down_shelf">批量下架</el-button>
            <el-button type="primary" @click="batch_audit">批量审核</el-button>
            <el-button type="primary" @click="batch_deletion">批量删除</el-button>
        </div>
        <div class="drafts_table">
            <el-table :data="tableData"  max-height="900" border style="width: 100%"">
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.checked"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="序号" width="50" >
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="内容名称"  width="300"> </el-table-column>
                <el-table-column prop="name"  label="作者" width="180"> </el-table-column>
                <el-table-column prop="Information"  label="资讯号" width="100"> </el-table-column>
                <el-table-column prop="state" label="类型" width="80"> </el-table-column>
                <el-table-column prop="reading"  label="阅读量" width="100"> </el-table-column>
                <el-table-column prop="zan"  label="点赞" width="100"> </el-table-column>
                <el-table-column prop="pinglun"  label="评论" width="100"> </el-table-column>
                <el-table-column prop="shenhe"  label="审核" width="100"> </el-table-column>
                <el-table-column prop="fabu"  label="发布" width="100"> </el-table-column>
                <el-table-column prop="jubao"  label="未结案举报" width="100"> </el-table-column>
                <el-table-column  label="上传时间" width="180">
                    <template slot-scope="scope">
                       <span>{{scope.row.shangchuan|moment('YYYY-MM-DD HH:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shenhe"  label="最后审核" width="100"> </el-table-column>
                <el-table-column   label="操作" width="480">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="primary" @click="to_examine(scope.$index, scope.row)">审核</el-button>
                        <el-button type="primary" @click="share(scope.$index, scope.row)">分享</el-button>
                        <el-button type="primary" @click="lower_shelf(scope.$index, scope.row)">下架</el-button>
                        <el-button type="primary" @click="del(scope.$index, scope.row)">删除</el-button>
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

    </div>
</template>


<script>

    export default {
        data() {
            return {
                select2: [{
                    value: '1',
                    label: '已发布'
                }, {
                    value: '2',
                    label: '未发布'
                }],
                select1:[{
                    value: '4',
                    label: '通过'
                }, {
                    value: '5',
                    label: '不通过'
                }],
                select1Value: '', // 审核状态选择
                select2Value: '', // 发布状态选择
                timeValue:"",//从什么时间到什么时间
                seachValue:"", //搜索
                seachAllValue:"", //全文搜索
                tableData:[
                    {checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:true,title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:true,title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:true,title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:true,title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    {checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                ],
                pageSize:10, //当前页面
                currentPage:1,  //跳转页面
                total:0,   //分页总数量
            }
        },

        methods: {
            del(i,v){//删除
                console.log(i)
                console.log(v)
            },
            share(i,v){//share分享
                console.log(i)
                console.log(v)
            },
            to_examine(i,v){//审核
                console.log(i)
                console.log(v)
            },
            edit(i,v){//编辑
                console.log(i)
                console.log(v)
            },
            lower_shelf(i,v){//下架
                console.log(i)
                console.log(v)
            },
            reverse_election(){//反选

            },
            all_election(){//全选

            },
            batch_down_shelf(){//批量下架

            },
            batch_audit(){//批量审核

            },
            batch_deletion(){//批量删除

            },
            seachClick(){//搜索

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
        .el-button{
            margin: 0 20px;
        }
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
