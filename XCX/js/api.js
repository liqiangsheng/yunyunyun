
function apidmain() {
  var commonUrl = {
    apiDomain1: "http://172.16.0.12:10019",  //登录数据请求url
    apiDomain: "http://172.16.0.12:10020", //ajax数据请求url 
   
  }
  // var commonUrl = {
   
  //   apiDomain: "http://172.16.0.54:10020", //ajax数据请求url 

  //   apiDomain1: "http://172.16.0.54:10019",  //登录数据请求url
  // }
  // var commonUrl = {
  //   apiDomain1: "https://dcloud.butongtech.com:20019",  //登录数据请求url
  //   apiDomain: "https://dcloud.butongtech.com:20020", //ajax数据请求url 

  // }
  return commonUrl;
}
module.exports.apidmain = apidmain;