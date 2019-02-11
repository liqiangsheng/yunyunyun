<template>
  <div id="IntelligentMatchingD">
       <div style="width: 100%;text-align: center;line-height: 2.5rem;"  v-if="!boxShow">请求出错啦！</div>
        <div class="IntelligentMatchingDHeader"  v-if="boxShow">
             <h3>{{messageArr.title}}</h3>
            <div class="IntelligentMatchingDHeaderIndex">
              <span v-for="(item,index) in messageArr.contentTagVoList">{{item.tagName}} | </span>
            </div>
             <div class="IntelligentMatchingDHeaderIndex1">
               <img :src="messageArr.bannerDetailUrl" alt="">
             </div>
             <div class="IntelligentMatchingDHeaderIndex2">
               <img :src="userDp" alt="" @click="authorClcik(messageArr)">
               <div>
                 <p>{{titleName}}</p>
                 <span>{{messageArr.createdAt|formatTime}}</span>
               </div>
               <button @click="isXCXClick">{{followMessage}}</button>
             </div>
             <div class="IntelligentMatchingDHeaderIndex3" v-if="messageArr.summary">
               <img src="/static/images/shuangying1.png" alt="" style="margin: 0 0.1rem">
               {{messageArr.summary}}
               <img src="/static/images/shuangying.png" alt="">
             </div>
        </div>
        <div class="IntelligentMatchingDItem" v-for="(item,index) in messageArr.informationChildrenTitleVoList" v-if="boxShow">
          <h5 v-if="!!item.titleName"><span></span>{{item.titleName}}</h5>
          <div class="IntelligentMatchingDItemIndex" v-for="(item1,index1) in item.titleInformationList">
            <span v-if="!!item1.titleInformation">{{item1.titleInformation}}</span>
            <img v-if="!!item1.titleImg" :src="item1.titleImg" alt="">
          </div>
          <!--<div v-if="!!item.logoUrl" class="IntelligentMatchingDItemIndex1"><img :src="item.logoUrl" alt=""></div>-->
        </div>
        <div class="IntelligentMatchingDItem1" @click="fabulousClick" v-if="boxShow">
          <img src="/static/images/zan1.png" alt="">{{fabulousNum}} {{fabulousMessage}}
        </div>
      <div class="IntelligentMatchingDItem2" v-if="boxShow">
         <img src="/static/images/banqun.png" alt="">版 权
      </div>
    <div class="IntelligentMatchingDItem3" v-if="boxShow">
         <span v-if="messageArr.isOriginal==1">本文版权归不同科技所有 / 未经许可不得转载或翻译</span>
         <span v-if="messageArr.isOriginal==0"><span v-if="!!messageArr.fromReprint">转载自：{{messageArr.fromReprint}} </span><span v-if="!!messageArr.source">/ 文章来源：{{messageArr.source}} </span><span v-if="!!messageArr.author">/ 作者：{{messageArr.author}}</span></span>
      </div>

    <div class="IntelligentMatchingDItem4" v-if="boxShow">
     <!--  //有用的-->
    </div>
    <ul class="IntelligentMatchingDItem5" v-if="boxShow">
      <li v-for="(item,index) in commenArr" v-if="!!item.sysUserContentVo">
        <div class="IntelligentMatchingDItemL" @click="commentGoHomepage(item)">
          <img :src="item.userDp" alt="" @click="giveClick">
        </div>
        <div class="IntelligentMatchingDItemR">
            <h5>{{item.name}}</h5>
            <div class="time">{{item.createdAt|formatTime1}}</div>
            <div class="commen">
              {{item.commentContent}}
               <div class="zan1" @click="commentariesClick(item)"><img src="/static/images/zan1.png" alt="">{{item.laudedCount}}</div>
            </div>
            <ul class="ReplyUl" v-if="item.replyVoList.length>0">
               <li v-for="(item1,index1) in item.replyVoList"  class="ReplyLi">
                 <span><span v-if="item1.sysUserContentVo.name">{{item1.sysUserContentVo.name}}@</span>{{item1.replyCommentName}}:</span>{{item1.replyContent}} <div @click="commentariesClickTwo(item1)"><img src="/static/images/zan1.png" alt=""> {{item1.laudedCount}}</div>
               </li>
                <span style="width: 100%;display: inline-block;text-align: center" v-if="item.replyListTotal>2" @click="nextPageClick(item)">共有{{item.replyListTotal}}条评论</span>
            </ul>
        </div>
      </li>
    </ul>

    <div class="messageFoot" @click="updataMore" v-if="message!=''">
      {{message}}
    </div>

    <div class="IntelligentMatchingDItem6" @click="giveClick" v-if="message!=''">
       <div class="footer">
          <ul>
            <li class="footerLi1">
              <img src="/static/images/xialian.png" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/xingxing.png" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/bianji.png" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/bianxie.png" alt="">
            </li>
          </ul>
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
  import wxShare from "../../assets/js/wxShare"
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  import {shareInfoShareUrl,informationId,findCommentsByInfoId,commonUserCareUser,commonUserCancelCareUser,companyInfoCareCompany,companyInfoCancelCareCompany,informationLaudInformation,informationCancelLaudInformation,commentlaudComment,commentCancelLaudComment,replylaudReply,replyCancelLaudReply } from '../../assets/js/promiseHttp'; //数据
export default {
  name: 'IntelligentMatchingD',
  data(){
    return{
      boxShow:true,//初始化数据成功
      followMessage:"", //关注
      actions:[{ name:"请下载不同Tech App" },{ name:"iOS",method:this.IOS },{ name:"Android",method:this.Android }],//下载地址
      sheetVisible:false, //是否显示弹框
      messageArr:{},//文章
       commenArr:[], //评论的数据
      p:1,  //页
      s:20, //每页多少
      message:"", //触底提示
      pageNum:"",//每页数据
      userDp:"./static/images/defultphoto.png",
      isNative:false, //是不是原生或则小程序
      orgId:"2",  //2是个人 /1是企业
      userId:"1", // 用户id
      operationUser:"200", //操作的用户id
      detailId:"", //详情id
      cared:false,//关注状态
      fabulousNum:"",// 赞的数量
      lauded:false,// 赞的状态
      fabulousMessage:"赞",// 赞
      titleName:"",//名字点赞的
    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "文章详情";
    })
    this.operationUser = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):{data:{user_id:"",userType:""}};
    this.NativeState = this.$router.history.current.query.state?this.$router.history.current.query.state:"XCX";
    if(this.operationUser!=""&&this.operationUser){
      if(this.$router.history.current.query.id){
        this.detailId = this.$router.history.current.query.id;
        this.query(this.$router.history.current.query.id,this.operationUser.data.user_id,this.operationUser.data.userType);

      }else {
        this.$router.go(-1)
      }
    }else{
      if(this.$router.history.current.query.id){
        this.detailId = this.$router.history.current.query.id;
        this.query(this.$router.history.current.query.id,this.operationUser.data.user_id,this.operationUser.data.userType);

      }else {
        this.$router.go(-1)
      }
    }


  },
  mounted(){
    if(window.common.apiDomain20020=='https://dcloud.butongtech.com:20020'){
      setTimeout(()=>{
        this.share();
      },200)
    }
  },
  methods:{
    commentGoHomepage(v){//点击评论的头像
      if(v.orgId=='2'){ //2是个人
        if(v.vUser==false){ //去吃瓜
          this.$router.push({path:"/personalMelonPages",query:{id:v.createdUser}})
        }else{//去大咖
          this.$router.push({path:"/bigShotPage",query:{id:v.createdUser}})//1  true是大咖个人
        }
      }else{//企业
        this.$router.push({path:"/enterprisePage",query:{id:v.createdUser}})//1 是大咖企业
      }
    },
    share(){//分享
      let url = "http://account.butongtech.com/"
      shareInfoShareUrl(url).then(res=>{
      console.log(this.messageArr,"this.messageArr")
        if(res.status==true){
          let obj = {
            title:this.messageArr.title,
            desc:this.messageArr.summary,
            url:"http://account.butongtech.com/index.html#/homeDetail?id="+this.$router.history.current.query.id,
            imgUrl:this.messageArr.bannerDetailUrl,
          }
          wxShare.wxShare(res.data,obj)
        }else{
          Toast("网络出错了，请重试")
        }
      })
    },
    IOS(){
      location.href="https://itunes.apple.com/cn/app/id1439775835"
    },
    Android(){
        location.href="https://www.pgyer.com/designcloud"
    },
    nextPageClick(v){ //去下一页数据
//         console.log(v);
      let data = JSON.parse(localStorage.getItem("userInfo"))
        if(!data){
          Toast("您还未登录，请登录！");
          setTimeout(()=>{
            this.$router.push({path:"/login"})
          },1000)
        }else {
          sessionStorage.setItem("nextPageDetail",JSON.stringify(v));
          this.$router.push({path:"/IntelligentComment",query:{id:v.id,token:data.data.access_token}})
        }

    },
    commentariesClickTwo(v){ //评论去的点赞 第二级级的赞
       let data = JSON.parse(localStorage.getItem("userInfo"))

      if(this.NativeState == 'XCX'){
          if(!data){
              Toast("您还未登录，请登录！");
              setTimeout(()=>{
                this.$router.push({path:"/login"})
              },1000)
          }else{
              if(v.lauded == false){ //点赞
                v.lauded = true;
                replylaudReply(v.id,data.data.access_token).then(res=>{
                  if(res.status==true){
                    Toast("点赞成功")
                    v.laudedCount =  v.laudedCount+1;
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else {  //取消赞
                v.lauded = false;
                replyCancelLaudReply(v.id,data.data.access_token).then(res=>{
                  if(res.status==true){
                    Toast("取消点赞")
                    v.laudedCount =  v.laudedCount-1;
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })

              }
          }
      }else {
        this.sheetVisible =true;
      }
    },
    commentariesClick(v){ //评论去的点赞 第一级的赞
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(this.NativeState == 'XCX'){
          if(!data){
              Toast("您还未登录，请登录！");
              setTimeout(()=>{
                this.$router.push({path:"/login"})
              },1000)
          }else{
              if(v.lauded == false){ //点赞
                v.lauded = true;
                commentlaudComment(v.id,data.data.access_token).then(res=>{
                  if(res.status==true){
                     Toast("点赞成功")
                    v.laudedCount =  v.laudedCount+1;
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else {  //取消赞
                v.lauded = false;
                commentCancelLaudComment(v.id,data.data.access_token).then(res=>{
                  if(res.status==true){
                    Toast("取消点赞")
                    v.laudedCount =  v.laudedCount-1;
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })

              }
          }
      }else {
        this.sheetVisible =true;
      }
    },
    fabulousClick(){//点击的赞
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(this.NativeState == 'XCX'){
          if(!data){
              Toast("您还未登录，请登录！");
              setTimeout(()=>{
                this.$router.push({path:"/login"})
              },1000)
          }else{
            this.lauded = !this.lauded;
            if(this.lauded ==true){ //没点赞的
               informationLaudInformation(this.detailId,data.data.access_token).then(res=>{

                 if(res.status == true){
                    Toast("点赞成功")
                     this.fabulousNum = this.fabulousNum+1;
                     this.fabulousMessage = "已赞"
                 }else{
                   Toast("网络出错了，请重试")
                 }
               })
             }else {//点赞的了
               informationCancelLaudInformation(this.detailId,data.data.access_token).then(res=>{
                 if(res.status == true){
                   Toast("取消点赞")
                   this.fabulousNum = this.fabulousNum-1;
                   this.fabulousMessage = "赞"
                 }else{
                   Toast("网络出错了，请重试")
                 }
               })
             }
          }

      }else{
        this.sheetVisible =true;
      }
    },
    giveClick(){ //下载IOS 或则安卓
      this.sheetVisible =true;
    },
    isXCXClick(){ //点击关注  是不是公总号 是就登录 不是就下载
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(this.NativeState == 'XCX'){
        this.sheetVisible =false;
        if(!data){
          Toast("您还未登录，请登录！");
          setTimeout(()=>{
            this.$router.push({path:"/login"})
          },1000)

        }else {
          if(this.orgId == "2"){ //个人
            if(this.cared == false){ //没有关注

              commonUserCareUser(this.userId,data.data.user_id,this.orgId,data.data.access_token).then(res=>{
//                console.log(res,"skdkkfsdk")
                if(res.data.status == true){
                  Toast("关注成功")
                  this.cared = true;
                  this.followMessage = "已关注";
                }else{
                  Toast("网络出错了，请重试")
                }
              })
            }else{ //已经关注 就取消关注
              commonUserCancelCareUser(this.userId,data.data.user_id,this.orgId,data.data.access_token).then(res=>{

                if(res.data.status == true){
                  Toast("关注已取消")
                  this.cared = false;
                  this.followMessage = "+ 关注";
                }else{
                  Toast("网络出错了，请重试")
                }
              })
            }
          }else if(this.orgId == "1"){  //企业
              if(this.cared == false){ //没有关注  //固定传2

                companyInfoCareCompany(this.userId,data.data.user_id,this.orgId,'2',data.data.access_token).then(res=>{
                  if(res.data.status == true){
                    Toast("关注成功")
                    this.cared = true;
                    this.followMessage = "已关注";
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else{ //已经关注 就取消关注  //固定传2
                companyInfoCancelCareCompany(this.userId,data.data.user_id,'2',data.data.access_token).then(res=>{

                  if(res.data.status == true){
                    Toast("关注已取消")
                    this.cared = false;
                    this.followMessage = "+ 关注";
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }
          }else{
            Toast("网络出错了，请重试")
          }

        }

      }else{
        this.sheetVisible =true;
      }

    },
    authorClcik(v){//点击头像
      if(v.orgId=='2'){ //2是个人
        if(v.vUser==false){ //去吃瓜
          this.$router.push({path:"/personalMelonPages",query:{id:v.createdUser}})
        }else{//去大咖
          this.$router.push({path:"/bigShotPage",query:{id:v.createdUser}})//1  true是大咖个人
        }
      }else{//企业
        this.$router.push({path:"/enterprisePage",query:{id:v.createdUser}})//1 是大咖企业
      }
    },
    query(v,v1,v2){

      informationId(v,v1,v2).then(res=>{
        if(res.status == true){
          this.boxShow = true;
          this.orgId = res.data.orgId;
          this.userId = res.data.createdUser;
          this.titleName = res.data.sysUserContentVo.name;
          this.messageArr = res.data;
          this.cared =res.data.cared;
          this.lauded =res.data.lauded;
          this.fabulousNum = res.data.laudedCount;
          if(this.lauded == true){
            this.fabulousMessage = "已赞"
          }else{
            this.fabulousMessage = "赞"
          }
          if(this.cared == false){
            this.followMessage = "+ 关注";
          }else{
            this.followMessage = "已关注";
          }
          if(res.data.sysUserContentVo.userDp){
            this.userDp = res.data.sysUserContentVo.userDp;
          }

        }else{
          Toast("网络出错了，请重试")
          this.boxShow = false;
        }
      })
      findCommentsByInfoId(v,this.p,this.s).then(res=>{ //7
        if(res.status==true){

          res.data.forEach((item,index)=>{
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
          this.pageNum = Math.ceil(res.total/this.s);
          if(this.pageNum >1){
            this.message = "点击加载更多..."
          }else{
            this.message = "这是我的底线..."
          }
          this.commenArr = res.data;
        }else{
          this.message = "数据出错啦！"
          Toast("网络出错了，请重试")
        }
      })
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        findCommentsByInfoId(this.detailId,this.p,this.s).then(res=>{
          if(res.status == true){
              res.data.forEach((item,index)=>{
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
            this.commenArr = this.commenArr.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        findCommentsByInfoId(this.detailId,this.p,this.s).then(res=>{
          if(res.status == true){
            res.data.forEach((item,index)=>{
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
            this.commenArr =  this.commenArr.concat(res.data);
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
 #IntelligentMatchingD{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom: 0;
   overflow-y: auto;
    background-size: 100% 100%;
   background: #FFFFFF;
   /*padding:0.15rem;*/
   /*box-sizing: border-box;*/
   .IntelligentMatchingDHeader{
     width: 100%;
     padding:0.15rem;
     box-sizing: border-box;
     h3{
       font-size:0.17rem;
       font-family:PingFangSC-Medium;
       font-weight:500;
       color:rgba(5,5,9,1)
     }
     .IntelligentMatchingDHeaderIndex{
       width: 100%;
       font-size:0.12rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(153,153,153,1);
       margin: 0.15rem 0;
     }
     .IntelligentMatchingDHeaderIndex1{
       width: 100%;
       img{
         display: block;
         width: 100%;
       }
     }
     .IntelligentMatchingDHeaderIndex2{
       width: 100%;
       margin: 0.15rem 0;
       height: 0.64rem;
       position: relative;
       display: flex;
       img{
         display: inline-block;
         width: 0.5rem;
         height: 0.5rem;
         border-radius: 50%;
         margin-right: 0.05rem;
       }
       >div{
         width: 2rem;
         height: 0.64rem;
         p{
           font-weight: 900;
           font-size: 0.12rem;
           line-height: 0.2rem;
           overflow: hidden;
           word-break:break-all;
           text-overflow: ellipsis;
           display: -webkit-box;
           -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
         }
         span{
           color:rgba(102,102,102,1);
           font-size: 0.1rem;
           line-height: 0.2rem;
         }
       }
       button{
         position: absolute;
         right: 0;
         top: 0.1rem;
         width: 0.7rem;
         height: 0.3rem;
         line-height: 0.3rem;
         border: 0;
         background:#050509;
         border-radius:0.05rem;
         color: #FFFFFF;
         outline: none;
       }
     }
     .IntelligentMatchingDHeaderIndex3{
       width: 100%;
       padding: 0.2rem;
       box-sizing: border-box;
       background:rgba(5,5,9,0.05);
       border-radius:0.01rem;
       font-size:0.13rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(5,5,9,1);
       img{
        display: inline-block;
         width: 0.22rem;
         height: 0.18rem;
       }
     }
   }
   .IntelligentMatchingDItem{
     width: 100%;
     padding:0.15rem;
     box-sizing: border-box;
     h5{
       width: 100%;
       font-size:0.14rem;
       font-family:PingFangSC-Medium;
       font-weight:900;
       color:rgba(5,5,9,1);
       line-height:0.24rem;
       /*height: 0.42rem;*/
       span{
         display: inline-block;
         width: 0.04rem;
         height: 0.14rem;
         background:rgba(5,5,9,1);
         margin-right: 0.11rem;
       }

     }
     .IntelligentMatchingDItemIndex{
       width: 100%;
       font-size:0.14rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(5,5,9,1);
       line-height: 0.28rem;
       margin-bottom: 0.1rem;
       word-break:break-all;
       img{
         display: block;
         width: 100%;
         margin-top: 0.1rem;
       }
     }
     .IntelligentMatchingDItemIndex1{
       width: 100%;
       img{
         display: block;
         width: 100%;
       }
     }
   }
   .IntelligentMatchingDItem1{
     width: 1.53rem;
     height: 0.4rem;
     margin: 0.15rem auto;
     background:url(../../../static/images/zan.png);
     background-size: 100% 100%;
     text-align: center;
     line-height: 0.4rem;
     font-size:0.15rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(5,5,9,1);
     img{
       display: inline-block;
       width: 0.17rem;
       height: 0.17rem;
       margin: 0.1rem 0.1rem 0 0  ;
     }
   }
   .IntelligentMatchingDItem2{
     width: 60%;
     margin: 0 auto;
     text-align: center;
     position: relative;
     img{
       display: inline-block;
       position: absolute;
       left: 0;
       top: 0.15rem;
     }
     text-align: center;
     font-size:0.14rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     line-height:0.35rem;
   }
   .IntelligentMatchingDItem3{
     width: 100%;
     text-align: center;
     font-size:0.12rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     line-height:0.35rem;
   }
   .IntelligentMatchingDItem4{
     width: 100%;
     margin:0.15rem 0;
     height:0.01rem;
     background:  rgba(220,220,220,1)
   }
   >.IntelligentMatchingDItem5{
     width: 92%;
     margin: 0 auto;
     margin-bottom: 0.15rem;
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
   .IntelligentMatchingDItem6{
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
   }
   .messageFoot{
     width: 100%;
     height: 0.3rem;
     line-height: 0.3rem;
     color: rgba(5,5,5,0.3);
     text-align: center;
     margin-top: 0.1rem;
   }
 }


</style>
