<template>
  <div id="multiActivity">
     <div class="multiActivityItem">
       <div class='multiActivityBoxHeader'>
         <img :src='listData.bannerUrl'>
         <div>
           <div>{{listData.title}}</div>
           <div v-if='listData.expenses>0'>￥{{listData.expenses}}</div>
           <div  style='color:#21CB61'  v-if='listData.expenses<=0'>免费</div>
           <div><img style='margin-right:10px;' src='/static/images/time.png'/>{{listData.startTime|formatTime}}<img style='margin:0 10px;' src='/static/images/position.png'/>{{listData.regionName}}</div>

         </div>
       </div>
        <!--单票-->
        <div class="activityGoodsVoList" v-if="listData.activityGoodsVoList&&listData.activityGoodsVoList.length>0">
          <h5>单票</h5>
          <div class="activityGoodsVoListItem" v-for="(item,index) in listData.activityGoodsVoList" @click="bgItemTap(index,'one')" :class="{active:item.bgItem == true}">
              <h6>{{item.name}}</h6>
              <div class='time'>
                <img src='/static/images/time.png' style='margin-right:0.1rem;'/>{{item.startTime|formatTime}}
              </div>
              <div class="originalPrice">
                <div class='multiActivityBoxPrice' v-if="item.youhuijia>0">
                  优惠价¥
                  <span>{{item.originalPrice-item.youhuijia}} </span>
                </div>
                <div style='color:#999999' class='multiActivityBoxPrice1' v-if="item.youhuijia>0">
                  原价¥
                  <div class='Oprice'>{{item.originalPrice}}
                    <span class='hr'></span>
                  </div>
                </div>
                <div style='color:rgba(254,95,95,1);display: inline-block' v-if="item.youhuijia<=0&&item.originalPrice>0">{{item.originalPrice}} </div>
                <div style='color:#21CB61;display: inline-block' v-if='item.originalPrice==0'>免费 </div>
                <div class='multiActivityBoxState1' v-if='item.remainingState=="已售完"&&item.bgItem==false'>
                  {{item.remainingState}}
                </div>
                <div class='multiActivityBoxState1' v-else-if='item.remainingState=="已购买"&&item.bgItem==false'>
                  {{item.remainingState}}
                </div>
                <div class='multiActivityBoxState'  v-else-if='item.remainingState=="抢票中"&&item.bgItem==false'>
                  {{item.remainingState}}
                </div>
                <div class='multiActivityBoxStateADD'  v-else-if='item.bgItem==true'>
                  <img src="/static/images/reduce.png" alt="">
                  <input type="num" value="1" disabled="disabled"/>
                  <img style="opacity: 0.3;" src="/static/images/add.png" alt="">
                </div>
              </div>
            <div class="discount" v-if="item.youhuijia>0">
              注：已优惠 <span style='color:#FE5F5F'>{{item.youhuijia}}</span>元
            </div>
          </div>
        </div>

        <!--组合票-->
       <div class="activityGoodsVoList" v-if="listData.activityGoodsGroupVoList&&listData.activityGoodsGroupVoList.length>0">
         <h5>组合票</h5>
         <div class="activityGoodsVoListItem"  v-for="(item,index) in listData.activityGoodsGroupVoList" @click="bgItemTap(index,'two')" :class="{active:item.bgItem == true}">
           <h6>{{item.name}}</h6>
           <div class='time'>
             <img src='/static/images/time.png' style='margin-right:0.1rem;'/>{{item.startTime|formatTime}}
           </div>
           <div class="originalPrice">
                 <div class='multiActivityBoxPrice' v-if="item.youhuijia>0">
                   优惠价¥
                   <span>{{item.originalPrice-item.youhuijia}} </span>
                 </div>
                 <div style='color:#999999' class='multiActivityBoxPrice1' v-if="item.youhuijia>0">
                   原价¥
                   <div class='Oprice'>{{item.originalPrice}}
                     <span class='hr'></span>
                   </div>
                 </div>
                 <div style='color:rgba(254,95,95,1);display: inline-block' v-if="item.youhuijia<=0&&item.originalPrice>0">{{item.originalPrice}} </div>
                 <div style='color:#21CB61;display: inline-block' v-if='item.originalPrice==0'>免费 </div>
                 <div class='multiActivityBoxState1' v-if='item.remainingState=="已售完"&&item.bgItem==false'>
                   {{item.remainingState}}
                 </div>
                 <div class='multiActivityBoxState1' v-else-if='item.remainingState=="已购买"&&item.bgItem==false'>
                   {{item.remainingState}}
                 </div>
                 <div class='multiActivityBoxState'  v-else-if='item.remainingState=="抢票中"&&item.bgItem==false'>
                   {{item.remainingState}}
                 </div>
             <div class='multiActivityBoxStateADD'  v-else-if='item.bgItem==true'>
               <img src="/static/images/reduce.png" alt="">
               <input type="num" value="1" disabled="disabled"/>
               <img style="opacity: 0.3;" src="/static/images/add.png" alt="">
             </div>

           </div>
           <div class="discount" v-if="item.youhuijia>0">
             注：已优惠 <span style='color:#FE5F5F'>{{item.youhuijia}}</span>元
           </div>
         </div>
       </div>
     </div>
    <div class="multiActivityFoot">
      <div class='footItem'>
        <div class='total'>实付：<span style='color:#FE5F5F'>{{price}}</span></div>
        <div class='totalDiscount'>
          <span>原价：¥{{numPrice}} </span>
          <span>立减：¥{{reduceGo}}</span>
        </div>
      </div>
      <div class='footItem1'  @click='nextClick'>
        <span >下一步 </span>
        <span style='display:block'>(已选 {{selectArr.length}} 个活动)</span>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {findOneWithGoods,findByVersionToClient} from "../../assets/js/promiseHttp"  //数据
