<template>
  <div id="meActivity">

    <ul class='meActivityBoxItem'>
      <li class='meActivityBoxItemView1' v-for="(item,index) in titleArr"  @click='meActivityBoxItemView(item,index)'><span :class="{meActivityBoxItemViewActive:titleArrIndex == index }">{{item}}</span></li>
    </ul>
     <div class="meActivityBoxItemView2" v-for="(item,index) in listData">
        <div class="meActivityBoxItemView2Header">
          <div class="meActivityBoxItemView2HeaderIndex">
            <img :src="item.bannerUrl" alt="">
          </div>
          <div class="meActivityBoxItemView2HeaderIndex1">
            <h5>{{item.title}}</h5>
            <span v-if="item.goodsAmount>0" style="color: rgba(254,95,95,1)">{{item.goodsAmount}}</span>
            <span v-else style="color: #21CB61">免费</span>
          </div>
        </div>
        <ul class="meActivityBoxItemView2Footer">
          <li class="meActivityBoxItemView2FooterLi"><img src="/static/images/position.png" alt="">{{item.regionName}}</li>
          <li class="meActivityBoxItemView2FooterLi1" v-if="item.state == '待参加'"><img src="/static/images/time.png" alt="">{{item.startTime|formatTime}}-{{item.endTime|formatTime}}</li>
          <li class="meActivityBoxItemView2FooterLi1" v-else><img src="/static/images/time.png" alt="">{{item.startTime|formatTime}}</li>
          <li class="meActivityBoxItemView2FooterLi2" v-if="item.state == '待参加'"@click="lookClick(item.id)">查看门票 <img src="/static/images/right.png" alt=""></li>
          <li class="meActivityBoxItemView2FooterLi2" v-if="item.state == '已完成'"><button style="background: #FAFAFA;color:rgba(153,153,153,1)">{{item.state}}</button></li>
          <li class="meActivityBoxItemView2FooterLi2" v-if="item.state == '待支付'"><button style="background: #FE5F5F" @click="pendingClick(item.id)">{{item.state}}</button></li>
          <li class="meActivityBoxItemView2FooterLi2" v-if="item.state == '已失效'"><button style="background: #FAFAFA;color:rgba(153,153,153,1)">{{item.state}}</button></li>

        </ul>
     </div>
      <div class="lengthFalse" v-if="listData.length<=0">
        <img src="/static/images/queshengtu.png" alt="">
        <p>你{{name}}活动区目前空空也～</p>
      </div>
     <div class="moreClick" v-show="listData.length>0" @click="moreClick(obj.s)">{{message}}</div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import { meActivityData } from '../../assets/js/promiseHttp'; //数据
export default {
  name: 'meActivity',
  data(){
    return{
      name:"全部",
       titleArr:["全部","待参加","待支付","已完成"],
      titleArrIndex:0, //选中的活动页面
      listData: [], // 活动列表数据
      obj:{
        orderStatus:"",//显示数据
        p:1, //页数
        s:20, //每页多少
        total:0,
      },
      pageNum:0, //共几页
      userInfo:{}, //登录数据
      message:"点击加载更多..." //字面意思
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "我的活动";
    })
    this.installData("",1);
    setTimeout(()=>{
      console.log(this.pageNum)
      if(this.pageNum>1){
        this.message = "点击加载更多..."
      }else {
        this.message = "这是我的底线..."
      }
    },300)

  },
  methods:{
    moreClick(){ //点击加载更多
       this.obj.p++;
       if(this.obj.p>this.pageNum){
         Toast("这是最后一页数据");
         this.message = "这是我的底线...";
         return;
       }else {
         if(this.obj.p*this.obj.s<this.total){
           this.message = "点击加载更多...";

         }else {
           this.message = "这是我的底线...";
         }
         if(this.titleArrIndex == 0){
           this.installData("",this.obj.p);
         }else if(this.titleArrIndex == 1){
           this.installData("2",this.obj.p);
         }else if(this.titleArrIndex == 2){
           this.installData("1",this.obj.p);
         }else if(this.titleArrIndex == 3){
           this.installData("7",this.obj.p);
         }
       }

    },
    meActivityBoxItemView(v,i){ //头部点击
      this.name = v;
     this.listData = [];
      this.titleArrIndex = i;
      if(this.titleArrIndex == 0){
        this.installData("",1);
      }else if(this.titleArrIndex == 1){
        this.installData("2",1);
      }else if(this.titleArrIndex == 2){
        this.installData("1",1);
      }else if(this.titleArrIndex == 3){
        this.installData("7",1);
      }
    },
    lookClick(v){ //查看门票
       console.log(v,"haskjdkas ")
      localStorage.setItem("objListId",JSON.stringify(v))
      this.$router.push({path:"/admission"})
    },
    pendingClick(v){//待支付
        this.$store.dispatch("payId",v); //vuex保存支付Id
        this.$router.push({path:"/payH5"}) //去支付页面
    },
    installData(v,p){

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.obj={
        orderStatus:v,
        p:p, //页数
        s:this.obj.s, //每页多少
      }
      if(!!this.userInfo){
        meActivityData(this.obj,this.userInfo.data.access_token).then(res=>{
          if(res.status == true){
            let date = new Date();
            let nowTime = date.getTime();

            if (res.total){
              this.total =res.total;
                res.pageNum = Math.ceil(res.total / this.obj.s);
              this.pageNum =  res.pageNum;
            }
            res.data.map((item, index) => {
              if (item.goodsAmount == 0 || !!item.payTime) {
                item.isPay = true;
              } else {
                item.isPay = false;
              }
              res.data[index].state = "";
              if (!item.isPay && nowTime <= (item.createTime+3600000)) {
                res.data[index].state = "待支付";
              }
              if (!item.isPay && nowTime >= (item.createTime + 3600000)) {
                res.data[index].state = "已失效";
              }
              if (!!item.isPay && nowTime <= item.endTime) {
                res.data[index].state = "待参加";
              }

              if (!!item.isPay && nowTime > item.endTime) {
                res.data[index].state = "已完成";
              }

            })
            this.listData = this.listData.concat(res.data);
          }else{
            Toast("网络异常，请重试")
          }
        })
      }else{
        Toast("登录异常，请重新登录")
      }
    }
  }
}

