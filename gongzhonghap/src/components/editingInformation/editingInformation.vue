<template>
  <div id='editingInformationBox'>
      <ul class="editingInformationBoxItem">
        <li v-if="headShow">
          <div class="first">头像</div>
          <div class="last">
            <img class='right' src="/static/images/right.png" alt="">
            <img class="firstimg" :src="headerImg" alt="">
            <!--<input id="upload_file" type="file" class="file-input" accept="image/png,image/jpeg,image/jpg" @change="inputChange"/>-->
            <input class="file-input" id="upload_file" type="file" name="image" accept=“image/*” @change="inputChange"/>
          </div>
        </li>
        <li @click="goName('用户名')">
          <div class="first">用户名</div>
          <div class="last">
            <img class='right' src="/static/images/right.png" alt="">
            <p>{{nameValue}}</p>
            <!--<input type="text" placeholder="请填写用户名" v-model="nameValue">-->
          </div>
        </li>
        <li @click="goName('个人简介')">
          <div class="first">个人简介</div>
          <div class="last">
            <img class='right' src="/static/images/right.png" alt="">
            <p>{{introductionValue}}</p>
            <!--<input type="text" placeholder="请填写个人简介" v-model="introductionValue">-->
          </div>
        </li>
      </ul>
      <ul class="editingInformationBoxItem1">
        <li v-if="userInfo.data.userType=='2'">
          <div class="first">性别</div>
          <div class="last" @click="sexClick"> <img class='right' src="/static/images/right.png" alt=""><span>{{sexMessage}}</span></div>
        </li>
        <li>
          <div class="first">生日</div>
          <div class="last" @click="birthdayClick"> <img class='right' src="/static/images/right.png" alt=""><span>{{birthday}}</span></div>
        </li>
        <li>
          <div class="first">地区</div>
          <div class="last" @click="cityClick"> <img class='right' src="/static/images/right.png" alt=""><span>{{region}}</span></div>
        </li>
      </ul>
      <button @click="okEditClick">确定编辑</button>
      <nameValue v-if="sexShow" :sexShow="sexShow" @sex="sex"></nameValue>
      <City v-if="cityShow" @cityObj="cityObj"></City>
      <InputValue v-if="valueShow" :messageValueInput="messageValueInput" :value="value" @nameValue1="nameValue1" @introductionValue1="introductionValue1"></InputValue>
    <mt-datetime-picker
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {EditingInformationIntall1, EditingInformationIntall,qiniuToken,upImgQiniu,OkEditingInformation} from '../../assets/js/promiseHttp'; //数据
  import {MobileDetect1} from '../../assets/js/Fun'; //数据
  import { Toast } from 'mint-ui';  //弹框
  import nameValue from "./nameValue.vue"
  import City from "./city.vue"
  import InputValue from "./alter/input.vue"
  import { DatetimePicker,Picker } from 'mint-ui';
  import Vue from "vue";
  import * as qiniu from 'qiniu-js'
  import { Indicator } from 'mint-ui';
  Vue.component(DatetimePicker.name, DatetimePicker,Picker.name, Picker);
export default {
  components:{
    nameValue,City,InputValue
  },
  name: 'EditingInformation',
  data(){
    return{
      messageValueInput:"", //传个组件的文字
      headShow:true,// 头像显示
      value:"",
      valueShow:false, //文字框显示
      startDate: new Date(1900), //开始时间
      endDate: new Date(), //开始时间
//      headerImg:"https://pub.qinius.butongtech.com/defult_photo@3x.png", //头像
      headerImg:"/static/images/defultphoto.png", //头像
      introductionValue:"", //简介
      nameValue:"", //名字
      sexMessage:"请选择", //性别
      sexNum:"0", //性别
      sexShow:false, //性别显示
      birthday:"请选择", //生日
      birthdayShow:false, // 生日显示
      region:"请选择",  // 地区
      regionId:"请选择",  // 地区ID
      cityShow:false, //城市数据显示
      qiniuToken:"", //七牛的Token
      token:"", //登录的token
      userId:"", //登录的id
      userInfo:{},
    }
  },
  created(){
//    console.log(MobileDetect1(),"MobileDetect1")
//    console.log(MobileDetect1().version,"version")
//    console.log(MobileDetect1().version.indexOf('R16NW'),"version")

    let data = JSON.parse(localStorage.getItem("userInfo"));
    console.log(data)
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(!!data){
      this.token = data.data.access_token;
      this.userId = data.data.user_id;
      if(data.data.userType == "2"){
        EditingInformationIntall(data.data.user_id,data.data.access_token).then(res=>{
          if(res.data.status==true){
            this.birthday = !!res.data.data.birthday?res.data.data.birthday:"19700101";
            this.region = !!res.data.data.region_name?res.data.data.region_name:"深圳市";
            this.regionId = !!res.data.data.region_id?res.data.data.region_id:"2018042317050430c6a250e4044f94bb4cc074302b789a";
            this.headerImg = !!res.data.data.owner_url?res.data.data.owner_url:"/static/images/defultphoto.png";
            this.nameValue = res.data.data.name;
            this.introductionValue = res.data.data.introduce;
            this.sexNum = !!res.data.data.sex?res.data.data.sex:"0";
            if(res.data.data.sex == "0"){
              this.sexMessage = "男"
            }else {
              this.sexMessage = "女"
            }
          }else{
            Toast("网络异常，请重试")
          }
        })
      }else if(data.data.userType == "1"){
        EditingInformationIntall1(data.data.user_id,data.data.access_token).then(res=>{
          if(res.data.status==true){
            this.birthday = !!res.data.data.birthday?res.data.data.birthday:"19700101";
            this.region = !!res.data.data.region_name?res.data.data.region_name:"深圳市";
            this.regionId = !!res.data.data.region_id?res.data.data.region_id:"2018042317050430c6a250e4044f94bb4cc074302b789a";
            this.headerImg = !!res.data.data.owner_url?res.data.data.owner_url:"/static/images/defultphoto.png";
            this.nameValue = res.data.data.name;
            this.introductionValue = res.data.data.introduce;
            this.sexNum = !!res.data.data.sex?res.data.data.sex:"0";
            if(res.data.data.sex == "0"){
              this.sexMessage = "男"
            }else {
              this.sexMessage = "女"
            }
          }else{
            Toast("网络异常，请重试")
          }
        })
      }

      qiniuToken(data.data.access_token).then(res=>{

        if(res.status==true){
            this.qiniuToken = res.data.upToken
        }else{
          Toast("网络异常，请重试")
      }
      })
    }else{
        Toast("登录异常，请重新登录")
    }



  },
  methods:{
    introductionValue1(v){ //个人简介
      this.introductionValue = v;
      this.valueShow = false
    },
    nameValue1(v){//名字
      this.nameValue = v;
      this.valueShow = false
    },
    goName(v){//打开输入框
      console.log(v)
      if(v==='用户名'){
        this.value = v;
        this.messageValueInput = this.nameValue;
      }else if(v==='个人简介'){
        this.value = v;
        this.messageValueInput = this.introductionValue;

      }
      this.valueShow = true;
    },
    inputChange(event){ //图片上传的事件
//      upImgQiniu(event,this.qiniuToken).then(res=>{
//        this.headerImg = res;
//      })
     //七牛云上传图片
      let mydate = new Date()
      var uuid = "btkjLQS"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
      var file = event.target.files[0];
      var formData = new FormData();
      let url1="https://pub.qinius.butongtech.com";
      let observable  = qiniu.upload(file, uuid+'.jpg', this.qiniuToken)
      let observer= {
        next(res){
//          console.log(res,"上传")
          // ...
        },
        error(err){
//          console.log(res,"错误")
          // ...
        },
        complete(res){
//          console.log(res,"完成")
           return this.headerImg = url1+'/'+res.key;
          // ...
        }
      }
      var subscription = observable.subscribe(observer)
      Indicator.open("头像上传中")
      setTimeout(()=>{
        this.headerImg =subscription.observer.headerImg;
        console.log( this.headerImg," this.headerImg")
        Indicator.close();
      },1000)


    },

    okEditClick(){ //确定编辑
//      console.log(this.headerImg,"dsakdkasdk")
      if(!this.nameValue){
        Toast("姓名不能为空")
        return
      }
      let obj = {};
        obj.birthday= this.birthday;
        obj.regionId= this.regionId;
        obj.ownerUrl= this.headerImg;
        obj.name= this.nameValue;
        obj.remark= this.introductionValue;
        obj.sex= this.sexNum;
        obj.id= this.userId;

      OkEditingInformation(obj,this.token).then(res=>{
          if(res.status==true){
            Toast("编辑成功")
            this.$router.go(-1);
          }else {
            Toast("网络异常，请重试")
          }
      })
    },
    cityObj(v){ //城市的选择
      this.region = v.cityName;
      this.regionId = v.regionId;
      this.cityShow = false;
    },
    cityClick(){ //城市事件
       this.cityShow = true;
    },
    birthdayClick(){//生日事件
      this.$refs.picker.open()
    },
    handleConfirm(data){ //生日时间
      this.birthday = this.$moment(data).format('YYYYMMDD');
    },
    sex(v){ //性别选择
       this.sexShow = false;
       this.sexMessage = v;
    },
    sexClick(){ //性别选择
       this.sexShow = true;
    }
  }
}

</script>

<style scoped lang="less">
  #editingInformationBox{
    width: 100%;
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    overflow-y: auto;
    .editingInformationBoxItem{
      margin-top: 0.15rem;
      background: #FFFFFF;
      li{
        width: 90%;
        margin: 0 auto;
        height: 0.6rem;
        background: #FFFFFF;
        margin-bottom: 0.01rem;
        box-sizing: border-box;
        display: flex;
        border-bottom: 0.01rem solid #EEEEEE;
        .first{
          width: 25%;
          line-height: 0.6rem;
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        .last{
          flex: 1;
          line-height: 0.6rem;
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(5,5,9,1);
          line-height:30px;
          overflow: hidden;
          position: relative;
          .right{
            display: inline-block;
            float: right;
            width: 0.13rem;
            height: 0.18rem;
            margin-top: 0.2rem;
          }
          .firstimg{
            display: inline-block;
            margin-top: 0.1rem;
            width:.4rem;
            height: .4rem;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            float: right;
          }
          p{
            line-height: 0.5rem;
            float: right;
            outline: none;
            height: 100%;
            text-align: right;
           width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          #upload_file{
            position: absolute;
            right: 0;
            top:0;
            z-index: 2;
            width: 1rem;
            height: 0.6rem;
            opacity: 0;
          }
        }
      }
    }
    .editingInformationBoxItem1{
      margin-top: 0.15rem;
      background: #FFFFFF;
      li{
        width: 90%;
        margin: 0 auto;
        height: 0.6rem;
        background: #FFFFFF;
        margin-bottom: 0.01rem;
        box-sizing: border-box;
        display: flex;
        border-bottom: 0.01rem solid #EEEEEE;
        .first{
          width: 25%;
          line-height: 0.6rem;
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        .last{
          flex: 1;
          line-height: 0.6rem;
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(5,5,9,1);
          line-height:30px;
          overflow: hidden;
          .right{
            display: inline-block;
            float: right;
            width: 0.13rem;
            height: 0.18rem;
            margin-top: 0.2rem;
          }
          span{
            display: inline-block;
            float: right;
            outline: none;
            height: 100%;
            text-align: right;
            max-width: 80%;
            line-height: 0.6rem;
          }
        }
      }
    }
    button{
      width: 100%;
      border: 0;
      background: #FFFFFF;
      height: 0.6rem;
      margin-top: 0.15rem;
      outline: none;
    }
  }

</style>
