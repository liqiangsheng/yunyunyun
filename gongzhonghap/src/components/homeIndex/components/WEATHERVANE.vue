<template>
  <!--资讯-->
      <div id="WEATHERVANE">
        <div class="header">
          <div class="img"></div>
        </div>
        <div class="centent">
           <ul @scroll="updataMore">
             <div style="height: 1rem">

           </div>
             <li v-for="(item,index) in objList" @click="goToHomeDetail(item)">
               <div>
                 <h5>{{item.title}}</h5>
                 <p v-if="item.content">
                   {{item.content}}
                 </p>
                 <p v-else>
                   无
                 </p>
                 <div class="centent_look">
                   <span><img src="/static/images/liulangshu.svg" alt="">{{item.viewCount>10000?(item.viewCount/10000).toFixed(2)+'万':item.viewCount}}</span>
                   <span><img src="/static/images/xihuanshu.svg" alt="">{{item.laudedCount>10000?(item.laudedCount/10000).toFixed(2)+'万':item.laudedCount}}</span>
                   <span><img src="/static/images/pinlunshu.svg" alt="">{{item.commentCount>10000?(item.commentCount/10000).toFixed(2)+'万':item.commentCount}}</span>
                 </div>
                 <img class="jiantouRight" src="/static/images/jiantoufangkuai.png" alt="">
               </div>

             </li>
             <div class="messageFoot" v-if="!!message">
               {{message}}
             </div>
           </ul>

        </div>

      </div>
    </template>

    <script>
      import {specialSubjectFindSubjectInfoByCategory} from "../../../assets/js/promiseHttp"
      import { Toast } from 'mint-ui';  //弹框
      export default {
        name: 'big_coffee_says',
        data(){
          return{
            p:1,  //页
            s:20, //每页多少
            message:"", //触底提示
            pageNum:"",//每页数据
            objList:[], // 大咖说数据
            banner:{}, // 大咖说数据
            lengthBt:false,
          }
        },
        created() {
          document.title = "资讯"
          specialSubjectFindSubjectInfoByCategory("4",this.p,this.s).then(res=>{
            if(res.data.status == true){
              this.pageNum = Math.ceil(res.data.data.totalAll/this.s);
              if(this.pageNum >1){
                this.message = ""
              }else{
                this.message = "这是我的底线..."
              }
              this.objList = res.data.data.informationVoList;
              this.banner = res.data.data;
            }else{
              Toast("网络出错啦，请重试")
            }
          })
        },
        methods:{
          goToHomeDetail(v){ //去个人主页详情
            this.$router.push({path: "/homeDetail", query: {id:v.id}}) //去企业主页个人主页详情
          },
          updataMore(e){ //加载更多 分页
            if(e.target.scrollHeight==(e.target.scrollTop+e.target.offsetHeight)){
              this.p++;
              if(this.p>this.pageNum){
                this.message = "这是我的底线..."
                return
              }else if(this.p==this.pageNum){
                this.message = "这是我的底线..."
                specialSubjectFindSubjectInfoByCategory("4",this.p,this.s).then(res=>{
                  if(res.data.status == true){
                    this.objList = this.objList.concat(res.data.data.informationVoList);
                  }else{
                    Toast("网络出错啦，请重试")
                  }
                })
              }else if(this.p<this.pageNum){
                this.message = ""
                specialSubjectFindSubjectInfoByCategory("4",this.p,this.s).then(res=>{
                  if(res.data.status == true){
                    this.objList =  this.objList.concat(res.data.data.informationVoList);
                  }else{
                    Toast("网络出错啦，请重试")
                  }
                })
              }
            }
          },
        },
      }

    </script>

    <style scoped lang="less">
      #WEATHERVANE{
        width: 100%;
        height: 100%;
       overflow: hidden;
       .header{
         width: 100%;
         height: 1.39rem;
         overflow-x: scroll;
         position: relative;
         .img{
           position: absolute;
           left: -1rem;
           width: 10rem;
           height: 1.39rem;
           animation: leftBox 25s infinite;
           background: url(../../../assets/images/bolang1.png);
           background-size: 100% 100%;
         }
       }
        .centent{
          position: absolute;
          left: 0;
          bottom: 0;
          top: 1.3rem;
          right: 0;
          background: url(../../../assets/images/zixunBg.png);
          background-size: 100% 100%;
          ul{
            width: 90%;
            position: absolute;
            /*z-index: 2;*/
            right: 0;
            top:-1.3rem;
           bottom: 0;
            overflow-y: scroll;
            li{
              width: 100%;
              height: 1.6rem;
              background: url(../../../assets/images/zixunBying.png);
              >div{
                position: relative;
                width: 100%;
                height: 1.4rem;
                background: #ffffff;
                margin-bottom: 0.19rem;
                padding: 0.2rem 0 0.2rem 0.29rem;
                box-sizing: border-box;
                h5{
                  width: 93%;
                  font-size: 0.16rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #262626;
                }
                p{
                  width: 90%;
                  height: 0.36rem;
                  margin-top: 0.03rem;
                  color: #676768;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  word-break:break-all;
                  line-height: 0.18rem;
                  font-size: 0.1rem;
                  letter-spacing: 0.005rem;
                }
                .centent_look{
                  width: 80%;
                  height: 0.12rem;
                  margin-top:0.2rem;
                  span{
                    font-size: 0.12rem;
                    font-weight: 900;
                    margin-right: 0.18rem;
                    img{
                      display: inline-block;
                      width: 0.14rem;
                      height: 0.12rem;
                      margin-right: 0.07rem;
                    }
                  }
                }
                .jiantouRight{
                  width: 0.5rem;
                  height: 0.5rem;
                  display: inline-block;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                }
              }

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
        @keyframes  leftBox{
          to {left: -1rem}
          from {left: -4.5rem}
      }

    </style>
