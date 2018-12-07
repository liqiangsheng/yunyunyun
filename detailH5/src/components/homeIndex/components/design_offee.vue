<template>
  <!--设计咖-->
  <div id="design_offee">
    <ul>
      <li v-for="(item1,index1) in objList"  @click="goToHomePage(item1)">
        <div class="objListBox">
          <div  class="img3">
            <img :src="item1.ownerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
        </div>
          <h5>
            <span>{{item1.name}}</span>
            <div class="regionName">{{item1.regionName}} | {{item1.designerUser.title}}</div>
          </h5>

        </div>
        <img class="img1" :src="item1.designerUser.designerHonorList[0].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" />

        <div class="powerIndex">
        <span>影响力</span>
        <div class="ul1"> </div>
        <div class="ul2" :style="{width:item1.designerUser.style}"></div>
          <div class="caredCount"><span>{{item1.caredCount?item1.caredCount:0}}</span> 粉丝 <span style="margin-left: 0.3rem">{{item1.laudedCount?item1.laudedCount:0}}</span> 次获赞 </div>
        </div>

      </li>
    </ul>
    <div class="messageFoot" @click="updataMore">
      {{message}}
    </div>
  </div>
</template>

<script>
  import {commonUserList} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'design_offee',
  data(){
    return{
      p:1,  //页
      s:5, //每页多少
      message:"不同努力加载中...", //触底提示
      pageNum:"",//每页数据
      objList:[], // 智慧团数据
      style:{}, //星星的赞
      starLength:{}, //星星的长度
    }
  },
  created() {
    commonUserList(this.p,this.s).then(res=>{
      if(res.data.status == true){
        console.log(res,"fhsdfjk")
        res.data.data.forEach((item,index)=>{
          item.designerUser.style =  (item.designerUser.powerIndex*10)*0.7+"px";
        })
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
    goToHomePage(v){ //去个人主页
      this.$router.push({path: "/homePage", query: {state: 2,id:v.id,source:"XCX"}}) //去企业主页 1是企业 2是个人
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        commonUserList(this.p,this.s).then(res=>{
          if(res.data.status == true){
            res.data.data.forEach((item,index)=>{
              item.designerUser.style =  (item.designerUser.powerIndex*10)*0.7+"px";
            })
            this.objList = this.objList.concat(res.data.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        commonUserList(this.p,this.s).then(res=>{
          res.data.data.forEach((item,index)=>{
            item.designerUser.style =  (item.designerUser.powerIndex*10)*0.7+"px";
          })
          if(res.data.status == true){
            this.objList =  this.objList.concat(res.data.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
    },
  },
}

</script>

<style scoped lang="less">
  #design_offee{
    width: 100%;
    height: 100%;
    overflow-y:auto ;
    box-sizing: border-box;
    ul{
      width: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
      li{
       width: 100%;
        padding: 0.1rem 0.1rem 0.15rem 0.1rem;
        border-radius: 0.04rem;
        background: #ffffff;
        box-sizing: border-box;
        margin-top: 0.1rem;
        .objListBox{
           width: 100%;
          display: flex;
          .img3{
            width: 20%;
            height: 0.4rem;
            img{
              display: block;
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
            }
          }
          h5{
            width: 70%;
            span{
              display: block;
              width: 100%;
              font-size:0.13rem;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              line-height: 0.3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .regionName{
              display: block;
              width: 100%;
              line-height: 0.16rem;
              font-size: 0.11rem;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #999999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

        }
        .img1{
          display: block;
          width: 100%;
          margin-top: 0.15rem;
          border: 0.01rem solid #eeeeee;
        }

        .powerIndex{
          width: 100%;
          padding:0 0.1rem;
          margin-top: 0.1rem;
          box-sizing: border-box;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          position: relative;
          span{
            display: inline-block;
            /*width: 40px;*/
          }
          .ul1{
            display: inline-block;
            position: absolute;
            width: 70px;
            height: 12px;
            left: 50px;
            top: 2px;
            background:url(../../../../static/images/star2.jpg) ;

          }
          .ul2{
            display: inline-block;
            width: 70px;
            height: 12px;
            position: absolute;
            left: 50px;
            z-index: 1;
            top: 2px;
            background: url(../../../../static/images/star1.jpg);
          }
          .caredCount{
            width: 1.8rem;
            box-sizing: border-box;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            position: absolute;
            left: 130px;
            top: 0px;
            text-align: right;
            span{
              font-size:0.12rem;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:rgba(0,0,0,1);

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
      margin-top: 0.1rem;
    }
  }

</style>
