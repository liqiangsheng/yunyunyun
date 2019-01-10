<template>
  <!--我的赞-->
  <div id="myFabulous">
    <div v-show="myfollow==false" class="myFabulousBox">
       {{message}}
    </div>
     <div v-show="myfollow==true" class="myFabulous_box">
       <ul class="myFabulous_tab">
         <li v-for="(item,index) in tablist" @click="tabClick(index)">
           <span :class="{active:tabIndex==index}">{{item}}</span>
         </li>
       </ul>
       <div class="praiseMe_box_false" v-if="tabIndex==0&&ListData.length<=0">
         <img src="/static/images/缺省图.png" alt="">
         <p>你的收藏作品区目前空空也～</p>
       </div>
       <div class="praiseMe_box_false" v-if="tabIndex==1&&articleData.length<=0">
         <img src="/static/images/缺省图.png" alt="">
         <p>你的收藏文章区目前空空也～</p>
       </div>
       <ul class="myFabulous_ul" v-show="tabIndex==0&&ListData.length>0">
       <li v-for="(item,index) in ListData" @click="goDetail(item)">
         <h5>{{item.title}}</h5>
         <div class="myFabulous_banner">
           <img :src="item.cover.url" alt="">
         </div>
         <div class="myFabulous_bannaerUrl">
           <div class="myFabulous_bannaerUrl_left" @click.stop="goHomePage(item)">
             <img :src="item.authorInfo.ownerUrl?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="">
           </div>
           <div class="myFabulous_name">
             <b>{{item.authorInfo.name}}</b>
             <p>{{item.authorInfo.regionName}}</p>
           </div>
           <!--后台数据没有-->
           <div class="myFabulous_type">
             <p>{{item.authorInfo.title}}</p>
           </div>
         </div>
       </li>

     </ul>
       <ul class="myFabulous_ul1" v-show="tabIndex==1&&articleData.length>0">
         <li v-for="(item,index) in articleData" @click="goHomeDetail(item)">
              <div class="myFabulous_left">
                <h5>{{item.title}}</h5>
                <div style="color: #AAAAAA">
                  <img src="/static/images/查看.png" alt=""> {{item.viewCount}}
                </div>
                <div><img src="/static/images/收藏.png" alt=""> {{item.laudedCount}} <img src="/static/images/评论.png"  alt="" style="margin-left: 0.3rem"> {{item.commentCount}}</div>
              </div>
              <div class="myFabulous_right">
                <img :src="item.bannerUrl" alt="">
              </div>
         </li>
       </ul>
     </div>
    <div class="messageFoot" @click="updataMore(0)" v-if="tabIndex==0&&ListData.length>0">
      {{message}}
    </div>
    <div class="messageFoot" @click="updataMore(1)" v-if="tabIndex==1&&articleData.length>0">
      {{message1}}
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
   import { customerLaudNoteLaudList,customerLaudNoteListFavoredContent } from '../../assets/js/promiseHttp';
