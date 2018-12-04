<template>
  <div class="bill_print" style="font-family:'微软雅黑'">
    
    <div class="content_print" v-if='Object.keys(data).length>0' style="font-size: 13px;font-family:  Helvetica Neue;">
      <div class="table_header" style=" color: #333;" ref='header'>
        <table style="width: 100%;table-layout: fixed;">
          <tr>
            <td width="33.33333%" >
              <img src="http://o7d94lzvx.bkt.clouddn.com/image_20180613153152.jpg"/>
            </td>
            <td width="33.33333%"><h3 style="text-align: center; margin-top: 10px;">业务受理回收单</h3></td>
            <td width="33.33333%" style="padding: 4px; font-size: 12px;overflow:hidden;white-space: nowrap; text-align: left;" align="right">
              <div style="display: inline-block;float: right;color: #333;font-size: 13px;line-height: 20px;">官<span style="visibility: hidden;">官网</span>网：http://www.caronline.cn<br>地<span style="visibility: hidden;">官网</span>址：深圳市宝安区71区留仙二路59号<br>电<span style="visibility: hidden;">官网</span>话：0755-33333333</div>
            </td>
          </tr>
        </table>
        <table style="width: 100%;table-layout: fixed;">
          <tr>
            <td width="66.6666%" colspan="2" style="padding: 4px; font-size: 13px;''overflow:hidden;white-space: nowrap; color: #333;">受理单位： <span>{{headerData.areaName}}</span></td>
            <td width="33.333%" style="padding: 4px; font-size: 12px;''overflow:hidden;white-space: nowrap; color: #333;">
              <div style="display: inline-block;float: right; font-size: 13px;color: #333;">收据编号：<span>{{invoice.receiptNo}}</span><p style="visibility: hidden; height: 1px;margin: 0;font-size: 13px; color: #333;">地<span style="visibility: hidden;">官网</span>址：深圳市宝安区71区留仙二路59号</p></div>
            </td>
          </tr>
        </table>
      </div>
      <div class="table_content" style="overflow: hidden; ">
        <hr style="height: 0px; border: 1px solid #333;">
        <div style="padding: 8px 0; color: #333;font-size: 13px;" align="center">
          兹于：<span style="color: #333;margin-right: 20px;">{{curDate.year}}年{{curDate.month}}月{{curDate.day}}日</span>收到学员：<span style="display: inline-block;border-bottom: 1px solid #333;">{{order.userName}}</span>&nbsp;（证件号码：<span style="display: inline-block;border-bottom: 1px solid #333;">{{order.idNum}}</span>）&nbsp;以下费用：
        </div>
        <table style="width: 100%;box-sizing: border-box; border-collapse: collapse; table-layout: fixed;border-color: #000;" border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th align="center" v-for='col in tableModel' :key='col.prop' :style="{width:col.width+'px',padding:'3px 0', height:'auto',fontSize:'13px',color:'#000', fontWeight:400,borderColor: '#000000'}">{{col.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(col, rindex) in data.tableData' v-if='data.tableData.length > 0'>
              <td v-for='(item, index) in tableModel' :key='index' width="100px" 
                style="padding:10px 0px;overflow: hidden; word-break: break-all;font-size: 14px;''color: #000;border-color: #000000;" 
                :width="item.width"
                v-if='item.prop == "goodsName" || item.prop == "goodsPrice"'>
                <div align="center" style="font-size: 13px;font-family: arial;">
                  <span style="font-size: 13px;font-family: arial;">{{col[item.prop]}}</span>
                </div>
              </td>
              <td v-else-if='rindex == 0' :rowspan="rindex == 0 ? 1000: 0"   align="center" style="border-color: #000000;">
                <span style="font-size: 13px;font-family: arial;">{{col[item.prop]}}</span>
              </td>
            </tr>
            <tr v-if='data.tableData.length == 0' >
              <td :colspan='colspan' align="center" style="padding: 10px 0; color: #666;">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
     <div class="table_footer" style="margin-top: 10px; padding:10px 0px 0px 0px;color:#333 " ref='footer'>
        <table style="width: 100%;table-layout: fixed;">
          <tr>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">开票金额：<span>{{invoice.invoiceAmount}}</span>元</td>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">发票种类：<span>{{invoice.invoiceSpecies}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">发票类型：<span>{{invoice.invoiceType}}</span></td>
          </tr>
          <tr>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">发票名称：<span>{{invoice.invoiceName}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">纳税人识别号： <span>{{invoice.taxpayerIdNumber}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap; visibility: hidden;">签收时间：</td>
          </tr>
        </table>
        <hr style="height: 0px; border: 1px solid #333;">
        <table style="width: 100%;table-layout: fixed;">
          <tr>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">经手人（签名）：<span>{{tabulating}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">客户确认（签名）：<span></span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 13px;''overflow:hidden;white-space: nowrap;">门店名称：<span>{{order.storeName}}</span></td>
          </tr>
          <tr>
              <td colspan="3" style="padding: 20px 0;font-family: 宋体">
                  <div style="font-size: 14px; line-height: 18px;letter-spacing: 1px;color: #333; font-weight: 400;">
                    <div>注: 1.学员的培训费发票统一开具《增值税电子普通发票》，学员可在办理缴费业务7天后登陆深港驾校官网 http://www.caronline.cn/,输入手机号码进行自助查询、下载打印电子普通发票；</div>
                      <div><span style="visibility: hidden;">注: </span>2.该票据不作为报销凭证及退款的凭证，若出现退款时，凭我司开具的发票办理退款手续。</div>
                  </div>
              </td>
          </tr>
        </table>
      </div>
      
    </div>
    
  </div>
</template>

<script>
  import * as lodop from '@/utils/lodop'
  import itable from '@/components/table/itable'
  import {normalFormModel, nationalitys}from './prints.js'
  import{ getClassList } from '@/api/marketing/orderMg'
  import {getData} from '@/utils/plugins'
  export default {
    name: 'bill_print',
    data() {
      return {
        selected: [],
        tableModel: [],
        colspan: 0,
        curDate: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm'),
        schooleName: cache.loadOrgCache.orgMap[cache.userInfo.userInfo.schoolId],
        tabulating: cache.userInfo.userInfo.userName,
        formModel: normalFormModel,
        headerData: {
          areaName: '深圳市深港机动车驾驶培训集团有限公司',
          storeName: 'A102302561463254254545',
          className: '',
          nationality: ''
        },
        classList: [],
        curDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth()+1,
          day: new Date().getDate()
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
    watch:{
      'data.tableModel':function (val) {
        this._initTableModel()
      }
    },
    components: {
      'v-itable': itable
    },
    created(){
      this.invoice = this.data.data.invoice
      this.order = this.data.data.order
      this._initTableModel()
      this.tradeDate = this.formatDate(new Date(this.invoice.tradeDate), 'yyyy年MM月dd日')
      console.log(this.tradeDate)
    },
    mounted () {
      setTimeout(() =>{
        this._initFormData()
      }, 200)
    },
    methods: {
      /*初始化默认值*/
      _initFormData () {
        if( this.data.formData !== undefined){
          for(var k in this.formData){
            if(this.data.formData[k] !== undefined){
              this.formData[k] = this.data.formData[k]
            }
          }
          if(this.formData.storeId !== ''){
            this.formModel[0].childs[1].options = cache.loadOrgCache.areaStoreMap[this.formData.areaId]
          }
        }
        //this._initHeaderData(this.formData)
      },
      /*初始化表格表头*/
      _initTableModel () {
        if(!this.data.tableModel || !this.data.tableModel.length || this.data.tableModel.length == 0){
          return
        }
        this.selected = []
        var list = []
        list = [...this.data.tableModel]
        list.map(item => {
          item['disabled'] = false
          this.selected.push(item.prop)
        })
        this.tableModel = list
        this.colspan = list.length
      },
    
      printView () {
        if(this.data.tableData.length == 0){
          this.$message({
            message: '暂无可打印数据',
            type:'warning'
          })
          return
        }
        if(this.selected.length>8){
          this.$message({
            message: '最多仅可选择8列数据进行打印！',
            type:'warning'
          })
          return
        }
        var LODOP = lodop.getLodop();
        if(!LODOP){
          return
        }
        let temp = document.querySelector('.content_print').outerHTML
        LODOP.PRINT_INIT("");

        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); // 0 操作者自行决定或打印机缺省设置 1 纵向打印，固定纸张；2 横向打印，固定纸张
        LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1); // 去除背景滚动线
        LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", 1); // 打印后自动关闭预览
        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",'Full-Width');
        LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "业务受理回执单"); // 打印队列中的文档名
        LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
        LODOP.SET_PRINT_STYLEA("FontName","宋体");
        //http://www.lodop.net/demolist/PrintSample3.html
        LODOP.ADD_PRINT_HTML('0','0','100%','100%',temp);
        LODOP.PREVIEW()

      }
    }
  }
</script>

<style>
</style>