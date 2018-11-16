<template>
  <div id="homePageA">
    <!-------------个人---->
      <div class="homePageAItem" v-for="(item,index) in dataList" v-if="displayState==2">
           <img class="homePageAItemIndex" src="/static/images/listDataBj.png" />
           <div class="homePageAItemIndex1">
                 <img class="homePageAItemIndex1Img" :src="item.bannerUrl" alt="" @click="goDetail(item.id)">
                 <div class="homePageAItemIndex1Title">{{item.title}}</div>
                 <ul class="homePageAItemIndex1Ul">
                   <li><img src="/static/images/look.png" alt="">{{item.num1}}</li>
                   <li><img src="/static/images/like.png" alt="">{{item.num2}}</li>
                   <li><img src="/static/images/comment.png" alt="">{{item.num3}}</li>
                   <li><div><img src="/static/images/share.png" alt="" @click="shareClick">分享</div></li>
                 </ul>
           </div>
      </div>
    <!----------企业------------>
    <div class="homePageAItem" v-for="(item,index) in dataList" v-if="displayState==1">
      <img class="homePageAItemIndex" src="/static/images/listDataBj.png"/>
      <div class="homePageAItemIndex1">
        <img class="homePageAItemIndex1Img" :src="item.bannerUrl" alt="" @click="goDetail(item.id)">
        <div class="homePageAItemIndex1Title">{{item.title}}</div>
        <ul class="homePageAItemIndex1Ul">
          <li><img src="/static/images/look.png" alt="">{{item.num1}}</li>
          <li><img src="/static/images/like.png" alt="">{{item.num2}}</li>
          <li><img src="/static/images/comment.png" alt="">{{item.num3}}</li>
          <li v-if="requestA !='XCX'"><div><img src="/static/images/share.png" alt="" @click="shareClick">分享</div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'homePageA',
    props:["displayState","requestA"],
    data(){
      return{
         dataList:[
           {bannerUrl:"./static/images/banner1.png",title:"Lottie让我脑洞大开效率翻倍",num1:"1.5万次",num2:"1390",num3:"4.9万"},
           {bannerUrl:"./static/images/banner2.png",title:"2018苹果最新规范及适配整理,又来了一大波设又来了一大波设又来了一大波设又来了一大波设又来了一大波设",num1:"1.5万次",num2:"1390",num3:"4.9万"},
           {bannerUrl:"./static/images/banner3.png",title:"Lottie让我脑洞大开效率翻倍",num1:"1.5万次",num2:"1390",num3:"4.9万"},
           {bannerUrl:"./static/images/banner4.png",title:"Lottie让我脑洞大开效率翻倍",num1:"1.5万次",num2:"1390",num3:"4.9万"},
           ]
      }
    },
    created(){
     console.log("fdsfs")
    },
    methods:{
      shareClick() {  //分享
        console.log(22222222222)
      },
      goDetail(id){ //去详情
        console.log(1111111111)
        this.$router.push({path:"/homeDetail"})
      }
    }
  }

</script>

<style scoped lang="less">
  #homePageA{
    overflow: hidden;
  }
   .homePageAItem{
     width: 94%;
     margin: 0.1rem auto;
     height: 1.61rem;
     position: relative;
     .homePageAItemIndex{
        width: 100%;
       height: 100%;
       display: block;
     }
     .homePageAItemIndex1{
       width: 100%;
       height: 100%;
       position: absolute;
       left: 0;
       top: 0;
       padding: 0.2rem;
       box-sizing: border-box;
     }
     .homePageAItemIndex1Img{
       display: inline-block;
       width:100%;
       min-height: 0.79rem;

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
</style>

