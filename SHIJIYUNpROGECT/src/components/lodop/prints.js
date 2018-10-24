import {timeFormate, formatDate} from '@/utils/plugins'
import {getAreaList} from '@/utils/plugins'
import { parseExamGrade } from  '@/filters/index'
const areaList = [{areaId:'', areaName: '全部'}, ...getAreaList()]
const stuStatus = {
  0: '未到',
  1: '到',
  2: '取消'
}
/*受理资料移交*/
export const imgTableModel = [
  {
    type: 'index',
    label: '序号',
    width: 55,
    align: 'center'
  },{
    prop: 'userName',
    label: '姓名',
    align: 'center',
    width: 85,
  },{
    prop: 'idNumber',
    label: '证件号条码',
    align: 'center',
    width: 160,
  },{
    prop: 'modelCar',
    label: '车型',
    align: 'center',
    width: 55
  },{
    prop: 'idNumber',
    label: '证件号条码',
    align: 'center',
    isImg: true,
    width: 250
  },{
    prop: 'remark',
    label: '备注',
    align: 'center'
  }
]

/*转校资料移交*/
export const normalTableModel = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    prop: 'areaId',
    label: '片区',
    formatter: (val) => {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    prop: 'storeId',
    label: '门店',
    formatter: (val) => {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    prop: 'userName',
    label: '姓名'
  },{
    prop: 'idNumber',
    label: '证件号',
    width: 170
  },{
    prop: 'phone',
    label: '联系电话'
  },{
    prop: 'learnDriverProgress',
    label: '学车进度',
    formatter: (val) => {
      return cache.loadDictCache.learn_driver_progress[val]
    }
    
  },{
    prop: 'acceptNum',
    label: '受理号',
    width: 170
  },{
    prop: 'studyNum',
    label: '学习证编号'
  },{
    prop: 'studyCertStartDate',
    label: '科目一合格日期',
    formatter: (val) => {
        if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
    }
  },{
    prop: 'type',
    label: '类型',
    formatter: (val) => {
      return types[val]
    }
  }
]

/*资金监管办证*/
export const capitalTableModel = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    prop: 'certProjectName',
    label: '办证科目'
  },{
    prop: 'batchNum',
    label: '批次号'
  },{
    prop: 'areaId',
    label: '片区',
    formatter: (val) => {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    prop: 'storeId',
    label: '门店',
    formatter: (val) => {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    prop: 'userName',
    label: '姓名'
  },{
    prop: 'idNumber',
    label: '证件号码',
    width: 170
  },{
    prop: 'phone',
    label: '联系电话'
  },{
    prop: 'createdAt',
    label: '办证日期',
    formatter: (val) => {
        if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
    }
  },{
    prop: 'supervisionType',
    label: '付费方式',
    formatter: (val) => {
      return cache.loadDictCache.supervision_type[val]
    }
  },{
    prop: 'certTime',
    label: '监管日期',
    formatter: (val) => {
        if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
    }
  }
]
/*考场受理办证*/
let tables = [...capitalTableModel.slice(0, capitalTableModel.length-2)]
export const examHallCertTableModel = tables
/*转校资料移交*/
export const theoryCourseMgTableModel = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    prop: 'userName',
    label: '学员姓名'
  },{
    prop: 'idNum',
    label: '证件号',
    width: 170
  },{
    prop: 'mobile',
    label: '手机号'
  },{
    prop: 'classType',
    label: '班别'
  },{
    prop: 'modelCar',
    label: '车型',
    width: 55
  },{
    prop: 'state',
    label: '上课情况',
    formatter: (val) => {
      return stuStatus[val]
    }
  },{
    prop: 'remark',
    label: '备注'
  }
]

/*学员档案移交*/
export const studentRecordTableModel = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    prop: 'certProjectName',
    label: '办证科目'
  },{
    prop: 'batchNum',
    label: '批次号'
  },{
    prop: 'areaId',
    label: '片区',
    formatter: (val) => {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    prop: 'storeId',
    label: '门店',
    formatter: (val) => {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    prop: 'userName',
    label: '姓名'
  },{
    prop: 'idNum',
    label: '证件号码',
    width: 170
  },{
    prop: 'mobile',
    label: '联系电话'
  },{
    prop: 'createdAt',
    label: '办证日期',
    formatter: (val) => {
        if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
    }
  },{
    prop: 'archiveCode',
    label: '学员档案编号'
  }
]
/* 考试预批复 */
export const preReplyTableModel = [
    {
        type: 'index',
        label: '序号',
        prop: 'iundex',
        width: 55,
        align: 'center'
    },{
        prop: 'userName',
        label: '学员姓名'
    },{
        prop: 'idNumber',
        label: '证件号码',
        width: 170
    },{
        prop: 'acceptNum',
        label: '受理号'
    },{
        prop: 'coachName',
        label: '教练'
    },{
        prop: 'examPlaceName',
        label: '考场'
    },{
        prop: 'examDate',
        label: '考试日期',
        formatter: (val) => {
            if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
        }
    },{
        prop: 'examTime',
        label: '时间',
        formatter: (val) => {
            return formatDate(new Date(val), 'hh:mm:ss')
        }
    },{
        prop: 'disable',
        label: '状态',
        formatter:(val)=>{
          return val?"无效":"有效"
        }
    },{
        prop: 'exceptionReason',
        label: '异常原因'
    }
]
/*考试批复*/
export const replyTableModel = [
    {
        type: 'index',
        label: '序号',
        prop: 'iundex',
        width: 55,
        align: 'center'
    },{
        prop: 'userName',
        label: '学员姓名'
    },{
        prop: 'idNumber',
        label: '证件号码',
        width: 170
    },{
        prop: 'acceptNum',
        label: '受理号'
    },{
        prop: 'coachName',
        label: '教练'
    },{
        prop: 'examPlaceName',
        label: '考场'
    },{
        prop: 'examDate',
        label: '考试日期',
        formatter: (val) => {
            if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
        }
    },{
        prop: 'examTime',
        label: '时间',
        formatter: (val) => {
            return formatDate(new Date(val), 'hh:mm:ss')
        }
    }
]

/*考试管理*/
export const examManagerTableModel = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    prop: 'userName',
    label: '学员姓名'
  },{
    prop: 'idNumber',
    label: '证件号码',
    width: 170
  },{
    prop: 'acceptNum',
    label: '受理号'
  },{
    prop: 'coachName',
    label: '教练'
  },{
    prop: 'examPlaceName',
    label: '考场'
  },{
    prop: 'examGrade',
    label: '考试成绩',
    formatter:(val)=>{
      return parseExamGrade(val)
    }
  },{
    prop: 'examDate',
    label: '考试日期',
    formatter: (val) => {
        if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
    }
  },{
    prop: 'examTime',
    label: '时间',
    formatter: (val) => {
      return formatDate(new Date(val), 'hh:mm:ss')
    }
  }
]

