<template>
  <div id="multiActivity">
     <div class="multiActivityItem">
       <div class='multiActivityBoxHeader' v-if="!!listData&&listData!={}">
         <img :src='listData.bannerUrl'>
         <div>
           <div>{{listData.title}}</div>
           <div v-if='listData.payPrice>0'>￥{{listData.payPrice}}</div>
           <div style='color:#21CB61'  v-else>免费</div>
           <div><img class="img" style='margin-right:10px;' src='/static/images/time.png'/>{{listData.startTime|formatTime}}<img class="img" style='margin:0 10px;' src='/static/images/position.png'/>{{listData.regionName}}</div>

         </div>
       </div>
        <!--单票-->
        <div class="activityGoodsVoList" v-if="selectArr&&selectArr.length>0">
          <h5>单票</h5>
          <div class="activityGoodsVoListItem" v-for="(item,index) in selectArr" v-if="item.typeStr=='dan'" @click="bgItemTap(item,index)" :class="{active:item.checked == true}">
              <h6>{{item.name}}</h6>
              <div class='time'>
                <img src='/static/images/time.png' style='margin-right:0.1rem;'/>{{item.startTime|formatTime}}
              </div>
              <div class="originalPrice">
                <div class='multiActivityBoxPrice' v-if="item.payPrice>0">
                  优惠价¥
                  <span>{{item.payPrice.toFixed(2)}} </span>
                </div>
                <div style='color:#999999' class='multiActivityBoxPrice1' v-if="item.payPrice>0">
                  原价¥
                  <div class='Oprice'>{{item.originalPrice.toFixed(2)}}
                    <span class='hr'></span>
                  </div>
                </div>
                <div style='color:#21CB61;display: inline-block' v-if='item.payPrice==0||!item.payPrice'>免费 </div>
                <div class='multiActivityBoxState' :class="{active:item.bntBj==false}"  v-if='item.checked==false'>
                  {{item.remainingState}}
                </div>
                <div class='multiActivityBoxStateADD'  v-else>
                  <img src="/static/images/reduce.png" alt="">
                  <input type="num" value="1" disabled="disabled"/>
                  <img style="opacity: 0.3;" src="/static/images/add.png" alt="">
                </div>
              </div>
            <div class="discount" v-if="(item.originalPrice-item.payPrice)<item.originalPrice&&(item.originalPrice-item.payPrice)>0">
              注：已优惠 <span style='color:#FE5F5F'>{{(item.originalPrice-item.payPrice).toFixed(2)}}</span>元
            </div>
          </div>

          <!--组合票-->
          <h5  v-if="listData.activityGoodsGroupVoList&&listData.activityGoodsGroupVoList.length>0">组合票</h5>
          <div class="activityGoodsVoListItem"  v-for="(item,index) in selectArr" v-if="item.typeStr=='duo'"@click="bgItemTap(item,index)" :class="{active:item.checked == true}">
            <h6>{{item.name}}</h6>
            <div class='time'>
              <img src='/static/images/time.png' style='margin-right:0.1rem;'/>{{item.startTime|formatTime}}
            </div>
            <div class="originalPrice">
              <div class='multiActivityBoxPrice' v-if="item.payPrice>0">
                优惠价¥
                <span>{{item.payPrice.toFixed(2)}} </span>
              </div>
              <div style='color:#999999' class='multiActivityBoxPrice1' v-if="item.payPrice>0">
                原价¥
                <div class='Oprice'>{{item.originalPrice.toFixed(2)}}
                  <span class='hr'></span>
                </div>
              </div>
              <div style='color:#21CB61;display: inline-block' v-if='item.payPrice==0||!item.payPrice'>免费 </div>
                <div class='multiActivityBoxState' :class="{active:item.bntBj==false}"  v-if='item.checked==false'>
                   {{item.remainingState}}
                </div>
                <div class='multiActivityBoxStateADD' v-else>
                <img src="/static/images/reduce.png" alt="">
                <input type="num" value="1" disabled="disabled"/>
                <img style="opacity: 0.3;" src="/static/images/add.png" alt="">
              </div>

            </div>
            <div class="discount" v-if="(item.originalPrice-item.payPrice)<item.originalPrice&&(item.originalPrice-item.payPrice)>0">
              注：已优惠 <span style='color:#FE5F5F'>{{(item.originalPrice-item.payPrice).toFixed(2)}}</span>元
            </div>
          </div>
        </div>

     </div>
    <div class="multiActivityFoot">
      <div class='footItem'>
        <div class='total'>实付：<span style='color:#FE5F5F'>{{price.toFixed(2)}}</span></div>
        <div class='totalDiscount'>
          <span>原价：¥{{numPrice.toFixed(2)}} </span>
          <span>立减：¥{{reduceGo.toFixed(2)}}</span>
        </div>
      </div>
      <div class='footItem1'  @click='nextClick'>
        <span >下一步 </span>
        <span style='display:block'>(已选 {{total.length}} 个活动)</span>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {findOneWithGoods} from "../../assets/js/promiseHttp"  //数据
