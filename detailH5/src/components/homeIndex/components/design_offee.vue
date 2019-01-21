<template>
  <!--设计咖-->
  <v-touch id="design_offee" @swipeup="swipeup" @swipedown="swipedown">
    <ul>
      <li v-for="(item1,index1) in objList"  @click="goToHomePage(item1)" ref="swiperScroll">
        <div class="design_offee_top">
          <div class="design_offee_top_img">
            <img :src="item1.coverHonor.imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="" v-if="item1.coverHonor">
            <img :src="item1.designerUser.designerHonorList[0].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="" v-else>
          </div>
          <div class="design_offee_top_centent">
            <div class="powerIndex">
              <b>影响力</b>
              <div class="ul1"> </div>
              <div class="ul2" :style="{width:item1.designerUser.style}"></div>
            </div>
            <div class="caredCount">
              <span>{{item1.caredCount?item1.caredCount:0}}</span> 粉丝 <span style="margin-left: 0.3rem">{{item1.laudedCount?item1.laudedCount:0}}</span> 次获赞
            </div>
          </div>
        </div>
        <div class="design_offee_bottom">
          <div class="design_offee_bottom_content">
            <div  class="img3">
              <img :src="item1.ownerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
            </div>
            <h5>
              <span>{{item1.name}}</span>
              <div class="regionName">{{item1.designerUser.title}}</div>
            </h5>
            <div class="follow_login_Follow_li1_div" v-if="item1.cared==false" @click.stop="follow(item)">关注</div>
            <div class="follow_login_Follow_li1_div active" v-if="item1.cared==true" @click.stop="cancelFollow(item)">取消关注</div>
          </div>
        </div>

      </li>
    </ul>
    <div class="messageFoot" @click="updataMore" v-if="!!message">
      {{message}}
    </div>
  </v-touch>
</template>

<script>
  import {commonUserList} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'design_offee',
  data(){
    return{
      p:1,  //页
      s:50, //每页多少
      message:"", //触底提示
      pageNum:"",//每页数据
      objList:[], // 智慧团数据
      style:{}, //星星的赞
      starLength:{}, //星星的长度
      swiperIndex:0, //滑动的起始位置
      scrollHeight:0,
    }
  },
  created() {
    document.title = "社区"
    commonUserList(this.p,this.s).then(res=>{
      if(res.data.status == true){
        console.log(res,"fhsdfjk")
        res.data.data.forEach((item,index)=>{
          item.designerUser.style =  (item.designerUser.powerIndex*10)*0.7+"px";
        })
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
    swipeup(){ //上滑
      this.swiperIndex++;
      console.log(this.swiperIndex)
      if( this.swiperIndex == this.objList.length){
        this.updataMore()

      }else {
        if(this.swiperIndex<this.objList.length-1){
          this.scrollHeight = this.scrollHeight+410;
          let box = document.getElementById('design_offee')
          box.pageYOffset= this.scrollHeight ;
          box.scrollTop = this.scrollHeight ;
          box.scrollTop = this.scrollHeight ;
        }else {
          this.swiperIndex = this.objList.length-1;
          let box = document.getElementById('design_offee')
          box.pageYOffset= (this.objList.length)*410 ;
          box.scrollTop = (this.objList.length)*410 ;
          box.scrollTop = (this.objList.length)*410 ;
        }

      }
    },
    swipedown(){//下滑
      console.log("xia")
      this.swiperIndex--;
      if( this.swiperIndex<=0){
        Toast('到顶了');
        this.swiperIndex = 0;
        let box = document.getElementById('design_offee')
        box.pageYOffset=0 ;
        box.scrollTop = 0 ;
        box.scrollTop = 0 ;
        return
      }else {
        this.scrollHeight = this.scrollHeight-410;
        let box = document.getElementById('design_offee')
        box.pageYOffset= this.scrollHeight ;
        box.scrollTop = this.scrollHeight ;
        box.scrollTop = this.scrollHeight ;
      }

    },
    goToHomePage(v){ //去个人主页
      this.$router.push({path: "/homePage", query: {state: 2,id:v.id,source:"XCX"}}) //去企业主页 1是企业 2是个人
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.p =this.pageNum;
        this.message = "这是我的底线..."
        return;
      }else if(this.p==this.pageNum){
        this.p =this.pageNum;
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
        this.message = ""
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
    overflow-y:scroll ;
    box-sizing: border-box;
    background: #EEEEEE;
    ul{
      width: 100%;
      box-sizing: border-box;
      li{
        width: 100%;
        height: 410px;
        position: relative;
        .design_offee_top{
          width: 100%;
          padding: 0 10px;
          height: 290px;
          box-sizing: border-box;
          .design_offee_top_img{
            width: 100%;
            height: 200px;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .design_offee_top_centent{
            width: 100%;
            height: 90px;
            padding: 15px;
            box-sizing: border-box;
            background: #ffffff;
            .powerIndex {
              width: 100%;
              box-sizing: border-box;
              font-size: 0.12rem;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              position: relative;
              b {
                display: inline-block;
                font-size: 0.18rem;
                color: #262626;
              }
              .ul1 {
                display: inline-block;
                position: absolute;
                width: 70px;
                height: 12px;
                left: 70px;
                top: 5px;
                background: url(../../../../static/images/star2.png);

              }
              .ul2 {
                display: inline-block;
                width: 70px;
                height: 12px;
                position: absolute;
                left: 70px;
                z-index: 1;
                top: 5px;
                background: url(../../../../static/images/star1.png);
              }
            }
            .caredCount{
              width: 100%;
              font-size:0.13rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:#c5c5c6;
              margin-right: 0.1rem;
              line-height: 0.3rem;
              span{
                font-size:0.12rem;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(0,0,0,1);

              }
            }
          }
        }
        .design_offee_bottom{
          width: 100%;
          height: 150px;
          position: absolute;
          left: 0;
          bottom: 0;
          background: url(../../../../static/images/投影bg.png);
          background-size: 100% 100%;
          .design_offee_bottom_content{
            width: 100%;
            height: 90px;
            background: #ffffff;
            position: absolute;
            left: 0;
            top:20px;
            padding: 25px 20px;
            box-sizing: border-box;
            overflow: hidden;
            .img3{
              width: 40px;
              height:  40px;
              margin-right: 0.05rem;
              float: left;
              img{
                display: block;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 2px solid #FCE76C;
              }
            }
            h5{
              width:2rem;
              float: left;
              span{
                display: block;
                width: 100%;
                font-size:0.13rem;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                line-height: 0.24rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .regionName{
                display: block;
                width: 100%;
                line-height: 0.16rem;
                font-size: 0.13rem;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #c5c5c6;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .follow_login_Follow_li1_div{
              float: left;
              width: 0.7rem;
              height: 0.32rem;
              background: #ffffff;
              border-radius:0.24rem;
              line-height: 0.32rem;
              text-align: center;
              float: right;
              font-size:0.14rem;
              font-family:PingFangSC-Regular;
              font-weight:900;
              color:#262626;
              border:0.02rem solid #262626;
            }
            .follow_login_Follow_li1_div.active{
              background: #ffffff;
              border:0.02rem solid #c5c5c6;
              color:#c5c5c6;
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
