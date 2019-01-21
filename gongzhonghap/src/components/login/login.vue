<template>
  <div id="loginBox">
     <!--<img class='image' src='/static/images/loginBj.png' />-->
    <div class='loginTitle'>{{titleText}}</div>
    <div class="telPhone">
        <div class='telPhoneImae'> <img src='/static/images/tel.png'/><span class='add86'>+86</span> </div>
         <div class="xian"></div>
          <input oninput="if(value.length>11)value=value.slice(0,11)" type='number' @blur='telPhone' placeholder="请输入手机号码" v-model='telValue'/>

    </div>

        <div class="verificatioCode">
          <div class='verificatioCodeImage'><img src='/static/images/code.png'></div>

          <input  @blur='codePsd' oninput="if(value.length>6)value=value.slice(0,6)" type="number" placeholder="请输入验证码" v-model='psdValue'/>
          <div class="xian1"></div>
          <button class="ObtainCode"  @click="ObtainCode" v-if='isShow'>{{code}}</button>
          <button class="ObtainCode"  disabled v-if='!isShow'>{{codeNum}}秒后重新发送</button>
        </div>

        <div class='loginDetail'>
        点击查看 <span @click='loginDetail1(2,"用户协议")'>“用户协议” </span> 和  <span @click='loginDetail1(3,"隐私政策")'>“隐私政策” </span>
        </div>

        <div class='loginBnt' @click='loginBnt'>
           <button>登　录</button>
        </div>
  </div>
</template>

<script>
  import { telCode,login} from '../../assets/js/promiseHttp';
//  import { telCode} from '../../assets/js/promiseHttp';
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  name: 'Login1',
  data(){
    return{
       code: "获取验证码", //默认字
      isShow: true,  //秒倒计时显示
      codeNum: 60,  //60秒
      telValue: "", // 手机号码
      psdValue: "", //密码
      titleText:"与设计相处，使彼此感动",
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
    this.$nextTick(function () {
      document.title = "登录";
    })
  },
  methods:{
      loginDetail1(v,v1){ //协议，隐私
        let obj = {}
        obj.v = v;
        obj.v1= v1;
       localStorage.setItem("messageShow1",JSON.stringify(obj));
       this.$router.push({path:"/message"})
      },
    loginBnt(){ //登录

      setTimeout(()=>{
        var that = this;
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
        login(that.telValue,that.psdValue).then(res=>{

           if(res.data.status==true){
             window.localStorage.setItem("userInfo",JSON.stringify(res.data))
             Indicator.open("正在登录...");
             setTimeout(()=>{
               Indicator.close();
               this.$router.go(-1);//返回上一层
             },1000)

           }else{
             if (res.statusCode == 500) {
               Toast("网络异常，请重试")
              } else if (res.statusCode == 401) {
               Toat("网络异常")
              } else {
               Toast(res.data.message)
              }

           }
        })

      },100)

    },
//    login(tel,psd){  //登录的接口
//      return  new Promise((resolve,reject)=>{
//        let url = `${window.common.apiDomain20020}/apis/operation/sysUserOperation/bindMobile`;
//        let data = {mobile:tel,mobileType:"XCX",verifyCode:psd}
//        this.$Aiox.post(url,data,{ header: {'Content-Type': 'application/json','Accept': 'application/json'}}).then(res=>{
//          resolve(res)
//        })
//      })
//    },
    telPhone(){ //手机失去焦点

    },
    codePsd(){ //密码失去焦点

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
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: url(../../../static/images/loginBj.png);
    background-size:cover ;
    background-size: 100% 100%;
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
        width: 30%;
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
          width:.18rem;
          height: .22rem;
          margin-right: 0.1rem;
          transform: translateY(0.03rem);
        }

      }

        input{
          width: 65%;
          line-height: 0.5rem;
          position: absolute;
          line-height: 0.5rem;
          right: 0.02rem;
          box-sizing: border-box;
          top:0;
          display: block;
           outline: none;
          font-size: 0.14rem;
          text-indent: 0.1rem;
          border: none;
      }
    }
    .verificatioCode{
      width: 90%;
      height: 0.5rem;
      margin: 0.31rem auto;
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
          width: .18rem;
          height: .22rem;
          transform: translateY(0.03rem);
        }
      }
        input{
          width: 45%;
          float: left;
          height: 0.5rem;
          display: block;
          line-height: 0.5rem;
          font-size: 0.14rem;
          outline: none;
          border: none;
        }

      .ObtainCode{
        width: 39%;
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
    .loginDetail{
      width: 100%;
      text-align: center;
      height:.14rem;
      font-size:.13rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:.18rem;
      span{
        color: #050509;
      }
    }
    .loginBnt{
      width: 90%;
      height: .5rem;
      margin: 0 auto;
      margin-top: 0.25rem;

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
