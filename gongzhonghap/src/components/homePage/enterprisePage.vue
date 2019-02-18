<template>
 <!--企业主页enterprisePage-->
   <div class="enterprisePage">
      <div class="enterprisePage_box">
         <div class="enterprisePage_header">
             <img src="/static/images/jiantouLeft.png" alt="" @click="goback">
             <button @click="follow(listData)" v-if="listData.cared==false">关注</button>
             <button class="active" v-if="listData.cared==true" @click="cancefollow(listData)">取消关注</button>
             <div class="yellow"></div>
           </div>
          <div class="enterprisePage_title">
            <div class="yellow"></div>
            <div class="enterprisePage_title_content">
              <div class="enterprisePage_logurl">
                <img :src="listData.logoUrl?listData.logoUrl:'/static/images/defultphoto.png'" alt="">
              </div>
               <div class="enterprisePage_name">
                 <h5>{{listData.name}}</h5>
                 <p>{{listData.engName}}</p>
               </div>
            </div>
          </div>
         <div class="enterprisePage_num">
               <div>

               </div>
              <ul>
                <li>
                  <b>{{listData.caredCount>10000?listData.caredCount/10000+'万':listData.caredCount}}</b>
                  <div>关注</div>
                </li>
                <li>
                  <b>{{listData.careCount>10000?listData.careCount/10000+'万':listData.careCount}}</b>
                  <div>粉丝</div>
                </li>
                <li>
                  <b>{{listData.laudedCount>10000?listData.laudedCount/10000+'万':listData.laudedCount}}</b>
                  <div>点赞</div>
                </li>
              </ul>
         </div>

        <div class="enterprisePage_product" v-if="companyExtendType2.length>0">
          <div class="enterprisePage_scroll" @scroll="scrollWidth">
            <ul :style="{width:companyExtendType2.length>1?(companyExtendType2.length*170+230)+'px':'170px'}">
              <li v-for="(item,index) in companyExtendType2">
                <img :src="item.imageUrl+'?imageView2/1/w/150/h/150/q/75|imageslim'" alt="">
              </li>
              <li style="background: #FCE76C;text-align: center;line-height: 1.5rem;color: #c5c5c6" v-if="companyExtendType2.length>1">
                没有更多作品啦!
              </li>
            </ul>
          </div>
          <div>
            <h5>
              {{designerHonorListName}}
            </h5>
            <p @click="lookmoreClick(companyExtendType2)"> 更多作品 <img src="/static/images/bigshotRight.png" alt=""></p>
          </div>
        </div>

        <div class="enterprisePage_article" v-if="dataList.length>0">
          <div class="enterprisePage_article_bg"></div>
          <div class="enterprisePage_article_size">
            <div class="enterprisePage_left">
              <img src="/static/images/yuanchuangwenzhang.png" alt="">
            </div>
            <ul class="enterprisePage_right">
              <li v-for="(item,index) in dataList" v-if="index<2" @click="goDetail(item.id)">
                {{item.title.length>24?item.title.slice(0,24)+'...':item.title}}
                <img src="/static/images/sizeRight.png" alt="">
              </li>
              <p @click="goToMore" v-if="dataList.length>1">更多故事 >></p>
            </ul>
          </div>
        </div>

        <div class="enterprisePage_prize" v-if="honordItems.length>0||majorScope.length>0">
          <ul class="enterprisePage_prize_one" v-if="majorScope.length>0">
            <p>主攻领域</p>
            <li  v-for="(item,index) in majorScope" v-if="index<majorScope.length-1"><span>{{item}}</span></li>
          </ul>
          <ul class="enterprisePage_prize_two" v-if="honordItems.length>0">
            <p>奖项</p>
            <li  v-for="(item,index) in honordItems" v-if="index<honordItems.length-1"><img src="/static/images/yellowdian.png" alt=""><span>{{item}}</span></li>
          </ul>
        </div>

        <div class="enterprisePage_patent" v-if="companyExtendType1.length>0">
           <div class="enterprisePage_patent_bg"></div>
           <div class="enterprisePage_patent_content">
             <img :src="companyExtendType1[0].imageUrl+'?imageView2/1/w/295/h/221/q/75|imageslim'" alt="">
             <h5>
               {{companyExtendType1[0].name}}
             </h5>
             <p>知识专利（发明、实用新型、外观)</p>
           </div>
          <img class="img" src="/static/images/gengduozhuanli.png" alt="" @click="lookmoreClick(companyExtendType1)">
        </div>

        <div class="enterprisePage_brand" :style="{height:patentHeight/100+'rem'}" v-if="companyCooperationBrandsList.length>0">
             <div class="enterprisePage_brand_bg" :style="{bottom:bottomPosition,height:(patentHeight-40)/100+'rem'}"></div>
             <div class="enterprisePage_brand_content" ref="patentHeight">
                  <p>品　/　牌　/　合　/　作</p>
                 <ul>
                   <li v-for="(item,index) in companyCooperationBrandsList">
                     <img :src="item.imageUrl" alt="">
                   </li>
                 </ul>
             </div>
        </div>

        <div class="enterprisePage_foot"  @click="contactClick">
          联系不同，与我们共享设计生态 >
        </div>

      </div>
   </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { companyInfoFindOne,companyInfoCareCompany,companyInfoCancelCareCompany,findInformationListByUserIdUserId,shareInfoShareUrl } from '../../assets/js/promiseHttp'; //数据