export default {
  name: 'multiActivity',
  data(){
    return{
     userInfo:"", //判断是不是登录的状态，
      listData:{}, //数据
      selectArr:[], //选中的数组
      price:0, //实付
      numPrice:0, //原价
      reduceGo:0, //立减
    }
  },
  created(){

      console.log(this.$store.state.multiActivityId)
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if( this.userInfo){
        if(!!this.$store.state.multiActivityId){
          var date = new Date();
          var nowTime = date.getTime();
          console.log(nowTime,"dasdsakdkask")
          findOneWithGoods(this.userInfo.data.access_token,this.$store.state.multiActivityId).then(res=>{
             console.log(res,"dhalkfkal1")
            if(res.status == true){
               if( res.data.activityGoodsVoList&&res.data.activityGoodsVoList.length>0){
                 res.data.activityGoodsVoList.forEach((item,index)=>{
                   item.bgItem = false; // 背景框选中
                   item.bntBj = false;// 按钮色
                   item.stateBool = false;// 状态
                   item.num = 0;// 选中的数量
                   res.data.activityGoodsVoList[index].danId = res.data.activityGoodsVoList[index].id+"dan";
                   res.data.activityGoodsVoList[index].youhuijia = res.data.activityGoodsVoList[index].originalPrice - res.data.activityGoodsVoList[index].payPrice;
                   if (res.data.activityGoodsVoList[index].remaining<=0){
                     res.data.activityGoodsVoList[index].remainingState = "已售完";
                     res.data.activityGoodsVoList[index].bntBj = false;
                   } else if (nowTime < res.data.startTime){  //活动的开始时间
                     res.data.activityGoodsVoList[index].remainingState = "抢票中"
                     res.data.activityGoodsVoList[index].bntBj = true;
                   }else{
                     res.data.activityGoodsVoList[index].remainingState = "抢票中"
                     res.data.activityGoodsVoList[index].bntBj = false;
                   }
                 })
               }
              if( res.data.activityGoodsGroupVoList&&res.data.activityGoodsGroupVoList.length>0){
                res.data.activityGoodsGroupVoList.forEach((item,index)=>{
                  item.bgItem = false; // 背景框选中
                  item.bntBj = false;// 按钮色
                  item.stateBool = false;// 状态
                  item.num = 0;// 选中的数量
                  res.data.activityGoodsGroupVoList[index].duoId = res.data.activityGoodsGroupVoList[index].id + "duo";
                  res.data.activityGoodsGroupVoList[index].youhuijia = res.data.activityGoodsGroupVoList[index].originalPrice - res.data.activityGoodsGroupVoList[index].payPrice;
                  if (res.data.activityGoodsGroupVoList[index].remaining<=0){
                    res.data.activityGoodsGroupVoList[index].remainingState = "已售完";
                    res.data.activityGoodsGroupVoList[index].bntBj = false;
                  } else if (nowTime < res.data.startTime){  //活动的开始时间
                    res.data.activityGoodsGroupVoList[index].remainingState = "抢票中"
                    res.data.activityGoodsGroupVoList[index].bntBj = true;
                  }else{
                    res.data.activityGoodsGroupVoList[index].remainingState = "抢票中"
                    res.data.activityGoodsGroupVoList[index].bntBj = false;
                  }
                })
              }
              console.log(res.data,"daskdkas111k")
               this.listData = res.data;
            }else{
              Toast("网络出错，请重试")
            }
          })
        }else {
          this.$router.push({path:"/home"})
        }
      }else{
        Toast("登录异常，请重新登录")
      }

  } ,
  methods:{
    bgItemTap(i,v){ //点击每个票
      let bgIndex = i;
      let that = this;

      if (v == "one"){ //点击的单票
        if (that.listData.activityGoodsVoList[bgIndex].remainingState == "已售完"){
          Toast("该活动已售完")
          return;
        }
        that.listData.activityGoodsVoList[bgIndex].bgItem = !that.listData.activityGoodsVoList[bgIndex].bgItem;
        if(that.listData.activityGoodsVoList[bgIndex].bgItem == true){
          that.listData.activityGoodsVoList[bgIndex].num = 1;
          that.listData.activityGoodsVoList[bgIndex].index = bgIndex;
          that.selectArr.push(that.listData.activityGoodsVoList[bgIndex])
        }else{
          that.listData.activityGoodsVoList[bgIndex].index = bgIndex;
          that.listData.activityGoodsVoList[bgIndex].num = 0;
          console.log( that.selectArr,"dfskfkas")
          that.selectArr.map((item,index)=>{
            if (item.danId == that.listData.activityGoodsVoList[bgIndex].danId){
              that.selectArr.splice(index,1)
            }
          })
        }
      }else{//点击的是多票
        if ( that.listData.activityGoodsGroupVoList[bgIndex].remainingState == "已售完"){
          Toast("该活动已售完")
          return;

        }
        that.listData.activityGoodsGroupVoList[bgIndex].bgItem = !that.listData.activityGoodsGroupVoList[bgIndex].bgItem;
        if (that.listData.activityGoodsGroupVoList[bgIndex].bgItem == true) {
          that.listData.activityGoodsGroupVoList[bgIndex].num = 1;
          that.listData.activityGoodsGroupVoList[bgIndex].index = bgIndex;
          that.selectArr.push(that.listData.activityGoodsGroupVoList[bgIndex])
        } else {
          that.listData.activityGoodsGroupVoList[bgIndex].num = 0;
          that.listData.activityGoodsGroupVoList[bgIndex].index = bgIndex;
          that.selectArr.map((item, index) => {
            if (item.duoId == that.listData.activityGoodsGroupVoList[bgIndex].duoId) {
              that.selectArr.splice(index, 1)
            }
          })
        }
      }

        let prices = 0, numPrices = 0, reduceGos = 0;
        that.selectArr.map((item, index) => {
          prices+= item.payPrice;
          numPrices += item.originalPrice;
          reduceGos += item.originalPrice - item.payPrice;
        })
        this.price = prices;
        this.numPrice = numPrices;
        this.reduceGo = reduceGos;

    },
    nextClick(){ //下一步
      let that = this;
      if (that.selectArr.length<=0){
        Toast("请选择至少一场活动门票")
        return;
      }else{
        findByVersionToClient(this.userInfo.data.access_token).then(res=>{
          console.log(res,"数据")
          if(res.status == true){
            sessionStorage.setItem("findByVersionToClient",JSON.stringify(res.data));
            sessionStorage.setItem("buyData", JSON.stringify(that.selectArr))
            that.$router.push({path:"/registrationInformation"})
          }else{
            Toast("网络出错，请重试")
          }
        })

      }
    },
  }
}

