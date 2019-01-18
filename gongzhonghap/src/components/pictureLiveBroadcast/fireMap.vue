<template>
  <div id="fireMap" @scroll="moreUpdata">
      <ul class="fireMapBox" :style="styleWidth">
        <li style="width: 20px;float: left;height: 100%">
<!--占位u-->
        </li>
        <li v-for="(item,index) in objData" class="fireMapList" :style="'background:url('+item.advertiseImage.imageUrl+');background-size:100% 100%'">
           <div class="fireMapBox_box">
              <h5>{{item.activityTitle}}</h5>
               <p>{{item.activitySummary}}</p>
               <span>{{item.activityStartTime|formatTime}}</span>
              <div @click="goToPicture(item)">进入火图</div>
           </div>
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
      pages:0, //共多少页
      page:{
        p:1, //第几页
       s:20,// 、、一页多少
       },
      stateXCX:"", //是不是小程序
      styleWidth:{width:"340px"}
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
         this.pages = Math.ceil(res.data.total/this.page.s);

         if(res.data.data.length>0){
           this.objData = res.data.data;
           this.$nextTick(function(){
               this.styleWidth ={width: this.objData.length*320+20+"px"}
           })
         }else {
           this.styleWidth ={width: 340+"px"}
         }
      }else{
        Tost("网络异常，请重试")
      }
    })
  },
  methods:{
    moreUpdata(e){//滑动加载更多e

      if(e.target.scrollWidth==(e.target.scrollLeft+e.target.offsetWidth)){
        this.page.p++
        let that = this;
        if(that.pages<that.page.p){
          that.page.p = that.pages;
          Toast("没有更多活动了");
          return;
        }else if(that.pages==that.page.p){

          activityImagesBookList(this.page).then(res=>{
            if(res.status == true){
              res.data.data.forEach((item,index)=>{
                if(!item.advertiseImage){
                  res.data.data.splice(index,1);
                }
              })
              that.objData = that.objData.concat(res.data);
              this.$nextTick(function(){
                this.styleWidth ={width: this.objData.length*320+20+"px"}
              })
            }else{
              Indicator.close();
              Toast("网络出错了，请重试")
            }
          })
        }else if(that.pages>that.page.p){
          activityImagesBookList(this.page).then(res=>{
            if(res.status == true){
              res.data.data.forEach((item,index)=>{
                if(!item.advertiseImage){
                  res.data.data.splice(index,1);
                }
              })
              that.objData = that.objData.concat(res.data);
              this.$nextTick(function(){
                this.styleWidth ={width: this.objData.length*320+20+"px"}
              })
            }else{
              Indicator.close();
              Toast("网络出错了，请重试")
            }
          })
        }
      }
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
    overflow-x: scroll;
    background: #eeeeee;
    .fireMapBox{
      position: absolute;
      top:0.1rem;
      bottom: 0.31rem;
      overflow-y: hidden;
      .fireMapList{
        width: 310px;
        height: 100%;
        margin-right: 0.1rem;
        float: left;
        position: relative;
        .fireMapBox_box{
          width: 80%;
          height: 237px;
          position: absolute;
          left: 10%;
          bottom: 0;
          h5{
            font-size: 17px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ffffff;
          }
          p{
            margin-top: 16px;
            width: 100%;
            height: 57px;
            line-height: 19px;
            font-size: 13px;
             color: #ffffff;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            word-break:break-all;
          }
          span{
            display: block;
            margin-top: 52px;
            font-size: 12px;
            color: #ffffff;
          }
          div{
            width: 96px;
            height: 44px;
            border: 2px solid #ffffff;
            text-align: center;
            line-height: 44px;
            border-radius: 30px;
            font-size: 17px;
            color: #ffffff;
            position: absolute;
            right: 0;
            bottom: 60px;
          }
        }
      }
    }

  }

</style>
