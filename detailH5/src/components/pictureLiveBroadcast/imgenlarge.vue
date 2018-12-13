<template>
  <div id="imgenlarge">

     <v-touch class="imgenlargebox" v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" v-on:tap="swipertop">
       <swiper :options="swiperOption" ref="imgOverview" style="height: 100%;">
         <swiper-slide>
           <div class="swiper-zoom-container">
             <img :src="imgArr[imgIndex].imageUrl" alt="">
           </div>
         </swiper-slide>
       </swiper>
       <div class="imgenlargeButton" v-show="imgenlargeButtonShow">
         加载中...
       </div>
     </v-touch>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框

  import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {

  props:["imgenlargedata","imgenlargedata1","imgenlargedata1Index","imgsArr"],
  data(){
    return{
      imgenlargeButtonShow:false,
      imgIndex:0,
      imgArr:[],
      swiperOption: {
        width: window.innerWidth,
        zoom : true,
        zoomToggle:true,
        initialSlide: 0,
      },
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  created(){
    if(this.imgenlargedata==0){
      this.imgIndex = this.imgenlargedata1Index;
      this.imgArr = this.imgenlargedata1;
    }else{
      this.imgIndex = this.imgenlargedata1Index;
      this.imgArr = this.imgsArr;
    }

  },
  methods:{
    swipertop(){ //单击关闭
      this.$emit("ishowItem",false)
    },
//      itemShow(){
//        this.$emit("ishowItem",false)
//      },
    swiperleft(){//左滑
      this.imgenlargeButtonShow = true;
      setTimeout(()=>{
        this.imgIndex++;
        this.imgenlargeButtonShow = false;
        if((this.imgArr.length-1)<=this.imgIndex){
          this.imgIndex =this.imgArr.length-1;
          Toast("这是最后一张啦")
          return;
        }
      },1000)

    },
    swiperright(){ //右滑
      this.imgIndex--;
      if(this.imgIndex<=0){
        this.imgIndex= 0;
        Toast("这是第一张啦")
        return;
      }
    },

  },
  mounted(){

  }
}

</script>

<style lang="less" scoped>
#imgenlarge{
    position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: #000000;
  display: flex;
  justify-content:center;
  align-items:Center;
  .imgenlargebox{
    /*width: 100%;*/
    height: 100%;
    img{
      display: block;
      width: 100%;
    }
  }
  .imgenlargeButton{
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.3rem;
    position: absolute;
    font-size: 0.10rem;
    text-align: center;
    line-height: 0.6rem;
    left: 40%;
    bottom: 45%;
    color:#ffffff;
    background: rgba(153,153,153,0.2);
    z-index: 1;
  }


}
</style>
