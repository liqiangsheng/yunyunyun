<template>
  <div class="login-container">
    <div id="loginBox">
      <div class="box-left">
        <div class="loginImage ">
          <img src="../../assets/images/login/login-img.png" width="100%" height="100%"/>
        </div>
        <div class="copyright">Copyright©2016 Lilixc.com,All Rights Reserved</div>
      </div>
      <div class="box-right">
        <div class="loginLogo">
          <img src="../../assets/images/login/loginLogo.png" width="100%" height="100%"/>
        </div>
        <div>
          <el-form :inline="true" :model="loginForm" ref="loginForm"  class="demo-form-inline" autoComplete="off">
            <el-form-item prop="username" :rules="filter_rules({required:true})" class="contentBox ">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"  placeholder="请输入用户名" prefix-icon="icon1"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="filter_rules({required:true})" class="contentBox inputTop">
              <el-input name="password"  type="password" v-model="loginForm.password"  placeholder="请输入密码" prefix-icon="icon2"></el-input>
            </el-form-item>
            <el-row :span="24">
              <el-col :span="12">
                <el-form-item prop="verifyCode"  :rules="filter_rules({required:true})" class="verificationBox inputTop">
                  <el-input  type="text" v-model="loginForm.verifyCode"  placeholder="请输入验证码" ></el-input>
                </el-form-item>
              </el-col>
              <img :src="loginForm.imageCode" alt="" class="verificationImg inputTop" @click="refresh" :key="loginForm.refreshImg" style="border:1px solid #c1c1c1">
              <!--<el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>-->
            </el-row>
            <el-row :span="24" class="btnBox">
              <el-col :span="24" class="contentBox">
                <el-form-item >
                  <el-button native-type="submit" type="primary" id="loginBtn"  :loading="loading"  class="btn-active" @click.native.prevent="handleLogin('loginForm')">登 &nbsp 录</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { isWscnEmail } from '@/utils/validate';
    import { verification } from '@/api/login'
    import router from '../../router'
    export default {
        data() {
            return {
                loginForm: {
                    grant_type:'password',
                    username: '',
                    password: '',
                    verifyCode:'',
                    refreshImg:0,
                    imageCode:'',
                    key:''
                },
                checked:false,
                loading: false,
            }
        },
        methods: {
            valiCodea(){
                this.loginForm.verifyCode = '';
                verification().then(res=>{
                    if(res.data.status){
                        this.loginForm.imageCode = res.data.data.image;
                        this.loginForm.key = res.data.data.key;
                    }
                })
            },
            refresh(){
                this.loginForm.refreshImg++;
                this.valiCodea();
            },
            handleLogin: function (formName) {
                this.loading = true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        /* if(this.checked===true){
                             //传入账号名，密码，和保存天数3个参数
                             this.setCookie(this.loginForm.username,this.loginForm.password,7);
                         }else{
                             this.clearCookie();
                         }*/
                        this.$store.dispatch('Login', this.loginForm).then((res) => {
                            if (res.data.status) {
                                this.$store.dispatch('GetInfo').then(res => {
                                    if (res.data.status) {
                                        this.$message({
                                            message: '登录成功',
                                            type: 'success'
                                        });

                                        this.$store.dispatch('GenerateRoutes', res.data.data.userInfo).then(() => {
                                            router.addRoutes(this.$store.getters.addRouters);
//                                            //登录处理 如果有“首页路由权限”跳首页，如果没有跳“欢迎页面”
                                            let addRouters = this.$store.getters.addRouters;
                                            console.log(addRouters,"carter")
                                            for (let j = 0; j < addRouters.length; j++) {
                                                if (addRouters[j].path === "/workbench") {
                                                    console.log(addRouters[j].path ,"asdasjkdk")
                                                    for (let i = 0; i < addRouters[j].children.length; i++) {
                                                        if (addRouters[j].children[i].id === 'home') {
                                                            this.$router.push({path: '/'});
                                                            break
                                                        } else {
                                                            this.$router.push({path: '/welcome'});
                                                        }
                                                    }
                                                    break
                                                } else {
                                                    console.log (1111111)
                                                    this.$router.push({path: '/welcome'});
                                                    break
                                                }
                                            }
                                        })
                                    } else {
                                        this.loading = false;
                                        this.loginForm.refreshImg++;
                                        this.valiCodea()
                                    }
                                })
                            } else {
                                this.loading = false;
                                this.loginForm.refreshImg++;
                                this.valiCodea()
                                this.$message.warning(res.data.message);
                            }
                        }).catch((res) => {
                            // this.$message.error('登录失败，请联系管理员');
                            this.loading = false;
                            this.loginForm.refreshImg++;
                            this.valiCodea()
                        });
                    } else {
                        this.$message.warning('请输入必填项！');
                        this.loading = false;
                        return false;
                    }
                });
            },
            //记住密码
          //设置cookie
       /*     setCookie(c_name,c_pwd,exdays) {
                let exdate=new Date();//获取时间
                exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
                //字符串拼接cookie
                window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
                window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
            },
            //读取cookie
            getCookie () {
                if (document.cookie.length>0) {
                    this.checked = true;
                    let arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                    for(let i=0;i<arr.length;i++){
                        let arr2=arr[i].split('=');//再次切割
                        //判断查找相对应的值 this.loginForm.username,this.loginForm.password
                        if(arr2[0]==='userName'){
                            this.loginForm.username=arr2[1];//保存到保存数据的地方
                        }else if(arr2[0]==='userPwd'){
                            this.loginForm.password=arr2[1];
                        }
                    }
                }else{
                    this.checked = false;
                }
            },
            //清除cookie
            clearCookie () {
                this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
            }*/
        },
        mounted(){
           // this.getCookie()
           this.valiCodea()
            let _this = this;
            document.onkeydown=function(e){
                let keycode=document.all?event.keyCode:e.which;
                if(keycode === 13){
                    _this.handleLogin('loginForm')
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
  .login-container{
    height: 100vh;
    background:#f4f6f7 url("../../assets/images/login/bg-img.png") no-repeat;
    background-size:100% 100%;
    position: relative;
    .loginTitle{
      font-family:MicrosoftYaHei;
      font-size:30px;
      color:#999999;
      margin-top: 20px;
      text-align: center;
    }
    //遮罩
    /*&:before{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }*/
  }
  #loginBox{
    padding: 37px;
    box-sizing: border-box;
    width: 800px;
    height: 450px;
    background:#ffffff;
    margin:auto;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.19);
    border-radius:8px;
  }
  .contentBox{
    text-align: center;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
    }
    .el-input__inner{
      display: inline-grid;
      width:291px;
      height:42px;
      background:#ffffff;
      border:1px solid #c1c1c1;
      border-radius:8px;
      font-size:14px;
      color:#333333;
      font-family:MicrosoftYaHei;
    }
  }
  .verificationBox{
    margin-left: 27px;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
    }
    .el-input__inner{
      display: inline-grid;
      //=width:125px;
      height:42px;
      background:#ffffff;
      border:1px solid #c1c1c1;
      border-radius:8px;
      font-size:14px;
      color:#333333;
      font-family:MicrosoftYaHei;
      margin-top: 0;
    }
  }
  .inputTop{
    margin-top: 29px;
  }
  .titleTip{display: inline-block;margin-left: 45px;font-size:14px; color:#666666;}
  .usernameBox{margin-top: 25px;}
  .passwordBox{margin-top: 20px;}
  .verificationImg{
    width: 138px;
    height: 38px;
    display: inline-block;
    cursor: pointer;
    margin-left: -20px;
    border-radius: 8px;
  }

  .btnBox{
    margin-top: 20px;
    #loginBtn{
      border: none;
      background: linear-gradient(-55deg, #40D2DE 0%,#41BDC7 98%);
      //linear-gradient(-55deg, #40D2DE 0%,#41BDC7 98%)
      border-radius:10px;
      width:291px;
      height:42px;
      font-size:16px;
      color:#ffffff;
    }
    #loginBtn:hover{
      border: none;
      background: linear-gradient(-55deg, #4af1ff 0%,#41BDC7 98%);
    }
  }
  //new
  .box-left{
    float: left;
    margin: 42px 0;

  }
  .box-right{
    float: left;
    width: 344px;
    text-align: center;
  }
  .loginImage{
    width: 382px;
    display: inline-block;
  }
  .loginLogo{
    width: 315px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .el-form--inline .el-form-item{
    display: block;
    margin-right: 0;
  }
  //记住密码
  .remember{
    bottom: 20px;
    margin-left: 5px;
  }
  .icon1{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 12px 0 0 2px;
    background: url("../../assets/images/login/icon1.jpg") no-repeat;
    background-size: 100%;
  }
  .icon2{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 12px 0 0 2px;
    background: url("../../assets/images/login/icon2.jpg") no-repeat;
    background-size: 100%;
  }
  .copyright{
    font-size: 12px;
    color: #d3d3d3;
    text-align: center;
    margin-top: 20px;
    }
</style>


