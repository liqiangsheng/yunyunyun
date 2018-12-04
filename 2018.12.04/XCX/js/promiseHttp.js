
function HomeList(datas, cityArry, formatTime){
  return new Promise((resolve, reject)=>{
    for (let i = 0; i < datas.length; i++) {
      let a = "" + datas.length
      // wx.showModal({
      //   showCancel: false,
      //   title: a,
      //   icon: 'success',
      // })
      datas[i]["stateName"] = "";
      var date = new Date();
      var nowTime = date.getTime();
      if (nowTime >= datas[i]["signStartTime"] && nowTime <= datas[i]["signEndTime"]) {
        datas[i]["stateName"] = "立即报名";
      } else if (nowTime > datas[i]["endTime"]) {
        datas[i]["stateName"] = "已结束";
      } else if (nowTime <= datas[i]["endTime"] && nowTime >= datas[i]["startTime"]) {
        datas[i]["stateName"] = "正在进行";
      } else if (nowTime > datas[i]["signEndTime"] && nowTime < datas[i]["startTime"]) {
        datas[i]["stateName"] = "报名结束";
      } else if (nowTime < datas[i]["signStartTime"]) {
        datas[i]["stateName"] = "报名即将开始";
      } else {
        datas[i]["stateName"] = "";
      }
      datas[i]["startTime"] = formatTime.formatTime(datas[i]["startTime"])
      datas[i]["regionName"] = datas[i]["regionName"] ? datas[i]["regionName"]:"深圳市";
      // for (let a = 0; a < cityArry.length; a++) {
      //   if (cityArry[a]["id"] == datas[i]["regionId"]) {
      //     datas[i]["cityName"] = cityArry[a]["name"]
      //   }
      // }
    }
      resolve(datas)
    })
}

module.exports = {
  HomeList: HomeList
}