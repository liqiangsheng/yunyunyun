<template>
  <div id="release">
    <div class="release_box" v-if="!sheetVisible" @click="butong">点击下载 <span style="color: #2998ff">“不同App”</span>进行发布！</div>
    <ul class="Indextab">
      <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
      </li>
    </ul>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import { Actionsheet } from 'mint-ui';
  import { Toast } from 'mint-ui';  //弹框
  import Vue from 'vue';
  Vue.component(Actionsheet.name, Actionsheet);
export default {
  name: 'release',
  data(){
    return{
      actions:[{ name:"请下载不同Tech App" },{ name:"iOS",method:this.IOS },{ name:"Android",method:this.Android }],//下载地址
      tabbarAarr:[  //、、tab
        {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
        {icon:"./static/images/zixun2.png",icon1:"./static/images/zixun1.png",path:"/homeIndex"},
        {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
        {icon:"./static/images/zhihuihuodong2.png",icon1:"./static/images/zhihuihuodong1.png",path:"/index"},
        {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
      ],
      tabbarAarrIndex:2,  //点击tab的下标
      sheetVisible:false, //是否显示弹框
    }
  },
  created() {
  this.sheetVisible = true;

//判断用户终端类型

  },
  methods:{
    butong(){ //不同下载
      this.sheetVisible = true;
    },
    tabarClick(i){  //tabar点击事件
      this.$router.push({path:this.tabbarAarr[i].path});
    },
    IOS(){
      location.href="https://itunes.apple.com/cn/app/id1439775835"
    },
    Android(){
      location.href="https://www.pgyer.com/designcloud"
    },
  }
}

</script>

<style scoped lang="less">
#release {
  position: absolute;
  left: 0;
  bottom: 0;
  top:0;
  right: 0;
  overflow: hidden;
  .release_box{
    width: 100%;
    text-align: center;
    line-height: 2rem;
  }
  .Indextab{
    position: absolute;
    width: 100%;
    height: 0.55rem;
    bottom: 0;
    left: 0;
    background: #ffffff;
    border-top: 0.01rem solid #EEEEEE;
    display: flex;
    .indexTabLi{
      flex: 1;
      text-align: center;
      padding-top:0.13rem ;
      box-sizing: border-box;
      .indexTabImg{
        width:  24px;
        height:  24px;
        display:block;
        margin: 0 auto;
      }
      .indexTabImg.active{
        width: 0.3rem;
        transform: translateY(-0.05rem);
        height: 0.3rem;
      }
    }
  }
}
</style>
