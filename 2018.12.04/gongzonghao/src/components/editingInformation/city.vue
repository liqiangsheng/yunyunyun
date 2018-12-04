<template>
  <div id="city">
    <div class="content">
      <div v-for="(item,index) in cityAll" class='sheng' :id="item.key">
        {{item.key}}
        <div v-for="(items1,index2) in item.children"  class='shi' :class=" {cityActive:cityObj .cityName ==items1.name}" @click='shiClick(index2,items1)'>
          {{items1.name}}
        </div>
      </div>
    </div>
    <div class='rightCity'>
      <a :href="'#'+item" class='rightCityItem'  v-for="(item,index) in Letter" >
        {{item}}
      </a>

    </div>
  </div>
</template>

<script>
  import { levelCity} from '../../assets/js/promiseHttp';
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'city',
  data(){
    return{
      cityShow:false,  //城市数据请求成功显示
      cityObj:{}, //  点击城市的下标
      toView: "",  //去到 那个字母下面
      cityAll:"", //所有城市存放
      Letter:[] //字母存放
    }
  },
  created(){
    levelCity().then(res=>{
      if(res.data.status==true){
        let cityArr = [];
        res.data.data.map((item,index)=>{
          item.sort = item.capitalPinyin.charAt(0); //找出首字母

        })
        res.data.data.map((item,index)=>{
          cityArr.push(item.sort);
        })
        var arr2 = [], allArr = [] ;//去重
        for (var i = 0; i < cityArr.length; i++) {
          if (arr2.indexOf(cityArr[i]) == -1) {
            arr2.push(cityArr[i]);
          }
        }

        arr2.map((item,index)=>{ //创造对应的数组
          allArr.push({ "key": item,"children":[]})

        })

        allArr.map((item,index)=>{  //把相同字母开头的放在一起
          res.data.data.map((item1,index1)=>{

            if (item.key == item1.sort){
              item.children.push(item1)

            }
          })
        })
         this.cityShow=true;
         this.Letter=arr2;
         this.cityAll=allArr;
      }else{
        Toat("网络异常，请重试")
      }
    })
  },
  methods:{
    shiClick(i,v){ //点击城市
      this.cityObj.cityName =  v.name;
      this.cityObj.regionId =  v.id;
      this.$emit("cityObj",this.cityObj)
    },

  },

}

</script>

<style scoped lang="less">
  #city {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #eeeeee;
    box-sizing: border-box;
    .sheng{
      line-height: 0.3rem;
      font-size: 0.14rem;
      background: #eee;
      color: #999999;
      text-indent: 0.12rem;
    }
    .shi{
      width: 100%;
      background: #fff;
      border-bottom: .01rem solid #eee;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.14rem;
      font-weight: 400;
      color: black;
    }
    .rightCity{
      font-size: 0.1rem;
      width: 0.3rem;
      position: fixed;
      top:0.5rem;
      right: 0;
      color: #666666;
    }
    .rightCityItem{
      display: block;
      text-align: center;
      height: 0.16rem;
      width: 100%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 0.12rem;
      font-family: "微软雅黑";
      line-height: 0.16rem;

    }
    .cityActive{
      background: #dadada44;
    }
  }
</style>
