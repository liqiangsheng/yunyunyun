<template>
    <div class="main-box">
          <div class="works_list">
               <div class="works_list_header">
                   <el-table
                           :data="tableData3"
                           max-height="200"
                           border-bottom
                           style="width: 100%">
                       <el-table-column width="180" align="center" prop="image">
                           <template slot-scope="scope">
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
                          <el-radio v-model="radio" label="通过">通过</el-radio>
                      </div>
                       <div class="works_list_content_AI_bottom">
                           <div class="works_list_content_AI_bottom_left">不通过原因</div>

                           <div class="works_list_content_AI_bottom_right">
                               <div>文字</div>
                               <div>
                                   <el-table  :data="tableDataAi" max-height="250" border style="width: 100%">
                                       <el-table-column prop="date" label="序号" width="180"> </el-table-column>
                                       <el-table-column prop="name" label="相关内容" width="180"></el-table-column>
                                       <el-table-column prop="涉及以下原因不通过"  label="地址"></el-table-column>
                                   </el-table>
                               </div>
                               <div>图片</div>
                               <div>
                                   <el-table :data="tableDataAiImg"  max-height="250"  border style="width: 100%">
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

                          <el-button type="primary" @click="okClick">确认备注</el-button>
                      </div>
                  </div>
              </div>

          </div>
    </div>
</template>


<script>
    export default {
        name:"worksmanagementList",
        data() {
            return {
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
                }]
            }
        },
       created(){

       },
        methods: {
            okClick(){ //确认备注

            }
        }
    };
</script>

<style scoped lang="scss">
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
                    height: 800px;
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
            }
        }
    }

</style>
