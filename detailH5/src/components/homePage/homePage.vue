<template>
  <div id="homePage">
      <div class="homePageHeader">
         <img :src="backgroundImg" alt="" class="backgroundImg">
          <div class="homePageHeaderItem">
              <div class="homePageHeaderItemImg">
                <img src="/static/images/defultphoto.png" alt="">
              </div>
              <div class="homePageHeaderItemBox">
                  <h5 class="headerName">{{title.name}}<img src="/static/images/bigV.png" alt="" v-if="this.$Request.state==2"><img src="/static/images/bigV2.png" alt=""  v-else></h5>
                  <div class="headerSkill">
                    <span> {{title.skill}}</span>
                  </div>
                  <ul class="headerUl">
                    <li><span class="headerG">关注</span><span>{{title.guanzhu}}</span></li>
                    <li><span class="headerG">粉丝</span><span>{{title.fenshi}}</span></li>
                    <li><span class="headerG">赞</span><span>{{title.zan}}</span></li>
                  </ul>
              </div>
          </div>
      </div>
    <!---->
    <div class="positionImg" v-if="this.$Request.state==2">
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
      <HomePageA v-if="homePageIndex == 0" :displayState="this.$Request.state" :requestA="this.$Request.source"></HomePageA>
      <HomePageB v-if="homePageIndex == 1" :displayState="this.$Request.state" :requestA="this.$Request.source"></HomePageB>
    </div>
  </div>
</template>

<script>
  import {Rgba} from "../../assets/js/Fun"  //导航栏url截取
  import HomePageA from "./homePageA.vue"  //主页
  import HomePageB from "./homePageB.vue"  //简介
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

    }
  },
  methods:{
    listClick(i){ //列表点击
      this.homePageIndex = i;
    }
  },
  created(){

    let num = this.rgbaNum / 100;
    this.numB = this.rgbaNum+"%";
    let arrRgba = Rgba(num);
    this.rgbaStyle = {background:"linear-gradient(83deg,rgba(16,173,255,1),rgba("+arrRgba[0]+","+arrRgba[1]+","+arrRgba[2]+"1)",width:this.numB};
    this.numBStyle = {color:"rgba("+arrRgba[0]+","+arrRgba[1]+","+arrRgba[2]+"1)"}
  }
}

</script>

<style>
  @import "../../assets/css/homePage/homePage.css";
</style>
