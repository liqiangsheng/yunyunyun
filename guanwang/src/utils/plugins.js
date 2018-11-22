import MonthCalendar from '@/utils/calendar'
import { MessageBox } from 'element-ui';
/*获取指定父级节点*/
export const getParent = (target,sign) =>{
	var targetParent = null;
	sign = sign.toUpperCase();
	loop(target);
	return targetParent;
	function loop(target){
		if(target.parentNode != undefined){
			var parent = target.parentNode;
			if(parent.tagName == sign){
				targetParent = parent;
			}else{
				loop(parent,sign);
			}
		}
	}
}



/*日期格式化 yyyy-MM-dd*/
export const timeFormate = (time) =>{
	if (time.toLocaleDateString) {
        var timeStr = time.toLocaleDateString();
        var timeArr = timeStr.split('/');
        timeArr.map((item,index) =>{
        	if(parseInt(item)<10){
        		item = "0"+item;
        		timeArr[index] = item;
        	}
        });
        timeStr = timeArr.join('-');
        return timeStr;
    } else {
        return time;
    }
}


/*日期格式化 yyyy-MM-dd hh:mm:ss*/
export const formatDate = (date, fmt) => {
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            }
            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + ''
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
                }
            }
            return fmt
        }

/*登陆的缓存*/
global.cache = {
	  get loadDictCache(){
        let obj = {};
        try {
            obj = JSON.parse(localStorage.getItem('loadDictCache'));
            if (!obj) obj = {};
        } catch (e) {
            obj = {};
        }
        return obj;
    },
    get areaObj () {
       let obj = {}
       let areaObj = {}
        try {
            obj = JSON.parse(localStorage.getItem('loadOrgCache'));
            var areaArr = obj.areaList
            areaArr.map(item => {
              areaObj[item.areaId] = item
            })
            if (!areaObj) areaObj = {};
        } catch (e) {
            areaObj = {};
        }
        return areaObj
    },

    get loadOrgCache(){
        let obj = {};
        try {
            obj = JSON.parse(localStorage.getItem('loadOrgCache'));
            if (!obj) obj = {};
        } catch (e) {
            obj = {};
        }
        return obj;
    },
    get userInfo(){
        let obj = {};
        try {
            obj = JSON.parse(localStorage.getItem('userInfo'));
            if (!obj) obj = {};
        } catch (e) {
            obj = {};
        }
        return obj;
    },
    get userResMap(){
        let obj = {};
        try {
            obj = JSON.parse(localStorage.getItem('userResMap'));
            if (!obj) obj = {};
        } catch (e) {
            obj = {};
        }
        return obj;
    }
}


/*日期快捷选择*/
export function getDate (val) {
  if(val === ''){
    val = -1
  }
  switch (val){
    case -1:
    return [new Date(new Date(new Date().toLocaleDateString()).getTime()), new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)]
    break
    case -2:
    var arr = getWeek(0)
    arr[0] = new Date(new Date(new Date(arr[0]).toLocaleDateString()).getTime())
    arr[1] = new Date(new Date(new Date(arr[1]).toLocaleDateString()).getTime()+24*60*60*1000-1)
    return arr
    break
    case -3:
    var arr = getMonth(0)
    arr[0] = new Date(new Date(new Date(arr[0]).toLocaleDateString()).getTime())
    arr[1] = new Date(new Date(new Date(arr[1]).toLocaleDateString()).getTime()+24*60*60*1000-1)
    return arr
    break
    default:
    var dates = new MonthCalendar(new Date().getFullYear(), val)
    var arr = []
    arr.push(new Date(new Date(dates.firstDay).setHours(0,0,0)))
    arr.push(new Date(new Date(new Date(dates.lastDay).toLocaleDateString()).getTime()+24*60*60*1000-1))
    return arr
  }
}


