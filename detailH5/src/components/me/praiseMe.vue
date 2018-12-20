<template>
  <!--点赞我的-->
  <div id="praiseMe">
    <div class="praiseMe_box_false" v-if="objList.length<=0">
      <img src="/static/images/缺省图.png" alt="">
      <p>你的点赞区目前空空也～</p>
    </div>
    <ul class="praiseMe_box_true" v-else>
      <li v-for="(item,index) in objList">
        <div class="praiseMe_box_true_left">
          <img :src="item.userDp?item.userDp:'/static/images/defultphoto.png'" alt="">
        </div>
        <div class="praiseMe_box_true_right">
          <h5>{{item.laudName}}</h5>
          <p>{{item.laudtime|formatTime1}}</p>
          <div class="praiseMe_box_true_right_div">
            赞了这篇文章
          </div>
          <div class="praiseMe_box_true_right_box">
            <div class="praiseMe_box_true_right_box_top" v-if="item.typer!=0">
              <p v-if="item.typer==1"><b>@{{item.commentUserName}}</b> 回复：  <span>{{item.commentContent}}</span></p>
              <p v-if="item.typer==2"><b>@{{item.replyUserName}}</b> 回复： <span>{{item.replyContent}}</span></p>
            </div>
            <div class="praiseMe_box_true_right_box_bottom" @click="goDetail(item)">
              <div class="praiseMe_box_true_right_box_bottom_left">
                <img :src="item.bannerUrl" alt="">
              </div>
              <div class="praiseMe_box_true_right_box_bottom_right">
                {{item.infoTitle}}
              </div>
            </div>
          </div>
        </div>
      </li>
      <div class="messageFoot" @click="updataMore">
        {{message}}
      </div>
    </ul>
  </div>
</template>

<script>
  import {customerLaudNoteLaudForMeList} from '../../assets/js/promiseHttp'; //数据
  import { Toast } from 'mint-ui';  //弹框
  export default {
    name: 'praiseMe',
    data(){
      return{
        userInfo:{}, //用户信息
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:"",//每页数据
        totalAll:0, //一共多少位设计师关注
        objList:[], // 大咖说数据
      }
    },
    created() {
      this.$nextTick(function () {
        document.title = "点赞我的";
      })
      this.userInfo = {data:{id:this.$router.history.current.query.id,access_token:this.$router.history.current.query.token}}
      if(this.userInfo){
//        customerLaudNoteLaudForMeList("20181203103707dc00a09e48224f51bf733765edfa7633", this.userInfo.data.access_token,this.p,this.s).then(res=>{
      customerLaudNoteLaudForMeList(this.userInfo.data.id, this.userInfo.data.access_token,this.p,this.s).then(res=>{
          console.log(res)
          if(res.status==true){
            this.pageNum = Math.ceil(res.total/this.s);
            if(this.pageNum>1){
              this.message = '点击加载更多...';
            }else{
              this.message = '这是我的底线...';
            }
            this.objList = res.data;
          }else{
            Toast("网络出错啦！请重试")
          }
        })
      }else {
        Toast("您还未登录，请登录")
      }
    },
    methods:{
      goDetail(v){//去详情页
        if(v.type==1){ //去文章详情
          this.$router.push({path:"/homeDetail",query:{id:v.infoId}})
        }else{  //作品
          this.$router.push({path:"/findDetail",query:{id:v.infoId}})
        }
      },
      updataMore(){ //加载更多 分页
        this.p++;
        if(this.p>this.pageNum){
          this.message = "这是我的底线..."
          Toast("这是最后一页啦！")
        }else if(this.p==this.pageNum){
          this.message = "这是我的底线..."
        customerLaudNoteLaudForMeList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//          customerLaudNoteLaudForMeList("20181203103707dc00a09e48224f51bf733765edfa7633", this.userInfo.data.access_token,this.p,this.s).then(res=>{

            if(res.status == true){
              this.objList = this.objList.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){
          this.message = "点击加载更多..."
          customerLaudNoteLaudForMeList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//          customerLaudNoteLaudForMeList("20181203103707dc00a09e48224f51bf733765edfa7633", this.userInfo.data.access_token,this.p,this.s).then(res=>{

            if(res.status == true){
              this.objList =  this.objList.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }


      },
    }
  }

</script>

<style scoped lang="less">
  #praiseMe {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    .praiseMe_box_true{
      width: 100%;
      li{
        width: 100%;
        margin-top: 0.1rem;
        display: flex;
        background: #ffffff;
        padding: 0.1rem 0.15rem;
        box-sizing: border-box;
        .praiseMe_box_true_left{
          width: 0.6rem;
          height: 0.6rem;
          margin-right: 0.05rem;
          img{
            display: block;
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
          }
        }
        .praiseMe_box_true_right{;
          flex: 1;
          .praiseMe_box_true_right_div{
            font-size:0.13rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            line-height: 0.36rem;
          }
          h5{
            width: 100%;
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            line-height: 0.24rem;
          }
          p{
            font-size:0.1rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
          .praiseMe_box_true_right_box{
            width: 100%;
            background:rgba(244,244,244,1);
            border-radius:0.05rem;
            padding: 0.15rem 0.1rem;
            box-sizing: border-box;
            p{
              width: 100%;
              color: #999999;
              font-size:0.12rem;
              font-family:PingFangSC-Medium;
              font-weight:bold;
              b{
                color: black;
              }
              span{
                color: black;
              }
            }
          }
          .praiseMe_box_true_right_box_bottom{
            width: 100%;
            margin-top: 0.1rem;
            display: flex;
            height: 0.7rem;
            background: #ffffff;
            .praiseMe_box_true_right_box_bottom_left{
              width: 0.7rem;
              height: 0.7rem;
              img{
                display: block;
                width: 0.7rem;
                height: 0.7rem;
              }
            }
            .praiseMe_box_true_right_box_bottom_right{
              flex: 1;
              padding: 0.05rem;
              line-height: 0.3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    .praiseMe_box_false{
      width: 100%;
      padding-top: 1rem;
      img{
        display: block;
        width: 1rem;
        height: 0.94rem;
        margin: 0 auto;
      }
      p{
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.5rem;
        text-align: center;
        width: 100%;

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
</style>
