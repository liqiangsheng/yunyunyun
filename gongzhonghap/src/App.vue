<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { activityListData } from './assets/js/promiseHttp';
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'App',
  data(){
    return{
      p:1, //第几页
      s:20,// 、、一页多少
    }
  },
  created() {
    activityListData(this.p,this.s).then(res=>{
      if(res.data.status == true){
        localStorage.setItem("indexList",JSON.stringify(res.data.data))
        Indicator.close();
      }else{
        Indicator.close();
        Tost("网络异常，请重试")
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
