<template>
  <!--工坊-->
  <div id="resource_pool" @scroll="updataMore">
     <ul>
       <li v-for="(item,index) in objList" @click="goToHomePage(item)">
         <div class="resource_pool_li1">
           <div class="resource_pool_li1_header">
             <img :src="item.logoUrl?item.logoUrl:'/static/images/moren1.png'" alt="">
             <h5>{{item.name}}</h5>
             <p>{{item.brief}}</p>
           </div>
         </div>
         <div class="resource_pool_li2">
           <div class="resource_pool_li2_left">
             <img :src="item.companyExtendItemsList[0]?item.companyExtendItemsList[0].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim':'/static/images/logo.png'" alt="">
           </div>
           <div class="resource_pool_li2_right">
               <div class="resource_pool_li2_right_top">
                 <img :src="item.companyExtendItemsList[1]?item.companyExtendItemsList[1].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim':'/static/images/logo.png'" alt="">
               </div>
               <div class="resource_pool_li2_right_top">
                 <img :src="item.companyExtendItemsList[2]?item.companyExtendItemsList[2].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim':'/static/images/logo.png'" alt="">
               </div>
           </div>

         </div>
         <div class="resource_pool_li3">
           <ul>
               <li>关注 <span>{{item.careCount>10000?(item.careCount/10000)+"万":item.careCount}}</span></li>
               <li>粉丝 <span>{{item.caredCount>10000?(item.caredCount/10000)+"万":item.caredCount}}</span></li>
               <li>赞 <span>{{item.laudedCount>10000?(item.laudedCount/10000)+"万":item.laudedCount}}</span></li>
               <li><b>了解一下 ></b></li>
           </ul>
         </div>
       </li>
     </ul>
    <div class="messageFoot"  v-if="!!message">
      {{message}}
    </div>
  </div>
</template>

<script>
  import {companyList} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'resource_pool',
  data(){
    return{
      p:1,  //页
      s:20, //每页多少
      message:"", //触底提示
      pageNum:"",//每页数据
      objList:[], // 智慧团数据
    }
  },
  created() {
    document.title = "工坊"
    companyList(this.p,this.s).then(res=>{
      if(res.data.status == true){
        this.pageNum = Math.ceil(res.data.total/this.s);
        if(this.pageNum >1){
          this.message = ""
        }else{
          this.message = "这是我的底线..."
        }
        this.objList = res.data.data;
      }else{
        Toast("网络出错啦，请重试")
      }
    })
  },
  methods:{
    updataMore(e) { //加载更多 分页
      if(e.target.scrollHeight==(e.target.scrollTop+e.target.offsetHeight)){
        this.p++;
        if (this.p > this.pageNum) {
          this.message = "这是我的底线..."
          return
        } else if (this.p == this.pageNum) {
          this.message = "这是我的底线..."
          companyList(this.p, this.s).then(res => {
            if (res.data.status == true) {
              this.objList = this.objList.concat(res.data.data);
            } else {
              Toast("网络出错啦，请重试")
            }
          })
        } else if (this.p < this.pageNum) {
          companyList(this.p, this.s).then(res => {
            if (res.data.status == true) {
              this.objList = this.objList.concat(res.data.data);
            } else {
              Toast("网络出错啦，请重试")
            }
          })
        }
      }

    },
    goToHomePage(v){ //去企业主页
      this.$router.push({path: "/homePage", query: {state:1,id:v.id,source:"XCX"}}) //去企业主页 1是企业 2是个人
    }
  },
}

</script>

<style scoped lang="less">
#resource_pool{
  width: 100%;
  height: 100%;
  overflow-y:scroll ;
  box-sizing: border-box;
  padding: 0.1rem;
  >ul {
    width: 100%;
    li {
      width: 100%;
      height: 420px;
      margin-bottom: 10px;
      overflow: hidden;
      position: relative;
       .resource_pool_li1{
         width: 100%;
         padding: 0 20px;
         box-sizing: border-box;
         height: 110px;
         .resource_pool_li1_header{
           width: 100%;
           height: 100%;
           background: #ffffff;
           padding: 34px 0 0 31px;
           box-sizing: border-box;
           position: relative;
           img{
             display: block;
             position: absolute;
             right: 0;
             top:  20px;
             width:  30px;
             height: 30px;
           }
           h5{
             width: 205px;
             height: 20px;
             line-height: 20px;
             font-size: 14px;
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
           }
           p{
             width: 205px;
             height: 32px;
             line-height: 18px;
             margin-top: 10px;
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
             overflow: hidden;
             word-break:break-all;
           }
         }
       }
        .resource_pool_li2{
          position: absolute;
          left: 0;
          top: 110px;
          z-index: 2;
          width: 100%;
          height: 230px;
          box-shadow: 0px 30px 30px rgba(5,5,9,0.03);
          display: flex;
          .resource_pool_li2_left{
            width: 230px;
            height: 230px;
            img{
              display: block;
              width: 230px;
              height: 230px;
            }
          }
          .resource_pool_li2_right{
            flex: 1;
            .resource_pool_li2_right_top{
              width: 100%;
              height:115px;
              img{
                display: block;
                width: 100%;
                height:115px;
              }
            }
          }
        }
        .resource_pool_li3{
          width: 100%;
          height: 80px;
          padding: 0 20px;
          position: absolute;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          ul{
            width: 100%;
            height: 80px;
            background: #ffffff;
            padding: 0 19px;
            li{
              width: 65px;
              height: 100%;
              float: left;
              line-height: 80px;
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
</style>