/*缴费等级*/
export const payRegister = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    prop: 'userName',
    label: '学员姓名'
  },{
    prop: 'idNumber',
    label: '证件号码',
    width: 170
  },{
    prop: 'payNum',
    label: '缴费号'
  },{
    prop: 'state',
    label: '付款状态',
    formatter: (val) => {
      return cache.loadDictCache.pay_state[val]
    }
  },
]


/*受理资料移交tableModel*/
export const acceptModel = [
  {
    type: 'index',
    label: '序号',
    prop: 'iundex',
    width: 55,
    align: 'center'
  },{
    label: '办证科目',
    prop: 'certProjectName',
    align: 'center'
  },{
    label: '批次号',
    prop: 'batchNum',
    align: 'center'
  },{
    label: '片区',
    prop: 'areaId',
    align: 'center',
    formatter (val) {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    label: '门店',
    prop: 'storeId',
    align: 'center',
    formatter (val) {
      return cache.loadOrgCache.orgMap[val]
    }
  },{
    label: '姓名',
    prop: 'userName',
    align: 'center'
  },{
    label: '证件号',
    prop: 'idNumber',
    align: 'center'
  },{
    label: '联系电话',
    prop: 'phone',
    align: 'center'
  },{
    label: '办证日期',
    prop: 'createdAt',
    align: 'center',
    formatter: (val) => {
        if(val === null){ return '-' }else{ return timeFormate(new Date(val))}
    }
  },{
    label: '照片回执号',
    prop: 'photoEcho',
    align: 'center'
  },{
    label: '状态',
    prop: 'state',
    align: 'center',
    formatter: (val) => {
      console.log(val)
      return val === '1'?'已处理':'未处理'
    }
  }
]

export const types = {
    1: '门店交资料',
    2: '片区交资料',
    3: '牌证收资料',
    4: '转校完成'
}


export const nationalitys = [{label: '全部',value: ''},{label: '本市', value:5},{label: '外市', value:6}]
export const normalFormModel = [
  {
    group:true,
    label:'片区及门店',
    elemType:'group',
    childs:[
      {
        elemType:'select',
        placeholder:'请选择片区',
        prop:'areaId',
        disable:cache.userInfo.userInfo !== undefined && !cache.userInfo.userInfo.areaId?false:true,
        defaultValue: cache.userInfo.userInfo !== undefined ?cache.userInfo.userInfo.areaId:'',
        col:'areaName',
        colVal:'areaId',
        classes:'noRadiusRight',
        width:130,
        options: areaList,
        changeCallback ($event, item, formModel, formData) {
          var storeList = cache.loadOrgCache.areaStoreMap[$event]
          if(!storeList){
            storeList = []
          }
          storeList.unshift({
            storeId: '',
            storeName: '全部'
          })
          formModel[1].options = storeList
          formData.storeId = ''
        },
      },{
        elemType:'select',
        placeholder:'请选择门店',
        prop:'storeId',
        styles:'margin-left: 20px',
        defaultValue:!cache.userInfo.userInfo?'':cache.userInfo.userInfo.storeId,
        col:'storeName',
        colVal:'storeId',
        width:130,
        disable:cache.userInfo.userInfo !== undefined &&!cache.userInfo.userInfo.storeId?false:true,
        classes:'noRadiusLeft',
        options:[]
      }
    ]
  },{
    elemType:'select',
    label: '班别',
    placeholder:'全部',
    prop:'classTypeId',
    styles:'margin-left: 20px',
    defaultValue:'',
    col:'name',
    colVal:'id',
    width:200,
    classes:'noRadiusLeft',
    options:[]
  },{
    elemType:'select',
    label: '户籍',
    placeholder:'全部',
    prop:'nationality',
    styles:'margin-left: 20px',
    defaultValue:'',
    col:'label',
    colVal:'value',
    width:200,
    classes:'noRadiusLeft',
    options: nationalitys
  }
]



export const billTableModel = [
  {
    prop: 'goodsName',
    label: '商品'
  },{
    prop: 'goodsPrice',
    label: '单价（元）'
  }, {
    prop: 'goodsTotalPrice',
    label: '商品总价（元）'
  },{
    prop: 'orderAmount',
    label: '订单金额（元）'
  },{
    prop: 'actualReceiptAmount',
    label: '实收金额（元）'
  },{
    prop: 'waitAmount',
    label: '待收金额（元）'
  }
]