</script>

<style scoped lang="less">
  .multiActivityBoxStateADD{
    width: 0.6rem;
    height: 0.3rem;
    float: right;
    img{
      display: inline-flex;
      width: 0.13rem;
      height: 0.13rem;
    }
    input{
      width: 0.2rem;
      border: 0.01rem solid #eaeaea;
      border-radius: 0.02rem;
      text-align: center;
    }
  }
#multiActivity{
  position: absolute;
  left: 0;
  top:0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .activityGoodsVoList{
    width: 94%;
    margin: 0 auto;
    h5{
      width: 100%;
      line-height: 0.5rem;
      font-size: 0.18rem;
    }

    .activityGoodsVoListItem{
      width: 100%;
      height: 1.4rem;
      background: url(../../../static/images/bjItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.15rem;
      padding: 0.13rem 0.2rem;
      box-sizing: border-box;
      h6{
        width: 100%;
        font-size:0.13rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(5,5,9,1);
        line-height: 0.3rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
      .time{
        width: 100%;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
        img{
          display: inline-block;
          width: 0.11rem;
          height: 0.11rem;
        }
      }
      .originalPrice{
        position: relative;
        width: 100%;
        height: 0.35rem;
        background:rgba(255,248,248,1);
        margin-top: 0.05rem;
        border-radius: 0.02rem;
        line-height: 0.35rem;
       .multiActivityBoxPrice{
         display: inline-block;
          color:#FE5F5F;
        height: 0.35rem;
         line-height: 0.35rem;
        }
        .multiActivityBoxPrice1{
          display: inline-block;
          margin-left:20px;
          color:#FE5F5F;
          height: 0.35rem;
          line-height: 0.35rem;
        }
         .Oprice{
          position: relative;
          display: inline-block;
           height: 0.35rem;
           line-height: 0.35rem;
           .hr{
             width: 100%;
             height: 0.01rem;
             display: inline-block;
             background: #999999;
             position: absolute;
             left: 0;
             top: 48%;
           }
        }
        .multiActivityBoxState1{
          width: 0.55rem;
          height: 0.24rem;
          border-radius:0.05rem;
          text-align: center;
          line-height: 0.24rem;
          background:#FAFAFA;
          color:#999999;
          position: absolute;
          right: 0.1rem;
          top: 0.05rem;
        }
        .multiActivityBoxState{
          width: 0.55rem;
          height: 0.24rem;
          border-radius:0.05rem;
          background: #21CB61;
          text-align: center;
          line-height: 0.24rem;
          color:rgba(255,255,255,1);
          position: absolute;
          right: 0.1rem;
          top: 0.05rem;
        }

      }
      .discount{
        width: 100%;
        height:0.33rem;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height: 0.33rem;
      }
    }
    .activityGoodsVoListItem.active{
      width: 100%;
      height: 1.4rem;
      background: url(../../../static/images/bgItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.15rem;
      padding: 0.13rem 0.2rem;
      box-sizing: border-box;
    }

  }
  .multiActivityItem{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    overflow-y: auto;
    bottom: 0.5rem;
    overflow-x: hidden;
    .multiActivityBoxHeader{
      width: 100%;
      padding: 3% ;
      background: #fff;
      height: 1.2rem;
      display: flex;
      margin: 0.01rem ;
      box-sizing: border-box;
    }
    .multiActivityBoxHeader img{
      width: 0.8rem;
      height: 0.8rem;
      display: inline-block;
    }
    .multiActivityBoxHeader div{
      flex: 1;
    }
    .multiActivityBoxHeader div div:nth-child(1){
      height: 0.3rem;
      width: 100%;
      line-height: 0.3rem;
      font-size:0.14rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(5,5,9,1);
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      text-indent:0.1rem;
    }
    .multiActivityBoxHeader div div:nth-child(2){
      width:100%;
      height:0.25rem;
      font-size:0.14rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(254,95,95,1);
      line-height:0.25rem;
      text-indent: 0.1rem;
    }
    .multiActivityBoxHeader div div:nth-child(3){
      width: 100%;
      height: 0.25rem;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:0.25rem;
      padding-left:0.1rem;
    }
    .multiActivityBoxHeader div div:nth-child(3) img,.multiActivityBoxHeader div div:nth-child(4) img{
      display: inline-block;
      width: 0.11rem;
      height: 0.11rem;

    }
  }
  .multiActivityFoot{
    width: 100%;
    height: 0.5rem;
    background: #F7F7F7;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
      .footItem1{
        width: 40%;
        background: #21CB61;
        padding-top: 0.05rem;
        height:0.5rem;
        font-size:0.13rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
      }
    .footItem{
      flex: 1;
      padding-left: 3%;
      padding-top: 0.03rem;
      box-sizing: border-box;
      .total{
        width: 100%;
        font-size:0.15rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        height:0.25rem;
        line-height: 0.25rem;
      }
      .totalDiscount{
        width: 100%;
        height:0.25rem;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        height:0.25rem;
        display: flex;
        span{
          flex: 1;
        }
      }
    }
  }
}
</style>
