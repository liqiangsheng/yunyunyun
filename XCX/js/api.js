
function apidmain() {
  var commonUrl = {
    apiDomain1: "http://172.16.0.12:10019",  //登录数据请求url
    apiDomain: "http://172.16.0.12:10020", //ajax数据请求url 
    // apiDomain: "http://172.16.0.54:10020", //ajax数据请求url 
    url: "http://172.16.0.55:8083/#", ////webView
    // url: "https://dcloud.butongtech.com/#", ////webView
    activityEdition:"v1.0",
    systemEdition:"v1.0",
    operationEdition:"v1.0",
    contentEdition:"v1.0",
  }
  // var commonUrl = {
 
  //   apiDomain: "http://172.16.0.54:10020", //ajax数据请求url 
  //   apiDomain1: "http://172.16.0.54:10019",  //登录数据请求url
  //  url: "http://172.16.0.55:8080/#", ////webView
  // url: "https://dcloud.butongtech.com/#", ////webView
  // }
  // var commonUrl = {
  //   apiDomain1: "https://dcloud.butongtech.com:20019",  //登录数据请求url
  //   apiDomain: "https://dcloud.butongtech.com:20020", //ajax数据请求url 
  //   //  url: "http://172.16.0.55:8080/#", ////webView
  //   url: "https://dcloud.butongtech.com/#", ////webView
  //   activityEdition: "v1.0",
  //   systemEdition: "v1.0",
  //   operationEdition: "v1.0",
  //   contentEdition: "v1.0",
  // }
  return commonUrl;
}
module.exports.apidmain = apidmain;