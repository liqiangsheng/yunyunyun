<template>
  <div id="login1Box">
    <div class='loginTitle1'><img src='/static/images/zs1.png'/></div>
    <div class="telPhone1">
      <div class='telPhoneImae1'> <img src='/static/images/tel.png'/><span class='add861'>+86</span> </div>
      <div class='telPhoneImae11'><input type='number' @blur='telPhone' placeholder="请输入手机号码" :value='telValue'/></div>
    </div>

    <div class="verificatioCode1">
      <div class='verificatioCodeImage1'><img src='/static/images/code.png'></div>
      <div class='verificatioCodeImage11'><input  @blur='codePsd' placeholder="请输入验证码" :·value='psdValue'/>
        <button @click="ObtainCode" v-if='isShow'>{{code}}</button>
        <button disabled v-else>{{codeNum}}秒</button>
      </div>

    </div>
    <div class='gocegister' @click='gocegister'>
      >去注册
    </div>
    <div class='loginBnt1' click='loginBnt'>
      <button>登录</button>
    </div>
    <div class='loginItem1'>
      <div><span class='loginItem1FZ'>承办单位：</span>深圳市工业设计行业协会</div>
      <div><span class='loginItem1FZ'>联系电话：</span>+86-(0)755-83205121-8042</div>
      <div><span class='loginItem1FZ'>会展地址：</span> 深圳会展中心2号馆 会</div>
      <div><span class='loginItem1FZ'>会展日期：</span>2018年11月5-7日</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
@import "../assets/css/login.css";
</style>
