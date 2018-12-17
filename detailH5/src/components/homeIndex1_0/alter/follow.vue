<template>
  <!--关注-->
  <div id="follow">
    <!--未登录-->
    <div class="follow_login_false" v-if="LoginShow==false">
      <img src="/static/images/未登录.png" alt="">
      <p @click="goLogin">你还没有登录，请点此“<b>登录</b>”获取关注内容</p>
    </div>
    <!--已登录-->
    <div class="follow_login_true" v-if="LoginShow==true">
      <ul class="homeIndex1_ul">
        <li v-for="(item,index) in headerTab" @click="tabClick(index)">
          <span :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">{{item}}</span>
        </li>
        <div class="homeIndex1_xian">/</div>
      </ul>
      <!--您关注的达人还未发布作品，为您推荐更多设计达人～-->
      <div class="follow_login_noFollow" v-if="followIsShow==true">
        <p class="follow_login_noFollow_p">您关注的达人还未发布作品，为您推荐更多设计达人～</p>
        <ul class="follow_login_noFollow_ul">
          <li class="follow_login_noFollow_li" v-for="(item,index) in Recommend">
            <div class="follow_login_noFollow_li1"><img :src="item.url" alt=""></div>
            <div class="follow_login_noFollow_li2">{{item.name}}</div>
            <div class="follow_login_noFollow_li3">
              <div><img :src="item.type==false?'/static/images/未关注.png':'/static/images/已关注.png'" alt="">{{item.value}}</div>
            </div>
          </li>
        </ul>
      </div>
      <!--您关注的达人发布了作品-->
      <div class="follow_login_Follow" v-else>
        <ul class="follow_login_Follow_ul">
          <li class="follow_login_Follow_li" v-for="(item,index) in listData">
            <div class="follow_login_Follow_li1">
              <img :src="item.url" alt="">
              <p>{{item.name}}</p>
              <div v-if="item.type==false"><img src="/static/images/已关注.png" alt="">关注</div>
              <div v-if="item.type==true" class="active">取消关注</div>
            </div>
            <div class="follow_login_Follow_li2">
              <img :src="item.bannerUrl" alt="">
            </div>
            <div class="follow_login_Follow_li3">
              <p>{{item.message1}}</p>
              <div v-show="item.message&&item.message.length>69" @click="openClick(item,index)">{{item.value}}</div>
            </div>
            <div class="follow_login_Follow_li4">
              <div>
                <img src="/static/images/关注阅读量.png" alt="">12616
              </div>
              <div>
                <img src="/static/images/点赞.png" alt="">12616
              </div>
              <div>
                <img src="/static/images/收藏1.png" alt="">12616
              </div>
              <div>
                <img src="/static/images/分享.png" alt="">12616
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'follow',
    data(){
      return{
        headerTab:["发现","关注"], //tab
        headerTabIndex:1,//是关注还是发现
        userInfo:"", //用户信息
        LoginShow:false, //登录没登录
        followIsShow:false, //关注的人未发布作品
        listData:[
          {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png",message:"来自深圳及全国各地的会员单位700余家，建立了市级工业设计公共服务平台，下设四个中心（深港设计中设计庇护形象作为设庇护形象作为设计主思路。计主思路，并将其形象抽象化应用于造型语言中外部造型取中国传统汉服的层叠交错的造型语言，使其更加检...型家用轿车将禅所隐喻的",bannerUrl:"/static/images/home_banner2.png"},
          {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png",message:"来自深圳及全国各地的会员单位700余家，建立了市级工业设计公共服务平台，下设四个中心（深港设计中设计庇护形象作为设庇护形象作为设计主思路。计主思路，并将其形象抽象化应用于造型语言中外部造型取中国传统汉服的层叠交错的造型语言，使其更加检...型家用轿车将禅所隐喻的",bannerUrl:"/static/images/home_banner2.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png",message:"来自深圳及全国各地的会员单位700余家，建立了市级工业设计公共服务平台其形象抽喻的",bannerUrl:"/static/images/home_banner2.png"},
        ],//数据
        Recommend:[
          {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:false,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
          {type:true,name:"fanner Walker",url:"/static/images/defultphoto.png"},
        ],//推荐 的数据
      }
    },
    created() {

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(this.userInfo){ //登录的情况  //
        this.LoginShow = true;
        this.Recommend.map((item,index)=>{
          item.value="";
          if(item.type==false){
            item.value = "未关注"
          }else{
            item.value = "已关注"
          }
        })
        this.listData.forEach((item,index)=>{
          item.messageShow = false;
          item.message1 = "";
          item.value = "展开";
          if(item.message.length>69){
            item.message1=item.message.substring(0,69)+"...";
            item.messageShow = true;
            item.value = "展开";
          }else{
            item.messageShow = false;
            item.message1 = item.message;
          }
          console.log( item.message1)
        })
      }else{//没有登录的情况
        this.LoginShow = false;
      }

    },
    methods:{
      openClick(v,i){
        v.messageShow = !v.messageShow;
        if(v.messageShow==false){
          v.message1 = this.listData[i].message;
          v.value = "收起";
        }else{ //张开
          v.message1=v.message.substring(0,69)+"...";
          v.value = "展开";
        }
        this.listData[i] = v; //赋值给原来的小标值
        this.listData = this.listData.splice(0,this.listData.length); //更新素组

      },
      tabClick(i){//头部切换
        this.headerTabIndex =i;
        if(i==0){
          this.$router.push({path:"/homeIndex1_0"})
        }
      },
      goLogin(){//去登录
        this.$router.push({path:"/login"})
      },
    }
  }

</script>

<style scoped lang="less">
  #follow {
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    overflow: hidden;
    .follow_login_false{
      width: 100%;
      padding-top: 1rem;
      img{
        width:1.15rem;
        height: 1rem;
        display: block;
        margin: 0 auto;
      }
      p{
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.3rem;
        width: 100%;
        text-align: center;
        margin-top: 0.15rem;
        b{
          color: #050509;
        }
      }
    }
    .follow_login_true{
      /*position: relative;*/
      width: 100%;
      .homeIndex1_ul{
        width: 100%;
        display: flex;
        background: #ffffff;
        position: relative;
        li{
          flex: 1;
          height: 0.39rem;
          line-height: 0.39rem;
          font-size:0.12rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(102,102,102,1);
          span.active{
            font-size:0.15rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
          }
          .homeIndex1_span0{
            display: block;
            float: right;
            margin-right: 0.3rem;
          }
          .homeIndex1_span1{
            display: block;
            float: left;
            margin-left: 0.3rem;
          }
        }
        .homeIndex1_xian{
          position: absolute;
          left: 49.9%;
          top: 0.07rem;
          font-size:0.11rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }
      .follow_login_Follow{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0.4rem;
        overflow-y: auto;
        .follow_login_Follow_ul{
          width: 100%;
          .follow_login_Follow_li{
            width: 100%;
            background: #ffffff;
            margin-bottom: 0.15rem;
            .follow_login_Follow_li1{
              width: 100%;
              height: 0.62rem;
              padding: 0.15rem;
              box-sizing: border-box;
              display: flex;
              img{
                display: block;
                width: 0.32rem;
                height: 0.32rem;
                border-radius: 50%;
                margin-right: 0.05rem;
              }
              p{
                width: 2.3rem;
                height: 0.32rem;
                font-size:0.13rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(5,5,9,1);
                margin-left: 0.05rem;
                line-height: 0.32rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              >div{
                width: 0.8rem;
                height: 0.32rem;
                background:rgba(5,5,9,1);
                border-radius:0.05rem;
                line-height: 0.32rem;
                text-align: center;
                float: right;
                font-size:0.1rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                img{
                  display: inline-block;
                  width: 0.1rem;
                  height: 0.11rem;
                  margin-right: 0.05rem;
                }
              }
              >div.active{
                background: #ffffff;
                border:0.01rem solid #EEEEEE;
                color: #666666;
              }
            }
            .follow_login_Follow_li2{
              width: 100%;
              margin-bottom: 0.1rem;
              img{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .follow_login_Follow_li3{
              width: 100%;
              padding: 0 0.15rem;
              box-sizing: border-box;
              position: relative;
              >p{
                font-size:0.12rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                line-height: 0.28rem;
                color:rgba(5,5,9,1);
              }
              >div{
                position: absolute;
                right: 0.15rem;
                bottom: 0.03rem;
                width: 0.5rem;
                height: 0.24rem;
                text-align: center;
                line-height: 0.24rem;
                font-size:0.12rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(5,5,9,1);
              }
            }
            .follow_login_Follow_li4{
              width: 100%;
              display: flex;
              padding: 0.15rem;
              box-sizing: border-box;
              >div{
                flex: 1;
                font-size:0.14rem;
                font-family:PingFangSC-Semibold;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height: 0.18rem;
                img{
                  display: inline-block;
                  width: 0.16rem;
                  height: 0.16rem;
                  margin-right: 0.05rem;transform: translateY(0.02rem);

                }
              }
            }
          }
        }
      }
      .follow_login_noFollow{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0.4rem;
        overflow-y: auto;
        .follow_login_noFollow_p{
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.15rem;
          box-sizing: border-box;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        .follow_login_noFollow_ul{
          width: 100%;
          background: #ffffff;
          padding: 0 0.15rem;
          box-sizing: border-box;
          li{
            width: 100%;
            height: 0.65rem;
            padding: 0.15rem 0;
            display: flex;
            box-sizing: border-box;
            border-bottom: 0.01rem solid #eeeeee;
            .follow_login_noFollow_li1{
              width: 0.36rem;
              height: 0.36rem;
              img{
                display: block;
                width: 0.36rem;
                height: 0.36rem;
                border-radius: 50%;
              }
            }
            .follow_login_noFollow_li2{
              width: 2.3rem;
              height: 0.36rem;
              font-size:0.13rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
              margin-left: 0.05rem;
              line-height: 0.36rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .follow_login_noFollow_li3{
            flex: 1;
            height: 0.36rem;
            >div{
              width: 0.8rem;
              height: 0.36rem;
              background:rgba(5,5,9,1);
              border-radius:0.05rem;
              line-height: 0.36rem;
              text-align: center;
              float: right;
              font-size:0.1rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
              img{
                display: inline-block;
                width: 0.1rem;
                height: 0.11rem;
                margin-right: 0.05rem;
              }
            }
          }
        }
      }
    }

  }
</style>
