<template>
  <div id="messageNotification">
    <div class="messageNotification_falseBox" v-show="myfollow==false">
      <img src="/static/images/缺省图.png" alt="">
      你的消息区目前空空也～
    </div>
    <div class="messageNotification_box" v-show="myfollow==true">

      <ul class="messageNotification_ul" v-show="objList.length>0">
        <li v-for="(item,index) in objList" @click="activityClick(item)">
             <div class="messageNotification_img">
               <img src="/static/images/审核.png" alt="" v-if="item.state=='1'">
               <img src="/static/images/系统.png" alt="" v-else-if="item.state=='2'">
               <img src="/static/images/活动.png" alt="" v-else>
             </div>
            <div class="messageNotification_right">
              <h5 v-if="item.state=='1'">审核通知 <span>{{item.time|formatTime1}}</span></h5>
              <h5 v-if="item.state=='2'">活动通知 <span>{{item.time|formatTime1}}</span></h5>
              <h5 v-if="item.state=='3'">审核通知 <span>{{item.time|formatTime1}}</span></h5>
              <p>{{item.value}}</p>
            </div>
        </li>
      </ul>

      <div class="messageFoot" @click="updataMore" v-if="objList.length>0&&myfollow==true">
        {{message}}
      </div>
      <ActivityDetailAlter v-if="activetyShow" @isActivetyShow="isActivetyShow"></ActivityDetailAlter>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { customerCareNoteListCare } from '../../assets/js/promiseHttp';
  import ActivityDetailAlter from "./alter/activityDetailAlter.vue"
export default {
  name: 'messageNotification',
  components:{
    ActivityDetailAlter
  },
  data(){
    return{
      activetyShow:false, //活动显示
      myfollow:true, //数据请求成功显示
      userInfo:{}, //用户信息
      p:1,  //页
      s:20, //每页多少
      message:"不同努力加载中...", //触底提示
      pageNum:"",//每页数据
      objList:[
        {time:1541851441523,value:"你的分享没有成功，请修改后再次尝试。原因：存在敏感内容",state:'1'},
        {time:1541819441523,value:"你的账号在另外一个设备上同时登录，登录异常！请你及时进行修改密码。",state:'2'},
        {time:1541014411523,value:"深圳市工业设计大展将于11月5日至7日在深圳会展中心召开，届时各界大咖云集，与你共商设计深圳市工业...",state:'3'},
        {time:1541014411523,value:"深圳市工业设计大展将于11月5日至7日在深圳会展中心召开，届时各界大咖云集，与你共商设计深圳市工业...",state:'3'},
        {time:154101441523,value:"深圳市工业设计大展将于11月5日至7日在深圳会展中心召开，届时各界大咖云集，与你共商设计深圳市工业...",state:'3'},
        {time:1541014141523,value:"深圳市工业设计大展将于11月5日至7日在深圳会展中心召开，届时各界大咖云集，与你共商设计深圳市工业...",state:'3'},
        {time:1531854141523,value:"修改密码请手机验证。",state:'3'},
        {time:1541874141523,value:"恭喜你，注册已通过！",state:'2'},
        {time:1541851441523,value:"你的分享没有成功，请修改后再次尝试。原因：存在敏感内容",state:'1'},
      ], // 数据
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "通知";
    })
    this.userInfo = {data:{id:this.$router.history.current.query.id,access_token:this.$router.history.current.query.token}}
    if(this.userInfo){
      if(this.objList.length>0){
        this.myfollow= true;
      }else{
        this.myfollow= false;
      }
    }else{
      this.myfollow= false;
    }
  },
  methods:{
    isActivetyShow(v){ //关闭活动按钮
      this.activetyShow =v;
    },
    activityClick(item){ //点击的是活动
      if(item.state=='2'){
        this.activetyShow = !this.activetyShow;
      }
    },
    updataMore(){ //加载更多 分页
//      this.p++;
//      if(this.p>this.pageNum){
//        this.message = "这是我的底线..."
//        Toast("这是最后一页啦！")
//      }else if(this.p==this.pageNum){
//        this.message = "这是我的底线..."
//        customerCareNoteListCare(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//          if(res.status == true){
//            this.objList = this.objList.concat(res.data);
//          }else{
//            Toast("网络出错啦，请重试")
//          }
//        })
//      }else if(this.p<this.pageNum){
//        this.message = "点击加载更多..."
//        customerCareNoteListCare(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//          if(res.status == true){
//            this.objList =  this.objList.concat(res.data);
//          }else{
//            Toast("网络出错啦，请重试")
//          }
//        })
//      }
    },
  },
}

</script>

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
