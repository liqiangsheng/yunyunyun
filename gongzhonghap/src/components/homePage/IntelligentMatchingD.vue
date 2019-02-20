<template>
  <div id="articleDetails">
    <!--加载成功显示-->
     <div class="articleDetails_content" v-show="boxShow">
       <!--标题-->
         <h5 class="articleDetails_content_h5">{{messageArr.title}}</h5>
       <!--标签-->
         <div class="articleDetails_content_tagName" v-if="!!messageArr.contentTagVoList&&messageArr.contentTagVoList.length>0">
           <span>{{messageArr.tarName}}</span>
         </div>
       <!--banner图片-->
       <div class="IntelligentMatchingDHeaderIndex1" v-if="!!messageArr.bannerDetailUrl">
         <img :src="messageArr.bannerDetailUrl" alt="">
       </div>
       <!--导语，关注-->
       <div class="articleDetails_content_Introducer">
           <div class="IntelligentMatchingDHeaderIndex2">
             <img :src="userDp" alt="" @click="authorClcik(messageArr)">
             <div>
               <p>{{titleName}}</p>
               <span>{{messageArr.createdAt|formatTime}}</span>
             </div>
             <button @click="isXCXClick">{{followMessage}}</button>
           </div>
         <!--摘要-->
          <div class="IntelligentMatchingDHeaderIndex3" v-if="messageArr.summary">
           <img src="../../assets/images/shuangying1.png" alt="" style="margin: 0 0.1rem">
           {{messageArr.summary}}
           <img src="../../assets/images/shuangying.png" alt="" style="margin: 0 0.1rem">
         </div>
       </div>
       <!--内容-->
       <div class="IntelligentMatchingDItem" v-for="(item,index) in messageArr.informationChildrenTitleVoList" v-if="boxShow">
         <h5 v-if="!!item.titleName"><span></span>/　{{item.titleName}}　/</h5>
         <div class="IntelligentMatchingDItemIndex" v-for="(item1,index1) in item.titleInformationList">
           <span v-if="!!item1.titleInformation">{{item1.titleInformation}}</span>
           <img v-if="!!item1.titleImg" :src="item1.titleImg" alt="">
         </div>
       </div>
       <!--点赞-->
       <div class="IntelligentMatchingDItem1" @click="fabulousClick" v-if="fabulousMessage=='已赞'" style="background:#FF8E74;border-radius: 0.48rem">
         <img src="../../assets//images/zan1.png" alt="">{{fabulousNum}} {{fabulousMessage}}
       </div>
       <div class="IntelligentMatchingDItem1" @click="fabulousClick" v-if="fabulousMessage=='赞' ">
         <img src="../../assets//images/zan1.png" alt="">{{fabulousNum}} {{fabulousMessage}}
       </div>
       <!--版权-->
       <div class="IntelligentMatchingDItem2">
         <img src="/static/images/banqun.png" alt="">版 权
       </div>
       <!--版权解释-->
       <div class="IntelligentMatchingDItem3">
         <span v-if="messageArr.isOriginal==1">本文版权归不同科技所有 / 未经许可不得转载或翻译</span>
         <span v-if="messageArr.isOriginal==0"><span v-if="!!messageArr.fromReprint">转载自：{{messageArr.fromReprint}} </span><span v-if="!!messageArr.source">/ 文章来源：{{messageArr.source}} </span><span v-if="!!messageArr.author">/ 作者：{{messageArr.author}}</span></span>
       </div>
      <!--评论-->
       <div v-if="commenArr.length<=0" style="height: 0.2rem"></div>
       <ul class="IntelligentMatchingDItem5" v-if="commenArr.length>0">
         <li v-for="(item,index) in commenArr" v-if="!!item.sysUserContentVo">
           <div class="IntelligentMatchingDItemL" @click="commentGoHomepage(item)">
             <img :src="item.userDp" alt="" @click="giveClick">
           </div>
           <div class="IntelligentMatchingDItemR">
             <h5>{{item.name}}</h5>
             <div class="time">{{item.createdAt|formatTime1}}</div>
             <div class="commen">
               {{item.commentContent}}
               <div class="zan1" @click="commentariesClick(item)"><img src="../../assets/images/zan1.png" alt="">{{item.laudedCount}}</div>
             </div>
             <ul class="ReplyUl" v-if="item.replyVoList.length>0">
               <li v-for="(item1,index1) in item.replyVoList"  class="ReplyLi">
                 <span><span v-if="item1.sysUserContentVo.name">{{item1.sysUserContentVo.name}}@</span>{{item1.replyCommentName}}:</span>{{item1.replyContent}} <div @click="commentariesClickTwo(item1)"><img src="../../assets/images/zan1.png" alt=""> {{item1.laudedCount}}</div>
               </li>
               <span style="width: 100%;display: inline-block;text-align: center" v-if="item.replyListTotal>2" @click="nextPageClick(item)">共有{{item.replyListTotal}}条评论</span>
             </ul>
           </div>
         </li>
       </ul>
       <!--加载更多-->
       <div class="messageFoot" @click="updataMore" v-if="message!=''">
         {{message}}
       </div>
     </div>
    <!--底部按钮-->
      <div class="articleDetails_foot" @click="giveClick" v-show="boxShow">
           <div>
             你此刻的想法...
           </div>
          <ul>
            <li class="footerLi2">
              <img src="/static/images/shoucang1.svg" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/guanzhuyueduliang.svg" alt="">
            </li>
            <!--<li class="footerLi2">-->
              <!--<img src="../../assets/images/bianxie.png" alt="">-->
            <!--</li>-->
          </ul>
      </div>
      <div class="gobackTop" @click="gobackTop" v-show="boxShow">
       顶部
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
      boxShow:false,//初始化数据成功
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
  },
  methods:{
    gobackTop(){//回到顶部
      document.querySelector(".articleDetails_content").scrollTop =0;
    },
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
      shareInfoShareUrl(location.href.split('#')[0].toString()).then(res=>{
//      console.log(this.messageArr,"this.messageArr")
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
                  this.followMessage = "取消关注";
                }else{
                  Toast("网络出错了，请重试")
                }
              })
            }else{ //已经关注 就取消关注
              commonUserCancelCareUser(this.userId,data.data.user_id,this.orgId,data.data.access_token).then(res=>{

                if(res.data.status == true){
                  Toast("关注已取消")
                  this.cared = false;
                  this.followMessage = "关注";
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
                    this.followMessage = "取消关注";
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else{ //已经关注 就取消关注  //固定传2
                companyInfoCancelCareCompany(this.userId,data.data.user_id,'2',data.data.access_token).then(res=>{

                  if(res.data.status == true){
                    Toast("关注已取消")
                    this.cared = false;
                    this.followMessage = "关注";
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
          let tarName = [];
          this.messageArr = res.data;
          if(res.data.contentTagVoList&&res.data.contentTagVoList.length>0){
            res.data.contentTagVoList.map((item,index)=>{
               tarName.push(item.tagName)
            })
          }else{
            tarName = [];
          }
          this.messageArr.tarName = tarName.join(' | ');//标签转换
          this.cared =res.data.cared;
          this.lauded =res.data.lauded;
          this.fabulousNum = res.data.laudedCount;
          if(this.lauded == true){
            this.fabulousMessage = "已赞"
          }else{
            this.fabulousMessage = "赞"
          }
          if(this.cared == false){
            this.followMessage = "关注";
          }else{
            this.followMessage = "取消关注";
          }
          if(res.data.sysUserContentVo.userDp){
            this.userDp = res.data.sysUserContentVo.userDp;
          }
          this.share();

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
          if(res.data.length<=0){
            this.message = ""
          }else if(res.data.length>0&&this.pageNum >1){
            this.message = "点击加载更多..."
          }else{
            this.message = "这是我的底线..."
          }
          this.commenArr = res.data;
          this.share();
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
#articleDetails{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  overflow: hidden;
  .articleDetails_content{
    position: absolute;
    left: 0;
    bottom:0.7rem;
    right: 0;
    top: 0;
    overflow-y: scroll;
    padding: 0.2rem 0.2rem 0 0.2rem;
    box-sizing: border-box;
    .articleDetails_content_h5{
      font-size:0.2rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(38,38,40,1);
      line-height:0.28rem;
       text-align: center;
    }
    .articleDetails_content_tagName{
      margin-top: 0.06rem;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#c5c5c6;
      line-height:0.17rem;
      text-align: center;
    }
    .IntelligentMatchingDHeaderIndex1{
      width: 100%;
      margin: 0.18rem 0 0.21rem 0;
    }
    .articleDetails_content_Introducer{
      width: 100%;
      background:rgba(246,246,246,1);
      padding: 0.19rem 0.2rem 0.33rem 0.2rem;
      box-sizing: border-box;
      margin-bottom: 0.27rem;
      .IntelligentMatchingDHeaderIndex2{
        width: 100%;
        margin: 0.15rem 0;
        height: 0.56rem;
        position: relative;
        display: flex;
        border-bottom: 0.01rem solid rgba(38,38,40,0.1);
        padding-bottom: 0.06rem;
        img{
          display: inline-block;
          width: 0.38rem;
          height: 0.38rem;
          border-radius: 50%;
          margin-right: 0.05rem;
          border: 0.02rem solid #fce76c;
        }
        >div{
          width: 2rem;
          height: 0.64rem;
          p{
            padding-top: 0.04rem;
            font-size:0.14rem;
            font-weight:700;
            color:rgba(38,38,40,1);
            overflow: hidden;
            word-break:break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height:0.18rem;
            margin-bottom: 0.04rem;
          }
          span{
            color:rgba(102,102,102,1);
            font-size:0.13rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(197,197,198,1);
            line-height:0.18rem;
          }
        }
        button{
          position: absolute;
          right: 0;
          top: 0.07rem;
          width: 0.8rem;
          height: 0.32rem;
          line-height: 0.3rem;
          border: 0.02rem solid #262626;
          border-radius:0.48rem;
          font-size: 0.14rem;
          font-weight: 900;
          color: #262626;
          outline: none;
          background: 0;
        }
      }
      .IntelligentMatchingDHeaderIndex3{
        width: 100%;
        padding-top: 0.07rem;
        box-sizing: border-box;
        font-size:0.15rem;
        font-weight:500;
        color:rgba(38,38,40,1);
        line-height:21px;
        img{
          display: inline-block;
          width: 0.11rem;
          height: 0.09rem;
        }
      }
    }
    .IntelligentMatchingDItem{
      width: 100%;
      padding-bottom: 0.2rem;
      box-sizing: border-box;
      h5{
        width: 100%;
        font-size:0.15rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(5,5,9,1);
        line-height:0.21rem;
        text-align: center;
        word-break:break-all;
        margin-bottom: 0.1rem;
      }
      .IntelligentMatchingDItemIndex{
        width: 100%;
        font-size:0.15rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(103,103,104,1);
        line-height: 0.28rem;
        /*margin-bottom: 0.1rem;*/
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
      line-height:0.25rem;
    }
    .IntelligentMatchingDItem3{
      width: 100%;
      text-align: center;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:0.2rem;
    }
    .IntelligentMatchingDItem5{
      width: 100%;
      border-top:0.01rem solid #EAEAEA ;
      margin-top: 0.2rem;
      >li{
        width: 100%;
        padding: 0.15rem 0;
        border-bottom: 0.01rem solid rgba(220,220,220,1);
        display: flex;
        >.IntelligentMatchingDItemL{
          width: 0.38rem;
          height: 0.43rem;
          >img{
            display: block;
            width: 0.38rem;
            height: 0.38rem;
            border-radius: 50%;
            margin-top: 0.05rem;
          }
        }
        .IntelligentMatchingDItemR{
          /*flex: 1;*/
          width: 100%;
          padding-left: 0.1rem;
          box-sizing: border-box;
          h5{
            width: 100%;
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            line-height:0.24rem;
            margin-top: 0.05rem;
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
              color: #262628;
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
    .messageFoot{
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      color: rgba(5,5,5,0.3);
      text-align: center;
      margin-top: 0.1rem;
    }
  }
  .articleDetails_foot{
     position: absolute;
      left: 0;
      bottom: 0;
    right: 0;
      height: 0.7rem;
      background: #ffffff;
       padding: 0.15rem 0.2rem;
      box-sizing: border-box;
     >div{
      float: left;
       width: 70%;
       height: 0.38rem;
       border-radius:1rem;
       border:0.01rem solid rgba(224,224,224,1);
       line-height: 0.38rem;
       text-indent: 0.2rem;
       font-size:0.12rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(38,38,40,1);
     }
    >ul{
      width: 29%;
      float: left;
      display: flex;
      li{
        flex: 1;
        padding-top: 0.1rem;
        img{
          float: right;
          display: block;
          width: 0.21rem;
          height: 0.2rem;
          margin: 0 auto;
        }
      }
    }
  }
  .gobackTop{
    position: fixed;
    right: 0.05rem;
    bottom: 0.7rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: rgba(5,5,5,0.3);
    text-align: center;
    line-height: 0.4rem;
    color: #ffffff;
  }
}


</style>
