<template>
    <!--主动通知管理-->
    <div class="main-box">
        <div class="activebox">
              <div class="activebox_title">
                  <b>发送通知</b>
              </div>
              <div class="activebox_centent">
                  通知名称：<el-input v-model="obj.titleOneValue" placeholder="请输入通知名称"></el-input>
                  通知类型：<el-select v-model="obj.selectValue" placeholder="请选择通知类型">
                  <el-option
                          v-for="item in obj.options"
                          :key="item.value"
                          :label="item.id"
                          :value="item.value">
                  </el-option>
              </el-select>
                  通知时间： <el-date-picker
                          v-model="obj.TimeOneValue"
                          type="datetime"
                          placeholder="请选择通知时间">
                  </el-date-picker>
              </div>
            <div class="activebox_content">
                <el-input v-model="obj.rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="sendOut()">发送到所有用户</el-button>
                <el-button type="primary" @click="preservation()">保存草稿</el-button>
            </div>
<!--2-->
            <div class="activebox_title">
                <b>通知草稿</b>
            </div>
            <div class="activebox_centent">
                通知名称：<el-input v-model="obj1.titleOneValue" placeholder="请输入通知名称"></el-input>
                通知类型：<el-select v-model="obj1.selectValue" placeholder="请选择通知类型">
                <el-option
                        v-for="item in obj1.options"
                        :key="item.value"
                        :label="item.id"
                        :value="item.value">
                </el-option>
            </el-select>
                通知时间： <el-date-picker
                    v-model="obj1.TimeOneValue"
                    type="datetime"
                    placeholder="请选择通知时间">
            </el-date-picker>
                <span>起草者：小习</span>
            </div>
            <div class="activebox_content">
                <el-input v-model="obj1.rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="excelClick(num='1')">导入到编辑框</el-button>
                <el-button type="primary" @click="deleteClick(num='1')">删除</el-button>
            </div>

            <div class="activebox_centent">
                通知名称：<el-input v-model="obj1.titleOneValue" placeholder="请输入通知名称"></el-input>
                通知类型：<el-select v-model="obj1.selectValue" placeholder="请选择通知类型">
                <el-option
                        v-for="item in obj1.options"
                        :key="item.value"
                        :label="item.id"
                        :value="item.value">
                </el-option>
            </el-select>
                通知时间： <el-date-picker
                    v-model="obj1.TimeOneValue"
                    type="datetime"
                    placeholder="请选择通知时间">
            </el-date-picker>
                <span>起草者：程程</span>
            </div>
            <div class="activebox_content">
                <el-input v-model="obj1.rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="excelClick(num='2')">导入到编辑框</el-button>
                <el-button type="primary" @click="deleteClick(num='2')">删除</el-button>
            </div>
            <!--3-->
            <div class="activebox_title">
                <b>发送通知</b>
            </div>
            <div v-for="(item,index) in obj2.options">
                <div class="activebox_centent">
                    通知名称：关于系统遭受攻击的通知
                    <span>通知时间：2018-08-03 15:02:17</span>
                    <span>发布者：小习</span>

                </div>
                <div class="activebox_content">
                    <el-input v-model="item.rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                    <el-button type="primary" @click="history(item)">导入到编辑框</el-button>
                </div>
            </div>

        </div>
    </div>
</template>


<script>

    export default {

        data() {
            return {
                obj:{//发送通知
                    titleOneValue:"",//通知名称
                    selectValue:"",//通知类型
                    options:[{id:"1",value:"系统"}],
                    TimeOneValue:"",//通知时间
                    rinformantValue:"",//发送通知的编辑
                },
                obj1:{//通知草稿
                    titleOneValue:"",//通知名称
                    selectValue:"",//通知类型
                    options:[{id:"1",value:"系统"}],
                    TimeOneValue:"",//通知时间
                    rinformantValue:"尊敬的客户， 由于最近本平台受到了黑客的恶意攻击，APP出现了闪退情况，给你带来的不便我们深表歉意。经过紧张处理，攻击已经得到控制。请下载最新的软件版本避免客户端问题。",//发送通知的编辑
                },
                obj2:{
                    options:[
                        {id:"1",rinformantValue:"尊敬的客户， 由于最近本平台受到了黑客的恶意攻击，APP出现了闪退情况，给你带来的不便我们深表歉意。经过紧张处理，攻击已经得到控制。请下载最新的软件版本避免客户端问题。"},
                        {id:"2",rinformantValue:"尊敬的客户， 由于最近本平台受到了黑客的恶意攻击，APP出现了闪退情况，给你带来的不便我们深表歉意。经过紧张处理，攻击已经得到控制。请下载最新的软件版本避免客户端问题。"},
                        {id:"3",rinformantValue:"尊敬的客户， 由于最近本平台受到了黑客的恶意攻击，APP出现了闪退情况，给你带来的不便我们深表歉意。经过紧张处理，攻击已经得到控制。请下载最新的软件版本避免客户端问题。"},
                    ],
                }

            }
        },

        methods: {
            sendOut(){//发送到所有用户

            },
            preservation(){ //保存草稿

            },
            excelClick(v){//导入到编辑框

            },
            deleteClick(v){//删除

            },
            history(v){//导入到编辑框 历史通知的

            }
        }
    };
</script>

<style scoped lang="scss">
  .activebox{
      width: 100%;
      .activebox_title{
          width: 100%;
          height: 100px;
          line-height: 100px;
          background: rgba(5,5,9,.3);
          b{
              display: inline-block;
              min-width: 1000px;
              max-width: 1280px;text-align: center;
              font-size: 18px;
          }
      }
      .activebox_centent{
          width: 100%;
          height: 100px;
          line-height: 100px;
          background: #EEEEEE;
          .el-input{
              width: 200px;
          }
          span{
              margin-left: 20px;
          }

      }
      .activebox_content{
          width: 100%;
          padding: 20px;
          height: 200px;
          background: #ffffff;
          box-sizing: border-box;
          .el-textarea{
              width: 500px;
          }
      }
  }
</style>
