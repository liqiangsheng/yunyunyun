<template>
  <!--关注-->
  <div id="followDetail">
    <!--已登录-->
    <div class="follow_login_true">

      <!--您关注的达人发布了作品-->
      <v-touch class="follow_login_Follow" v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
        <ul class="follow_login_Follow_ul">
          <li class="follow_login_Follow_li" v-for="(item,index) in listData">
            <div class="follow_login_Follow_li1">
              <img :src="item.authorInfo.ownerUrl?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="" @click="headerClick(item)">
              <p>{{item.authorInfo.name}}</p>
              <div v-if="!item.authorInfo.caredStatus"><img src="/static/images/已关注.png" alt="">关注</div>
              <div v-else class="active">取消关注</div>
            </div>
            <div class="follow_login_Follow_li2" ref="windwosWH">
              <!--轮播-->
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item1,index1) in item.attachments">
                    <div class="imgIs">
                      <img :src="item1.url" >
                      <div class="biaoqian" v-for="(item2,index2) in item1.anchors" :style="{left:item2.axesxRate*imgW+'px',top:item2.axesyRate*imgH+'px'}">
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
              <p>{{item.message1}}<b v-show="item.content&&item.content.length>35" @click.stop="openClick(item,index)">　{{item.value}}</b></p>
            </div>
            <div class="follow_login_Follow_li4">
                <div>
                  <img src="/static/images/关注阅读量.png" alt="">
                  {{item.commentedCount<10000?item.commentedCount:(item.commentedCount/10000).toFixed(2)+'万'}}
                </div>
                <div>
                  <img src="/static/images/点赞2.png" alt="" v-if="item.laudedStatus==true">
                  <img src="/static/images/点赞.png" alt="" v-else>
                  {{item.laudedCount<10000?item.laudedCount:(item.laudedCount/10000).toFixed(2)+'万'}}
                </div>
                <div>
                  <img src="/static/images/收藏2.png" alt="" v-if="item.favoredStatus==true">
                  <img src="/static/images/收藏1.png" alt="" v-else>
                  {{item.favoredCount<10000?item.favoredCount:(item.favoredCount/10000).toFixed(2)+'万'}}
                </div>
              <div>
                <img src="/static/images/look.png" alt="">
                {{item.readCount<10000?item.readCount:(item.readCount/10000).toFixed(2)+'万'}}
              </div>

            </div>
          </li>
        </ul>
      </v-touch>
      <ul class="IntelligentMatchingDItem5">
        <li v-for="(item,index) in commenArr" v-if="!!item.sysUserContentVo">
          <div class="IntelligentMatchingDItemL">
            <img :src="item.userDp" alt="" @click.stop="commentGoHomepage(item)">
          </div>
          <div class="IntelligentMatchingDItemR">
            <h5>{{item.name}}</h5>
            <div class="time">{{item.createdAt|formatTime1}}</div>
            <div class="commen">
              {{item.commentContent}}
              <div class="zan1"><img src="/static/images/zan1.png" alt="">{{item.laudedCount}}</div>
            </div>
            <ul class="ReplyUl" v-if="item.replyVoList.length>0">
              <li v-for="(item1,index1) in item.replyVoList"  class="ReplyLi">
                <span><span v-if="item1.sysUserContentVo.name">{{item1.sysUserContentVo.name}}@</span>{{item1.replyCommentName}}:</span>{{item1.replyContent}} <div><img src="/static/images/zan1.png" alt=""> {{item1.laudedCount}}</div>
              </li>
              <!--<span style="width: 100%;display: inline-block;text-align: center" v-if="item.replyListTotal>2" @click="nextPageClick(item)">共有{{item.replyListTotal}}条评论</span>-->
            </ul>
          </div>
        </li>
      </ul>
      <div class="messageFoot" @click="updataMore">
        {{message}}
      </div>
    </div>
    <!--<div class="findDetailFoot" @click="giveClick" v-if="state!='XCX'">-->
      <!--<div class="footer">-->
        <!--<ul>-->
          <!--<li class="footerLi1">-->
            <!--<img src="/static/images/xialian.png" alt="">-->
          <!--</li>-->
          <!--<li class="footerLi2">-->
            <!--<img src="/static/images/xingxing.png" alt="">-->
          <!--</li>-->
          <!--<li class="footerLi2">-->
            <!--<img src="/static/images/bianji.png" alt="">-->
          <!--</li>-->
          <!--<li class="footerLi2">-->
            <!--<img src="/static/images/bianxie.png" alt="">-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!--<mt-actionsheet-->
      <!--:actions="actions"-->
      <!--v-model="sheetVisible">-->
    <!--</mt-actionsheet>-->
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Actionsheet } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  import {commentFindCommentsByPubId,customerPubContentFindOne,customerPubContentLaudContent,customerPubContentCancelLaudContent,customerPubContentFavorContent,customerPubContentCancelFavorContent,commonUserCareUser,commonUserCancelCareUser,companyInfoCareCompany,companyInfoCancelCareCompany } from '../../assets/js/promiseHttp'; //数据

  export default {
    name: 'follow',
    data(){
      return{
        commenArr:[], //评论的数据
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:"",//每页数据
        state:"", //是不是小程序 是的话就不显示
        actions:[{ name:"请下载不同Tech App" },{ name:"iOS",method:this.IOS },{ name:"Android",method:this.Android }],//下载地址
        sheetVisible:false, //弹框提示
        headerTab:["发现","关注"], //tab
        headerTabIndex:1,//是关注还是发现
        userInfo:"", //用户信息
        LoginShow:false, //登录没登录
        followIsShow:false, //关注的人未发布作品
        listData:[],//数据
        imgW:320,
        imgH:175,
      }
    },
    created() {
      this.$nextTick(function () {
        document.title = "作品详情"
      })
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
//    if(this.userInfo){ //登录的情况  //
//    }else{//没有登录的情况
//
//    }
      if(this.$router.history.current.query.id){ //这个id请求数据 截取url的
//        customerPubContentFindOne("1").then(res=>{
        customerPubContentFindOne(this.$router.history.current.query.id).then(res=>{
          console.log(res,"fdskjfgd")
          if(res.status == true){
            let arrdata = [res.data];
            arrdata.forEach((item,index)=>{
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
            this.listData = arrdata;
            this.$nextTick(()=>{
              setTimeout(()=>{
                this.imgW = this.$refs.windwosWH[0].offsetWidth;
                this.imgH = this.$refs.windwosWH[0].offsetHeight;
              },200)
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

        commentFindCommentsByPubId(this.$router.history.current.query.id,this.p,this.s).then(res=>{
          console.log(res)
          if(res.data.status==true){
         if(res.data.data.length>0){
               res.data.data.forEach((item,index)=>{
                 if(item.sysUserContentVo){
                   if(item.sysUserContentVo.userDp){
                     item.userDp = item.sysUserContentVo.userDp;
                   }else {
                     item.userDp = "./static/images/defultphoto.png";
                   }
                   if(item.sysUserContentVo.name){
                     item.name = item.sysUserContentVo.name;
                   }else {
                     item.name = "游客";
                   }
                 }else{
                   item.userDp = "./static/images/defultphoto.png";
                   item.name = "游客";
                 }


               })
               this.pageNum = Math.ceil(res.data.total/this.s);
               if(this.pageNum >1){
                 this.message = "点击加载更多..."
               }else{
                 this.message = "这是我的底线..."
               }
               this.commenArr = res.data.data;
         }else{
           this.commenArr = res.data.data;
           this.message = "暂无更多评论..."
         }

          }else{
            Toast("网络出错了，请重试")
          }
        })
      }
    },
    methods:{
      commentGoHomepage(v){//点击评论的头像
        if(v.orgId=='2'){ //个人
          if(v.vUser==false){ //去吃瓜
            this.$router.push({path:"/personalMelonPages",query:{id:v.createdUser}})
          }else{//去大咖
            this.$router.push({path:"/homePage",query:{state:2,id:v.createdUser}})//1  true是大咖个人
          }
        }else if(v.orgId=='1'){ //企业
          this.$router.push({path:"/homePage",query:{state:1,id:v.createdUser}})//1 是大咖企业
        }else {
          Toast("后台参数错误")
        }
      },

      headerClick(v){
        if(v.authorInfo.vUser==0){ //去吃瓜
          this.$router.push({path:"/personalMelonPages",query:{id:v.authorInfo.id}})
        }else{//去大咖
          if(v.authorInfo.userType=="2"){
            this.$router.push({path:"/homePage",query:{state:2,id:v.authorInfo.id}})//1 是大咖个人
          }else{
            this.$router.push({path:"/homePage",query:{state:1,id:v.authorInfo.id}})//1 是大咖企业
          }
        }
      },
      swiperleft(){ //不能删除 切记 不然小程序运行不了
//        Toast("zuo")
      },
      swiperright(){//不能删除  切记 不然小程序运行不了
//        Toast("you")
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
      giveClick(){ //下载IOS 或则安卓
        this.sheetVisible =true;
      },
      IOS(){ //ios下载
        location.href="https://itunes.apple.com/cn/app/id1439775835"
      },
      Android(){//安卓下载
        location.href="https://www.pgyer.com/designcloud"
      },
      updataMore(){ //加载更多 分页
        this.p++;
        if(this.p>this.pageNum){
          this.message = "这是我的底线..."
          Toast("这是最后一页啦！")
        }else if(this.p==this.pageNum){
          this.message = "这是我的底线..."
          commentFindCommentsByPubId(this.$router.history.current.query.id,this.p,this.s).then(res=>{
            if(res.data.status == true){
              res.data.data.forEach((item,index)=>{
                if(item.sysUserContentVo){
                  if(item.sysUserContentVo.userDp){
                    item.userDp = item.sysUserContentVo.userDp;
                  }else {
                    item.userDp = "./static/images/defultphoto.png";
                  }
                  if(item.sysUserContentVo.name){
                    item.name = item.sysUserContentVo.name;
                  }else {
                    item.name = "游客";
                  }
                }else{
                  item.userDp = "./static/images/defultphoto.png";
                  item.name = "游客";
                }


              })
              this.commenArr =  this.commenArr.concat(res.data.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){
          this.message = "点击加载更多..."
          commentFindCommentsByPubId(this.$router.history.current.query.id,this.p,this.s).then(res=>{
            if(res.data.status == true){
              res.data.data.forEach((item,index)=>{
                if(item.sysUserContentVo){
                  if(item.sysUserContentVo.userDp){
                    item.userDp = item.sysUserContentVo.userDp;
                  }else {
                    item.userDp = "./static/images/defultphoto.png";
                  }
                  if(item.sysUserContentVo.name){
                    item.name = item.sysUserContentVo.name;
                  }else {
                    item.name = "游客";
                  }
                }else{
                  item.userDp = "./static/images/defultphoto.png";
                  item.name = "游客";
                }


              })
              this.commenArr =  this.commenArr.concat(res.data.data);
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
  #followDetail {
    width: 100%;
    position: relative;
    .follow_login_true{
      width: 100%;
      .follow_login_Follow{
        width: 100%;

        .follow_login_Follow_ul{
          width: 100%;
          margin-top: 0.01rem;
          .follow_login_Follow_li{
            width: 100%;
            background: #ffffff;
            margin-bottom: 0.02rem;
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
                      width: 0.13rem;
                      height: 0.2rem;
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
                line-height: 0.28rem;
                color:rgba(5,5,9,1);
                word-wrap:break-word;
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
      >.IntelligentMatchingDItem5{
        padding: 0.1rem;
        box-sizing: border-box;
        width: 100%;
        background: #ffffff;
        >li{
          width: 100%;
          padding: 0.15rem 0;
          border-bottom: 0.01rem solid rgba(220,220,220,1);
          display: flex;
          >.IntelligentMatchingDItemL{
            width: 0.6rem;
            height: 0.6rem;
            >img{
              display: block;
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 50%;
            }
          }
          .IntelligentMatchingDItemR{
            /*flex: 1;*/
            width: 100%;
            padding-left: 0.15rem;
            box-sizing: border-box;
            h5{
              width: 100%;
              font-size:0.13rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
              line-height:0.48rem;
            }
            .time{
              font-size:0.09rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1)
            }
            .commen{
              width: 70%;
              position: relative;
              margin-top: 0.1rem;
              font-size:0.13rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(5,5,9,1);
              .zan1{
                position: absolute;
                right: -35%;
                top: 0;
                img{
                  display: inline-block;
                  width: 0.13rem;
                  height: 0.13rem;
                  margin-right: 0.05rem;
                }
              }
            }
            .ReplyUl{
              width: 100%;
              padding: 0.1rem;
              box-sizing: border-box;
              background:rgba(244,244,244,1);
              border-radius:0.1rem;
              margin-top: 0.1rem;
              li{
                width: 70%;
                position: relative;
                font-size:0.12rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height:0.32rem;
                div{
                  position: absolute;
                  right: -35%;
                  top: 0;
                  font-size:0.11rem;
                  font-family:PingFangSC-Regular;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  img{
                    display: inline-block;
                    width: 0.13rem;
                    height: 0.13rem;
                    margin-right: 0.05rem;
                  }
                }
                span{
                  font-size:0.12rem;
                  font-family:PingFangSC-Regular;
                  font-weight:bold;
                  color:rgba(5,5,9,1);
                }

              }
            }
          }
        }
        >li:last-child{
          border-bottom: 0;
        }
      }
    }
    /*.findDetailFoot{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.49rem;
      border-top:0.01rem solid #DFDFDF;
      background:rgba(254,252,252,1);
      box-shadow:0px -1px 0.07rem 0px rgba(223,223,223,1);

      .footer{
        width: 90%;
        height: 0.35rem;
        margin: 0 auto;
        margin-top: 0.05rem;

        ul{
          display: flex;
          .footerLi1{
            width: 1.5rem;
            height: 0.35rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(223, 223, 223, 1);
            border-radius: 0.2rem;
            position: relative;
            img{
              display: inline-block;
              width: 0.2rem;
              height: 0.2rem;
              position: absolute;
              right: 0.1rem;
              top:0.08rem;
            }
          }
          .footerLi2{
            flex: 1;
            text-align: center;
            img{
              margin-top: 10%;
              display: inline-block;
              width: 0.23rem;
              height: 0.22rem;
            }
          }
        }

      }
    }*/
    .messageFoot{
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      background: #F7F7F7;
      color: rgba(5,5,5,0.3);
      text-align: center;
    }
  }
</style>
