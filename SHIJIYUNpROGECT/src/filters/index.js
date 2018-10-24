function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

//let localStorage = require('storejs');
let orgMap = {};
let loadDictCache ={};
let learnProgress={};
console.log(JSON.parse(localStorage.getItem("loadOrgCache")),"adasda")
if(window.localStorage.getItem("loadOrgCache")){
    orgMap =JSON.parse(localStorage.getItem("loadOrgCache")).orgMap;
}
if(window.localStorage.getItem("loadDictCache")){
    loadDictCache = JSON.parse(localStorage.getItem("loadDictCache"));
}
if(window.localStorage.getItem("loadDictCache")){
    learnProgress = JSON.parse(localStorage.getItem("loadDictCache")).learn_driver_progress;
}
export function parseArea(id) {     //片区
    if(orgMap){
        if(orgMap[id]){
            return orgMap[id];
        }else{
            return id
        }
    }else{
        return id
    }
}
export function parseStore(id) {    //门店
    if(orgMap){
        if(orgMap[id]){
            return orgMap[id];
        }else{
            return id
        }
    }else{
        return id
    }
}
export function parseProgress(id) {    //学车进度
    if(learnProgress){
        if(learnProgress[id]){
            return learnProgress[id];
        }else{
            return id
        }
    }else{
        return id
    }
}
export function parseInspectionType(v) {
    if(loadDictCache.inspection_type){
        return loadDictCache.inspection_type[v];
    }else{
        return v
    }
}

export function parseLearnDriverProgress(v) {
    if(loadDictCache.learn_driver_progress){
        return loadDictCache.learn_driver_progress[v];
    }else{
        return v
    }
}

export function parseCertMenu(v) {  //学车进度
    if(loadDictCache.cert_menu){
        return loadDictCache.cert_menu[v];
    }else{
        return v
    }
}

export function parsePayTableType(v) {      //交表类型
   if(loadDictCache.pay_table_type){
       return loadDictCache.pay_table_type[v];
   }else{
       return v
   }
}
export function parseBankWaterType(v) {      //交表类型
    if(loadDictCache.bank_water_type){
        return loadDictCache.bank_water_type[v];
    }else{
        return v
    }
}

export function national(v) {      //国籍
    if(loadDictCache.national){
        return loadDictCache.national[v];
    }else{
        return v
    }
}



export function parsePayTableState(v) {     //状态
    if(v === '0'){
        return '待处理'
    }else if(v === '1'){
        return '处理中'
    }else if(v === '2'){
        return '已完成'
    }else{
        return v
    }
}

export function parsePayState(v) {  //付款状态
  let state = loadDictCache.pay_state[v]
  return state? state: '无';
}

export function parseMoney(v) {  //金额
    if (v===null||v===''){
        return '0.00';
    }else return v;
}

export function parseExamGrade(v) {  //考试成绩
    if(loadDictCache.exam_grade){
        return loadDictCache.exam_grade[v];
    }else{
        return v
    }
}

export function supervisionType(v) {  //资金监管办证
    if(loadDictCache.supervision_type){
        return loadDictCache.supervision_type[v];
    }else{
        return v
    }
}

export function payer(v) {  //资金监管办证
    if(loadDictCache.payer){
        return loadDictCache.payer[v];
    }else{
        return v
    }
}

export function parseExamProject(v) {  //考试科目
    if(loadDictCache.exam_project){
        return loadDictCache.exam_project[v];
    }else{
        return v
    }
}

export function goodsUnitUsage(v) {  //用途分类
    if(loadDictCache.goods_unit_usage){
        return loadDictCache.goods_unit_usage[v];
    }else{
        return v
    }
}



/**营销start**/
export function parseClassHighFlag(v){  // 高端班属性
    if(loadDictCache.market_class_high_flag){
        return loadDictCache.market_class_high_flag[v];
    }else{
        return v
    }
}
export function parseClassLocalFlag(v){  // 班别地域属性
    if(loadDictCache.market_class_local_flag){
        return loadDictCache.market_class_local_flag[v];
    }else{
        return v
    }
}
export function parseClassStudyType(v){  // 学车形式
    if(loadDictCache.market_class_study_type){
        return loadDictCache.market_class_study_type[v];
    }else{
        return v
    }
}
export function parseGoodsAttribute(v){  // 商品属性
    if(loadDictCache.market_goods_attribute){
        return loadDictCache.market_goods_attribute[v];
    }else{
        return v
    }
}
export function toDecimal2(x) { // 强制转换为小数后两位
    if(isNaN(x)) return x;
    if (x==='' || x===null || x===undefined) {
       x = parseFloat(0);
    }
    let f = parseFloat(x);
    if (isNaN(f)) {
        return 0.00;
    }
    f = Math.round(x*100)/100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
/**营销end**/

export function notNull(v){  // 非空判断
    return v? v:'-';
}

export function parseTime(time, cFormat) {
    if(time===null||time===''||time==='-'){
        return '-'
    }
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || ''
  })
  return time_str
}

/**
 * 获取年月日
 * @param date
 * @returns {string}
 */
export function getDay(date){
    if(date==='-' || date==null ||date === ''){
        return '-'
    }
    return new Date(date).toLocaleDateString();
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

