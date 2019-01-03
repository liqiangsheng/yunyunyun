<template>
  <div id="PersonalSettings">
    <ul class='meList'>
        <li @click='settingBnt'>
        设置
        <img src='/static/images/right.png'/>
       </li>
       <li @click='meActivityBnt'>
        我的活动
         <img src='/static/images/right.png'/>
       </li>
      <li @click='comment_my'>
        评论我的
        <img src='/static/images/right.png'/>
      </li>
      <li @click='praise_my'>
        点赞我的
        <img src='/static/images/right.png'/>
      </li>
      <li @click='collect_my'>
        收藏我的
        <img src='/static/images/right.png'/>
      </li>
      <li @click='commentBnt'>
        消息通知
        <img src='/static/images/right.png'/>
      </li>
      <li @click='userBnt'>
        用户反馈
        <img src='/static/images/right.png'/>
      </li>
        <li @click='aboutBnt(1," 关于不同")'>
        关于不同
          <img src='/static/images/right.png'/>
       </li>
    </ul>

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
  name: 'personalSettings',
  data(){
      return{
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "个人设置";
    })
  },

  methods:{
    comment_my(){ //评论我的
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if (data) {
        this.$router.push({path:"/comment_on_my"})
      } else {
        Toast("您未登录，请登录！")
      }
    },
    praise_my(){ //点赞我的
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if (data) {
        this.$router.push({path:"/praiseMe"})
      } else {
        Toast("您未登录，请登录！")
      }
    },
    collect_my() { //收藏我的
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if (data) {
        this.$router.push({path:"/collect_my"})

      } else {
        Toast("您未登录，请登录！")
      }
    },
    commentBnt(){ //消息通知
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
        this.$router.push({path:"/messageNotification"})
      }else{
        Toast("您未登录，请登录！")
      }
    },
    userBnt(){ //用户反馈
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
        this.$router.push({path:"/userFeedback"})
      }else{
        Toast("您未登录，请登录！")
      }
    },
    tabarClick(i){  //tabar点击事件
//      this.tabbarAarrIndex = i;
      this.$router.push({path:this.tabbarArr[i].path});

    },
      outBnt(){ //退出
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if(data){
          this.tabListBool = false;
          localStorage.removeItem("userInfo"); //清楚登录信息
          Toast("退出成功！")
          setTimeout(()=>{
            this.$router.push({path:"/"}); //去首页
          },1000)

        }else{
          Toast("您未登录，请登录")
        }

      },
      aboutBnt(v,v1){ //关于不同
        let obj = {}
        obj.v = v;
        obj.v1= v1;
        localStorage.setItem("messageShow1",JSON.stringify(obj)); //保存状态
        this.$router.push({path:"/message"}) //去关于不同介绍页面
      },
      settingBnt(){ //设置
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if(data){
          this.$router.push({path:"/editingInformation"})
        }else{
          Toast("您未登录，请登录！")
        }

      },
      meActivityBnt(){//我的活动
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if(data){
          this.$router.push({path:"/meActivity"})
        }else{
          Toast("您未登录，请登录！")
        }

      },
  }
}

</script>

<style scoped lang="less">
  #PersonalSettings{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: #eeeeee;
    box-sizing: border-box;
    overflow-y:auto;
    overflow-x: hidden;
  .userinfo{
    width: 100%;
    height: 1.68rem;
    position: relative;
    .bgImge{
      display: inline-block;
      height: 100%;
      width: 100%;
      filter: blur(15px);
      opacity:0.3;
    }
    .userinfoImage{
      width: 0.65rem;
      height:  0.65rem;
      border-radius: 100%;
      position: absolute;
      left: 40%;
      top: .35rem;

    }
    .userinfo-nickname{
      position: absolute;
      left: 0;
      top: 1.1rem;
      display: block;
      width: 100%;
      text-align: center;
      height:.16rem;
      font-size:.17rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(5,5,9,1);
    }
    .userinfo_set{
      width:1.0rem;
      height: 0.32rem;
      background:rgba(0,0,0,0.2);
      border-radius:0.16rem;
      position: absolute;
      right: -0.15rem;
      top: 0.48rem;
      line-height: 0.32rem;
      text-indent: 0.05rem;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      img{
        display: inline-block;
        width: 0.13rem;
        height: 0.1rem;
      }
    }
  }



  .meList{
    width: 100%;
    li{
      width: 100%;
      height: .49rem;
      background: #fff;
      padding: 0 .1rem;
      line-height: .5rem;
      position: relative;
      color:rgba(102,102,102,1);
      font-size:.14rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      border-bottom: 0.01rem solid #EEEEEE;
      img{
        width: .14rem;
        height: .24rem;
        position: absolute;
        right: .35rem;
        top: 25%;
      }
    }
    li:after{
      content: '';
      border-bottom: .01rem;
      width: 100%;
      box-sizing: border-box;
      -webkit-box-sizing:border-box;
      background-color: #DFDFDF;
      position:absolute;
      bottom: 0;
      left: 0;
      transform: scale(1,0.5);
      transform-origin: left bottom;
    }
    li:last-child{
      border-bottom:none;
    }
  }
  .outBnt{
    width: 100%;
    height: .5rem;
    padding: 0 .1rem;
    line-height: .5rem;
    margin-top: .1rem;
    color: #FE5F5F;
    font-size:.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    background: #fff;
  }
  }
</style>
