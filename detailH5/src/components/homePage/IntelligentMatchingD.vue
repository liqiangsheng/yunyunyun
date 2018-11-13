<template>
  <div id="IntelligentMatchingD">
        <div class="IntelligentMatchingDHeader" >
             <h3>U I设计界的黑暗料理， 一些复杂且能把用户搞蒙圈的操作，引诱型强制付费陷阱，能把用户搞蒙圈的操作</h3>
            <div class="IntelligentMatchingDHeaderIndex">UI设计 | 构图 | 隐喻</div>
             <div class="IntelligentMatchingDHeaderIndex1">
               <img src="/static/images/banner1.png" alt="">
             </div>
             <div class="IntelligentMatchingDHeaderIndex2">
               <img src="/static/images/4.png" alt="">
               <button @click="giveClick">+ 关注</button>
             </div>
             <div class="IntelligentMatchingDHeaderIndex3">
               <img src="/static/images/shuangying1.png" alt="" style="margin: 0 0.1rem">
               黑暗设计是指UI设计师设计一些复杂的，能把用户搞蒙圈的操作。或者说服用户在首页做一些事情，比如当你打开软件时，弹出来一个投票的窗口。
               <img src="/static/images/shuangying.png" alt="">
             </div>
        </div>
        <div class="IntelligentMatchingDItem" v-html="htmlContent"></div>
        <div class="IntelligentMatchingDItem1">
          <img src="/static/images/zan1.png" alt="" @click="giveClick">1,970 赞
        </div>
      <div class="IntelligentMatchingDItem2">
         <img src="/static/images/banqun.png" alt="">版 权
      </div>
    <div class="IntelligentMatchingDItem3">
         本文版权归不同科技所有 / 未经许可不得转载或翻译
      </div>

    <div class="IntelligentMatchingDItem4">
     <!--  //有用的-->
    </div>
    <ul class="IntelligentMatchingDItem5">
      <li v-for="(item,index) in commenArr">
        <div class="IntelligentMatchingDItemL">
          <img :src="item.banner" alt="">
        </div>
        <div class="IntelligentMatchingDItemR">
            <h5>{{item.title}}</h5>
            <div class="time">{{item.time}}分钟前</div>
            <div class="commen">
              {{item.commen}}
               <div class="zan1" @click="giveClick"><img src="/static/images/zan1.png" alt="">{{item.zan}}</div>
            </div>
            <ul class="ReplyUl">
               <li v-for="(item1,index1) in item.Reply"  class="ReplyLi">
                 <span>{{item1.title}}:</span>{{item1.commen}} <div @click="giveClick"><img src="/static/images/zan1.png" alt=""> {{item1.zan}}</div>
               </li>
            </ul>
        </div>
      </li>
    </ul>
    <div class="IntelligentMatchingDItem6" @click="giveClick">
       <div class="footer">
          <ul>
            <li class="footerLi1">
              <img src="/static/images/xialian.png" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/xingxing.png" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/bianji.png" alt="">
            </li>
            <li class="footerLi2">
              <img src="/static/images/bianxie.png" alt="">
            </li>
          </ul>
       </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'IntelligentMatchingD',
  data(){
    return{
        htmlContent:"<div>11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的1 + 1111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的11111111111111111我是最帅的</div>",
        commenArr:[
          {banner:"./static/images/1.png",time:"3",title:"fanner Walker",commen:"你用的是什么软件啊你用的是什么软件啊你用的是什么软件啊你用的是什么软件啊你用的是什么软件啊你用的是什么软件啊？",zan:"9.48万",Reply:[
            {title:"美丽的娜娜小姐",commen:"点赞后很快就知道啦",zan:"948"},{title:"美丽的娜娜小姐",commen:"对呀，他写的文章太棒了！我的第六感告诉我，作者是一个很感性的人",zan:"948"},
          ]
          },  {banner:"./static/images/2.png",time:"3",title:"fanner Walker",commen:"你用的是什么软件啊？",zan:"9.48万",Reply:[
            {title:"美丽的娜娜小姐",commen:"点赞后很快就知道啦",zan:"948"},{title:"美丽的娜娜小姐",commen:"对呀，他写的文章太棒了！我的第六感告诉我，作者是一个很感性的人",zan:"948"},
          ]
          },  {banner:"./static/images/3.png",time:"3",title:"fanner Walker",commen:"你用的是什么软件啊？",zan:"9.48万",Reply:[
            {title:"美丽的娜娜小姐",commen:"点赞后很快就知道啦",zan:"948"},{title:"美丽的娜娜小姐",commen:"对呀，他写的文章太棒了！我的第六感告诉我，作者是一个很感性的人",zan:"948"},
          ]
          },
        ]
    }
  },
  created(){

  },
  methods:{
    giveClick(){ //点击点赞  //下载IOS 或则安卓

    }
  }
}

</script>

