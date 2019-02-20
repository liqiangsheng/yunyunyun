<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!!$route.meta.isTrue"/>
    </keep-alive>
    <router-view   v-if="!$route.meta.isTrue"/>
    <!--<router-view />-->
  </div>
</template>

<script>
//  import MobileDetect from 'mobile-detect'
  export default {
  name: 'App',
  data(){
    return{
      Preservation:false,//路由是不是更新每次
    }
  },
  watch:{
    "$route":function (newl,oldl) {
//   console.log(newl,"dsfs")
      if(newl){
        document.title = newl.meta.title;
      }
    }
  },
  created() {
//    https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect](https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect

//    //判断数组中是否包含某字符串
//    Array.prototype.contains = function(needle) {
//      for (i in this) {
//        if (this[i].indexOf(needle) > 0)
//          return i;
//      }
//      return -1;
//    }
//    var ua =window.navigator.userAgent;
//    console.log(ua)
//    var md = new MobileDetect(ua)
//    var model = "";
////    console.log(ua,"手机版本")
//    var md = new MobileDetect(ua);//初始化mobile-detect
//    var os = md.os();//获取系统
//    var model = "";
//    if (os == "iOS") {//ios系统的处理
//      os = md.os() + md.version("iPhone");
//      model = md.mobile();
//    } else if (os == "AndroidOS") {//Android系统的处理
//      os = md.os() + md.version("Android");
//      var sss = ua.split(";");
//      var i = sss.contains("Build/");
//      if (i > -1) {
//        console.log( md.mobile() );          // 'Sony'
//        console.log( md.phone() );           // 'Sony'
//        console.log( md.tablet() );          // null
//        console.log( md.userAgent() );       // 'Safari'
//        console.log( md.os() );              // 'AndroidOS'
//        console.log( md.is('iPhone') );      // false
//        console.log( md.is('bot') );         // false
//        console.log( md.version('Webkit') );         // 534.3
//        console.log( md.versionStr('Build') );       // '4.1.A.0.562'
//        console.log( md.match('playstation|xbox') ); // false
//        model = sss[i].substring(0, sss[i].indexOf("Build/"));
//      }
//    }
//    console.log(model,"model")
//    console.log( os,"model")

    //            ?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim         7牛的缩略图


    //    let Obj = {
//      access_token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbXSwiY29kZSI6MjAwLCJkYXRhIjoiIiwidXNlcl9uYW1lIjoiMTg1NjU4OTAzMDkiLCJtb2JpbGUiOiIxODU2NTg5MDMwOSIsInJvbGVMaXN0IjpbbnVsbF0sIm1lc3NhZ2UiOiIiLCJjbGllbnRfaWQiOiJhY21lIiwidG90YWwiOjAsInVzZXJfaWQiOiIyMDE4MTIxNDA5NTc1MGE0NzNmMWU2NGQ5MTQ1YzJhY2Q3ZTgzNTYwZTQxZDFhIiwic2NvcGUiOlsib3BlbmlkIl0sInVzZXJBY2NvdW50IjoiMTg1NjU4OTAzMDkiLCJuYW1lIjoiMTg1NjU4OTAzMDkiLCJoZWFkZXIiOiJodHRwOi8vcHViLnFpbml1LmJ1dG9uZ3RlY2guY29tL2RlZnVsdF9waG90b0AzeC5wbmciLCJ1c2VyVHlwZSI6IjIiLCJpZCI6IjIwMTgxMjE0MDk1NzUwYTQ3M2YxZTY0ZDkxNDVjMmFjZDdlODM1NjBlNDFkMWEiLCJqdGkiOiI4NTExNGJjMi03ZjQ2LTQyZTYtYTE5Ni0wMjdiM2Q5NmY3NzYiLCJzdGF0dXMiOnRydWV9.kWt6QnDpTdMP2A_a_hAUHUGvOIaWnvaXmxTW88YrjdlxTMdvTJJq0ipj7a3_ZKBoAncTDTQkXkRxR-a2vrwuskoUIazXq9fzTVj8uclkHWlu2bf-h193vTLBDK2vQ1XlBEiPa7O1Tktd96Ud6sPtjqSwwR9PcGZMdl1lmC3QRpLu_JuKjoBJEmTjuFdZAuqdGqkA0klCJwBr8SLcC0Q9FcEhO8-snvSqIfenQlFyPRObr64_BAFc76E_wI3H_BL3TPxwcfM4Q34LCIIEDaFJiAX4LF3hhqQaYAzkvF9LVCH4cfQj3_zLmZyqmUHOWd0_LwlMYEEwpbpgwFfHIJHEoQ",
//    id:"id",
//      refresh_token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbXSwiY29kZSI6MjAwLCJkYXRhIjoiIiwidXNlcl9uYW1lIjoiMTg1NjU4OTAzMDkiLCJtb2JpbGUiOiIxODU2NTg5MDMwOSIsInJvbGVMaXN0IjpbbnVsbF0sIm1lc3NhZ2UiOiIiLCJjbGllbnRfaWQiOiJhY21lIiwidG90YWwiOjAsInVzZXJfaWQiOiIyMDE4MTIxNDA5NTc1MGE0NzNmMWU2NGQ5MTQ1YzJhY2Q3ZTgzNTYwZTQxZDFhIiwic2NvcGUiOlsib3BlbmlkIl0sInVzZXJBY2NvdW50IjoiMTg1NjU4OTAzMDkiLCJhdGkiOiI4NTExNGJjMi03ZjQ2LTQyZTYtYTE5Ni0wMjdiM2Q5NmY3NzYiLCJuYW1lIjoiMTg1NjU4OTAzMDkiLCJoZWFkZXIiOiJodHRwOi8vcHViLnFpbml1LmJ1dG9uZ3RlY2guY29tL2RlZnVsdF9waG90b0AzeC5wbmciLCJ1c2VyVHlwZSI6IjIiLCJpZCI6IjIwMTgxMjE0MDk1NzUwYTQ3M2YxZTY0ZDkxNDVjMmFjZDdlODM1NjBlNDFkMWEiLCJqdGkiOiIwY2QxNzRiMC03NzAxLTRjYzktYWMxNC0wNWExNmFkYWFjNDAiLCJzdGF0dXMiOnRydWV9.KWj3nH0AyPkqdq28NkPk3Pnt6nItyqEfFTKA_UBKDCFHJ2mQ-dA7msDx9Ajx9mXtrjdr0HhhNcUkhGx0y1BKM2yjVsJQei2tsfYbBCHL5QAIFJceXbLUZzP-bU9whDVWVrwt_A2ffqxbVhVz4VKK0R2g8KFDA2o6j-f-OwQ8nS9xwv3ZJ_LXVxtThalhy4UiIOYb-yHsB1wk9ZA9dFOYWcIP-fegAPA5c2PaOgItW_fE2Q0_sGGekHTbV78JjRoyihrrtlX0z2xdHL8Jn-iX3vTLKpB_ZTWmrq4La4-q1u4Oy6-aQRBvsIqDXRMhplO07iY4FC9JX3hRh3GqiJgJkw",
//   name:"name",
//      token_type:"bearer",
//      userType:"2",
//      user_id:"20181214095750a473f1e64d9145c2acd7e83560e41d1a",
//      mobile:"18565890309",
//      jti:"85114bc2-7f46-42e6-a196-027b3d96f776",
//      header:"http://pub.qiniu.butongtech.com/defult_photo@3x.png"
//    }
  },
  methods:{

  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eeeeee;
}
</style>
