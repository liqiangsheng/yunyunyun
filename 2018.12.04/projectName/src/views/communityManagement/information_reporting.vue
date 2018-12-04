<template>
    <!--资讯举报-->
        <div class="main-box">
            <h5 class="report_of_works_h5">文章</h5>
            <div class="report_of_works">
                <div class="report_of_worksItem1">
                    <el-table :data="tableData"  border style="width: 100%">
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
                        <el-table-column prop="title" label="内容名称"  width="240"> </el-table-column>
                        <el-table-column prop="name"  label="作者" width="120"> </el-table-column>
                        <el-table-column prop="Information"  label="资讯号" width="120"> </el-table-column>
                        <el-table-column prop="state" label="类型" width="120"> </el-table-column>
                        <el-table-column prop="reading"  label="阅读量" width="120"> </el-table-column>
                        <el-table-column prop="zan"  label="点赞" width="120"> </el-table-column>
                        <el-table-column prop="pinglun"  label="评论" width="120"> </el-table-column>
                        <el-table-column prop="shenhe"  label="审核" width="120"> </el-table-column>
                        <el-table-column prop="fabu"  label="发布" width="120"> </el-table-column>
                        <el-table-column prop="jubao"  label="未结案举报" width="120"> </el-table-column>
                        <el-table-column  label="上传时间" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.shangchuan|moment('YYYY-MM-DD HH:mm:ss')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shenhe"  label="最后审核" width="100"> </el-table-column>
                    </el-table>
                </div>
            </div>

            <h5 class="report_of_works_h5">
                未处理举报列表
                <el-button type="primary" @click="allElection('全选',scope.$index, scope.row)">全选</el-button>
                <el-button type="primary" @click="allElection('反选',scope.$index, scope.row)">反选</el-button>
                <el-button type="primary" @click="allElection('删文并批量通知',scope.$index, scope.row)">删文并批量通知</el-button>
                <el-button type="primary" @click="allElection('删文并批量下架',scope.$index, scope.row)">删文并批量下架</el-button>
                <el-button type="primary" @click="allElection('批量确认',scope.$index, scope.row)">批量确认</el-button>
                <el-button type="primary" @click="allElection('批量忽略',scope.$index, scope.row)">批量忽略</el-button>
            </h5>
            <div class="report_of_works">
                <div class="report_of_worksItem1">
                    <el-table :data="untreatedArr" border style="width: 100%">
                        <el-table-column width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="举报号" width="50" >
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="类别"  width="120"> </el-table-column>
                        <el-table-column prop="name"  label="补充说明" width="240"> </el-table-column>
                        <el-table-column prop="Information"  label="举报人" width="120"> </el-table-column>
                        <el-table-column prop="state" label="举报时间" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.shangchuan|moment('YYYY-MM-DD HH:mm:ss')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reading"  label="举报状态" width="120"> </el-table-column>
                        <el-table-column prop="zan"  width="320">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.value" placeholder="请输入关键字"></el-input>
                                <el-button type="primary" @click="untreatedClick('确认OK',scope.$index, scope.row)">确认</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column   label="操作" width="480">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="untreatedClick('删文并通知',scope.$index, scope.row)">删文并通知</el-button>
                                <el-button type="primary" @click="untreatedClick('下架并通知',scope.$index, scope.row)">下架并通知</el-button>
                                <el-button type="primary" @click="untreatedClick('确认',scope.$index, scope.row)">确认</el-button>
                                <el-button type="primary" @click="untreatedClick('忽略',scope.$index, scope.row)">忽略</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <h5 class="report_of_works_h5">已处理举报列表</h5>
            <div class="report_of_works">
                <div class="report_of_worksItem1">
                    <el-table :data="processedArr" border style="width: 100%">
                        <el-table-column width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="举报号" width="50" >
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="类别"  width="120"> </el-table-column>
                        <el-table-column prop="name"  label="补充说明" width="240"> </el-table-column>
                        <el-table-column prop="Information"  label="举报人" width="120"> </el-table-column>
                        <el-table-column prop="state" label="举报时间" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.shangchuan|moment('YYYY-MM-DD HH:mm:ss')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reading"  label="举报状态" width="120"> </el-table-column>
                        <el-table-column prop="zan"  width="320">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.value" placeholder="请输入关键字"></el-input>
                                <el-button type="primary" @click="processedClick('确认OK',scope.$index, scope.row)">确认</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column   label="操作" width="480">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="processedClick('删文并通知',scope.$index, scope.row)">删文并通知</el-button>
                                <el-button type="primary" @click="processedClick('下架并通知',scope.$index, scope.row)">下架并通知</el-button>
                                <el-button type="primary" @click="processedClick('确认',scope.$index, scope.row)">确认</el-button>
                                <el-button type="primary" @click="processedClick('忽略',scope.$index, scope.row)">忽略</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </template>


    <script>

        export default {

            data() {
                return {
                    tableData:[
                        {checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    ],
                    untreatedArr:[
                        {value:"",checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:true,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:true,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:true,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    ], //未处理举报
                    processedArr:[
                        {value:"",checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                        {value:"",checked:false,title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞",Information:"00002124",reading:"8005",zan:"2075",pinglun:"1088",shenhe:"通过",fabu:"已发布",jubao:"未结案举报",shangchuan:1541584800000,shenhe:"最后审核"},
                    ], //已处理举报
                    pageSize:10, //当前页面
                    currentPage:1,  //跳转页面
                    total:0,   //分页总数量
                }
            },

            methods: {
                allElection(v){//全选 反选 删文并批量通知 删文并批量下架 批量确认 批量忽略
                    if(v==='全选'){

                    }else if(v==='反选'){

                    }else if(v==='删文并批量通知'){

                    }else if(v==='删文并批量下架'){

                    }else if(v==='批量确认'){

                    } else if(v==='批量忽略'){

                    }
                },
                untreatedClick(v){ //未处理举报列表//删文并通知 下架并通知 确认' 忽略  确认OK
                    if(v==='删文并通知'){

                    }else if(v==='下架并通知'){

                    }else if(v==='确认'){

                    }else if(v==='忽略'){

                    }else if(v==='确认OK'){

                    }
                } ,
                processedClick(v){ //已处理举报列表//删文并通知 下架并通知 确认' 忽略  确认OK
                    if(v==='删文并通知'){

                    }else if(v==='下架并通知'){

                    }else if(v==='确认'){

                    }else if(v==='忽略'){

                    }else if(v==='确认OK'){

                    }
                }
            }
        };
    </script>

    <style scoped lang="scss">
        .el-input{
            width: 200px
        }
        .report_of_works_h5{
            width: 100%;
            padding-left: 20px;
            background: #EEEEEE;
            font-size: 18px;
            line-height: 100px;
            margin: 0;
        }
        .report_of_works{
            width: 100%;
            background: #ffffff;
            overflow: hidden;
            .report_of_worksItem1{
                float: left;
                width: 100%;
            }
        }
    </style>