<template>
  <!--<div class="home" :style="active">-->
  <div class="home">
      <div class="homeBox">
          <div class="header">
                <div class="headerItem">
                    <div class="logo">
                        <img src="../../assets/images/logo.png" alt="不同科技" titel="不同科技">
                    </div>
                    <ul class="headerList">
                        <li v-for="(item,index) in  objList" @click="objListClick(item,index)"><span :class="{objListActive:objListIndex == index}">{{item}}</span></li>
                    </ul>
                    <ul class="headerArr">
                        <li v-for="(item,index) in  objArr"   @mouseenter="enter(item)" @mouseleave="leave(item)">
                            <span>{{item.name}}</span>
                            <img :src="item.img" alt="" v-show="item.isShow==true">

                        </li>

                    </ul>
                </div>
                <div class="headerItem1">
                    <img src="../../assets/images/大球3.png" alt="">
                    <div class="fontSize"></div>
                </div>
              <div class="headerItem2">
                  <div>
                      <img src="../../assets/images/直线.png" alt="">
                      　与　不　同　共　筑　设　计　生　态　
                      <img src="../../assets/images/直线.png" alt="">
                  </div>

              </div>
              <div class="headerItem3">
                  <img src="../../assets/images/联系我们.png" alt="">
              </div>
          </div>
      </div>
      <div class="homefoot">
           <div class="homefootItem">
                <ul>
                    <li class="li1">
                        <img src="../../assets/images/桌面图标.png" alt="">

                        <span>设计新生，而和不同</span>
                    </li>
                    <li class="li2">
                        <p>邮箱：service@butongtech.com</p>
                        <p>地址：深圳市保税区福年广场B4 113</p>
                        <p>Copyright © 2018-2018 不同（深圳）科技有限公司, All Rights Reserved </p>
                        <p>粤ICP备18127403号</p>
                    </li>
                    <li class="li3">
                        <p>关注我们</p>
                        <p>关于不同</p>
                        <p>人才招募</p>
                        <p>服务规则</p>
                        <p  @mouseenter="enterP()" @mouseleave="leaveP()">
                            官方公众号
                            <img src="../../assets/images/官方公众号二维码.png" alt="" v-if="networkShow">
                        </p>
                    </li>
                    <li class="li4">
                        <p>友情链接</p>
                        <p class="p one-txt-cut">深圳市工业设计行业协会主页</p>
                        <p class="p one-txt-cut">2018深圳国际工业设计大展</p>
                        <p class="p one-txt-cut">2017深圳国际工业设计大展</p>
                    </li>
                </ul>
           </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "home",
    components: {


    },
    data(){
      return{

          objList:["智能设计社区","智能活动平台"],
          objListIndex:0,
          objArr:[{name:"小程序",isShow:false,img:require("../../assets/images/erweima.png")},{name:"IOS",isShow:false,img:require("../../assets/images/erweima.png")},{name:"Andriod",isShow:false,img:require("../../assets/images/erweima.png")}],
          objArrIndex:0,
          networkShow:false,
      }
    },
    created(){


    },
    methods:{
        enterP(){//移入
            this.networkShow = true;
        },
        leaveP(){//移出
            this.networkShow = false;
        },
        objListClick(v,i){ //
          this.objListIndex =i;
        },
        enter(item){//移入
            console.log(item,"asjkdkla")
           item.isShow = true;
           console.log(this.objArr)
        },
        leave(item){//移出
            item.isShow = false;
        }
    }

};
</script>
<style scoped lang="less">
 .home{
  background: #F7F7F7;
     .homeBox{
         width: 100%;
         background: #040812;
         .header{
             /*width: 100%;*/
             max-width: 1920px;
             background: url(../../assets/images/bg.png);
             background-size: cover;
             max-height: 880px;
             margin: 0 auto;
             padding-bottom: 60px;
             overflow: hidden;
             .headerItem{
                 min-width: 1280px;
                 height: 68px;
                 background: rgba(255,255,255,0.05);
                 position: relative;
                 .logo{
                     width: 112px;
                     height: 26px;
                     margin: 20px 0 0 14%;
                     float: left;
                     img{
                         display: block;
                         width: 100%;
                         height: 100%;
                     }
                     img:hover{
                        cursor: pointer;
                     }
                 }
                 .headerList{
                      float: left;
                      width: 240px;
                     margin-left: 22%;
                     overflow: hidden;
                     li{
                         width: 100px;
                         display: inline-block;
                         color: #ffffff;
                         line-height: 68px;
                         font-size: 14px;
                         text-align: center;
                         margin-right: 20px;
                         span{
                             display: inline-block;
                             height: 67px;
                         }
                         .objListActive{
                             border-bottom: 1px solid #3DFFFB;
                             color: #3DFFFB;
                         }
                     }
                     li:first-child:hover,li:last-child:hover{
                         color:#3DFFFB ;
                         cursor: pointer;
                     }
                 }
                 .headerArr{
                     width: 180px;
                     float: right;
                     margin-right: 8%;
                     li{
                         width: 50px;
                         display: inline-block;
                         line-height: 67px;
                         color: #ffffff;
                         font-size: 14px;
                         text-align: center;
                         margin-right: 10px;
                         position: relative;
                         span{
                             display: inline-block;
                             height: 67px;
                         }
                         img{
                             position: absolute;
                             top:45px;
                             left: -20px;
                             display: block;
                             width: 94px;
                             height: 102px;
                         }

                     }
                     li:first-child:hover,li:last-child:hover,li:nth-child(2):hover{
                         color:#3DFFFB ;
                         cursor: pointer;
                     }
                 }
             }
             .headerItem:hover{
                 height: 67px;
                 border-bottom: 1px dashed rgba(11,213,209,0.1);
             }
             .headerItem1{
                 min-width: 1280px;
                 margin: 100px 0;
                 height: 453px;
                 position: relative;
                 img{
                     display: block;
                     width: 452px;
                     height: 453px;
                     margin: 0 auto;
                     animation:circleRoate 25s infinite linear ;
                 }
                 .fontSize{
                     width: 563px;
                     height: 343px;
                     position: absolute;
                     left: 50%;
                     top: 50%;
                     margin-left: -281px;
                     margin-top: -170px;
                     background: url(../../assets/images/fontSize.png);
                 }
                 .fontSize:hover{
                     background: url(../../assets/images/fontSzieHover.png);
                 }
                 @keyframes circleRoate{
                     from{transform: rotate(0deg);}
                     to{transform: rotate(360deg);}
                 }
             }

             .headerItem2{
                 min-width: 1280px;
                 height: 38px;
                 margin-bottom: 21px;
                 div{
                     width: 563px;
                     height: 100%;
                     margin: 0 auto;
                     font-size:16px;
                     font-family:"微软雅黑";
                     font-weight:400;
                     color:rgba(255,255,255,1);
                     line-height:38px;
                     padding-left: 35px;
                     /*letter-spacing:13px;*/
                     img{
                         display: inline-block;
                         width: 104px;
                         height: 2px;
                         transform: translateY(-5px);
                     }
                 }
             }
             .headerItem3{
                 min-width: 1280px;
                 height: 38px;
                 img{
                     display: block;
                     width: 140px;
                     height: 38px;
                     margin: 0 auto;
                 }
             }
         }
     }
     .homefoot{
         width: 100%;
         .homefootItem{
             /*width: 100%;*/
             max-width: 1920px;
             margin: 0 auto;
             height: 200px;
             margin: 0 auto;
             overflow: hidden;
             ul{
                 width: 1280px;
                 height: 100%;
                 padding: 29px 0 52px 0;
                 box-sizing:border-box;
                 -moz-box-sizing:border-box; /* Firefox */
                 -webkit-box-sizing:border-box; /* Safari */
                 margin: 0 auto;
                 li{
                     float: left;
                 }
                 .li1{
                     width: 157px;
                     text-align: center;
                     margin-right: 60px;
                     img{
                         display: block;
                         margin: 0 auto;
                         width: 68px;
                         height: 68px;
                     }
                     span{
                         display: block;
                         height:20px;
                         font-size:14px;
                         font-family:"微软雅黑";
                         font-weight:400;
                         color:#333;
                         line-height:20px;
                         letter-spacing:2px;
                         margin-top:20px;
                     }
                 }
                 .li2{
                     width: 500px;
                     margin-right: 80px;
                     p:first-child,p:nth-child(2){
                         height:20px;
                         font-size:14px;
                         font-family:PingFangSC-Medium;
                         font-weight:500;
                         color:rgba(51,51,51,1);
                         line-height:25px;
                     }
                    p:nth-child(3){
                        height:20px;
                        font-size:14px;
                        font-family:"微软雅黑";
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:25px;
                        margin-top: 15px;
                    }
                     p:last-child{
                         height:20px;
                         font-size:14px;
                         font-family:"微软雅黑";
                         font-weight:400;
                         color:rgba(153,153,153,1);
                         line-height:25px
                     }
                 }
                 .li3{
                     width: 94px;
                     margin-right: 80px;
                     p{
                         height:20px;
                         font-size:14px;
                         font-family:"微软雅黑";
                         font-weight:400;
                         color:rgba(153,153,153,1);
                         line-height:25px;
                     }
                     p:nth-of-type(2){
                         margin-top: 14px;
                     }
                     p:last-child,p:first-child{
                         height:20px;
                         font-size:14px;
                         font-family:PingFangSC-Semibold;
                         font-weight:600;
                         color:rgba(51,51,51,1);
                         line-height:25px;
                     }
                     p:last-child{
                         position: relative;
                         img{
                             display: block;
                             width: 94px;
                             height: 100px;
                             position: absolute;
                             top:-97px;
                             left: -10px;
                         }
                     }
                     p:last-child:hover{
                         color: #0BD5D1;
                         cursor: pointer;
                     }
                 }
                 .li4{
                     width: 240px;
                    p:first-child{
                        height:20px;
                        font-size:14px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(51,51,51,1);
                        line-height:25px;
                        margin-bottom: 14px;
                    }
                     .p{
                         height:20px;
                         font-size:14px;
                         font-family:"微软雅黑";
                         font-weight:400;
                         color:rgba(153,153,153,1);
                         line-height:25px;
                     }
                     .p:hover{
                         color: #0BD5D1;
                         text-decoration:underline;
                         cursor: pointer;
                     }
                 }
             }
         }
     }
 }

</style>