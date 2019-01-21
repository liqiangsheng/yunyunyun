<template>
  <!--首页-->
  <div id="homeIndex1_0">
    <ul class="homeIndex1_ul">
      <li v-for="(item,index) in headerTab" @click="tabClick(index)">
        <div class="homeIndex1_ul_li_div" :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">
          <span>{{item.Chinese}}</span>
          <p>{{item.English}}</p>
        </div>
      </li>
    </ul>
    <div class="homeIndex1_0_components">

      <keep-alive>
        <!--<Find v-if="headerTabIndex==0"></Find>-->
          <ul id="box" @scroll="boxScroll">
            <li v-for="(item,index) in imgsArr" @click.stop="clickFn(item,index)" >
              <img :src="item.imageUrl1" alt="">
              <div class="img-info_bottom">
                <img class="jiao" src="/static/images/小角.png" alt="">
                <div  class="img-info_li1">
                  <div class="img-info_li1_img">
                    <img :src="item.authorInfo.ownerUrl?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="">
                  </div>
                  <b>{{item.authorInfo.name}}</b>
                </div>
                <h5>{{item.title}}</h5>
                <!--<div class="img-info_li3">-->
                <!--<img src="/static/images/点赞.png" alt="" v-if="item.laudedStatus==false">-->
                <!--<img src="/static/images/点赞2.png" alt="" v-if="item.laudedStatus==true">-->
                <!--</div>-->
              </div>
            </li>
            <li style="text-align: center;line-height: 1.0rem;color: #999999" v-show="!!message">
            {{message}}
            </li>
          </ul>
      </keep-alive>
    </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
      </li>
    </ul>
  </div>
</template>

<script>
//  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import Find from './alter/find.vue';
  import Follow from './alter/follow.vue';
