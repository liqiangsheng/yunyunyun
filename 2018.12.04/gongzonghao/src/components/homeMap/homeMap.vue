<template>
  <div class="homeMap">
      <div class="amap-page-container">
          <el-amap ref="map" vid="amapDemo"  :center="center" :zoom="zoom"  class="amap-demo">
               <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position"  :visible="marker.visible" :vid="index"></el-amap-marker>
          </el-amap>
      </div>
  </div>
</template>

<script>
  import {AMapManager} from 'vue-amap'; //地图
export default {
  data(){
    return{
      zoom: 16,
      center:[114.06003, 22.53086],
      markers: [
        {
          position: [114.06003, 22.53086],
          visible: true,
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
  @import "../../assets/css/homeMap.css";
</style>
