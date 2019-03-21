<template>
   <div class="homeBox" v-show="boxShow==true" style="padding-bottom: 0.4rem">
        <div class="homeBoxHeader" v-if="!!acivityArr.multiActivity&&!!isShow">
            <div class="boxCententHeader">
              <h5><span></span> {{acivityArr.title}} <span class="span"></span></h5>
              <p>{{acivityArr.summary}}</p>
            </div>
          <!---->
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in acivityArr.children" >
                <div class="imgIs">
                  <img :src="item.bannerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" />
                </div>

                <h5>{{item.title}}</h5>
                <div class="overHideP">
                  <p>{{item.summary}}</p>
                </div>
              </div>
            </div>
          </div>
          <!---->
          <div class="boxCententFoot">
            <span>{{swiperIndex+1}}</span>/<span>{{length}}</span>
          </div>

        </div>
         <!---->
          <div class="homeBoxItem">
             <div class="homeBoxItemImg" v-if="!!objData.bannerUrl">
               <img :src="objData.bannerUrl" />
             </div>
             <div class="homeBoxItemOne">{{objData.title}}</div>
            <div class="homeBoxItemTwo">
              <img src="/static/images/time.png" alt="">
              {{objData.startTime}}
            </div>
            <div class="homeBoxItemThree">
              <img src="/static/images/position.png" alt="">
              {{objData.address}}
              <div class="a" @click="getAddressHregs">地图<img src="/static/images/right.png"></div>
            </div>
            <div class="homeBoxItemFour">
              <img src="/static/images/price.png" alt="">
              <span style="color: #FE5F5F" v-if="objData.expenses>0">¥ {{objData.expenses.toFixed(2)}}</span>
              <span style="color:#21CB61" v-else="">免费</span>

            </div>
            <div class="homeBoxItemFive">
                 <div v-if="!!objData.hosts"><span>主办单位：</span> <span class="homeBoxItemFiveLeft" v-for="(item,index) in objData.hosts">{{item}}</span></div>
                 <div v-if="!!objData.organizers"><span>承办单位：</span><span class="homeBoxItemFiveLeft" v-for="(item,index) in objData.organizers">{{item}}</span></div>
                 <div v-if="!!objData.coOrganizers"><span>协办单位：</span><span class="homeBoxItemFiveLeft" v-for="(item,index) in objData.coOrganizers">{{item}}</span></div>

            </div>
          </div>
     <!--互文本内容-->
     <div class="homeBoxItemTen" v-if="!!objData.content">
       <div class='activityArrangementItem' style="margin-bottom: 20px;"><span></span>活动介绍<span></span></div>
       <div class="homeBoxItemTenContent" id="htmlV" v-html="objData.content">
       </div>
     </div>

     <!---->
         <div class="homeBoxItem1" v-if="schedules&&schedules.length>0">
           <div class='activityArrangementItem'><span></span>活动安排<span></span></div>
           <div class='activityArrangementItem1'>
             <div v-for='(item,index) in schedules' class='activityArrangementItemBox'>
               <div class='activityArrangementItem1Left'>
                 <div>{{item.startTime}}</div>
                 <div class='activityArrangementItem1Leftcenter'>|</div>
                 <div>{{item.endTime}}</div>
                 <img src='/static/images/timePosition.png'/>
               </div>
               <div class='activityArrangementItem1Right' v-if="item.honoredGuestList&&item.honoredGuestList.length>0">
                 <div class='activityArrangementItem1RightA'>
                   <div class='value' v-if="item.subject">{{item.subject}}</div>
                   <div v-for='(item1,index1) in item.honoredGuestList' v-if="item.honoredGuestList.length>0">
                     <div class='name'>{{item1.name}}</div>
                     <div class='founder'>{{item1.honor}}</div>
                   </div>
                   <div v-if='item.brief&&item.brief!="null"' class='brief'>{{item.brief}}</div>
                   <div class='position' v-if="item.location"><img src='/static/images/position.png'/>{{item.location}}</div>
                 </div>
                 <div class='activityArrangementItem1RightB' v-if="item.children.length>0" v-for="(items,indexs) in item.children">
                   <div class='value'>{{items.startTime}}-{{items.startTime}}</div>
                   <div class='value'>{{items.subject}}</div>
                   <div v-for='(item1,index1) in items.honoredGuestList' v-if="items.honoredGuestList.length>0">
                     <div class='name'>{{item1.name}}</div>
                     <div class='founder'>{{item1.honor}}</div>
                   </div>
                   <div class='position' v-if="items.location"><img src='/static/images/position.png'/>{{items.location}}</div>
                 </div>
               </div>
             </div>
              <div class="loadMore" @click="moreClickA">
                   {{moreMessage}}
              </div>
           </div>
           <!---->
           <div class='mattersNeedingAttention'>
             <span>注意事项：</span> 本论坛配备同声翻译，请记得携带您本人身份证到达
             会场，现场入口处将提供免费同传耳机租借服务。
           </div>
           <!-- ------嘉宾介绍------ -->
           <div class='guestIntroductionItem'>
             <div class='activityArrangementItem'><span></span>嘉宾介绍<span></span></div>
             <div class='guestIntroductionItem1'>
               <div v-for='(item,index) in guests' class='guestIntroductionItem1Box'>
                 <div class='header'>
                   <div class='headerLeft'><img :src='item.headerUrl'/> </div>
                   <div class='headerRight'>
                     <div class='headerRightTop'><span>{{item.name}}</span><span v-show="!!item.alias">/{{item.alias}}</span></div>
                     <div class='headerRightBot'>{{item.honor}}</div>

                   </div>
                 </div>
                 <div class='more' @click='moreClick(item,index)' v-if='item.centerIsshow==true'> 更多详情 </div>
                 <div class='takeUp' @click='takeUpClick(item,index)'  v-if='item.centerIsshow==false'>收起</div>
                 <div class='centent'>
                   <div class='cententQiut' :class="{cententActive:item.centerIsshow==true}">
                     {{item.introduce}}

                   </div>

                 </div>

               </div>
               <div class="loadMore" @click="moreClickAB">
                 {{moreMessage1}}
               </div>
             </div>

           </div>
           <!------------------>
           <!-- ----其他---- -->
           <div  class='Other' v-if="!!objData.customContent">
             <div class='activityArrangementItem'><span></span>其他<span></span></div>
             <!--互文本内容-->
              <div v-html="objData.customContent" class="homeBoxItemTenContent">
              </div>
           </div>
           <!-- ---------- -->
           <div class='mattersNeedingAttention mattersNeedingAttentionFoot' v-if="!!objData.matters">
           <span>注意事项：</span> {{objData.matters}}
         </div>

     </div>
 <!---->
     <div class="nextBox" @click="ingClick" v-if="state=='XCX'">立即报名</div>
     <img src="/static/images/scrollTop.png" alt="回到顶部" id="scrollTop" @click="goScrillTop" v-if="topScroll">
   </div>


