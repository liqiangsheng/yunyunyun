<template>
  <div style="width: 100%">
    <div id="IntelligentMatchingA">
      <div class="IntelligentMatchingAItem">
        请选择你期望匹配的展商
      </div>
      <ul class="IntelligentMatchingAItem1">
        <li v-for="(item,index) in listData">
           <h5>{{item.title}} <span>（限选{{item.xuanNum}}个，{{item.bixuan}}）</span></h5>
           <div class="IntelligentMatchingAItemIndex" ref="companyStyle">
             <span v-for="(item1,index1) in item.listArr" :class="{active:item1.check==true}" @click="selectClick(item,index,item1,index1)">{{item1.name}}</span>
           </div>
           <div class="IntelligentMatchingAItemIndex1" v-if="item.height>92" v-show="listShow">
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
      listData:[ //列表数据
         {listArr:[{name:"I1T电子",check:false,id:1},{name:"I2T电子",check:false,id:2},{name:"I3T电子",check:false,id:3},{name:"IT电子",check:false,id:4},{name:"IT电子",check:false,id:5},{name:"IT电子",check:false,id:6},{name:"IT电子",check:false,id:7},{name:"IT电子",check:false,id:8},{name:"IT电子",check:false,id:9},{name:"IT电子",check:false,id:10},{name:"IT电子",check:false,id:11},{name:"IT电子",check:false,id:12},],title:"产业领域",xuanNum:2,bixuan:"必选",xuanArr:[],height:94},
         {listArr:[{name:"蓝牙音响",check:false,id:1},{name:"蓝牙音响",check:false,id:2},{name:"蓝牙音响",check:false,id:3},{name:"蓝牙音响",check:false,id:4},{name:"蓝牙音响",check:false,id:5},{name:"蓝牙音响",check:false,id:6},{name:"蓝牙音响",check:false,id:7},{name:"蓝牙音响",check:false,id:8},{name:"蓝牙音响",check:false,id:10},{name:"蓝牙音响",check:false,id:11},],title:"具体产品",xuanNum:2,bixuan:"非必选",xuanArr:[],height:94},
         {listArr:[{name:"生产型企业",check:false,id:1},{name:"生产型企业",check:false,id:2},{name:"生产型企业",check:false,id:3},{name:"生产型企业",check:false,id:4},],title:"公司属性",xuanNum:2,bixuan:"必选",xuanArr:[],height:94},
         {listArr:[{name:"北京",check:false,id:1},{name:"北京",check:false,id:2},{name:"北京",check:false,id:3},{name:"北京",check:false,id:4},{name:"北京",check:false,id:5},],title:"地区",xuanNum:2,bixuan:"非必选",xuanArr:[],height:94},
        ]
    }
  },
  watch:{
    "listData": {
      handler:function (new1,old1) {
//         console.log(old1,"djsaldlasldla")
//         console.log(new1,"djsaldlasldla")
        this.listData = new1;
      },
      deep:true,
    }
  },
  created(){

    setTimeout(()=>{
      let that = this;
      this.$nextTick(function(){
        that.$refs.companyStyle.map((item,index)=>{
          that.listData.forEach((item1,index1)=>{
            if(index ==index1){
              item1.height = item.offsetHeight;
            }
          })
        })
      })
      that.listShow = true;
    },0.000001)
  },
  methods:{
    okClick(){ //确定匹配
      if(this.listData[0].xuanArr.length<=0){
        Toast("产业领域为必选项，请选择");
        return
      }
      if(this.listData[2].xuanArr.length<=0){
        Toast("公司属性为必选项，请选择");
        return
      }
      console.log(111111)
        this.$router.push({path:"/IntelligentMatchingB"})
    },
    componenList(v){ //后台数据
       this.listData.forEach((item,index)=>{
         if(this.componentIndex == index){
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

        if( item.xuanArr.length>1&&item.title!="具体产品"){
          Toast("最多选择两个")
          v.check = !v.check;
          return;
        }else  if( item.xuanArr.length>4&&item.title=="具体产品"){
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
   console.log(item.xuanArr,"最多选择两个")

    },
    moreClick(v,i){ //更多的数据
      console.log(v,"更多的数据")
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
