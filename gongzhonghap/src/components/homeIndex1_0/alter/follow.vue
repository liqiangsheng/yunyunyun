<template>
  <!--关注-->
  <div id="follow">
    <!--未登录-->
    <div class="follow_login_false" v-if="LoginShow==false">
      <img src="/static/images/未登录.png" alt="">
      <p @click="goLogin">你还没有登录，请点此“<b>登录</b>”获取关注内容</p>
    </div>
    <!--已登录-->
    <div class="follow_login_true" v-if="LoginShow==true">
      <ul class="homeIndex1_ul">
        <li v-for="(item,index) in headerTab" @click="tabClick(index)">
          <span :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">{{item}}</span>
        </li>
        <div class="homeIndex1_xian">/</div>
      </ul>
      <!--您关注的达人还未发布作品，为您推荐更多设计达人～-->
         <div class="follow_login_noFollow" v-if="followIsShow==true">
           <p class="follow_login_noFollow_p">您关注的达人还未发布作品，为您推荐更多设计达人～</p>
           <ul class="follow_login_noFollow_ul">
             <li class="follow_login_noFollow_li" v-for="(item,index) in Recommend">
                <div class="follow_login_noFollow_li1"><img :src="item.url" alt=""></div>
                 <div class="follow_login_noFollow_li2">{{item.name}}</div>
                 <div class="follow_login_noFollow_li3">
                   <div><img :src="item.type==false?'/static/images/未关注.png':'/static/images/已关注.png'" alt="">{{item.value}}</div>
                 </div>
             </li>
           </ul>
         </div>
      <!--您关注的达人发布了作品-->
        <div class="follow_login_Follow" v-else>
             <ul class="follow_login_Follow_ul" v-if="followIsShow==false&&listData.length>0">
               <li class="follow_login_Follow_li" v-for="(item,index) in listData">
                 <div class="follow_login_Follow_li1">
                   <img :src="item.authorInfo.ownerUrl" alt="">
                    <p>{{item.authorInfo.name}}</p>
                   <div v-if="!item.authorInfo.caredStatus" @click="follow(item)"><img src="/static/images/已关注.png" alt="">关注</div>
                   <div  v-else class="active" @click="cancelFollow(item)">取消关注</div>
                 </div>
                 <div class="follow_login_Follow_li2" ref="windwosWH">
                   <!--轮播-->
                   <div class="swiper-container">
                     <div class="swiper-wrapper">
                       <div class="swiper-slide" v-for="(item1,index1) in item.attachments">
                         <div class="imgIs">
                           <img :src="item1.url" >
                           <div class="biaoqian" v-for="(item2,index2) in item1.anchors" :style="{left:item2.axesxRate*imgW+'px',top:item2.axesyRate*imgW+'px'}">
                           <img src="/static/images/标签.png" alt=""><span>{{item2.title}}</span>
                           </div>
                         </div>
                       </div>
                     </div>
                     <!-- 如果需要分页器 -->
                     <div class="swiper-pagination"></div>
                   </div>
                   <!---->
                 </div>
                 <div class="follow_login_Follow_li3">
                   <p>{{item.message1}}</p>
                   <div v-show="item.content&&item.content.length>69" @click="openClick(item,index)">{{item.value}}</div>
                 </div>
                 <div class="follow_login_Follow_li4">
                   <div>
                     <img src="/static/images/关注阅读量.png" alt="">  {{item.readCount<10000?item.readCount:(item.readCount/10000).toFixed(2)+'万'}}
                   </div>
                   <div @click="laudedStatus(item)">
                     <img src="/static/images/点赞2.png" alt="" v-if="item.laudedStatus==true">
                     <img src="/static/images/点赞.png" alt="" v-else>
                     {{item.laudedCount<10000?item.laudedCount:(item.laudedCount/10000).toFixed(2)+'万'}}
                   </div>
                   <div @click="favoredStatus(item)">
                     <img src="/static/images/收藏2.png" alt="" v-if="item.favoredStatus==true">
                     <img src="/static/images/收藏1.png" alt="" v-else>
                     {{item.favoredCount<10000?item.favoredCount:(item.favoredCount/10000).toFixed(2)+'万'}}
                   </div>
                   <div>
                   <img src="/static/images/分享.png" alt="">1.25万
                   </div>

                 </div>
               </li>

             </ul>
          <div class="messageFoot" @click="updataMore">
            {{message}}
          </div>
        </div>
      <div class="lengthSmall" v-if="followIsShow==false&&listData.length<=0">
        <img src="/static/images/原创.png" alt="">
        <p>你关注的人还未发布作品哦~</p>
      </div>

    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Actionsheet } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  import {customerPubContentListWithCare,customerPubContentLaudContent,customerPubContentCancelLaudContent,customerPubContentFavorContent,customerPubContentCancelFavorContent,commonUserCareUser,companyInfoCareCompany,commonUserCancelCareUser,companyInfoCancelCareCompany} from '../../../assets/js/promiseHttp'; //数据

  export default {
  name: 'follow',
  data(){
    return{
      p:1, //第几页
      s:20,//每页多少
      pageNum:0, //总共多少页
      imgW:320,
      imgH:175,
      message:"不同正在努力加载中...",//
      headerTab:["发现","关注"], //tab
      headerTabIndex:1,//是关注还是发现
      userInfo:"", //用户信息
      LoginShow:false, //登录没登录
      followIsShow:false, //关注的人未发布作品
      listData:[],//数据
      Recommend:[
        {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
      ],//推荐 的数据
    }
  },
  created() {

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);

    if(this.userInfo){ //登录的情况  //
      this.LoginShow = true;
      customerPubContentListWithCare(this.p,this.s,this.userInfo.data.access_token).then(res=>{
        console.log(res,"关注")
        if(res.status == true){
            res.data.forEach((item,index)=>{
              item.messageShow = false;
              item.message1 = "";
              item.value = "展开";
              if(item.content.length>69){
                item.message1=item.content.substring(0,69)+"...";
                item.messageShow = true;
                item.value = "展开";
              }else{
                item.messageShow = false;
                item.message1 = item.content;
              }
            })
            this.pageNum = Math.ceil(res.total/this.s);
            console.log(this.pageNum)
            if(this.pageNum>1){
              this.message = '点击加载更多...';
            }else{
              this.message = '这是我的底线...';
            }
            this.listData = res.data
            this.$nextTick(()=>{
              this.imgW = this.$refs.windwosWH[0].offsetWidth;
              this.imgH = this.$refs.windwosWH[0].offsetHeight;
              //     滑动
              var mySwiper = new Swiper ('.swiper-container', {
                autoplay:false,
                loop:true,
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                },
              })
            })

        }else{
          Toast("网络出错了，请重试")
        }
      })
    }else{//没有登录的情况
      this.LoginShow = false;
    }

  },
  methods:{
    cancelFollow(v){ //取消关注
      v.favoredStatus = false;
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(!data){
        Toast("您还未登录，请登录！");
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }else{
        if(v.userType == "1"){ //企业
          companyInfoCancelCareCompany(v.authorInfo.id,data.data.id,v.userType).then(res=>{
            if(res.data.status==true){
              v.authorInfo.caredStatus = false;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else if(v.userType == "2"){  //个人
          commonUserCancelCareUser(v.authorInfo.id,data.data.id,v.userType).then(res=>{
            if(res.data.status==true){
              v.authorInfo.caredStatus = false;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
      }
    },
    follow(v){ //关注
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(!data){
        Toast("您还未登录，请登录！");
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }else{
        if(v.userType == "1"){ //企业
          companyInfoCareCompany(v.authorInfo.id,data.data.id,v.userType).then(res=>{
            if(res.data.status==true){
              v.authorInfo.caredStatus = true;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else if(v.userType == "2"){  //个人
          commonUserCareUser(v.authorInfo.id,data.data.id,v.userType).then(res=>{
            if(res.data.status==true){
              v.authorInfo.caredStatus = true;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
      }
    },
    laudedStatus(v){ // 点赞
      console.log(v)
      let data = JSON.parse(localStorage.getItem("userInfo"));
      console.log(data,"fdhsjkfks")
      if(data){
        v.laudedStatus = !v.laudedStatus
        if(v.laudedStatus == true){ //点赞
          customerPubContentLaudContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{
            console.log(res)
            if(res.status == true){
              v.laudedCount = v.laudedCount+1
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else { //取消点赞
          customerPubContentCancelLaudContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{
            if(res.status == true){
              v.laudedCount = v.laudedCount-1;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
      }else{
        Toast("您还未登陆，请登陆！")
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }

    },
    favoredStatus(v){ //收藏
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(data){
        v.favoredStatus = !v.favoredStatus
        if(v.favoredStatus == true){ //点赞
          customerPubContentFavorContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{

            if(res.status == true){
              v.favoredCount = v.favoredCount+1
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else { //取消点赞
          customerPubContentCancelFavorContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{
            if(res.status == true){
              v.favoredCount = v.favoredCount-1;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
      }else{
        Toast("您还未登陆，请登陆！")
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }
    },
    openClick(v,i){ //展开收起
      v.messageShow = !v.messageShow;
      if(v.messageShow==false){
        v.message1 = this.listData[i].content;
        v.value = "收起";
      }else{ //张开
        v.message1=v.content.substring(0,69)+"...";
        v.value = "展开";
      }
      this.listData[i] = v; //赋值给原来的小标值
      this.listData = this.listData.splice(0,this.listData.length); //更新素组
    },
    tabClick(i){//头部切换
      this.headerTabIndex =i;
      if(i==0){
        this.$router.push({path:"/homeIndex1_0"})
      }
    },
    goLogin(){//去登录
      this.$router.push({path:"/login"})
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        customerPubContentListWithCare(this.p,this.s,this.userInfo.data.access_token).then(res=>{
          if(res.status == true){
            res.data.forEach((item,index)=>{
              item.messageShow = false;
              item.message1 = "";
              item.value = "展开";
              if(item.content.length>69){
                item.message1=item.content.substring(0,69)+"...";
                item.messageShow = true;
                item.value = "展开";
              }else{
                item.messageShow = false;
                item.message1 = item.content;
              }
            })
            this.listData = this.listData.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        customerPubContentListWithCare(this.p,this.s,this.userInfo.data.access_token).then(res=>{
          if(res.status == true){
            res.data.forEach((item,index)=>{
              item.messageShow = false;
              item.message1 = "";
              item.value = "展开";
              if(item.content.length>69){
                item.message1=item.content.substring(0,69)+"...";
                item.messageShow = true;
                item.value = "展开";
              }else{
                item.messageShow = false;
                item.message1 = item.content;
              }
            })
            this.listData =  this.listData.concat(res.data);
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
#follow {
 position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  overflow: hidden;
  .follow_login_false{
    width: 100%;
    padding-top: 1rem;
    img{
      width:1.15rem;
      height: 1rem;
      display: block;
      margin: 0 auto;
    }
    p{
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:0.3rem;
      width: 100%;
      text-align: center;
      margin-top: 0.15rem;
      b{
        color: #050509;
      }
    }
  }
  .follow_login_true{
  /*position: relative;*/
    width: 100%;
    .homeIndex1_ul{
      width: 100%;
      display: flex;
      background: #ffffff;
      position: relative;
      li{
        flex: 1;
        height: 0.39rem;
        line-height: 0.39rem;
        font-size:0.12rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
        span.active{
          font-size:0.15rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(5,5,9,1);
        }
        .homeIndex1_span0{
          display: block;
          float: right;
          margin-right: 0.3rem;
        }
        .homeIndex1_span1{
          display: block;
          float: left;
          margin-left: 0.3rem;
        }
      }
      .homeIndex1_xian{
        position: absolute;
        left: 49.9%;
        top: 0.07rem;
        font-size:0.11rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .follow_login_Follow{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0.4rem;
      overflow-y: auto;
      .follow_login_Follow_ul{
        width: 100%;
        .follow_login_Follow_li{
          width: 100%;
          background: #ffffff;
          margin-bottom: 0.15rem;
          .follow_login_Follow_li1{
            width: 100%;
            height: 0.62rem;
            padding: 0.15rem;
            box-sizing: border-box;
            display: flex;
            img{
              display: block;
              width: 0.32rem;
              height: 0.32rem;
              border-radius: 50%;
              margin-right: 0.05rem;
            }
            p{
              width: 2.3rem;
              height: 0.32rem;
              font-size:0.13rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
              margin-left: 0.05rem;
              line-height: 0.32rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            >div{
              width: 0.8rem;
              height: 0.32rem;
              background:rgba(5,5,9,1);
              border-radius:0.05rem;
              line-height: 0.32rem;
              text-align: center;
              float: right;
              font-size:0.1rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
              img{
                display: inline-block;
                width: 0.1rem;
                height: 0.11rem;
                margin-right: 0.05rem;
              }
            }
            >div.active{
              background: #ffffff;
              border:0.01rem solid #EEEEEE;
              color: #666666;
            }
          }
          .follow_login_Follow_li2{
            width: 100%;
            margin-bottom: 0.1rem;
            >.swiper-container{
              width: 100%;
            }
            .swiper-slide{
              width: 100%;
              background: #fff;
              box-sizing: border-box;
              position: relative;

              .imgIs{
                width: 100%;
                position: relative;
                >img{
                  display: block;
                  width: 100%;
                }
                >.biaoqian{
                  position: absolute;
                  left: 0;
                  top:0;
                  height: 0.2rem;
                  img{
                    width: 0.24rem;
                    height: 0.27rem;
                    display: inline-block;
                    float: left;
                    margin: 0;
                  }
                  span{
                    display: inline-block;
                    float: left;
                    line-height: 0.2rem;
                    padding: 0 0.05rem;
                    background: rgba(5,5,9,0.4);
                    color: #ffffff;
                    border-radius: 0.2rem;
                    border: 0.01rem solid #ffffff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 0.1rem;
                  }
                }
              }

            }
          }
          .follow_login_Follow_li3{
           width: 100%;
            padding: 0 0.15rem;
            box-sizing: border-box;
            position: relative;
            >p{
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              line-height: 0.24rem;
              color:rgba(5,5,9,1);
              letter-spacing:0.02rem;
              word-wrap:break-word;
            }
            >div{
              position: absolute;
              right: 0.15rem;
              bottom: -0.16rem;
              width: 0.5rem;
              height: 0.24rem;
              text-align: center;
              line-height: 0.24rem;
              font-size:0.12rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:#21CB61;
            }
          }
          .follow_login_Follow_li4{
            width: 100%;
            display: flex;
            padding: 0.15rem;
            box-sizing: border-box;
            >div{
              flex: 1;
              font-size:0.14rem;
              font-family:PingFangSC-Semibold;
              font-weight:400;
              color:rgba(5,5,9,1);
              line-height: 0.18rem;
              img{
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                margin-right: 0.05rem;transform: translateY(0.02rem);

              }
            }
          }
        }
      }
    }
    .follow_login_noFollow{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0.4rem;
      overflow-y: auto;
      .follow_login_noFollow_p{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        padding: 0 0.15rem;
        box-sizing: border-box;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
      .follow_login_noFollow_ul{
        width: 100%;
        background: #ffffff;
        padding: 0 0.15rem;
        box-sizing: border-box;
        li{
          width: 100%;
          height: 0.65rem;
          padding: 0.15rem 0;
          display: flex;
          box-sizing: border-box;
          border-bottom: 0.01rem solid #eeeeee;
          .follow_login_noFollow_li1{
            width: 0.36rem;
            height: 0.36rem;
            img{
              display: block;
              width: 0.36rem;
              height: 0.36rem;
              border-radius: 50%;
            }
          }
          .follow_login_noFollow_li2{
            width: 2.3rem;
            height: 0.36rem;
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            margin-left: 0.05rem;
            line-height: 0.36rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .follow_login_noFollow_li3{
          flex: 1;
          height: 0.36rem;
          >div{
            width: 0.8rem;
            height: 0.36rem;
            background:rgba(5,5,9,1);
            border-radius:0.05rem;
            line-height: 0.36rem;
            text-align: center;
            float: right;
            font-size:0.1rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            img{
              display: inline-block;
              width: 0.1rem;
              height: 0.11rem;
              margin-right: 0.05rem;
            }
          }
        }
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
.lengthSmall{
  width: 100%;
  height: 100%;
  background: #F7F7F7;
  padding-top: 0.5rem;
  img{
    width: 1rem;
    height: 0.94rem;
    display: block;
    margin: 0 auto;
  }
  p{
    width: 100%;
    line-height: 0.5rem;
    margin-top: 0.2rem;
    text-align: center;
    color:rgba(153,153,153,1);
  }
}
</style>