export default {
  name: 'enterprisePage',
    components:{
    },
  data(){
    return{
      patentHeight:"2.01rem", //
      dataList:[], //文章数据
      listData:{},//企业的头部数据
      designerHonorListName:"",//作品的名字
      companyExtendType2:[], //作品
      companyExtendType1:[], //专利
      p:1,//页码
      page:1, //页码
      message:"不同正在努力加载中...",
      pageNum:0,//页码
      s:20,//页码
      honordItems:[],//奖项
      majorScope:[],//领域
      companyCooperationBrandsList:[],//品牌合作
      bottomPosition:0
    }
  },
  methods:{
    goDetail(id){//去文章详情
      this.$router.push({path:"/homeDetail",query: {id:id}})
    },
    goToMore(){//更多故事
      this.$router.push({path:"/moreStories",query:{id:this.$router.history.current.query.id}})
    },
    lookmoreClick(v){ //更多作品
      window.localStorage.setItem("lookmoreDetail",JSON.stringify(v)) // 把数据保存在本地另开页面展示
      this.$router.push({path:"/lookMore"})
    },
    scrollWidth(e){ //滚动作品
      this.listData.companyExtendType2.forEach((item,index)=>{
        if(e.target.scrollLeft>=index*170&&e.target.scrollLeft<index*170+150){
          this.p = index;
          this.designerHonorListName = item.name;
        }
      })
    },
    goback(){//还回上一级
      this.$router.go(-1);
    },
    cancefollow(v){//取消关注
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
        companyInfoCancelCareCompany(v.id,data.data.id,"1",data.data.access_token).then(res=>{
          if(res.data.status==true){
            v.cared = false;
            Toast("你已取消关注")
          }else{
            Toast("取消关注500出错啦")
          }
        })
      }else{
        Toast("您还未登，请登录")
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }
    },
    follow(v){//关注
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
        companyInfoCareCompany(v.id,data.data.id,"1",data.data.access_token).then(res=>{
          if(res.data.status==true){
            v.cared = true;
            Toast("关注成功")
          }else{
            Toast("关注500出错啦")
          }
        })
      }else{
        Toast("您还未登，请登录")
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }
    },
    contactClick(){ //联系不同
      this.$router.push({path:"/contact"})
    },
    share(){//分享

      let url = "http://account.butongtech.com/"
      shareInfoShareUrl(url).then(res=>{
        if(res.status==true){
          let obj = {
            title:this.listData.name,
            desc:this.listData.engName,
            url:"http://account.butongtech.com/index.html#/enterprisePage?id="+this.$router.history.current.query.id,
            imgUrl:this.listData.logoUrl?this.listData.logoUrl:'https://pub.qinius.butongtech.com/ios1024x1024%E6%A1%8C%E9%9D%A2%E5%9B%BE%E6%A0%87.png',
          }
          wxShare.wxShare(res.data,obj)
        }else{
          Toast("网络出错了，请重试")
        }
      })
    },
  },
  created(){
    this.$nextTick(function () {
      document.title = "工坊主页"
    })
    let data = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):{data:{user_id:"",userType:""}};
    companyInfoFindOne(this.$router.history.current.query.id,data.data.user_id,data.data.userType).then(res=>{
//        console.log(res,"djalsdl;")
      if(res.status == true){
        this.companyCooperationBrandsList = res.data.companyCooperationBrandsList?res.data.companyCooperationBrandsList:[];
        this.honordItems =res.data.honordItems?res.data.honordItems.split(","):[];
        this.majorScope =res.data.majorScope?res.data.majorScope.split(","):[];
        res.data.companyExtendType1= [];
        res.data.companyExtendType2= [];
        if(res.data.companyExtendItemsList.length >0){
          res.data.companyExtendItemsList.forEach((item,index)=>{
            if(item.companyExtendType == "1"){//知识产权
              res.data.companyExtendType1.push(item)
            }else if(item.companyExtendType == "2"){//作品
              res.data.companyExtendType2.push(item)
            }
          })
        }
        this.companyExtendType2 =  res.data.companyExtendType2;
        this.companyExtendType1=  res.data.companyExtendType1;
        this.designerHonorListName = res.data.companyExtendType2.length>0?res.data.companyExtendType2[0].name:"无";
        this.listData = res.data;
        if(res.data.companyCooperationBrandsList.length>0){
          this.$nextTick(()=>{
            this.patentHeight = this.$refs.patentHeight.offsetHeight+80;
            this.bottomPosition= 0;
          })
        }

      }else{
        Toast("网络出错了，请重试")
      }
    })
    findInformationListByUserIdUserId(this.$router.history.current.query.id,this.page,this.s).then(res=>{
//      console.log(res)
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

  }


}

