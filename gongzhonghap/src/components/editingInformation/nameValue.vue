<template>
  <div id="nameValue">
    <mt-radio
      v-model="nameValue"
      :options="[ '男', '女']">
    </mt-radio>
    <button @click="okClick">确定</button>
  </div>
</template>

<script>
export default {
  name: 'nameValue',
  data(){
    return{
      nameValue:"男", //名字
    }
  },
  created(){
  },
  methods:{
    okClick(){ //确定
      this.$emit("sex",this.nameValue)
    }
  }
}

</script>

<style scoped lang="less">
#nameValue {
 position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background: #FFFFFF;
  padding: 0.2rem;
  box-sizing: border-box;

  button{
    outline: none;
    width: 100%;
    border: 0.01rem solid #DFDFDF;
    border-radius: 0.08rem;
    outline: none;
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
  }

}
</style>
