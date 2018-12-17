<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  created() {
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
