<template>
  <!--智慧团-->
  <div id="Intelligence_orps">
     <ul>
       <li v-for="(item,index) in objList">
          <div class="Intelligence_orps_header">
             {{item.teamName}}
          </div>
         <div class="Intelligence_orps_box">
            <div v-for="(item1,index1) in item.members" @click="goToHomePage(item1)">
                <img :src="item1.user.ownerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
                <b>{{item1.user.name}}</b>
                <span>{{item1.user.designerUser.title}}</span>
            </div>
         </div>
         <div class="telBuTong" @click="butong(item.teamName)">
           联系不同，共享设计生态 <img src="/static/images/返回icon.png" alt="">
         </div>
       </li>
     </ul>
    <div class="messageFoot" @click="updataMore">
      {{message}}
    </div>
  </div>
</template>

<script>
  import {operationTeamInfos} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'Intelligence_orps',
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
    operationTeamInfos(this.p,this.s).then(res=>{
      if(res.data.status == true){
          this.pageNum = Math.ceil(res.data.total/this.s);
          if(this.pageNum >1){
            this.message = "点击加载更多..."
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
    butong(v){//联系不同
       this.$router.push({path:"/contact",query:{teamName:v}})
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        operationTeamInfos(this.p,this.s).then(res=>{
          if(res.data.status == true){
            this.objList = this.objList.concat(res.data.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        operationTeamInfos(this.p,this.s).then(res=>{
          if(res.data.status == true){
            this.objList =  this.objList.concat(res.data.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
    },
    goToHomePage(v){ //去个人主页
      this.$router.push({path: "/homePage", query: {state: 2,id:v.user.id,source:"XCX"}}) //去企业主页 1是企业 2是个人
    }
  },
}

</script>

<style scoped lang="less">
#Intelligence_orps{
  width: 100%;
  height: 100%;
  overflow-y:auto ;
  background: #ffffff;
  margin-top: 0.11rem;
  box-sizing: border-box;
  padding: 0.15rem;
  >ul{
    width: 100%;
    li{
       width: 100%;
       overflow: hidden;
      .Intelligence_orps_header{
        width: 100%;
        height: 0.3rem;
        font-size:0.13rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        line-height: 0.3rem;
        border-bottom: 0.01rem solid #EEEEEE;
        margin-bottom: 0.05rem;
      }
      .Intelligence_orps_box{
        width: 100%;
        overflow: hidden;
        >div{
          width: 32.33%;
          height: 1.31rem;
          margin-right: 1%;
          float: left;
          background: #EEEEEE;
          margin-top: 0.05rem;
          border-radius: 0.02rem;
          padding: 0.05rem;
          box-sizing: border-box;
          img{
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            margin: 0.1rem auto;
          }
          b{
            display: block;
            width: 100%;
            text-align: center;
            font-size:0.12rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break:break-all;
            line-height: 0.14rem;
          }
          span{
            width: 100%;
            display: block;
            text-align: center;
            font-size:0.1rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break:break-all;
            line-height:0.14rem;
          }
        }
        }

      .telBuTong{
        width: 90%;
        height: .3rem;
        border: 0.01rem solid #050509;
        border-radius: 0.02rem;
        margin: 0.1rem auto;
        line-height: 0.3rem;
        text-align: center;
        img{
          display: inline-block;
          width: 0.13rem;
          height: 0.1rem;
          margin-top: 0.1rem;
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
