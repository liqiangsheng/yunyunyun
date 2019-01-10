<template>
  <!--草稿-->
  <div id="draft">
        <div v-if="listData.length<=0" class="draft_NolistData">
          <img src="/static/images/原创.png" alt="">
          <p>你还没有任何草稿哦～</p>
        </div>
        <ul  class="draft_ul" v-else>
         <li v-for="(item,index) in listData">
           <div class="draft_img">
             <img :src="item.cover.url?item.cover.url:'/static/images/defultphoto.png'" alt="">
           </div>
           <div class="draft_time">
             <h5>{{item.title}}</h5>
             <span>{{item.updateTime|formatTime1}}</span>
           </div>
         </li>
          <div class="messageFoot" @click="updataMore">
            {{message}}
          </div>
        </ul>
      </div>
    </template>

    <script>
      import { Toast } from 'mint-ui';  //弹框
      import { Indicator } from 'mint-ui';
      import { customerPubContentListOwner } from '../../../assets/js/promiseHttp';
      export default {
        name: 'draft',
        data(){
          return{
            p:1,  //页
            s:20, //每页多少
            pages:0, //总共多少页
            message:"不同努力加载中...", //触底提示
            userInfo:{},//用户数据
            listData:[], //数据
          }
        },
        created() {
          this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if(this.userInfo){

            customerPubContentListOwner(this.userInfo.data.id,false,this.p,this.s,this.userInfo.data.access_token).then(res=>{  //false 为草稿
//              console.log(res,"草稿")
              if(res.status == true){
                this.pages = Math.ceil(res.total/this.s);
                if(this.pages>1){
                  this.message = "点击加载更多...";

                }else{
                  this.message = "这是我的底线...";
                }
                this.listData = res.data;
              }else{
                Indicator.close();
                Toast("网络出错了，请重试")
              }
            })
          }
        },
        methods:{
          updataMore(){ //点击加载更多
            this.p++
            let that = this;
            if(that.pages<that.p){
              that.p = that.pages;
              Toast("没有更多发现了");
              return;
            }else if(that.pages==that.p){

              customerPubContentListOwner(this.userInfo.data.id,false,this.p,this.s,this.userInfo.data.access_token).then(res=>{
                if(res.status == true){
                  that.listData = that.listData.concat(res.data);

                }else{
                  Indicator.close();
                  Toast("网络出错了，请重试")
                }
              })
            }else if(that.pages>that.p){
              customerPubContentListOwner(this.userInfo.data.id,false,this.p,this.s,this.userInfo.data.access_token).then(res=>{
                if(res.status == true){
                  that.listData = that.listData.concat(res.data);
                }else{
                  Indicator.close();
                  Toast("网络出错了，请重试")
                }
              })
            }
          }
        }
      }

    </script>

    <style scoped lang="less">
      #draft {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        /*padding-bottom: 0.5rem;*/
        .draft_NolistData{
          width: 100%;
          padding-top: 1rem;
          img{
            display: block;
            width: 1rem;
            height: 0.94rem;
            margin: 0 auto;
          }
          p{
            text-align: center;
            margin-top: 0.2rem;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
        }
        .draft_ul{
          width: 100%;
          box-sizing: border-box;
          padding: 0.1rem 0.15rem;
          li{
            width: 100%;
            height: 0.8rem;
            margin-bottom: 0.1rem;
            background: #ffffff;
            border-radius: 0.1rem;
            padding: 0.1rem;
            box-sizing: border-box;
            display: flex;
            .draft_img{
            width: 0.6rem;
              height: 0.6rem;
              box-shadow:0px 0.01rem 0.75rem 0px rgba(223,223,223,0.5);
              border-radius:0.05rem;
              margin-right: 0.05rem;
              img{
                width: 0.6rem;
                height: 0.6rem;
                display: block;
              }
            }
            .draft_time{
              width: 100%;
              h5{
                font-size:0.13rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(5,5,9,1);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              span{
                font-size:0.12rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(170,170,170,1);
              }
            }
          }
          .messageFoot{
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            color: rgba(5,5,5,0.3);
            text-align: center;
            margin-top: 0.1rem;
          }
        }
      }
    </style>

