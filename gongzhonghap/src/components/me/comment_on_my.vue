<template>
  <!--评论我的-->
  <div id="comment_on_my">
    <div class="comment_on_my_false" v-if="objList.length<=0">
      <img src="/static/images/缺省图.png" alt="">
      <p>你的评论区目前空空也～</p>
    </div>
    <ul class="comment_on_my_true" v-else>
      <li class="comment_on_my_true_li" v-for="(item,index) in objList">
        <div class="comment_on_my_true_li_left" @click="goHomepage(item)">
          <img :src="item.userDp?item.userDp:'/static/images/defultphoto.png'" alt="">
        </div>
        <div class="comment_on_my_true_li_right">
             <h5 class="comment_on_my_true_li_right_name"><span v-if="item.typec!=0">{{item.replyName}}</span> <span v-if="item.typec==0">{{item.commentName}}</span></h5>
             <div class="comment_on_my_true_li_right_time">{{item.createTime|formatTime1}}</div>
             <div  class="comment_on_my_true_li_right_huifu">
               回复 <b>{{item.replyName}} :</b> <span v-if="item.typec!=0">{{item.replyContent}}</span> <span v-if="item.typec==0">{{item.commentContent}}</span>
             </div>
             <div  class="comment_on_my_true_li_right_content" @click="goDetail(item)">
                 <div  class="comment_on_my_true_li_right_content_bot">
                   <div class="comment_on_my_true_li_right_content_left">
                     <img :src="item.bannerUrl" alt="">
                   </div>
                   <div class="comment_on_my_true_li_right_content_right">
                     {{item.title}}
                   </div>
                 </div>

                 <div  class="comment_on_my_true_li_right_content_top" v-if="item.typec!=0">
                   <div>
                     <b>我</b> 回复了 <span>{{item.commentContent}}</span>
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
  import { Toast } from 'mint-ui';  //弹框
  import { commentFindForMeCommentList } from '../../assets/js/promiseHttp';
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
        document.title = "评论我的";
      })
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(this.userInfo){
//        commentFindForMeCommentList("20181203103707dc00a09e48224f51bf733765edfa7633",this.userInfo.data.access_token,this.p,this.s).then(res=>{
        commentFindForMeCommentList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{

          if(res.status==true){
            this.pageNum = Math.ceil(res.total/this.s);
            if(this.pageNum>1){
              this.message = '点击加载更多...';
            }else{
              this.message = '这是我的底线...';
            }
            this.objList = res.data;
          }else{
            Toast("网络异常，请重试")
          }
        })
      }else{
        this.message = "你还未登录，请登录！"
      }
    },
    methods:{
      goHomepage(v){ //去吃瓜或者大咖
        if(v.orgId == '2'){// 人
              if(v.vUser==false){//去吃瓜
                this.$router.push({path:"/personalMelonPages",query:{id:v.dpUser}})
              }else{
                this.$router.push({path:"/homePage",query:{state:2,id:v.dpUser}})//1  true是大咖
              }
        }else {//企业
              this.$router.push({path:"/homePage",query:{state:1,id:v.dpUser}})//1 是大咖
        }
      },
      goDetail(v){
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
          commentFindForMeCommentList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{

            if(res.status == true){
              this.objList = this.objList.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){
          this.message = "点击加载更多..."
          commentFindForMeCommentList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
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
  #comment_on_my {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    .comment_on_my_true{
      width: 100%;
      li{
        width: 100%;
        margin-top: 0.1rem;
        padding: 0.1rem 0.15rem;
        box-sizing: border-box;
        display: flex;
        background: #ffffff;
        .comment_on_my_true_li_left{
          width: 0.4rem;
          margin-right: 0.05rem;
          img{
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
          }
        }
        .comment_on_my_true_li_right{
          flex: 1;
          .comment_on_my_true_li_right.name{
            width: 100%;
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 0.24rem;
          }
          .comment_on_my_true_li_right.time{
            font-size:0.1rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height: 0.2rem;
          }
          .comment_on_my_true_li_right_huifu{
            width: 100%;
            font-size:0.13rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin-top: 0.15rem;
            b{
              color: #050509;
            }
            span{
              color: #050509;
            }
          }
          .comment_on_my_true_li_right_content{
            width: 100%;
            padding: 0.15rem;
            box-sizing: border-box;
            background:rgba(244,244,244,1);
            border-radius:0.1rem;
            margin-top: 0.1rem;
            .comment_on_my_true_li_right_content_bot{
              width: 100%;
              display: flex;
              .comment_on_my_true_li_right_content_left{
                width: 0.7rem;
                height: 0.7rem;
                img{
                  display: block;
                  width: 0.7rem;
                  height: 0.7rem;
                }
              }
              .comment_on_my_true_li_right_content_right{

                flex: 1;
                padding: 0.05rem 0.05rem;
                box-sizing: border-box;
                background: #ffffff;
                font-size:0.13rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                line-height: 0.3rem;
                color:rgba(5,5,9,1);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          .comment_on_my_true_li_right_content_top{
            width: 100%;
            margin-top: 0.1rem;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            span{
              color:rgba(5,5,9,1);
            }
            b{
              color:rgba(5,5,9,1);
            }
          }

          }
        }
      }
    }
    .comment_on_my_false{
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
