<template>
  <!--原创-->
  <div id="original" ref="findBox" @scroll="boxScroll">
       <div v-if="imgsArr.length<=0" class="original_NolistData">
         <img src="/static/images/原创.png" alt="">
         <p>你还没有进行任何创作哦～</p>
       </div>

    <div class="componentsBox" v-else>
      <ul id="box">
        <li v-for="(item,index) in imgsArr" @click.stop="clickFn(item,index)" >
          <img :src="item.imageUrl1" alt="">
          <h5>{{item.title}}</h5>
            <ul class="img-info_ul">
              <li  class="img-info_li1"><img :src="item.authorInfo.ownerUrl?item.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt=""></li>
              <li class="img-info_li2">{{item.authorInfo.name}}</li>
              <li class="img-info_li3"><img src="/static/images/点赞1.png" alt=""></li>
              <li class="img-info_li4">{{item.laudedCount}}</li>
            </ul>
        </li>
        <li style="text-align: center;line-height: 1.0rem;color: #999999" v-show="!!message">
          {{message}}
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
//  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import { customerPubContentListOwner} from "../../../assets/js/promiseHttp.js"
export default {
  components: {
//    vueWaterfallEasy
  },
  name: 'original',
  data(){
    return{
      imgsArr:[],
        p: 1, // request param//
      s:20, // request param////测试
      pages:0, //总共多少页
      message:"", //触底提示
      isFirstLoad:true, //第一次加载
      maxCols:2,  //瀑布流显示最大的列数
      openPullDown:true,//下拉刷新
      OffsetHeight:0,//屏幕高度
      userInfo:{},//用户数据
      gap : 5, //10px的像素差距
      flag:false, //距离底部距离小于50
    }
  },
  created() {
    // 页面尺寸改变时实时触发

    this.$nextTick(function(){
      this.OffsetHeight = this.$refs.findBox.offsetHeight;
//      window.addEventListener('scroll',this.handleScroll,true)
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo){
       this.IndicatorData();
    }

  },
  methods:{
    boxScroll(e){ //滚动事件
      let scrollTop = e.target.scrollTop?e.target.scrollTop:0;
      let scrollHeight = e.target.scrollHeight?e.target.scrollHeight:0;
      let clientHeight = e.target.clientHeight?e.target.clientHeight:0;
      if(scrollTop>=(scrollHeight-clientHeight-50)){
        this.flag = true
      }else {
        this.flag = false
      }
      if(this.flag==true){
        this.p++
        let that = this;
        if(that.pages<that.p){
          that.p = that.pages;setTimeout(()=>{
            this.message = "这是我的底线...";
            return;
          },1100)
        }else if(that.pages==that.p){
          customerPubContentListOwner(this.userInfo.data.id,true,this.p,this.s,this.userInfo.data.access_token).then(res=>{
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
              },1000)
            }else{
              Toast("网络出错了，请重试")
            }
          })
        }else if(that.pages>that.p){
          customerPubContentListOwner(this.userInfo.data.id,true,this.p,this.s,this.userInfo.data.access_token).then(res=>{
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
              },1000)
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
      let itemWidth= (this.sizeWidth().width - this.gap) /2 //2列每列的宽度
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
    clickFn(value,index){ //去作品详情
      this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
    },
    IndicatorData(){ //初始数据
      customerPubContentListOwner(this.userInfo.data.id,true,this.p,this.s,this.userInfo.data.access_token).then(res=>{
        if(res.status == true){
          res.data.forEach((item,index)=>{
            item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.pages = Math.ceil(res.total/this.s);
          this.imgsArr = res.data;
          Indicator.open('加载中')
          setTimeout(()=>{
            this.$nextTick(function(){
              let  box = document.getElementById('box');
              let items = box?box.children:[];
              this.waterFull(items);
              Indicator.close()
            })
          },1000)

        }else{
          Indicator.close();
          Toast("网络出错了，请重试")
        }
      })
    },

  }
}

</script>

<style scoped lang="less">

#original {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  /*padding-bottom: 0.5rem;*/
  .original_NolistData{
    width: 100%;
    padding-top: 1rem;
    img{
      display: block;
      width: 1rem;
      height: 0.94rem;
      margin: 0 auto;
    }
    p{
      text-align: center;
      margin-top: 0.2rem;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
  }
  .componentsBox{
    width: 100%;
    position: relative;
    >ul{
      width: 100%;
      position: relative;
      >li{
        //width: 100%/2-0.01;
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
            float: left;
            width: 0.16rem;
            height: 0.16rem;
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

}
</style>
