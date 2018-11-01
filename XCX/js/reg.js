function phone(value) { //正则判断手机号码1
  let msg = /^1[3456789]\d{9}$/;
  if (msg.test(value) == false) {
    wx.showModal({
      showCancel: false,
      title: "手机号码有误",
      icon: 'success',
    })
    return;
  }
}
function ID(value){
  let regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (regex.test(value) == false) {
    wx.showModal({
      showCancel: false,
      title: "身份证号码有误!请输入15位或者18位正确身份证号码",
      icon: 'success',
    })
  }

}
module.exports = {
  phone, ID
} 
