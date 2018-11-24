<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
    export default {
        data(){
            return{
                active:{width:"100%",height:"1080px"}
            }
        },
        created(){

        }
    }

</script>
<style lang="less">
#app {
 width: 100%;
  background: #F7F7F7;
  position: relative;
}

</style>
