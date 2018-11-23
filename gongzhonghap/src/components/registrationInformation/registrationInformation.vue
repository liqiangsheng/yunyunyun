<template>
  <div id="registrationInformation">
      <div class="registrationInformationBox">
            <ul class="required">
              <li class="requiredItem">基本信息(必填)</li>
              <li v-for="(item,index) in listData" v-if="item.allowEmpty == false" class="requiredItem1">
                <span>{{item.displayName}}</span>
                <div @click="choiceClick(item.displayName,item)" class="requiredItem1Index" v-if="item.code == 'sex'||item.code == 'mobile1CountryNo'||item.code == 'idType'||item.code == 'sex'||item.code == 'regionId'||item.code == 'corpDomains'||item.code == 'interestedDomains'||item.code == 'gainChannel'||item.code == 'phone1CountryNo'">
                  {{item.messageName}}
                  <img src="/static/images/right.png" alt="">
                </div>
                <input  :placeholder="'请填写'+item.displayName" v-else v-model="item.value"/>

              </li>
            </ul>
            <ul class="Norequired">
              <li class="NorequiredItem">其他信息(可选填)</li>
              <li v-for="(item,index) in listData" v-if="item.allowEmpty == true" class="NorequiredItem1">
                <span>{{item.displayName}}</span>
                <div  @click="choiceClick(item.displayName,item)" class="NorequiredItem1Index" v-if="item.code == 'sex'||item.code == 'mobile1CountryNo'||item.code == 'idType'||item.code == 'sex'||item.code == 'regionId'||item.code == 'corpDomains'||item.code == 'interestedDomains'||item.code == 'gainChannel'||item.code == 'phone1CountryNo'">
                  {{item.messageName}}
                  <img src="/static/images/right.png" alt="">
                </div>
                <input :placeholder="'请填写'+item.displayName" v-else v-model="item.value"/>
              </li>

            </ul>
      </div>
    <div class="boxFoot" @click="nextClick">
        下一步
    </div>
    <nameValue v-if="selectShow" @sex="sex" :componentData="componentData" :corpDomainsArr="corpDomainsArr" :interestedDomainsArr="interestedDomainsArr" @idType="idType" @mobile1CountryNo="mobile1CountryNo" @phone1CountryNo="phone1CountryNo" @gainChannel="gainChannel" @corpDomains="corpDomains" @interestedDomains="interestedDomains"></nameValue>
    <City v-if="cityShow"  @cityObj="cityObj"></City>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {loadDicTree,findByVersionToClient} from "../../assets/js/promiseHttp"  //数据
  import nameValue from "./nameValue.vue" //请选择
  import City from "../../components/editingInformation/city.vue" //城市
