<template>
    <!--意见反馈-->
    <div class="main-box">
        <div class="feedback">
            <div class="feedback_header">
                <el-button type="primary" @click="sortClick('全部展开')">全部展开</el-button>
                <el-button type="primary" @click="sortClick('全部收起')">全部收起</el-button>
                <el-input v-model="titleOneValue" placeholder="请输入意见关键字、用户名"></el-input>
                <el-button type="primary" @click="sortClick('搜索')">搜索</el-button>
                <el-button type="primary" @click="sortClick('刷新')">刷新</el-button>
            </div>
            <div class="feedback_content" v-for="(item,index) in listArr">
               <div class="feedback_content_top">
                   <span class="feedback_span">{{item.id}}：{{item.liaoting[0].value}}</span>
                   <span>用户：{{item.liaoting[0].name}}</span>
                   <span><el-button type="primary" @click="single_user_mode(item)">单用户模式</el-button></span>
                   <span><el-button type="primary" @click="retract(item)">收起</el-button></span>
                   <span>状态： 未解决</span>
                   <span><el-button type="primary" @click="closing_a_case(item)">结案</el-button></span>
               </div>
                <div class="feedback_content_bottom" v-if="item.isBool == true">
                   <ul v-for="(item1,index1) in item.liaoting">
                      <li>
                          <div class="feedback_content_centent">{{item1.time|moment('YYYY-MM-DD HH:mm:ss')}}</div>
                          <div class="feedback_content_IMS":class="{active:item1.state==2}">
                              <span class="feedback_content_IMS_span1">{{item1.name}}</span>
                              <span class="feedback_content_IMS_span2">{{item1.value}}</span>
                              <el-button v-if="item1.state==2" type="primary" @click="withdraw">撤回</el-button>
                          </div>
                      </li>
                   </ul>
                    <div class="feedback_content_reply">
                        <el-input v-model="replyValue" placeholder="请输入回复"></el-input>
                        <span>不同客服：程程</span>
                        <el-button type="primary" @click="withdraw">回复</el-button>
                    </div>
                    <div class="platform_notes">
                          <span>平台备注</span>
                        <el-input v-model="rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                        <el-button type="primary" @click="toUpdate">更新</el-button>
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
                rinformantValue:"",//平台备注
                replyValue:"",//回复
                titleOneValue:"",//请输入意见关键字、用户名
                listArr:[
                    {id:"1",isBool:true,liaoting:[
                        {state:1,name:"潇洒哥",time:1543212345452,value:"我长这么帅你知道吗，我等了你30年你还不出现,我的富婆，快出现等不急了"},
                        {state:2,name:"曾大超",time:1543212345452,value:"我在天涯海角，快来，洗白了"}
                    ]
                    },
                    {id:"2",isBool:true,liaoting:[
                        {state:1,name:"潇洒哥",time:1543212345651,value:"我长这么帅你知道吗，我等了你30年你还不出现,我的富婆，快出现等不急了"},
                        {state:2,name:"曾大超",time:1543212345462,value:"我在天涯海角，快来，洗白了"}
                    ]
                    },
                ], //数据
            }
        },

        methods: {

            toUpdate(){//更新

            },
            withdraw(){//withdraw撤回

            },
            single_user_mode(v){//单用户模式

            },
            retract(v){//收起
             v.isBool = false;
            },
            sortClick(v){ //全部展开 全部收起 搜索 刷新
               if(v === '全部展开'){
                   this.listArr.forEach((item,index)=>{
                       item.isBool = true;
                   })
               }else if(v === '全部收起'){
                       this.listArr.forEach((item,index)=>{
                           item.isBool = false;
                       })
               }else if(v === '搜索'){

               }else if(v === '刷新'){

               }
            },
            closing_a_case(v){ //结案

            }
        }
    };
</script>

<style scoped lang="scss">
  .feedback{
      width: 100%;
    .feedback_header{
        width: 100%;
        height: 100px;
        line-height: 100px;
        background: #EEEEEE;
        padding-left: 20px;
        .el-input{
            width: 300px;
            margin: 0 20px;
        }
    }
      .feedback_content{
          width: 100%;
          margin-bottom: 1px;
          .feedback_content_top{
              width: 100%;
              height: 100px;
              line-height: 100px;
              background: #ffffff;
              span{
                  display: block;
                  float: left;
                  font-size: 16px;
              }
              .feedback_span{
                  width: 500px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space:nowrap;
                  margin-right: 20px;
              }
              .el-button{
                  margin: 0 20px;
              }
          }
          .feedback_content_bottom{
             width: 1080px;
              margin: 10px;
              padding: 20px;
              box-sizing: border-box;
              border: 1px solid black;
              border-radius: 4px;
              overflow: hidden;
              ul{
                  width:100%;
                  li{
                      width: 100%;
                      .feedback_content_centent{
                          width: 100%;
                          text-align: center;
                          line-height: 30px;
                      }
                      .feedback_content_IMS{
                          width: 500px;
                          margin-top: 10px;
                          overflow: hidden;
                          padding-left:100px ;
                          .feedback_content_IMS_span1{
                              display: block;
                              float: left;
                              width: 60px;
                              height: 60px;
                              text-align: center;
                              line-height: 60px;
                              border-radius: 50%;
                              background: #EEEEEE;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              white-space:nowrap;
                          }
                          .feedback_content_IMS_span2{
                              display: block;
                              float: left;
                              text-align: center;
                              background: #EEEEEE;
                              width: 420px;
                              margin-left: 15px;
                              border: 1px solid #999999;
                              border-radius: 4px;
                              background: #ffffff;
                              padding: 20px;
                              box-sizing: border-box;
                              text-align: left;
                          }

                      }
                      .feedback_content_IMS.active{
                          float: right;
                          margin-bottom: 10px;
                          padding-right:100px ;
                          overflow: hidden;
                          position: relative;
                          .feedback_content_IMS_span1{
                              display: block;
                              float: right;
                              width: 60px;
                              height: 60px;
                              text-align: center;
                              line-height: 60px;
                              border-radius: 50%;
                              background: #EEEEEE;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              white-space:nowrap;
                          }
                          .feedback_content_IMS_span2{
                              display: block;
                              float: left;
                              text-align: center;
                              background: #EEEEEE;
                              width: 420px;
                              border: 1px solid #999999;
                              border-radius: 4px;
                              background: #ffffff;
                              padding: 20px;
                              text-align: left;
                              box-sizing: border-box;
                          }
                          .el-button{
                              position: absolute;
                              right: 0;
                              top: 15px;
                          }
                      }


                  }
              }
              .feedback_content_reply{
                  width: 600px;
                  float: right;
                  .el-input{
                      width: 360px;
                  }
                  span{
                      margin: 0 10px;
                  }
              }
              .platform_notes{
                  float: left;
                  width: 100%;
                  height: 200px;
                  margin: 20px 0;
                  overflow: hidden;
                  span{
                      display: inline-block;
                      width: 100px;
                      height: 50px;
                      background: #EEEEEE;
                      text-align: center;
                      line-height: 50px;
                      border-radius: 4px;
                      float: left;
                      margin-left: 10px;
                      margin-right: 10px;
                  }
                  .el-textarea{
                      width: 800px;
                      float: left;
                      margin-right: 10px;
                  }
              }
          }

      }
  }
</style>
