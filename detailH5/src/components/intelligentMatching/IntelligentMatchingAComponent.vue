<template>

    <div id="IntelligentMatchingAComponent">
      <div class="IntelligentMatchingAComponentHeader">
        <img src="/static/images/close.png" alt="" @click="closeClick">
        {{componentData.name}}
        <span  @click="preservationClick">保存</span>
      </div>
      <div class="IntelligentMatchingAComponentItem">
        <h5 class="IntelligentMatchingAComponentItemIndex"><span>限选 {{componentData.limited}} 个，<span v-if="componentData.allowEmpty==true">必选</span><span  v-if="componentData.allowEmpty==false">非必选</span></span></h5>
        <div class="IntelligentMatchingAItemIndex">
           <span v-for="(item,index) in componentData.tagList" :class="{active:item.check==true}" @click="selectClick(componentData,item,index)">{{item.name}} </span>
        </div>

      </div>
    </div>

</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
export default {

  props:["componentData"],
  name: 'IntelligentMatchingAComponent',
  data(){
    return{
        listData:[],
    }
  },
  created(){
     this.listData = JSON.stringify(this.componentData);
  },
  methods:{
    preservationClick(){ //保存

      this.$emit("componenList",this.componentData)
      this.$emit("close",false)
    },
    closeClick(){ //关闭
//      console.log(JSON.parse(this.listData))
      this.$emit("componenList",JSON.parse(this.listData))
       this.$emit("close",false)
    },
    selectClick(item,v,i){ //选中的目标，
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
    },
  }
}

</script>

<style scoped lang="less">
 #IntelligentMatchingAComponent{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom:0;
   z-index: 1;
   overflow-y: auto;
   background: url(../../../static/images/bj2.png);
   background-size: 100% 100%;
   .IntelligentMatchingAComponentHeader{
     width: 90%;
     margin: 0 auto;
     text-align: center;
     line-height: 0.49rem;
     position: relative;
     font-size:0.15rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(255,255,255,1);
     img{
       display: block;
       position: absolute;
       left: 0;
       top: 0.15rem;
       width: 0.18rem;
       height: 0.18rem;
     }
     span{
       display: block;
       position: absolute;
       right: 0;
       top:0rem;
       font-size:0.12rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(255,255,255,1);
     }
   }
   .IntelligentMatchingAComponentItem{
     width: 90%;
     margin: 0 auto;
     background:rgba(255,255,255,0.36);
     border-radius:10px;
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
       overflow: hidden;
       box-sizing: border-box;
       margin-bottom: 0.2rem;
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
   }
 }


</style>
