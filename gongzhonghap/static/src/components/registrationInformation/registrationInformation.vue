<template>
  <div id="registrationInformation">
      <div class="registrationInformationBox">
            <ul class="required">
              <li class="requiredItem">基本信息(必填)</li>
              <li v-for="(item,index) in listData" v-if="item.allowEmpty == false" class="requiredItem1">
                <span>{{item.displayName}}</span>
                <div @click="choiceClick(item.displayName)" class="requiredItem1Index" v-if="item.code == 'sex'||item.code == 'mobile1CountryNo'||item.code == 'idType'||item.code == 'sex'||item.code == 'regionId'||item.code == 'corpDomains'||item.code == 'interestedDomains'||item.code == 'gainChannel'">
                  请选择
                  <img src="/static/images/right.png" alt="">
                </div>
                <input  :placeholder="'请填写'+item.displayName" v-else/>

              </li>
            </ul>
            <ul class="Norequired">
              <li class="NorequiredItem">其他信息(可选填)</li>
              <li v-for="(item,index) in listData" v-if="item.allowEmpty == true" class="NorequiredItem1">
                <span>{{item.displayName}}</span>
                <div  @click="choiceClick(item.displayName)" class="NorequiredItem1Index" v-if="item.code == 'sex'||item.code == 'mobile1CountryNo'||item.code == 'idType'||item.code == 'sex'||item.code == 'regionId'||item.code == 'corpDomains'||item.code == 'interestedDomains'||item.code == 'gainChannel'">
                  请选择
                  <img src="/static/images/right.png" alt="">
                </div>
                <input :placeholder="'请填写'+item.displayName" v-else/>
              </li>

            </ul>
      </div>
    <div class="boxFoot" @click="nextClick">
        下一步
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {loadDicTree,findByVersionToClient} from "../../assets/js/promiseHttp"  //数据
export default {
  name: 'registrationInformation',
  components:{

  },
  data(){
    return{
       userInfo:"", //登录信息
      loadDicTreeDta:[], //字典数据
      listData:JSON.parse(sessionStorage.getItem("findByVersionToClient")), //数据
      activityId:{}, //活动id
      userId:{}, //用户id
    }
  },
  watch:{
  },
  created(){
    console.log(this.listData,"数据")
    this.listData.forEach((item,index)=>{
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
    if(!!this.userInfo ){
      loadDicTree().then(res=>{
        console.log(res,"字典")
          if(res.data.status == true){
             this.loadDicTreeDta = res.data;
          }else{
            Toast("网络出错，请重试")
          }
      })


    }else{
      Toast("登录异常，请重新登录")
    }

  },
  methods:{
    nextClick(){ //下一步

    },
    choiceClick(v){ //点击的请选择

    }
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
      background:rgba(5,5,9,1);
      font-size:0.13rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      text-align: center;
      line-height: 0.49rem;
      color: #FFFFFF;
    }
  }

</style>
