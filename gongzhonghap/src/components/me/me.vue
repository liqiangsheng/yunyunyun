<template>
  <div id="Me">

    <div class="userinfo">
      <img class='bgImge' :src='bgImge'/>
      <div>
        <img @click="loginBnt" class="userinfoImage" :src="userInfo.header"/>
        <span class="userinfo-nickname">{{userInfo.name}}</span>
      </div>
    </div>
    <ul class="me_ul" v-if="tabListBool">
      <li v-for="(item,index) in tabList" @click='myfollowBnt(item)'>
         <span>
           {{item.num}}
         </span><br>
         {{item.name}}
      </li>
    </ul>
    <div class='meList'>

        <div @click='settingBnt'>
        设置
        <img src='/static/images/right.png'/>
       </div>
       <div @click='meActivityBnt'>
        我的活动
         <img src='/static/images/right.png'/>
       </div>
      <div @click='commentBnt'>
        消息通知
        <img src='/static/images/right.png'/>
      </div>
      <div @click='userBnt'>
        用户反馈
        <img src='/static/images/right.png'/>
      </div>
        <div @click='aboutBnt(1," 关于不同")'>
        关于不同
          <img src='/static/images/right.png'/>
       </div>
    </div>
    <div @click='outBnt' class='outBnt'>
            退出
      </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarArr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg">
        {{item.name}}
      </li>
    </ul>

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
        tabList:[{name:"关注",num:"2000"},{name:"粉丝",num:"1.5万"},{name:"点赞",num:"5000"},{name:"收藏",num:"100"},{name:"评论",num:"265"},],
        tabListBool:false, //显示
        bgImge:"./static/images/bg.png",
        userInfo: {
        header: "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png",
        name: "登录",
        },
        tabbarArr:[  //、、tab
          {name:"首页",icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex"},
          {name:"智慧活动",icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
          {name:"火图直播",icon:"./static/images/火图2.png",icon1:"./static/images/火图1.png",path:"/fireMap"},
          {name:"我的",icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
        ],
        tabbarAarrIndex:3,  //点击tab的下标
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的";
    })

       if(JSON.parse(window.localStorage.getItem("userInfo"))){    //获取本地存储信息
         this.tabListBool = true;
        let data = JSON.parse(window.localStorage.getItem("userInfo"))
           IntallData(data).then(res=>{
             console.log(res,"ashkdaksdkask")
               if(res.data.status ==true){
                this.bgImge=res.data.data.owner_url;
                this.userInfo.header= res.data.data.owner_url?res.data.data.owner_url:"./static/images/defultphoto.png";
                this.userInfo.name= res.data.data.name;
                }else{
                   Toast("网络异常，请重试")
               }


           })
       }else{
             this.tabListBool = false;
             this.bgImge="./static/images/bg.png";
                this.userInfo.header= "./static/images/defultphoto.png";
                this.userInfo.name= "登录";
       }
  },

  methods:{
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
    myfollowBnt(v){ //我的关注 粉丝 点赞 收藏 评论
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
          if(v.name == "关注"){
            this.$router.push({path:"/myfollow"})
          }else if(v.name == "粉丝"){
            this.$router.push({path:"/fans"})
          }else if(v.name == "点赞"){
            this.$router.push({path:"/myFabulous"})
          }else if(v.name == "收藏"){
            this.$router.push({path:"/myCollection"})
          }else if(v.name == "评论"){
            this.$router.push({path:"/myComment"})
          }

      }else{
        Toast("您未登录，请登录！")
      }
    },
    tabarClick(i){  //tabar点击事件
//      this.tabbarAarrIndex = i;
      this.$router.push({path:this.tabbarArr[i].path});

    },
      loginBnt(){ //登录
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if(data){
          Toast("已登录，请勿重复登录")
        }else{
          this.$router.push({path:"/login"})
        }
      },
      outBnt(){ //退出
        this.tabListBool = false;
        localStorage.removeItem("userInfo"); //清楚登录信息
        this.$router.push({path:"/index"}); //去首页
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
@import "../../assets/css/me.css";
.Indextab{
  position: fixed;
  width: 100%;
  height: 0.49rem;
  bottom: 0;
  left: 0;
  background: #ffffff;
  border-top: 0.01rem solid #EEEEEE;
  display: flex;
}
.indexTabLi{
  flex: 1;
  text-align: center;
  padding-top:0.1rem ;
}
.indexTabImg{
  width: 0.16rem;
  height: 0.19rem;
  display:block;
  margin: 0 auto;
}
  .me_ul{
    width: 100%;
    background: #ffffff;
    display: flex;
    border-bottom: 0.01rem solid #EEEEEE;
    li{
      flex: 1;
      text-align: center;
      border-right: 0.01rem solid #EEEEEE;
      padding: 0.1rem 0;
    }
    li:last-child{
      border-right: 0;
    }
  }
</style>
