<template>
  <div id="fireMap" @scroll="moreUpdata" ref="screenWidh">
      <ul class="fireMapBox" :style="styleWidth">
        <li style="width: 0.2rem;float: left;height: 100%">
<!--占位u-->
        </li>
        <li v-for="(item,index) in objData" class="fireMapList" :style="'background:url('+item.advertiseImage.imageUrl+');background-size:100% 100%;width:'+310/375*screenWidh/100+'rem'">
        <!--<li v-for="(item,index) in objData" class="fireMapList" :style="'background:url(../../../static/images/bg0.png);background-size:100% 100%'">-->
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
      styleWidth:{width:"3.4rem"},
      screenWidh:375
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "图播平台";
      this.screenWidh = this.$refs.screenWidh.offsetWidth;
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
             this.styleWidth ={width: this.objData.length*(310/375*this.screenWidh)/100+0.5+"rem"}
           })
         }else {
           this.styleWidth ={width: 3.4+"rem"}
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
                this.styleWidth ={width: this.objData.length*(310/375*this.screenWidh)/100+0.5+"rem"}
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
                this.styleWidth ={width: this.objData.length*(310/375*this.screenWidh)/100+0.5+"rem"}
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

    .fireMapBox{
      position: absolute;
      top:0.2rem;
      bottom: 0.21rem;
      overflow-y: hidden;
      .fireMapList{
        width: 3.1rem;
        height: 100%;
        margin-right: 0.1rem;
        float: left;
        position: relative;
        .fireMapBox_box{
         padding: 0 0.35rem 0 0.4rem;
          box-sizing: border-box;
          height: 1.92rem;
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          h5{
            font-size: 0.17rem;
            height: 0.44rem;
            line-height: 0.22rem;
            width: 100%;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            word-break:break-all;
            color: #ffffff;
            letter-spacing: 0.01rem;
          }
          p{
            margin-top: 0.12rem;
            width: 100%;
            height: 0.38rem;
            line-height: 0.19rem;
            font-size: 0.13rem;
             color: #ffffff;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            word-break:break-all;
            letter-spacing: 0.01rem;
          }
          span{
            display: block;
            margin-top: 0.37rem;
            font-weight: 400;
            font-size: 0.13rem;
            color: #ffffff;
            letter-spacing: 0.01rem;
          }
          div{
            width: 0.96rem;
            height:0.42rem;
            border: 0.02rem solid #ffffff;
            text-align: center;
            line-height: 0.42rem;
            border-radius: 0.3rem;
            font-size: 0.14rem;
            font-weight: 900;
            color: #ffffff;
            position: absolute;
            right: 0.35rem;
            bottom: 0.26rem;
          }
        }
      }
    }

  }

</style>
