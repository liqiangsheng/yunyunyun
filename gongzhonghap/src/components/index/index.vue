<template>
  <div id="indexBox">
    <div class="IndexHeader">
      <!--轮播-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner" >
            <div class="imgIs">
              <img :src="item" >
            </div>
          </div>
        </div>
      </div>
      <!---->
    </div>
    <div class="Indextab">

    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  name: 'Index',
  data(){
    return{
      banner: ["https://pub.qinius.butongtech.com/banner1.png","https://pub.qinius.butongtech.com/banner2.png","https://pub.qinius.butongtech.com/banner3.png","https://pub.qinius.butongtech.com/banner4.png" ],
    }
  },
  created(){

  },
  methods:{

    handleScroll(){  //回到顶部按钮出现
      this.sctollTopNum = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(this.sctollTopNum>100){
        this.topScroll = true;
      }else{
        this.topScroll = false;
      }
    },
    goScrillTop(){ //回到顶部
      window.pageYOffset= 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现
    let that = this;
    this.$nextTick(()=>{


        //     滑动
        var mySwiper = new Swiper ('.swiper-container', {
          autoplay:true,
          loop:true
        })


    })


  },
}

</script>

<style>
@import "../../assets/css/index.css";
</style>
