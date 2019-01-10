<template>
  <div id="input">
    <textarea cols="30" rows="10" :placeholder="'请输入'+value" v-model="inputValue"></textarea>
    <p>还可以输入 {{lengthN}} 个字符!</p>
    <button @click="okClick">确定</button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
export default {
  props:['value'],
  name: 'nameValue',
  data(){
    return{
      inputValue:"", //名字 //简介
      lengthN:0,
    }
  },
  watch:{
    "inputValue":function (newl,oldl) {
      if(this.value=='用户名'){
        this.lengthN = 50 - newl.length
        if(this.lengthN < 0){
          this.lengthN =0
        }
      }else {
        this.lengthN = 200 - newl.length;
        if(this.lengthN < 0){
          this.lengthN =0
        }
      }

    }
  },
  created(){
     document.title=this.value;
    if(this.value=='用户名'){
      this.lengthN = 50
    }else {
      this.lengthN = 200
    }
  },
  methods:{
    okClick(){ //确定
      if(this.value=='用户名'){
        if(!this.inputValue){
          Toast('用户名不能为空')
          return
        }else if(this.inputValue.length>50){
          Toast('用户名的长度不能超过50')
          return
        }else {
          this.$emit("nameValue1",this.inputValue)
        }

      }else if(this.value =='个人简介'){
        if(this.inputValue.length>200){
          Toast('用户名的长度不能超过200')
          return
        }else {
          this.$emit("introductionValue1",this.inputValue)
        }

      }

    }
  }
}

</script>

<style scoped lang="less">
#input {
 position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background: #ffffff;
  padding: 0.2rem;
  box-sizing: border-box;
  z-index: 2;
  textarea{
    width: 100%;
    border: 0.01rem solid #eeeeee;
    outline: none;
  }
  button{
    outline: none;
    width: 100%;
    border: 0.01rem solid #eeeeee;
    border-radius: 0.08rem;
    outline: none;
    margin-top: 0.15rem;
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
    background: #ffffff;
  }

}
</style>
