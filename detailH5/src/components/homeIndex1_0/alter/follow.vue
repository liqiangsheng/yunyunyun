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
      <!--<ul class="homeIndex1_ul">-->
        <!--<li v-for="(item,index) in headerTab" @click="tabClick(index)">-->
          <!--<div class="homeIndex1_ul_li_div" :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">-->
            <!--<b>{{item.Chinese}}</b>-->
            <!--<p>{{item.English}}</p>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--您关注的达人还未发布作品，为您推荐更多设计达人～-->
      <!--<div class="follow_login_noFollow" v-if="followIsShow==true">-->
        <!--<p class="follow_login_noFollow_p">您关注的达人还未发布作品，为您推荐更多设计达人～</p>-->
        <!--<ul class="follow_login_noFollow_ul">-->
          <!--<li class="follow_login_noFollow_li" v-for="(item,index) in Recommend">-->
            <!--<div class="follow_login_noFollow_li1"><img :src="item.url" alt=""></div>-->
            <!--<div class="follow_login_noFollow_li2">{{item.name}}</div>-->
            <!--<div class="follow_login_noFollow_li3">-->
              <!--<div><img :src="item.type==false?'/static/images/未关注.png':'/static/images/已关注.png'" alt="">{{item.value}}</div>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--您关注的达人发布了作品-->
      <!--<div class="follow_login_Follow" v-else>-->
      <div class="follow_login_Follow">
        <ul class="follow_login_Follow_ul" v-if="followIsShow==false&&!!listData&&listData!=-1&&listData!=-2">
          <li class="follow_login_Follow_li" v-for="(item,index) in listData" @click="goDetail(item)">
            <div class="follow_login_Follow_li1">
              <img :src="item.caredUserMap.ownerUrl?item.caredUserMap.ownerUrl:'/static/images/defultphoto.png'" alt="" @click.stop="headerClick(item)">
              <div class="follow_login_Follow_li1_title">
                <b>{{item.caredUserMap.name}}</b>
                <span>{{item.createdAt|formatTime2}}</span>
              </div>
              <div class="follow_login_Follow_li1_div" v-if="item.caredUserMap.caredStatus==0&&userInfo.data.id!=item.caredUserMap.id" @click.stop="follow(item)">关注</div>
              <div class="follow_login_Follow_li1_div active" v-if="item.caredUserMap.caredStatus==1&&userInfo.data.id!=item.caredUserMap.id" @click.stop="cancelFollow(item)">取消关注</div>
            </div>
            <!--作品-->
            <v-touch class="follow_login_Follow_li2" ref="windwosWH" v-if="item.type==2"  v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
              <!--轮播-->
              <div :class="'swiper-container'+index">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item1,index1) in item.customerPubContentMap.attachments">
                    <div class="imgIs">
                      <img :src="item1.url" >
                      <div class="biaoqian" v-for="(item2,index2) in item1.anchors" :style="{left:item2.axesxRate*imgW+'px',top:item2.axesyRate*(item1.height/(item1.width/imgW))+'px'}">
                        <img src="/static/images/标签.png" alt=""><span>{{item2.title}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div :class="'swiper-pagination'+index" style="text-align: center"></div>
              </div>
              <!---->
            </v-touch>

            <!--文章-->
            <div class="follow_login_Follow_li2_2" v-else>
              <img :src="item.bannerDetailUrl" alt="">
            </div>

            <div class="follow_login_Follow_li3">
              <p>{{item.message1}}<b v-show="item.content&&item.content.length>35" @click.stop="openClick(item,index)">　{{item.value}}</b></p>
            </div>
            <div class="follow_login_Follow_li4" v-if="item.type==2">
              <div @click="laudedStatus(item)">
                <img src="/static/images/点赞2.png" alt="" v-if="item.customerPubContentMap.laudedStatus==true">
                <img src="/static/images/点赞.png" alt="" v-else>
                {{item.customerPubContentMap.laudedCount<10000?item.customerPubContentMap.laudedCount:(item.customerPubContentMap.laudedCount/10000).toFixed(2)+'万'}}
              </div>
              <div @click="favoredStatus(item)">
                <img src="/static/images/收藏2.png" alt="" v-if="item.customerPubContentMap.favoredStatus==true">
                <img src="/static/images/收藏1.png" alt="" v-else>
                {{item.customerPubContentMap.favoredCount<10000?item.customerPubContentMap.favoredCount:(item.customerPubContentMap.favoredCount/10000).toFixed(2)+'万'}}
              </div>
              <div>
                <img src="/static/images/关注阅读量.png" alt="">  {{item.customerPubContentMap.commentedCount<10000?item.customerPubContentMap.commentedCount:(item.customerPubContentMap.commentedCount/10000).toFixed(2)+'万'}}
              </div>
              <!--<div>-->
                <!--<img src="/static/images/分享.png" alt="">1.25万-->
              <!--</div>-->

            </div>
            <div class="follow_login_Follow_li4" v-else>
              <div @click.stop="laudedStatus(item)">
                <img src="/static/images/点赞2.png" alt="" v-if="item.laudedStatus==true">
                <img src="/static/images/点赞.png" alt="" v-else>
                {{item.laudedCount<10000?item.laudedCount:(item.laudedCount/10000).toFixed(2)+'万'}}
              </div>
              <div @click.stop="favoredStatus(item)">
                <img src="/static/images/收藏2.png" alt="" v-if="item.favoredStatus==true">
                <img src="/static/images/收藏1.png" alt="" v-else>
                {{item.favoredCount<10000?item.favoredCount:(item.favoredCount/10000).toFixed(2)+'万'}}
              </div>
              <div>
                <img src="/static/images/关注阅读量.png" alt="">
                {{item.commentedCount<10000?item.commentedCount:(item.commentedCount/10000).toFixed(2)+'万'}}
              </div>
              <!--<div>-->
                <!--<img src="/static/images/look.png" alt="">-->
                <!--{{item.readCount<10000?item.readCount:(item.readCount/10000).toFixed(2)+'万'}}-->
              <!--</div>-->

            </div>
          </li>
          <div class="messageFoot" @click="updataMore" v-if="listData.length>0">
            {{message}}
          </div>
        </ul>

      </div>
      <div class="lengthSmall" v-if="followIsShow==false&&listData==-2">
        <img src="/static/images/原创.png" alt="">
        <p>你关注的人还未发布作品哦~</p>
      </div>
      <div class="lengthSmall" v-if="followIsShow==false&&listData==-1">
        <img src="/static/images/原创.png" alt="">
        <p>你还没有关注任何人哦~</p>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Actionsheet } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  import {allInformationAndPubFindMyCaredList} from '../../../assets/js/promiseHttp'; //数据

  export default {
    name: 'follow',
    props:["userToken","userId","userType"],
    data(){
      return{
        p:1, //第几页
        s:20,//每页多少
        pageNum:0, //总共多少页
        imgW:320,
        message:"不同正在努力加载中...",//
        headerTab:[{Chinese:"发现",English:"Find"},{Chinese:"关注",English:"Aattention"}], //tab
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
     document.title = "关注列表"
      this.userInfo = {data:{id:this.userId,access_token:this.userToken,userType:this.userType}}

      if(this.userInfo.data.access_token){ //登录的情况  //
        this.LoginShow = true;
        allInformationAndPubFindMyCaredList( this.userInfo.data.id,this.userInfo.data.userType,this.p,this.s,this.userInfo.data.access_token).then(res=>{
          if(res.status == true){
            if(res.data.caredType==0){
              res.data.relData.forEach((item,index)=>{
                item.messageShow = false;
                item.message1 = "";
                item.value = "展开";
                if(item.type==2){

                  if(item.customerPubContentMap.content&&item.customerPubContentMap.content.length>35){
                    item.message1=item.customerPubContentMap.content.substring(0,35)+"...";
                    item.messageShow = true;
                    item.value = "展开";
                  }else{
                    item.messageShow = false;
                    item.message1 = item.customerPubContentMap.content?item.customerPubContentMap.content:"";
                  }
                }else{
                  if(item.content&&item.content.length>35){
                    item.message1=item.content.substring(0,35)+"...";
                    item.messageShow = true;
                    item.value = "展开";
                  }else{
                    item.messageShow = false;
                    item.message1 = item.content?item.content:"";
                  }
                }

              })
              this.pageNum = Math.ceil(res.total/this.s);
              console.log(this.pageNum)
              if(this.pageNum>1){
                this.message = '点击加载更多...';
              }else{
                this.message = '这是我的底线...';
              }
              this.listData = res.data.relData;
              this.$nextTick(()=>{
                this.imgW = this.$refs.windwosWH[0].offsetWidth;
                //     滑动
                for(var i = 0;i<this.listData.length;i++){
                  var mySwiper = new Swiper ('.swiper-container'+i, {
                    autoplay:false,
                    loop:true,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination'+i,
                    },
                  })
                }

              })
            }else if(res.data.caredType == -1){
              this.listData = -1;
            }else if(res.data.caredType == -2){
              this.listData = -2;
            }

          }else{
            Toast("网络出错了，请重试")
          }
        })
      }else{//没有登录的情况
        this.LoginShow = false;
      }

    },
    methods:{
      swiperleft(){
//        Toast("zuo")
      },
      swiperright(){
//        Toast("you")
      },
      headerClick(v){//点击头像 去吃瓜页 或则设计师主页 或者企业
        console.log(v)
        if(v.caredUserMap.userType=="2"){ //个人
          if(v.caredUserMap.vUser==0){ //去吃瓜
            this.$router.push({path:"/personalMelonPages",query:{id:v.caredUserMap.id}})
          }else{//去大咖
            this.$router.push({path:"/homePage",query:{state:2,id:v.caredUserMap.id}})//1  true是大咖个人
          }
        }else{ //企业
          this.$router.push({path:"/homePage",query:{state:1,id:v.caredUserMap.id}})//1 是大咖企业
        }

      },
      goDetail(v){ //去详情
//        console.log(v,"go详情")
        if(v.type==1){//文章
          this.$router.push({path:"/homeDetail",query:{id:v.targetId}}) //去发现的详情页面，记得带状态跟token
        }else if(v.type==2){ //作品
          this.$router.push({path:"/findDetail",query:{id:v.targetId}}) //去发现的详情页面，记得带状态跟token
        }
      },
      openClick(v,i){ //展开收起
        v.messageShow = !v.messageShow;
        if(v.messageShow==false){
          v.message1 = this.listData[i].content;
          v.value = "收起";
        }else{ //张开
          v.message1=v.content.substring(0,35)+"...";
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
//        this.$router.push({path:"/login"})
        if(window.__wxjs_environment === 'miniprogram'){
           wx.miniProgram.navigateTo({url: '../../pages/login/login'})   //跳回小程序需要显示的页面路劲
        }else{
          Toast("请在微信浏览器里打开");
        }
      },
      updataMore(){ //加载更多 分页
        this.p++;
        if(this.p>this.pageNum){
          this.message = "这是我的底线..."
          Toast("这是最后一页啦！")
        }else if(this.p==this.pageNum){
          allInformationAndPubFindMyCaredList( this.userInfo.data.id,this.userInfo.data.userType,this.p,this.s,this.userInfo.data.access_token).then(res=>{
            if(res.status == true){
              this.message = "这是我的底线..."
              res.data.relData.forEach((item,index)=>{
                item.messageShow = false;
                item.message1 = "";
                item.value = "展开";
                if(item.type==2){

                  if(item.customerPubContentMap.content&&item.customerPubContentMap.content.length>35){
                    item.message1=item.customerPubContentMap.content.substring(0,35)+"...";
                    item.messageShow = true;
                    item.value = "展开";
                  }else{
                    item.messageShow = false;
                    item.message1 = item.customerPubContentMap.content?item.customerPubContentMap.content:"";
                  }
                }else{
                  if(item.content&&item.content.length>35){
                    item.message1=item.content.substring(0,35)+"...";
                    item.messageShow = true;
                    item.value = "展开";
                  }else{
                    item.messageShow = false;
                    item.message1 = item.content?item.content:"";
                  }
                }

              })
              this.listData = this.listData.concat(res.data.relData);
              this.$nextTick(()=>{
                //     滑动
                for(var i = 0;i<that.listData.length;i++){
                  var mySwiper = new Swiper ('.swiper-container'+i, {
                    autoplay:false,
                    loop:true,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination'+i,
                    },
                  })
                }

              })
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){

          allInformationAndPubFindMyCaredList( this.userInfo.data.id,this.userInfo.data.userType,this.p,this.s,this.userInfo.data.access_token).then(res=>{
            if(res.status == true){
              this.message = "点击加载更多..."
              res.data.relData.forEach((item,index)=>{
                item.messageShow = false;
                item.message1 = "";
                item.value = "展开";
                if(item.type==2){

                  if(item.customerPubContentMap.content&&item.customerPubContentMap.content.length>35){
                    item.message1=item.customerPubContentMap.content.substring(0,35)+"...";
                    item.messageShow = true;
                    item.value = "展开";
                  }else{
                    item.messageShow = false;
                    item.message1 = item.customerPubContentMap.content?item.customerPubContentMap.content:"";
                  }
                }else{
                  if(item.content&&item.content.length>35){
                    item.message1=item.content.substring(0,35)+"...";
                    item.messageShow = true;
                    item.value = "展开";
                  }else{
                    item.messageShow = false;
                    item.message1 = item.content?item.content:"";
                  }
                }

              })
              this.listData =  this.listData.concat(res.data.relData);
              this.$nextTick(()=>{

                //     滑动
                for(var i = 0;i<that.listData.length;i++){
                  var mySwiper = new Swiper ('.swiper-container'+i, {
                    autoplay:false,
                    loop:true,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination'+i,
                    },
                  })
                }

              })
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
    top:-0.52rem;
    bottom:-0.52rem;
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
        font-size:0.14rem;
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
      .follow_login_Follow{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.5rem;
        top: 0.52rem;
        overflow: hidden;
        .follow_login_Follow_ul{
          width: 100%;
          height: 100%;
          padding:0.1rem;
          overflow-x: hidden;
          overflow: scroll;
          background: #eeeeee;
          box-sizing: border-box;
          .follow_login_Follow_li{
            width: 100%;
            background: #ffffff;
            margin-bottom: 0.15rem;
            .follow_login_Follow_li1{
              width: 100%;
              height: 0.75rem;
              padding: 0.22rem 0.11rem 0.15rem 0.11rem;
              box-sizing: border-box;
              >img{
                display: block;
                width: 0.38rem;
                height: 0.38rem;
                border-radius: 50%;
                margin-right: 0.05rem;
                float: left;
              }
              >.follow_login_Follow_li1_title{
                width: 2rem;
                height: 0.38rem;
                float: left;
                >b{
                  display: block;
                  width: 100%;
                  height: 0.24rem;
                  font-size:0.15rem;
                  font-family:PingFangSC-Medium;
                  color:rgba(5,5,9,1);
                  line-height: 0.24rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                >span{
                  display: block;
                  line-height: 0.14rem;
                  font-size: 0.1rem;
                  color: #676768;
                }
              }

              >.follow_login_Follow_li1_div{
                width: 0.8rem;
                height: 0.32rem;
                background: #ffffff;
                border-radius:0.24rem;
                line-height: 0.32rem;
                text-align: center;
                float: right;
                font-size:0.1rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:#262626;
                border:0.02rem solid #262626;
                img{
                  display: inline-block;
                  width: 0.1rem;
                  height: 0.11rem;
                  margin-right: 0.05rem;
                }
              }
              >div.active{
                background: #ffffff;
                border:0.02rem solid #c5c5c6;
                color:#c5c5c6;
              }
            }
            .follow_login_Follow_li2_2{
              width: 100%;
              margin: 0.05rem 0 0.1rem 0;
              img{
                display: block;
                width: 100%;
              }
            }
            .follow_login_Follow_li2{
              width: 100%;
              overflow: hidden;
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
                    /*width: 100%;*/
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
                line-height: 0.18rem;
                color:rgba(5,5,9,1);
                letter-spacing:0.02rem;
                word-wrap:break-word;
              }
            }
            .follow_login_Follow_li4{
              width: 100%;
              overflow: hidden;
              padding: 0.15rem;
              box-sizing: border-box;
              >div{
                float: left;
                font-size:0.14rem;
                font-family:PingFangSC-Semibold;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height: 0.18rem;
                margin-right: 0.2rem;
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
  .lengthSmall{
    width: 100%;
    height: 100%;
    background: #F7F7F7;
    padding-top: 1rem;
    img{
      width: 1.2rem;
      height: 1.14rem;
      display: block;
      margin: 0 auto;
    }
    p{
      width: 100%;
      line-height: 0.5rem;
      font-size: 0.14rem;
      text-align: center;
      color:rgba(153,153,153,1);
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
</style>
