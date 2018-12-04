<template>
  <div id="fireMap">
    <ul v-for="(item,index) in objData" class="fireMapList" @click="goToPicture(item)">
      <img :src="item.advertiseImage.imageUrl" alt="">
    </ul>
    <div class="fireMapfooter">
      {{message}}
    </div>
    <ul class="Indextab">
      <li v-for="(item,index) in tabbarArr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg">
        {{item.name}}
      </li>
    </ul>
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
      tabbarArr:[  //、、tab
        {name:"智慧活动",icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/index"},
        {name:"火图直播",icon:"./static/images/火图2.png",icon1:"./static/images/火图1.png",path:"/fireMap"},
        {name:"我的",icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
      ],
      pageNum:0, //共多少页
      message:"",//点击加载
      page:{
        p:1, //第几页
       s:20,// 、、一页多少
      },
      tabbarAarrIndex:1, //点击tab的下标
      stateXCX:"", //是不是小程序
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "火图直播平台";
    })
    activityImagesBookList(this.page).then(res=>{
      if(res.data.status == true){
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
    padding-bottom: 0.5rem;
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
  .Indextab{
    position: fixed;
    width: 100%;
    height: 0.49rem;
    bottom: 0;
    left: 0;
    background: #ffffff;
    border-top: 0.01rem solid #EEEEEE;
    display: flex;
    .indexTabLi{
      flex: 1;
      text-align: center;
      padding-top:0.1rem ;
    }
    .indexTabImg{
      width: 0.16rem;
      height: 0.19rem;
      display:block;
      margin: 0 auto;
    }
  }
</style>