import { Toast } from 'mint-ui';  //弹框
import { Indicator } from 'mint-ui';
import {customerPubContentListHomePage} from "../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
    components:{
      Find,Follow
    },
    data(){
      return{
//        openPullDown:true,//下拉刷新
//        pages:0, //总共多少页
//        bookId:{
//        styleH:0,
//          p: 1, // request param//
//          s: 20, // request param//
//          bookId:"7",
//        }, //测试
        isShow:false, //开始显示
        imgsArr:[],
        headerTab:[{Chinese:"发现",English:"Find"},{Chinese:"关注",English:"Aattention"}], //tab
        headerTabIndex:0,//是关注还是发现
        tabbarAarr:[  //、、tab
          {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
          {icon:"./static/images/资讯2.png",icon1:"./static/images/资讯1.png",path:"/homeIndex"},
          {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
          {icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
          {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
        ],
        tabbarAarrIndex:0,  //点击tab的下标
        refshash:"下拉刷新",
        p:1,  //页
        s:10, //每页多少
        message:"", //触底提示
        pages:0,//每页数据
        isFirstLoad:true, //第一次加载
        maxCols:2,  //瀑布流显示最大的列数
        openPullDown:true,//下拉刷新
        OffsetHeight:0,//屏幕高度
        imgsArr:[], //数据
        userInfo:"", //用户信息
        pullDownDistance:0,//下拉的距离
        gap : 10, //10px的像素差距
        flag:false, //距离底部距离小于50
      }
    },
    created() {
      customerPubContentListHomePage(this.p,6).then(res=>{
//        console.log(res,"fdjsfgd")
        if(res.status==true){
          res.data.forEach((item,index)=>{
            item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.pages = Math.ceil(res.total/this.s)
          this.imgsArr = res.data;
          let that = this;
          Indicator.open("加载中")
          setTimeout(()=>{
            this.$nextTick(function(){
              let  box = document.getElementById('box');
              let items = box?box.children:[];
              that.waterFull(items);
              Indicator.close()
            })
          },250)
        }else{
          Toast("网络出错了，请重试")
        }
      })
    },
    methods:{
      tabarClick(i){  //tabar点击事件
        this.$router.push({path:this.tabbarAarr[i].path});

      },
      tabClick(i){//头部切换
        this.headerTabIndex =i;
        if(i==1){
          this.$router.push({path:"/follow"})
        }
      },
      boxScroll(e){ //滚动事件
        if(e.target.scrollTop>=(e.target.scrollHeight-e.target.clientHeight-3)){
          this.flag = true
        }else {
          this.flag = false
        }
        if(this.flag==true){
          this.p++
          let that = this;
          if(that.pages<that.p){
//            that.p = that.pages;
            setTimeout(()=>{
              this.message = "这是我的底线...";
//              Toast("被你看光啦！");
              return;
            },2100)
          }else if(that.pages==that.p){
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                Indicator.open("加载中")
                setTimeout(()=>{
                  this.$nextTick(function(){
                    let  box = document.getElementById('box');
                    let items = box?box.children:[];
                    that.waterFull(items);
                    Indicator.close()
                  })
                },2000)
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }else if(that.pages>that.p){
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                Indicator.open("加载中")
                setTimeout(()=>{
                  this.$nextTick(function(){
                    let  box = document.getElementById('box');
                    let items = box?box.children:[];
                    that.waterFull(items);
                    Indicator.close()
                  })
                },2000)
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }
        }
      },

      clickFn(value,index){ //进入详情页
        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
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

    }
  }

</script>

<style scoped lang="less">
  #homeIndex1_0 {
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    background: #e6e6e6;
    overflow: hidden;
    .homeIndex1_ul{
      width: 100%;
      display: flex;
      background: #ffffff;
      position: relative;
      li{
        flex: 1;
        height: 0.52rem;
        font-family:PingFangSC-Light;
        font-weight:100;
        color: #666666;;
        border-bottom: 0.01rem solid #e6e6e6;
        .homeIndex1_ul_li_div{
          width:0.7rem ;
          height: 0.46rem;
          text-align: center;
          span{
            display: inline-block;
            line-height: 0.24rem;
            margin-top: 0.04rem;
            font-size: 0.14rem;
          }
          p{
            line-height: 0.12rem;
            color:rgba(102,102,102,1);
            font-weight:100;
            font-size: 0.1rem;
          }
        }
        .homeIndex1_ul_li_div.active{
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:600;
          color:rgba(5,5,9,1);
          border-bottom:0.02rem solid rgba(5,5,9,1);
          p{
            color:rgba(102,102,102,1);
            font-weight:100;
            font-size: 0.1rem;
          }
        }
        .homeIndex1_span0{
          display: block;
          float: right;
          margin-right:0.1rem ;
        }
        .homeIndex1_span1{
          display: block;
          float: left;
          margin-left:0.1rem ;
        }
      }

    }
    .homeIndex1_0_components{
      width: 100%;
      position: absolute;
      left: 0;
      top:0.52rem;
      bottom:0.5rem;
      right: 0;
      overflow: hidden;
      >ul{
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        overflow-y:scroll ;
        >li{
          width: 48.5%;
          position: absolute;
          background: #ffffff;
          padding-bottom: 0.15rem;
          >img{
            display: block;
            width: 100%;
          }
          >.img-info_bottom{
            width: 100%;
            position: relative;
            .jiao{
              position: absolute;
              left: 0.18rem;
              top:-0.04rem;
              display: block;
              width: 0.09rem;
              height: 0.05rem;
            }
            >.img-info_li1{
              width: 100%;
              padding: 0.1rem 0.1rem 0 0.1rem;
              box-sizing: border-box;
              display: flex;
              .img-info_li1_img{
                width: 0.25rem;
                float: left;
                img{
                  display: inline-block;
                  width: 0.24rem;
                  height: 0.24rem;
                  border-radius: 50%;
                  float: left;
                }
              }
              b{
                margin-left: 0.07rem;
                flex: 1;
                -ms-flex: 1;
                -webkit-flex: 1;
                display: block;
                float: left;
                line-height: 0.26rem;
                font-size: 0.12rem;
                color: #262626;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                letter-spacing:0.01rem;
              }
            }
            .img-info_li3{
              position: absolute;
              right: 0.1rem;
              top:0.08rem;
              width: 0.18rem;
              height: 0.17rem;
              margin-right: 0.04rem;
              img{
                display: inline-block;
                width: 0.18rem;
                height: 0.17rem;
              }
            }
            >h5{
              width: 100%;
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:#676768;
              line-height:0.16rem;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break:break-all;
              padding: 0 0.1rem;
              box-sizing: border-box;
              margin-top: 0.04rem;
              letter-spacing:0.01rem;
            }
          }
        }
      }
    }
    .Indextab{
      position: absolute;
      width: 100%;
      height: 0.49rem;
      bottom: 0rem;
      left: 0;
      background: #ffffff;
      border-top: 0.01rem solid #EEEEEE;
      display: flex;
      .indexTabLi{
        flex: 1;
        text-align: center;
        padding-top:0.13rem ;
        box-sizing: border-box;
        .indexTabImg{
          width:  24px;
          height:  24px;
          display:block;
          margin: 0 auto;
        }
        .indexTabImg.active{
          width: 0.3rem;
          transform: translateY(-0.05rem);
          height: 0.3rem;
        }
      }
    }
  }
</style>
