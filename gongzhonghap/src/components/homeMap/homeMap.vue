<template>
  <div class="homeMap">
    <div class="homeMap_goback" @click="$router.go(-1)">
       <img src="/static/images/huanhui.png" alt="">
    </div>

      <div class="amap-page-container">
          <el-amap ref="map" vid="amapDemo"  :center="center" :zoom="zoom"  class="amap-demo">
               <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position"  :visible="marker.visible" :vid="index"></el-amap-marker>
          </el-amap>
      </div>
  </div>
</template>

<script>

//  import {AMapManager} from 'vue-amap'; //地图
export default {
  data(){
    return{
      zoom: 14,
      center: this.$store.state.mapData[0],
      markers: [
        {
          position: this.$store.state.mapData[1],
          visible: true
        }
      ],
    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "地图";
    })
    if(!!this.$store.state.mapData){
      this.center = this.$store.state.mapData[0]
      this.markers = this.$store.state.mapData[1]
    }

     console.log(this.$store.state.mapData,"bkjdkas")
  }
}
</script>

<style>
  .homeMap{
    position: absolute;
    left: 0;
    top:0;
    bottom:0;
    right: 0;
    background:#EEEEEE;

  }
  .homeMap .amap-page-container{
    position: absolute;
    left: 0;
    top:0;
    bottom:0;
    right: 0;
    overflow: hidden;
  }

  .homeMap .homeMap_goback{
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    background: rgba(5,5,9,0.3);
    left: 0.1rem;
    top: 0.1rem;
    z-index: 99999;
    border-radius: 50%;
  }
  .homeMap .homeMap_goback img{
    display: inline-block;
    width: 0.18rem;
    height: 0.15rem;
    margin-left: 0.06rem;
    margin-top: 0.07rem;
    transform: rotate(180deg);
  }
</style>
