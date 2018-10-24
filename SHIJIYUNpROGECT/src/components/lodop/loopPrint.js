var LODOP, P_ID = "",
  TaskID1, TaskID2, t, waiting = false,
  c = 0,
  loop = 0; //声明为全局变量 
function getStatusValue(ValueType, ValueIndex, oResultOB) {
  LODOP = getLodop();
  if(LODOP.CVERSION) LODOP.On_Return = function(TaskID, Value) {
    oResultOB.value = Value;
  };
  var strResult = LODOP.GET_VALUE(ValueType, ValueIndex);
  if(!LODOP.CVERSION) return strResult;
  else return "";
};

function MyPrint() {
  LODOP = getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得打印状态1");
  LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印的第一页内容");
  LODOP.NEWPAGEA();
  LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印的第二页内容");
  LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
  if(LODOP.CVERSION) {
    LODOP.On_Return = function(TaskID, Value) {
      document.getElementById('T1').value = Value;
    };
    LODOP.PRINTA();
    return;
  } else document.getElementById('T1').value = LODOP.PRINTA();
};

function PrintWait() {
  if(c > 0) {
    alert("正打印中...");
    return;
  }
  LODOP = getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得打印状态2");
  LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印的页面部分内容");
  LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
  if(LODOP.CVERSION) {
    LODOP.On_Return = function(TaskID, Value) {
      P_ID = Value;
      document.getElementById('T12A').value = P_ID;
      if(P_ID != "") {
        c = 0;
        C_WaitFor();
      };
    };
    LODOP.PRINTA();
  } else {
    P_ID = LODOP.PRINTA();
    document.getElementById('T12A').value = P_ID;
    if(P_ID != "") {
      c = 0;
      WaitFor();
    };
  };
}

function WaitFor() {
  c = c + 1;
  document.getElementById('T12B').value = "正等待(JOB代码是" + P_ID + ")打印结果：" + c + "秒";
  t = setTimeout("WaitFor()", 1000);
  if(LODOP.GET_VALUE("PRINT_STATUS_OK", P_ID)) {
    clearTimeout(t);
    document.getElementById('T12B').value = "打印成功！";
    c = 0;
    alert("打印成功！");
  }
  if((!LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID)) && (c > 0)) {
    clearTimeout(t);
    document.getElementById('T12B').value = "打印任务被删除！";
    c = 0;
    alert("打印任务被删除！");
  } else if(c > 30) {
    clearTimeout(t);
    document.getElementById('T12B').value = "打印超时(30秒)！";
    c = 0;
    alert("打印超过30秒没捕获到成功状态！");
  };
};

function C_WaitFor() {
  c = c + 1;
  document.getElementById('T12B').value = "正等待(JOB代码是" + P_ID + ")打印结果：" + c + "秒";
  t = setTimeout("C_WaitFor()", 1000);
  LODOP.On_Return_Remain = true;
  LODOP.On_Return = function(TaskID, Value) {
    if(TaskID == TaskID1) {
      if(Value == 1) {
        alert(TaskID + " " + Value);
        clearTimeout(t);
        document.getElementById('T12B').value = "打印成功！";
        c = 0;
        alert("打印成功！");
      };
    } else
    if(TaskID == TaskID2) {
      if(Value == 0) {
        clearTimeout(t);
        document.getElementById('T12B').value = "打印任务被删除！";
        c = 0;
        alert("打印任务被删除！");
      };
    };
  };
  TaskID1 = LODOP.GET_VALUE("PRINT_STATUS_OK", P_ID);
  TaskID2 = LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID);
  if(c > 50) {
    clearTimeout(t);
    document.getElementById('T12B').value = "打印超时(50秒)！";
    c = 0;
    alert("打印超过50秒没捕获到成功状态！");
  };
};

function PrintWaitLoop() {
  if(!waiting) {
    LODOP = getLodop();
    LODOP.PRINT_INIT("");
    LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印的页面部分内容");
    LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
    if(LODOP.CVERSION) {
      LODOP.On_Return_Remain = true;
      LODOP.On_Return = function(TaskID, Value) {
        if(TaskID == TaskID1) {
          P_ID = Value;
          if((P_ID != "")) {
            waiting = true;
            setTimeout("PrintWaitLoop()", 200);
          }
        } else if(TaskID == TaskID2) {
          if(Value == 0) waiting = false;
          setTimeout("PrintWaitLoop()", 200);
        };
      };
      TaskID1 = LODOP.PRINTA();
    } else {
      P_ID = LODOP.PRINTA();
      if((P_ID != "")) {
        waiting = true;;
        setTimeout("PrintWaitLoop()", 200);
      }
    };
  } else {
    if(LODOP.CVERSION) {
      TaskID2 = LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID);
    } else {
      if(!LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID)) waiting = false; //以是否还在队列为准
      setTimeout("PrintWaitLoop()", 200);
    };
  }
}
//从JOB代码找出打印机序号：
function GetPrinterIDfromJOBID(strJOBID) {
  var intPos = strJOBID.indexOf("_");
  if(intPos < 0) {
    return strJOBID;
  } else {
    return strJOBID.substr(0, intPos);
  }
}
//暂停打印:
function ControlPrinterPAUSE(strJOBID) {
  strPrinterID = GetPrinterIDfromJOBID(strJOBID);
  LODOP = getLodop();
  if(LODOP.CVERSION) {
    LODOP.On_Return = function(TaskID, Value) {
      alert("暂停结果:" + Value);
    };
    LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "PAUSE");
    return;
  } else {
    var strResult = LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "PAUSE");
    alert("暂停结果:" + strResult);
  };
}
//恢复打印:
function ControlPrinterRESUME(strJOBID) {
  strPrinterID = GetPrinterIDfromJOBID(strJOBID);
  LODOP = getLodop();
  if(LODOP.CVERSION) {
    LODOP.On_Return = function(TaskID, Value) {
      alert("恢复结果:" + Value);
    };
    LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "RESUME");
    return;
  } else {
    var strResult = LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "RESUME");
    alert("恢复结果:" + strResult);
  };
}
//清理打印任务:
function ControlPrinterPURGE(strJOBID) {
  strPrinterID = GetPrinterIDfromJOBID(strJOBID);
  LODOP = getLodop();
  if(LODOP.CVERSION) {
    LODOP.On_Return = function(TaskID, Value) {
      alert("清理结果:" + Value);
    };
    LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "PURGE");
    return;
  } else {
    var strResult = LODOP.SET_PRINT_MODE("CONTROL_PRINTER:" + strPrinterID, "PURGE");
    alert("清理结果:" + strResult);
  };
}
//如下过程本例没用到，但或许对您有用：
function getStatuMessage(statusID) {
  var messages = "";
  if(statusID & 1) messages += "已暂停 -";
  if(statusID & 2) messages += "错误 -";
  if(statusID & 4) messages += "正删除 -";
  if(statusID & 8) messages += "进入队列 -";
  if(statusID & 16) messages += "正在打印 -";
  if(statusID & 32) messages += "脱机 -";
  if(statusID & 64) messages += "缺纸 -";
  if(statusID & 128) messages += "打印结束 -";
  if(statusID & 256) messages += "已删除 -";
  if(statusID & 512) messages += "堵了 -";
  if(statusID & 1024) messages += "用户介入 -";
  if(statusID & 2048) messages += "正在重新启动 -";
  return messages;
}