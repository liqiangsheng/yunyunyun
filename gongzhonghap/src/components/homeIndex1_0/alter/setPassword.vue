<template>
  <div id="loginBox">
     <!--<img class='image' src='../../../assets/images/loginBj.png' />-->
      <div class="telPhone">
        <div class='telPhoneImae'> <img src='/static/images/tel.png'/><span class='add86'>+86</span> </div>
        <div class="xian"></div>
        <input oninput="if(value.length>11)value=value.slice(0,11)" type='number' placeholder="请输入手机号码" v-model='telValue'/>

      </div>

      <div class="verificatioCode">
        <div class='verificatioCodeImage'><img src='/static/images/code.png'></div>

        <input  oninput="if(value.length>6)value=value.slice(0,6)" type="number" placeholder="请输入验证码" v-model='psdValue'/>
        <div class="xian1"></div>
        <button class="ObtainCode"  @click="ObtainCode" v-if='isShow'>{{code}}</button>
        <button class="ObtainCode"  disabled v-if='!isShow'>{{codeNum}}秒后重新发送</button>
      </div>

    <div class="user_telPhone">
      <div>
        <img src="/static/images/password.png" alt="">
      </div>
      <input type="text" oninput="if(value.length>20)value=value.slice(0,20)"  placeholder="请输入密码" v-model="password">
    </div>

      <div class='loginBnt' @click='loginBnt'>
        <button>确 定 绑 定</button>
      </div>


  </div>
</template>

<script>
  import { sysUserOperationUpdateUserPassword,telCode,bangdingLogin,OkEditingInformation} from '../../../assets/js/promiseHttp';
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  props:['wechatUserInfo'],
  data(){
    return{
       code: "获取验证码", //默认字
      isShow: true,  //秒倒计时显示
      codeNum: 60,  //60秒
      telValue: "", // 手机号码
      psdValue: "", //验证码
      password:"",//密码
      userInfo:{},//登陆的数据
      infoData:{
        "img":"http://pgf8indq4.bkt.clouddn.com/home_banner1.png",
        "tel":"+86-(0)755-83205121-8042",
        "Undertake": "深圳市工业设计行业协会",
        "ActivityTime": "2018年11月5-7日",
        "ActivityArdree": "深圳会展中心2号馆  "
      }//初始数据
    }
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
  },
  methods:{

    loginBnt(){ // 完成
      var that = this;
      let wetachUserInfo = JSON.parse(localStorage.getItem('wetachUserInfo'))
      console.log(wetachUserInfo,"wetachUserInfo")
      setTimeout(()=>{
        if(!that.telValue) {
            Toast( '请填写手机号');
            return
        }else {
          if (!(/^1\d{10}$/.test(this.telValue))) {
            Toast( '手机号码有误！') ;
            return
          }
        }
        if(!that.psdValue) {
          Toast( '请填写验证码');
          return
        }
        if (!that.password) {
          Toast('请填写密码');
          return
        }else{
          var reg = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
          if (!reg.test(that.password)) {
            Toast('密码长度为6-20的数字字母');
            return
          }
        }
        bangdingLogin(that.telValue,that.psdValue,that.wechatUserInfo.openid).then(res=>{

          if(res.data.status == true){
            Toast('恭喜您绑定成功，即将登陆');
            window.localStorage.setItem("userInfo",JSON.stringify(res.data))
//            sysUserOperationUpdateUserPassword(that.telValue,that.psdValue,that.password,res.data.data.access_token).then(res=>{
//              if(res.data.status == true){
//
//              }else{
//                Toast("500修改密码错误！")
//              }
//            })
            setTimeout(()=>{
              let obj = {};
              obj.birthday= "19700101";
              obj.regionId= '2018042317050430c6a250e4044f94bb4cc074302b789a';
//              obj.ownerUrl= wetachUserInfo?wetachUserInfo.headimgurl:'https://pub.qinius.butongtech.com/defultphoto.png';
              obj.ownerUrl= 'https://pub.qinius.butongtech.com/defultphoto.png';
              obj.name= wetachUserInfo?wetachUserInfo.nickname:"微信用户";
              obj.remark= '不同科技欢迎你';
              obj.sex= wetachUserInfo?wetachUserInfo.sex:0;
              obj.id= res.data.data.user_id;
              OkEditingInformation(obj,res.data.data.access_token).then(res=>{
                if(res.status==true){
                  Toast("登录成功")
                  this.$emit('isshow',false)
                }else {
                  Toast("网络异常，请重试")
                }
              })
            },1500)


          }else{
            Toast("绑定失败,请尝试其他登陆方式")
            setTimeout(()=>{
              this.$router.push({path:'/login'})
            },1000)
          }
        })

      },100)

    },


    ObtainCode(){ //获取验证码

     let that = this;
    setTimeout(()=>{
      if (!this.telValue) {

        Toast('请填写手机号')
        return;
      }

        this.isShow= false;
      //请求数据
      telCode(this.telValue).then(res=>{
        if(res.data.status==true){
          if(window.common.apiDomain20020 != "https://dcloud.butongtech.com:20020"){
            console.log(res.data)
            this.psdValue = res.data.data;
            var clearTime = setInterval(function () {
              that.codeNum--;

              if (that.codeNum <= 0) {
                that.psdValue = "";
                clearInterval(clearTime)
                that.code= '重新发送';
                that.codeNum= 60;
                that.isShow= true;
              }
            }, 1000)
          }else {
            var clearTime = setInterval(function () {
              that.codeNum--;
              if (that.codeNum <= 0) {
                clearInterval(clearTime)
                that.code= '重新发送';
                that.codeNum= 60;
                that.isShow= true;
              }
            }, 1000)
          }


        }else{
          Toast("网络错误，请重试")
        }
      });

    },100)

  }
}
}
</script>

