<template>
  <div id="myfollow">
    <div v-show="myfollow==false" class="myfollowBox">
       {{message}}
    </div>
     <div v-show="myfollow==true" class="myfollow_box">
        <div class="myfollow_box_header">已关注 <span>{{objList.length}}</span> 位设计师</div>
        <ul v-if="objList.length>0">
          <li v-for="(item,index) in objList">
            <div class="myfollow_li1" @click="goHomepage(item)">
              <img :src="item.url?item.url:'/static/images/defultphoto.png'" alt="">
            </div>
            <div class="myfollow_li2">
              <h5>{{item.name}}</h5>
              <p style="width: 2rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.regionName}} {{item.title}}</p>
              <p><span class="pSpan1">作品: </span><span class="pSpan2">{{item.titleCount}} </span><span class="pSpan3">粉丝：</span><span class="pSpan2">{{item.caredCount}}</span></p>
            </div>
            <div class="myfollow_li3" @click="followClick(item,index)">
              <img v-if="item.mutual==false" src="/static/images/yiguanzhu.png" alt="">
              <img v-if="item.mutual==true" src="/static/images/huguanzhu.png" alt="">
              <span v-if="item.mutual==false">已关注</span>
              <span v-if="item.mutual==true">互关注</span>
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
   import { customerCareNoteListCare,commonUserCancelCareUser,companyInfoCancelCareCompany } from '../../assets/js/promiseHttp';
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

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(this.userInfo){
      this.myfollow= true;
      customerCareNoteListCare(this.userInfo.data.id,this.userInfo.data.access_token,this.p,this.s).then(res=>{
//      customerCareNoteListCare("100",this.userInfo.data.access_token,this.p,this.s).then(res=>{
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
    goHomepage(v){//点击头像 去吃瓜页 或则设计师主页 或者企业
      if(v.userType=="2"){ //个人
        if(v.vuser==false){ //去吃瓜
          this.$router.push({path:"/personalMelonPages",query:{id:v.userId}})
        }else{//去大咖
          this.$router.push({path:"/bigShotPage",query:{id:v.userId}})//1  true是大咖个人
        }
      }else if(v.userType=='1'){ //企业
        this.$router.push({path:"/enterprisePage",query:{state:1,id:v.userId}})//1 是大咖企业
      }else {
        Toast("后台参数错误")
      }

    },
    followClick(v,i){//关注

      let data = JSON.parse(localStorage.getItem("userInfo"));
      if(!data){
        Toast("您还未登录，请登录！");
        setTimeout(()=>{
          this.$router.push({path:"/login"})
        },1000)
      }else{
     ///你关注的人，别人没关注你
          if(v.userType == "1"){ //企业
            companyInfoCancelCareCompany(v.userId,data.data.id,v.userType,this.userInfo.data.access_token).then(res=>{
              if(res.data.status==true){
                Toast("关注已取消");
               this.objList.splice(i,1)
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }else{  //个人
            commonUserCancelCareUser(v.userId,data.data.id,v.userType,this.userInfo.data.access_token).then(res=>{
              if(res.data.status==true){
                Toast("关注已取消");
                this.objList.splice(i,1)
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }
        }
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