</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import wxShare from "../../assets/js/wxShare"
  import {Base64,formatTime3,formatTime4,quiryData} from "../../assets/js/common"  //base转换
  let base = new Base64;
  import {InitializationData,activitySchedulelist,honoredGuestlist,shareInfoShareUrl} from "../../assets/js/promiseHttp"  //导航栏url截取

export default {

  name: 'Home',
  data(){
    return{
      state:"XCX",
      moreID:"",
      isShow:false, //获取数据在显示dom
      center: [114.06003, 22.53086],
      markers: [
        {
          position: [114.06003, 22.53086],
          visible: true,
        }
      ],
      mapShow:false, //活动介绍
      boxShow:false, //没数据前空白
      swiperIndex:0, //滑动选中的图片
      topScroll:false,  //回到顶部的按钮出现
      acivityArr:{}, //数据的涨势
      UserLocation:"广东深圳会展中心",//会展的地址
      id:"",
      length:0, //滑动的长度
      objData:{}, // 子活动的数据
      guests:[], //宾客
      schedules:[], //时间表
      p:1, //活动安排每页
      s:5, //活动安排每页数据
      num:0,//活动安排
      moreMessage:"不同正在努力加载中...", //活动安排
      p1:1, //嘉宾列表每页
      s1:5, //嘉宾列表每页数据
      num1:0,//嘉宾列表
      moreMessage1:"不同正在努力加载中...", //嘉宾列表
    }
  },
  watch:{

  },
  components:{
  },
  created(){
    this.state = this.$router.history.current.query.state?this.$router.history.current.query.state:"XCX"; //

    this.quiry();
  },
  methods:{
    ingClick(){ //立即报名
         let data= JSON.parse(localStorage.getItem("userInfo")); //判断登录没有
         if(data){
           let date = new Date();
           let nowTime = date.getTime();
           if (nowTime > this.acivityArr.endTime||nowTime > this.objData.endTime) { //判断活动结束或者正在进行中  上线放开
             Toast("该活动已结束");
             return;
           }
           if (nowTime > this.acivityArr.signEndTime||nowTime > this.objData.signEndTime) {
             Toast("活动报名已结束");
             return;
           }
           if (nowTime < this.acivityArr.signStartTime||nowTime < this.objData.signStartTime) {
             Toast("活动尚未开始报名，请选择其他活动！");
             return;
           }
           let obj = this.objData?this.objData:this.acivityArr;
           sessionStorage.setItem("activityInfo", JSON.stringify(obj)) //保存活动信息
           this.$store.dispatch("multiActivityId",obj.id) //保存选中的Id 在vueX
           this.$router.push({path:"/multiActivity",})  //去选票
         }else{
           let obj = this.objData?this.objData:this.acivityArr;
           sessionStorage.setItem("activityInfo", JSON.stringify(obj)) //保存活动信息
           this.$store.dispatch("multiActivityId",obj.id) //保存选中的Id 在vueX
           Toast("你未登录，正在跳转登录页面...");
           setTimeout(()=>{
             this.$router.push({path:"/login1"})
           },1000)

         }
    },
    quiry(){ //初始化数据
//      this.id = JSON.parse(window.sessionStorage.getItem("detailId")).id; //
      this.id = this.$router.history.current.query.id?this.$router.history.current.query.id:"8"; //

      Indicator.open('加载中...')
       InitializationData(this.id).then(res=>{  //数据加载
         if(res.data.status==true){

           if(res.data.data.multiActivity == true){

             this.acivityArr = res.data.data;
             this.$nextTick(()=>{
               let that = this;
               //     滑动
               var mySwiper = new Swiper ('.swiper-container', {
                 effect : 'coverflow',
                 slidesPerView: 1.56,
                 centeredSlides: true,
                 coverflowEffect: {
                   rotate: 0,
                   stretch: -15,
                   depth:100,
                   modifier: 8,
                   slideShadows : false
                 },
                 on: {
                   transitionEnd: function () {
                     that.swiperIndex = this.activeIndex;
                     //数据请求
                     that.initialData()
                   },
                 }

               })
             })
             this.acivityArr.children.forEach((item,index)=>{
               this.acivityArr.children[index].hosts = this.acivityArr.children[index].hosts.split(",");
               this.acivityArr.children[index].organizers = this.acivityArr.children[index].organizers.split(",");
               this.acivityArr.children[index].coOrganizers = this.acivityArr.children[index].coOrganizers.split(",");
               this.acivityArr.children[index].startTime = formatTime3(this.acivityArr.children[index].startTime );
             })
             this.isShow = true;
             this.length = this.acivityArr.children.length?this.acivityArr.children.length:0;
             this.initialData();

           }else{
             let that =this;
             res.data.data.hosts =  res.data.data.hosts.split(",");
             res.data.data.organizers =  res.data.data.organizers.split(",");
             res.data.data.coOrganizers =  res.data.data.coOrganizers.split(",");
             res.data.data.startTime = formatTime3(res.data.data.startTime );

             that.objData = res.data.data;
             that.center = [that.objData.longitude,that.objData.latitude];
             that.markers= [ {position: [that.objData.longitude, 22.53086],visible: true, }],
               that.UserLocation =that.objData.address;
             this.moreID = that.objData.id;
             that.arrange(that.objData.id)
           }
           this.boxShow = true;
           Indicator.close();
         }else{
           this.boxShow = false;
           if(res.data.message){
             Toast(res.data.message);
           }else{
             Toast("数据请求失败了");
           }

         }

      }) //数据请求




    },
    initialData(){ // 方法封装 初始化数据 滑动数据
      let that =this;
      that.objData = that.acivityArr.children[that.swiperIndex];
      that.center = [that.objData.longitude,that.objData.latitude];
      that.markers= [ {position: [that.objData.longitude, that.objData.latitude],visible: true, }],
        that.UserLocation =that.objData.address;
      this.moreID = that.objData.id;
      that.arrange(that.objData.id)
    },
    moreClickA(){//加载更多
       this.p++;
       if(this.p>this.num){
         this.moreMessage="这是我的底线...";
         Toast("没有更多安排了");
         return;
       }else if(this.p==this.num){
         this.moreMessage="这是我的底线...";
         let prams={};
         prams.p = this.p;
         prams.s= this.s;
         prams.activityId =this.moreID;
         prams.orderField = "start_time";
         prams.orderString ="asc" ;
         activitySchedulelist(prams).then(res=>{
           if(res.data.status == true){
             for (var i = 0; i < res.data.data.length;i++){
               res.data.data[i].startTime =formatTime4(res.data.data[i].startTime)
               res.data.data[i].endTime =formatTime4(res.data.data[i].endTime)
               if (res.data.data[i].children.length > 0) {
                 for (var j = 0; j < res.data.data[i].children.length; j++) {
                   res.data.data[i].children[j].startTime = formatTime4(res.data.data[i].children[j].startTime)
                   res.data.data[i].children[j].endTime = formatTime4(res.data.data[i].children[j].endTime)
                 }
               }
             }
             this.schedules =   this.schedules.concat(res.data.data);
           }else{
             Toast("网络异常，请重试");
           }
         })

       }else{
         this.moreMessage="点击加载更多...";
         let prams={};
         prams.p = this.p;
         prams.s= this.s;
         prams.activityId = this.moreID;
         prams.orderField = "start_time";
         prams.orderString ="asc" ;
         activitySchedulelist(prams).then(res=>{
           if(res.data.status == true){
             for (var i = 0; i < res.data.data.length;i++){
               res.data.data[i].startTime =formatTime4(res.data.data[i].startTime)
               res.data.data[i].endTime =formatTime4(res.data.data[i].endTime)
               if (res.data.data[i].children.length > 0) {
                 for (var j = 0; j < res.data.data[i].children.length; j++) {
                   res.data.data[i].children[j].startTime = formatTime4(res.data.data[i].children[j].startTime)
                   res.data.data[i].children[j].endTime = formatTime4(res.data.data[i].children[j].endTime)
                 }
               }
             }
             this.schedules =  this.schedules.concat(res.data.data);
           }else{
             Toast("网络异常，请重试");
           }
         })
       }
    },
    moreClickAB(){ //嘉宾列表加载更多
      this.p1++;
      if(this.p1>this.num1){
        this.moreMessage1="这是我的底线...";
        Toast("没有更多安排了");
        return;
      }else if(this.p1==this.num1){
        this.moreMessage1="这是我的底线...";
        let prams={};
        prams.p = this.p1;
        prams.s= this.s1;
        prams.activityId =this.moreID;
        prams.orderField = "start_time";
        prams.orderString ="asc" ;
        honoredGuestlist(prams).then(res=>{
          if(res.data.status == true){
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].centerIsshow =  true;
            }
            this.guests = this.guests.concat(res.data.data);
          }else{
            Toast("网络异常，请重试");
          }
        })

      }else{
        this.moreMessage1="点击加载更多...";
        let prams={};
        prams.p = this.p1;
        prams.s= this.s1;
        prams.activityId = this.moreID;
        prams.orderField = "start_time";
        prams.orderString ="asc" ;
        honoredGuestlist(prams).then(res=>{
          if(res.data.status == true){
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].centerIsshow =  true;
            }
            this.guests =   this.guests.concat(res.data.data);
          }else{
            Toast("网络异常，请重试");
          }
        })
      }
    },
    arrange(i){// 活动安排的时间

        let prams={};
         prams.p = this.p;
         prams.s= this.s;
         prams.activityId = i;
         prams.orderField = "start_time";
         prams.orderString ="asc" ;
      activitySchedulelist(prams).then(res=>{
        if(res.data.status == true){
          for (var i = 0; i < res.data.data.length;i++){
                res.data.data[i].startTime =formatTime4(res.data.data[i].startTime)
                res.data.data[i].endTime =formatTime4(res.data.data[i].endTime)
            if (res.data.data[i].children.length > 0) {
              for (var j = 0; j < res.data.data[i].children.length; j++) {
                res.data.data[i].children[j].startTime = formatTime4(res.data.data[i].children[j].startTime)
                res.data.data[i].children[j].endTime = formatTime4(res.data.data[i].children[j].endTime)
              }
            }
          }
          this.num = Math.ceil(res.data.total/this.s);
          if(this.num>1){
            this.moreMessage="点击加载更多...";
          }else {
            this.moreMessage="这是我的底线...";
          }
          this.schedules =  res.data.data;
        }else{
          Toast("网络异常，请重试");
        }
      })
      let prams1={};
      prams1.p = this.p1;
      prams1.s= this.s1;
      prams1.activityId = i;
      prams1.orderField = "start_time";
      prams1.orderString ="asc" ;
      honoredGuestlist(prams1).then(res=>{
        if(res.data.status==true){
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].centerIsshow =  true;
          }
          this.num1 = Math.ceil(res.data.total/this.s1);
          if(this.num1>1){
            this.moreMessage1="点击加载更多...";
          }else {
            this.moreMessage1="这是我的底线...";
          }
          this.guests = res.data.data;
        }
      })

    },
    getAddressHregs(){ // 点地图页面
//      this.mapShow = !this.mapShow;
      this.$store.dispatch("mapData",[this.center,this.markers])
      this.$router.push({path:"/homeMap"})
    },
    moreClick(v,i){//点击更多详情
      v.centerIsshow = !v.centerIsshow
    },
    takeUpClick(v,i){ // 收起
      v.centerIsshow = !v.centerIsshow

    },
    handleScroll(){  //回到顶部按钮出现
      this.sctollTopNum = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(this.sctollTopNum>100){
        this.topScroll = true;
      }else{
        this.topScroll = false;
      }
    },
    goScrillTop(){ //回到顶部
      window.pageYOffset= 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    share(){//分享
      shareInfoShareUrl(encodeURIComponent(location.href.split('#')[0])).then(res=>{
        if(res.status==true){
          let obj = {
            title:this.objData.title,
            desc:this.objData.summary,
            url:"https://dcloud.butongtech.com/index.html#/home?id="+this.$router.history.current.query.id,//id=20190101000004BUTONG00001&isBool=false&bookId=20190101000004BUTONG00001
            imgUrl:this.objData.bannerUrl,
          }
          wxShare.wxShare(res.data,obj)
        }else{
          Toast("网络出错了，请重试")
        }
      })
    },

  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现
    let that = this;
    setTimeout(()=>{
      that.share();
    },200)
  },
}
</script>