/** AddWeekCount为0代表当前周   为-1代表上一个周   为1代表下一个周以此类推*/
export function getWeek (AddWeekCount) {
  //起止日期数组
    var startStop = new Array();
    //一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    //获取当前时间
    var currentDate = new Date();
    //相对于当前日期AddWeekCount个周的日期
    currentDate = new Date(currentDate.getTime() + (millisecond * 7*AddWeekCount));
    //返回date是一周中的某一天
    var week = currentDate.getDay();
    //返回date是一个月中的某一天
    var month = currentDate.getDate();
    //减去的天数
    var minusDay = week != 0 ? week - 1 : 6;
    //获得当前周的第一天
    var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay));
    //获得当前周的最后一天
     var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
    //添加至数组
    startStop.push(getDateStr3(currentWeekFirstDay));
    startStop.push(getDateStr3(currentWeekLastDay));

    return startStop;
}


/**
* 获得相对当月AddMonthCount个月的起止日期
* AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
* ***/
export function getMonth (AddMonthCount) {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = new Date();
    var month=currentDate.getMonth()+AddMonthCount;
    if(month<0){
        var n = parseInt((-month)/12);
        month += n*12;
        currentDate.setFullYear(currentDate.getFullYear()-n);
    }
    currentDate = new Date(currentDate.setMonth(month));
    //获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    //获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    //获得上一个月的第一天
    var currentMonthFirstDay = new Date(currentYear, currentMonth,1);
    //获得上一月的最后一天
    var currentMonthLastDay = new Date(currentYear, currentMonth+1, 0);
    //添加至数组
    startStop.push(getDateStr3(currentMonthFirstDay));
    startStop.push(getDateStr3(currentMonthLastDay));
    //返回
    return startStop;
}

/**/
function getDateStr3(date) {
    var year = "";
    var month = "";
    var day = "";
    var now = date;
    year = ""+now.getFullYear();
    if((now.getMonth()+1)<10){
        month = "0"+(now.getMonth()+1);
    }else{
        month = ""+(now.getMonth()+1);
    }
    if((now.getDate())<10){
        day = "0"+(now.getDate());
    }else{
        day = ""+(now.getDate());
    }
    return year+"-"+month+"-"+day;
}

/*两个数组遍历，取对应的 v */
export function getData (olist,list, k, v){
  var arr = []
  list.map(item => {
    olist.map(oitem => {
      if(oitem[k] == item){
        arr.push(oitem[v])
      }
    })
  })
  return arr
}

/*删除空属性*/
export function deleteEmpty (obj){
  for(var k in obj){
    if(obj[k] === ''){
      delete obj[k]
    }
  }
}


/*对象转数组*/
export function objResolve (list, obj) {
  var arr = []
  list.map(item =>{
    arr.push(obj[item])
  })
  return arr
}

/*获取片区列表*/
/**
 *
 * @param unShiftAll 是否在数组中插入"全部选项"，allArea 是否获取所有的片区
 * @returns {*}
 */
export function getAreaList (allArea,unShiftAll) {
    let orgId
    let areaList = []
    var userInfo = cache.userInfo.userInfo
    if(userInfo == undefined){
      return []
    }
    if(allArea){
        let area=cache.loadOrgCache.areaList;
        if(unShiftAll){
            area.unshift({areaName:'全部',areaId:''})
        }
        return area
    }
    if(!userInfo.areaId && !userInfo.storeId){
        let area=cache.loadOrgCache.areaList;
        if(unShiftAll){
            area.unshift({areaName:'全部',areaId:''})
        }
      return area

    }
    if(cache.userInfo.userInfo !== undefined){
         orgId = cache.userInfo.userInfo.schoolId
    }
    if(cache.loadOrgCache.areaList !== undefined){
         areaList = cache.loadOrgCache.areaList
    }
    let arr = []
    areaList.map(item => {
    if (item.orgId === orgId) {
      arr.push(item)
    }
    })
    if(unShiftAll){
        arr.unshift({areaName:'全部',areaId:''})
    }
    return arr
}
