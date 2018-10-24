import { Message } from 'element-ui'
const port = window.location.port
export function needCLodop () {
  try {
    var ua = navigator.userAgent;
    if(ua.match(/Windows\sPhone/i) != null) return true;
    if(ua.match(/iPhone|iPod/i) != null) return true;
    if(ua.match(/Android/i) != null) return true;
    if(ua.match(/Edge\D?\d+/i) != null) return true;

    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if((verTrident == null) && (verIE == null) && (x64 !== null))
      return true;
    else
    if(verFF !== null) {
      verFF = verFF[0].match(/\d+/);
      if((verFF[0] >= 42) || (x64 !== null)) return true;
    } else
    if(verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/);
      if(verOPR[0] >= 32) return true;
    } else
    if((verTrident == null) && (verIE == null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if(verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/);
        if(verChrome[0] >= 42) return true;
      };
    };
    return false;
  } catch(err) {
    return true;
  };
 
}

 installLodop()
function installLodop () {
  if(needCLodop()) {
    let testData = needCLodop()
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript = document.createElement("script");
    // oscript.src ="http://192.168.91.228:8000/CLodopfuncs.js?priority=1";
    oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
    head.insertBefore(oscript, head.firstChild);
  
    //引用双端口(8000和18000）避免其中某个被占用：
    oscript = document.createElement("script");
    // oscript.src ="http://192.168.91.228:18000/CLodopfuncs.js?priority=0";
    oscript.src = "http://localhost.:18000/CLodopfuncs.js?priority=0";
    head.insertBefore(oscript, head.firstChild);
  };
}




export  function getLodop(oOBJECT, oEMBED) {
  
  var lodop32Exe = '../../assets/install_lodop32.exe',
    lodop64Exe = '../../assets/install_lodop64.exe',
    clodopExe = 'http://o7d94lzvx.bkt.clouddn.com//FuwtZ2IGdzK1zXbgziAk-Z5pheKi%2FCLodop_Setup_for_Win32NT.exe';
  var strHtmInstall = "<br>未安装打印控件！点击这里<a style='color:blue' href='" + lodop32Exe + "' target='_blank' calss='download' download='clodopExe'>下载安装</a>，安装后请刷新页面或重新进入。";
  var strHtmUpdate = "<br>打印控件需要升级！点击这里<a href='" + lodop32Exe + "' target='_blank' calss='download' download='clodopExe'>下载升级</a>，升级后请重新进入。";
  var strHtm64_Install = "<br>未安装打印控件！点击这里<a style='color:blue' href='" + lodop64Exe + "' target='_blank' calss='download' download='clodopExe'>执行安装</a>，安装后请刷新页面或重新进入。";
  var strHtm64_Update = "<br>打印控件需要升级！点击这里<a href='" + lodop64Exe + "' target='_blank' calss='download'> 下载升级 </a>，升级后请重新进入。";
  var strHtmFireFox = "<br><br>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）";
  var strHtmChrome = "<br><br>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）";
  var strCLodopInstall = "未安装打印控件！点击这里<a style='color:blue' href='" + clodopExe + "' target='_blank' calss='download' download='clodopExe'>下载安装</a>，安装成功后请刷新页面。";
  var strCLodopUpdate = "<br>打印控件需要升级！点击这里<a href='" + clodopExe + "' target='_blank' calss='download' download='clodopExe'>下载升级</a>，升级成功后请刷新页面。";
  var LODOP;
  try {
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
    if(needCLodop()) {
      try {
        LODOP = getCLodop();
      } catch(err) {};
      if(!LODOP && document.readyState !== "complete") {
        Message({
          message: '打印服务还没准备好，请稍后再试！',
          type:'warning'
        });
        return;
      };
      if(!LODOP) {
        showDialog(strCLodopInstall);
        return;
      } else {
        if(CLODOP.CVERSION < "2.0.9.0") {
          showDialog(strCLodopUpdate);
          // if (isIE) {
          //              document.write(strCLodopUpdate);
          //          } else {
          //              document.documentElement.innerHTML=strCLodopUpdate+document.documentElement.innerHTML;
          //          }
        };
        if(oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
        if(oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
      };
    } else {
      var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
      //=====如果页面有Lodop就直接使用，没有则新建:==========
      if(oOBJECT != undefined || oEMBED != undefined) {
        if(isIE) LODOP = oOBJECT;
        else LODOP = oEMBED;
      } else if(CreatedOKLodop7766 == null) {
        LODOP = document.createElement("object");
        LODOP.setAttribute("width", 0);
        LODOP.setAttribute("height", 0);
        LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
        if(isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
        else LODOP.setAttribute("type", "application/x-print-lodop");
        document.documentElement.appendChild(LODOP);
        CreatedOKLodop7766 = LODOP;
      } else LODOP = CreatedOKLodop7766;
      //=====Lodop插件未安装时提示下载地址:==========
      if((LODOP == null) || (typeof(LODOP.VERSION) == "undefined")) {
        if(navigator.userAgent.indexOf('Chrome') >= 0) {
          showDialog(strHtmChrome);
          // document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
        }
        if(navigator.userAgent.indexOf('Firefox') >= 0) {
          showDialog(strHtmFireFox);
          // document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
        }
        if(is64IE) {
          showDialog(strHtm64_Install);
          // document.write(strHtm64_Install);
        } else if(isIE) {
          showDialog(strHtmInstall);
          // document.write(strHtmInstall);
        } else {
          showDialog(strHtmInstall);
          // document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
        }
        return LODOP;
      };
    };
    if(LODOP.VERSION < "6.2.1.5") {
      if(needCLodop())
        document.documentElement.innerHTML = strCLodopUpdate + document.documentElement.innerHTML;
      else
      if(is64IE) document.write(strHtm64_Update);
      else
      if(isIE) document.write(strHtmUpdate);
      else
        document.documentElement.innerHTML = strHtmUpdate + document.documentElement.innerHTML;
      return LODOP;
    };
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

    //===========================================================
    return LODOP;
  } catch(err) {
    // alert("getLodop出错:"+err);
    Message({
      message: '打印驱动异常：' + err,
      type:'warning'
    });
  };
};

function showDialog(msg) {
  Message({
    dangerouslyUseHTMLString: true,
    message: msg,
    type:'warning',
    duration: 0,
    showClose: true
  });
}
