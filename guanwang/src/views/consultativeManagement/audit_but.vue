<template>
    <div class="main-box">
         <ul class="audit_but_header">
              <li class="audit_but_header_li1">
                  <span>范围：</span>
              </li>
              <li class="audit_but_header_li2" v-for="(item,index) in messageArr" @click="lookState(item)">{{item}}</li>
             <li class="audit_but_header_li3">
                 <span>AI审核日期</span>
                 <el-date-picker
                         v-model="value4"
                         type="datetimerange"
                         range-separator="至"
                         start-placeholder="开始日期"
                         end-placeholder="结束日期">
                 </el-date-picker>
             </li>
             <li class="audit_but_header_li4">
                 <el-input v-model="seachValue" placeholder="请输入关键字"></el-input>
             </li>
             <li class="audit_but_header_li5">
                 <el-button type="primary" @click="seachClick()">按标题搜索</el-button>
             </li>
         </ul>

        <div class="works_list">
            <div class="works_list_header">
                <el-table
                        :data="tableData3"
                        max-height="200"
                        border-bottom
                        style="width: 100%">
                    <el-table-column width="180" align="center" prop="image">
                        <template scope="scope">
                            <img src="/static/images/logo.png" width="100" height="60"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" width="180"></el-table-column>
                    <el-table-column prop="date"width="180"></el-table-column>
                    <el-table-column prop="date" label="上传时间" width="180"></el-table-column>
                    <el-table-column prop="date" label="机器审核时间" width="180"></el-table-column>
                    <el-table-column prop="name"label="人工审核时间" width="180"> </el-table-column>
                    <el-table-column prop="address" label="人工审核员"></el-table-column>
                </el-table>
            </div>
            <div class="works_list_content">
                <div class="works_list_content_AI">
                    <div class="works_list_content_AI_top">
                        <span>AI审核结果</span>
                        <el-radio v-model="radio" label="不通过">不通过</el-radio>
                    </div>
                    <div class="works_list_content_AI_bottom">
                        <div class="works_list_content_AI_bottom_left">不通过原因</div>

                        <div class="works_list_content_AI_bottom_right">
                            <div style="font-weight: 900;font-size: 16px;line-height: 32px">文字</div>
                            <div>
                                <el-table  :data="tableDataAi" max-height="200" border style="width: 100%">
                                    <el-table-column prop="date" label="序号" width="180"> </el-table-column>
                                    <el-table-column prop="name" label="相关内容" width="180"></el-table-column>
                                    <el-table-column prop="涉及以下原因不通过"  label="地址"></el-table-column>
                                </el-table>
                            </div>
                            <div style="font-weight: 900;font-size: 16px;line-height: 32px">图片</div>
                            <div>
                                <el-table :data="tableDataAiImg"  max-height="200"  border style="width: 100%">
                                    <el-table-column prop="date" label="序号" width="180"></el-table-column>
                                    <el-table-column  prop="name" label="相关内容" width="180"></el-table-column>
                                    <el-table-column prop="address" label="涉及以下原因不通过"></el-table-column>
                                </el-table>
                            </div>
                            <div style="font-weight: 900;font-size: 16px;line-height: 32px">视频</div>
                            <div>
                                <el-table :data="tableDataAiVideo"  max-height="200"  border style="width: 100%">
                                    <el-table-column prop="date" label="序号" width="180"></el-table-column>
                                    <el-table-column  prop="name" label="相关内容" width="180"></el-table-column>
                                    <el-table-column prop="address" label="涉及以下原因不通过"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="works_list_content_RG">
                    <div class="works_list_content_RG_top">
                        <span>人工审核</span>
                        <el-radio v-model="RGradio" label="不通过">不通过</el-radio>
                        <el-radio v-model="RGradio" label="通过">通过</el-radio>
                    </div>
                    <div class="works_list_content_RG_bottom">
                        <span>人工审核备注</span>
                        <el-input type="textarea" v-model="textareaValue"  :rows="5"></el-input>

                    </div>
                    <div class="button_button">
                        <el-button type="primary" @click="modifyClick">修改备注</el-button>
                        <el-button type="primary" @click="addClick">提交备注</el-button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>


<script>

    export default {
        data() {
            return {
                seachValue:"",//搜索
                messageArr:["全部","人工未审","人工已审","人工不过","人工已过"],
                value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)], //AI审核日期
                textareaValue:"经调查，该文无特别敏感词，可以上架",
                tableDataAiImg: [{ //ai不通过的文字
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                tableDataAi: [ {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                radio:"不通过", //ai选择
                RGradio:"通过", //ai选择
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                tableDataAiVideo:[{ //视频
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        created(){

        },
        methods: {
            addClick(){ //提交

            },
            modifyClick(){//修改卑职

            },
            lookState(){ //查看状态

            },
            seachClick(){ //搜索

            },
        }
    };
</script>

<style scoped lang="scss">
.audit_but_header{
    width: 1300px;
    overflow: hidden;
    padding: 10px 30px;
    box-sizing: border-box;
    height: 80px;
    li{
        line-height: 60px;
        float: left;
        font-size: 14px;
    }
    .audit_but_header_li1{
        max-height: 10px;
        span{
            font-size: 16px;
        }
    }
    .audit_but_header_li2{
        margin-left: 10px;
        color: #41BDC7;
    }
    .audit_but_header_li3{
        margin-left: 10px;
        span{
            margin-right: 10px;
        }
    }
    .audit_but_header_li4{
        margin: 0 10px;
    }
}
.works_list{
    width: 100%;
    background: #FFFFFF;
    >.works_list_header{
        max-width: 1280px;
    }
    .works_list_content{
        max-width: 1280px;
        padding: 20px 50px;
        .works_list_content_AI{
            width: 1000px;
            .works_list_content_AI_top{
                width: 100%;
                height: 100px;
                line-height: 100px;
                span{
                    font-size: 16px;
                    font-weight: 900;
                    margin-right: 50px;
                }
            }
            .works_list_content_AI_bottom{
                width: 100%;
                height: 600px;
                .works_list_content_AI_bottom_left{
                    width: 100px;
                    float: left;
                }
                .works_list_content_AI_bottom_right{
                    width: 800px;
                    float: left;
                }
            }
        }
        .works_list_content_RG{
            width: 1000px;
            .works_list_content_RG_top{
                width: 100%;
                height: 100px;
                line-height: 100px;
                span{
                    font-size: 16px;
                    font-weight: 900;
                    margin-right: 50px;
                }
            }
            .works_list_content_RG_bottom{
                width: 800px;
                height: 120px;
                span{
                    width: 100px;
                    float: left;
                }
                .el-textarea{
                    width: 600px;
                    float: left;
                    margin-left: 80px;
                }

            }
            .button_button{
                width: 100%;
                height: 100px;
                margin-top: 10px;
            }
        }
    }
}
</style>