<style scoped lang="less">
/*@import "../../assets/css/login.css";*/
  #loginBox{
    position: absolute;
    top: 15%;
    bottom: 15%;
    right: 10%;
    left: 10%;
    background: #ffffff;
    background-size:cover ;
    .loginTitle{
      width: 100%;
      text-align: center;
      height:0.4rem;
      font-size:0.2rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(5,5,9,1);
      line-height:0.35rem;
      margin-top: 1.34rem;
    }
    .telPhone{
      width: 90%;
      height: 0.5rem;
      margin: 0 auto;
      background: #fff;
      margin-top: 0.44rem;
      position: relative;
      .telPhoneImae{
        width: 35%;
        height: 0.5rem;
        float: left;
        padding: 0.1rem;
        box-sizing: border-box;
        line-height: 0.3rem;
        .add86{
          font-size: 0.14rem;
          margin-left: 0.1rem;
        }
        img{
          display: inline-block;
          width: 0.19rem;
          height: 0.25rem;
          margin-right: 0.1rem;
          transform: translateY(0.04rem);
        }

      }

        input{
          width: 60%;
          position: absolute;
          line-height: 0.3rem;
          right: 0.02rem;
          box-sizing: border-box;
          top:0;
          display: block;
           outline: none;
          font-size: 0.14rem;
          text-indent: 0.1rem;
          border: none;
          margin-top: .1rem;
      }
    }
    .verificatioCode{
      width: 90%;
      height: 0.5rem;
      margin: 0 auto;
      margin-top: 0.155rem;
      background: #fff;
      .verificatioCodeImage{
        width: 15%;
        float: left;
        height:0.5rem;
        padding: 0.1rem;
        font-size: 0.14rem;
        box-sizing: border-box;
        img{
          display: inline-block;
          width: 0.19rem;
          height: 0.25rem;
          transform: translateY(0.03rem);
        }
      }
        input{
          width: 39%;
          float: left;
          line-height: 0.3rem;
          display: block;
          margin-top: 0.1rem;
          font-size: 0.14rem;
          outline: none;
          border: none;
        }

      .ObtainCode{
        width: 45%;
        height: 100%;
        float: right;
        font-size: 0.14rem;
        line-height:.5rem;
        padding:0 0.05rem;
        border:none;
        outline: none;
        background: #ffffff;
      }
    }
    .user_telPhone{
      width: 90%;
      margin: 0 auto;
      height: 0.5rem;
      background: #ffffff;
      margin-bottom: 0.16rem;
      margin-top: 0.155rem;
      display: flex;
      >div{
        width: 0.42rem;
        height: 0.5rem;
        box-sizing: border-box;
        overflow: hidden;
        img{
          display: block;
          width: 0.19rem;
          height: 0.25rem;
          margin: 0.12rem auto;
        }
      }
      input{
        flex: 1;
        margin-top: 0.1rem;
        line-height: 0.3rem;
        font-size: 0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        height: 0.3rem;
        outline: none;
        text-indent: 0.1rem;
      }
    }
    .loginBnt{
      width: 90%;
      height: .5rem;
      margin: 0 auto;
      margin-top: .155rem;
      button{
        font-size: 0.16rem;
        border-radius: 0.04rem;
        background-color: #050509;
        color: #fff;
        height: .5rem;
        outline: none;
        width: 100%;
        border: none;
        }
      }
    }

  .xian{
    width: 0.01rem;
    float: left;
    height: 0.2rem;
    margin-top: 0.15rem;
    background: #dcdcdc;
  }
  .xian1{
    width: 0.01rem;
    float: left;
    height: 0.2rem;
    margin-top: 0.15rem;
    background: #dcdcdc;
  }
</style>