</script>

<style scoped lang="less">
.enterprisePage{
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: #eeeeee;
    .enterprisePage_box{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    .enterprisePage_header{
      width: 100%;
      height: 0.52rem;
      position: relative;
      background: #ffffff;
      img{
        display: inline-block;
        width: 0.13rem;
        height: 0.13rem;
        margin-left: 0.12rem;
        margin-top: 0.2rem;
      }
      button{
        display: inline-block;
        width: 0.8rem;
        height: 0.36rem;
        line-height: 0.36rem;
        border: 0.02rem solid #262626;
        outline: none;
        background: #ffffff;
        border-radius: 0.24rem;
        float: right;
        margin-right: 0.51rem;
        margin-top: 0.16rem;
        font-weight:600;
        color:rgba(38,38,40,1);
        font-size: 0.14rem;
        text-align: center;
      }
      .active{
        color: #c5c5c6;
        border-color: #c5c5c6;
      }
      >.yellow{
        width:0.15rem ;
        height: 100%;
        background: #FCE76C;position: absolute;
        right: 0;
        top: 0;
      }
    }
    .enterprisePage_title{
      width: 100%;
      height: 1.11rem;
      position: relative;
      background: #ffffff;
      >.yellow{
        width:0.15rem ;
        height: 100%;
        background: #FCE76C;position: absolute;
        right: 0;
        top: 0;
      }
      .enterprisePage_title_content{
        position: absolute;
        left: 0;
        top: 0;
        right: 0.25rem;
        bottom: 0;
        display: flex;
        .enterprisePage_logurl{
          width: 1.0rem;
          height: 100%;
          img{
            display: block;
            width: 0.7rem;
            height: 0.7rem;
            margin-top: 0.41rem;
          }
        }
        .enterprisePage_name{
          flex: 1;
          height: 0.7rem;
          padding-top: 0.41rem;
          h5{
            max-height:0.42rem;
            font-size:0.18rem;
            font-family:Roboto-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:0.21rem;
            word-break:break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          p{
            max-height:0.28rem;
            font-size:0.11rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(38,38,40,1);
            line-height:0.14rem;
            word-break:break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

      }
    }
    .enterprisePage_num{
      width: 100%;
      height: 0.78rem;
      display: flex;
      background: #ffffff;
      >div{
        width: 1rem;
        height: 0.78rem;
      }
      ul{
        flex: 1;
        padding-top: 0.2rem;
        padding-right: 0.2rem;
        box-sizing: border-box;
        display: flex;
        li{
         flex: 1;
          b{
            height:0.21rem;
            font-size:0.18rem;
            font-family:Roboto-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:0.21rem;
          }
          >div{
            height:0.16rem;
            font-size:0.11rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(38,38,40,1);
            line-height:0.16rem;
          }
        }
      }
    }
      .enterprisePage_product{
        width: 100%;
        height: 299px;
        padding: 30px 0 57px 20px;
        box-sizing: border-box;
        overflow: hidden;
        background: #ffffff;
        .enterprisePage_scroll{
          overflow-x: scroll;
          height: 150px;
          ul{
            height: 150px;
            li{
              width: 150px;
              height: 150px;
              margin-right: 20px;
              float: left;
              img{
                display: block;
                width: 150px;
                height: 150px;
              }
            }
          }
        }
        >div{
          padding-right:20px ;
          box-sizing: border-box;
          margin-top: 23px;
          h5{
            height:22px;
            font-size:16px;
            font-family:Roboto-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:19px;
            word-break:break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p{
            height:16px;
            font-size:11px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(38,38,40,1);
            line-height:16px;
            word-break:break-all;
            img{
              display: inline-block;
              width: 13px;
              height: 6px
            }
          }
        }
      }
      .enterprisePage_article{
        width: 100%;
        height: 2.45rem;
        position: relative;
        .enterprisePage_article_bg{
          width: 100%;
          height: 1.74rem;
          background: #ffffff;
        }
        .enterprisePage_article_size{
          width: 3.55rem;
          min-height: 2.45rem;
          background:#FCE76C;
          position: absolute;
          left: 0;
          top:0;
          padding: 0.4rem 0;
          box-sizing: border-box;
          overflow: hidden;
          .enterprisePage_left{
            float: left;
            width: 0.7rem;
            height: 100%;
            img{
              width: 0.12rem;
              height: 1.55rem;
              display: block;
              margin-left: 0.21rem;
            }
          }
          .enterprisePage_right{
            width: 2.25rem;
            float: left;
            li{
              width: 100%;
              height: 0.6rem;
              line-height: 0.2rem;
              border-bottom: 0.01rem solid #DEC63B;
              font-size:0.13rem;
              font-family:PingFangSC-Light;
              font-weight:300;
              color:rgba(102,95,60,1);
              padding: 0.09rem 0;
              box-sizing: border-box;
              img{
                display: inline-block;
                width: 0.15rem;
                height: 0.07rem;
              }
            }
            li:last-child{
              border-bottom:0;
            }
            p{
              margin-top: 0.21rem;
              font-size:0.13rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(38,38,40,1);
              word-break:break-all;
            }
          }
        }
      }
      .enterprisePage_prize{
        width: 100%;
        margin-top: 0.31rem;
        overflow: hidden;
        .enterprisePage_prize_one{
          width: 3.55rem;
          float: right;
          background: #ffffff;
          padding: 0.3rem 0.2rem 0 0.2rem;
          box-sizing: border-box;
          overflow: hidden;
          p{
            height:0.16rem;
            font-size:0.11rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:0.16rem;
            margin-bottom: 0.19rem;
          }
          li{
            height:0.22rem;
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:0.22rem;
            float: left;
            padding: 0.04rem 0.15rem;
            border-radius:1rem;
            border:0.01rem solid rgba(252,231,108,1);
            margin-bottom: 0.12rem;
            margin-right: 0.12rem;
          }
        }
        .enterprisePage_prize_two{
          width: 3.55rem;
          float: right;
          background: #ffffff;
          padding: 0.3rem 0.2rem;
          box-sizing: border-box;
          p{
            height:0.16rem;
            font-size:0.11rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:0.16rem;
            margin-bottom: 0.19rem;
          }
          li{
            width: 100%;
            display: flex;
            img{
              display: inline-block;
              width: 0.08rem;
              height: 0.08rem;
              margin-top: 0.08rem;
            }
            span{
              display: inline-block;
              flex: 1;
              line-height: 0.22rem;
              font-size:0.13rem;
              font-family:Roboto-Medium;
              font-weight:500;
              color:rgba(38,38,40,1);
              word-break:break-all;
              padding-left: 0.19rem;
              box-sizing: border-box;
            }
          }
        }
      }
      .enterprisePage_patent{
        width:3.55rem;
        height: 3.07rem;
        margin-top: 0.31rem;
        position: relative;
        overflow: hidden;
        >.img{
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 1;
          width: 0.43rem;
          height: 0.43rem;
        }
        .enterprisePage_patent_bg{
          width: 100%;
          height: 2.71rem;
          background: #ffffff;
          margin-top: 0.36rem;
        }
        .enterprisePage_patent_content{
          width: 2.95rem;
          height: 100%;
          position: absolute;
          left: 0.4rem;
          top:0;
          img{
            display: block;
            width: 2.95rem;
            height: 2.21rem;
          }
          h5{
            margin-top: 0.15rem;
            height:0.2rem;
            font-size:0.14rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:0.2rem;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;
          }
          p{
            height:0.22rem;
            font-size:0.13rem;
            font-family:PingFangSC-Light;
            font-weight:300;
            color:rgba(38,38,40,1);
            line-height:0.22rem;
          }
        }
      }
      .enterprisePage_brand{
        width: 100%;
        position: relative;
        overflow: hidden;
        margin-top: 0.2rem;
        .enterprisePage_brand_bg{
          width: 100%;
          position: absolute;
          left: 0;
          background: #ffffff;
        }
        .enterprisePage_brand_content{
          width: 3.35rem;
          background:rgba(38,38,40,1);
          position: absolute;
          right: 0;
          top: 0;
          z-index: 1;
          p{
            height:0.18rem;
            font-size:0.13rem;
            font-family:PingFangSC-Light;
            font-weight:300;
            color:rgba(255,255,255,1);
            line-height:0.18rem;
            width: 100%;
            padding: 0 0.3rem;
            margin: 0.26rem 0;
          }
          ul{
            width: 100%;
            padding: 0.23rem 0.2rem 0.4rem 0.29rem;
            border-top: 0.01rem solid rgba(45,45,48,1);
            flex-wrap: wrap;
            box-sizing: border-box;
            li{
              display: inline-block;
              width: 22%;
              margin-right: 0.08rem;
              margin-bottom: 0.08rem;
              height: 0.31rem;
              img{
                display: block;
                /*width: 100%;*/
                /*height: 0.31rem;*/
              }
            }
          }
        }
      }
      .enterprisePage_foot{
        width: 100%;
        height:0.6rem;
        background:rgba(252,231,108,1);
        text-align: center;
        line-height: 0.6rem;
        font-size:0.12rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(38,38,40,1);
      }
  }
}
</style>
