<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    //国省市
    let url1 = this.$http + '/apis/system/sysRegion/threelevel';
    this.$Aiox.get(url1).then(res=>{
      if (res.data.status == true) {
        window.localStorage.setItem("cityData",JSON.stringify(res.data.data))
      } else {
        Toast(res.data.message);
      }
    })
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eeeeee;
}
</style>
