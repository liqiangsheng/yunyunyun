<template>
  <div id="imgenlarge">

     <div class="imgenlargebox">
       <swiper :options="swiperOption" ref="imgOverview" style="height: 100%;">
         <swiper-slide>
           <div class="swiper-zoom-container">
             <img :src="imgArr[imgIndex].imageUrl" alt="">
           </div>
         </swiper-slide>
       </swiper>
       <div v-show="!!leftMessage" class="box111" @click="leftClick">{{leftMessage}}</div>
       <div v-show="!!rightMessage"  class="box222" @click="rightClick">{{rightMessage}}</div>
       <div @click="itemShow" class="imgenlargeButton">
          后退
       </div>
     </div>

  </div>
</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {

  props:["imgenlargedata","imgenlargedata1","imgenlargedata1Index","imgsArr"],
  data(){
    return{
      leftMessage:"上一张",
      rightMessage:"下一张",
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

    if(this.imgIndex<=0){
      this.leftMessage =''
    }else{
      this.leftMessage ='上一张'
    }
    if((this.imgenlargedata1.length-1)==this.imgIndex){
      this.rightMessage =''
    }else{
      this.rightMessage ='下一张'
    }
  },
  methods:{
    leftClick(){

      this.imgIndex--;
      this.rightMessage ='下一张'
      if(this.imgIndex<=0){
        this.leftMessage ='';
        this.imgIndex= 0;
      }else{
        this.leftMessage ='上一张'
      }
    },
    rightClick(){
      this.imgIndex++;
      this.leftMessage ='上一张'
      if((this.imgArr.length-1)<=this.imgIndex){
        this.imgIndex =this.imgArr.length-1;
        this.rightMessage ='';
      }else{
        this.rightMessage ='下一张'
      }
    },
      itemShow(){
        this.$emit("ishowItem",false)
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
  z-index: 999992;
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
   width: 1rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    position: absolute;
    font-size: 0.16rem;
    left: 40%;
    bottom: 15%;
    z-index: 999993;
    color:#ffffff;
    background:  rgb(41, 152, 255);
    border-radius: 0.04rem;
    z-index: 999993;
  }
  .box111{
    position: absolute;
    left: 0;
    top:50%;
    z-index: 999993;
    color: rgb(41, 152, 255);
    font-size: 0.14rem;
  }
  .box222{
    position: absolute;
    right: 0;
    top:50%;
    z-index: 999993;
    color: rgb(41, 152, 255);
    font-size: 0.14rem;
  }
}
</style>
