/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@qq\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/* 手机号码 */
export function mobile(str) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return reg.test(str);
}

/* 只能中文 */
export function onlyChinese(str) {
    const reg = /[^\u4e00-\u9fa5]/;
    return reg.test(str);
}

/* 只能中文和字母 */
export function onlyChineseLetter(str) {
    const reg = /^[\u0391-\uFFE5A-Za-z]+$/;
    return reg.test(str);
}


/* 只能数字*/
export function onlyNumber(str) {
    const reg = /[^0-9.]/g;
    return reg.test(str);
}

/* 字母或者数字 */
export function letterNumber(str) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(str);
}

/* 保留两位小数 */
export function validateMoneyNumber(str) {
    const reg = /^[-+]?\d*[.]?\d{0,2}$/;
    // const reg= /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
    return reg.test(str);
}

/* 保留两位小数 */
export function validateQQ(str) {
    const reg = /^[1-9][0-9]{4,9}$/;
    return reg.test(str);
}

/* 不能有非法字符 */
export function validateSymbol(str) {
    const reg = /[@#\$%\^&\*]+/g;
    return reg.test(str);
}

/* 整数 */
export function integer(str) {
    const reg = /^[0-9]+$/;
    return reg.test(str);
}

/* 银行卡 */
export function luhmCheck(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9

    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
            else
                arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }

    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhm= 10-k;

    if(lastNum==luhm && lastNum.length != 0){
        return true;
    }
    else{
        return false;
    }
}

export function lengthCheck (rule, value, callback){
    if (value !== '') {
      if(value.length>30){
        callback(new Error('长度不能大于二十'));
      }
    } else {
      callback();
    }
 };
 
export function olnyNumber (rule, value, callback) {
  if(isNaN(value)){
    return callback(new Error('此项必须为数字值'));
  }else{
    return callback()
  }
}