<style scoped lang="less">
  #homeBox{
    width: 100%;
    overflow-y:auto ;
    -ms-overflow-y: auto;
    background: #eeeeee;
    position: relative;
    box-sizing: border-box;
  }
  .homeBoxHeader{
    width: 100%;
    height: 5.74rem;
    background: url('https://pub.qinius.butongtech.com/bg1.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
  }
  .boxCententHeader{
    width: 100%;
    padding: 0.25rem  0.31rem 0 0.31rem;
    box-sizing: border-box;
  }
  .boxCententHeader h5{
    height:0.15rem;
    font-size:0.15rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:0.15rem;
    text-align: center;
    position: relative;


  }
  .boxCententHeader h5 span:nth-child(1){
    display: inline-block;
    width: 0.2rem;
    height: 0.01rem;
    background:rgba(255,255,255,1);
    opacity:0.5;
    position: absolute;
    left: 3.5%;
    top:0.07rem;
  }
  .boxCententHeader h5 .span{
    display: inline-block;
    width: 0.2rem;
    height: 0.01rem;
    background:rgba(255,255,255,1);
    opacity:0.5;
    position: absolute;
    right: 3.5%;
    top:0.07rem;
  }
  .boxCententHeader p{
    margin-top: 0.15rem;
    font-size:0.12rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(255,255,255,1);
    line-height:0.2rem;
    height: 0.8rem;
    opacity:0.6;
    text-align: left;
    padding-left: 0.1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;


  }

  /***************************************************/
  .boxCententFoot{
    width: 100%;
    height: 0.25rem;
    position: absolute;
    bottom:0.17rem;
    left: 0;
    font-size: 0.16rem;
    color:rgba(255,255,255,1);
    text-align: center;
  }
  .boxCententFoot span:nth-child(1){
    display: inline-block;
    font-size:0.2rem;
    font-family:PingFangSC-Light;
    font-weight:900;
    transform: translateY(-0.05rem);
    color:rgba(255,255,255,1);
    line-height: 0.15rem;
    margin-right: 0.02rem;
  }
  .boxCententFoot span:nth-last-child(1){
    display: inline-block;
    font-size:0.2rem;
    font-family:PingFangSC-Light;
    font-weight:500;
    transform: translateY(0.05rem);
    color:rgba(255,255,255,1);
    opacity:0.5;
    line-height: 0.15rem;
    margin-left: 0.02rem;
  }
  /*---------------------------------*/
  .homeBoxItem{
    width: 100%;
    /*min-height:6rem ;*/
    margin-top: 0.1rem;
    background: #ffffff;
    padding: 0.15rem;
    box-sizing: border-box;
  }
  .homeBoxItemImg{
    width: 100%;
    background: #FFFFFF;
  }
  .homeBoxItemImg img{
    width: 100%;
    display: inline-block;
  }
  .homeBoxItemOne{
    width: 100%;
    font-size:0.18rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    line-height:0.19rem;
    margin-top:0.15rem;
    padding-bottom: 0.15rem;
    border-bottom:0.01rem solid rgba(223,223,223,1);
  }
  .homeBoxItemThree{
    width: 100%;
    height: 0.5rem;
    border-bottom:0.01rem solid rgba(223,223,223,1);
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    position: relative;
  }
  .homeBoxItemThree img{
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    /*transform: translateY(-0.14rem);*/
    margin-right: 0.11rem;
  }


  .homeBoxItemTwo,.homeBoxItemFour{
    width: 100%;
    height: 0.5rem;
    border-bottom:0.01rem solid rgba(223,223,223,1);
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.5rem;
  }
  .homeBoxItemTwo img,.homeBoxItemFour img{
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    transform: translateY(0.02rem);
    margin-right: 0.11rem;
  }
  .homeBoxItemThree img{
    width: 0.16rem;
    height: 0.2rem;
  }
  .homeBoxItemThree  .a{
    width: 52px;
    padding-left: 10px;
    display: inline-block;
    position: absolute;
    right: 0;
    top:0;
    background: #FFFFFF;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .homeBoxItemThree .a img{
    transform:translateY(0.05rem) ;
  }
  .homeBoxItemFour{
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .homeBoxItemFive{
    width: 100%;
    margin-top: 0.19rem;
  }
  .homeBoxItemFive div{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height: 0.19rem;
    width: 100%;
    position: relative;
  }
  .homeBoxItemFive div span:first-child{
    display: inline-block;
    width: 0.8rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    left: 0%;
    top:0;
  }

  .homeBoxItemFiveLeft{
    display: block;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-left: 0.8rem;
  }

  /******************************/
  .homeBoxItem1{
    width: 100%;
    margin-top: 0.1rem;
    background: #FFFFFF;
    padding: 0.26rem 0;
  }
  .activityArrangementItem{
    width: 96%;
    margin: 0 2%;
    text-align: center;
    font-size:0.17rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#050509;
    line-height:0.21rem;
    position: relative;
  }
  .activityArrangementItem span:nth-child(1){
    display: inline-block;
    height: 0.14rem;
    width: 0.02rem;
    background: #050509;
    position: absolute;
    left: 33%;
    top: 0.03rem;
  }
  .activityArrangementItem span:nth-last-child(1){
    display: inline-block;
    height: 0.14rem;
    width: 0.02rem;
    background: #050509;
    position: absolute;
    right: 33%;
    top: 0.03rem;
  }
  .activityArrangementItem1{
    width: 94%;
    margin: 0 3%;
    background: #FAFAFA;
    margin-top: 0.2rem;
    padding: 0.11rem;
    box-sizing: border-box;

  }
  .activityArrangementItemBox{
    display: flex;
  }
  .activityArrangementItem1Leftcenter{
    width: 100%;
    text-align: center;
    margin: 5px 0;
    color: #999999;
  }
  .activityArrangementItem1RightA{
    width: 100%;
    background: #DFDFDF;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
  }
  .activityArrangementItem1RightB{
    width: 100%;
    background: rgba(5, 5, 9, 0.03);
    border-radius: 4px;
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .activityArrangementItem1Left{
    width: 0.4rem;
    padding: 0.2rem 0.13rem 0 0;
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.17rem;
    border-right: 0.01rem solid #DFDFDF;
    position: relative;
  }
  .activityArrangementItem1Left img{
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    position: absolute;
    right: -0.07rem;
    top: 0.2rem;
  }
  .activityArrangementItem1Right{
    flex: 1;
    padding: 0.2rem 0 0 0.13rem;

  }
  .activityArrangementItem1Right .value{
    font-size:0.15rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    line-height:0.2rem;
    margin-bottom: 0.16rem;
  }
  .activityArrangementItem1Right .name{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.2rem;
  }
  .activityArrangementItem1Right .founder{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.2rem;
    margin-bottom: 0.16rem;
  }
  .activityArrangementItem1Right .position{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.2rem;
  }
  .activityArrangementItem1Right .position img{
    display: inline-block;
    width: 0.11rem;
    height: 0.13rem;
    margin-right: 0.06rem;
  }

  /* ------------------------------ */
  .mattersNeedingAttention{
    width: 94%;
    margin: 0 3%;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.16rem;
    border: 0.01rem solid #DFDFDF;
    border-radius:0.02rem;
    background: #FFFFFF;
    margin-top: 0.11rem;
    padding: 0.1rem;
    box-sizing: border-box;
  }
  .mattersNeedingAttention span{
    font-size:0.12rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    line-height:0.16rem;
  }
  /* ----------------------- */
  .guestIntroductionItem{
    width: 94%;
    margin: 0 3%;
    margin-top: 0.26rem;
  }
  .guestIntroductionItem1{
    width: 100%;
    padding: 0.21rem 0.15rem;
    box-sizing:border-box;
    border: 0.01rem solid#050509;
    border-radius:0.02rem;
    margin-top: 0.15rem;
  }
  .guestIntroductionItem1Box{
    overflow: hidden;
    width: 100%;
    border-bottom: 0.01rem solid #EEEEEE;
    position: relative;
    margin-bottom: 0.1rem;
    padding-bottom: 0.1rem;

  }
  .guestIntroductionItem1Box .header{
    width: 100%;
    display: flex;
    height: 0.6rem;
  }
  .headerLeft{
    width: 0.6rem;
    height: 0.6rem;
  }
  .headerLeft img{
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }
  .headerRight{
    flex: 1;
    height: 0.4rem;
    padding: 0.1rem;
  }
  .headerRightTop{
    width: 100%;
  }
  .headerRightTop span:nth-child(1){
    font-size:0.14rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    line-height:0.2rem;
  }
  .headerRightTop span:nth-child(2){
    font-size:0.14rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:0.2rem;
  }
  .headerRightBot{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.2rem;
  }
  .centent{
    width: 100%;
    margin: 0.17rem 0;

  }

  .cententActive{
    height: 0.6rem;
    position: relative;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    line-height: 0.2rem;
    color:rgba(5,5,9,1);
    outline: none;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

  }

  .centent div:nth-child(2){

    width: 100%;
    height: 0.01rem;
    margin-top: 0.3rem;
    background: #DFDFDF;
  }
  .more{
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.2rem;
    position: absolute;
    right: 0;
    bottom: 0.05rem;
    color:rgba(24,139,246,1);
    text-decoration:underline;
  }

  .cententQiut{
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    position: relative;
  }
  .takeUp{
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(24,139,246,1);
    margin-left: 0.14rem;
    text-decoration:underline;
    line-height:0.2rem;
    position: absolute;
    right: 0;
    bottom: 0.1rem;

  }
  /* -------------------- */
  .Other{
    width: 100%;
    margin-top: 0.2rem;
  }

  /* ---------------------------------- */
  .amap-demo {
    height: 300px;
  }
  .homeBoxItemTen{
    width: 100%;
    background: #FFFFFF;
    padding-bottom:10px ;
  }
  .homeBoxItemTenContent{
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    word-break:break-all;
    white-space:pre-wrap;
  }
  .boxFoot{
    width: 100%;
    height: 0.49rem;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 0.01rem;
    background:#F7F7F7;
    opacity:0.95;
    box-shadow:0px -1px 0px 0px rgba(218,218,218,1);
    text-align: center;
    line-height: 0.49rem;
    background: #050509;
    color: #FFFFFF;
    z-index: 1;
  }

</style>
<style lang="less">
.homeBox{
  .nextBox{
    position: fixed;
    bottom: 0;
    left: 0;
    background:#21CB61;
    width: 100%;
    height: 0.49rem;
    font-size:.13rem;
    text-align: center;
    color:rgba(255,255,255,1);
    line-height: 0.49rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }
 .swiper-container{
    width: 100%;
    min-height: 3.1rem;
  }
  .swiper-slide{
    margin: 0.6rem 0 0 0;
    width: 100%;
    height: 3.2rem;
    background: #fff;
    box-sizing: border-box;
    position: relative;
    h5{
      width: 2.22rem;
      margin: 0 auto;
      font-size:0.15rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:0.22rem;
      transform: translateY(-0.15rem);
    }
    .overHideP{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.25rem;
      background:rgba(247,247,247,1);
      border-radius:0.02rem;
      box-sizing: border-box;
        p{
          width: 2.22rem;
          margin: 0 auto;
          line-height: 0.19rem;
          height: 0.95rem;
          font-size:0.12rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(102,102,102,1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
    }
    .imgIs{
      width: 2.22rem;
      height: 1.4rem;
      margin: 0 auto;
      transform: translateY(-0.4rem);
      border-radius:0.02rem;
      box-shadow:0 0.19rem 0.25rem 0  rgba(0,0,0,0.15);
      background: #fff;
      overflow: hidden;
      img{
        display: block;
        width: 2.22rem;
        height: 1.4rem;

      }
    }

  }
  #scrollTop{
    display: block;
    position: fixed;
    bottom: 0.5rem;
    right: 0.05rem;
    width: 0.34rem;
    height: 0.34rem;
    z-index: 1;
  }
}
.loadMore{
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #999999;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
}
.brief{
  width: 100%;
  line-height: 24px;
  font-size: 12px;
  color: #999999;
}
</style>
