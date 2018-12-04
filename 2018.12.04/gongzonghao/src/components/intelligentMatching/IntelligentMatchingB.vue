<template>
  <div id="IntelligentMatchingB">
    <div class="IntelligentMatchingBItem">
          <div class="IntelligentMatchingBItemIndex">

              <ul class="IntelligentMatchingBItemIndex2" v-if="listData.jingdu.length>0">
                <li class="IntelligentMatchingBItemIndex1">已为您精确匹配多家参展商，请问是否对接？</li>
                <li class="IntelligentMatchingBItemIndex2" v-for="(item,index) in listData.jingdu">
                  <img :src="item.logoUrl" alt="" @click="bannerUrlClick(item)">
                  <div>{{item.name}}</div>
                  <button v-if="item.cheack==false" @click="matchingClick(item,index)">请求对接</button>
                  <button style="background:rgba(33,203,97,1);color:rgba(255,255,255,1);" v-if="item.cheack==true" @click="matchingClick(item,index)"><img src="/static/images/gou.png" alt="">已请求</button>
                </li>
              </ul>

            <ul v-if="listData.NoJingdu.length>0" class="IntelligentMatchingBItemIndex3">
              <li class="IntelligentMatchingBItemIndex3Li">以下结果为相似推荐，请问是否对接？</li>
              <li  class="IntelligentMatchingBItemIndex3Li1" v-for="(item,index) in listData.NoJingdu">
                <img :src="item.logoUrl" alt="" @click="bannerUrlClick(item)">
                <div>{{item.name}}</div>
                <button v-if="item.cheack==false" @click="matchingClick(item,index)">请求对接</button>
                <button style="background:rgba(33,203,97,1);color:rgba(255,255,255,1);" v-if="item.cheack==true" @click="matchingClick(item,index)"><img src="/static/images/gou.png" alt="">已请求</button>
              </li>
            </ul>

            <ul v-if="listData.NoJingdu.length<=0&&listData.jingdu.length<=0">
              <li style="width: 100%;font-size: 16px;text-align: center;line-height: 50px;color: #ffffff">暂无匹配数据,请重新匹配！</li>
            </ul>
          </div>
    </div>
    <div class="IntelligentMatchingBFoot" @click="goHome()" v-if="listData.NoJingdu.length<=0&&listData.jingdu.length<=0">
      返回上一步
    </div>
    <div class="IntelligentMatchingBFoot" @click="goBack()" v-else>
      下一步
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import {tagLibMatch} from "../../assets/js/promiseHttp"  //数据请求
export default {

  name: 'IntelligentMatchingB',
  data(){
    return{
        listData:{ //匹配的数据
          jingdu:[], //精确匹配
          NoJingdu:[], //不精确匹配
          userInfo:"", //用户登录数据
        }//数据显示
    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "智能匹配";
    })
     let objData = JSON.parse(sessionStorage.getItem("IntelligentMatchingBData"))?JSON.parse(sessionStorage.getItem("IntelligentMatchingBData")):{};
      let postData = (function(value){  //把参数拼接好
        let oStr;
        for(var key in value){
          oStr += key+"="+value[key]+"&";
        };
        return oStr;
      }(objData))
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.userInfo){
        tagLibMatch(this.userInfo.data.access_token,JSON.stringify(objData)).then(res=>{ //请求数据
          if(res.status == true){
            if(res.data.exact.length>0){
              res.data.exact.forEach((item,index)=>{
                item.cheack = false
              })
            }
            if(res.data.inexact.length>0){
              res.data.inexact.forEach((item,index)=>{
                item.cheack = false
              })
            }
            this.listData.jingdu = res.data.exact;
            this.listData.NoJingdu = res.data.inexact;
          }else{
            Toast("网络出错了，请重试")
          }
        })
      }else {
        Toast("登录出错啦！请重新登录")
      }

  },
  methods:{
    goHome(){
      this.$router.go(-1);
    },
    goBack(){ //去到小程序并且带参数
      let arrdata = [...this.listData.jingdu,...this.listData.NoJingdu];
       let matchingArr = [];
      for (let i = 0;i<arrdata.length;i++){
        if(arrdata[i].cheack == true){
          matchingArr.push(arrdata[i].id);
        }
      }
      if (matchingArr.length<=0){
        Toast("请选择至少一个匹配项")
      }else{
          let matchingArrStr = matchingArr.join(',')
          sessionStorage.setItem("matchingArrStr",JSON.stringify(matchingArrStr))
          this.$router.push({path:"IntelligentMatchingC"});
      }



    },
    matchingClick(v,i){ //点击是否会匹配
       v.cheack = !v.cheack;
       console.log(this.listData,"askdkasdka")
    },
    bannerUrlClick(v) { //点击的头像
      console.log(v)
      this.$router.push({path: "/homePage", query: {state: 1,id:v.id,source:"XCX"}}) //去企业主页 1是企业 2是个人
//      this.$router.push({path: "/homePage?state=1&source=XCX&id="+v.id})
        setTimeout(()=>{
          window.location.reload();
      },100)

    }

  }
}

