<template>
  <div id="Me">
    <div class="userinfo" @click="loginBnt">
      <img class='bgImge' :src='bgImge' @click="loginBnt"/>
      <div class="userinfo_box">
        <img class="userinfoImage" :src="userInfo.header"/>
        <span class="userinfo-nickname">{{userInfo.name}}</span>
      </div>
      <div class="userinfo_set" @click.stop="setClick">
         消息 <img src="/static/images/goBack.png" alt="">
      </div>
    </div>
    <ul class="me_ul" v-if="tabListBool">
      <li @click='myfollowBnt(1)'>
         <span>
             {{userInfo.care_count>10000?userInfo.care_count/10000+'万':userInfo.care_count}}
         </span><br>
        关注
      </li>
      <li @click='myfollowBnt(2)'>
         <span>
                {{userInfo.care_count>10000?userInfo.care_count/10000+'万':userInfo.care_count}}
         </span><br>
        粉丝
      </li>
      <li @click='myfollowBnt(3)'>
         <span>
                {{userInfo.laud_count>10000?userInfo.laud_count/10000+'万':userInfo.laud_count}}
         </span><br>
        点赞
      </li>
      <li @click='myfollowBnt(4)'>
         <span>
                {{userInfo.favorite_count>10000?userInfo.favorite_count/10000+'万':userInfo.favorite_count}}
         </span><br>
        收藏
      </li>
      <li @click='myfollowBnt(5)'>
         <span>
                {{userInfo.comment_count>10000?userInfo.comment_count/10000+'万':userInfo.comment_count}}
         </span><br>
        评论
      </li>
    </ul>
    <ul class="Me_tab">
      <li v-for="(item,index) in meTab" @click="Me_tabClick(index)">
        <span :class="[{active:meTabIndex==index},'span'+index]">{{item}}</span>
      </li>
    </ul>
    <!--,//原创 草稿组件-->
    <div class="Me_draft">
      <Original v-if="meTabIndex==0"></Original>
      <Draft v-if="meTabIndex==1"></Draft>
    </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarArr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
        {{item.name}}
      </li>
    </ul>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
   import { IntallData,companyInfofindCompanyInfoById } from '../../assets/js/promiseHttp';
   import Original from "./alter/original.vue"  //原创
   import Draft from "./alter/draft.vue"  //草稿
