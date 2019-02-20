<template>
  <!--发现-->
<!--<div class="box_BOX">-->
  <ul id="box" ref="box"
      v-infinite-scroll="boxScroll"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="1000">
    <li v-for="(item,index) in imgsArr" @click.stop="clickFn(item,index)">
      <img :src="item.imageUrl1" alt="">
      <div class="img-info_bottom">
        <img class="jiao" src="/static/images/xiaojiao.png" alt="">
        <div  class="img-info_li1">
          <div class="img-info_li1_img">
            <img :src="item.authorInfo?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="">
          </div>
          <b>{{item.authorInfo?item.authorInfo.name:'无'}}</b>
        </div>
        <p>{{item.title}}</p>
      </div>
    </li>
    <li style="text-align: center;line-height: 1.0rem;color: #999999" v-show="!!message">
      {{message}}
    </li>

  </ul>
<!--</div>-->
</template>

<script>
//    import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
  import {customerPubContentListHomePage} from "../../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
//    components: {
//      vueWaterfallEasy
//    },
    data(){
      return{
        refshash:"下拉刷新",
        p:1,  //页
        s:10, //每页多少
        message:"", //触底提示
        pages:2,//每页数据
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
    watch:{
      "$route":function(newl,old1){ //滚动定位到实际地方 点击图片的位置
        if(newl.path=='/homeIndex1_0'){
          this.$nextTick(function(){
//            document.querySelector(".box_BOX").scrollTop = this.$store.state.FollowScrollTop;
            document.querySelector("#box").scrollTop = this.$store.state.FollowScrollTop;
          })
        }
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):"";
      this.$nextTick(function(){
        this.query(this.p,this.s);
      })

    },
    methods:{//初始数据
      query(p,s){//初始数据
        this.$emit("displayBlock","block")
        customerPubContentListHomePage(p,s).then(res=>{
//          console.log(res,"fdjsfgd")
          if(res.status==true){
            res.data.forEach((item,index)=>{
              item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            this.pages = Math.ceil(res.total/this.s);
            this.message = '加载中...'
//            if(this.pages>1){
//              this.message = '加载中...'
//            }else{
//              this.message = '加载中...'
//            }
            this.imgsArr = res.data;
            let that = this;
              this.$nextTick(function(){
                //                    document.querySelector("#box").scrollTop = 0;
//                setTimeout(()=>{
//                  let  box = document.getElementById('box');
//                  let items = box?box.children:[];
                    let items = that.$refs.box.children;
                  that.waterFull(items);
                  that.$emit("displayBlock","none")
//                },100)

              })

          }else{
            Toast("网络出错了，请重试")
          }
        })
      },
      boxScroll(){ //滚动事件
        let that = this;
//        if(e.target.scrollHeight==(e.target.scrollTop+e.target.offsetHeight)){
          this.p++;
          if (this.p > this.pages) {
            setTimeout(()=>{
              this.message = "这是我的底线..."
              return
            },300)
          } else if (this.p == this.pages) {
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                  res.data.forEach((item,index)=>{
                    item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                  })
                  that.imgsArr = that.imgsArr.concat(res.data);
                this.$nextTick(function(){
                  setTimeout(()=>{
//                    let  box = document.getElementById('box');
//                    let items = box?box.children:[];
                    let items = that.$refs.box.children;
                    that.waterFull(items);
                    this.message = "加载中...";
                  },300)

                })
              }else{
                Toast("网络出错了，请重试")
              }
            })

          }else if(this.p < this.pages){
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                this.$nextTick(function(){
                  setTimeout(()=>{
//                    let  box = document.getElementById('box');
//                    let items = box?box.children:[];
                    let items = that.$refs.box.children;
                    that.waterFull(items);
                    this.message = '加载中...'
                  },200)
                })
              }else{
                Toast("网络出错了，请重试")
              }
            })
//          }
        }
      },
      clickFn(value,index){ //进入详情页
//        console.log(document.querySelector("#box").scrollTop,"(document.querySelector(\"#box\").scrollTop")
        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
      },
      waterFull(items){//瀑布流
        // 1- 确定列数  = 页面的宽度 / 图片的宽度
        let columns = 2; //2列
        let itemWidth= (this.sizeWidth().width - this.gap) /2; //2列每列的宽度
        var arr = [];
        for(var i= 0 ;i<items.length;i++){
//        console.log(items[i].offsetHeight,"items")
          items[i].style.position = 'absolute';
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
      this.query(this.p,this.s);
      let that = this;
//      document.querySelector(".box_BOX").addEventListener('scroll',function (e) {
      document.querySelector("#box").addEventListener('scroll',function (e) {
        that.$store.dispatch("FollowScrollTop",e.target.scrollTop)
      }) //监听高度
    },
  }

</script>

<style scoped lang="less">
  /*.box_BOX{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: scroll;*/
  /*}*/
  #box{
    width: 100%;
    height: 100%;
    overflow: scroll;
    position: relative;
    /*column-count: 2;*/
    /*column-gap: 1;*/
    >li{
      width: 48.5%;
      background: #ffffff;
      break-inside: avoid; box-sizing: border-box;
      padding-bottom: 0.15rem;
       /*margin-bottom: 0.12rem;*/
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
        >p{
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

  .messageFoot{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    color: rgba(5,5,5,0.3);
    text-align: center;
    margin-top: 0.2rem;
  }
</style>

