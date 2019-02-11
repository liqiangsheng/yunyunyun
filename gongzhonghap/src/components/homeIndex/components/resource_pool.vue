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
      this.$router.push({path: "/enterprisePage", query: {id:v.id}}) //去企业主页 1是企业 2是个人
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
  background: #eeeeee;
  >ul {
    width: 100%;
    li {
      width: 100%;
      height: 4.2rem;
      margin-bottom: 0.1rem;
      overflow: hidden;
      position: relative;
       .resource_pool_li1{
         width: 100%;
         padding: 0 0.2rem;
         box-sizing: border-box;
         height: 1.1rem;
         .resource_pool_li1_header{
           width: 100%;
           height: 100%;
           background: #ffffff;
           padding: 0.24rem 0 0 0.31rem;
           box-sizing: border-box;
           position: relative;
           img{
             display: block;
             position: absolute;
             right: 0;
             top:  0.25rem;
             width:  0.6rem;
             height: 0.6rem;
           }
           h5{
             width: 2.05rem;
             height: 0.2rem;
             line-height: 0.2rem;
             font-size: 0.14rem;
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
           }
           p{
             width: 2.05rem;
             height: 0.36rem;
             line-height: 0.18rem;
             font-size: 0.12rem;
             color: #c5c5c6;
             margin-top:0.05rem;
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
          top: 1.1rem;
          z-index: 2;
          width: 100%;
          height: 2.3rem;
          box-shadow: 0 2px 30px rgba(5,5,9,0.3);
          display: flex;
          .resource_pool_li2_left{
            width: 2.3rem;
            height: 2.3rem;
            img{
              display: block;
              width: 2.3rem;
              height: 2.3rem;
            }
          }
          .resource_pool_li2_right{
            flex: 1;
            .resource_pool_li2_right_top{
              width: 100%;
              height:1.15rem;
              img{
                display: block;
                width: 100%;
                height:1.15rem;
              }
            }
          }
        }
        .resource_pool_li3{
          width: 100%;
          height: 0.8rem;
          padding: 0 0.2rem;
          position: absolute;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          ul{
            width: 100%;
            height: 0.8rem;
            background: #ffffff;
            padding: 0 0 0  0.31rem;
            box-sizing: border-box;
            li{
              width: 0.65rem;
              height: 100%;
              float: left;
              line-height: 0.8rem;
              color: #c5c5c6;
              font-size: 0.12rem;
              span,b{
                color: #262626;
              }
              span{
                font-weight: 900;
                margin-left: 0.05rem;
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
  }
}
</style>
