<template>
  <div id="photoswipe" @click="$emit('close',false)">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in ObjData.arrList">
            <!--<img :src="item.imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" />-->
            <img :src="img" @click.stop="wxLook(img)"/>
        </div>
      </div>
    </div>
     <div class="yuantu" @click.stop="upDataImg(img,num)">
       下载原图
     </div>
    <div class="loading" v-if="lazyShow">
      下载中...
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {activityImagesBookList} from '../../assets/js/promiseHttp'

export default {
    props:['ObjData'],
  data(){
    return{
      img:'',
      num:0,
      lazyShow:false,
    }
  },
  created() {
    this.img =this.ObjData.arrList[this.ObjData.indexNum].imageUrl1;
    this.num =this.ObjData.indexNum
  },
  mounted(){
    //     滑动
    let that = this;
      let mySwiper = new Swiper('.swiper-container',{
//        loop: true,
        on: {
          slidePrevTransitionStart:function(){
            that.ObjData.indexNum--;
            if(that.ObjData.indexNum<1){
              that.ObjData.indexNum  = 0;
              that.num =0;
              that.img =that.ObjData.arrList[0].imageUrl1;
            }else{
              that.num =that.ObjData.indexNum;
              that.img =that.ObjData.arrList[that.ObjData.indexNum].imageUrl1;
            }
          },
          slideNextTransitionStart:function(){
            that.ObjData.indexNum++;
            if(that.ObjData.indexNum>that.ObjData.arrList.length-1){
              that.ObjData.indexNum = that.ObjData.arrList.length;
              that.num =that.ObjData.arrList.length;
              that.img =that.ObjData.arrList[that.ObjData.arrList.length].imageUrl1;
            }else{
              that.num =that.ObjData.indexNum;
              that.img =that.ObjData.arrList[that.ObjData.indexNum].imageUrl1;
            }
          },
        },
      });

  },
  methods:{
    upDataImg(v,i){ //下载原图
      if(v == this.ObjData.arrList[i].imageUrl){
       Toast('已下载，请勿重复下载');
       return
      }else {
        this.lazyShow = true;
        this.$nextTick(function () {
          this.img = this.ObjData.arrList[i].imageUrl;
          this.ObjData.arrList[i].imageUrl1 = this.ObjData.arrList[i].imageUrl;
          setTimeout(()=>{
            this.lazyShow = false;
          },1000)
        })
      }


    },
    wxLook(v){//微信的放大
      console.log(v)
      let list = [];
//      this.ObjData.arrList.forEach((item,index)=>{
//        list.push(item.imageUrl)
//      })
      list.push(v)
      wx.previewImage({
        current: v, // 当前显示图片的http链接
         urls: list // 需要预览的图片http链接列表
      });
    }
  },
}

</script>

<style scoped lang="less">
#photoswipe{
 width: 100%;
  height: 100%;
  background: #ffffff;
  position: absolute;left: 0;top: 0;bottom: 0;
  right: 0;
  z-index:2;
  overflow: hidden;
  .swiper-container{
    width: 100%;
    height: 100%;
    background: #262626;
    .swiper-wrapper{
      background: #262626;
      .swiper-slide{
        position: relative;
        img{
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
    }
  }
  .yuantu{
    position: absolute;
    left: 1.5rem;
    bottom: 0.25rem;
    z-index:9999999999;
    width: 0.75rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    border-radius: 0.3rem;
    background: rgba(5,5,9,0.3);
    color: #ffffff;
  }
  .loading{
    width: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 3;
    left: 1.675rem;
    background: rgba(5,5,9,0.15);
    color: #c5c5c6;
  }
}

</style>
