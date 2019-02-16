<template>
  <!--评论的详情-->
  <div id="IntelligentComment">
    <div class="IntelligentComment_tltle"  v-show="loginFalse==false" @click="goLogin">
       你暂未登录！请先登录查看更多精彩...
    </div>
  <ul class="IntelligentMatchingDItem5" v-show="loginFalse==true">
    <li>
      <div class="IntelligentMatchingDItemL">
        <img :src="objData.userDp" alt="">
      </div>
      <div class="IntelligentMatchingDItemR">
        <h5>{{objData.name}}</h5>
        <div class="time">{{objData.createdAt|formatTime1}}</div>
        <div class="commen">
          {{objData.commentContent}}
          <div class="zan1" @click="commentariesClick(objData)"><img src="../../assets/images/zan1.png" alt="">{{objData.laudedCount}}</div>
        </div>
        <ul class="ReplyUl" v-if="listData.length>0">
          <li v-for="(item1,index1) in listData"  class="ReplyLi">
            <span><span v-if="item1.sysUserContentVo.name">{{item1.sysUserContentVo.name}}@</span>{{item1.replyCommentName}}:</span>{{item1.replyContent}} <div @click="commentariesClickTwo(item1)"><img src="../../assets/images/zan1.png" alt=""> {{item1.laudedCount}}</div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
  import {commentFindReplysByCommentId,replylaudReply,replyCancelLaudReply,commentlaudComment,commentCancelLaudComment } from '../../assets/js/promiseHttp'; //数据
  import { Toast } from 'mint-ui';  //弹框
  export default {
  name: 'IntelligentComment',
  data(){
    return{
      listData:[], //数据
      objData:{},//上个页面传来的数据
      operationUser:"",//token
      loginFalse:false, //是不是登录了
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "更多评论";
    })

    this.operationUser = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")).data:"";
    if(this.operationUser){
       this.loginFalse = true;
      this.objData = JSON.parse(sessionStorage.getItem("nextPageDetail"));
      commentFindReplysByCommentId(this.$router.history.current.query.id,this.operationUser.access_token).then(res=>{
        if(res.status==true){
          this.listData = res.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })
    }else{
      this.loginFalse = false;
      Toast("您还未登录，请登录！");
    }

  },
    methods:{
        goLogin(){//去登录
          this.$router.push({path:"/login"})
        },
        commentariesClickTwo(v){ //评论去的点赞 第二级级的赞

            if(!this.operationUser){
              Toast("您还未登录，请登录！");
              setTimeout(()=>{
                this.$router.push({path:"/login"})
              },1000)
            }else{
              if(v.lauded == false){ //点赞
                v.lauded = true;
                replylaudReply(v.id,this.operationUser.access_token).then(res=>{
                  if(res.status==true){
                    Toast("点赞成功")
                    v.laudedCount =  v.laudedCount+1;
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else {  //取消赞
                v.lauded = false;
                replyCancelLaudReply(v.id,this.operationUser.access_token).then(res=>{
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

            if(!this.operationUser){
              Toast("您还未登录，请登录！");
              setTimeout(()=>{
                this.$router.push({path:"/login"})
              },1000)
            }else{
              if(v.lauded == false){ //点赞
                v.lauded = true;
                commentlaudComment(v.id,this.operationUser.access_token).then(res=>{
                  if(res.status==true){
                    Toast("点赞成功")
                    v.laudedCount =  v.laudedCount+1;
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else {  //取消赞
                v.lauded = false;
                commentCancelLaudComment(v.id,this.operationUser.access_token).then(res=>{
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
    }
}

</script>

<style scoped lang="less">
  #IntelligentComment{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    overflow-x: hidden;
    .IntelligentComment_tltle{
      width: 100%;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.12rem;
      color: rgba(5,5,9,0.3);
      margin-top: 30%;
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
          width: 0.8rem;
          height: 0.8rem;
          >img{
            display: block;
            width: 0.8rem;
            height: 0.8rem;
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

</style>
