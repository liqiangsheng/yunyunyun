<template>
  <div id="userFeedback">
    <div class="userFeedback_box" v-show="myfollow==true">
      <ul class="userFeedback_ul">
        <li v-for="(item,index) in tabList" class="userFeedback_li" @click="tabClick(index)">
          <span class="userFeedback_span" :class="{active:tabListIndex==index}">{{item}}</span>
        </li>
        <div class="userFeedback_xian"></div>
      </ul>
       <div class="userFeedback_components">
         <CommonProblem v-if="tabListIndex==0" @sheetVisibleT="sheetVisibleT"></CommonProblem>
         <MyOpinion v-if="tabListIndex==1"></MyOpinion>
       </div>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Actionsheet } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  import { questionAndAnswerList } from '../../assets/js/promiseHttp';
  import CommonProblem from "./alter/commonProblem.vue"
  import MyOpinion from "./alter/myOpinion.vue"
export default {
  components:{
    CommonProblem,MyOpinion
  },
  name: 'userFeedback',
  data(){
    return{
      actions:[{name:"请下载不同Tech App提意见" },{name:"iOS",method:this.IOS },{name:"Android",method:this.Android }],//下载地址
      sheetVisible:false, //是否显示弹框
      tabList:["我的意见","常见问题"],//tab
      tabListIndex:0, //tab的下标
      myfollow:true, //数据请求成功显示
      userInfo:{}, //用户信息
      p:1,  //页
      s:20, //每页多少
      pageNum:"",//每页数据
      objList:[
        {bannerUrl:"https://pub.qinius.butongtech.com/defultphoto.png",name:"fanner Walker",address:"深圳 工业设计师",zuoping:"501",fensi:"2838",isguanzhun:false},
        {bannerUrl:"https://pub.qinius.butongtech.com/defultphoto.png",name:"fanner Walker",address:"深圳 工业设计师",zuoping:"501",fensi:"2838",isguanzhun:true},
      ], // 数据
    }
  },
  created() {

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo){
        if(this.objList.length>0){
          this.myfollow= true;

        }else{
          this.myfollow= false;
        }
    }else{
      this.myfollow= false;
    }
  } ,
  methods:{
    sheetVisibleT(v){
      this.sheetVisible = v;
    },
    tabClick(i){ //tab切换
      this.tabListIndex = i;
    },
    IOS(){
      location.href="https://itunes.apple.com/cn/app/id1439775835"
    },
    Android(){
      location.href="https://www.pgyer.com/designcloud"
    },
  },
}

</script>

<style scoped lang="less">
#userFeedback {
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  overflow: hidden;
  .userFeedback_box{
    width: 100%;
    overflow-y: auto;
    .userFeedback_ul{
      width: 100%;
      height: 0.4rem;
      display: flex;
      margin-top: 0.01rem;
      background: #ffffff;
      position: relative;
      li{
        flex: 1;
        text-align: center;
        line-height: 0.4rem;
        .userFeedback_span{
          height: 0.38rem;
          line-height: 0.38rem;
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          display: inline-block;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
        .userFeedback_span.active{
          color:rgba(5,5,9,1);
          border-bottom: 0.02rem solid rgba(5,5,9,1);;
        }
      }
      .userFeedback_xian{
        position: absolute;
        left: 49.9%;
        width: .01rem;
        height: 0.2rem;
        background: rgba(5,5,9,0.1);
        top: 0.1rem;
      }
    }
    .userFeedback_components{
      position: absolute;
      left: 0;
      top:0.41rem;
      right: 0;
      bottom: 0;
     overflow: hidden;
    }
  }
}
</style>
