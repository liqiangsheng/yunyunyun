<template>
  <div id="Me">
     <div class="Me_box">
        <div class="userinfo">
          <div class="userinfo_top" @click="loginBnt">
            <div class="userinfo_top_top">
              <div @click.stop="setClick">
                <img src="/static/images/shezhi.png" alt="">
              </div>
              <!--<b>我</b>-->
              <!--<p>Profile</p>-->
            </div>
            <div class="userinfo_top_bottom">
              <!--<img :src='bgImge' alt="">-->
               <div  class="userinfo_top_bottom_img">
                 <img :src="userInfo.header" alt="">
               </div>
              <div  class="userinfo_top_bottom_fans" @click.stop='myfollowBnt(2)'>
                   粉丝 <b>
                    {{userInfo.cared_count>10000?userInfo.cared_count/10000+'万':userInfo.cared_count}}
                  </b>
              </div>
            </div>
          </div>
           <ul class="userinfo_bottom">
                 <li @click='myfollowBnt(1)'>
                 <b>
                     {{userInfo.care_count>10000?userInfo.care_count/10000+'万':userInfo.care_count}}
                 </b>

                   <br>
                   关注
                 </li>
                 <li @click='myfollowBnt(3)'>
                 <b>
                        {{userInfo.laud_count>10000?userInfo.laud_count/10000+'万':userInfo.laud_count}}
                 </b>
                   <br>
                   点赞
                 </li>
                 <li @click='myfollowBnt(4)'>
                 <b>
                        {{userInfo.favorite_count>10000?userInfo.favorite_count/10000+'万':userInfo.favorite_count}}
                 </b>
                   <br>
                   收藏
                 </li>
                 <li @click='myfollowBnt(5)'>
                 <b>
                   {{userInfo.comment_count>10000?userInfo.comment_count/10000+'万':userInfo.comment_count}}
                 </b>
                   <br>
                   评论
                 </li>
           </ul>
        </div>
       <!--未登陆-->
       <div v-if="tabListBool==false" class="Me_tab_no">
         <img src="/static/images/weidenglu.png" alt="">
         <p>你还没有登录，请点此“<span @click="$router.push({path:'/login'})">登陆</span>”</p>
       </div>
       <!--缺省图-->
       <div v-else-if="imgsArr.length<=0&&imgsArr1.length<=0&&tabListBool==true" class="Me_tab_no">
         <img src="/static/images/yuanchuan.png" alt="">
         <p>我还没留下痕迹呢～</p>
         <div class="Me_tab_li1" style="width: 100%;height: 0.01rem"></div>
         <div class="Me_tab_li1draft" style="width: 100%;height: 0.01rem"></div>
       </div>
        <!--原创，草稿-->
        <ul class="Me_tab"  v-else-if="imgsArr.length>0&&imgsArr1.length>0&&tabListBool==true" >
            <li>
              <div class="Me_tab_li1" @scroll="original">
                    <div class="Me_tab_li1_img" :style="styleWidth">
                      <div class="Me_tab_li1_img_box" v-for="(item,index) in imgsArr" v-if="imgsArr.length>1" @click.stop="clickFn(item,index)" >
                        <img :src="item.imageUrl1" alt="">
                      </div>
                      <div class="Me_tab_li1_img_box" v-for="(item,index) in imgsArr" v-if="imgsArr.length==1" @click.stop="clickFn(item,index)" >
                        <img :src="item.imageUrl1" alt="">
                      </div>
                      <div class="Me_tab_li1_img_box1" v-if="imgsArr.length==1">
                        <p >暂无更多原创</p>
                      </div>
                      <div class="Me_tab_li1_img_box1" v-for="(item,index) in 2"   v-if="imgsArr.length<=0">
                        <p :class="{active:index==1}">暂无更多原创</p>
                      </div>
                      <div class="Me_tab_li3">
                        <img src="/static/images/bg0.png" alt="">
                      </div>
                    </div>

              </div>
              <div class="Me_tab_li2">
                <span>原</span>
                <span>／</span>
                <span>创</span>
              </div>

            </li>
          <!--草稿-->
            <li>
             <div class="Me_tab_li1 Me_tab_li1draft" @scroll="draft">
               <div class="Me_tab_li1_img" :style="styleWidth1">
                   <div class="Me_tab_li1_img_box" v-for="(item,index) in imgsArr1" v-if="imgsArr1.length>1">
                     <img :src="item.cover.url" alt="">
                   </div>
                 <div class="Me_tab_li1_img_box" v-for="(item,index) in imgsArr1" v-if="imgsArr1.length==1">
                   <img :src="item.cover.url" alt="">
                 </div>
                 <div class="Me_tab_li1_img_box1" v-if="imgsArr1.length==1">
                   <p class="active">暂无更多草稿</p>
                 </div>
                   <div class="Me_tab_li1_img_box1" v-for="(item,index) in 2"   v-if="imgsArr1.length<=0">
                     <p :class="{active:index==0}">暂无更多草稿</p>
                   </div>
                 <div class="Me_tab_li3"></div>
               </div>
             </div>
              <div class="Me_tab_li2">
                <span>草</span>
                <span>／</span>
                <span>稿</span>
              </div>

            </li>
        </ul>
     </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarArr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
      </li>
    </ul>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
   import { IntallData,companyInfofindCompanyInfoById,customerPubContentListOwner } from '../../assets/js/promiseHttp';