export default {
  name: 'myFabulous',
  data(){
      return{
        myfollow:true, //数据请求成功显示
        userInfo:{}, //用户信息
        p1:1,  //页
        s1:20, //每页多少
        message1:"不同努力加载中...", //触底提示
        pageNum1:0,//每页数据
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:0,//每页数据
        tablist:["作品","文章"], //tab选择
        tabIndex:0, //tab选择xiabiao
        ListData:[], // 数据作品
        articleData:[],// 数据文章
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的赞";
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
//    console.log(this.userInfo.data.access_token)
    if(this.userInfo){
      this.myfollow= true;
        customerLaudNoteListFavoredContent(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
        if(res.status ==true){
          this.pageNum = Math.ceil(res.total/this.s);
          if(this.pageNum>1){
            this.message = '点击加载更多...';
          }else{
            this.message = '这是我的底线...';
          }
           this.ListData = res.data;
        }else {
          Toast("网络出错啦！请重试作品")
        }

      })
    }else{
      this.message1 = "你还未登录，请登录！"
      this.myfollow= false;
    }

  },

  methods: {
    goHomeDetail(v){ //去文章详情
      this.$router.push({path:"/homeDetail" ,query: {id:v.id}})
    },
    goDetail(v){ //去文章详情
      this.$router.push({path:"/findDetail",query:{id:v.id}})
    },
    goHomePage(v){ //去个人 或则大咖
      if(v.authorInfo.vUser==0){ //去吃瓜
        this.$router.push({path:"/personalMelonPages",query:{id:v.authorInfo.id}})
      }else{//去大咖
        this.$router.push({path:"/homePage",query:{state:2,id:v.authorInfo.id}})//1是个人
      }
    },
    tabClick(i){//tab的下标
      this.tabIndex =i;
      if(i==1){ //文章
        customerLaudNoteLaudList(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{ //文章
          if(res.status == true){
            this.pageNum1 = Math.ceil(res.total/this.s1);
            if(this.pageNum1>1){
              this.message1 = '点击加载更多...';
            }else{
              this.message1 = '这是我的底线...';
            }
            this.articleData = res.data;
          }else{
            Toast("网络出错啦！请重试文章")
          }
        })
      }else{
        customerLaudNoteListFavoredContent(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status ==true){
            this.pageNum = Math.ceil(res.total/this.s);
            if(this.pageNum>1){
              this.message = '点击加载更多...';
            }else{
              this.message = '这是我的底线...';
            }
            this.ListData = res.data;
          }else {
            Toast("网络出错啦！请重试作品")
          }

        })
      }
    },
    updataMore(v){ //加载更多 分页
      if(v==1){ //文章
        this.p1++;
        if(this.p1>this.pageNum1){
          this.message1 = "这是我的底线..."
          Toast("这是最后一页啦！")
        }else if(this.p1==this.pageNum1){
          this.message1 = "这是我的底线..."
          customerLaudNoteLaudList(this.userInfo.data.id,this.userInfo.data.access_token,this.p1,this.s1).then(res=>{

            if(res.status == true){
              this.articleData = this.articleData.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p1<this.pageNum1){
          this.message1 = "点击加载更多..."
          customerLaudNoteLaudList(this.userInfo.data.id,this.userInfo.data.access_token,this.p1,this.s1).then(res=>{

            if(res.status == true){
              this.articleData =  this.articleData.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }

      }else{//作品
        this.p++;
        if(this.p>this.pageNum){
          this.message = "这是我的底线..."
          Toast("这是最后一页啦！")
        }else if(this.p==this.pageNum){
          this.message = "这是我的底线..."
          customerLaudNoteListFavoredContent(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
            if(res.status == true){
              this.ListData = this.ListData.concat(res.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){
          this.message = "点击加载更多..."
          customerLaudNoteListFavoredContent(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
            if(res.status == true){
              this.ListData =  this.ListData.concat(res.data);
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
#myFabulous{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  overflow: auto;
  overflow-x: hidden;
  .myFabulousBox{
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(5,5,9,0.3);
    margin-top: 1rem;
  }
  .myFabulous_box{
    width: 100%;
    .myFabulous_tab{
      width: 100%;
      height: 0.4rem;
      margin-top: 0.01rem;
      background: #ffffff;
      display: flex;
      box-sizing: border-box;
      li{
        flex: 1;
        height: 0.4rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 0.4rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        span{
          display: inline-block;
          height: 0.39rem;
        }
        span.active{
          border-bottom: 0.02rem solid #000000;
          color:rgba(5,5,9,1);
        }
      }
    }
    .myFabulous_ul{
      width: 100%;
     li{
       margin-top: 0.15rem;
       background: #ffffff;
       padding: 0.12rem 0.16rem;
       box-sizing: border-box;
       h5{
         font-size:0.15rem;
         font-family:PingFangSC-Regular;
         font-weight:400;
         color:rgba(5,5,9,1);
       }
       .myFabulous_banner{
         width: 100%;
         margin-top: 0.1rem;
         img{
           display: block;
           width: 100%;
         }
       }
       .myFabulous_bannaerUrl{
         width: 100%;
         margin-top: 0.1rem;
         overflow: hidden;
         .myFabulous_bannaerUrl_left{
           width: 0.4rem;
           height: 0.4rem;
           float: left;
           margin-right: 0.05rem;
           img{
             display: block;
             width: 0.4rem;
             height: 0.4rem;
             border-radius: 50%;
           }
         }
         .myFabulous_name{
           width: 1.5rem;
           height: 0.4rem;
           float: left;
           b{
             font-size:0.13rem;
             font-family:PingFangSC-Medium;
             font-weight:500;
             color:rgba(5,5,9,1);
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
           }
           p{
             font-size:0.12rem;
             font-family:PingFangSC-Regular;
             font-weight:400;
             color:rgba(153,153,153,1)
           }
         }
         .myFabulous_type{
           float: right;font-size:0.12rem;
           font-family:PingFangSC-Regular;
           font-weight:400;
           color:rgba(153,153,153,1);

         }
       }
     }
    }
    .myFabulous_ul1{
      width: 100%;
      li{
        margin-top: 0.15rem;
        background: #ffffff;
        padding: 0.12rem 0.16rem;
        box-sizing: border-box;
        display: flex;
        .myFabulous_left{
          width: 60%;
           padding-right: 0.05rem;
          h5{
            font-size:0.15rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          div{
            width: 100%;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            img{
              display: inline-block;
              width: 0.14rem;
              height: 0.1rem;
            }
          }
        }
        .myFabulous_right{
         flex: 1;
          img{
            display: block;
            width: 100%;
            border-radius: 0.05rem;
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
      margin-top: 0.1rem;
    }
}
</style>
