<template>
  <div class="img_print" style="margin: 0 auto;font-family: '宋体';" >
    <div style="max-height: 1000px; overflow: hidden;">
      <div v-for='location in locations'  v-if='location.data.length>0' >
        <div class="table_header" style="line-height: 50px; height: 50px; color: #000; font-size: 20px; text-align: center;font-weight: bold;" ref='header'>
          <span style="font-weight: bold;">{{location.title}}</span>
        </div>
        <div class="table_content" style="overflow: hidden; padding: 0 10px; box-sizing: border-box;">
          <table style="width: 100%;border-collapse: collapse; table-layout: fixed;" border="1" cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                <th align="center" v-for='col in data.tableModel' :style="{width:col.width+'px',padding:'2px 0', height:'auto',fontSize:'12px',fontFamily:'宋体'}">{{col.label}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='(col, rindex) in location.data'>
                <td v-for='(item, index) in data.tableModel' width="100px" :style="{padding:'0 3px',overflow: 'hidden',boxSizing: 'border-box',width:item.width+'px'}" :width="item.width">
                  <div v-if='!item.type' align="center">
                    <v-barcode v-if='item.isImg' :options='barCode' tag='img' :value='col[item.prop]' ></v-barcode>
                    <span v-else style="font-size: 12px;font-family: '宋体';">{{col[item.prop]}}</span>
                  </div>
                  <div align="center" v-else style="font-size: 12px;font-family: '宋体';">{{rindex*1+1}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>  
    <div v-for='location in locations' :id='location.type' v-if='location.data.length>0' v-show='false'>
      <div class="table_header" style="line-height: 50px; height: 50px; color: #000; font-size: 20px; text-align: center;font-weight: bold;" ref='header'>
        <span style="font-weight: bold;">{{location.title}}</span>
      </div>
      <div class="table_content" style="height: 985px;overflow: hidden; padding: 0 10px; box-sizing: border-box;">
        <table style="width: 100%;border-collapse: collapse; table-layout: fixed;" border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th align="center" v-for='col in data.tableModel' :style="{width:col.width+'px',padding:'2px 0', height:'auto',fontSize:'12px',fontFamily:'宋体'}">{{col.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(col, rindex) in location.data'>
              <td v-for='(item, index) in data.tableModel' width="100px" :style="{padding:'0 3px',overflow: 'hidden',boxSizing: 'border-box',width:item.width+'px'}" :width="item.width">
                <div v-if='!item.type' align="center">
                  <v-barcode v-if='item.isImg' :options='barCode' tag='img' :value='col[item.prop]' ></v-barcode>
                  <span v-else style="font-size: 12px;font-family: '宋体';">{{col[item.prop]}}</span>
                </div>
                <div align="center" v-else style="font-size: 12px;font-family: '宋体';">{{rindex*1+1}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
   <div class="table_footer" style="margin-top: 10px; padding:10px 20px 0px 20px; height:80px;" ref='footer'>
      <table style="width: 100%;table-layout: fixed;">
        <tr>
          <td width="33.3333%" style="padding: 4px 0;"><span tdata="PageNO" format="0">##</span> / <span tdata="PageCount" format="0">##</span>页</td>
          <td width="33.3333%" style="padding: 4px 0;">移交人： <span></span></td>
          <td width="33.3333%" style="padding: 4px 0;">移交日期： </td>
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
          fontSize: 11,
          displayValue: true,
          textAlign: 'right',
          textMargin: 1,
          margin: 2,
          format: "CODE128A",
          fontFamily: '宋体'
        },
        locations: {
          1: {
            type:1,
            title: '深港驾校机动车驾驶员（港澳台户籍）报名资料移交表',
            data: []
          },
          2: {
            type:2,
            title: '深港驾校机动车驾驶员（外籍）报名资料移交表',
            data: []
          },
          3: {
            type:3,
            title: '深港驾校机动车驾驶员（其他户籍）报名资料移交表',
            data: []
          },
          5: {
            type:5,
            title: '深港驾校机动车驾驶员（本地户籍）报名资料移交表',
            data: []
          },
          6: {
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
        var LODOP, P_ID = "",TaskID1, TaskID2,c = 1,waiting = false;
        PrintWaitLoop()
        
        function PrintWaitLoop() {
        if(!waiting) {
          LODOP = lodop.getLodop();
          LODOP.PRINT_INIT("");
          LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "");
          LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
          if(LODOP.CVERSION) {
            LODOP.On_Return_Remain = true;
            LODOP.On_Return = function(TaskID, Value) {
              if(TaskID == TaskID1) {
                P_ID = Value;
                if((P_ID != "")) {
                  waiting = true;
                  c++
                  setTimeout(() =>{
                    PrintWaitLoop()
                  }, 200);
                }
              } else if(TaskID == TaskID2) {
                if(Value == 0) waiting = false;
                c++
                setTimeout(() =>{
                  PrintWaitLoop()
                }, 200);
              };
            };
            TaskID1 = LODOP.PRINTA();
          } else {
            P_ID = LODOP.PRINTA();
            if((P_ID != "")) {
              waiting = true
              c++
              setTimeout(() =>{
                PrintWaitLoop()
              }, 200);
            }
          };
        } else {
          if(LODOP.CVERSION) {
            TaskID2 = LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID);
          } else {
            if(!LODOP.GET_VALUE("PRINT_STATUS_EXIST", P_ID)) waiting = false; //以是否还在队列为准
             c++
            setTimeout(() =>{
              PrintWaitLoop()
            }, 200);
          };
        }
      }
       
       
       
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