<style scoped lang="less">
 #IntelligentMatchingD{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom: 0;
   overflow-y: auto;
    background-size: 100% 100%;
   background: #FFFFFF;
   /*padding:0.15rem;*/
   /*box-sizing: border-box;*/
   .IntelligentMatchingDHeader{
     width: 100%;
     padding:0.15rem;
     box-sizing: border-box;
     h3{
       font-size:0.17rem;
       font-family:PingFangSC-Medium;
       font-weight:500;
       color:rgba(5,5,9,1)
     }
     .IntelligentMatchingDHeaderIndex{
       width: 100%;
       font-size:0.12rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(153,153,153,1);
       margin: 0.15rem 0;
     }
     .IntelligentMatchingDHeaderIndex1{
       width: 100%;
       img{
         display: block;
         width: 100%;
       }
     }
     .IntelligentMatchingDHeaderIndex2{
       width: 100%;
       margin: 0.15rem 0;
       position: relative;
       img{
         display: inline-block;
         width: 0.64rem;
         height: 0.64rem;
         border-radius: 50%;
       }
       button{
         position: absolute;
         right: 0;
         top: 0.08rem;
         width: 1.0rem;
         height: 0.4rem;
         border: 0;
         background:#050509;
         border-radius:0.05rem;
         color: #FFFFFF;
       }
     }
     .IntelligentMatchingDHeaderIndex3{
       width: 100%;
       padding: 0.2rem;
       box-sizing: border-box;
       background:rgba(5,5,9,0.05);
       border-radius:0.01rem;
       font-size:0.13rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(5,5,9,1);
       img{
        display: inline-block;
         width: 0.22rem;
         height: 0.18rem;
       }
     }
   }
   .IntelligentMatchingDItem{
     width: 100%;
     overflow-y: auto;
     padding:0.15rem;
     box-sizing: border-box;
   }
   .IntelligentMatchingDItem1{
     width: 1.53rem;
     height: 0.4rem;
     margin: 0.15rem auto;
     background:url(../../../static/images/zan.png);
     background-size: 100% 100%;
     text-align: center;
     line-height: 0.4rem;
     font-size:0.15rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(5,5,9,1);
     img{
       display: inline-block;
       width: 0.17rem;
       height: 0.17rem;
       margin: 0.1rem 0.1rem 0 0  ;
     }
   }
   .IntelligentMatchingDItem2{
     width: 60%;
     margin: 0 auto;
     text-align: center;
     position: relative;
     img{
       display: inline-block;
       position: absolute;
       left: 0;
       top: 0.15rem;
     }
     text-align: center;
     font-size:0.14rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     line-height:0.35rem;
   }
   .IntelligentMatchingDItem3{
     width: 100%;
     text-align: center;
     font-size:0.12rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     line-height:0.35rem;
   }
   .IntelligentMatchingDItem4{
     width: 100%;
     margin:0.15rem 0;
     height:0.01rem;
     background:  rgba(220,220,220,1)
   }
   >.IntelligentMatchingDItem5{
     width: 92%;
     margin: 0 auto;
     margin-bottom: 0.15rem;
     >li{
       width: 100%;
       padding: 0.15rem 0;
       border-bottom: 0.01rem solid rgba(220,220,220,1);
       display: flex;
       >.IntelligentMatchingDItemL{
         width: 0.8rem;
         height: 0.8rem;
         >img{
           display: block;
           width: 100%;
           height: 100%;
           border-radius: 50%;
         }
       }
       .IntelligentMatchingDItemR{
         /*flex: 1;*/
         width: 100%;
         padding-left: 0.15rem;
         box-sizing: border-box;
         h5{
           width: 100%;
           font-size:0.13rem;
           font-family:PingFangSC-Medium;
           font-weight:500;
           color:rgba(5,5,9,1);
           line-height:0.48rem;
         }
         .time{
           font-size:0.09rem;
           font-family:PingFangSC-Regular;
           font-weight:400;
           color:rgba(153,153,153,1)
         }
         .commen{
           width: 70%;
           position: relative;
           margin-top: 0.1rem;
           font-size:0.13rem;
           font-family:PingFangSC-Regular;
           font-weight:400;
           color:rgba(5,5,9,1);
           .zan1{
             position: absolute;
             right: -35%;
             top: 0;
             img{
               display: inline-block;
               width: 0.13rem;
               height: 0.13rem;
               margin-right: 0.05rem;
             }
           }
         }
        .ReplyUl{
           width: 100%;
          padding: 0.1rem;
          box-sizing: border-box;
           background:rgba(244,244,244,1);
           border-radius:0.1rem;
          margin-top: 0.1rem;
            li{
              width: 70%;
              position: relative;
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(5,5,9,1);
              line-height:0.32rem;
              div{
                position: absolute;
                right: -35%;
                top: 0;
                font-size:0.11rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(102,102,102,1);
                img{
                  display: inline-block;
                  width: 0.13rem;
                  height: 0.13rem;
                  margin-right: 0.05rem;
                }
              }
              span{
                font-size:0.12rem;
                font-family:PingFangSC-Regular;
                font-weight:bold;
                color:rgba(5,5,9,1);
              }

            }
         }
       }
     }
     >li:last-child{
       border-bottom: 0;
     }

   }
   .IntelligentMatchingDItem6{
     width: 100%;
     height: 0.49rem;
     border-top:0.01rem solid #DFDFDF;
     background:rgba(254,252,252,1);
     box-shadow:0px -1px 0.07rem 0px rgba(223,223,223,1);

     .footer{
      width: 90%;
       height: 0.35rem;
       margin: 0 auto;
       margin-top: 0.05rem;

       ul{
         display: flex;
         .footerLi1{
           width: 1.5rem;
           height: 0.35rem;
           background:rgba(255,255,255,1);
           border:1px solid rgba(223, 223, 223, 1);
           border-radius: 0.2rem;
           position: relative;
           img{
             display: inline-block;
             width: 0.2rem;
             height: 0.2rem;
             position: absolute;
             right: 0.1rem;
             top:0.08rem;
           }
         }
         .footerLi2{
           flex: 1;
           text-align: center;
           img{
             margin-top: 10%;
             display: inline-block;
             width: 0.23rem;
             height: 0.22rem;
           }
         }
       }

    }
   }

 }


</style>
