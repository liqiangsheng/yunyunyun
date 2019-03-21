<template>
    <!--评论举报-->
        <div class="main-box">
            <div class="commentBox_header">
               <b>被举报评论列表</b>
                <span>排序：</span>
                <el-button type="primary" @click="search('按时间')">按时间</el-button>
                <el-button type="primary" @click="search('按举报数')">按举报数</el-button>
                <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
                <el-button type="primary" @click="search('按评论搜索')">按评论搜索</el-button>
                <el-input v-model="articlevalue" placeholder="请输入文章名或文章号"></el-input>
                <el-button type="primary" @click="search('按文章搜索')">按文章搜索</el-button>
            </div>
            <ul class="commentBox" v-for="(item,index) in objData">
                <li>
                    <div class="commentBoxItem">
                        <div class="commentBoxItemIndex">
                            <b>文章评论列表</b>
                            <span>排序：</span>
                            <el-button type="primary" @click="sortClick('按点赞数')">按点赞数</el-button>
                            <el-button type="primary" @click="sortClick('按评论数')">按评论数</el-button>
                            <el-button type="primary" @click="sortClick('按时间')">按时间</el-button>
                            <el-button type="primary" @click="sortClick('一级评论')">一级评论</el-button>
                            <el-button type="primary" @click="sortClick('全部展开')">全部展开</el-button>
                            <el-input v-model="seachValue" placeholder="请输入关键字"></el-input>
                            <el-button type="primary" @click="sortClick('文内评论搜索')">文内评论搜索</el-button>
                        </div>
                        <div class="commentBoxItemIndex1">
                            <el-table
                                    :data="item.comentList"
                                    min-height="100"
                                    border-bottom
                                    style="width: 100%">
                                <el-table-column prop="pinglunNum" label="评论号" width="100"></el-table-column>
                                <el-table-column prop="biaoji" label="标记" width="100"></el-table-column>
                                <el-table-column prop="pinglun" label="评论" width="180"></el-table-column>
                                <el-table-column prop="dianzan" label="点赞数" width="100"></el-table-column>
                                <el-table-column prop="pinglunzhe"label="评论者" width="100"> </el-table-column>
                                <el-table-column label="评论时间"width="100">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.time|moment('YYYY-MM-DD HH:mm:ss')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="jubao" label="举报数"width="60"></el-table-column>
                                <el-table-column prop="zipinglun" label="子评论"width="60"></el-table-column>
                                <el-table-column prop="minganbiaoji" label="敏感标记"width="100"></el-table-column>
                                <el-table-column label="操作" width="140">
                                    <template slot-scope="scope">
                                        <el-button  type="primary" @click="delClick(scope.row)">删除并通知</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column width="80" type="expand" >
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item :label="props.row.pinglunNum" v-for="(item1,index1) in props.row.childres" class="childresList" :key="index">

                                                <div  class="listData">{{item1.biaoji}}</div>
                                                <div  class="listData1">{{item1.pinglun}}</div>
                                                <div  class="listData">{{item1.dianzan}}</div>
                                                <div  class="listData cursor" @click="commentClick(item1)">{{item1.pinglunzhe}}</div>
                                                <div  class="listData">{{item1.time|moment('YYYY-MM-DD HH:mm:ss')}}</div>
                                                <div  class="listData2 cursor" @click="reportClick(item1)">{{item1.jubao}}</div>
                                                <div  class="listData2">{{item1.zipinglun}}</div>
                                                <div  class="listData cursor" @click="reasonClick(item1)">原因</div>
                                                <div  class="listData"><el-button  type="primary" @click="delClick(item1)">删除并通知</el-button></div>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </div>
                    </div>


                </li>

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
            </ul>

        </div>
    </template>


    <script>

        export default {
            data() {
                return {
                    keyword:"",//关键字
                    articlevalue:"",//请输入文章名或文章号
                    seachValue:"", //请输入关键字
                    objData:[  //数据列表
                        {
                            comentList:[
                                {pinglunNum:"0001",biaoji:"一级评论",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false,buttonName:"展开",buttonBool:false,childres:
                                    [
                                        {pinglunNum:"0001",biaoji:"0001-0001",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                        {pinglunNum:"0001",biaoji:"0001-0002",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false,},
                                        {pinglunNum:"0001",biaoji:"0001-0003",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                    ]
                                },
                                {pinglunNum:"0001",biaoji:"一级评论",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false,buttonName:"展开",buttonBool:false,childres:
                                    [
                                        {pinglunNum:"0001",biaoji:"0001-0001",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                        {pinglunNum:"0001",biaoji:"0001-0002",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                        {pinglunNum:"0001",biaoji:"0001-0003",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                    ]
                                },
                                {pinglunNum:"0001",biaoji:"一级评论",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false,buttonName:"展开",buttonBool:false,childres:
                                    [
                                        {pinglunNum:"0001",biaoji:"0001-0001",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                        {pinglunNum:"0001",biaoji:"0001-0002",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                        {pinglunNum:"0001",biaoji:"0001-0003",pinglun:"主要是满满的商业化套路",pinglunzhe:"陈乔恩",dianzan:"2075",jubao:"1",zipinglun:"4",time:1541584800000,minganbiaoji:false},
                                    ]
                                }
                            ],
                        }
                    ],
                    pageSize:10, //当前页面
                    currentPage:1,  //跳转页面
                    total:0,   //分页总数量
                }
            },
            created(){

            },
            methods: {
                search(v){//搜索
                  if(v==='按时间'){

                  }else if(v==='按举报数'){

                  }else if(v==='按评论搜索'){

                  }else if(v==='按文章搜索'){

                  }

                },
                reportClick(){//弹窗展示举报详情

                },
                reasonClick(){//原因弹窗展示详情

                },
                commentClick(v){//评论者点击
                    console.log(v)
                },
                delClick(v){ //删除并通知
                    console.log(v,"dfasjkdlasjkl")
                },
                sortClick(v){ //按点赞数 按评论数 按时间 一级评论 全部展开 文内评论搜索
                    if(v==="按点赞数"){

                    }else if(v==="按评论数"){

                    }else if(v==="按时间"){

                    }else if(v==="一级评论"){

                    }else if(v==="全部展开"){

                    }else if(v==="文内评论搜索"){

                    }
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
        .commentBox_header{
            width: 100%;
            height: 100px;
            line-height: 100px;
            background: #ffffff;
            b{
                margin: 0 20px;
            }
            .el-input{
                width: 220px;
                margin-left: 20px;
            }
        }
        .listData{
            float: left;width: 100px;padding-left: 17px;
        }
        .listData1{
            float: left;width: 180px;padding-left: 17px;
        }
        .listData2{
            float: left;width: 60px;padding-left: 17px;
        }
        .cursor{
            cursor: pointer;
        }
        .commentBox{
            width: 100%;
            li{
                width: 100%;
                overflow: hidden;
                .commentBoxItem{
                    width: 100%;
                    background: #ffffff;
                    padding: 20px 10px;
                    margin-top: 20px;
                    .commentBoxItemIndex{
                        width: 100%;
                        line-height: 50px;
                        b{
                            margin-right: 20px;
                            font-size: 16px;
                        }
                        .el-input{
                            width: 200px;
                            margin-left: 20px;
                        }
                    }
                    .commentBoxItemIndex1{
                        width: 100%;
                        min-height: 100px;
                        .el-table__body-wrapper{
                            .el-table__body{
                                tbody{
                                    tr{
                                        .el-table__expanded-cell{
                                            height: 60px;
                                            .el-form{
                                                .el-form-item{
                                                    width: 100%;
                                                    min-height: 60px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                /*.el-form-item__content{*/
                /*width: 1000px;*/
                /*}*/
                /*.childresList{*/
                /*overflow: hidden;*/
                /*li{*/
                /*float: left;*/
                /*}*/
                /*}*/

            }
        }
    </style>
