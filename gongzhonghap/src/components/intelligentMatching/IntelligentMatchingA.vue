<template>
  <div style="width: 100%">
    <div id="IntelligentMatchingA">
      <div class="IntelligentMatchingAItem">
        请选择你期望匹配的展商
      </div>
      <ul class="IntelligentMatchingAItem1">
        <li v-for="(item,index) in listData">
           <h5>{{item.name}} <span>（限选{{item.limited}}个，<span v-if="item.allowEmpty==true">必选</span><span  v-if="item.allowEmpty==false">非必选</span>）</span></h5>
           <div class="IntelligentMatchingAItemIndex" ref="companyStyle">
             <span v-for="(item1,index1) in item.tagList" :class="{active:item1.check==true}" @click="selectClick(item,index,item1,index1)">{{item1.name}}</span>
           </div>
           <div class="IntelligentMatchingAItemIndex1">
             <span @click="moreClick(item,index)">更多领域</span> <img src="/static/images/shuangjiantou.png" alt="">
           </div>
        </li>
      </ul>
    </div>
     <div class="IntelligentMatchingAFoot" @click="okClick">
       开始匹配
     </div>
    <IntelligentMatchingAComponent :componentData="componentData" v-if="componentDataShow" @close="close" @componenList="componenList"></IntelligentMatchingAComponent>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import IntelligentMatchingAComponent from "./IntelligentMatchingAComponent.vue" //更多的组件
  import {tagGroupAll} from "../../assets/js/promiseHttp"  //数据请求
export default {
    components:{
      IntelligentMatchingAComponent
    },
  name: 'IntelligentMatchingA',
  data(){
    return{
      componentDataShow:false, //组件显示
      componentIndex:0, //传数据的下标
      componentData:"", //传数据给组件
      listShow:false, //初始化显示
      listData:[], //列表数据
      userInfo:"", //用户登录数据
    }
  },
  watch:{
    "listData": {
      handler:function (new1,old1) {

        this.listData = new1;
      },
      deep:true,
    }
  },
  created(){

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo,"ashkdhaskdfk")
    if (this.userInfo){
      tagGroupAll(this.userInfo.data.access_token).then(res=>{ //请求数据

        if(res.status == true){
          res.data.forEach((item,index)=>{
            item.xuanArr = [];
            item.tagList.forEach((item1,index1)=>{
              item1.check = false;
            })
          })
          this.listData = res.data;
          console.log(this.listData ,"dsadasdas")
        }else{
          Toast("网络出错啦！请重试")
        }
      });
    }else{
      Toast("登录出错啦！请重新登录")
    }



  },
  methods:{

    okClick(){ //确定匹配
      let obj={};
      if(this.listData[1].xuanArr.length<=0){
        Toast(this.listData[1].name+"为必选项，请选择");
        return
      }
      if(this.listData[3].xuanArr.length<=0){
        Toast(this.listData[3].name+"为必选项，请选择");
        return
      }

      this.listData.forEach((item,index)=> {
        item.newArr = [];

        if (index == 0) {
          this.listData[0].xuanArr.forEach((item1, index1) => {
            this.listData[0].newArr.push(item1.code)
          })
        }
        if (index == 1) {
          this.listData[1].xuanArr.forEach((item1, index1) => {
            this.listData[1].newArr.push(item1.code)
          })
        }
        if (index == 2) {
          this.listData[2].xuanArr.forEach((item1, index1) => {
            this.listData[2].newArr.push(item1.code)
          })
        }
        if (index == 3) {
          this.listData[3].xuanArr.forEach((item1, index1) => {
            this.listData[3].newArr.push(item1.code)
          })
        }
        obj[item.id+""]=item.newArr.join(",");

      })
         sessionStorage.setItem("IntelligentMatchingBData",JSON.stringify(obj))
        this.$router.push({path:"/IntelligentMatchingB"})
    },
    componenList(v){ //后台数据
       this.listData.forEach((item,index)=>{
         if(v.code == item.code){
           this.listData[index] = v;
         }
       })
    },
    close(v){ // 关闭
      this.componentDataShow = v;
    },
    selectClick(item,index,v,i){ //选中的目标，
      v.check = !v.check

      if( v.check == true){

        if( item.xuanArr.length>1&&item.code!="02"){
          Toast("最多选择两个")
          v.check = !v.check;
          return;
        }else  if( item.xuanArr.length>4&&item.code=="02"){
          Toast("最多选择五个")
          v.check = !v.check;
          return;
        }else{
          item.xuanArr.push(v)
        }
      }else {
        item.xuanArr.forEach((vItem,vI)=>{
          if(v.id == vItem.id){
            item.xuanArr.splice(vI,1)
          }
        })

      }

    },
    moreClick(v,i){ //更多的数据
      this.componentIndex = i;
      this.componentDataShow = true;
      this.componentData = v;
    }
  },
  mounted(){

  },
}

</script>

<style scoped lang="less">
  .IntelligentMatchingAFoot{
    width: 100%;
    height: 0.49rem;
    background:#72D992;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;line-height: 0.49rem;
  }
 #IntelligentMatchingA{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom: 0.49rem;
   overflow-y: auto;
   background: url(../../../static/images/bj2.png);
    background-size: 100% 100%;
 }
  .IntelligentMatchingAItem{
    width: 90%;
    margin: 0 auto;
    height: 0.45rem;
    font-size:0.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 0.45rem;
  }
  .IntelligentMatchingAItem1{
    width: 90%;
    margin: 0 auto;
    li{
      width: 100%;
      height: 1.59rem;
      background:rgba(255,255,255,0.2);
      border-radius:0.1rem;
      margin-bottom: 0.2rem;
      h5{
        padding:0 0.1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size:0.15rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        span{
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          opacity: 0.7;
        }
      }
      .IntelligentMatchingAItemIndex{
        width: 100%;
        padding: 0 0.1rem ;
        max-height: 0.94rem;
        overflow: hidden;
        box-sizing: border-box;
        span{
          display: inline-block;
          background: rgba(255,255,255,0.3);
          border-radius:0.29rem;
          padding: 0.09rem 0.15rem;
          margin: 0.05rem 0.03rem;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1)
        }
        span.active{
          background:rgba(255,255,255,1);
          color:rgba(5,5,9,1);

        }

      }

      .IntelligentMatchingAItemIndex1{
        width:90%;
        margin: 0 auto;
        margin-top: 0.1rem;
        span{
          text-decoration:underline;
          font-size:0.15rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(24,139,246,1);
        }
        img{
          display: inline-block;
          width: 0.17rem;
          height: 0.13rem;
        }

      }
    }

  }


</style>
