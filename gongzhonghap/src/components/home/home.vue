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
                  <img :src="item.bannerUrl" />
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
              <span style="color: #FE5F5F" v-if="objData.expenses>0">¥ {{objData.expenses}}</span>
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
         <div class="homeBoxItem1">
           <div class='activityArrangementItem'><span></span>活动安排<span></span></div>
           <div class='activityArrangementItem1'>
             <div v-for='(item,index) in schedules' class='activityArrangementItemBox'>
               <div class='activityArrangementItem1Left'>
                 <div>{{item.startTime}}</div>
                 <div class='activityArrangementItem1Leftcenter'>|</div>
                 <div>{{item.endTime}}</div>
                 <img src='/static/images/timePosition.png'/>
               </div>
               <div class='activityArrangementItem1Right'>
                 <div class='activityArrangementItem1RightA'>
                   <div class='value' v-if="item.subject">{{item.subject}}</div>
                   <div v-for='(item1,index1) in item.honoredGuestVoList' v-if="item.honoredGuestVoList.length>0">
                     <div class='name'>{{item1.name}}</div>
                     <div class='founder'>{{item1.honor}}</div>
                   </div>
                   <div v-if='item.brief&&item.brief!="null"' class='brief'>{{item.brief}}</div>
                   <div class='position' v-if="item.location"><img src='/static/images/position.png'/>{{item.location}}</div>
                 </div>
                 <div class='activityArrangementItem1RightB' v-if="item.childList.length>0" v-for="(items,indexs) in item.childList">
                   <div class='value'>{{items.startTime}}-{{items.startTime}}</div>
                   <div class='value'>{{items.subject}}</div>
                   <div v-for='(item1,index1) in items.honoredGuestVoList' v-if="items.honoredGuestVoList.length>0">
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
           <div  class='Other'>
             <div class='activityArrangementItem'><span></span>其他<span></span></div>
             <!--互文本内容-->
              <div v-html="objData.customContent" class="homeBoxItemTenContent">
              </div>
           </div>
           <!-- ---------- -->
           <div class='mattersNeedingAttention mattersNeedingAttentionFoot'>
           <span>注意事项：</span> 本论坛配备同声翻译，请记得携带您本人身份证到达
           会场，现场入口处将提供免费同传耳机租借服务。
         </div>

     </div>
 <!---->
     <div class="nextBox" @click="ingClick">立即报名</div>
     <img src="/static/images/scrollTop.png" alt="回到顶部" id="scrollTop" @click="goScrillTop" v-if="topScroll">
   </div>


</template>

<script>
  import {AMapManager} from 'vue-amap'; //地图
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {Base64,formatTime3,formatTime4,quiryData} from "../../assets/js/common"  //base转换
  let base = new Base64;
  import {InitializationData,activitySchedulelist,honoredGuestlist} from "../../assets/js/promiseHttp"  //导航栏url截取

export default {

  name: 'Home',
  data(){
    return{
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
      moreMessage:"", //活动安排
      p1:1, //嘉宾列表每页
      s1:5, //嘉宾列表每页数据
      num1:0,//嘉宾列表
      moreMessage1:"", //嘉宾列表
    }
  },
  watch:{

  },
  components:{
  },
  created(){
    this.$nextTick(function () {
      document.title = "活动详情";
    })
    this.quiry();
  },
  methods:{
    ingClick(){ //立即报名
         let data= JSON.parse(localStorage.getItem("userInfo")); //判断登录没有
         if(data){
           let date = new Date();
           let nowTime = date.getTime();
           if (nowTime > this.acivityArr.endTime) { //判断活动结束或者正在进行中  上线放开
             Toast("该活动已结束");
             return;
           }
           if (nowTime > this.acivityArr.signEndTime) {
             Toast("活动报名已结束");
             return;
           }
           if (nowTime < this.acivityArr.signStartTime) {
             Toast("活动尚未开始报名，请选择其他活动！");
             return;
           }
           sessionStorage.setItem("activityInfo", JSON.stringify(this.objData)) //保存活动信息
           this.$store.dispatch("multiActivityId",this.objData.id) //保存选中的Id 在vueX
           this.$router.push({path:"/multiActivity",})  //去选票
         }else{
           this.$store.dispatch("multiActivityId",this.objData.id) //保存选中的Id 在vueX
           this.$router.push({path:"/login1"})
         }
    },
    quiry(){ //初始化数据
//      this.id = JSON.parse(window.sessionStorage.getItem("detailId")).id; //
      this.id = this.$router.history.current.query.id?this.$router.history.current.query.id:"8"; //
//          console.log(this.$router.history.current.query.id,";oqo")
      Indicator.open('加载中...')
       InitializationData(this.id).then(res=>{  //数据加载
         if(!!res.data.status){

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
               if (res.data.data[i].childList.length > 0) {
                 for (var j = 0; j < res.data.data[i].childList.length; j++) {
                   res.data.data[i].childList[j].startTime = formatTime4(res.data.data[i].childList[j].startTime)
                   res.data.data[i].childList[j].endTime = formatTime4(res.data.data[i].childList[j].endTime)
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
               if (res.data.data[i].childList.length > 0) {
                 for (var j = 0; j < res.data.data[i].childList.length; j++) {
                   res.data.data[i].childList[j].startTime = formatTime4(res.data.data[i].childList[j].startTime)
                   res.data.data[i].childList[j].endTime = formatTime4(res.data.data[i].childList[j].endTime)
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
        console.log(res,"活动按拍")
        if(res.data.status == true){
          for (var i = 0; i < res.data.data.length;i++){
                res.data.data[i].startTime =formatTime4(res.data.data[i].startTime)
                res.data.data[i].endTime =formatTime4(res.data.data[i].endTime)
            if (res.data.data[i].childList.length > 0) {
              for (var j = 0; j < res.data.data[i].childList.length; j++) {
                res.data.data[i].childList[j].startTime = formatTime4(res.data.data[i].childList[j].startTime)
                res.data.data[i].childList[j].endTime = formatTime4(res.data.data[i].childList[j].endTime)
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
            console.log(res,"11111")
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
    }

  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现




  },
}
</script>

<style scoped lang="less">
  @import "../../assets/css/homeBox.css";
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
