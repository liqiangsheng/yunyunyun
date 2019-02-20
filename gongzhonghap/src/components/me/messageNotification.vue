<template>
  <div id="messageNotification">
    <div class="messageNotification_falseBox" v-if="objList.length<=0">
      <img src="/static/images/queshengtu.png" alt="">
      你的消息区目前空空也～
    </div>
    <div class="messageNotification_box" v-else>

      <ul class="messageNotification_ul">
        <li v-for="(item,index) in objList" @click="activityClick(item)">
          <!--<mt-cell-swipe :right="[{content: '删除',style: { background: 'red', color: '#fff',width:'100%'},handler:()=>handler(item)}]">-->
             <div class="messageNotification_img">
               <img src="../../assets/images/xitong.png" alt="" v-if="item.notifyType=='1'">
               <img src="../../assets/images/shenhe.png" alt="" v-if="item.notifyType=='2'">
               <img src="../../assets/images/huodong.png" alt="" v-if="item.notifyType=='3'">
               <img src="../../assets/images/xialian.png" alt=""  v-if="item.notifyType=='4'">
             </div>
            <div class="messageNotification_right">
              <h5 v-if="item.notifyType=='1'">{{item.title}} <span>{{item.notifyTime|formatTime}}</span></h5>
              <h5 v-if="item.notifyType=='2'">{{item.title}}  <span>{{item.notifyTime|formatTime}}</span></h5>
              <h5 v-if="item.notifyType=='3'">{{item.title}} <span>{{item.notifyTime|formatTime}}</span></h5>
              <h5 v-if="item.notifyType=='4'">{{item.title}} <span>{{item.notifyTime|formatTime}}</span></h5>
              <p>{{item.content}}</p>
            </div>
          <!--</mt-cell-swipe>-->
        </li>
      </ul>

      <div class="messageFoot" @click="updataMore">
        {{message}}
      </div>
      <ActivityDetailAlter v-if="activetyShow" @isActivetyShow="isActivetyShow" :childrenValue="childrenValue" :userInfo="userInfo"></ActivityDetailAlter>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast } from 'mint-ui';  //弹框
  import { CellSwipe } from 'mint-ui';
  Vue.component(CellSwipe.name, CellSwipe);
  import { notificationList,notificationRemove } from '../../assets/js/promiseHttp';
  import ActivityDetailAlter from "./alter/activityDetailAlter.vue"
export default {
  name: 'messageNotification',
  components:{
    ActivityDetailAlter
  },
  data(){
    return{
      childrenValue:{},//传给子组件的值
      activetyShow:false, //活动显示
      myfollow:true, //数据请求成功显示
      userInfo:{}, //用户信息
      p:1,  //页
      s:20, //每页多少
      message:"不同努力加载中...", //触底提示
      pageNum:"",//每页数据
      objList:[], // 数据
    }
  },
  created() {

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo){
     this.query();
    }else{
      this.myfollow= false;
    }

  },
  methods:{
    query(){ //初始化数据
      notificationList(this.p,this.s,this.userInfo.data.access_token).then(res=>{
        this.pageNum = Math.ceil(res.toatl/this.s);
        if(this.pageNum>1){
          this.message = "点击加载更多..."
        }else{
          this.message = "这是我的底线..."
        }
        if(res.status == true){
          if(res.data.length>0){
            this.myfollow= true;
          }else{
            this.myfollow= false;
          }
          this.objList =  res.data;
        }else{
          this.myfollow= false;
          Toast("网络出错啦，请重试")
        }
      })
    },
    handler(v){ //删除
      notificationRemove(v.id,this.userInfo.data.access_token).then(res=>{
        if(res.status==true){
            Toast("删除成功");
           this.query();
        }else {
          Toast("网络出错啦，请重试")
        }
      })
    },
    isActivetyShow(v){ //关闭活动按钮
      this.activetyShow =v;
    },
    activityClick(item){ //点击的是活动
//      if(item.state=='3'){
        this.childrenValue= item;
        this.activetyShow = !this.activetyShow;
//      }
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        notificationList(this.p,this.s,this.userInfo.data.access_token).then(res=>{
          if(res.status == true){
            this.message = "这是我的底线..."
            this.objList = this.objList.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        notificationList(this.p,this.s,this.userInfo.data.access_token).then(res=>{
          if(res.status == true){
            this.message = "点击加载更多..."
            this.objList =  this.objList.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
    },
  },
}

</script>
<style>
  .mint-cell-swipe{
    border: 0;
  }
  .mint-cell-swipe .mint-cell-wrapper{
    /*background: red;*/
    display: block;
    border: 0;
    padding-top: 0.05rem;
  }
  .mint-cell-swipe .mint-cell-wrapper .mint-cell-value{
    border: none;
  }
</style>
<style scoped lang="less">

#messageNotification {
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  overflow: hidden;
  .messageNotification_falseBox{
    width: 100%;
    margin-top: 1rem;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    text-align: center;
    img{
      display: block;
      height: 0.66rem;
      width: 0.75rem;
      margin: 0 auto;
      margin-bottom: 0.2rem;
    }
  }
  .messageNotification_box{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .messageNotification_ul{
      width: 100%;
      li{
        width: 100%;
        height: 0.95rem;
        border-top: 0.01rem solid #eeeeee;
        display: flex;
        background: #ffffff;
        padding: 0.17rem;
        box-sizing: border-box;
        .mint-cell-swipe{
          width: 100% !important;
          border: 0;
          .mint-cell-wrapper{
            .mint-cell-title{
              flex: none !important;
            }
          }

        }
        .messageNotification_img{
          width: 0.45rem;
          height: 0.45rem;
          margin-right: 0.05rem;
          img{
            display: block;
            width: 0.45rem;
            height: 0.45rem;
          }
        }
        .messageNotification_right{
          flex: 1;
          h5{
            width: 100%;
            font-size:0.14rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            line-height: 0.2rem;
            span{
              display: inline-block;
              float: right;
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
            }
          }
          p{
            width: 100%;
            font-size: 0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .messageFoot{
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      color: rgba(5,5,5,0.3);
      text-align: center;
      margin-top: 0.2rem;
    }
  }
}
</style>
