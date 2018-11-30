<template>
  <div id="imgenlarge">
     <div class="imgenlargebox" @click="itemShow">
       <img :src="imgenlargedata.aaa" alt="">
     </div>

  </div>
</template>

<script>
export default {
  props:["imgenlargedata"],
  created(){
    console.log(this.imgenlargedata,"dfsakjjkasd")
  },
  methods:{
    itemShow(){
      this.$emit("ishowItem",false)
    }
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
    img{
      display: block;
      width: 100%;
    }
  }

}
</style>
