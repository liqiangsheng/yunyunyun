<template>
  <!--发现-->
<div id="box" ref="box"  @scroll="boxScroll" >
  <waterfall :col='col' :width="itemWidth1" :gutterWidth="gutterWidth1"  :data="data"  @loadmore="loadmore">
    <template >
      <div class="cell-item" v-for="(item,index) in data" @click="clickFn(item)">
        <img v-lazy="item.imageUrl1" :style="'height:'+(185/item.cover.width)*item.cover.height/100+'rem'"/>
            <div class="img-info_bottom">
            <img class="jiao" src="/static/images/xiaojiao.png" alt="">
            <div  class="img-info_li1">
            <div class="img-info_li1_img">
            <img :src="item.authorInfo&&item.authorInfo.ownerUrl?item.authorInfo.ownerUrl:'https://pub.qinius.butongtech.com/defultphoto.png'" alt="" v-if="item.authorInfo">
            </div>
            <b v-if="item.authorInfo">{{item.authorInfo?item.authorInfo.name:'无'}}</b>
            </div>
            <p>{{item.title}}</p>
              <div style="height: 0.05rem;background:#eeeeee;margin-top: 0.1rem"></div>
          </div>
      </div>

    </template>
  </waterfall>
  <div style="text-align: center;line-height: 0.5rem;color: #999999" v-show="!!message">
    {{message}}
  </div>
</div>

</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import {customerPubContentListHomePage} from "../../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
    components: {
//      vueWaterfallEasy
    },
    data(){
      return{
        itemWidth1:null,
        gutterWidth1:10,
        col:2,
        data:[],
        refshash:"下拉刷新",
        p:1,  //页
        s:20, //每页多少
        message:"", //触底提示
        pages:2,//每页数据
        userInfo:"", //用户信息
      }
    },
    watch:{
      "$route":function(newl,old1){ //滚动定位到实际地方 点击图片的位置
        if(newl.path=='/homeIndex1_0'){
          this.$nextTick(function(){
            document.querySelector("#box").scrollTop = this.$store.state.FollowScrollTop;
          })
        }
      }
    },
    created() {
      this.itemWidth1= this.itemWidth();
      this.gutterWidth1= this.gutterWidth();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):"";
      this.$nextTick(function(){
        this.query(this.p,this.s);
      })
//      window.onresize = () => {
//        return (() => {
//          console.log(1111111)
//          this.itemWidth1= this.itemWidth();
//          this.gutterWidth1= this.gutterWidth();
//          this.$waterfall.resize
//        })()
//      }
    },
    methods:{//初始数据
        itemWidth(){
          return (185*1*(document.documentElement.clientWidth/375)) // #rem布局 计算宽度
        },
        gutterWidth(){
          return (10*0.5*(document.documentElement.clientWidth/375))  // #rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
        },
      scroll(scrollData){
        console.log(scrollData)
      },
      mix(){
        this.$waterfall.mix()
      },

      loadmore(index){
        console.log(index,"index")
      },
      query(p,s){//初始数据
        this.$emit("displayBlock","block")
        customerPubContentListHomePage(p,s).then(res=>{
//          console.log(res,"fdjsfgd")
          if(res.status==true){
            res.data.forEach((item,index)=>{
              if(item.cover){
                item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
              }else{
                item.imageUrl1 ='https://pub.qinius.butongtech.com/defultphoto.png'
              }

            })
            this.pages = Math.ceil(res.total/this.s);
            this.data = res.data;
            this.$emit("displayBlock","none")
          }else{
            Toast("网络出错了，请重试")
          }
        })
      },
      boxScroll(e){ //滚动事件
        let that = this;
        if(e.target.scrollHeight>=(e.target.scrollTop+e.target.offsetHeight+1000)){
          this.p++;
          if (this.p > this.pages) {
              this.message = "这是我的底线..."
              return
          } else if (this.p == this.pages) {
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                  res.data.forEach((item,index)=>{
                    item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                  })
                  that.data = that.data.concat(res.data);
                this.message = "这是我的底线..."

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
                that.data = that.data.concat(res.data);
                this.message = "加载中..."
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }
        }
      },
      clickFn(value,index){ //进入详情页
//        console.log(document.querySelector("#box").scrollTop,"(document.querySelector(\"#box\").scrollTop")
        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
      },
    },
    mounted() {
      this.query(this.p,this.s);
      let that = this;
      document.querySelector("#box").addEventListener('scroll',function (e) {
        that.$store.dispatch("FollowScrollTop",e.target.scrollTop)
      }) //监听高度
    },
  }

</script>

<style lang="less">

  #box{
    width: 100%;
    height: 100%;
    overflow: scroll;
    position: relative;

  }

  .messageFoot{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    color: rgba(5,5,5,0.3);
    text-align: center;
    margin-top: 0.2rem;
  }
  .img-info_bottom{
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
  .cell-item{
    background: #ffffff;
    >img{
      display: block;
      width: 100%;
      height: 2rem;
      background: #ffffff;
    }
  }
</style>

