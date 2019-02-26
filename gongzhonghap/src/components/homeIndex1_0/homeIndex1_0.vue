<template>
  <!--首页-->
  <div id="homeIndex1_0">
    <ul class="homeIndex1_ul">
      <li v-for="(item,index) in headerTab" @click="tabClick(index)">
        <div class="homeIndex1_ul_li_div" :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">
          <span>{{item.Chinese}}</span>
          <p>{{item.English}}</p>
        </div>
      </li>
    </ul>
    <div class="homeIndex1_0_components">
      <div class="absolute" :style="displayBlock1">
        <img src="../../assets/images/loding.gif" alt="">
        <p>加载中...</p>
      </div>
        <Find  @displayBlock="displayBlock" ref="child"></Find>
           <div @click="refresh" class="refresh">
             刷新
           </div>
    </div>
<!--绑定弹框-->
    <div class="bangding" v-if="bangdingShow">
      <setPassword @isshow="isshow" :wechatUserInfo="wechatUserInfo"></setPassword>
    </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
      </li>
    </ul>
  </div>
</template>

<script>
  import Find from './alter/find2.vue';
  import Follow from './alter/follow.vue';
  import setPassword from './alter/setPassword.vue';
import { Toast } from 'mint-ui';  //弹框
import { Indicator } from 'mint-ui';
import {customerPubContentListHomePage,wxOpenOpenInfo,sysUserOperationVerifyBindStatus} from "../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
    components:{
      Find,Follow,setPassword
    },
    data(){
      return{
        displayBlock1:{display:"block"},
        imgsArr:[],
        headerTab:[{Chinese:"发现",English:"Find"},{Chinese:"关注",English:"Aattention"}], //tab
        headerTabIndex:0,//是关注还是发现
        tabbarAarr:[  //、、tab
          {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
          {icon:"./static/images/zixun2.png",icon1:"./static/images/zixun1.png",path:"/homeIndex"},
          {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
          {icon:"./static/images/zhihuihuodong2.png",icon1:"./static/images/zhihuihuodong1.png",path:"/index"},
          {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
        ],
        tabbarAarrIndex:0,  //点击tab的下标
        p:1,  //页
        s:10, //每页多少
        message:"", //触底提示
        pages:0,//每页数据
        imgsArr:[], //数据
        userInfo:"", //用户信息
        pullDownDistance:0,//下拉的距离
        gap : 10, //10px的像素差距
        flag:false, //距离底部距离小于50
        wechatUserInfo:{},//微信登陆的信息
        bangdingShow:false,//微信绑定手机号码显示
      }
    },
    created() {
      let  data = JSON.parse(localStorage.getItem('userInfo'));
      if(!data){
         if(!!this.$Request.code){ //是不是微信登陆
           wxOpenOpenInfo(this.$Request.code).then(res=>{
//             console.log(res,'code')
             if(res.data.status==true){

               sysUserOperationVerifyBindStatus(res.data.data.openid).then(res1=>{
//                 console.log(res1,"openidres1")
                 if(res1.data.status==true){
                      if(!res1.data.data||res1.data.data ==0){ //未绑定
                        let wetachUserInfo = JSON.parse(localStorage.getItem('wetachUserInfo'));
                        if(!wetachUserInfo){
                          this.wechatUserInfo = res.data.data
                          localStorage.setItem('wetachUserInfo',JSON.stringify(res.data.data));
                          this.bangdingShow = true;
                        }else{
                          if(res.data.data.openid == wetachUserInfo.openid){
                            this.bangdingShow = false;
                            Toast("您的微信已经绑定，请勿重复绑定,即将为你跳到登陆页面")
                             setTimeout(()=>{
                               this.$router.push({path:"/login"})
                             },1000)
                          }else {
                            this.wechatUserInfo = res.data.data
                            localStorage.setItem('wetachUserInfo',JSON.stringify(res.data.data));
                            this.bangdingShow = true;
                          }
                        }
                      }else{ //已绑定
                         this.$router.push({path:"/login"})
                      }
                 }else{
                   if(res1.data.code == 200){ //绑定了其他账号
                     Toast('你的微信已绑定['+Object.keys(res1.data.data)[0]+']')
                   }else{
                     Toast("查看绑定出错了，请重试")
                   }
                 }
               })
             }else{
               Toast("微信登陆出错了，请重试")
             }
           })
         }
      }
    },
    methods:{
      isshow(v){
        this.bangdingShow = v;
      },
      refresh(){//父组件调子组件的方法
//        this.$refs.child.query(1,10);
        this.$refs.child.p = 1;
        this.$refs.child.$el.scrollTop = 0;
        this.$store.dispatch("FollowScrollTop",0)
        this.$refs.child.query(this.$refs.child.p,this.$refs.child.s);
      },
      displayBlock(v){
        this.displayBlock1 = {display:v}
      },
      tabarClick(i){  //tabar点击事件
        this.$router.push({path:this.tabbarAarr[i].path});

      },
      tabClick(i){//头部切换
//        this.headerTabIndex =i;
        if(i==1){
          this.$router.push({path:"/follow"})
        }
      },

    },
    mouthed(){

    }
  }

</script>

<style scoped lang="less">
  #homeIndex1_0 {
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    background: #eeeeee;
    overflow: hidden;
    .homeIndex1_ul{
      width: 100%;
      display: flex;
      background: #ffffff;
      position: relative;
      li{
        flex: 1;
        height: 0.52rem;
        font-family:PingFangSC-Light;
        font-weight:100;
        color: #666666;;
        border-bottom: 0.01rem solid #e6e6e6;
        .homeIndex1_ul_li_div{
          width:0.7rem ;
          height: 0.46rem;
          text-align: center;
          span{
            display: inline-block;
            line-height: 0.24rem;
            margin-top: 0.04rem;
            font-size: 0.14rem;
          }
          p{
            line-height: 0.12rem;
            color:rgba(102,102,102,1);
            font-weight:100;
            font-size: 0.1rem;
          }
        }
        .homeIndex1_ul_li_div.active{
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:600;
          color:rgba(5,5,9,1);
          border-bottom:0.02rem solid rgba(5,5,9,1);
          p{
            color:rgba(102,102,102,1);
            font-weight:100;
            font-size: 0.1rem;
          }
        }
        .homeIndex1_span0{
          display: block;
          float: right;
          margin-right:0.1rem ;
        }
        .homeIndex1_span1{
          display: block;
          float: left;
          margin-left:0.1rem ;
        }
      }

    }
    .bangding{
      width: 100%;
      position: absolute;
      left: 0;
      top:0.52rem;
      bottom:0.55rem;
      right: 0;
      overflow: hidden;
      background: rgba(5,5,9,0.3);
      z-index: 2;
    }
    .homeIndex1_0_components{
      width: 100%;
      position: absolute;
      left: 0;
      top:0.52rem;
      bottom:0.55rem;
      right: 0;
      overflow: hidden;
      .refresh{
        position: fixed;
        z-index: 1;
        bottom: 0.6rem;
        right: 0.05rem;
        background: rgba(5,5,9,0.3);
        color: #ffffff;
        font-size: 0.1rem;
        font-weight: 100;
        width: 0.4rem;
        height: 0.4rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        text-align: center;
        line-height: 0.4rem;
        box-sizing: border-box;
      }

      .absolute{
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #EEEEEE;
        position: absolute;
        left: 0;
        bottom: 0;
        img{
          display: block;
          width: 0.66rem;
          height: 0.66rem;
          margin: auto;
          margin-top: 1rem;
        }
        p{
          margin-top: 0.2rem;
          font-size: 0.14rem;
          color: #c5c5c6;
          width: 100%;
          text-align: center;
        }
      }
    }
    .Indextab{
      position: absolute;
      width: 100%;
      height: 0.55rem;
      bottom: 0;
      left: 0;
      background: #ffffff;
      border-top: 0.01rem solid #EEEEEE;
      display: flex;
      .indexTabLi{
        flex: 1;
        text-align: center;
        padding-top:0.13rem ;
        box-sizing: border-box;
        .indexTabImg{
          width:  24px;
          height:  24px;
          display:block;
          margin: 0 auto;
        }
        .indexTabImg.active{
          width: 0.3rem;
          transform: translateY(-0.05rem);
          height: 0.3rem;
        }
      }
    }
  }
</style>
