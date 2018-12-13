<template>
  <div id="myfollow">
    <div v-show="myfollow==false" class="myfollowBox">
       {{message}}
    </div>
     <div v-show="myfollow==true" class="myfollow_box">
        <div class="myfollow_box_header">已关注 <span>{{totalAll}}</span> 位设计师</div>
        <ul v-if="objList.length>0">
          <li v-for="(item,index) in objList">
            <div class="myfollow_li1">
              <img :src="item.url?item.url:'/static/images/defultphoto.png'" alt="">
            </div>
            <div class="myfollow_li2">
              <h5>{{item.name}}</h5>
              <p style="width: 2rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.regionName}} {{item.title}}</p>
              <p><span class="pSpan1">作品: </span><span class="pSpan2">{{item.titleCount}} </span><span class="pSpan3">粉丝：</span><span class="pSpan2">{{item.caredCount}}</span></p>
            </div>
            <div class="myfollow_li3" @click="followClick(item)">
              <img v-if="item.mutual==true" src="/static/images/已关注.png" alt="">
              <img v-if="item.mutual==false" src="/static/images/互关注.png" alt="">
              <span v-if="item.mutual==true">已关注</span>
              <span v-if="item.mutual==false">互关注</span>
            </div>
          </li>
        </ul>
       <div class="messageFoot" @click="updataMore" v-if="objList.length>0">
         {{message}}
       </div>
     </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
   import { customerCareNoteListCare } from '../../assets/js/promiseHttp';
export default {
  name: 'myfollow',
  data(){
      return{
        myfollow:true, //数据请求成功显示
        userInfo:{}, //用户信息
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:"",//每页数据
        totalAll:0, //一共多少位设计师关注
        objList:[], // 数据
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的关注";
    })
    this.userInfo = {data:{id:this.$router.history.current.query.id,access_token:this.$router.history.current.query.token}}
    if(this.userInfo){
      this.myfollow= true;
      customerCareNoteListCare(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
         if(res.status == true){
           this.totalAll = res.total;
           this.pageNum = Math.ceil(res.total/this.s);
           if(this.pageNum >1){
             this.message = "点击加载更多..."
           }else{
             this.message = "这是我的底线..."
           }
           this.objList = res.data;
         }else {
            Toast("网络出错啦！请重试")
         }
      })
    }else{
      this.message = "你还未登录，请登录！"
      this.myfollow= false;
    }
  },

  methods: {
    followClick(v){//关注

    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        customerCareNoteListCare(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status == true){
            this.objList = this.objList.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        customerCareNoteListCare(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status == true){
            this.objList =  this.objList.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
    },
  }
}

</script>

<style scoped lang="less">
#myfollow{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  .myfollowBox{
    width: 100%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(5,5,9,0.3);
    margin-top: 1rem;
  }
  .myfollow_box{
    width: 100%;
    .myfollow_box_header{
      padding: 0 0.15rem;
      box-sizing: border-box;
      width: 100%;
      line-height: 0.3rem;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      span{
        color: #050509;
      }
    }
    ul{
      background: #ffffff;
      padding: 0.15rem;
      box-sizing: border-box;
      li{
        width: 100%;
        height: 0.75rem;
        border-bottom: 0.01rem solid #EEEEEE;
        overflow: hidden;
        position: relative;
        .myfollow_li1{
          width: 0.4rem;
          height: 100%;
          padding-top: 0.05rem;
          float: left;
          img{
            display: block;
            width: 100%;
            height: 0.4rem;
            border-radius: 50%;
          }
        }
        .myfollow_li2{
          width: 2.9rem;
          height: 100%;
          padding-left: 0.05rem;
          float: left;
          padding-top: 0.05rem;
          h5{
            font-size:0.13rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;
          }
          p{
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            .pSpan2{
              color:rgba(5,5,5,1);
            }
            .pSpan3{
             margin-left: 0.1rem;
            }
          }
        }
        .myfollow_li3{
          width: 0.8rem;
          height: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
          background: #050509;
          border-radius: 0.03rem;
          color:rgba(255,255,255,1);
          font-size: 0.1rem;
          position: absolute;
          right: 0.1rem;
          top:0.24rem;
          img{
            display: inline-block;
            width: 0.1rem;
            height: 0.1rem;
            margin-right: 0.05rem;
          }
        }
       .myfollow_li3.active{
          background: #ffffff;
          color: #050509;
         border: 0.01rem solid #050509;
        }
      }
    }
    .messageFoot{
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      color: rgba(5,5,5,0.3);
      text-align: center;
      margin-top: 0.2rem;
    }
  }

}
</style>
