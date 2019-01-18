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
      <Find v-if="headerTabIndex==0"></Find>
      <Follow v-if="headerTabIndex==1" :userToken="token" :userId="id" :userType="userType"></Follow>
    </div>

  </div>
</template>

<script>
  import Find from './alter/find.vue';
  import Follow from './alter/follow.vue';
  import { Toast } from 'mint-ui';  //弹框
  import { Actionsheet } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  export default {
    name: 'find',
    components:{
      Find,Follow
    },
    data(){
      return{
        headerTab:[{Chinese:"发现",English:"Find"},{Chinese:"关注",English:"Aattention"}], //tab
        headerTabIndex:0,//是关注还是发现
        token:"",
        id:"",
        userType:"",
      }
    },
    watch:{
    },
    created() {
      this.token = this.$router.history.current.query.token
      this.id = this.$router.history.current.query.id
      this.userType = this.$router.history.current.query.userType
    },
    methods:{
      tabClick(i){//头部切换
        if(i==1){
          if(!this.token){
              Toast('你还未登录，请登录');
              setTimeout(()=>{
                if(window.__wxjs_environment === 'miniprogram'){
//                wx.miniProgram.switchTab({url: '../../pages/me/me'})   //跳回小程序需要显示的页面路劲
                  wx.miniProgram.navigateTo({url: '../../pages/login/login?type=homeIndex1_0'})   //跳回小程序需要显示的页面路劲
                }else{
                  Toast("请在微信浏览器里打开");
                }
              },500)

          }else {
            this.headerTabIndex =1;
          }

        }else {
          this.headerTabIndex =0;
        }
      }
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
        font-weight:300;
        color:rgba(102,102,102,1);
        border-bottom: 0.01rem solid #e6e6e6;
        .homeIndex1_ul_li_div{
          width:0.7rem ;
          height: 0.42rem;
          text-align: center;
          font-size: 0.14rem;
          span{
            display: inline-block;
            line-height: 0.24rem;
            margin-top: 0.04rem;
          }
          p{
            line-height: 0.12rem;
            color:rgba(102,102,102,1);
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
    .homeIndex1_0_components{
      position: absolute;
      left: 0;
      bottom: 0;
      top:0.52rem;
      right: 0;
      overflow: hidden;
    }
  }
</style>
