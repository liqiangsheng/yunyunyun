<template>
  <div id="imgenlarge">
     <div class="imgenlargebox" @click="itemShow">
       <swiper :options="swiperOption" ref="imgOverview" style="height: 100%;">
         <swiper-slide>
           <div class="swiper-zoom-container">
             <img :src="imgenlargedata.imageUrl" alt="">
           </div>
         </swiper-slide>
       </swiper>
     </div>

  </div>
</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {

  props:["imgenlargedata"],
  data(){
    return{
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
    console.log(this.imgenlargedata,"dfsakjjkasd")
  },
  methods:{
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
  background: #ffffff;
  display: flex;
  justify-content:center;
  align-items:Center;
  .imgenlargebox{
    height: 100%;
    img{
      display: block;
      width: 100%;
    }
  }

}
</style>
