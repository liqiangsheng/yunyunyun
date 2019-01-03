<template>
  <!--资源池-->
  <div id="resource_pool">
     <ul>
       <li v-for="(item,index) in objList" @click="goToHomePage(item)">
         <div class="resource_pool_header">
           <img :src="item.logoUrl?item.logoUrl:item.logoUrl1+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
           <div>
             <h5>{{item.name}}</h5>
             <p>{{item.engShortName}}</p>
           </div>

         </div>
         <div class="resource_pool_centent">
            <div v-for="(item1,index1) in item.companyExtendItemsList" v-if="index1<3">
              <img :src="item1.imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
            </div>
         </div>
         <div class="resource_pool_foot">
           <span>关注 {{item.careCount}}</span>
           <span>粉丝 {{item.caredCount}}</span>
           <span>赞 {{item.laudedCount}}</span>
         </div>
       </li>
     </ul>
    <div class="messageFoot" @click="updataMore">
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
      message:"不同努力加载中...", //触底提示
      pageNum:"",//每页数据
      objList:[], // 智慧团数据
    }
  },
  created() {
    document.title = "资源池"
    companyList(this.p,this.s).then(res=>{
      if(res.data.status == true){
        this.pageNum = Math.ceil(res.data.total/this.s);
        if(this.pageNum >1){
          this.message = "点击加载更多..."
        }else{
          this.message = "这是我的底线..."
        }
        res.data.data.forEach((item,index)=>{
          item.logoUrl1 = "./static/images/defultphoto.png"
        })
        this.objList = res.data.data;
      }else{
        Toast("网络出错啦，请重试")
      }
    })
  },
  methods:{
    updataMore() { //加载更多 分页
      this.p++;
      if (this.p > this.pageNum) {
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
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
        this.message = "点击加载更多..."
        companyList(this.p, this.s).then(res => {
          if (res.data.status == true) {
            this.objList = this.objList.concat(res.data.data);
          } else {
            Toast("网络出错啦，请重试")
          }
        })
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
  overflow-y:auto ;
  margin-top: 0.11rem;
  box-sizing: border-box;
  padding: 0.15rem;
  >ul {
    width: 100%;
    li {
      width: 100%;
      background: #ffffff;
      border-radius: 0.04rem;
      margin-bottom: 0.1rem;
      padding: 0.15rem;
      box-sizing: border-box;
      .resource_pool_header{
        width: 100%;
        overflow: hidden;
        margin-bottom: 0.1rem;
        >img{
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          float: left;
          margin-right: 0.1rem;
        }
        >div{
          h5{
            width: 2.6rem;
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            line-height: 0.24rem;
          }
          p{
            line-height: 0.16rem;
            font-size:0.11rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }

      }
      .resource_pool_centent{
        width: 100%;
        overflow: auto;
        div{
          width: 32.33%;
          height: 0.7rem;
          margin-right: 1%;
          float: left;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .resource_pool_foot{
        width: 100%;
        margin-top: 0.1rem;
        span{
          margin-right: 0.2rem;
          font-size:0.11rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
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
