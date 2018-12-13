<template>
  <!--评论-->
  <div id="myComment">
    <div v-show="myfollow==false" class="myCommentBox">
       {{message}}
    </div>
     <div v-show="myfollow==true" class="myComment_box">
         <ul>
           <li v-for="(item,index) in objList">
             <div class="myComment_ul">
               <div class="myComment_me"><span>我 </span>评论了文章：<span>是的，需要我们一起努力！</span></div>
               <div class="myComment_time">3分钟前</div>
             </div>
              <div class="myComment__box">
                   <div class="myComment_box">
                     <span>@韩梅梅：</span>
                     希望共同推动汽车的轻量化革命
                   </div>
                <div class="myComment___box">
                    <img src="/static/images/defultphoto.png" alt="">
                    <div>
                      <p>未来汽车轻量化设计的建议未来汽车轻量化设计的建议</p>
                      <p>作者：阿门大侠_try</p>
                    </div>
                </div>


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
  name: 'fans',
  data(){
      return{
        myfollow:true, //数据请求成功显示
        userInfo:{}, //用户信息
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:"",//每页数据
        totalAll:0, //一共多少位设计师关注
        objList:[
          {bannerUrl:"./static/images/defultphoto.png",name:"fanner Walker",address:"深圳 工业设计师",zuoping:"501",fensi:"2838",isguanzhun:"2"},
          {bannerUrl:"./static/images/defultphoto.png",name:"fanner Walker",address:"深圳 工业设计师",zuoping:"501",fensi:"2838",isguanzhun:"3"}
        ], // 大咖说数据
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的评论";
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo){
      this.myfollow= true;
    }else{
      this.message = "你还未登录，请登录！"
      this.myfollow= false;
    }
  },

  methods: {
    followClick(v){//关注

    }
  }
}

</script>

<style scoped lang="less">
#myComment{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  .myCommentBox{
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(5,5,9,0.3);
    margin-top: 1rem;
  }
  .myComment_box{
    width: 100%;
    ul{
      width: 100%;
      li{
        margin-top: 0.15rem;
        width: 100%;
        background: #ffffff;
        padding:0.15rem;
        box-sizing: border-box;
        .myComment_ul{
          width: 100%;
          display: flex;
          .myComment_me{
            width: 75%;
            color: #999999;
            span{
              font-size:0.13rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
            }
          }
          .myComment_time{
            flex: 1;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            text-align: right;
          }
        }
        .myComment__box{
          width: 100%;
          background:rgba(244,244,244,1);
          border-radius:0.05rem;
          margin-top: 0.1rem;
          padding: 0.15rem 0.11rem;
          box-sizing: border-box;
          .myComment_box{
            width: 100%;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            margin-bottom: 0.1rem;
            span{
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(5,5,9,1);
            }
          }
          .myComment___box{
            width: 100%;
            height: 0.6rem;
            background: #ffffff;
            display: flex;
            >img{
              width:0.6rem;
              height: 0.6rem;
              display: block;
            }
            >div{
              flex: 1;
              padding: 0.1rem;
              box-sizing: border-box;
              p:first-child{
                width: 2.5rem;
                font-size:0.14rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(5,5,9,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
              }
              p:last-child{
                width: 2.5rem;
                font-size:0.12rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(153,153,153,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
              }
            }
          }
        }
      }
    }

  }

}
</style>
