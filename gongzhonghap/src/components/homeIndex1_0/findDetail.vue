<template>
  <!--关注-->
  <div id="followDetail">
    <div v-for="(item,index) in listData">
       <div class="followDetail_top">
              <img :src="item.authorInfo?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="" @click="headerClick(item)">
              <p>{{item.authorInfo?item.authorInfo.name:"null"}}</p>
              <div v-if="item.authorInfo&&item.authorInfo.caredStatus==0&&userInfo.data.id!=item.authorInfo.id" @click="follow(item)">关注</div>
              <div v-if="item.authorInfo&&item.authorInfo.caredStatus==1&&userInfo.data.id!=item.authorInfo.id" class="active" @click="cancelFollow(item)">取消关注</div>
       </div>
        <v-touch class="followDetail_bottom" @scroll="updataMore">
             <div class="followDetail_bottom_img" >
                 <ul ref="windwosWH" :style="{width:styleWidth}" v-if="item.attachments.length>1" class="followDetail_bottom_ul">
                   <li v-for="(item1,index1) in item.attachments" style="margin-right: 0.2rem">
                      <img :src="item1.url+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" :style="{height:item.attachments[0].height/2/100-1.5+'rem'}" v-if="item.attachments[0].height>900"/>
                      <img :src="item1.url+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" :style="{height:item.attachments[0].height/2/100+'rem'}" v-else/>
                     <div class="biaoqian" v-for="(item2,index2) in item1.anchors" :style="{left:item2.axesxRate*335/100+'rem',top:item2.axesyRate*imgH/100+'rem'}">
                       <img src="/static/images/biaoqian.png" alt=""><span>{{item2.title}}</span>
                     </div>
                   </li>
                 </ul>
               <!--leng==1-->
               <ul ref="windwosWH" :style="{width:styleWidth,margin:'0 auto','box-sizing':'border-box'}" v-if="item.attachments.length<=1">
                 <li v-for="(item1,index1) in item.attachments">
                   <img :src="item1.url+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" />
                   <div class="biaoqian" v-for="(item2,index2) in item1.anchors" :style="{left:item2.axesxRate*335/100+'rem',top:item2.axesyRate*imgH/100+'rem'}">
                     <img src="/static/images/biaoqian.png" alt=""><span>{{item2.title}}</span>
                   </div>
                 </li>
               </ul>
             </div>
          <div style="width: 100%;background: #ffffff;padding-top: 0.2rem">
              <div class="followDetail_bottom_concent">
                {{item.content}}
              </div>
          </div>
          <div style="width: 100%;background: 100%">
            <div class="follow_login_Follow_li4">
              <div @click="giveClick">
                   <img src="/static/images/guanzhuyueduliang.png" alt="">  {{item.commentedCount<10000?item.commentedCount:(item.commentedCount/10000).toFixed(2)+'万'}}
              </div>
              <div @click="laudedStatus(item)">
                   <img src="/static/images/dianzan2.png" alt="" v-if="item.laudedStatus==true">
                  <img src="/static/images/dianzan.png" alt="" v-else>
                  {{item.laudedCount<10000?item.laudedCount:(item.laudedCount/10000).toFixed(2)+'万'}}
              </div>
              <div @click="favoredStatus(item)">
                  <img src="/static/images/shoucang2.png" alt="" v-if="item.favoredStatus==true">
                  <img src="/static/images/shoucang1.png" alt="" v-else>
                  {{item.favoredCount<10000?item.favoredCount:(item.favoredCount/10000).toFixed(2)+'万'}}
              </div>
              <div>
                  <img src="/static/images/liulangshu.svg" alt="">
                  {{item.readCount<10000?item.readCount:(item.readCount/10000).toFixed(2)+'万'}}
              </div>

            </div>
          </div>
          <!--评论-->
          <ul class="IntelligentMatchingDItem5">
              <li v-if="commenArr.length<=0" class="commentNo">
                <img src="/static/images/yuanchuan.png" alt="">
                <p>暂无评论</p>
              </li>
              <li v-for="(item,index) in commenArr" v-if="commenArr.length>0" class="commentYes">
                  <div class="IntelligentMatchingDItemL">
                     <img :src="item.userDp" alt="" @click="commentGoHomepage(item)">
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
           <div class="messageFoot" v-if="!!message&&commenArr.length>0">
             {{message}}
           </div>
        </v-touch>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Actionsheet } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
  import wxShare from "../../assets/js/wxShare"
  import {shareInfoShareUrl,commentFindCommentsByPubId,customerPubContentFindOne,customerPubContentLaudContent,customerPubContentCancelLaudContent,customerPubContentFavorContent,customerPubContentCancelFavorContent,commentlaudComment,commentCancelLaudComment,replylaudReply,replyCancelLaudReply,commonUserCareUser,commonUserCancelCareUser,companyInfoCareCompany,companyInfoCancelCareCompany } from '../../assets/js/promiseHttp'; //数据

  export default {
  name: 'follow',
  data(){
    return{
      styleWidth:"3.35rem",
      commenArr:[], //评论的数据
      p:1,  //页
      s:20, //每页多少
      message:"", //触底提示
      pageNum:"",//每页数据
      state:"", //是不是小程序 是的话就不显示
      actions:[{ name:"请下载不同Tech App" },{ name:"iOS",method:this.IOS },{ name:"Android",method:this.Android }],//下载地址
      sheetVisible:false, //弹框提示
      headerTab:["发现","关注"], //tab
      headerTabIndex:1,//是关注还是发现
      userInfo:{}, //用户信息
      LoginShow:false, //登录没登录
      followIsShow:false, //关注的人未发布作品
      listData:[],//数据
      imgW:320,
      imgH:350,
    }
  },
  created() {

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):{data:{user_id:"",userType:""}};
//    this.userInfo = {data:{currentUser:this.$router.history.current.query.currentUser,id:this.$router.history.current.query.id,access_token:this.$router.history.current.query.token,userType:this.$router.history.current.query.userType,}}
//    if(this.userInfo){ //登录的情况  //
//    }else{//没有登录的情况
//
//    }

    if(this.$router.history.current.query.id){ //这个id请求数据 截取url的
      customerPubContentFindOne(this.$router.history.current.query.id,this.userInfo.data.user_id,this.userInfo.data.userType).then(res=>{
        if(res.status == true){

          let arrdata = [res.data];
          arrdata.forEach((item,index)=>{
            item.laudedCount = !!item.laudedCount?item.laudedCount:0;
            item.favoredCount = !!item.favoredCount?item.favoredCount:0;
            item.readCount = !!item.readCount?item.readCount:0;
            item.commentedCount = !!item.commentedCount?item.commentedCount:0;
            setTimeout(()=>{
              if(item.attachments.length>1){
                this.$nextTick(()=>{
                this.styleWidth =(335+20)*item.attachments.length/100+"rem";
                })
              }else{
                this.$nextTick(()=>{
                this.styleWidth =335*item.attachments.length/100+"rem"
                })
              }

            },10)
          })
          this.listData = arrdata;
          console.log(this.listData,"this.listData")
              this.$nextTick(()=>{
                console.log(this.$refs)
                setTimeout(()=>{
                  this.imgW = this.$refs.windwosWH?this.$refs.windwosWH[0].offsetWidth:"375";
                  this.imgH =  this.$refs.windwosWH?this.$refs.windwosWH[0].offsetHeight:"350";
                },200)
            })
        }else{
          Toast("网络出错了，请重试")
        }
      })
      commentFindCommentsByPubId(this.$router.history.current.query.id,this.p,this.s).then(res=>{ //评论
//        console.log(res)
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
              this.message = ""
            }else{
              this.message = "这是我的底线..."
            }
            this.commenArr = res.data.data;
          }else{
            this.commenArr = res.data.data;
          }

        }else{
          Toast("网络出错了，请重试")
        }
      })
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
      if(v.orgId=='2'){ //个人
        if(v.vUser==false){ //去吃瓜
          this.$router.push({path:"/personalMelonPages",query:{id:v.createdUser}})
        }else{//去大咖
          this.$router.push({path:"/bigShotPage",query:{id:v.createdUser}})//1  true是大咖个人
        }
      }else if(v.orgId=='1'){ //企业
        this.$router.push({path:"/enterprisePage",query:{id:v.createdUser}})//1 是大咖企业
      }else {
        Toast("后台参数错误")
      }
    },

    share(){//分享

      let url = "http://account.butongtech.com/"
      shareInfoShareUrl(location.href.split('#')[0].toString()).then(res=>{
        console.log(res,"分享")
         if(res.status==true){
           let obj = {
             title:this.listData[0].title,
             desc:this.listData[0].content,
             url:"http://account.butongtech.com/index.html#/findDetail?id="+this.$router.history.current.query.id,
             imgUrl:this.listData[0].authorInfo?this.listData[0].authorInfo.ownerUrl:'https://pub.qinius.butongtech.com/ios1024x1024%E6%A1%8C%E9%9D%A2%E5%9B%BE%E6%A0%87.png',
           }
           wxShare.wxShare(res.data,obj)
         }else{
           Toast("网络出错了，请重试")
         }
      })
    },
    cancelFollow(v){ //取消关注
      v.favoredStatus = false;
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(!data){
        Toast("您还未登录，请登录！");
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }else{
        if(v.authorInfo.userType== "1"){ //企业
          companyInfoCancelCareCompany(v.authorInfo.id,data.data.id,v.authorInfo.userType,data.data.access_token).then(res=>{
            if(res.data.status==true){
              Toast("关注已取消")
              v.authorInfo.caredStatus =0;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else if(v.authorInfo.userType == "2"){  //个人
          commonUserCancelCareUser(v.authorInfo.id,data.data.id,v.authorInfo.userType,data.data.access_token).then(res=>{
            if(res.data.status==true){
              Toast("关注已取消")
              v.authorInfo.caredStatus =0;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
      }
    },
   follow(v){ //关注
//     console.log(v)
     let data = JSON.parse(localStorage.getItem("userInfo"));
     if(!data){
       Toast("您还未登录，请登录！");
       setTimeout(()=>{
         this.$router.push({path:"/login"})
       },1000)
     }else{
       if(v.authorInfo.userType== "1"){ //企业
         companyInfoCareCompany(v.authorInfo.id,data.data.id,v.authorInfo.userType,data.data.access_token).then(res=>{
           if(res.data.status==true){
             Toast("关注成功")
             v.authorInfo.caredStatus = 1;
           }else{
             Toast("网络出错了，请重试")
           }
         })
       }else if(v.authorInfo.userType == "2"){  //个人
         commonUserCareUser(v.authorInfo.id,data.data.id,v.authorInfo.userType,data.data.access_token).then(res=>{
           if(res.data.status==true){
             Toast("关注成功")
             v.authorInfo.caredStatus = 1;
           }else{
             Toast("网络出错了，请重试")
           }
         })
       }
     }
   },
    commentariesClickTwo(v){ //评论去的点赞 第二级级的赞
      let data = JSON.parse(localStorage.getItem("userInfo"));
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
                Toast("点赞已取消")
                v.laudedCount =  v.laudedCount-1;
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }
        }
    },
    commentariesClick(v){ //评论去的点赞 第一级的赞
      let data = JSON.parse(localStorage.getItem("userInfo"));
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
                 Toast("点赞已取消")
                v.laudedCount =  v.laudedCount-1;
              }else{
                Toast("网络出错了，请重试")
              }
            })

          }
        }
    },
    nextPageClick(v){ //去下一页数据
//      console.log(v);
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(data){
        sessionStorage.setItem("nextPageDetail",JSON.stringify(v));
        this.$router.push({path:"/IntelligentComment",query:{id:v.id,token:data.data.access_token}})
      }else{
        Toast("您还未登陆，请登陆！")
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }

    },
    laudedStatus(v){ // 点赞
//      console.log(v)
      let data = JSON.parse(localStorage.getItem("userInfo"));
//      console.log(data,"fdhsjkfks")
      if(data){
        v.laudedStatus = !v.laudedStatus
          if(v.laudedStatus == true){ //点赞
          customerPubContentLaudContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{
//            console.log(res)
            if(res.status == true){
              Toast("点赞成功")
              v.laudedCount = v.laudedCount+1
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else { //取消点赞
          customerPubContentCancelLaudContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{
            if(res.status == true){
              Toast("点赞已取消")
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
              Toast("收藏成功")
              v.favoredCount = v.favoredCount+1
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else { //取消点赞
          customerPubContentCancelFavorContent(this.$router.history.current.query.id,data.data.access_token).then(res=>{
            if(res.status == true){
              Toast("收藏已取消")
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
    headerClick(v){//点击头像 去吃瓜页 或则设计师主页 或者企业
         if(v.authorInfo.userType=="2"){ //个人
             if(v.authorInfo.vUser==0){ //去吃瓜
               this.$router.push({path:"/personalMelonPages",query:{id:v.authorInfo.id}})
             }else{//去大咖
               this.$router.push({path:"/bigShotPage",query:{id:v.authorInfo.id}})//1  true是大咖个人
             }
         }else{ //企业
           this.$router.push({path:"/enterprisePage",query:{id:v.authorInfo.id}})//1 是大咖企业
        }
    },

    giveClick(){ //下载IOS 或则安卓
      this.sheetVisible =true;
    },
    IOS(){
      location.href="https://itunes.apple.com/cn/app/id1439775835"
    },
    Android(){
      location.href="https://www.pgyer.com/designcloud"
    },
    updataMore(e){ //加载更多 分页
      if(e.target.scrollTop>=(e.target.scrollHeight-e.target.clientHeight)){
        this.p++;
        if(this.p>this.pageNum){
          this.message = "这是我的底线..."
          return;
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
        this.message = ""
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
      }
    },
  }
}

</script>

<style scoped lang="less">
#followDetail {
 width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top:0;
  background: #ffffff;
  >div{
   height: 100%;
    width: 100%;
    position: relative;
    .followDetail_top{
      width: 100%;
      height:1.48rem;
      background: #FCE76C;
      overflow:hidden;
      padding-top: 0.25rem;
      position: relative;
      >img{
        display: block;
        float: left;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        margin-left: 0.2rem;
      }
      >p{
        display: block;
        float: left;
        width: 1.79rem;
        height: 0.4rem;
        padding-left: 0.11rem;
        line-height: 0.4rem;
        letter-spacing:0.01rem;
        font-size:0.14rem;
        font-family:Roboto-Bold;
        font-weight:bold;
        color:rgba(38,38,40,1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      >div{
        width: 0.76rem;
        height: 0.32rem;
        border: 0.02rem solid #262626;
        border-radius:0.24rem;
        text-align: center;
        line-height: 0.32rem;
        position: absolute;
        right: 0.2rem;
        top: 0.25rem;
        font-size:0.14rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(38,38,40,1)
      }
      /*>div.active{*/
        /*border: 0.02rem solid #c5c5c6;*/
        /*color:#c5c5c6;*/
      /*}*/
    }
    .followDetail_bottom{
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0.88rem;
      right: 0;
      overflow: hidden;
      overflow-y: scroll;
      .followDetail_bottom_img{
        width: 100%;
        overflow-x: scroll;
        box-shadow:0px 0.4rem 0.4rem 0px rgba(0,0,0,0.05);
        ul{
          height: 100%;
          overflow-x: scroll;
          li{
            float: left;
            background: #ffffff;
            position: relative;
            overflow: hidden;
            >img{
              display: block;
              width: 3.35rem;
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
                /*padding: 0 0.05rem;*/
                background: rgba(5,5,9,0.4);
                color: #ffffff;
                border-radius: 0.2rem;
                border: 0.01rem solid #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.1rem;
                font-weight: 100;
              }
            }
          }
        }
      }
      .messageFoot{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        color: rgba(5,5,5,0.3);
        text-align: center;
      }
    }
    .followDetail_bottom_concent{
      width: 3.02rem;
      margin: 0 auto;
      font-size:0.14rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#676768;
      line-height: 0.24rem;
      margin-top: 0.27rem;
      word-break: break-all;
      letter-spacing:0.01rem;
      background: #ffffff;
    }
     .follow_login_Follow_li4{
      width: 3.02rem;
       margin: 0 auto;
      display: flex;
      padding: 0.2rem 0;
       height: 0.55rem;
      box-sizing: border-box;
      >div{
        flex: 1;
        font-size:0.14rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(5,5,9,1);
        line-height: 0.18rem;
        img{
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.05rem;transform: translateY(0.02rem);
        }
      }
       >div:last-of-type{
         text-align: right;
       }
    }
    .IntelligentMatchingDItem5{
      padding: 0 0.2rem 0.2rem 0.2rem;
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      border-top: 0.01rem solid rgba(220,220,220,1);
      >.commentNo{
        width: 100%;
        padding: 0.6rem 0 0.15rem 0;
        img{
          width: 1.2rem;
          height: 1.14rem;
          margin: 0 auto;
        }
        p{
          width: 100%;
          font-size: 0.14rem;
          color: #c5c5c6;
          text-align: center;
          margin-top: 0.1rem;
          line-height: 0.28rem;
        }
      }
      >.commentYes:nth-child(1){
        border-top: none;
      }
      >.commentYes{
        width: 100%;
        padding: 0.15rem 0;
        border-top: 0.01rem solid #f0f0f0;
        display: flex;
        >.IntelligentMatchingDItemL{
          width: 0.35rem;
          height: 0.35rem;
          >img{
            display: block;
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 50%;
          }
        }
        .IntelligentMatchingDItemR{
          /*flex: 1;*/
          width: 100%;
          padding-left: 0.1rem;
          box-sizing: border-box;
          h5{
            width: 100%;
            font-size:0.14rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            line-height:0.2rem;
            max-height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .time{
            font-size:0.11rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1)
          }
          .commen{
            width: 80%;
            position: relative;
            margin-top: 0.1rem;
            font-size:0.13rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            .zan1{
              position: absolute;
              right: -18%;
              top: 0;
              color: #676768;
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


}
</style>
