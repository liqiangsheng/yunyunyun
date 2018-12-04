<template>
    <div class="detail">
        <div class="detailHeader">
                  <el-button type="primary" @click="userClick('账号失效')">账号失效</el-button>
                  <el-button type="primary" @click="userClick('私信')">私信</el-button>
                  <el-button type="primary" @click="userClick('文章')">文章</el-button>
                  <el-button type="primary" @click="userClick('订单')">订单</el-button>
        </div>
        <div class="userDetail">
            <div class="userDetail_title">
                <b>用户</b>
                <el-button type="primary" @click="userClick('编辑')">编辑</el-button>
            </div>
            <ul>
                <li class="li1">
                    <img src="/static/images/logo.png" alt="">
                </li>
                <li class="li2">
                 <div v-if="userState==true">
                     <p><b>用户号</b><el-input v-model="user.userNum" placeholder="请输入用户号"></el-input></p>
                     <p><b>用户名</b><el-input v-model="user.userValue" placeholder="请输入用户名"></el-input></p>
                     <p><b>用户类别</b><el-input v-model="user.userType" placeholder="请输入用户类别"></el-input></p>
                 </div>
                 <div v-if="userState==false">
                     <p><b>用户号</b>{{22222}}</p>
                     <p><b>用户名</b>{{3333333}}</p>
                     <p><b>用户类别</b>{{444444444}}</p>
                 </div>
                </li>
                <li class="li2">
                    <div v-if="userState==true">
                        <p><b>性别</b><el-input v-model="user.userSex" placeholder="请输入性别"></el-input></p>
                        <p><b>地区</b><el-input v-model="user.userCity" placeholder="请输入地区"></el-input></p>
                        <p><b>生日</b><el-input v-model="user.userBirthday" placeholder="请输入生日"></el-input></p>
                    </div>
                    <div v-if="userState==false">
                        <p><b>性别</b>{{1}}</p>
                        <p><b>地区</b>{{213123}}</p>
                        <p><b>生日</b>{{1990731}}</p>
                    </div>
                </li>
                <li class="li4">
                    <span>自我介绍</span>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="user.textarea">
                    </el-input>
                </li>
            </ul>
        </div>

        <div class="userDetail">
            <div class="userDetail_title">
                <b>绑定</b>
                <el-button type="primary" @click="userClick('取消绑定')">取消绑定</el-button>
            </div>
            <ul>
                <li class="li1">

                </li>
                <li class="li2">
                    <div>
                        <p><b>手机</b>{{22222}}</p>
                        <p><b>Facebook</b>{{3333333}}</p>
                    </div>
                </li>
                <li class="li2">
                    <div>
                        <p><b>微信</b>{{1}}</p>
                        <p><b>Twitter</b>{{213123}}</p>
                    </div>
                </li>
                <li class="li2">
                    <div>
                        <p><b>QQ</b>{{1}}</p>
                    </div>
                </li>

            </ul>

        </div>

        <div class="userDetail">
            <div class="userDetail_title">
                <b>状态</b>
                <el-button type="primary" @click="userClick('封禁历史')" style="margin-left: 10px">封禁历史</el-button>
                <el-button type="primary" @click="userClick('更新备注')">更新备注</el-button>
                <el-button type="primary" @click="userClick('立即封禁')">立即封禁</el-button>
                <el-button type="primary" @click="userClick('立即解封')">立即解封</el-button>
            </div>
            <ul>
                <li class="li1">
                </li>
                <li class="li2">
                    <div>
                        <p><b>状态</b>正常</p>
                    </div>
                </li>
                <li class="li2">
                    <div>
                        <p><b>上次封禁日期</b>{{1}}</p>
                        <p><b>上次解封日期</b>{{213123}}</p>
                        <p><b>即将解封日期</b>{{1990731}}</p>
                    </div>
                </li>
                <li class="li4">
                    <span>上次封禁备注</span>
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入上次封禁备注"
                            v-model="user.textarea">
                    </el-input>
                    <span>上次解封备注</span>
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入上次解封备注"
                            v-model="user.textarea">
                    </el-input>
                </li>
            </ul>
        </div>

        <div class="userDetail">
            <div class="userDetail_title">
                <b>统计</b>
            </div>
            <ul>
                <li class="li1">

                </li>
                <li class="li3">
                    <b>文章数</b>{{200}}
                </li>
                <li class="li3">
                    <b>作品数</b>{{20550}}
                </li>
                <li class="li3">
                    <b>获读量</b>{{204440}}
                </li>
                <li class="li3">
                    <b>获赞量</b>{{20022}}
                </li>
                <li class="li3">
                    <b>获评量</b>{{20022}}
                </li>
                <li class="li3">
                    <b>活跃度</b>{{200}}
                </li>
            </ul>
        </div>
        <el-dialog :append-to-body="true" class="dialog"  width="500px"  top="18%" title="封禁用户" :visible.sync="innerVisible">
            <DisableAlter @innerVisibleIS="innerVisibleIS"></DisableAlter>
        </el-dialog>
        <el-dialog :append-to-body="true" class="dialog"  width="500px"  top="20%" title="解封用户" :visible.sync="unsealingShow">
            <Unsealing @unsealingIs="unsealingIs"></Unsealing>
        </el-dialog>
    </div>
