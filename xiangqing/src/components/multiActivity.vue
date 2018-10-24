<template>
  <div id="multiActivity">
  <div scroll-y class='multiActivityBox'>
    <div class='multiActivityBoxHeader'>
      <img src='/static/images/111.png'/>
      <div>
        <div>第七届深圳国际工业设计大展及智深圳会展中心5</div>
        <div>¥218起</div>
        <div><img style='margin-right:10px;' src='/static/images/time.png'/>2018/11/5日<img style='margin:0 10px;' src='/static/images/position.png'/>深圳</div>

      </div>
    </div>
    <!-- ------------ -->
    <div class='multiActivitycenter'>
      <div  v-for='(item,index) in arr' class="multiActivityItem" :class='{multiActivityItemActive:item.bntBj==true}' @click='bgItemTap(index)'>
        <img src='/static/images/bgItem.png' class='bgItem' v-if="item.bgItem">
        <div class='item1'> {{item.name}}</div>
        <div class='item2'><img src='/static/images/time.png' style='margin-right:10px;'/>{{item.time}}<img  style='margin:0 10px;' src='/static/images/position.png'/>{{item.address}}</div>
        <div class='item4' :class=' [{item4Active:item.bntBj==true},{item4Active1:item.stateBool==false}]'>
          <div v-if="item.youhui" class="multiActivityBoxPrice" :class='{multiActivityBoxPriceActive1:item.state=="已售完"||item.state=="已购买"}'>
            优惠价¥
            <span>{{item.youhui}} </span>
          </div>
          <div style='color:#999999' class='multiActivityBoxPrice' v-if="item.orginPrice!='免费'">
            原价¥
            <div class='Oprice'>{{item.orginPrice}}
              <span class='hr'></span>
            </div>
          </div>
          <div style='color:#21CB61' class='multiActivityBoxPrice' v-if="item.orginPrice=='免费'">
            免费
          </div>
          <!-- <view class='reduceAdd'>
            <image class='reduce' src='../../images/reduce.png'  @click='reduceClick(index)'></image>
            <text>{{item.num}}</text>
             <image class='add' src='../../images/add.png' @click='addClick(index)'></image>
          </view> -->
          <div class='multiActivityBoxState1' v-if='item.state=="已售完"'>{{item.state}}</div>
          <div class='multiActivityBoxState1' v-else-if='item.state=="已购买"'>{{item.state}}</div>
          <div class="multiActivityBoxState" :class='{multiActivityBoxStateActive:item.bntBj==true}' v-else>{{item.state}}</div>
        </div>
        <div class='item5' v-show="item.yiyouhui">注：已优惠 <span style='color:#FE5F5F'>{{item.yiyouhui}}</span>  元。</div>
      </div>

    </div>

  </div>
  <div id='multiActivityFoot'>
    <div class='footItem'>
      <div class='total'>合计：<span style='color:#FE5F5F'>{{price}}</span></div>
      <div class='totalDiscount'>
        <span>总额：¥{{numPrice}} </span>
        <span>立减：¥{{reduceGo}}</span>
      </div>
    </div>
    <div class='footItem1' @click='nextClick'>
      <span >下一步 </span>
      <span style='display:block'>(已选 {{selectArr.length}} 个活动)</span>
    </div>
  </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';


  export default {
  name: 'multiActivity',
  data(){
    return{

      arr: [{ name: "全球智造·设计未来 | 国际工业设计高峰论坛", time: "2018/11/5日", address: "深圳", id:"1",orginPrice: "免费", num: 0,  price: 0, state: "已售完", bgItem: false, bntBj: false, stateBool:true}
        , { name: "全球智造·设计未来 | 国际工业设计高峰论坛", time: "2018/11/5日", address: "深圳", id:"2",orginPrice: 199, num: 0, yiyouhui: 100, price: 99, state: "抢票中", bgItem: false, bntBj: false, stateBool: true},
        { name: "全球智造·设计未来 | 国际工业设计高峰论坛", time: "2018/11/5日", address: "深圳",id:"2", youhui: 99, orginPrice: 199, num: 0, yiyouhui: 100, price: 99, state: "已购买", bgItem: false, bntBj: false, stateBool: true},
        {
          name: "组合票", time: "2018/11/5日",yiyouhui:0, address: "深圳",id:"4", youhui: 99, orginPrice: 199, num: 0,  price: 99, state: "组合票", bgItem: false, zuhe: ["抢票中", "已售完"], bntBj: false, stateBool: true}
      ],
      activityNum:0,
      selectArr:[], //选中的
      price:0,
      numPrice:0,
      reduceGo:0,
    }
  },
  watch:{

  },
  computed:{

  },
  created(){
    let that = this;
    that.arr.map((item,index)=>{

      if (that.arr[index].state == "已售完" || that.arr[index].state == "已购买"){
        that.arr[index].stateBool = !that.arr[index].stateBool;
        that.arr = that.arr;
      }
    })
  },
  methods:{

    nextClick(){ // 下一步

      if (this.selectArr.length<=0){
        Toast({
          message: '请选择活动',
          iconClass: 'icon icon-success',
          duration: 2000
        });
        return;
      }else{
        console.log(111111111)
        wx.miniProgram.getEnv(function(res) {
          console.log(res.miniprogram,"dahlsdlasdlasl")
          if(res.miniprogram){
            wx.miniProgram.navigateTo( { url:`/pages/registrationInformation/registrationInformation?orderItem=${this.selectArr}`} );
          }else{
            Toast({
              message: '请退出小程序重新登陆',
              iconClass: 'icon icon-success',
              duration: 2000
            });
            return;
          }
        })
      }
    },

    bgItemTap(e){ //点击每个列表的数据 // 购物车处理
      let bgIndex = e;
      let that = this;
      if (that.arr[bgIndex].state=="已售完"){
        Toast({
          message: '该活动已售完',
          iconClass: 'icon icon-success',
          duration: 2000
        });
        return;
      } else if(that.arr[bgIndex].state == "已购买"){
        Toast({
          message: '该活动已购买',
          iconClass: 'icon icon-success',
          duration: 2000
        });
         return;
      } else if (that.arr[bgIndex].state == "组合票"){
        that.arr[bgIndex].bgItem = !that.arr[bgIndex].bgItem;

        if (that.arr[bgIndex].bgItem == true) {
          that.arr[bgIndex].num = 1;
          that.arr = that.arr;
          that.selectArr.push(that.arr[bgIndex]);
        } else {
          that.arr[bgIndex].num = 0;
          that.arr = that.arr;
          if(that.selectArr){
            that.selectArr.forEach((item,index1)=>{
              if(that.arr[bgIndex].id===item.id){
                that.selectArr.splice(index1,1)
              }
            })
          }
        }
        let zuhe = that.arr[bgIndex].zuhe;
        for (var a = 0; a < that.arr.length;a++){
          for (var j = 0; j < zuhe.length;j++){
            if (zuhe[j] == that.arr[a].state){
              that.arr[a].bntBj = !that.arr[a].bntBj ;
              that.arr = that.arr;
            }

          }
        }

      }else{
        if (that.arr[bgIndex].bntBj == true){
          that.arr[bgIndex].bgItem = false;
          if(that.selectArr){
            that.selectArr.forEach((item,index1)=>{
              if(that.arr[bgIndex].id===item.id){
                that.selectArr.splice(index1,1)
              }else{
                Toast({
                  message: '组合票已包含',
                  iconClass: 'icon icon-success',
                  duration: 2000
                });
                return;
              }
            })
          }

          let totalPrice=0, goReduce=0,actualPrice=0;
          this.selectArr.forEach((item,index)=>{
            totalPrice +=item.price;
            goReduce +=item.yiyouhui?item.yiyouhui:0;
            actualPrice +=item.orginPrice;
          })
          this.price =totalPrice;
            this.numPrice =actualPrice;
            this.reduceGo =goReduce;
          return;
        }
        that.arr[bgIndex].bgItem = !that.arr[bgIndex].bgItem;

        if (that.arr[bgIndex].bgItem == true){
          that.arr[bgIndex].num = 1;
          that.selectArr.push(that.arr[bgIndex]);

          that.arr = that.arr;

        }else{
          that.arr[bgIndex].num = 0;
          if(that.selectArr){
            that.selectArr.forEach((item,index1)=>{
              if(that.arr[bgIndex].id===item.id){
                 that.selectArr.splice(index1,1)
              }
            })
          }
          that.arr = that.arr;
        }

      }
     let totalPrice=0, goReduce=0,actualPrice=0;
//      this.$set(this.selectArr,this.selectArr[bgIndex],this.selectArr[bgIndex])
      this.selectArr.forEach((item,index)=>{
        totalPrice +=item.price;
        goReduce +=item.yiyouhui?item.yiyouhui:0;
        actualPrice +=item.orginPrice;
      })
        this.price =totalPrice;
        this.numPrice =actualPrice;
        this.reduceGo =goReduce;
      console.log(this.selectArr,"我是")
    },
    reduceClick(e){ //减
      let that = this;
      let reducenum = e;
      that.arr[reducenum].num--;


      if (that.arr[reducenum].num<=0){
        Toast({
          message: '已经是最小值',
          iconClass: 'icon icon-success',
          duration: 2000
        });
        that.arr[reducenum].num = 0;
        that.arr = that.arr;
      }else{
        that.arr = that.arr;
      }

    },
    addClick(e) { //加
      let that = this;
      let addnum = e;
      that.arr[addnum].num++;
      that.arr = that.arr;
    },
  }
}
</script>

<style scoped lang="less">
  @import "../assets/multiActivity.css";
</style>
