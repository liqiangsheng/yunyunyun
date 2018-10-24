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
  props:["zoom","center","markers"],
  name: 'homeMap'
}
</script>

<style>
  @import "../assets/homeMap.css";
</style>
