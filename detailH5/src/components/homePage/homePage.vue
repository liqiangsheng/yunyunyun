<template>
  <v-touch id="homePage" v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
    <div class="homePageHeader">
      <img :src="objData.logoUrl?objData.logoUrl:objData.logoUrl1" alt="" class="backgroundImg" v-if="Request.state==1">
      <img :src="objData.ownerUrl?objData.ownerUrl:objData.ownerUrl1" alt="" class="backgroundImg" v-if="Request.state==2">
      <div class="homePageHeaderItem">
        <div class="homePageHeaderItemImg">
          <img :src="objData.logoUrl?objData.logoUrl:objData.logoUrl1" alt="" v-if="Request.state==1">
          <img :src="objData.ownerUrl?objData.ownerUrl:objData.ownerUrl1" alt="" v-if="Request.state==2">
        </div>
        <div class="homePageHeaderItemBox">
          <h5 class="headerName">{{objData.name}}<img src="/static/images/bigV.png" alt="" v-if="Request.state==2"><img src="/static/images/bigV2.png" alt=""  v-else></h5>
          <div class="headerSkill">
            <span> {{objData.engName}}</span>
          </div>
          <ul class="headerUl">
            <li><span class="headerG">关注</span><span>{{objData.careCount}}</span></li>
            <li><span class="headerG">粉丝</span><span>{{objData.caredCount}}</span></li>
            <li><span class="headerG">赞</span><span>{{objData.laudedCount}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!---->
    <div class="positionImg" v-if="Request.state==2">
        <div class="positionImgItem">影响力指数：</div>
        <div class="positionGradient">
           <div class="rgbaGradient" :style="rgbaStyle">
             <span class="rgbaGradientB" :style="numBStyle">{{numB}}</span>
           </div>
        </div>
      <div class="positionImgItem1">无敌</div>

    </div>
<!---->
    <ul class="homePageIndex">
      <li v-for="(item,index) in homePageArray" @click="listClick(index)"><span :class="{active:homePageIndex==index}">{{item}}</span></li>
    </ul>
    <div class="homePageComponents">
      <HomePageA v-if="homePageIndex == 0" :displayState="Request.state" :requestA="Request.source" :objData="objData"></HomePageA>
      <HomePageB v-if="homePageIndex == 1" :displayState="Request.state" :requestA="Request.source" :objData="objData"></HomePageB>
    </div>
  </v-touch>
</template>

<script>
  import {Rgba} from "../../assets/js/Fun"  //导航栏url截取
  import HomePageA from "./homePageA.vue"  //主页
  import HomePageB from "./homePageB.vue"  //简介
  import { Toast } from 'mint-ui';  //弹框
  import { companyInfoFindOne,commonUserFindOne,findInformationListByUserIdUserId } from '../../assets/js/promiseHttp'; //数据
export default {
  name: 'homePage',
    components:{
      HomePageA,HomePageB
    },

  data(){
    return{
        homePageIndex:0, //下标选中
         homePageArray:["主页","简介"],//列表
        backgroundImg:'./static/images/3.png',
        title:{name:"Marc Newson",skill:"GK设计集团公司总裁兼首席执行官",guanzhu:"548",fenshi:"2084",zan:"8993"},
        rgbaNum:92,  //进度条
        rgbaStyle:{background:"linear-gradient(83deg,rgba(16,173,255,1),rgba(255,10,127,1)",width:"100%"}, //进度条渐变
        numB:"100%" ,// 进度条
        numBStyle:{color:"red"} ,// 进度条
          objData:{},
        page:1,  //页码
      Request:{},
    }
  },
  methods:{
    swiperleft(){
      this.homePageIndex = 1;
      this.$store.dispatch("homePageIndex",this.homePageIndex);//vueX保存下标
    },
    swiperright(){
      this.homePageIndex = 0;
      this.$store.dispatch("homePageIndex",this.homePageIndex);//vueX保存下标
    },
    listClick(i){ //列表点击
      this.homePageIndex = i;
      this.$store.dispatch("homePageIndex",this.homePageIndex);//vueX保存下标
    }
  },
  created(){
//    console.log( this.$store.state.homePageIndex)
//    console.log(this.$router.history.current.query)
    if(this.$router.history.current.query){
      this.Request = this.$router.history.current.query;
      sessionStorage.setItem("homePageObj",JSON.stringify(this.$router.history.current.query))
      if(this.$router.history.current.query.state == "1"){//企业
        companyInfoFindOne(this.$router.history.current.query.id).then(res=>{
//          console.log(res,"djalsdl;")
          if(res.status == true){
            res.data.honordItems =res.data.honordItems.split(",");
            res.data.majorScope =res.data.majorScope.split(",").join("/");
            res.data.companyExtendType1= [];
            res.data.companyExtendType2= [];
            res.data.companyExtendItemsList.forEach((item,index)=>{
              if(item.companyExtendType == "1"){
                res.data.companyExtendType1.push(item)
              }else if(item.companyExtendType == "2"){
                res.data.companyExtendType2.push(item)
              }
            })
            res.data.logoUrl1 = "./static/images/defultphoto.png";
            this.objData = res.data;
            this.homePageIndex = this.$store.state.homePageIndex;// vueX拿数据
          }else{
            Toast("网络出错了，请重试")
          }
        })

      }else{
        commonUserFindOne(this.$router.history.current.query.id).then(res=>{ //个人
          if(res.status==true){
            console.log(res.data,"daskfka")
            let num = res.data.designerUser.powerIndex*10 / 100;
            this.rgbaNum = res.data.designerUser.powerIndex*10;
            this.numB = this.rgbaNum+"%";
            let arrRgba = Rgba(num);
            this.rgbaStyle = {background:"linear-gradient(83deg,rgba(16,173,255,1),rgba("+arrRgba[0]+","+arrRgba[1]+","+arrRgba[2]+"1)",width:this.numB};
            this.numBStyle = {color:"rgba("+arrRgba[0]+","+arrRgba[1]+","+arrRgba[2]+"1)"};
            res.data.engName = res.data.designerUser.title;
            res.data.designerUser.honordItems = res.data.designerUser.honordItems.split(",")
            res.data.careCount = res.data.careCount?res.data.careCount:0;
            res.data.caredCount = res.data.caredCount?res.data.caredCount:0;
            res.data.laudedCount = res.data.laudedCount?res.data.laudedCount:0;
            res.data.ownerUrl1 = "./static/images/defultphoto.png";
            this.objData = res.data;
            this.homePageIndex = this.$store.state.homePageIndex;// vueX拿数据
          }else{
            Toast("网络出错了，请重试")
          }
        })
      }
    }else {
      this.$router.go(-1)
    }
  }
}

</script>

<style>
  @import "../../assets/css/homePage/homePage.css";
</style>
