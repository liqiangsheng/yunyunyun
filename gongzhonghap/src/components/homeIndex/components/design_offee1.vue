<template>
  <!--设计咖-->
  <!--<v-touch @swipeup="swipeup" @swipedown="swipedown">-->
  <div id="design_offee" @scroll="updataMore">
    <ul>
        <li v-for="(item1,index1) in objList"  @click="goToHomePage(item1)" ref="swiperScroll">
          <div class="design_offee_top">
             <div class="design_offee_top_img">
               <img :src="item1.coverHonor.imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="" v-if="item1.coverHonor">
               <img :src="item1.designerUser.designerHonorList[0].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="" v-else>
             </div>
            <div class="design_offee_top_centent">
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
                  <div class="follow_login_Follow_li1_div" v-if="item1.cared==false" @click.stop="follow(item1)">关注</div>
                  <div class="follow_login_Follow_li1_div active" v-if="item1.cared==true" @click.stop="cancelFollow(item1)">取消关注</div>
            </div>
          </div>

      </li>
    </ul>
    <div class="messageFoot" @click="updataMore" v-if="!!message">
      {{message}}
    </div>
  </div>
</template>

<script>
  import {commonUserList,companyInfoCareCompany,commonUserCareUser,commonUserCancelCareUser,companyInfoCancelCareCompany} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'design_offee',
  data(){
    return{
      p:1,  //页
      s:20, //每页多少
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
     this.query(); //数据初始化
  },
  methods:{
    query(){
      commonUserList(this.p,this.s).then(res=>{
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
    cancelFollow(v){ //取消关注
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(!data){
        Toast("您还未登录，请登录！");
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }else{

          commonUserCancelCareUser(v.id,data.data.id,2,data.data.access_token).then(res=>{
            if(res.data.status==true){
              Toast('关注已取消')
              v.cared = false;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
    },
    follow(v){ //关注
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(!data){
        Toast("您还未登录，请登录！");
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }else{
          commonUserCareUser(v.id,data.data.id,2,data.data.access_token).then(res=>{
            if(res.data.status==true){
              Toast('关注成功')
              v.cared = true;
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }
    },
    goToHomePage(v){ //去个人主页
      this.$router.push({path: "/bigShotPage", query: {id:v.id}}) //去企业主页 1是企业 2是个人
    },
    updataMore(e){ //加载更多 分页
      if(e.target.scrollTop>=(e.target.scrollHeight-e.target.clientHeight)){
        this.p++;
        if(this.p>this.pageNum){
          this.p =this.pageNum;
          this.message = "这是我的底线..."
//        Toast("这是最后一页啦！")
          return;
        }else if(this.p==this.pageNum){
          this.p =this.pageNum;
          this.message = "这是我的底线..."
          commonUserList(this.p,this.s).then(res=>{
            if(res.data.status == true){
              this.objList = this.objList.concat(res.data.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }else if(this.p<this.pageNum){
          commonUserList(this.p,this.s).then(res=>{
            if(res.data.status == true){
              this.message = "加载中..."
              this.objList =  this.objList.concat(res.data.data);
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        }
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
      margin-top: 0.1rem;
      li{
       width: 100%;
        height:3.8rem;
        position: relative;
        .design_offee_top{
          width: 100%;
          padding: 0 0.1rem;
          height: 2.9rem;
          box-sizing: border-box;
          .design_offee_top_img{
            width: 100%;
            height: 2rem;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .design_offee_top_centent{
            width: 100%;
            height: 0.6rem;
            padding: 0.15rem;
            box-sizing: border-box;
            background: #ffffff;
            .caredCount{
              width: 100%;
              font-size:0.16rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(197,197,198,1);
              margin-right: 0.1rem;
              line-height: 0.3rem;
              span{
                font-size:0.18rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(38,38,40,1);
              }
            }
          }
        }
        .design_offee_bottom{
          width: 100%;
          height: 1.5rem;
          position: absolute;
          left: 0;
          bottom: 0;
          background: url(../../../../static/images/touyingbg.png);
          background-size: 100% 100%;
          .design_offee_bottom_content{
            width: 100%;
            height: 0.9rem;
            background: #ffffff;
            position: absolute;
            left: 0;
            top:20px;
            padding: 0.25rem 0.2rem;
            box-sizing: border-box;
            overflow: hidden;
            /*box-shadow: 0px 30px 30px 30px rgba(5,5,9,0.08);*/
              .img3{
                width: 0.4rem;
                height:  0.4rem;
                margin-right: 0.05rem;
                float: left;
                img{
                  display: block;
                  width: 0.36rem;
                  height: 0.36rem;
                  border-radius: 50%;
                  border: 0.02rem solid #FCE76C;
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
                  color: #999999;
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