export default {
  name: 'registrationInformation',
  components:{
    nameValue,City
  },
  data(){
    return{
       selectShow:false,  //请选择显示
       cityShow:false,  //城市显示
       userInfo:"", //登录信息
      loadDicTreeDta:[], //字典数据
      listData:JSON.parse(sessionStorage.getItem("findByVersionToClient")), //数据
      activityId:{}, //活动id
      userId:{}, //用户id
      componentData:{}, //传给组件的东西
    corpDomainsArr:[],//公司的领域
      interestedDomainsArr:[],//感兴趣的领域
  }
  },
  watch:{
  },
  created(){
    this.$nextTick(function () {
      document.title = "报名活动资料填写";
    })

    this.listData.forEach((item,index)=>{
      item.messageName = "请选择";
      if(item.code == "activityId"){
        this.activityId = item;
        this.listData.splice(index,1)
      }


    })
    this.listData.forEach((item,index)=>{
      if(item.code == "userId"){
        this.userId = item;
        this.listData.splice(index,1)
      }
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(!this.userInfo ){
      Toast("登录异常，请重新登录")
    }

  },
  methods:{
    nextClick(){ //下一步

      for (let index=0;index<this.listData.length;index++){ //必填拦截
        if(this.listData[index].allowEmpty == false){
          if(!this.listData[index].value||this.listData[index].value == ""){
            Toast(this.listData[index].displayName+"为必填项");
            return;
          }
        }
      }
      this.listData= [...this.listData,this.activityId,this.userId];
      sessionStorage.setItem("RegistrationData",JSON.stringify(this.listData));
      this.$router.push({path:"/IntelligentMatching"})

    },
    choiceClick(v,v1){ //点击的请选择
        console.log(v,v1)
        console.log(v1.code,"dahkdfkask")
      if(v1.code =='regionId'){ //城市
          this.cityShow = true;
      }else {
        this.componentData = v1;
        this.selectShow = true;
      }


    },
    corpDomains(v,i){ //公司的领域
      this.selectShow = false;
      this.listData.forEach((item,index)=> {
        if (item.code == "corpDomains") {
          if(v.length>0){
            item.messageName = "已选择";
            item.value = v;
            this.corpDomainsArr=v;//公司的领域
          }else {
            item.messageName = "请选择";
            item.value = "";
          }

        }
      })


    },
    interestedDomains(v,i){ //感兴趣的领域
      this.selectShow = false;
      this.listData.forEach((item,index)=> {
        if (item.code == "interestedDomains") {
          if(v.length>0){
            item.messageName = "已选择";
            item.value = v;
            this.interestedDomainsArr=v;//感兴趣的领域
          }else {
            item.messageName = "请选择";
            item.value = "";
          }
        }
      })
    },
    gainChannel(v,i){//获取的渠道
      this.selectShow = false;
      this.listData.forEach((item,index)=> {
        if (item.code == "gainChannel") {
          item.messageName = v;
          item.value = i;
        }
      })
    },
    phone1CountryNo(v,i){ //。电话国家号
      this.selectShow = false;
      this.listData.forEach((item,index)=> {
        if (item.code == "phone1CountryNo") {
          item.messageName = v;
          item.value = v;
        }
      })
    },

    mobile1CountryNo(v,i){ //手机国家号
      this.selectShow = false;
      this.listData.forEach((item,index)=> {
        if (item.code == "mobile1CountryNo") {
          item.messageName = v;
          item.value = v;
        }
      })
    },
    idType(v,i){ //省份证
      this.selectShow = false;
      this.listData.forEach((item,index)=>{
        if(item.code =="idType"){
          console.log(v)
          console.log(i)
          item.messageName = v;
          item.value = i;
        }
      })
    },
    sex(v,i){ //性别选择
      this.selectShow = false;
      this.listData.forEach((item,index)=>{
        if(item.code =="sex"){
           item.messageName = v;
           if(item.messageName=="男"){
                item.value = "0"
           }else{
             item.value = "1"
           }
        }
      })

    },
    cityObj(v){ //城市选择
      this.cityShow = false;
      this.listData.forEach((item,index)=> {
        if (item.code == "regionId") {
          item.messageName = v.cityName;
          item.value = v.regionId;
        }
      })
    },
  }
}

</script>

<style scoped lang="less">
  #registrationInformation{
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    position: absolute;
    .registrationInformationBox{
      position: absolute;
      left: 0;
      top:0;
      bottom:0.5rem;
      right: 0;
      overflow-y: auto;
      overflow-x: hidden;
      .required{
        width: 100%;
        .requiredItem{
          width: 100%;
          padding-left:0.15rem ;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(149,149,149,1);
        }
        .requiredItem1{
          width: 100%;
          height: 0.49rem;
          margin-bottom: 0.01rem;
          background: #FFFFFF;
          line-height: 0.49rem;
          padding: 0 0.15rem;
          box-sizing: border-box;
          overflow: hidden;
          span{
            font-size:0.14rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
          input{
            display: inline-block;
            float: right;
            text-align: right;
            outline: none;
            height: 100%;
          }
          .requiredItem1Index{
            display: inline-block;
            min-width:2.4rem ;
            float: right;
            height: 100%;
            text-align: right;
            img{
              display: inline-block;
              width: 0.13rem;
              height: 0.19rem;
              transform: translateY(0.03rem);

            }
          }
        }
      }
        .Norequired {
          width: 100%;
          margin-bottom: 0.15rem;
          .NorequiredItem {
            width: 100%;
            padding-left: 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(149, 149, 149, 1);
          }
          .NorequiredItem1{
            width: 100%;
            height: 0.49rem;
            margin-bottom: 0.01rem;
            background: #FFFFFF;
            line-height: 0.49rem;
            padding: 0 0.15rem;
            box-sizing: border-box;
            overflow: hidden;
            span{
              font-size:0.14rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
            }
            input{
              display: inline-block;
              float: right;
              text-align: right;
              outline: none;
              height: 100%;
            }
            .NorequiredItem1Index{
              display: inline-block;
              min-width: 2rem;
              text-align: right;
              float: right;
              height: 100%;
              img{
                display: inline-block;
                width: 0.13rem;
                height: 0.19rem;
                transform: translateY(0.03rem);

              }
            }
          }
        }
    }
    .boxFoot{
      width: 100%;
      height: 0.49rem;
      position: absolute;
      left: 0;
      bottom: 0;
      background:#21CB61;
      font-size:0.13rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      text-align: center;
      line-height: 0.49rem;
      color: #FFFFFF;
    }
  }

</style>