export default {
  name: 'multiActivity',
  data(){
    return{
     userInfo:"", //判断是不是登录的状态，
      listData:{}, //数据
      selectArr:[], //门票存放
      total:[], //购买数量的个数
      price:0, //实付
      numPrice:0, //原价
      reduceGo:0, //立减
    }
  },
  created(){
    this.total = [];
    console.log(this.$router.history.current.query.id)
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")); //登陆的信息
      if( this.userInfo){
        if(!!this.$router.history.current.query.id){
          var date = new Date();
          var nowTime = date.getTime();
          findOneWithGoods(this.userInfo.data.access_token,this.$router.history.current.query.id).then(res=>{ //接口请求票据的信息
//             console.log(res,"dhalkfkal1")
            if(res.status == true){
               if( res.data.activityGoodsVoList&&res.data.activityGoodsVoList.length>0){ //单活动门票
                 res.data.activityGoodsVoList.forEach((item,index)=>{
                   item.checked  = false; //是不是门票选中
                   item.typeStr  = 'dan';
                 })
               }
              if( res.data.activityGoodsGroupVoList&&res.data.activityGoodsGroupVoList.length>0){//组合活动门票
                res.data.activityGoodsGroupVoList.forEach((item,index)=>{
                  item.checked  = false;//是不是门票选中
                  item.typeStr  = 'duo';
                })
              }
              this.selectArr = [...res.data.activityGoodsVoList,...res.data.activityGoodsGroupVoList]; //所有门票
              this.selectArr.forEach((item,index)=>{
//                item.remaining = 20; 模拟数据
//                item.startTime = 1552924800000;
//                item.endTime =1556639999000;
//                item.payPrice =59;
                if (nowTime < item.startTime){  //活动的开始时间
                  item.remainingState = "未开始";
                  item.bntBj = false;
                } else if (nowTime >= item.endTime){  //活动的开始时间
                  item.remainingState = "已结束";
                  item.bntBj = false;
                }else if (item.remaining<=0||item.remaining==null){
                  item.remainingState = "已售完";
                  item.bntBj = false;
                } else{
                  item.remainingState = "抢票中"
                  item.bntBj = true;
                }
              })
//              console.log(this.selectArr,"daskdkas11k")
               this.listData = res.data; //数据
            }else{
              Toast("网络出错，请重试")
            }
          })
        }else {
          this.$router.push({path:"/index"})
        }
      }else{
        Toast("登录异常，请重新登录")
        this.$router.push({path:"/login"});
      }

  } ,
  methods:{
    bgItemTap(item,index){ //点击每个票
      if (item.remainingState == "未开始")return Toast("该门票还未开售");
      if (item.remainingState == "已结束")return Toast("该门票已售票结束");
      if (item.remainingState == "已售完")return Toast("已门票售完");
      item.checked = !item.checked;
      if(item.checked==true){
        this.total.push(item);
      }else {
        this.total.splice(index,1);
      }
      let prices = 0, numPrices = 0, reduceGos = 0;
        this.selectArr.map((v, index) => {  //价格的计算
          if(v.checked == true){
            prices+= v.payPrice;
            numPrices += v.originalPrice;
            reduceGos += v.originalPrice - v.payPrice;
          }
        })
        this.price = prices;
        this.numPrice = numPrices;
        this.reduceGo = reduceGos;

    },
    nextClick(){ //下一步
      let that = this,menpaioArr = [];
      that.selectArr.forEach((item,index)=>{ //把点中的门票选择出来保存本地后面备用
        if(item.checked==true){
            menpaioArr.push(item)
        }
      })
//      console.log(menpaioArr,"menpaioArr")
      if (menpaioArr.length<=0){
        Toast("请选择至少一场活动门票");
        return;
      }else{
        sessionStorage.setItem("buyData", JSON.stringify(menpaioArr));
        that.$router.push({path:"/registrationInformation",query:{id:this.$router.history.current.query.id}});//去填写报名表
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
        .multiActivityBoxState.active{
          background: #cccccc;
          color: #999999;
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
    .multiActivityBoxHeader .img{
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
