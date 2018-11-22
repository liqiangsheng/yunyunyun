<template>
  <div class="img_print" style="margin: 0 auto;font-family: '宋体';font-size: 14px;" >
    <!--- 这里是显示的地方 --->
    <div style="max-height: 1000px; overflow: hidden;">
      <div v-for='location in locations'  v-if='location.data.length>0' >
        <div class="table_header" style="line-height: 50px; height: 50px; color: #000; font-size: 20px; text-align: center;font-weight: bold;" ref='header'>
          <span style="font-weight: bold;">{{location.title}}</span>
        </div>
        <div class="table_content" style="padding: 0 10px; box-sizing: border-box;">
          <table style="width: 100%;border-collapse: collapse; table-layout: fixed;" border="1" cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                <th align="center" v-for='col in data.tableModel' :style="{width:col.width+'px',padding:'2px 0', height:'auto',fontSize:'12px',fontFamily:'宋体'}">{{col.label}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='(col, rindex) in location.data'>
                <td v-for='(item, index) in data.tableModel' width="100px" :style="{padding:'0 3px',overflow: 'hidden',boxSizing: 'border-box',width:item.width+'px',border:'1px solid #333'}" :width="item.width">
                  <div v-if='!item.type' align="center">
                    <v-barcode v-if='item.isImg' :options='barCode' tag='svg' :value='col[item.prop]' ></v-barcode>
                    <span v-else style="font-size: 14px;font-family: '宋体';">{{col[item.prop]}}</span>
                  </div>
                  <div align="center" v-else style="font-size: 14px;font-family: '宋体';">{{rindex*1+1}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--- 这里才是打印的地方 --->
    <div v-for='location in locations' class='printData' :id='"id_"+location.type' v-if='location.data.length>0' v-show='false'>

      <div  id="div1"  class="table_header" style="line-height: 50px; height: 50px; color: #000; font-size: 20px; text-align: center;font-weight: bold;display: table-header-group" ref='header'>
        <span style="font-weight: bold;">{{location.title}}</span>
      </div>

      <div id="div2" class="table_content" style="height: 985px;overflow: hidden; padding: 0 10px; box-sizing: border-box;">
        <table style="width: 100%;border-collapse: collapse; table-layout: fixed;" border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th align="center" v-for='col in data.tableModel' :style="{width:col.width+'px',padding:'2px 0', height:'auto',fontSize:'12px',fontFamily:'宋体'}">{{col.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(col, rindex) in location.data'>
              <td v-for='(item, index) in data.tableModel' width="100px" :style="{padding:'0 3px',overflow: 'hidden',boxSizing: 'border-box',width:item.width+'px',border:'1px solid #333'}" :width="item.width">
                <div v-if='!item.type' align="center">
                  <v-barcode v-if='item.isImg' :options='barCode' tag='svg' :value='col[item.prop]' ></v-barcode>
                  <span v-else style="font-size: 14px;font-family: '宋体';">{{col[item.prop]}}</span>
                </div>
                <div align="center" v-else style="font-size: 14px;font-family: '宋体';">{{rindex*1+1}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

   <div  id="div3" class="table_footer" style="margin-top: 10px; padding:10px 20px 0px 20px; height:80px;" ref='footer'>
      <table style="width: 100%;table-layout: fixed;">
        <tr>
          <td width="33.3333%" style="padding: 4px 0;"><span tdata="pageNO" format="#"> # </span> / <span tdata="pageCount" format="#">##</span>页</td>
          <td width="33.3333%" style="padding: 4px 0;">移交人： <span>{{data.userName}}</span></td>
          <td width="33.3333%" style="padding: 4px 0;">移交日期：<span>{{curDate}}</span></td>
        </tr>
        <tr>
          <td width="33.3333%" style="padding: 4px 0;">盖章：<span></span></td>
          <td width="33.3333%" style="padding: 4px 0;">领取人： <span></span></td>
          <td width="33.3333%" style="padding: 4px 0;">签收日期： </td>
        </tr>
      </table>
    </div>
    <div class="local"  v-show='false'>
      <div class="ctable_header" style="line-height: 50px; height: 50px; color: #000; font-size: 20px; text-align: center;font-weight: bold;" ref='cheader'>
        <span style="font-weight: bold;">深港驾校机动车驾驶员（本地户籍）报名资料移交表</span>
      </div>
    </div>

  </div>
</template>

<script>
  const barcode = require('@xkeshi/vue-barcode')
  import * as lodop from '@/utils/lodop'
  export default {
    name: 'img_print',
    data(){
      return {
        barCode: {
          width: 1,
          height: 29,
          fontSize: 12,
          displayValue: true,
          textAlign: 'right',
          textMargin: 1,
          margin: 2,
          format: "CODE128A",
          fontFamily: '宋体'
        },
        curDate:this.formatDate(new Date(), 'yyyy-MM-dd'),
        //5个类型，除了外地户籍，其他表头都显示本地户籍,但不同的类型另起一页打印。
        locations: {
          1: {  //港澳台户籍
            type:1,
            title: '深港驾校机动车驾驶员（本地户籍）报名资料移交表',
            data: []
          },
          2: {  //外籍
            type:2,
            title: '深港驾校机动车驾驶员（本地户籍）报名资料移交表',
            data: []
          },
          3: {  //其他户籍
            type:3,
            title: '深港驾校机动车驾驶员（本地户籍）报名资料移交表',
            data: []
          },
          5: {  //本地户籍
            type:5,
            title: '深港驾校机动车驾驶员（本地户籍）报名资料移交表',
            data: []
          },
          6: {  //外地户籍
            type:6,
            title: '深港驾校机动车驾驶员（外地户籍）报名资料移交表',
            data: []
          }
        }
      }
    },
    props: {
      title: {
        type: String,
        default () {
          return ''
        }
      },
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    created () {
      for(var k in this.data.tableData){
        if(this.locations[k] !== undefined){
          this.locations[k].data = this.data.tableData[k]
        }
      }
    },
    methods: {
      printView () {
        if(this.data.tableData.length == 0){
          this.$message({
            message: '暂无可打印数据',
            type:'warning'
          })
          return
        }
        var LODOP, P_ID = "",TaskID1, TaskID2,taskIndex = 0,waiting = false;
        var domList = document.querySelectorAll('.printData')

        PrintWaitLoop(this.getHtml(domList[taskIndex]))

        function PrintWaitLoop({header, temp, footer}) {
            LODOP = lodop.getLodop();
            LODOP.PRINT_INIT("");
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); // 0 操作者自行决定或打印机缺省设置 1 纵向打印，固定纸张；2 横向打印，固定纸张
            LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1); // 去除背景滚动线
            LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", 1); // 打印后自动关闭预览
            LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "受理资料移交"); // 打印队列中的文档名
            LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
            //不同类型的，重新另起一张纸
            domList.forEach((res,i)=>{
                LODOP.ADD_PRINT_TABLE('50','0','100%','73.2%',domList[i].querySelector('.table_content').innerHTML); //内容
                LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
                LODOP.ADD_PRINT_HTM('0','0px','100%','50',domList[i].querySelector('.table_header').outerHTML);   //头部
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.SET_PRINT_STYLEA(0,"LinkedItem",-1);
                LODOP.ADD_PRINT_HTM('1000', '0', "100%",'80',footer);  //底部
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.SET_PRINT_STYLEA(0,"LinkedItem",-1);
                LODOP.NewPageA();
            });

            LODOP.PREVIEW()
        }
      },
      getHtml (container) {
        var content = {
          header: container.querySelector('.table_header').outerHTML,
          temp: container.querySelector('.table_content').innerHTML,
          footer: document.querySelector(".table_footer").outerHTML
        }
        return content
      }
    },
    components: {
      'v-barcode': barcode
    }
  }
</script>

<style scoped lang="scss">
.img_print{
  width:796px
 
}
</style>