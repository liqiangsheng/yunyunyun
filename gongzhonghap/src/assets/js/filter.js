
const vFilter={
  formatTime:function (value) {
        var date = new Date(value);

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '/' + m + '/' + d
    },
    formatTime1:function (value) {
      var nowDate = Date.parse(new Date());
      var date = new Date(value);
      var y1 = date.getFullYear();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      if(nowDate<(value+60000)){
        return second+"秒前"
      }else if(nowDate>(value+60000)&&nowDate<(value+3540000)){
        console.log(minute<"fenzhong")
        return minute+"分钟前"
      }else if(nowDate>(value+3540000)&&nowDate<(value+14160000)){
        return h+"小时前"
      }else if(nowDate>(value+14160000)&&nowDate<(value+86400000)){
        return h+":"+minute
      }else if(nowDate>(value+86400000)&&nowDate<(value+172800000)){
        return "昨天"+h+":"+minute
      }else if(nowDate>(value+172800000)&&nowDate<(value+354600000)){
        return "两天前的"+m+":"+d
      }else{
        return y + '/' + m + '/' + d
      }


    },
  formatTime2:function (value) {
    var nowDate = Date.parse(new Date());
    var date = new Date(value);
    var y1 = date.getFullYear();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    // m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    // d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if(nowDate<(value+60000)){
      return second+"秒前"
    }else if(nowDate>(value+60000)&&nowDate<(value+3540000)){
      return minute+"分钟前"
    }else if(nowDate>(value+3540000)&&nowDate<(value+14160000)){
      return h+"小时前"
    }else if(nowDate>(value+14160000)&&nowDate<(value+86400000)){
      return h+":"+minute
    }else if(nowDate>(value+86400000)&&nowDate<(value+172800000)){
      return "昨天"+h+":"+minute
    }else if(nowDate>(value+172800000)&&nowDate<(value+354600000)){
      return "两天前的"+m+":"+d
    }else{
      return y + '/' + m + '/' + d
    }


  },

  }

export default vFilter
