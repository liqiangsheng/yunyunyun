  /**
   * 上传七牛返回key
   */
var apiDomian = require("api.js");
let API = apiDomian.apidmain();

function uploadQiniu(a, b) {
  let qiniuUrl ="";
  let token = a;
  let tempFilePaths = b;
  var that = this;
  wx.uploadFile({
    url: 'https://upload-z2.qiniup.com',
    name: 'file',
    filePath: tempFilePaths[0],
    header: {
      "Content-Type": "multipart/form-data"
    },
    formData: {
      token: token,
    },
    success: function (res) {
      let data = JSON.parse(res.data)
      // to do ...
      console.log(data, "成功111")
      wx.request({  //获取7牛的保存地址
        url: API.apiDomain + '/apis/system/' + API.systemEdition +'/init/loadGlobalVariable',
        method: "GET",
        success(res1) {
          if (res1.data.status == true) {
            let dataUrl = res1.data.data;
            dataUrl.map((item, index) => { //赋值七牛的url
              if (item.code == "qiniu_pub_url") {
                qiniuUrl = item.name + "/" + data.key
              }
            })
       
          } else {
            wx.setStorageSync("faceUrl", "") //面部识别参数
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
     
    },
    fail: function (res) {
      wx.showModal({
        showCancel: false,
        title: "上传失败",
        icon: 'success',
        duration: 2000
      })
    }
  })

}
module.exports.uploadQiniu = uploadQiniu;  //暴露方法