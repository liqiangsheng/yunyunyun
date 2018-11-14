<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    let userInfo={
      "status": true,
      "code": 200,
      "total": 1,
      "message": "操作成功",
      "data": {
        "role": [],
        "code": 200,
        "data": "",
        "mobile": "18681508819",
        "token_type": "bearer",
        "roleList": [null],
        "message": "",
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbXSwiY29kZSI6MjAwLCJkYXRhIjoiIiwidXNlcl9uYW1lIjoiMTg2ODE1MDg4MTkiLCJtb2JpbGUiOiIxODY4MTUwODgxOSIsInJvbGVMaXN0IjpbbnVsbF0sIm1lc3NhZ2UiOiIiLCJjbGllbnRfaWQiOiJhY21lIiwidG90YWwiOjAsInVzZXJfaWQiOiIyMDE4MTAyODExMDYyM2E2YzkyMDYxZWMxOTQ0YjdiNzc2NmE5MWRhOTE2N2RkIiwic2NvcGUiOlsib3BlbmlkIl0sInVzZXJBY2NvdW50IjoiMTg2ODE1MDg4MTkiLCJuYW1lIjoi6K6-6K6h5LqRIiwiaGVhZGVyIjoiaHR0cDovL3B1Yi5xaW5pdS5idXRvbmd0ZWNoLmNvbS9kZWZ1bHRfcGhvdG9AM3gucG5nIiwiaWQiOiIyMDE4MTAyODExMDYyM2E2YzkyMDYxZWMxOTQ0YjdiNzc2NmE5MWRhOTE2N2RkIiwianRpIjoiZTUyNmZmM2EtMzc0ZS00MzdmLWI0NTYtZTY1NzhiM2Y4OTVjIiwic3RhdHVzIjp0cnVlfQ.gaWHzARzWXcjlsUz11MntbWZGEAPA9W_tKzUz3GiyZpXEUhS4ODaYK60LcnQLekwdi2y5ZLSHhX0pSpOygXbx-7j_tcK1HxejXvppFQspHkWlYhX-W2vC3nTWhKoN4zJlK4CBzT4XiVpyq8xHY0gAovcp2DwWks8jPWpC-XgbcJoW44aLFhYTITWybozvESzexn22Kh49B2U5Sl6alzIgYUIltc3vREQVwiLdRAag_WqJXi6p8jBTMW4vV95r7N0pnlvZ6RNP1nsmPIN6EMAB91VWY0Mte-hL5mcSQSI4JUJpV5AU-bKL6DOZNeruRqeejAIRA8ngOhv0AcUU5x50Q",
        "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbXSwiY29kZSI6MjAwLCJkYXRhIjoiIiwidXNlcl9uYW1lIjoiMTg2ODE1MDg4MTkiLCJtb2JpbGUiOiIxODY4MTUwODgxOSIsInJvbGVMaXN0IjpbbnVsbF0sIm1lc3NhZ2UiOiIiLCJjbGllbnRfaWQiOiJhY21lIiwidG90YWwiOjAsInVzZXJfaWQiOiIyMDE4MTAyODExMDYyM2E2YzkyMDYxZWMxOTQ0YjdiNzc2NmE5MWRhOTE2N2RkIiwic2NvcGUiOlsib3BlbmlkIl0sInVzZXJBY2NvdW50IjoiMTg2ODE1MDg4MTkiLCJhdGkiOiJlNTI2ZmYzYS0zNzRlLTQzN2YtYjQ1Ni1lNjU3OGIzZjg5NWMiLCJuYW1lIjoi6K6-6K6h5LqRIiwiaGVhZGVyIjoiaHR0cDovL3B1Yi5xaW5pdS5idXRvbmd0ZWNoLmNvbS9kZWZ1bHRfcGhvdG9AM3gucG5nIiwiaWQiOiIyMDE4MTAyODExMDYyM2E2YzkyMDYxZWMxOTQ0YjdiNzc2NmE5MWRhOTE2N2RkIiwianRpIjoiYWYxYjdiOTQtMzZmNS00MDhlLWFkNmMtZTg2NDNlNTQ1ODE1Iiwic3RhdHVzIjp0cnVlfQ.ckLPkLDXbybL0lvjgeH5SE6VVlWbLtzx2JbZOPxbWNzys1QJC8MlsLeBYB-dwSSCmI2BCbuClz9Y-uNnAVQl1A_C6CcDxmbi0qCJwMOFv7nIOTSwe4DHTwxYa3BgJpbvsOuViqnRQkemK3aBrf-1sTc2ZASi0mm1wzn80iH4au2dIrnrOP1T38k30d3KL92PdGqsUDvOXp90IbOLXQGCNm_Tx-7FHo1rX77mroUxWmi8e9GN5CiX3ggGBoeCYNTIrAH2WeoIlVBSLNgbCQyoryHhICiouKhFOECts8AHIbv50UVKJgxgz_Phf_Lud3Zyyc_8GViQFLDOrxsIY5NE7w",
        "total": 0,
        "user_id": "20181028110623a6c92061ec1944b7b7766a91da9167dd",
        "scope": "openid",
        "userAccount": "18681508819",
        "name": "设计云",
        "header": "http://pub.qiniu.butongtech.com/defult_photo@3x.png",
        "id": "20181028110623a6c92061ec1944b7b7766a91da9167dd",
        "jti": "e526ff3a-374e-437f-b456-e6578b3f895c",
        "status": true
      },
      "encode": true,
      "exceptionClass": null
    }
    localStorage.setItem("userInfo",JSON.stringify(userInfo)) //模拟登录
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
