<template>
  <div id="welcome">
       <div class="div">
         {{num}}s
       </div>
       <div class="div1"><span @click="goClick">点击进入</span></div>
       <img :src="welcomeObj.imageUrl" alt=""/>

  </div>
</template>

<script>
  import {activityImagesFindOne} from "../../assets/js/promiseHttp.js"
  import { Toast } from 'mint-ui';  //弹框
  let temp;
export default {
  props:['activityId'],
  data(){
    return{
      num:3,
      welcomeObj:{},
      objData:{}
    }
  },
  created(){
    activityImagesFindOne(this.activityId).then(res=>{
      if(res.data.status == true){
         this.welcomeObj = res.data.data;
        this.objData.item = res.data.data;
         this.objData.bookId = res.data.data.bookId;
         setInterval(()=>{
           this.num--;
           if(this.num==0){
             clearInterval(temp)
             this.goClick();
           }
         },1000)
      }else{
        Toast("网络出错了，请重试")
      }
    })

  },
  methods:{
    goClick(){ //点击立刻进入
      clearInterval(temp);
      this.objData.isbool = false;
      this.$emit("temp",this.objData)
    }
  }
}

</script>

<style lang="less" scoped>
#welcome{
    position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999993;
  background: #ffffff;
  display: flex;
  justify-content:center;
  align-items:Center;
  >.div{
    position: absolute;
    right: 0.2rem;
    top:0.2rem;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.3rem;
    background: rgba(5,5,9,0.3);
    color: black;
  }
  >.div1{
    position: absolute;
    width: 100%;
    bottom:0.5rem;
    left: 0;
     span{
       display: block;
       height: 0.3rem;
       width: 1rem;
       border: 0;
       background: rgb(41, 152, 255);
       border-radius: 0.04rem;
       text-align: center;
       line-height: 0.3rem;
       color: #ffffff;
       margin: 0 auto;
     }
  }

  img{
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
