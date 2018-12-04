<template>
  <div id="lookMore">
      <ul>
        <li v-for="(item,index) in listData">
          <img :src="item.imageUrl" alt="">
          <p>
            {{item.name}}
          </p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'lookMore',
  data(){
    return{
       listData:[],
    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "查看更多";
    })
    this.listData = JSON.parse(window.localStorage.getItem("lookmoreDetail")); //拿本地数据展示
  }
}

</script>

<style scoped lang="less">
 #lookMore{
   width: 100%;
   background: #FFFFFF;
   ul{
     width: 90%;
     margin: 0 auto;
     padding: .2rem 0;
     li{
       width: 100%;
       margin-bottom: 0.2rem;

       img{
         display: block;
         width: 100%;
       }
       p{
         width: 100%;
         line-height: 0.30rem;
         font-size:0.14rem;
         font-family:PingFangSC-Regular;
         font-weight:400;
         color:rgba(5,5,9,1);
         text-align: center;
         padding-bottom: 0.1rem;
       }
     }
   }
 }
</style>