</script>

<style scoped lang="less">
 #meActivity{
    position: absolute;
   left: 0;
   right: 0;
   top:0;
   bottom: 0;
   overflowy:auto ;
   .meActivityBoxItem{
     width: 100%;
     height: 0.4rem;
     overflow: hidden;
     background:rgba(255,255,255,1);
     margin-top: 0.01rem;
     font-size:0.14rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(153,153,153,1);
     display: flex;
     li{
       flex: 1;
       text-align: center;
       line-height: 0.4rem;
       span{
         display: inline-block;
         height: 0.39rem;
       }
       span.meActivityBoxItemViewActive{
       border-bottom:0.02rem solid rgba(5,5,9,1);
       }
     }
   }
   .meActivityBoxItemView2{
     margin-top: 0.15rem;
     background: #FFFFFF;
     height: 1.55rem;
     width: 100%;
     padding: 0.15rem;
     box-sizing: border-box;
     .meActivityBoxItemView2Header{
       width: 100%;
       height: 1rem;
       display: flex;
       border-bottom: 0.01rem solid #EEEEEE;
       .meActivityBoxItemView2HeaderIndex{
         width: 0.8rem;
         height: 0.8rem;
         img{
           display: inline-block;
           width: 0.8rem;
           height: 0.8rem;
           border-radius: 50%;
         }
       }
       .meActivityBoxItemView2HeaderIndex1{
         flex: 1;
         padding-left: 0.15rem;
         box-sizing: border-box;
         h5{
           font-size:0.15rem;
           font-family:PingFangSC-Regular;
           font-weight:400;
           color:rgba(5,5,9,1);
         }
         span{
           display: inline-block;
           font-size:0.17rem;
           font-family:PingFangSC-Medium;
           font-weight:500;
           margin-top: 0.1rem;
         }
       }
     }
     .meActivityBoxItemView2Footer{
       width: 100%;
       overflow: hidden;
       height: 0.4rem;
       .meActivityBoxItemView2FooterLi{
         float: left;
         font-size:0.12rem;
         margin-right: 0.05rem;
         font-family:PingFangSC-Regular;
         font-weight:400;
         color:rgba(51,51,51,1);
         line-height: 0.4rem;
         img{
           display: inline-block;
           width:.1rem;
           height:.13rem;
           margin-right: 0.05rem;
         }
       }
       .meActivityBoxItemView2FooterLi1{
         float: left;
         font-size:0.12rem;
         margin-right: 0.05rem;
         font-family:PingFangSC-Regular;
         font-weight:400;
         color:rgba(51,51,51,1);
         line-height: 0.4rem;
         img{
           display: inline-block;
           width:.11rem;
           height:.11rem;
           margin-right: 0.05rem;
         }
       }
       .meActivityBoxItemView2FooterLi2{
         float: right;
         height: 0.4rem;
         line-height: 0.4rem;
         img{
           display: inline-block;
           width: 0.14rem;
           height: 0.26rem;
           transform: translateY(0.05rem);
         }
         button{
           outline: none;
           border: 0;
           height: 0.3rem;
           margin-top: 0.05rem;
           font-size:0.12rem;
           font-family:PingFangSC-Regular;
           font-weight:400;
           padding: 0 0.15rem;
           color:rgba(255,255,255,1);
           border-radius:0.04rem;
         }
       }
     }
   }
  .moreClick{
    width: 100%;
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
    color: #666666;
  }
 }
 .lengthFalse{
   width: 100%;
   padding-top: 1rem;
   img{
     display: block;
     margin: 0 auto;
     width: 1rem;
     height: 0.94rem;
   }
   p{
     width: 100%;
     text-align: center;
     line-height: 0.5rem;
     font-weight:400;
     color:rgba(153,153,153,1);
     margin-top: 0.2rem;
     font-size: 0.12rem;
   }
 }
</style>
