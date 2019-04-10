import Vue from "vue"
import moment from "moment"

/**
 * 时间过滤器
 */
Vue.filter('moment',function(input,fmtstring){
    if(!input)return "无";
    return moment(input).format(fmtstring);
});
/**
 * 时间过滤器
 */
Vue.filter('noteMode',function(input){
    if(input==0){
        return '标准型'
    }else if(input==1){
        return '海报型'
    }else{
        return '无'
    }

});
/**
 * 性别
 */
Vue.filter('sex',function(input){
    if(input==0){
        return '男'
    }else if(input==1){
        return '女'
    }else{
        return '其他'
    }

});
/**
 * 发布状态
 */
Vue.filter('pubStatu',function(input){
    if(input==false){
        return '未发布'
    }else if(input==true){
        return '发布'
    }else{
        return '草稿'
    }

});
/**
 * 活动状态
 */
Vue.filter('activityState',function(sstartTime,endTime,signStartTime,signEndTime){
    const nowTime = new Date().getTime();
    if(nowTime >signStartTime && nowTime <signEndTime){
         return '立即报名';
    }else if(nowTime < signStartTime){
        return '即将开始';
    }else if(nowTime <= sendTime && nowTime >= sstartTime){
        return '正在进行';
    }else if(nowTime >endTime){
        return '活动结束';
    }else if(nowTime > signEndTime && nowTime < sstartTime){
        return '报名结束';
    }
});