export default {

  name: 'me',
  data(){
      return{
        tabList:[{name:"关注",num:"2000"},{name:"粉丝",num:"1.5万"},{name:"点赞",num:"5000"},{name:"收藏",num:"100"},{name:"评论",num:"265"},],
        tabListBool:false, //显示
        bgImge:"./static/images/bg.png",
        userInfo: {
        header:"./static/images/defultphoto.png",
        name: "请登录",
          care_count:0,
          cared_count:0,
          comment_count:0,
          favorite_count:0,
          laud_count:0,
        },
        pages:0, //原创分页
        p:1,//原创分页
        s:20,//原创分页
        styleWidth:{width:"512px"},//原创分页
        styleWidth1:{width:"512px"},//草稿分页
        imgsArr:[],//原创数据
        p1:1,  //草稿页
        s1:20, //草稿每页多少
        pages1:0, //草稿总共多少页
        imgsArr1:[],//草稿原创数据
        tabbarArr:[  //、、tab
          {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
          {icon:"./static/images/zixun2.png",icon1:"./static/images/zixun1.png",path:"/homeIndex"},
          {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
          {icon:"./static/images/zhihuihuodong2.png",icon1:"./static/images/zhihuihuodong1.png",path:"/index"},
          {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
        ],
        tabbarAarrIndex:4,  //点击tab的下标
      }
  },
  created(){
    this.$nextTick(function () {
      document.title = "我的";
    })
       if(JSON.parse(window.localStorage.getItem("userInfo"))){    //获取本地存储信息
         this.tabListBool = true;
        let data = JSON.parse(window.localStorage.getItem("userInfo"))
//         console.log(data.data.userType)
         if(data.data.userType=='2'){
           IntallData(data).then(res=>{
             if(res.data.status ==true){
               this.bgImge=res.data.data.owner_url;
               this.userInfo.header= res.data.data.owner_url?res.data.data.owner_url:"./static/images/defultphoto.png";
               this.userInfo.name= res.data.data.name;
               this.$nextTick(function () {
                 this.userInfo.care_count = res.data.data.care_count?res.data.data.care_count:0 ;
                 this.userInfo.cared_count = res.data.data.cared_count?res.data.data.cared_count:0 ;
                 this.userInfo.comment_count = res.data.data.comment_count?res.data.data.comment_count:0 ;
                 this.userInfo.favorite_count = res.data.data.favorite_count?res.data.data.favorite_count:0 ;
                 this.userInfo.laud_count = res.data.data.laud_count?res.data.data.laud_count:0 ;
               })

             }else{
               Toast("网络异常，请重试")
             }
           })
         }else{
           companyInfofindCompanyInfoById(data).then(res=>{
             if(res.data.status ==true){
               this.bgImge=res.data.data.owner_url;
               this.userInfo.header= res.data.data.owner_url?res.data.data.owner_url:"./static/images/defultphoto.png";
               this.userInfo.name= res.data.data.name;
               this.$nextTick(function () {
                 this.userInfo.care_count = res.data.data.care_count ?res.data.data.care_count:0 ;
                 this.userInfo.cared_count = res.data.data.cared_count?res.data.data.cared_count:0 ;
                 this.userInfo.comment_count = res.data.data.comment_count?res.data.data.comment_count:0 ;
                 this.userInfo.favorite_count = res.data.data.favorite_count?res.data.data.favorite_count:0 ;
                 this.userInfo.laud_count = res.data.data.laud_count?res.data.data.laud_count:0 ;
               })
             }else{
               Toast("网络异常，请重试")
             }
           })
         }
         customerPubContentListOwner(data.data.id,true,this.p,this.s,data.data.access_token).then(res=>{ //原创
           if(res.status == true){
//             console.log(res.data,"500原创网络出错了")
             res.data.forEach((item,index)=>{
               item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
             })
             this.pages = Math.ceil(res.total/this.s);
             this.imgsArr = res.data;
             this.$nextTick(function(){
               if( this.imgsArr.length>1){
                 this.styleWidth ={width: this.imgsArr.length*220+72+"px"}
               }else{
                 this.styleWidth ={width: 440+72+"px"}
                 document.querySelector(".Me_tab_li1").scrollLeft=document.querySelector(".Me_tab_li1").scrollWidth-document.querySelector(".Me_tab_li1").offsetWidth-1;
               }
             })

           }else{
             Toast("500原创网络出错了，请重试")
           }
         })
         customerPubContentListOwner(data.data.id,false,this.p1,this.s1,data.data.access_token).then(res=>{  //false 为草稿
//              console.log(res,"草稿")
           if(res.status == true){
             this.pages1 = Math.ceil(res.total/this.s1);
             this.imgsArr1 = res.data;
             this.$nextTick(function(){
               if( this.imgsArr1.length>1){
                 this.styleWidth1 ={width: this.imgsArr1.length*220+72+"px"}
               }else{
                 this.styleWidth1 ={width: 440+72+"px"}
                 document.querySelector(".Me_tab_li1draft").scrollLeft=document.querySelector(".Me_tab_li1draft").scrollWidth-document.querySelector(".Me_tab_li1draft").offsetWidth-1;
               }

             })
           }else{
             Indicator.close();
             Toast("500草稿网络出错了，请重试")
           }
         })
       }else{
         this.tabListBool = false;
         this.bgImge="./static/images/bg.png";
         this.userInfo.header= "./static/images/defultphoto.png";
         this.userInfo.name= "请登录";
         this.imgsArr1 = [];
         this.imgsArr = [];
//             this.$router.push({path:"/login"})

       }
  },
  mounted(){

},
  methods:{
    clickFn(value,index){ //去作品详情
      this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
    },
    original(e){//原创的滚动
//      console.log(e.target.scrollLeft,"e.target.scrollLeft")
      let data = JSON.parse(window.localStorage.getItem("userInfo"))
      if(e.target.scrollWidth==(e.target.scrollLeft+e.target.offsetWidth)){
        this.p++
        let that = this;
        if(that.pages<that.p){
          that.p = that.pages;
          return;
        }else if(that.pages==that.p){

          customerPubContentListOwner(data.data.id,true,this.p,this.s,data.data.access_token).then(res=>{
            if(res.status == true){
              res.data.forEach((item,index)=>{
                item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
              })
              that.imgsArr = that.imgsArr.concat(res.data);
              this.$nextTick(function(){
                this.styleWidth ={width: this.imgsArr.length*220+72+"px"}
              })
            }else{
              Indicator.close();
              Toast("网络出错了，请重试")
            }
          })
        }else if(that.pages>that.p){
          customerPubContentListOwner(data.data.id,true,this.p,this.s,data.data.access_token).then(res=>{
            if(res.status == true){
              res.data.forEach((item,index)=>{
                item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
              })
              that.imgsArr = that.imgsArr.concat(res.data);
              this.$nextTick(function(){
                this.styleWidth ={width: this.imgsArr.length*220+72+"px"}
              })
            }else{
              Indicator.close();
              Toast("网络出错了，请重试")
            }
          })
        }
      }
    },

    draft(e){//草稿的滚动
      let data = JSON.parse(window.localStorage.getItem("userInfo"))
      if(e.target.scrollWidth==(e.target.scrollLeft+e.target.offsetWidth)){
        this.p1++
        let that = this;
        if(that.pages1<that.p1){
          that.p1 = that.pages1;
          return;
        }else if(that.pages1==that.p1){

          customerPubContentListOwner(data.data.id,false,this.p1,this.s1,data.data.access_token).then(res=>{
            if(res.status == true){
              that.imgsArr1 = that.imgsArr1.concat(res.data);
              this.$nextTick(function(){
                this.styleWidth1 ={width: this.imgsArr1.length*220+72+"px"}
              })
            }else{
              Indicator.close();
              Toast("网络出错了，请重试")
            }
          })
        }else if(that.pages1>that.p1){
          customerPubContentListOwner(data.data.id,false,this.p1,this.s1,data.data.access_token).then(res=>{
            if(res.status == true){
              that.imgsArr1 = that.imgsArr1.concat(res.data);
              this.$nextTick(function(){
                  this.styleWidth1 ={width: this.imgsArr1.length*220+72+"px"}
              })
            }else{
              Indicator.close();
              Toast("网络出错了，请重试")
            }
          })
        }
      }
    },
    setClick(){//个人设置
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
        this.$router.push({path:"/personalSettings"})
      }else{
        Toast("您未登录，请登录！")
      }
    },
    myfollowBnt(v){ //我的关注 粉丝 点赞 收藏 评论
      let data = JSON.parse(localStorage.getItem("userInfo"))
      if(data){
          if(v == 1){
            this.$router.push({path:"/myfollow"})
          }else if(v == 2){
            this.$router.push({path:"/fans"})
          }else if(v == 3){
            this.$router.push({path:"/myFabulous"})
          }else if(v == 4){
            this.$router.push({path:"/myCollection"})
          }else if(v == 5){
            this.$router.push({path:"/myComment"})
          }

      }else{
        Toast("您未登录，请登录！")
      }
    },
    tabarClick(i){  //tabar点击事件
//      this.tabbarAarrIndex = i;
      this.$router.push({path:this.tabbarArr[i].path});

    },
      loginBnt(){ //登录
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if(data){
//          Toast("已登录，请勿重复登录")
          this.$router.push({path:"/editingInformation"})
        }else{
          this.$router.push({path:"/login"})
        }
      },

  }
}

</script>

<style scoped lang="less">
  #Me{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: #ffffff;
    overflow: hidden;
    .Me_box{
      position: absolute;
      left: 0;
      top:0;
      bottom: 0.55rem;
      right: 0;
      overflow: hidden;
    .userinfo{
      width: 100%;
      height: 2.81rem;
      .userinfo_top{
        width: 100%;
        height: 1.31rem;
        background: url(../../assets/images/meBg.png);
        background-size: 100% 100%;
        .userinfo_top_top{
          width: 100%;
          height: 0.52rem;
          position: relative;
          >div{
            width: 0.21rem;
            height: 0.21rem;
            position: absolute;
            left: 0.41rem;
            top:0.18rem;
            img{
              display: block;
              width: 0.21rem;
              height: 0.21rem;
            }
          }
          b{
            width: 100%;
            display: block;
            text-align: center;
            line-height: 0.26rem;
            font-size: 0.14rem;
            color: #ffffff;
          }
          p{
            width: 100%;
            display: block;
            text-align: center;
            line-height: 0.26rem;
            font-size: 0.1rem;
            color: #ffffff;
          }
        }
        .userinfo_top_bottom{
          width: 100%;
          height: 0.79rem;
          position: relative;
          >img{
            display: inline-block;
            width: 100%;
            height: 0.79rem;
          }
          .userinfo_top_bottom_img{
            position: absolute;
            left: 0.4rem;
            bottom: -0.4rem;
            width: 0.66rem;
            height: 0.66rem;
            margin: 0;
            padding: 0;
            border-radius: 50%;
            border: 0.02rem solid #ffffff;
            overflow: hidden;
            img{
              display: block;
              width: 0.7rem;
              height: 0.7rem;
            }
          }
          .userinfo_top_bottom_fans{
            padding: 0 0.15rem;
            height:0.36rem;
            position: absolute;
            right: 0.29rem;
            bottom: -0.18rem;
            background: #ff7f61;
            text-align: center;
            line-height: 0.36rem;
            font-size: 0.12rem;
            color: #ffffff;
            border-radius: 0.25rem;
            b{
              font-size: 0.17rem;
            }
          }
        }
      }
      .userinfo_bottom{
        width: 100%;
        height: 1.5rem;
        background: #ffffff;
        padding: 0.68rem 0 0 0.41rem;
        box-sizing: border-box;
        display: flex;
        li{
          flex: 1;
          text-align: left;
          font-size:0.12rem;
          color: #c5c5c6;
          b{
            font-size: 0.18rem;
            color: #262626;
          }
        }
      }
    }
      .Me_tab_no{
        background:rgba(245,245,245,1);
        overflow-y: scroll;
        position: absolute;
        left: 0;
        bottom: 0;
        top:2.81rem;
        right: 0;
        padding-top: 0.76rem;
        box-sizing: border-box;
        img{
          display: block;
          width: 1rem;
          height: 0.94rem;
          margin: 0 auto;
        }
        p{
          font-size:0.14rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(103,103,104,1);
          line-height:0.3rem;
          margin-top: 0.23rem;
          width: 100%;
          text-align: center;
          span{
            font-size:0.14rem;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(38,38,40,1);
            text-decoration:underline;
          }
        }
      }
      .Me_tab{
        background: #ffffff;
        overflow-y: scroll;
        position: absolute;
        left: 0;
        bottom: 0;
        top:2.81rem;
        right: 0;
        li{
          width: 100%;
          height: 210px;
          margin-bottom: 30px;
          overflow: hidden;
          position: relative;
          .Me_tab_li1{
            width: 100%;
            overflow-x: scroll;
            height: 210px;
            .Me_tab_li1_img{
              height: 210px;
              .Me_tab_li1_img_box{
                width: 210px;
                height: 210px;
                float: left;
                margin-left: 10px;
                img{
                  display: block;
                  width: 210px;
                  height: 210px;
                }
              }
              .Me_tab_li1_img_box1{
                width: 210px;
                height: 210px;
                float: left;
                margin-left: 10px;
                p{
                  width: 210px;
                  height: 210px;
                  line-height: 210px;
                  text-align: center;
                  font-size: 18px;
                  color:rgba(153,153,153,1);
                  background: #FEFAE2;
                  color: #ECE2A3;
                }
                p.active{
                  background: #FFE8E3 ;
                  color: #FFCCC1;
                }
              }
              .Me_tab_li3{
                width: 62px;
                height: 210px;
                float: left;
                margin-left: 10px;
                img{
                  display: block;
                  width: 10px;
                  height: 210px;
                  float: right;
                }
              }
            }

          }
          .Me_tab_li2{
            width:52px;
            position: absolute;
            right: 10px;
            top: 0;
            height: 210px;
            span{
              font-size: 0.12rem;
              display: block;
              width: 12px;
              color: #262626;
              margin: 0 auto;
              font-weight: 500;
              transform:rotate(90deg);
              -ms-transform:rotate(90deg); 	/* IE 9 */
              -moz-transform:rotate(90deg); 	/* Firefox */
              -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
              -o-transform:rotate(90deg);
            }
          }

        }
      }
  }
  }



.Indextab{
  position: fixed;
  width: 100%;
  height: 0.55rem;
  bottom: 0;
  left: 0;
  background: #ffffff;
  border-top: 0.01rem solid #EEEEEE;
  display: flex;
}
  .indexTabLi{
    flex: 1;
    text-align: center;
    padding-top:0.13rem ;
    box-sizing: border-box;
  }
  .indexTabImg{
    width: 24px;
    height:  24px;
    display:block;
    margin: 0 auto;
  }
  .indexTabImg.active{
    width: 0.3rem;
    transform: translateY(-0.05rem);
    height: 0.3rem;
  }
  .me_ul{
    width: 100%;
    background:rgba(255,255,255,0.3);
    display: flex;
    border-bottom: 0.01rem solid #EEEEEE;
    li{
      flex: 1;
      text-align: center;
      padding: 0.1rem 0;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      font-size:0.12rem;
      span{
        font-size:0.15rem;
        color:rgba(5,5,9,1);
      }
    }

  }

</style>
