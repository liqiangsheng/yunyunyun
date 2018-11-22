<template>
  <div id="nameValue">
    <div id="one">
    <input type="radio" value="男" v-model="nameValue">
    <label for="one">男</label>
    </div>
    <div id="two">
    <input type="radio" value="女" v-model="nameValue">
    <label for="two">女</label>
    </div>
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
  background: #000000;
  padding: 0.2rem;
  box-sizing: border-box;
  z-index: 2;
  #one{
    width: 50%;
    float: left;
    text-align: center;
    input{
      width: 0.16rem;
      height: 0.16rem;
      transform: translateY(0.02rem);
     color: red;
    }
    label{
      color: #FFFFFF;
      font-size: 0.16rem;
    }
  }
  #two{
    width: 50%;
    float: left;
    text-align: center;
    input{
      width: 0.16rem;
      height: 0.16rem;
      transform: translateY(0.02rem);
    }
    label{
      color: #FFFFFF;
    }
  }
  button{
    outline: none;
    width: 100%;
    border: 0.01rem solid #DFDFDF;
    border-radius: 0.08rem;
    outline: none;
    border: 0;
    margin-top: 0.15rem;
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
    background: #72D992;
  }

}
</style>
