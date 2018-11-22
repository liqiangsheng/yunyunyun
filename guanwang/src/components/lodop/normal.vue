<template>
  <div class="normal_print">
    <div class="searchWrapper">
      <v-iform :fields='formModel' :fieldData.sync='formData' ref='searchForm' @submitForm='_submit' style="border:none">
        <div slot='iform-btns'>
          <el-button type='primary' size='small' @click='_validate("searchForm")'>查询</el-button>
          <el-button type='primary' size='small' @click='_reset("searchForm")'>重置</el-button>
          <el-popover
            placement="bottom"
            width="400"
            trigger="click">
            <div style="padding: 10px 20px;">
              <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="selected" @change="_setSelected">
                <el-checkbox v-for="(item, index) in tableModel" :label="item.prop" :key="index">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <el-button slot="reference" size='small' type='primary'>字段设置</el-button>             
          </el-popover>
          <font color="red">&nbsp&nbsp&nbsp<span class="el-icon el-icon-info"></span>&nbsp;注：最多仅可选择8列数据进行打印！</font>
        </div>
      </v-iform>
    </div>
    
    <table style="width: 100%;border-collapse: collapse; table-layout: fixed;" cellpadding="0" cellspacing="0" v-loading="loading">
      <thead>
        <tr>
          <th align="center" v-for='col in tableModel' v-if='!col.disabled' :key='col.prop' :style="{width:col.width+'px',padding:'2px 0', height:'auto',fontSize:'16px',fontFamily:'宋体',borderColor:'#333',color:'#333',border: '1px solid #333'}">{{col.label}}</th>
        </tr>
      </thead>
      <tbody v-if='data.showTableData !== undefined && data.showTableData.length > 0'>
        <tr v-for='(col, rindex) in data.showTableData' v-if='rindex<pager.s'>
          <td v-for='(item, index) in tableModel' :key='index' width="100px" 
            style="padding:10px 3px;overflow: hidden;box-sizing: border-box; word-break: break-all;font-size: 16px;font-family:'宋体';border-color: #333;color: #333; border: 1px solid #333;" 
            :width="item.width"
            v-if='!item.disabled'>
            <div v-if='!item.type' align="center" style="font-size: 16px;font-family: '宋体';">
              <span v-if='item.formatter === undefined' style="font-size: 16px;font-family: '宋体';">{{col[item.prop]}}{{item.formatter}}</span>
              <span v-else style="font-size: 16px;font-family: '宋体';">{{item.formatter(col[item.prop])}}</span>
            </div>
            <div align="center" v-else style="font-size: 16px;font-family: '宋体';">{{rindex*1+1}}{{item.formatter}}</div>
          </td>
        </tr>
      </tbody>
      <tr v-if='data.showTableData !== undefined && data.showTableData.length == 0'  >
        <td :colspan='colspan' align="center" style="padding: 10px 0; color: #666; border: 1px solid #333;">暂无数据</td>
      </tr>
    </table>
    <div  class="box-page" v-if='pager.total>0'>
      <refresh-icon  @refreshTable="_refreshData()"></refresh-icon>
      <el-pagination
          @size-change="_handleSizeChange"
          @current-change="_handleCurrentChange"
          :current-page="pager.p"
          :page-sizes="pager.sizes"
          :page-size="pager.s"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total">
        </el-pagination>
    </div>
    
    
    <div class="content_print" style="border: 1px solid #ddd; display: none;">
      <div class="table_header" style=" height: 170px; color: #000;padding: 0 20px;" ref='header'>
        <p style="padding: 0; margin:0; line-height: 46px; border-bottom: 1px solid #000;">{{schooleName}}</p>
        <h2 style=" font-size: 20px; text-align: center;font-weight: bold; padding: 0;margin: 0; line-height: 50px;">{{title}}</h2>
        <table style="width: 100%;table-layout: fixed;">
          <tr v-if="title !== '转校资料移交'">
            <td width="50%" colspan="2" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">批次号：<span>{{data.batchNo}}</span></td>
            <td width="25%" style="padding: 4px; visibility: hidden;font-size: 16px;font-family:'宋体';">领取人： <span></span></td>
            <td width="25%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">办证日期：<span>{{data.certDate}}</span></td>
          </tr>
          <tr>
            <td width="25%" style="padding: 4px; font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">片区： <span>{{headerData.areaName}}</span></td>
            <td width="25%" style="padding: 4px; font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">门店：<span>{{headerData.storeName}}</span></td>
            <td width="25%" style="padding: 4px; font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">班别：<span>{{headerData.className}}</span></td>
            <td width="25%" style="padding: 4px; font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">户籍地：<span>{{headerData.nationality}}</span></td>
          </tr>
        </table>
      </div>
      <div class="table_content" style="height: 985px;overflow: hidden; padding: 0 10px; box-sizing: border-box;">
        <table style="width: 100%;border-collapse: collapse; table-layout: fixed;border-color: #000000;" border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th align="center" v-for='col in tableModel' v-if='!col.disabled' :key='col.prop' :style="{width:col.width+'px',padding:'2px 0', height:'auto',fontSize:'16px',fontFamily:'宋体',color:'#333',borderColor: '#000000'}">{{col.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(col, rindex) in data.tableData' v-if='data.tableData.length > 0'>
              <td v-for='(item, index) in tableModel' :key='index' width="100px" 
                style="padding:10px 3px;overflow: hidden;box-sizing: border-box; word-break: break-all;font-size: 16px; border-color: #000000;font-family:'宋体';color: #333;" 
                :width="item.width"
                v-if='!item.disabled'>
                <div v-if='!item.type' align="center" style="font-size: 16px;font-family: '宋体';">
                  <span v-if='item.formatter === undefined' style="font-size: 16px;font-family: '宋体';">{{col[item.prop]}}{{item.formatter}}</span>
                  <span v-else style="font-size: 16px;font-family: '宋体';">{{item.formatter(col[item.prop])}}</span>
                </div>
                <div align="center" v-else style="font-size: 16px;font-family: '宋体';">{{rindex*1+1}}{{item.formatter}}</div>
              </td>
            </tr>
            <tr v-if='data.tableData.length == 0'  >
              <td :colspan='colspan' align="center" style="padding: 10px 0; color: #666;">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
     <div class="table_footer" style="margin-bottom: 20px; padding:10px 20px 0px 20px; height:80px;" ref='footer'>
        <table style="width: 100%;table-layout: fixed;">
          <tr>
            <td width="33.3333%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">制表人： <span>{{tabulating}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">第<span tdata="PageNO" format="0">1</span>&nbsp;共&nbsp;<span tdata="PageCount" format="0">1</span>页</td>
            <td width="33.3333%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">签收人： </td>
          </tr>
          <tr>
            <td width="33.3333%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">打印时间：<span>{{curDate}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap; visibility: hidden;">领取人： <span>{{data.userName}}</span></td>
            <td width="33.3333%" style="padding: 4px;font-size: 16px;font-family:'宋体';overflow:hidden;white-space: nowrap;">签收时间：</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as lodop from '@/utils/lodop'
  import itable from '@/components/table/itable'
  import iform from '@/components/form/iform'
  import {normalFormModel, nationalitys}from './prints.js'
  import{ getClassList } from '@/api/marketing/orderMg'
  import {getData} from '@/utils/plugins'
  export default {
    name: 'normal_print',
    data() {
      return {
        selected: [],
        checkAll:true,
        isIndeterminate:true,
        tableModel: [],
        colspan: 0,
        curDate: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm'),
        schooleName: cache.loadOrgCache.orgMap[cache.userInfo.userInfo.schoolId],
        tabulating: cache.userInfo.userInfo.userName,
        formModel: normalFormModel,
        formData: {
            pageable:true
        },
        headerData: {
          areaName: '',
          storeName: '',
          className: '',
          nationality: ''
        },
        loading:false,
        classList: [],
        pager:{
          total:0,
          current:1,
          p:2,
          s:10,
          sizes:[10,20,30,40]
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
      },
      'data':{
        handler(val){
          this.pager.total = val.tableData.length;
          console.log(val)
        },deep:true
        
      }
    },
    components: {
      'v-itable': itable,
      'v-iform': iform
    },
    created(){
      this._getClassList()
      this._initTableModel()
    },
    mounted () {
      setTimeout(() =>{
        //this._initFormData()
        this._validate('searchForm')
      }, 200)
    },
    methods: {
      /*获取班别*/
      _getClassList() {
        getClassList().then(res => {
          let classList = [{id: '', name: '全部'}]
          if(res.data.status){
            if(res.data.data && res.data.data.length){
              classList = [{id: '', name: '全部'}, ...res.data.data]
            }
          }
          this.classList = classList
          this.formModel[1].options = classList
        })
      },
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
        this._initHeaderData(this.formData)
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
      handleCheckAllChange(val) {
        this.selected = val ? this._checkAll() : [];
        this._setSelected(this.selected)
      },
      _checkAll () {
        var arr = []
        this.tableModel.map(item => {
          arr.push(item.prop)
        })
        return arr
      },
      /*显示选中的列*/
      _setSelected (list) {
        var modelList = [...this.tableModel]
        modelList.map(item => {
          if(list.length>0){
            if(list.indexOf(item.prop)<0){
              item.disabled = true
            }else{
              item.disabled = false
            }
          }else{
            item.disabled = true
          }
        })
        this.tableModel = modelList
        this.checkAll = this.selected.length < this.tableModel.length?false:true
        this.colspan = list.length
      },
      /*初始化表头数据*/
      _initHeaderData (data) {
        this.headerData.areaName = data.areaId === ''?'全部':cache.loadOrgCache.orgMap[data.areaId]
        this.headerData.storeName = data.storeId === ''?'全部':cache.loadOrgCache.orgMap[data.storeId]
        this.headerData.className = data.classTypeId === ''?'全部':getData(this.classList,[data.classTypeId], 'id', 'name').join('')
        this.headerData.nationality = data.nationality === ''?'全部':getData(nationalitys, [data.nationality], 'value', 'label').join('')
      },
      _validate(name) {
        this.$refs[name].valiDate()
      },
      _submit (formData) {
        this._initHeaderData(formData)
        formData.p = 1;
        formData.s = 1000000;
        formData.isAll = true
        this.loading = true
        this.$emit('refresh', formData)
      },
      _refreshData (formData) {
        if(!formData){
          var formData = {p:1,s:this.pager.s}
        }
        this.loading = true
        this.$emit('refresh', formData)
      },
      closeLoading () {
        setTimeout (() => {
          this.loading = false
        }, 500)
      },
      _reset(name){
        this.$refs[name].resetForm()
      },
      /*分页条数变化*/
      _handleSizeChange (s) {
         this.pager.s = s 
         this._refreshData({s:2})
      },
      /*分页查询*/
      _handleCurrentChange (p) {
        this.pager.p = p
        this._refreshData({p:p})
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
            message: '最多仅可选择8列数据进行打印,请先进行字段设置！',
            type:'warning'
          })
          return
        }
        var LODOP = lodop.getLodop();
        if(!LODOP){
          return
        }
        let temp = document.querySelector('.table_content').outerHTML
        LODOP.PRINT_INIT("");
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); // 0 操作者自行决定或打印机缺省设置 1 纵向打印，固定纸张；2 横向打印，固定纸张
        LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1); // 去除背景滚动线
        LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", 1); // 打印后自动关闭预览
        LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "受理资料移交"); // 打印队列中的文档名
        LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
        LODOP.ADD_PRINT_HTM('0','0px','100%','160',this.$refs.header.outerHTML);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // 页眉页脚项
        LODOP.ADD_PRINT_TABLE('160','0','100%','73.5%',temp);
        //LODOP.ADD_PRINT_IMAGE(100,0,'100%','100%','<img src="'+src+'"/>')
        LODOP.ADD_PRINT_HTM('93%', '0', "100%",'60', this.$refs.footer.outerHTML);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // 页眉页脚项
        LODOP.NewPageA();
        LODOP.PREVIEW()
      }
    }
  }
</script>

<style scoped>
  .el-checkbox+.el-checkbox{
    margin-left: 0;
    margin-right: 15px;
  }
  .el-checkbox{
    margin-right: 15px;
  }
  .el-loading-mask{
    right: -1px !important;
  }
</style>