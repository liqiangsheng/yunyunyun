<template>
  <!--我的赞-->
  <div id="myFabulous">
    <div v-show="myfollow==false" class="myFabulousBox">
       {{message}}
    </div>
     <div v-show="myfollow==true" class="myFabulous_box">
       <ul class="myFabulous_tab">
         <li v-for="(item,index) in tablist" @click="tabClick(index)">
           <span :class="{active:tabIndex==index}">{{item}}</span>
         </li>
       </ul>
       <ul class="myFabulous_ul" v-show="tabIndex==0">
       <li v-for="(item,index) in ListData">
         <h5>{{item.title}}</h5>
         <div class="myFabulous_banner">
           <img :src="item.banner" alt="">
         </div>
         <div class="myFabulous_bannaerUrl">
           <div class="myFabulous_bannaerUrl_left">
             <img :src="item.bannaerUrl" alt="">
           </div>
           <div class="myFabulous_name">
             <b>{{item.name}}</b>
             <p>{{item.address}}</p>
           </div>
           <div class="myFabulous_type">
             {{item.type}}
           </div>
         </div>
       </li>
     </ul>
       <ul class="myFabulous_ul1" v-show="tabIndex==1">
         <li v-for="(item,index) in articleData">
              <div class="myFabulous_left">
                <h5>{{item.title}}</h5>
                <div style="color: #AAAAAA">
                  <img src="/static/images/查看.png" alt=""> {{item.name}}
                </div>
                <div><img src="/static/images/收藏.png" alt=""> {{item.address}} <img src="/static/images/评论.png"  alt="" style="margin-left: 0.3rem"> {{item.type}}</div>
              </div>
              <div class="myFabulous_right">
                <img :src="item.banner" alt="">
              </div>
         </li>
       </ul>
     </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
   import { IntallData } from '../../assets/js/promiseHttp';
export default {
  name: 'myFabulous',
  data(){
      return{
        myfollow:true, //数据请求成功显示
        userInfo:{}, //用户信息
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:"",//每页数据
        tablist:["作品","文章"], //tab选择
        tabIndex:0, //tab选择xiabiao
        ListData:[{title:"白色调——小米MIX3&OPPO R17 PRO&联想S5 PRO",banner:"./static/images/success.png",bannaerUrl:"./static/images/defultphoto.png",name:"fanner Walker",address:"深圳 包装设计师",type:"平面广告"}], // 数据
        articleData:[{
            title:"白色调——小米MIX3&OPPO R17 PRO&联想S5 PRO",banner:"./static/images/success.png",name:"5万次",address:"9758",type:"1756"
        }]
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的赞";
    })
    this.userInfo = {data:{id:this.$router.history.current.query.id,access_token:this.$router.history.current.query.token}}
    if(this.userInfo){
      this.myfollow= true;
    }else{
      this.message = "你还未登录，请登录！"
      this.myfollow= false;
    }

  },

  methods: {
    tabClick(i){//tab的下标
      this.tabIndex =i;
    }
  }
}

</script>

<style scoped lang="less">
#myFabulous{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  overflow: auto;
  overflow-x: hidden;
  .myFabulousBox{
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(5,5,9,0.3);
    margin-top: 1rem;
  }
  .myFabulous_box{
    width: 100%;
    .myFabulous_tab{
      width: 100%;
      height: 0.4rem;
      margin-top: 0.01rem;
      background: #ffffff;
      display: flex;
      box-sizing: border-box;
      li{
        flex: 1;
        height: 0.4rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 0.4rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        span{
          display: inline-block;
          height: 0.39rem;
        }
        span.active{
          border-bottom: 0.02rem solid #000000;
          color:rgba(5,5,9,1);
        }
      }
    }
    .myFabulous_ul{
      width: 100%;
     li{
       margin-top: 0.15rem;
       background: #ffffff;
       padding: 0.12rem 0.16rem;
       box-sizing: border-box;
       h5{
         font-size:0.15rem;
         font-family:PingFangSC-Regular;
         font-weight:400;
         color:rgba(5,5,9,1);
       }
       .myFabulous_banner{
         width: 100%;
         margin-top: 0.1rem;
         img{
           display: block;
           width: 100%;
         }
       }
       .myFabulous_bannaerUrl{
         width: 100%;
         margin-top: 0.1rem;
         overflow: hidden;
         .myFabulous_bannaerUrl_left{
           width: 0.4rem;
           height: 0.4rem;
           float: left;
           margin-right: 0.05rem;
           img{
             display: block;
             width: 0.4rem;
             height: 0.4rem;
             border-radius: 50%;
           }
         }
         .myFabulous_name{
           width: 1.5rem;
           height: 0.4rem;
           float: left;
           b{
             font-size:0.13rem;
             font-family:PingFangSC-Medium;
             font-weight:500;
             color:rgba(5,5,9,1);
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
           }
           p{
             font-size:0.12rem;
             font-family:PingFangSC-Regular;
             font-weight:400;
             color:rgba(153,153,153,1)
           }
         }
         .myFabulous_type{
           float: right;font-size:0.12rem;
           font-family:PingFangSC-Regular;
           font-weight:400;
           color:rgba(153,153,153,1);

         }
       }
     }
    }
    .myFabulous_ul1{
      width: 100%;
      li{
        margin-top: 0.15rem;
        background: #ffffff;
        padding: 0.12rem 0.16rem;
        box-sizing: border-box;
        display: flex;
        .myFabulous_left{
          width: 60%;
           padding-right: 0.05rem;
          h5{
            font-size:0.15rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          div{
            width: 100%;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            img{
              display: inline-block;
              width: 0.14rem;
              height: 0.1rem;
            }
          }
        }
        .myFabulous_right{
         flex: 1;
          img{
            display: block;
            width: 100%;
            border-radius: 0.05rem;
          }
        }
      }
    }
  }

}
</style>