export default {
  components: {
    Original,Draft
  },
  name: 'me',
  data(){
      return{
        meTab:["原创","草稿"],//原创 草稿
        meTabIndex:0,//原创 草稿
        tabList:[{name:"关注",num:"2000"},{name:"粉丝",num:"1.5万"},{name:"点赞",num:"5000"},{name:"收藏",num:"100"},{name:"评论",num:"265"},],
        tabListBool:false, //显示
        bgImge:"./static/images/bg.png",
        userInfo: {
        header:"./static/images/defultphoto.png",
        name: "请登录",
        },
        tabbarArr:[  //、、tab
          {name:"首页",icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
          {name:"资讯",icon:"./static/images/资讯2.png",icon1:"./static/images/资讯1.png",path:"/homeIndex"},
          {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
          {name:"智慧活动",icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
          {name:"我的",icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
        ],
        tabbarAarrIndex:4,  //点击tab的下标
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的";
    })
       if(JSON.parse(window.localStorage.getItem("userInfo"))){    //获取本地存储信息
         this.tabListBool = true;
        let data = JSON.parse(window.localStorage.getItem("userInfo"))
         console.log(data)
         if(data.data.userType=='2'){
           IntallData(data).then(res=>{

             if(res.data.status ==true){
               this.bgImge=res.data.data.owner_url;
               this.userInfo.header= res.data.data.owner_url?res.data.data.owner_url:"./static/images/defultphoto.png";
               this.userInfo.name= res.data.data.name;
               this.userInfo.care_count = res.data.data.care_count ?res.data.data.care_count:0 ;
               this.userInfo.cared_count = res.data.data.cared_count?res.data.data.cared_count:0 ;
               this.userInfo.comment_count = res.data.data.comment_count?res.data.data.comment_count:0 ;
               this.userInfo.favorite_count = res.data.data.favorite_count?res.data.data.favorite_count:0 ;
               this.userInfo.laud_count = res.data.data.laud_count?res.data.data.laud_count:0 ;
             }else{
               Toast("网络异常，请重试")
             }
           })
         }else{
           companyInfofindCompanyInfoById(data).then(res=>{
             if(res.data.status ==true){
               this.bgImge=res.data.data.owner_url;
               this.userInfo.header= res.data.data.owner_url?res.data.data.owner_url:"./static/images/defultphoto.png";
               this.userInfo.name= res.data.data.name;
               this.userInfo.care_count = res.data.data.care_count ?res.data.data.care_count:0 ;
               this.userInfo.cared_count = res.data.data.cared_count?res.data.data.cared_count:0 ;
               this.userInfo.comment_count = res.data.data.comment_count?res.data.data.comment_count:0 ;
               this.userInfo.favorite_count = res.data.data.favorite_count?res.data.data.favorite_count:0 ;
               this.userInfo.laud_count = res.data.data.laud_count?res.data.data.laud_count:0 ;
             }else{
               Toast("网络异常，请重试")
             }
           })
         }

       }else{
             this.tabListBool = false;
             this.bgImge="./static/images/bg.png";
                this.userInfo.header= "./static/images/defultphoto.png";
                this.userInfo.name= "请登录";
       }
  },

  methods:{
    Me_tabClick(i){//原创 草稿
      this.meTabIndex= i;
    },
    setClick(){//个人设置
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
        this.$router.push({path:"/personalSettings"})
      }else{
        Toast("您未登录，请登录！")
      }
    },
    myfollowBnt(v){ //我的关注 粉丝 点赞 收藏 评论
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
          if(v == 1){
            this.$router.push({path:"/myfollow"})
          }else if(v == 2){
            this.$router.push({path:"/fans"})
          }else if(v == 3){
            this.$router.push({path:"/myFabulous"})
          }else if(v == 4){
            this.$router.push({path:"/myCollection"})
          }else if(v == 5){
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
//          Toast("已登录，请勿重复登录")
          this.$router.push({path:"/editingInformation"})
        }else{
          this.$router.push({path:"/login"})
        }
      },

  }
}

</script>

<style scoped lang="less">
  #Me{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: #eeeeee;
    box-sizing: border-box;
    overflow-y:auto;
    overflow-x: hidden;
  }

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
    .userinfo_box{
      width: 100%;
      position: absolute;
      left: 0;
      top: 0.35rem;
      .userinfoImage{
        width: 0.65rem;
        height:  0.65rem;
        border-radius: 100%;
        margin: 0 auto;
      }
      .userinfo-nickname{
        display: block;
        width: 100%;
        text-align: center;
        height:.16rem;
        font-size:.17rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        margin-top: 0.15rem;
      }
    }


    .userinfo_set{
      width:0.8rem;
      height: 0.32rem;
      background:rgba(0,0,0,0.2);
      border-radius:0.16rem;
      position: absolute;
      right: -0.15rem;
      top: 0.48rem;
      padding-left: 0.1rem;
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
  padding-top:0.05rem ;
}
.indexTabImg{
  width: 0.16rem;
  height: 0.19rem;
  display:block;
  margin: 0 auto;
}
  .indexTabImg.active{
    width: 0.32rem;
    height: 0.32rem;
  }
  .me_ul{
    width: 100%;
    background:rgba(255,255,255,0.3);
    display: flex;
    border-bottom: 0.01rem solid #EEEEEE;
    li{
      flex: 1;
      text-align: center;
      padding: 0.1rem 0;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      font-size:0.12rem;
      span{
        font-size:0.15rem;
        color:rgba(5,5,9,1);
      }
    }

  }
  .Me_tab{
    width: 100%;
    background: #ffffff;
    height: 0.4rem;
    display: flex;
    li{
      flex: 1;

      span{
        display: inline-block;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        height: 0.38rem;
        line-height: 0.38rem;
      }
      span.active{
        color:rgba(5,5,9,1);
        border-bottom: 0.02rem solid #000000;
      }
      .span0{
        float: right;
        margin-right: 0.2rem;
      }
      .span1{
        margin-left: 0.2rem;
      }
    }
  }
  .Me_draft{
    width: 100%;
    position: absolute;
    left: 0;
    top: 2.68rem;
    bottom: 0.5rem;
    right: 0;
    overflow: hidden;
  }
</style>
