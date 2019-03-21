<template>
 <!--大咖主页bigShotPage-->
  <div class="bigShotPage">
     <div class="bigShotPage_box">
        <div class="bigShotPage_people">
            <div class="bigShotPage_yellow"></div>
            <div class="bigShotPage_conten">
                <div class="bigShotPage_header">
                    <img src="/static/images/huanhui.png" alt="" @click ="goback">
                    <div class="button" @click="follow(listData)" v-if="listData.cared==false">关注</div>
                    <div class="button active" v-if="listData.cared==true" @click="cancefollow(listData)">取消关注</div>
                </div>
                <div class="bigShotPage_img">
                  <div></div>
                  <img :src="listData.ownerUrl?listData.ownerUrl:'https://pub.qinius.butongtech.com/defultphoto.png'" alt="">
                </div>
               <div class="bigShotPage_h5">
                 <div class="bigShotPage_"></div>
                 <div class="bigShotPage_name">
                   <h5>{{listData.name}}</h5>
                   <p>{{listData.engName}}</p>
                 </div>
               </div>
            </div>
        </div>

       <!--滚动-->
       <div class="positionBox">

       <div class="bigShotPage_image">
         <div class="bigShotPage_size">
           <span>照</span>
           <span>／</span>
           <span>片</span>
         </div>
         <div class="bigShotPage_ul" v-if="arrList.length>0">
           <ul :style="{width:(arrList.length*2.2+0.93)+'rem'}" v-if="arrList.length>1">
             <li style="width: 0.91rem;height: 2.6rem;margin: 0"></li>
             <li v-for="(item,index) in arrList">
               <img v-lazy="item.imageUrl" />
             </li>
           </ul>
           <ul :style="{width:(2*2.2+0.93)+'rem'}" v-if="arrList.length==1">
             <li style="width: 0.91rem;height: 2.6rem;margin: 0"></li>
             <li v-for="(item,index) in arrList">
               <img v-lazy="item.imageUrl" />
             </li>
             <li style="text-align: center;line-height: 2.6rem;color: #c5c5c6;background: #f6f6f6">
                没有更多了
             </li>
           </ul>
         </div>
       </div>

       <div class="bigShotPage_num_box" style="background: #ffffff;width: 100%">
         <div class="bigShotPage_num">
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
           <h5 v-if="!!designerUser.motto">“{{designerUser.motto}}”</h5>
           <p v-if="!!designerUser.summary">
             <span>{{designerUser.summary}}</span>
           </p>
           <div class="bigShotPage_bolang">
             <div class="bigShotPage_bolang1"></div>
           </div>
         </div>
       </div>


       <div class="bigShotPage_product">
         <div class="bigShotPage_scroll" @scroll="scrollWidth">
           <ul :style="{width:designerHonorList.length>1?(designerHonorList.length*170+230)+'px':'170px'}">
             <!--<ul :style="{width:(designerHonorList.length*170+230)+'px'}">-->
                 <li v-for="(item,index) in designerHonorList">
                     <img v-lazy="item.imageUrl+'?imageView2/1/w/150/h/150/q/75|imageslim'" alt="">
                 </li>
                 <li style="background: #f6f6f6;text-align: center;line-height: 1.5rem;color: #c5c5c6" v-if="designerHonorList.length>1">
                     没有更多作品啦
                 </li>
             </ul>
         </div>
         <div>
           <h5>
             {{designerHonorListName}}
           </h5>
           <p @click="bigImage(designerHonorList[p],designerHonorList)">放大查看 >></p>
         </div>
       </div>

       <div class="bigShotPage_article" v-if="dataList.length>0">
            <div class="bigShotPage_article_bg"></div>
            <div class="bigShotPage_article_size">
               <div class="bigShotPage_left">
                 <img src="/static/images/yuanchuangwenzhang.svg">
               </div>
              <ul class="bigShotPage_right">
                 <li v-for="(item,index) in dataList" v-if="index<2" @click="goDetail(item.id)">
                   {{item.title.length>24?item.title.slice(0,24)+'...':item.title}} >>
                 </li>
                 <p @click="goToMore" v-if="dataList.length>1">更多故事 >></p>
              </ul>
            </div>
       </div>

       <div class="bigShotPage_prize" v-if="honordItems.length>0">
            <ul>
              <p>奖 项</p>
              <li  v-for="(item,index) in honordItems" v-if="honordItems.length-1>index"><img src="/static/images/yellowdian.png" alt=""><span>{{item}}</span></li>
            </ul>
       </div>

       <div class="bigShotPage_foot"  @click="contactClick">
         联系不同，与我们共享设计生态 >
       </div>
       </div>
     </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import wxShare from "../../assets/js/wxShare"
  import { commonUserFindOne,commonUserCareUser,commonUserCancelCareUser,findInformationListByUserIdUserId,shareInfoShareUrl } from '../../assets/js/promiseHttp'; //数据
  export default {
    name: 'bigShotPage',
    components:{
    },
    data(){
      return{
        dataList:[], //文章数据
        listData:{},//企业的头部数据
        arrList:[], //照片的数组
        designerUser:{},//影像力数据
        designerHonorList:[],//作品
        designerHonorListName:"",//作品名字
        p:1,//页码
        page:1, //页码
        message:"不同正在努力加载中...",
        pageNum:0,//页码
        s:20,//页码
        honordItems:[],//奖项
      }
    },
    methods:{
      bigImage(src,arrlist){//点击放大图片
        let list = [];
        arrlist.forEach((item,index)=>{
          list.push(item.imageUrl)
        })
        wx.previewImage({
          current: src.imageUrl, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        });
      },
      goToMore(){//更多故事
        this.$router.push({path:"/moreStories",query:{id:this.$router.history.current.query.id}})
      },
      goDetail(id){//去文章详情
        this.$router.push({path:"/homeDetail" ,query: {id:id}})
      },
      scrollWidth(e){//作品的滚动
        this.designerHonorList.forEach((item,index)=>{
          if(e.target.scrollLeft>=index*170&&e.target.scrollLeft<index*170+150){
             this.p = index;
             this.designerHonorListName = item.name;
          }
        })
      },
      goback(){//还回上一级
        console.log(111)
        this.$router.go(-1);
      },
      cancefollow(v){//取消关注
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if(data){
          commonUserCancelCareUser(v.id,data.data.id,"2",data.data.access_token).then(res=>{
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
          commonUserCareUser(v.id,data.data.id,"2",data.data.access_token).then(res=>{
            if(res.data.status==true){
              v.cared = true;
              this.$shujike('关注');
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
        shareInfoShareUrl(encodeURIComponent(location.href.split('#')[0])).then(res=>{
          if(res.status==true){
            let obj = {
              title:this.listData.name,
              desc:this.listData.engName,
              url:"http://account.butongtech.com/index.html#/bigShotPage?id="+this.$router.history.current.query.id,
              imgUrl:this.listData.ownerUrl?this.listData.ownerUrl:'https://pub.qinius.butongtech.com/ios1024x1024%E6%A1%8C%E9%9D%A2%E5%9B%BE%E6%A0%87.png',
            }
            wxShare.wxShare(res.data,obj)
          }else{
            Toast("网络出错了，请重试")
          }
        })
      },
    },
    mounted(){
      let that = this;
      if(window.common.apiDomain20020=='https://dcloud.butongtech.com:20020'){
        setTimeout(()=>{
          that.share();
        },200)
      }
    },
    created(){

      let data = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):{data:{user_id:"",userType:""}};
      commonUserFindOne(this.$router.history.current.query.id,data.data.user_id,data.data.userType).then(res=>{
//      console.log(res,"djalsdl;")
        if(res.status == true){
          res.data.careCount = res.data.careCount?res.data.careCount:0;
          res.data.caredCount = res.data.caredCount?res.data.caredCount:0;
          res.data.laudedCount = res.data.laudedCount?res.data.laudedCount:0;
          res.data.engName = res.data.designerUser.title;
          res.data.designerUser.honordItems = !!res.data.designerUser.honordItems?res.data.designerUser.honordItems.split(","):[]
          this.honordItems =  res.data.designerUser.honordItems;
          res.data.starWidth = (res.data.designerUser.powerIndex*10)*0.7+"px";
          this.designerUser =  res.data.designerUser?res.data.designerUser:{moto:null,summary:""}
          console.log(this.designerUser,"this.designerUser")
          this.designerHonorList = res.data.designerUser.designerHonorList;
          this.listData = res.data;
          this.arrList = res.data.designerUser.userImagesList;
          this.$nextTick(function () {
          document.querySelector(".bigShotPage_scroll").scrollLeft = 2;
          })
        }else{
          Toast("网络出错了，请重试")
        }
      })
      findInformationListByUserIdUserId(this.$router.history.current.query.id,this.page,this.s).then(res=>{
//        console.log(res)
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
  .positionBox{
    position: absolute;
    left: 0;
    top: 2.2rem;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .bigShotPage{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    overflow-x: hidden;
    background: #EEEEEE;
    .bigShotPage_box{
      width: 100%;
      height: 100%;
      overflow-x: hidden;

      .bigShotPage_people{
        width: 100%;
        height: 2.2rem;
        position: relative;
        background: #ffffff;
        .bigShotPage_yellow{
          width:1.1rem;
          height:100%;
          float: right;
          background: #FCE76C;
        }
        .bigShotPage_conten{
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          .bigShotPage_header{
            width: 100%;
            height: 0.52rem;
            position: relative;
            img{
              display: inline-block;
              width: 0.18rem;
              height: 0.15rem;
              margin-left: 0.2rem;
              margin-top: 0.2rem;
              transform: rotate(180deg);
            }
            .button{
              display: inline-block;
              width: 0.8rem;
              height: 0.36rem;
              line-height: 0.36rem;
              border: 0.02rem solid #262626;
              border-radius: 0.24rem;
              float: right;
              margin-right: 0.15rem;
              margin-top: 0.16rem;
              font-weight:600;
              color:rgba(38,38,40,1);
              font-size: 0.14rem;
              text-align: center;
            }
            /*.active{*/
              /*color: #c5c5c6;*/
              /*border-color: #c5c5c6;*/
            /*}*/
          }
          .bigShotPage_img{
            width: 100%;
            height: 0.6rem;
            margin-top: 0.1rem;
            >div{
              width: 0.9rem;
              height: 0.6rem;
              float: left;
            }
            >img{
               display: block;
              float: left;
              width: 0.6rem;
              height: 0.6rem;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
            }
          }
          .bigShotPage_h5{
            width: 100%;
            height: 1.06rem;
            padding: 0.12rem 0.15rem 0.1rem 0;
            display: flex;
            box-sizing: border-box;
            >.bigShotPage_{
              width: 0.9rem;
              height:100%;
            }
            .bigShotPage_name{
                flex: 1;
                height: 0.84rem;
              h5{
                max-height:0.42rem;
                font-size:0.18rem;
                font-weight:500;
                color:rgba(38,38,40,1);
                line-height:0.21rem;
                word-break:break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-family: '微软雅黑';
              }
              p{
                max-height:0.28rem;
                font-size:0.12rem;
                font-weight:400;
                color:#676768;
                line-height:0.15rem;
                word-break:break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-top: 0.08rem;
                font-family: '微软雅黑';
              }
            }
          }
        }
      }
      .bigShotPage_image{
        width: 100%;
        height: 2.7rem;
        position: relative;
        overflow: hidden;
        background: #ffffff;
        padding-top: 0.1rem;
        box-sizing: border-box;
        .bigShotPage_size{
          padding-top: 0.52rem;
          width: 0.91rem;
          position: absolute;
          left: 0;
          top: 0;
          height: 2.6rem;
          box-sizing: border-box;
          span{
            font-size: 0.12rem;
            display: block;
            width: 12px;
            color: #262626;
            margin: 0 auto;
            font-weight: 500;
            transform:rotate(90deg);
            -ms-transform:rotate(90deg); 	/* IE 9 */
            -moz-transform:rotate(90deg); 	/* Firefox */
            -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
            -o-transform:rotate(90deg);
          }
        }
        .bigShotPage_ul{
          width: 100%;
          height: 2.6rem;
          overflow-y: scroll;
          ul{
            height: 2.6rem;
            li{
              width: 2.1rem;
              height: 2.6rem;
              float: left;
              margin-right: 0.1rem;
              img{
                width: 2.1rem;
                height: 2.6rem;
                display: block;
              }
            }
          }
        }
      }
      .bigShotPage_num_box{
        width: 100%;
        height: 4.47rem;
        background: #ffffff;
        padding-top: 0.43rem;
        box-sizing: border-box;
      }
      .bigShotPage_num{
        width: 3.2rem;
        height: 4.27rem;
        background:rgba(246,246,246,1);
        margin-left: 0.2rem;
        padding: 0.38rem 0 0 0;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        ul{
          width: 100%;
          display: flex;
          height: 0.61rem;
          li{
            flex: 1;
            text-align: center;
            b{
              display: block;
              width: 100%;
              font-size:0.18rem;
              font-family:'微软雅黑';
              font-weight:500;
              color:rgba(38,38,40,1);
              line-height:0.24rem;
            }
            >div{
              width: 100%;
              font-size:0.13rem;
              /*font-family:'微软雅黑';*/
              font-weight:400;
              color:#676768;
              line-height:0.17rem;
              margin-top: 0.08rem;
            }
          }
        }
        h5{
          width: 100%;
          padding: 0 0.3rem;
          box-sizing: border-box;
          font-size:0.16rem;
          height: 1rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          margin-top: 0.04rem;
          line-height: 0.25rem;
          color:rgba(38,38,40,1);
          word-break:break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        p{
          width: 100%;
          padding: 0 0.3rem;
          box-sizing: border-box;
          width: 100%;
          height: 1.51rem;
          margin-top: 0.1rem;
          font-size:0.13rem;
          font-family:Roboto-Light;
          letter-spacing: 0.01rem;
          font-weight:300;
          color:#676768;
          line-height:0.22rem;
          word-break:break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
        }
      }
      .bigShotPage_bolang{
        width: 10.39rem;
        height: 0.56rem;
        position: absolute;
        left: 0;
        bottom: 0;
        animation: leftBox 55s infinite;
        background: url(../../assets/images/bolang2.png);
        .bigShotPage_bolang1{
          width: 10.39rem;
          height: 0.41rem;
          background: url(../../assets/images/bolang3.png);
          position: absolute;
          left: 0;
          bottom: 0;
          animation: leftBox 40s infinite;
        }
      }
      .bigShotPage_product{
        width: 100%;
        height: 319px;
        padding: 30px 0 57px 20px;
        box-sizing: border-box;
        overflow: hidden;
        background: #ffffff;
        .bigShotPage_scroll{
          overflow-y: hidden;
          overflow-x: scroll;
          height: 150px;
          ul{
            height: 150px;
            li{
              width: 150px;
              height: 150px;
              margin-right: 20px;
              float: left;
              border: 0.01rem solid #f5f5f5;
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
          margin-top: 25px;
          h5{
            height:22px;
            font-size:16px;
            font-weight:500;
            color:rgba(38,38,40,1);
            line-height:19px;
            word-break:break-all;
            font-family: '微软雅黑';
          }
          p{
            height:16px;
            font-size:11px;
            font-weight:400;
            color:#c5c5c6;
            line-height:16px;
            word-break:break-all;
            margin-top: 0.05rem;
           font-family: '微软雅黑';
          }
        }
      }
      .bigShotPage_article{
        width: 100%;
        height: 2.45rem;
        position: relative;
        .bigShotPage_article_bg{
          width: 100%;
          height: 1.74rem;
          background: #ffffff;
        }
        .bigShotPage_article_size{
          width: 3.55rem;
          min-height: 2.45rem;
          background:#FCE76C;
          position: absolute;
          left: 0;
          top:0;
          padding: 0.4rem 0;
          box-sizing: border-box;
          overflow: hidden;
          .bigShotPage_left{
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
          .bigShotPage_right{
           width: 2.15rem;
            float: left;
            li{
              width: 100%;
              height: 0.6rem;
              line-height: 0.2rem;
              border-bottom: 0.01rem solid #DEC63B;
              font-size:0.13rem;
              font-weight:300;
              color:rgba(102,95,60,1);
              box-sizing: border-box;
            }
            li:last-child{
              border-bottom:0;
            }
            li:nth-child(2){
              border-bottom:0;
              padding: 0.09rem 0 0.09rem 0;
            }
            p{
              margin-top: 0.17rem;
              font-size:0.13rem;
              font-weight:400;
              color:rgba(38,38,40,1);
              word-break:break-all;
            }
          }
        }
      }
      .bigShotPage_prize{
        width: 100%;
        margin-top: 0.31rem;
        overflow: hidden;
        ul{
          width: 3.55rem;
          float: right;
          background: #ffffff;
          padding: 0.3rem 0.2rem;
          box-sizing: border-box;
          p{
              height:0.16rem;
              font-size:0.13rem;
              font-weight:500;
              color:#c5c5c6;
              line-height:0.16rem;
              margin-bottom: 0.1rem;
          }
          li{
             width: 100%;
            display: flex;
            img{
              display: inline-block;
              width: 0.06rem;
              height: 0.06rem;
              margin-top: 0.1rem;
            }
            span{
              display: inline-block;
              flex: 1;
              line-height: 0.28rem;
              font-size:0.13rem;
              font-weight:700;
              color:rgba(38,38,40,1);
              word-break:break-all;
              padding-left: 0.1rem;
              box-sizing: border-box;
            }
          }
        }
      }
      .bigShotPage_foot{
        width: 100%;
        height:0.6rem;
        background:rgba(252,231,108,1);
        text-align: center;
        line-height: 0.6rem;
        font-size:0.12rem;
        font-weight:700;
        color:rgba(38,38,40,1);
        margin-top: 0.41rem;
      }
    }
  }
  @keyframes  leftBox{
    to {left: 0rem}
    from {left: -2rem}
  }
</style>
