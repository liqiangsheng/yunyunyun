<template>
  <div id="homePageA">
    <!-------------个人---->
    <div class="homePageAItem" v-for="(item,index) in dataList" v-if="displayState==2&&dataList.length>0">
      <!--<img class="homePageAItemIndex" src="/static/images/listDataBj.png" />-->
      <div class="homePageAItemIndex1">
        <img class="homePageAItemIndex1Img" :src="item.bannerUrl" alt="" @click="goDetail(item.id)">
        <div class="homePageAItemIndex1Title">{{item.title}}</div>
        <ul class="homePageAItemIndex1Ul">
          <li><img src="/static/images/look.png" alt="">{{item.viewCount}}</li>
          <li><img src="/static/images/like.png" alt="">{{item.laudedCount}}</li>
          <li><img src="/static/images/comment.png" alt="">{{item.commentCount}}</li>
        </ul>
      </div>
    </div>
    <!----------企业------------>
    <div class="homePageAItem" v-for="(item,index) in dataList" v-if="displayState==1&&dataList.length>0">
      <!--<img class="homePageAItemIndex" src="/static/images/listDataBj.png"/>-->
      <div class="homePageAItemIndex1">
        <img class="homePageAItemIndex1Img" :src="item.bannerUrl" alt="" @click="goDetail(item.id)">
        <div class="homePageAItemIndex1Title">{{item.title}}</div>
        <ul class="homePageAItemIndex1Ul">
          <li><img src="/static/images/look.png" alt="">{{item.viewCount}}</li>
          <li><img src="/static/images/like.png" alt="">{{item.laudedCount}}</li>
          <li><img src="/static/images/comment.png" alt="">{{item.commentCount}}</li>
        </ul>
      </div>
    </div>
    <div class="more123" @click="moreClick">{{message}}</div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { findInformationListByUserIdUserId } from '../../assets/js/promiseHttp'; //数据
  export default {
    name: 'homePageA',
    props:["displayState","requestA"],
    data(){
      return{
        dataList:[],
        page:1, //页码
        message:"不同正在努力加载中...",
        pageNum:0,
        s:20,
      }
    },
    created(){
      if(this.$router.history.current.query){
        findInformationListByUserIdUserId(this.$router.history.current.query.id,this.page,this.s).then(res=>{
          console.log(res)
          if(res.status == true){
            this.dataList = res.data;
            this.pageNum = Math.ceil(res.total/this.s);
            if(this.page < this.pageNum){
              this.message ="点击加载更多...";
            }else {
              this.message ="这是我的底线...";
            }
          }else{
            Toast("网络出错了，请重试")
          }
        })
      }else{
        this.$router.go(-1)
      }

    },
    methods:{
      moreClick(){//更多
        this.page++;
        if(this.page>this.pageNum){
          Toast("这是最后一页");
          this.message ="这是我的底线...";
          return;
        }else{
          if(this.page == this.pageNum){
            this.message ="这是我的底线...";
          }else{
            this.message ="点击加载更多...";
          }

        }
        findInformationListByUserIdUserId(this.$router.history.current.query.id,this.page,this.s).then(res=>{
          console.log(res)
          if(res.status == true){
            this.dataList = this.dataList.concat( res.data);
          }else{
            Toast("网络出错了，请重试")
          }
        })
      },
      shareClick() {  //分享

      },
      goDetail(id){ //去详情

        this.$router.push({path:"/homeDetail" ,query: {id:id}})
      }
    }
  }

</script>

<style scoped lang="less">
  #homePageA{
    overflow: hidden;
    overflow-y: auto;
  }
  .homePageAItem{
    width: 94%;
    margin: 0.1rem auto;
    /*height: 1.61rem;*/
    /*position: relative;*/
    .homePageAItemIndex1{
      width: 100%;
      padding: 0 0.1rem;
      box-sizing: border-box;
    }
    .homePageAItemIndex1Img{
      display: inline-block;
      width:100%;

    }
    .homePageAItemIndex1Title{
      width: 100%;
      font-size:0.15rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(5,5,9,1);
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    .homePageAItemIndex1Ul{
      width: 100%;
      display: flex;
      li{
        flex: 1;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        img{
          margin-right: 0.05rem;
          display: inline-block;
          width: 0.13rem;
          height: 0.11rem;
        }
      }
      li:last-child{
        div{
          float: right;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(5,5,9,1);
        }
      }
    }

  }
  .more123{
    width: 100%;
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
    font-size: 0.14rem;
    background: #EEEEEE;
  }
</style>


