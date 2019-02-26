<template>
  <div class="moreStories">
    <div class="moreStories_top">

      <div class="moreStories_top_bg"></div>
    </div>
    <ul class="moreStories_ul" @scroll="moreData">
      <li v-for="(item,index) in listData" @click="goDetail(item.id)">
        <div class="moreStories_ul_left">
          <img :src="item.bannerUrl?item.bannerUrl+'?imageView2/1/w/100/h/70/q/75|imageslim':'https://pub.qinius.butongtech.com/logo.png?imageView2/1/w/100/h/70/q/75|imageslim'" alt="">
        </div>
        <div class="moreStories_ul_right">
          <h5>{{item.title}}</h5>
           <ul>
             <li><img src="../../assets/images/liulangshu.svg" alt="">{{item.viewCount>10000?(item.viewCount/10000).toFixed(2):item.viewCount}}</li>
             <li><img src="../../assets/images/xihuanshu.svg" alt="">{{item.laudedCount>10000?(item.laudedCount/10000).toFixed(2):item.laudedCount}}</li>
             <li><img src="../../assets/images/pinglunshu.svg" alt="">{{item.commentCount>10000?(item.commentCount/10000).toFixed(2):item.commentCount}}</li>
           </ul>
        </div>
      </li>
      <div  class="messageFoot"  v-if="!!message">
        {{message}}
      </div>
    </ul>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { findInformationListByUserIdUserId } from '../../assets/js/promiseHttp'; //数据
export default {
  name: 'moreStories',
  data(){
    return{
        listData:[], //数据
        p:1,
        s:20,
      pageNum:0,
      message:"",
    }
  },
  methods:{
    goDetail(id){//去文章详情
      this.$router.push({path:"/homeDetail" ,query: {id:id}})
    },
    goback(){
      this.$router.go(-1);
    },
    moreData(e){ //更多数据 分页
      if(e.target.scrollHeight==(e.target.scrollTop+e.target.offsetHeight)){
        this.p++;
        if (this.p > this.pageNum) {
          this.message = "这是我的底线..."
          return
        } else if (this.p == this.pageNum) {
          this.message = "这是我的底线..."
          findInformationListByUserIdUserId(this.$router.history.current.query.id,this.p,this.s).then(res=>{
            if (res.status == true) {
              this.listData = this.listData.concat(res.data);
            } else {
              Toast("网络出错啦，请重试")
            }
          })
        } else if (this.p < this.pageNum) {
          findInformationListByUserIdUserId(this.$router.history.current.query.id,this.p,this.s).then(res=>{
            if (res.status == true) {
              this.listData = this.listData.concat(res.data);
            } else {
              Toast("网络出错啦，请重试")
            }
          })
        }
      }
    }
  },
  created(){
    findInformationListByUserIdUserId(this.$router.history.current.query.id,this.p,this.s).then(res=>{
//      console.log(res)
      if(res.status==true){
        this.pageNum = Math.ceil(res.total/this.s);
        if(this.pageNum<=1){
          this.message = "这是我的底线..."
        }else {
          this.message = ""
        }
        this.listData = res.data;
      }else{
        Toast("网络出错啦，请重试")
      }
    })
  }


}

</script>

<style scoped lang="less">
.moreStories{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  overflow: hidden;
 .moreStories_top{
   width: 100%;
   height: 1.62rem;
   display: flex;
   .moreStories_top_goback{
     flex: 1;
     /*img{*/
       /*display: block;*/
       /*width: 0.18rem;*/
       /*height: 0.15rem;*/
       /*transform: rotate(180deg);*/
       /*-ms-transform:rotate(180deg); 	!* IE 9 *!*/
       /*-moz-transform:rotate(180deg); 	!* Firefox *!*/
       /*-webkit-transform:rotate(180deg); !* Safari 和 Chrome *!*/
       /*-o-transform:rotate(180deg);*/
       /*margin: 0.25rem 0 0 0.2rem;*/
     /*}*/
   }
   /*.moreStories_top_bg{*/
     /*width: 0.15rem;*/
     /*height: 100%;*/
     /*background: #FCE76C;*/
   /*}*/
 }
  .moreStories_ul{
    position: absolute;
    top:0.3rem;
    right: 0.2rem;
    left: 0.2rem;
    bottom: 0;
    overflow-y: scroll;
    >li{
      width: 100%;
      height: 0.7rem;
      display: flex;
      margin-bottom: 0.3rem;
      .moreStories_ul_left{
        width: 1rem;
        height: 0.7rem;
        img{
          display: block;
          width: 1rem;
          height: 0.7rem;
        }
      }
      .moreStories_ul_right{
        flex: 1;
        padding-left: 0.2rem;
        box-sizing: border-box;
        h5{
          word-break:break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          max-height: 0.42rem;
          width: 100%;
          line-height: 0.21rem;
          font-size:0.15rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(38,38,40,1);
        }
        >ul{
          width: 100%;
          display: flex;
          margin-top: 0.09rem;
          height: 0.19rem;
          >li{
           flex: 1;
            line-height: 0.13rem;
            font-size:0.12rem;
            font-weight: 500;
            color:rgba(103,103,104,1);
            img{
              display: inline-block;
              width: 0.14rem;
              height: 0.11rem;
              margin-right: 0.05rem;
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
    }
  }
}
</style>