</template>


<script>
  import DisableAlter from './disableUserAlter.vue'
  import Unsealing from './unsealing.vue'
    export default {
      components:{
          DisableAlter,Unsealing
      },
        props:["detailItem"],
        data() {
            return {
                user:{ //用户信息
                  userValue:"",
                  userNum:"",
                  userSex:"",
                  userBirthday:"",
                  userCity:"",
                  userType:"",
                    textarea:"",
                },
                userState:false,
                innerVisible:false,//立即封禁
                unsealingShow:false, //解封
            }
        },
       created(){
             console.log(this.detailItem,"askdlasdsak")
       },
        methods: {
            innerVisibleIS(v){ //立即封禁
                this.innerVisible = v;
            },
            unsealingIs(v){ //立即解封
                this.unsealingShow = v;
            },
            userClick(v){ //账号失效 私信 文章 订单 编辑 取消绑定 立即封禁 立即解封 更新备注 封禁历史
                 if(v==='账号失效'){

                 }else if(v==='私信'){

                 }else if(v==='文章'){

                 }else if(v==='订单'){

                 }else if(v==='编辑'){
                    this.userState = !this.userState
                 }else if(v==='取消绑定'){

                 }else if(v==='立即封禁'){
                  this.innerVisible = !this.innerVisible;
                 }else if(v==='立即解封'){
                  this.unsealingShow = !this.unsealingShow;
                 }else if(v==='更新备注'){

                 }else if(v==='封禁历史'){

                 }
            }
        }
    };
</script>

<style scoped lang="scss">
.detail{
    width:100%;
    min-height: 200px;
    max-height: 800px;
    overflow: auto;
    .detailHeader{
        width:100%;
        height: 50px;
        line-height: 50px;
        text-align: right;
    }
    .userDetail{
        width: 100%;
        height: 250px;
        margin-top: 20px;
        .userDetail_title{
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid rgba(5,5,9,0.3);
            b{
                font-size: 16px;
            }
            .el-button{
                float: right;
            }
        }
    }
    ul{
        width: 100%;
        height: 200px;
        margin: 0;
        /*overflow: hidden;*/
        li{
            float: left;
            height: 200px;
            box-sizing: border-box;
        }
        .li1{
            width: 150px;
            img{
                display: block;
                width: 120px;
                height: 120px;
                margin-top: 40px;
            }
        }
        .li2{
         width: 200px;
            padding: 10px 0;
            div{
                p{
                    margin: 0;
                    line-height: 60px;
                    b{
                        display: inline-block;
                        width: 90px;
                    }
                    .el-input{
                        width: 100px;
                    }
                }
            }
        }
        .li3{
            width: 130px;
            line-height: 50px;
            b{
                width: 40px;
                margin-right: 5px;
            }
        }
        .li4{
            width: 400px;
            span{
                display: inline-block;
                width: 100%;
                height: 50px;
                line-height: 50px;
            }
            .el-textarea{
                width: 100%;
            }
        }
    }
}
</style>
