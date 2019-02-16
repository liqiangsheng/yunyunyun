<template>
  <div id="nameValue">
    <!--性别-->
    <div id="one" v-if="componentData.code=='sex'">
      <label class="label">
        <input class="input" type="radio" value="男" v-model="nameValue">
        男
      </label>
    </div>
    <div id="two" v-if="componentData.code=='sex'">
      <label class="label">
        <input class="input"  type="radio" value="女" v-model="nameValue">
        女
      </label>
    </div>
    <!--身份证-->
    <div v-if="componentData.code=='idType'" v-for="(item,index) in values" class="idType">
      <label class="label">
          <input class="input"  type="radio" :value="item.name" v-model="idType" @click="selectClick(item.code)">
          {{item.name}}
      </label>
    </div>

  <!--手机电话国家号-->
  <div v-if="componentData.code=='mobile1CountryNo'||componentData.code=='phone1CountryNo'" v-for="(item,index) in values" class="idType">
      <label class="label">
        <input class="input"  type="radio" :value="item" v-model="telNum">
       {{item}}
      </label>
  </div>
    <!--获取渠道-->
    <div v-if="componentData.code=='gainChannel'" v-for="(item,index) in values" class="idType">
      <label class="label">
        <input class="input"  type="radio" :value="item.name" v-model="gainChannel" @click="selectClick(item.code)">
       {{item.name}}
      </label>
    </div>
    <!--公司的领域-->
    <div v-if="componentData.code=='corpDomains'" v-for="(item,index) in corpDomainsA" class="idType">
      <label class="label" >
        <input class="input"  type="checkbox" :value="item.code" v-model="corpDomains" @click="selectClick(item.code)">
        {{item.name}}
      </label>
    </div>
    <!--感兴趣的领域-->
    <div v-if="componentData.code=='interestedDomains'" v-for="(item,index) in interestedDomainsA" class="idType">
        <label class="label" >
          <input class="input"  type="checkbox" :value="item.code" v-model="interestedDomains" @click="selectClick(item.code)">
          {{item.name}}
        </label>
    </div>
  <button @click="okClick">确定</button>
  </div>
</template>

<script>
  import {loadDicTree} from "../../assets/js/promiseHttp"  //数据
export default {
  props:["componentData","corpDomainsArr","interestedDomainsArr"],
  name: 'nameValue',
  data(){
    return{
      nameValue:"男", //名字
      idType:"身份证", //省份正
      telNum:"86", //手机，电话国家号
      gainChannel:"微信", //手机，电话国家号
      corpDomains:this.corpDomainsArr, //公司的领域
      corpDomainsA:[], //公司的领域
      interestedDomains:this.interestedDomainsArr, //感兴趣的领域
      interestedDomainsA:[], //感兴趣的领域
      values:[], //要处理的数据
       selectIndex:"1", //选中的下标
    }
  },
  created(){
    if(this.componentData.code == "mobile1CountryNo"||this.componentData.code == "phone1CountryNo"){
      this.values = ["86"]
    }
    loadDicTree().then(res=>{
      if(res.data.status == true){
        res.data.data.forEach((item,index)=>{
            if(item.code == this.componentData.name){
               this.values = item.values;
               console.log(this.values)
            }
            if(item.code =="trade_domain"&&this.componentData.code == "corpDomains"){
              this.corpDomainsA = item.values;
            }
          if(item.code =="trade_domain"&&this.componentData.code == "interestedDomains"){
            this.interestedDomainsA = item.values;
          }
        })
        this.loadDicTreeDta = res.data.data;

      }else{
        Toast("网络出错，请重试")
      }
    })
  },
  methods:{
    selectClick(i){ //选中的下标
        this.selectIndex =i;
    },
    okClick(){ //确定
      if(this.componentData.code=='sex'){
        this.$emit("sex",this.nameValue,this.selectIndex)
      }else if(this.componentData.code=='idType'){
        this.$emit("idType",this.idType,this.selectIndex)
      } else if(this.componentData.code=='mobile1CountryNo'){
        this.$emit("mobile1CountryNo",this.telNum,this.selectIndex)
      } else if(this.componentData.code=='phone1CountryNo'){
        this.$emit("phone1CountryNo",this.telNum,this.selectIndex)
      }else if(this.componentData.code == "gainChannel"){
        this.$emit("gainChannel",this.gainChannel,this.selectIndex)
      }else if(this.componentData.code == "corpDomains"){
        this.$emit("corpDomains",this.corpDomains,this.selectIndex)
      }else if(this.componentData.code == "interestedDomains"){
        this.$emit("interestedDomains",this.interestedDomains,this.selectIndex)
      }

    }
  }
}

</script>

<style scoped lang="less">
#nameValue {
 position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background: url(../../assets/images/bg1.png);
  background-size: 100% 100%;
  background-size: cover;
  padding: 0.2rem;
  box-sizing: border-box;
  z-index: 2;
  .idType{
    width: 100%;
    height: 0.49rem;
    color: #FFFFFF;
    line-height: 0.49rem;
  }
  #one{
    width: 50%;
    float: left;
    height: 0.49rem;
    text-align: center;
    line-height: 0.49rem;
  }
  #two{
    width: 50%;
    float: left;
    height: 0.49rem;
    text-align: center;
    line-height: 0.49rem;
  }
  button{
    outline: none;
    width: 100%;
    background: #72D992;
    border: 0;
    color: #FFFFFF;
    border-radius: 0.08rem;
    outline: none;
    margin-top: 0.15rem;
    height: 0.49rem;
    line-height: 0.49rem;
    text-align: center;
  }
  .input{
    width: 0.16rem;
    height: 0.16rem;
    transform: translateY(0.02rem);
  }
  .label{
    margin-left: 0.15rem;
    color: #FFFFFF;
  }
}
</style>
