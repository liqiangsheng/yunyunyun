<template>
  <!--个人吃瓜页-->
    <div id="personalMelonPages">
      <!--背景头像-->
       <div class="personalMelonPages_bg">
         <div class="personalMelonPages_header">
           <img src="/static/images/writeRight.png" alt="" @click="$router.go(-1)">
            <div v-if="listData.cared==false"  @click="followClick('关注',listData)">关注</div>
            <div v-if="listData.cared==true"  @click="followClick('已关注',listData)">已关注</div>
         </div>
         <div class="personalMelonPages_bannerUrl">
           <img :src="listData.ownerUrl?listData.ownerUrl:'https://pub.qinius.butongtech.com/defultphoto.png'" alt="">
         </div>
       </div>
      <!--关注，喜爱，收藏-->
      <div class="personalMelonPages_topBox" @scroll="boxScroll">
        <div class="personalMelonPages_name">
          <div>
            <h5>{{listData.name}}</h5>
            <p>{{listData.regionName}}</p>
          </div>

          <ul>
            <li>
              <b>{{listData.careCount>10000?(listData.careCount/10000).toFixed(2)+'万':listData.careCount}}</b>
              <p>关注</p>
            </li>
            <li>
              <b>{{listData.laudCount>10000?(listData.laudCount/10000).toFixed(2)+'万':listData.laudCount}}</b>
              <p>点赞</p>
            </li>
            <li>
              <b>{{listData.caredCount>10000?(listData.caredCount/10000).toFixed(2)+'万':listData.caredCount}}</b>
              <p>粉丝</p>
            </li>
          </ul>
        </div>
        <!--主要内容-->
        <div class="personalMelonPages_content">
          <ul  class="personalMelonPages_content_Data" v-if="imgsArr.length>0&&imgsArr.length%2==0">
            <li v-for="(item,index) in imgsArr" :class="[{active1:(index+1-1)%4==0},{active2:(index+1-2)%4==0},{active3:(index+1-3)%4==0},{active4:(index+1-4)%4==0}]" @click="goToDetail(item,index)" >
              <img :src="item.imageUrl1" alt="">
            </li>
          </ul>
          <ul  class="personalMelonPages_content_Data1" v-if="imgsArr.length>0&&imgsArr.length%2==1">
            <li v-for="(item,index) in imgsArr" :class="[{active1:(index+1-1)%4==0},{active2:(index+1-2)%4==0},{active3:(index+1-3)%4==0},{active4:(index+1-4)%4==0}]" @click="goToDetail(item,index)" >
              <img :src="item.imageUrl1" alt="">
            </li>
          </ul>
          <div class="personalMelonPages_content_noData" v-if="imgsArr.length<=0">
            <img src="/static/images/weidenglu.png" alt="">
            <p>他还没留下痕迹呢</p>
          </div>
          <!---->
          <div class="messageFoot" v-if="!!message&&imgsArr.length>0">
            {{message}}
          </div>
        </div>

      </div>

    </div>
  </template>

  <script>

    import { Toast } from 'mint-ui';  //弹框
    import { Indicator } from 'mint-ui';
    import wxShare from "../../assets/js/wxShare"
    import {customerPubContentList,commonUserFindOne,commonUserCareUser,commonUserCancelCareUser,companyInfoCareCompany,companyInfoCancelCareCompany,shareInfoShareUrl} from "../../assets/js/promiseHttp.js"
    export default {
      name: 'find',
      components: {
//        vueWaterfallEasy
      },
      data(){
        return{
          listData:{}, //头部数据
          message:"",
           p: 1, // request param//
          s:20, // request param////测试
          pages:0, //总共多少页
          isFirstLoad:true, //第一次加载
          maxCols:2,  //瀑布流显示最大的列数
          openPullDown:true,//下拉刷新
          imgsArr:[], //数据
          userInfo:"", //用户信息
        }
      },
      created() {

        this.userInfo = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):"";
        let data = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):{data:{user_id:"",userType:""}};
        commonUserFindOne(this.$router.history.current.query.id,data.data.user_id,data.data.userType).then(res=>{
          if(res.status == true){
            res.data.careCount = res.data.careCount?res.data.careCount:0;
            res.data.caredCount = res.data.caredCount?res.data.caredCount:0;
            res.data.laudCount = res.data.laudCount?res.data.laudCount:0;
             this.listData =res.data;
          }else{
            Toast("网络出错了，请重试")
          }
        })

        this.IndicatorData();

      },
      methods:{
          boxScroll(e){ //滚动事件
            let scrollTop = e.target.scrollTop?e.target.scrollTop:0;
            let scrollHeight = e.target.scrollHeight?e.target.scrollHeight:0;
            let clientHeight = e.target.clientHeight?e.target.clientHeight:0;
            if(scrollTop==scrollHeight-clientHeight){
              this.p++
              let that = this;
              if(that.pages<that.p){
                that.p = that.pages;
                  this.message = "这是我的底线...";
                  return;
              }else if(that.pages==that.p){
                customerPubContentList(this.$router.history.current.query.id,this.p,this.s,true).then(res=>{
                  if(res.status == true){
                    res.data.forEach((item,index)=>{
                      item.imageUrl1 =item.cover.url+'?imageView2/1/w/205/h/230/q/75|imageslim'
                    })
                    that.imgsArr = that.imgsArr.concat(res.data);
                    this.message = "这是我的底线...";
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }else if(that.pages>that.p){
                customerPubContentList(this.$router.history.current.query.id,this.p,this.s,true).then(res=>{
                  if(res.status == true){
                    res.data.forEach((item,index)=>{
                      item.imageUrl1 =item.cover.url+'?imageView2/1/w/205/h/230/q/75|imageslim'
                    })
                    this.message = "加载中...";
                    that.imgsArr = that.imgsArr.concat(res.data);
                  }else{
                    Toast("网络出错了，请重试")
                  }
                })
              }
            }
          },
        IndicatorData(){ //初始数据
          customerPubContentList(this.$router.history.current.query.id,this.p,this.s,true).then(res=>{
            if(res.status == true){
              res.data.forEach((item,index)=>{
                item.imageUrl1 =item.cover.url+'?imageView2/1/w/205/h/230/q/75|imageslim'
              })
              this.pages = Math.ceil(res.total/this.s);
              this.imgsArr = res.data;
              if(this.pages>1){
                this.message = '';
              }else{
                this.message = '这是我的底线';
              }
            }else{
              Toast("网络出错了，请重试")
            }
          })
        },
        share(){//分享
          shareInfoShareUrl(encodeURIComponent(location.href.split('#')[0])).then(res=>{
            if(res.status==true){
              let obj = {
                title:this.listData.name,
                desc:this.listData.introduce,
                url:"http://account.butongtech.com/index.html#/personalMelonPages?id="+this.$router.history.current.query.id,
                imgUrl:this.listData.ownerUrl,
              }
              wxShare.wxShare(res.data,obj)
            }else{
              Toast("网络出错了，请重试")
            }
          })
        },
        followClick(v,v1){ //点击是不是关注了
          let data = JSON.parse(localStorage.getItem("userInfo"))
          if(data){
            if(v=='关注'){ //关注
              commonUserCareUser(v1.id,data.data.id,"2",data.data.access_token).then(res=>{
                if(res.data.status==true){
                  this.$shujike('关注');
                  Toast("关注成功")
                  v1.cared =true
                }else{
                  Toast("网络出错了，请重试")
                }
              })
            }else if(v=='已关注'){//取消关注
              commonUserCancelCareUser(v1.id,data.data.id,"2",data.data.access_token).then(res=>{
                if(res.data.status==true){
                  Toast("关注已取消")
                  v1.cared =false
                }else{
                  Toast("网络出错了，请重试")
                }
              })
            }
          }else{
            Toast("您还未登陆，请登陆");
            setTimeout(()=>{
              this.push({path:"/login"});
            },1000)
          }

        },
        goToDetail(value,index){ //进入详情页
          this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
        },

      },
      mounted() {
        if(window.common.apiDomain20020=='https://dcloud.butongtech.com:20020'){
          setTimeout(()=>{
            this.share();
          },200)
        }
      },
    }

  </script>

  <style scoped lang="less">
     #personalMelonPages{
       position: absolute;
       left: 0;
       top: 0;
       bottom: 0;
       right: 0;
       overflow: hidden;
       background: #ffffff;
       .personalMelonPages_bg{
         width: 100%;
         height: 1.5rem;
         background: url('https://pub.qinius.butongtech.com/meBg.png');
         background-size: 100% 100%;
         padding-top: 0.22rem;
         box-sizing: border-box;
         position: relative;
         .personalMelonPages_header{
           width: 100%;
           height: 0.36rem;
           padding: 0 0.14rem 0 0.2rem;
           box-sizing: border-box;
           >img{
             display: inline-block;
             width: 0.18rem;
             height: 0.15rem;
             margin-top: 0.1rem;
           }
           >div{
             float: right;
             width: 0.76rem;
             height: 0.32rem;
             border:0.02rem solid #ffffff;
             border-radius:0.48rem;
             line-height: 0.32rem;
             font-size:0.14rem;
             text-align: center;
             font-family:PingFangSC-Semibold;
             font-weight:600;
             color:rgba(255,255,255,1);
           }
         }
         .personalMelonPages_bannerUrl{
           width: 0.68rem;
           height: 0.68rem;
           border: 0.02rem solid #ffffff;
           border-radius: 50%;
           overflow: hidden;
           position: absolute;
           bottom: -0.35rem;
          left: 40.6%;
           img{
             display: block;
             width: 0.7rem;
             height: 0.7rem;
           }
         }
       }
       .personalMelonPages_topBox{
         position: absolute;
         left: 0;
         top: 1.97rem;
         bottom: 0;
         right: 0;
         overflow-y: scroll;
       }
       .personalMelonPages_name{
         width: 100%;
         height: 2.32rem;
         background: #ffffff;
         padding: 0.20rem 0.2rem 0.48rem 0.2rem;
         box-sizing: border-box;
         >div{
           width: 100%;
           height: .91rem;
           >h5{
             width: 100%;
             padding: 0 0.2rem;
             box-sizing: border-box;
             text-align: center;
             font-size:0.18rem;
             font-family:'微软雅黑';
             font-weight:700;
             color:rgba(38,38,40,1);
             line-height:0.25rem;
           }
           >p{
             width: 100%;
             text-align: center;
             margin-top: 0.1rem;
             font-size:0.13rem;
             /*font-family:'微软雅黑';*/
             font-weight:400;
             color:#c5c5c6;
             line-height:0.16rem;
           }
         }

         >ul{
           width:100%;
           padding: 0 0.2rem;
           box-sizing: border-box;
           display: flex;
           li{
             flex: 1;
             text-align: center;
             b{
               display: block;
               width: 100%;
               font-size:0.18rem;
               font-family:'微软雅黑';
               font-weight:500;
               color:rgba(38,38,40,1);
               line-height:0.24rem;
             }
             p{
               width: 100%;
               font-size:0.13rem;
               /*font-family:'微软雅黑';*/
               font-weight:400;
               color:#c5c5c6;
               line-height:0.17rem;
               margin-top: 0.08rem;
             }
           }
           /*li:first-of-type{*/
             /*text-align: left;*/
           /*}*/
           /*li:last-of-type{*/
             /*text-align: right;*/
           /*}*/
         }
       }
       .personalMelonPages_content{
         /*position: absolute;*/
         /*left: 0;*/
         /*bottom: 0;*/
         /*right: 0;*/
         /*top:4.121rem;*/
         /*overflow: hidden;*/
         /*overflow-y: scroll;*/
         >.personalMelonPages_content_Data{
           overflow: hidden;
           width: 100%;
           padding: 0 0.1rem;
           box-sizing: border-box;
           /*flex-wrap: wrap;*/
           li{
             float: left;
             margin-bottom: 0.1rem;
           }
           li.active1{
             width: 2.05rem;
             height: 2.3rem;
             margin-right: 0.1rem;
             img{
               width: 2.05rem;
               height: 2.3rem;
             }
           }
           li.active2{
             width: 1.4rem;
             height: 2.3rem;
             img{
               width: 1.4rem;
               height: 2.3rem;
             }
           }
           li.active3{
             width: 1.4rem;
             height: 2.3rem;
             margin-right: 0.1rem;
             img{
               width: 1.4rem;
               height: 2.3rem;
             }
           }
          li.active4{
             width: 2.05rem;
             height: 2.3rem;
             img{
               width: 2.05rem;
               height: 2.3rem;
             }
           }
         }
         >.personalMelonPages_content_Data1{
           width: 100%;
           padding: 0 0.1rem;
           box-sizing: border-box;
          overflow: hidden;
           li{
             float: left;
             margin-bottom: 0.1rem;
           }
           li.active1{
             width: 2.05rem;
             height: 2.3rem;
             margin-right: 0.1rem;
             img{
               width: 2.05rem;
               height: 2.3rem;
             }
           }
           li.active2{
             width: 1.4rem;
             height: 2.3rem;
             img{
               width: 1.4rem;
               height: 2.3rem;
             }
           }
           li.active3{
             width: 1.4rem;
             height: 2.3rem;
             margin-right: 0.1rem;
             img{
               width: 1.4rem;
               height: 2.3rem;
             }
           }
           li.active4{
             width: 2.05rem;
             height: 2.3rem;
             img{
               width: 2.05rem;
               height: 2.3rem;
             }
           }
           li:nth-last-of-type(1){
             width: 3.55rem;
             height: 2.3rem;
             img{
               width: 3.55rem;
               height: 2.3rem;
             }
           }
         }
         >.personalMelonPages_content_noData{
           width: 100%;
           padding-top: 0.59rem;
           overflow: hidden;
           >img{
             display: block;
             width: 1rem;
             height: 0.94rem;
             margin: 0 auto;
           }
           >p{
             width: 100%;
             text-align: center;
             margin-top: 0.14rem;
             font-size:0.14rem;
             font-family:PingFangSC-Light;
             font-weight:300;
             color:rgba(103,103,104,1);
             line-height:0.3rem;
           }
         }
       }
     }
     .messageFoot{
       width: 100%;
       height: 0.3rem;
       line-height: 0.3rem;
       margin-bottom: 0.1rem;
       color: rgba(5,5,5,0.3);
       text-align: center;
     }
  </style>
