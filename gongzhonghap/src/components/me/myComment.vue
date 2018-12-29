<template>
  <!--评论-->
  <div id="myComment">

     <div class="myComment_box">
         <ul>
           <li v-for="(item,index) in objList">
             <div class="myComment_ul">
               <div class="myComment_me"><span>我 </span>评论了文章：<span  v-if="item.ctype!=1"> {{item.replyContent}}</span><span  v-else> {{item.commentContent}}</span></div>
               <div class="myComment_time">{{item.createTime|formatTime1}}</div>
             </div>
              <div class="myComment__box">
                   <div class="myComment_box" v-if="item.ctype!=1">
                     <span>@{{item.replyName}}：</span>
                     {{item.commentContent}}
                   </div>
                <div class="myComment___box" @click="goDetail(item)">
                    <img :src="item.bannerUrl?item.bannerUrl:'/static/images/defultphoto.png'" alt="">
                    <div>
                      <p>{{item.title}}</p>
                      <p>作者：{{item.infoUserName}}</p>
                    </div>
                </div>


              </div>
           </li>
         </ul>
     </div>
    <div class="messageFoot" @click="updataMore">
      {{message}}
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
   import { commentFindMyCommentList } from '../../assets/js/promiseHttp';
export default {
  name: 'fans',
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
  created(){
    this.$nextTick(function () {
      document.title = "我的评论";
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo){
//                commentFindMyCommentList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
      commentFindMyCommentList("400",this.userInfo.data.access_token,this.p,this.s).then(res=>{
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

  methods: {
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
          commentFindMyCommentList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//          commentFindMyCommentList("400",this.userInfo.data.access_token,this.p,this.s).then(res=>{

            if(res.status == true){
              this.objList = this.objList.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){
          this.message = "点击加载更多..."
          commentFindMyCommentList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//          commentFindMyCommentList("400",this.userInfo.data.access_token,this.p,this.s).then(res=>{

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
#myComment{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  .myCommentBox{
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(5,5,9,0.3);
    margin-top: 1rem;
  }
  .myComment_box{
    width: 100%;
    ul{
      width: 100%;
      li{
        margin-top: 0.15rem;
        width: 100%;
        background: #ffffff;
        padding:0.15rem;
        box-sizing: border-box;
        .myComment_ul{
          width: 100%;
          display: flex;
          .myComment_me{
            width: 75%;
            color: #999999;
            span{
              font-size:0.13rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
            }
          }
          .myComment_time{
            flex: 1;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            text-align: right;
          }
        }
        .myComment__box{
          width: 100%;
          background:rgba(244,244,244,1);
          border-radius:0.05rem;
          margin-top: 0.1rem;
          padding: 0.15rem 0.11rem;
          box-sizing: border-box;
          .myComment_box{
            width: 100%;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            margin-bottom: 0.1rem;
            span{
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(5,5,9,1);
            }
          }
          .myComment___box{
            width: 100%;
            height: 0.6rem;
            background: #ffffff;
            display: flex;
            >img{
              width:0.6rem;
              height: 0.6rem;
              display: block;
            }
            >div{
              flex: 1;
              padding: 0.1rem;
              box-sizing: border-box;
              p:first-child{
                width: 2.5rem;
                font-size:0.14rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(5,5,9,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
              }
              p:last-child{
                width: 2.5rem;
                font-size:0.12rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(153,153,153,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
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
}
</style>
