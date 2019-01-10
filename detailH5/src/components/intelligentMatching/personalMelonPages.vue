<template>
  <!--个人吃瓜页-->
  <div id="personalMelonPages">
    <div class="personalMelonPages_header" ref="offsetHeight">
      <img :src="listData.ownerUrl?listData.ownerUrl:'/static/images/defultphoto.png'" alt="" class="personalMelonPages_header_img">
      <div class="personalMelonPages_header_box">
        <ul class="personalMelonPages_header_ul">
          <li class="personalMelonPages_header_li1">
            <img :src="listData.ownerUrl?listData.ownerUrl:'/static/images/defultphoto.png'" alt="">
          </li>
          <li class="personalMelonPages_header_li2">
            <b>{{listData.name}}</b>
            <div>{{listData.regionName}}</div>
          </li>
          <li class="personalMelonPages_header_li3">
            <div>
              <!--<div v-if="listData.cared==false" @click="followClick('关注',listData)"><img src="/static/images/关注.png" alt="">关注</div>-->
              <!--<div class="active" v-if="listData.cared==true" @click="followClick('已关注',listData)"><img src="/static/images/gou.png" alt="">已关注</div> -->
              <div v-if="listData.cared==false"><img src="/static/images/关注.png" alt="">关注</div>
              <div class="active" v-if="listData.cared==true"   ><img src="/static/images/gou.png" alt="">已关注</div>
            </div>
          </li>
        </ul>
        <ul class="personalMelonPages_header_ul1">
          <li>
            <b>{{listData.careCount?listData.careCount:0}}</b>
            <p>关注</p>
          </li>
          <li>
            <b>{{listData.caredCount?listData.caredCount:0}}</b>
            <p>粉丝</p>
          </li>
          <li>
            <b>{{listData.laudCount?listData.laudCount:0}}</b>
            <p>点赞</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="componentsBox" v-if="imgsArr.length>0">
      <ul id="box">
        <li v-for="(item,index) in imgsArr" @click="clickFn(item,index)" >
          <img :src="item.imageUrl1" alt="">
          <h5>{{item.title}}</h5>
          <ul class="img-info_ul">
            <li  class="img-info_li1"><img :src="item.authorInfo.ownerUrl?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt=""></li>
            <li class="img-info_li2">{{item.authorInfo.name}}</li>
            <li class="img-info_li3"><img src="/static/images/点赞1.png" alt=""></li>
            <li class="img-info_li4">{{item.laudedCount}}</li>
          </ul>
        </li>
        <!--<li style="text-align: center;line-height: 1.0rem;color: #999999" v-if="!!message">-->
          <!--{{message}}-->
        <!--</li>-->
      </ul>
    </div>

    <div class="lengthSmall" v-else>
      <img src="/static/images/原创.png" alt="">
      <p>{{listData.name}}还没有进行任何创作哦～</p>
    </div>
  </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {customerPubContentList,commonUserFindOne,commonUserCareUser,commonUserCancelCareUser,companyInfoCareCompany,companyInfoCancelCareCompany} from "../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
    components: {
      vueWaterfallEasy
    },
    data(){
      return{
        message:"",
        BjImg:"/static/images/5.png", //高斯模糊的背景
        listData:{}, //头部数据
        p: 1, // request param//
        s: 20, // request param////测试
        pages:0, //总共多少页
        isFirstLoad:true, //第一次加载
        maxCols:2,  //瀑布流显示最大的列数
        openPullDown:true,//下拉刷新
        imgsArr:[], //数据
        userInfo:"", //用户信息
        offsetHeight:0,//头部高度
        gap : 5, //10px的像素差距
      }
    },
    created() {
      this.$nextTick(function () {
        window.addEventListener('scroll',this.handleScroll,true) //监听高度
      })
      this.userInfo = {data:{id:this.$router.history.current.query.id,access_token:this.$router.history.current.query.token}}
      console.log(this.$router.history.current.query.id)
      commonUserFindOne(this.$router.history.current.query.id).then(res=>{
        if(res.status == true){
          this.listData =res.data
          this.$nextTick(function () {
            document.title = res.data.name +"的主页"
          })
        }else{
          Toast("网络出错了，请重试")
        }
      })

      this.IndicatorData();
    },
    methods:{
      IndicatorData(){ //初始数据
        customerPubContentList(this.$router.history.current.query.id,this.p,this.s).then(res=>{
          if(res.status == true){
            res.data.forEach((item,index)=>{
              item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            this.pages = Math.ceil(res.total/this.s);
            this.imgsArr = res.data;
            setTimeout(()=>{
              this.$nextTick(function(){
                let  box = document.getElementById('box');
                let items = box.children;
                this.waterFull(items);
              })
            },200)

          }else{
            Indicator.close();
            Toast("网络出错了，请重试")
          }
        })
      },
      followClick(v,v1){ //点击是不是关注了
        if(this.userInfo.access_token){
          if(v=='关注'){ //关注
            commonUserCareUser(v1.id,this.userInfo.data.id,"2").then(res=>{
              if(res.data.status==true){
                v1.cared =true
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }else if(v=='已关注'){//取消关注
            commonUserCancelCareUser(v1.id,this.userInfo.data.id,"2").then(res=>{
              if(res.data.status==true){
                v1.cared =false
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }
        }else{
          Toast("您还未登陆，请登陆");
          setTimeout(()=>{
            this.push({path:"/login"});
          },1000)
        }

      },
      clickFn(value,i){ //进入详情页
        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
      },
      handleScroll(e){  //回到顶部按钮出现
//          console.log(e,"scrollTop")
//          console.log(e.target.scrollTop,"scrollTop")
//          console.log(e.target.scrollHeight,"OffsetHeight")
//          console.log(e.target.OffsetHeight,"OffsetHeight")
        if(e.target.scrollTop>=(e.target.scrollHeight-e.target.clientHeight-0.5)){

          this.p++
          let that = this;
          if(that.pages<that.p){
            that.p = that.pages;
            this.message = "这是我的底线...";
            Toast("被你看光啦")
            return;
          }else if(that.pages==that.p){
            customerPubContentList(this.$router.history.current.query.id,this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                setTimeout(()=>{
                  this.$nextTick(function(){
                    let  box = document.getElementById('box');
                    let items = box.children;
                    this.waterFull(items);
                  })
                },200)

              }else{
                Toast("网络出错了，请重试")
              }
            })
          }else if(that.pages>that.p){
            customerPubContentList(this.$router.history.current.query.id,this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                setTimeout(()=>{
                  this.$nextTick(function(){
                    let  box = document.getElementById('box');
                    let items = box.children;
                    this.waterFull(items);
                  })
                },200)
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }
        }

      },
      waterFull(items){//瀑布流
        // 1- 确定列数  = 页面的宽度 / 图片的宽度
        let columns = 2; //2列
        let itemWidth= (this.sizeWidth().width - this.gap) /2; //2列每列的宽度
        var arr = [];
        for(var i= 0 ;i<items.length;i++){
//        console.log(items[i].offsetHeight,"items")
          if(i<columns){
            // 2- 确定第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + this.gap) * i + 'px';
            arr.push(items[i].offsetHeight);
          }else{
// 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
              if (minHeight > arr[j]) {
                minHeight = arr[j];
                index = j;
              }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度 + gap
            items[i].style.top = arr[index] + this.gap + 'px';
            // left值就是最小列距离左边的距离
            items[i].style.left = items[index].offsetLeft + 'px';

            // 5- 修改最小列的高度
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + this.gap;
          }
        }
      },
      sizeWidth() {//宽，高
        return {
          width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
      },
    },
    mounted() {
//      window.addEventListener('scroll',this.handleScroll,true) //监听高度
    },
  }

</script>

<style scoped lang="less">
  #personalMelonPages {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .personalMelonPages_box{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top:1.8rem;
      box-sizing: border-box;
    }
    .personalMelonPages_header{
      width: 100%;
      height: 1.7rem;
      .personalMelonPages_header_img{
        display: inline-block;
        height: 100%;
        width: 100%;
        filter: blur(15px);
        opacity:0.3;
      }
      .personalMelonPages_header_box{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top:0;
        padding-top: 0.32rem ;
        box-sizing: border-box;
        .personalMelonPages_header_ul{
          width: 100%;
          display: flex;
          padding: 0 0.16rem;
          box-sizing: border-box;
          .personalMelonPages_header_li1{
            width: 0.6rem;
            height: 0.6rem;
            img{
              display: block;
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 50%;
            }
          }
          .personalMelonPages_header_li2{
            width: 1.9rem;
            float: left;
            margin-left: 0.1rem;
            height: 0.6rem;
            b{
              width: 100%;
              display: block;
              font-size:0.12rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
              max-height: 0.4rem;
              line-height: 0.2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            >div{
              line-height: 0.2rem;
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(51,51,51,1);
            }
          }
          .personalMelonPages_header_li3{
            float: right;
            margin-top: 0.15rem;
            >div{
              width: 0.7rem;
              height: 0.3rem;
              text-align: center;
              line-height: 0.32rem;
              border-radius: 0.03rem;
              border: 0.01rem solid #000000;
              float: right;
              div{
                width: 100%;
                img{
                  width: 0.1rem;
                  height: 0.11rem;
                  display: inline-block;
                  margin-right: 0.05rem;
                }
              }
              div.active{
                background: rgba(5,5,9,0.9);
                color: #ffffff;
              }

            }

          }

        }
        .personalMelonPages_header_ul1{
          position: absolute;
          left: 0;
          top: 1.2rem;
          width: 100%;
          height: 0.5rem;
          display: flex;
          background:rgba(255,255,255,0.3);
          li{
            flex: 1;
            text-align: center;
            padding-top: 0.05rem;
            b{
              font-size:0.15rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(5,5,9,1);
            }
            p{
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height: 0.16rem;
            }
          }
        }
      }
    }
  }
  .componentsBox{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top:1.8rem;
    right: 0;
    overflow: hidden;
    >ul{
      width: 100%;
      height: 100%;
      overflow: scroll;
      position: relative;
      >li{
        width: 49.2vw;
        position: absolute;
        background: #ffffff;
        >img{
          display: block;
          width: 100%;

        }
        >h5{
          width: 100%;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(5,5,9,1);
          line-height:0.2rem;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break:break-all;
          padding: 0 0.05rem;
          box-sizing: border-box;
        }
        >.img-info_ul{
          width: 100%;
          overflow: hidden;
          margin-top: 0.05rem;
          padding: 0.05rem;
          box-sizing: border-box;
          .img-info_li1{
            width: 0.16rem;
            height: 0.16rem;
            float: left;
            img{
              display: block;
              width: 0.16rem;
              height: 0.16rem;
            }
          }
          .img-info_li2{
            float: left;
            width: 0.9rem;
            line-height: 0.16rem;
            margin-left: 0.05rem;
            font-size:0.1rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .img-info_li3{
            float: left;
            width: 0.14rem;
            height: 0.13rem;
            margin-right: 0.04rem;
            img{
              display: inline-block;
              width: 0.14rem;
              height: 0.13rem;
            }
          }
          .img-info_li4{
            float: left;
            font-size:0.1rem;
            line-height: 0.16rem;
          }

        }
      }
    }
  }
  .lengthSmall{
    width: 100%;
    height: 100%;
    background: #F7F7F7;
    padding-top: 0.5rem;
    img{
      width: 1rem;
      height: 0.94rem;
      display: block;
      margin: 0 auto;
    }
    p{
      width: 100%;
      line-height: 0.5rem;
      margin-top: 0.2rem;
      text-align: center;
      color:rgba(153,153,153,1);
    }
  }
</style>
