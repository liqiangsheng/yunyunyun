<template>
  <div id="Me">
    <div class="userinfo">
      <img class='bgImge' :src='bgImge'/>
      <div>
        <img @click="loginBnt" class="userinfoImage" :src="userInfo.header"/>
        <span class="userinfo-nickname">{{userInfo.name}}</span>
      </div> 
    </div>
    <div class='meList'>
        <div @click='settingBnt'>
        设置
        <img src='/static/images/right.png'/>
       </div>
       <div @click='meActivityBnt'>
        我的活动
         <img src='/static/images/right.png'/>
       </div>
        <div @click='aboutBnt'>
        关于不同
          <img src='/static/images/right.png'/>
       </div>
    </div>
    <div @click='outBnt' class='outBnt'>
            退出
      </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
   import { IntallData } from '../../assets/js/promiseHttp';
export default {
  name: 'me',
  data(){
      return{
        bgImge:"./static/images/bg.png",
        userInfo: {
        header: "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png",
        name: "登录",
        },
      }
  },
  created(){
       if(JSON.parse(window.sessionStorage.getItem("userInfo"))){    //获取本地存储信息
        let data = JSON.parse(window.sessionStorage.getItem("userInfo"))
           IntallData(data).then(res=>{
               if(res.data.status ==true){
                this.bgImge=res.data.data.owner_url;
                this.userInfo. header= res.data.data.owner_url;
                this.userInfo. name= res.data.data.name;
                }else{
                   Toast("网络异常，请重试")
               }

               
           })
       }else{
             this.bgImge="./static/images/bg.png";
                this.userInfo. header= "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png";
                this.userInfo. name= "登录";
       }
  },
  methods:{
      loginBnt(){ //登录

      },
      outBnt(){ //退出

      },
      aboutBnt(){ //关于不同

      },
      settingBnt(){ //设置

      },
      meActivityBnt(){//我的活动

      },
  }
}

</script>

<style scoped lang="less">
@import "../../assets/css/me.css";
</style>