</script>

<style scoped lang="less">
 #IntelligentMatchingB{
 width: 100%;
 }
 .IntelligentMatchingBItem{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom: 0.49rem;
   overflow-y: auto;
   background: url(../../../static/images/bj2.png);
   background-size: 100% 100%;
   .IntelligentMatchingBItemIndex{
     width: 90%;
     margin: 0.2rem auto;
     border:0.01rem solid rgba(255,255,255,0.2);;
     border-radius:0.1rem;
     position: relative;

   }
   .IntelligentMatchingBItemIndex2{
     width: 90%;
     margin: 0 auto;
     .IntelligentMatchingBItemIndex1{
       width: 100%;
       margin: 0 auto;
       height: 0.45rem;
       line-height: 0.45rem;
       font-size:0.13rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(255,255,255,1);
     }
     .IntelligentMatchingBItemIndex2{
       width: 100%;
       height: 0.65rem;
       border:0.01rem solid rgba(255,255,255,0.2);
       margin-bottom: 0.15rem;
       border-radius:0.1rem;
       overflow: hidden;
       img{
         display: block;
         float: left;
         width: 0.45rem;
         height: 0.45rem;
         border-radius: 50%;
         margin: 0.1rem;
       }
       div{
        float: left;
         height: 100%;
         width: 50%;
         font-size:0.14rem;
         font-family:PingFangSC-Semibold;
         font-weight:600;
         color:rgba(255,255,255,1);
         line-height: 0.65rem;
         overflow:hidden;
         text-overflow:ellipsis;
         white-space:nowrap
       }
       button{
         display: block;
         float: left;
         width: 0.8rem;
         height: 0.32rem;
         border: none;
         outline: none;
         background:rgba(255,255,255,1);
         border-radius:0.05rem;
         font-size:0.13rem;
         font-family:PingFangSC-Medium;
         font-weight:500;
         color:rgba(5,5,9,1);
         line-height: 0.32rem;
         margin-top: .16rem;
         text-align: center;
         img{
           display: inline-block;
           width: 0.13rem;
           height: 0.09rem;
           margin: 0.1rem 0 0 0.1rem;
           padding: 0;
           overflow: hidden;
         }
       }
     }
   }
   .IntelligentMatchingBItemIndex3{
     width: 90%;
     margin: 0 auto;
     .IntelligentMatchingBItemIndex3Li{
       width: 100%;
       height: 0.45rem;
       line-height: 0.45rem;
       font-size:0.13rem;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(153,153,153,1);
     }
     .IntelligentMatchingBItemIndex3Li1{
       width: 100%;
       height: 0.65rem;
       border:0.01rem solid rgba(255,255,255,0.2);
       margin-bottom: 0.15rem;
       border-radius:0.1rem;
       overflow: hidden;
       img{
         display: block;
         float: left;
         width: 0.45rem;
         height: 0.45rem;
         border-radius: 50%;
         margin: 0.1rem;
       }
       div{
         float: left;
         height: 100%;
         width: 50%;
         font-size:0.14rem;
         font-family:PingFangSC-Semibold;
         font-weight:600;
         color:rgba(255,255,255,1);
         line-height: 0.65rem;
         overflow:hidden;
         text-overflow:ellipsis;
         white-space:nowrap
       }
       button{
         display: block;
         float: left;
         width: 0.8rem;
         height: 0.32rem;
         border: none;
         outline: none;
         background:rgba(255,255,255,1);
         border-radius:0.05rem;
         font-size:0.13rem;
         font-family:PingFangSC-Medium;
         font-weight:500;
         color:rgba(5,5,9,1);
         line-height: 0.32rem;
         margin-top: .16rem;
         text-align: center;
         img{
           display: inline-block;
           width: 0.13rem;
           height: 0.09rem;
           margin: 0.1rem 0 0 0.1rem;
           padding: 0;
           overflow: hidden;
         }
       }
     }
   }
 }
.IntelligentMatchingBFoot{
  position: absolute;
  left:0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  background: #72D992;
  font-size:0.12rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #ffffff;
  text-align: center;
  line-height: 0.49rem;
}

</style>
