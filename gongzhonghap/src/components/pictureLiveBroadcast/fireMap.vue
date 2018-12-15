<template>
  <div id="fireMap">
    <ul v-for="(item,index) in objData" class="fireMapList" @click="goToPicture(item)">
      <img :src="item.advertiseImage.imageUrl" alt="">
    </ul>
    <div class="fireMapfooter">
      {{message}}
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';  //弹框
  import {activityImagesBookList} from '../../assets/js/promiseHttp'
export default {
  name: 'fireMap',
  data(){
    return{
      objData:[], //活动火图列表
      pageNum:2, //共多少页
      message:"不同正在努力加载中...",//点击加载
      page:{
        p:1, //第几页
       s:20,// 、、一页多少
      },
      stateXCX:"", //是不是小程序
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "火图直播平台";
    })
    activityImagesBookList(this.page).then(res=>{
      if(res.data.status == true){
        res.data.data.forEach((item,index)=>{
          if(!item.advertiseImage){
             res.data.data.splice(index,1);
          }
        })
         this.pageNum = Math.ceil(res.data.total/this.page.s);
         if(this.pageNum>1){
           this.message = "点击加载更多..."
         }else{
           this.message = "这是我的底线..."
         }
         this.objData = res.data.data;
      }else{
        Tost("网络异常，请重试")
      }
    })
  },
  methods:{
    tabarClick(i){  //tabar点击事件
//      this.tabbarAarrIndex = i;
      this.$router.push({path:this.tabbarArr[i].path});
    },
    goToPicture(item){ //去火图直播
      this.$router.push({path:"/pictureLiveBroadcast",query:{id:item.id,isBool:false,bookId:item.id}})

    }
  },
}

</script>

<style scoped lang="less">
  #fireMap{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: #eeeeee;
    box-sizing: border-box;
    overflow-y:auto;
    overflow-x: hidden;
    padding: .01rem;
    .fireMapList{
      width: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
      img{
        display: block;
        width: 100%;
      }
    }
  }
  .fireMapfooter{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
  }
</style>
