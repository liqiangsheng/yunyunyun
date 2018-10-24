import store from '@/store'
let host;
if (window.location.href.indexOf('localhost') >= 0) {
    host = window._Host.BASE_API + window._Host.BASE_CONTEXT
} else {
    host = '/apis'
}
/**
 *** 导入excel
 **/
export let fileImport = host + '/fin/finTransactionFlowingPos/import?access_token=';//POS刷卡流水导入
export let thirdFileImport = host + '/fin/finTransactionFlowingThirdparty/import?access_token=';//第三方交易流水导入
export let bankFileImport = host + '/fin/finTransactionFlowingBank/import?access_token=';//银行转账流水导入
export let paperyBillFileImport = host + '/fin/finReceipts/import?access_token=';//纸质票据导入
export let sysFileImport = host + '/marketing/orderTradeRecord/importInvoice?access_token=';//系统交易流水导入
export let importTeachingGroup = host + '/teaching/eduTeachingGroup/importTeachingGroup?access_token=';//系统交易流水导入
export let importRefund = host + '/cert/finRefundRecheck/importStatus?access_token=';//系统交易流水导入

export let finExpenseRecheckImportStatus = host + '/cert/finExpenseRecheck/importStatus?access_token=';//支出复核导入接口

export let importCertMoneySupervision = host + '/cert/certMoneySupervision/importCertMoneySupervision?access_token=';//资金监管导入接口
export let certMoneySupervisionExport = host + '/cert/certMoneySupervision/export?access_token=';

/**
 *** 财务导出excel
 **/
export let exportPrintInvoice = host + '/marketing/orderTradeRecord/exportPrintInvoice?access_token=';//系统交易流水导入
export let exportStoreIncomeStatistic = host + '/fin/finReceiptRecheck/exportStoreIncomeStatistic?access_token=';//门店收入统计
export let exportGoodsSalesStatistic = host + '/fin/finReceiptRecheck/exportGoodsSalesStatistic?access_token=';//商品销售统计
export let exportPaymentChannelIncomeStatistic = host + '/fin/finReceiptRecheck/exportPaymentChannelIncomeStatistic?access_token=';//商品销售统计

export let exportFinPosExport = host + '/fin/finPos/export?access_token=';  // POS 终端机管理
export let exportFinTransactionFlowingPos = host + '/fin/finTransactionFlowingPos/export?access_token=';  // POS 机刷卡流水
export let exportFinTransactionFlowingBank = host + '/fin/finTransactionFlowingBank/export?access_token=';  // 银行转账流水管理
export let exportFinTransactionFlowingThirdparty = host + '/fin/finTransactionFlowingThirdparty/export?access_token=';  // 第三方交易流水管理
export let exportFinReceipts = host + '/fin/finReceipts/export?access_token=';  // 纸质票据管理导出
export let exportReceiptRecheck = host + '/fin/finReceiptRecheck/exportReceiptRecheck?access_token=';  // 收款复核 导出
export let exportFinRefundRecheck = host + '/cert/finRefundRecheck/export?access_token=';  // 退费复核 导出
export let exportfinExpenseRecheck = host + '/cert/finExpenseRecheck/export?access_token=';  // 支出复核
export let exportFinTransactionFlowingCash = host + '/marketing/orderTradeRecord/export?access_token=';  // 系统交易流水管理 导出

export let exportFinOrderList = host + '/fin/marketStatisticReport/orderStatisticDetailListExport?access_token=';  // 订单统计明细 导出
export let exportFinIncomeList = host + '/fin/marketStatisticReport/actualReceiveStatisticDetailListExport?access_token=';  // 实收统计明细 导出
export let exportFinUncollectedList = host + '/fin/marketStatisticReport/waitAmountStatisticExport?access_token=';  // 待收统计明细 导出
export let exportFinProductList = host + '/fin/marketStatisticReport/goodsStatisticDetailListExport?access_token=';  // 商品统计明细 导出
export let exportFinReduceList = host + '/fin/marketStatisticReport/reduceStatisticDetailListExport?access_token=';  // 减免统计明细 导出
export let exportFinReturnList = host + '/cert/finStatisticRefund/statisticRefundDetailListExport?access_token=';  // 退费统计明细 导出
export let exportFinPayList = host + '/cert/finStatisticRefund/statisticExpenseDetailListExport?access_token=';  // 退费统计明细 导出
export let exportstuOwedList = host + '/fin/marketStatisticReport/studentArrearageListExport?access_token=';  // 学员欠费查询 导出

/**
 * 财务导入
 */
export let importCertMoneySupervisionReview = host + '/cert/certMoneySupervisionReview/importCertMoneySupervisionReview?access_token=';  // 系统交易流水管理 导出
export let certMoneySupervisionReview = host + '/cert/certMoneySupervisionReview/export?access_token='

/**
 * 下载导入模板
 */
export let downSysImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FpmAnlh5HsUvbcyE1_UOKREfZaxu%2F%E5%8F%91%E7%A5%A8%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//系统交易流水导入模板
export let downPosImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FmKHXpfISrJsLxFmK7hvq18SPHkD%2FPOS%E6%B5%81%E6%B0%B4%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//POS流水导入模板
export let downExamReplyImportTemplate='http://o7d94lzvx.bkt.clouddn.com//Fj9VnGIQS3cw6CqL6M9SyDBS58Ja%2F%E8%80%83%E8%AF%95%E9%A2%84%E6%89%B9%E5%A4%8D%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls';//考试预批复导入模板
export let downExamApprovalImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FhZkifqwQ74I0cV4eCIlrcwoI0pp%2F%E6%8A%A5%E8%80%83%E6%89%B9%E5%A4%8D%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//考试批复导入模板
export let downExamResultImportTemplate='http://o7d94lzvx.bkt.clouddn.com//Fj3OYO61-i1Wgwg_8v3S3_Hj_f6R%2F%E8%80%83%E8%AF%95%E6%88%90%E7%BB%A9%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//考试成绩导入模板
export let downBankImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FoMLoFnkWyHbKg713teDIpWolTdo%2F%E9%93%B6%E8%A1%8C%E8%BD%AC%E8%B4%A6%E6%B5%81%E6%B0%B4%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//银行转账流水导入模板
export let downThirdImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FnGnvDJi2FBLt_Fo1pJQOrjJBGzJ%2F%E7%AC%AC%E4%B8%89%E6%96%B9%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//第三方导入模板
export let downPaperyBillImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FgWEW1biJLJOe-o8epaZaNegGr29%2F%E7%BA%B8%E8%B4%A8%E7%A5%A8%E6%8D%AE%E6%A8%A1%E6%9D%BF.xlsx';//纸质票据模板
export let downInvoiceImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FpmAnlh5HsUvbcyE1_UOKREfZaxu%2F%E5%8F%91%E7%A5%A8%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//发票信息导入模板
export let downICImportTemplate='http://o7d94lzvx.bkt.clouddn.com//Fi-pV8vCTr6s2-rp48WQbwO_rodb%2FIC%E5%8D%A1%E5%8F%91%E5%8D%A1%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//IC卡导入模板
export let downAcceptNumImportTemplate='http://o7d94lzvx.bkt.clouddn.com//Fv5511kQ1glt0IDt2-Sc_6LzSOyH%2F%E8%80%83%E5%9C%BA%E5%8F%97%E7%90%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls';//考场受理号导入模板
export let downRefundImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FmrfCtmOEKiSqXugem6doezeG8BU%2F%E9%80%80%E8%B4%B9%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//退费导入模板
export let downDisbursementImportTemplate='http://o7d94lzvx.bkt.clouddn.com//Fq9GTi54tsebZIE75MI5t9TQFRRf%2F%E6%94%AF%E5%87%BA%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF20180615.xlsx';//支出导入模板
export let downReviewImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FusdA9-_qcQmT716RnWqwGS4XtFX%2F%E8%B5%84%E9%87%91%E7%9B%91%E7%AE%A1%E5%A4%8D%E6%A0%B8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';//支出导入模板
export let downCapitalImportTemplate='http://o7d94lzvx.bkt.clouddn.com//FrgINF-CMmxvU6cPHr9urxo9ZWs8%2F%E8%B5%84%E9%87%91%E7%9B%91%E7%AE%A1%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls';
export let downReviewSupervision='http://o7d94lzvx.bkt.clouddn.com//FoVLzawp_Uwm5ZIE73c0VPL6pkMc%2F%E8%B5%84%E9%87%91%E7%9B%91%E7%AE%A1%E5%A4%8D%E6%A0%B8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';

/**
 *** 车务导出excel
 **/
export let exportBasicInfo = host + '/car/carInfo/export?access_token=';//导出车辆基础信息excel
export let exportFuelDiary = host + '/car/refuelingRecord/export?access_token=' ;//导出加油记录excel
export let exportAnnualRecord = host + '/car/annualRecord/export?access_token=';//导出年审记录excel
export let exportInsurance = host + '/car/insuranceRecord/export?access_token=';//导出保险记录excel
export let exportAccidentClaims = host + '/car/accidentClaimSettlement/export?access_token=';//导出事故理赔记录excel
export let exportCarStatistics = host + '/car/carInfo/exportCarStatistics?access_token=';//导出车务统计excel
export let manufacturerBrandExport = host + '/car/manufacturerBrand/export?access_token=';
export let oilCardInfoExport = host + '/car/oilCardInfo/export?access_token=';
export let parkingInfoExport = host + '/car/parkingInfo/export?access_token=' ;
export let usePropertiesExport = host + '/car/useProperties/export?access_token=';
export let insuranceRecordImport = host + '/car/insuranceRecord/import?access_token=';
export let refuelingRecordImport = host + '/car/refuelingRecord/import?access_token=';
export let parkingChangeExport = host + '/car/parkingChange/export?access_token='; // 停车点变更申请导出
export let carFuelCostReport = host + '/car/carFuelCostReport/export?access_token='; // 车辆燃料清单导出
export let carFeeAggregationReport = host + '/car/carFeeAggregationReport/export?access_token='; // 车辆费用清单导出










export let exportScrapedExpires = host + '/car/carScrapReminder/export?access_token=';//导出报废到期提醒excel
export let exportYearExpires = host + '/car/yearLimited/export?access_token=';//导出年审到期提醒excel
export let exportInsuranceExpires = host + '/car/insuranceReminder/export?access_token=';//导出保险到期提醒excel

export let exportCarDispatch = host + '/car/carTransfer/export?access_token=';//导出车辆调动申请excel
export let exportCarParkChange = host + '/car/carParkingChange/export?access_token=';//导出车辆停车点变更excel

/**
 *** 牌证导出excel
 **/
export let certStudentChangeSchoolDataExport = host + '/cert/certStudentChangeSchoolData/export?access_token=' ;
export let certAcceptSudentDataTransferExport = host + '/cert/certAcceptSudentDataTransfer/export?access_token=';
export let certExamPlaceProjectBatchExport = host + '/cert/certExamPlaceProjectBatch/export?access_token=' ;
export let certFirstProjectBatchExport = host + '/cert/certFirstProjectBatch/export?access_token=';
export let certSecondProjectBatchExport = host + '/cert/certSecondProjectBatch/export?access_token=';
export let certThirdProjectBatchExport = host + '/cert/certThirdProjectBatch/export?access_token=';
export let certFourthProjectBatchExport = host + '/cert/certFourthProjectBatch/export?access_token=';
export let certGraduateProjectBatchExport = host + '/cert/certGraduateProjectBatch/export?access_token=';
export let certPayCostExport = host + '/cert/certPayCost/export?access_token=';
export let certExamProjectBatchExport = host + '/cert/certExamProjectBatch/export?access_token=' ;
export let certTheoryCourseExport = host + '/cert/certTheoryCourse/export?access_token=';
export let certArchTransferExport = host + '/cert/certStudentArchiveTransfer/export?access_token=';
export let certArchTransferDetailExport = host + '/cert/certStudentArchiveTransferDetail/export?access_token=';
export let certStudentInfoChangeExport = host + '/cert/certStudentInfoChangeApply/export?access_token=' ;
export let certClassroomExport = host + '/cert/certClassroom/export?access_token=';
export let certServiceInfoExport = host + '/cert/certServiceInfo/export?access_token=';
export let certLicenseOvertime = host + '/cert/certServiceInfo/exportExpireCert?access_token=';   //证件过期提醒
export let certStudentStoreChangeApplyExport = host + '/cert/certStudentStoreChangeApply/export?access_token=';  // 转店申请
export let certStudentTheoryCourseChangeApplyExport = host + '/cert/certStudentTheoryCourseChangeApply/export?access_token=';  // 上课情况变更
export let certStudentExamApprovalChangeApplyExport = host + '/cert/certStudentExamApprovalChangeApply/export?access_token=';  // 考试批复
export let certStudentExamScoreChangeApplyExport = host + '/cert/certStudentExamScoreChangeApply/export?access_token=';  // 考试成绩
export let certTradeCancellationApplyExport = host + '/marketing/certTradeCancellationApply/export?access_token=';  // 交易作废申请
export let certStudentDiscountApplyExport = host + '/cert/certStudentDiscountApply/export?access_token=' ;  // 减免申请
export let certStudentExpenditureApplyExport = host + '/cert/certStudentExpenditureApply/export?access_token=';  // 支出申请
export let certStudentRefundApplyExport = host + '/cert/certStudentRefundApply/export?access_token=';  // 退费申请
export let certStudentCoachChangeApplyExport = host + '/cert/certStudentCoachChangeApply/export?access_token=';  // 变更教练管理
export let certStudentProjectRevokeApplyExport = host + '/cert/certStudentProjectRevokeApply/export?access_token=';  // 办证撤销管理
export let CertStudentLogoutApplyExport = host + '/cert/CertStudentLogoutApply/export?access_token=';  // 学员注销管理
export let exportDetail = host + '/cert/certExamProjectBatch/exportDetail?access_token=';

export let exportExamHallCert = host; //IC发卡

export let certInfoExamTimesExportDetail = host + '/cert/certInfoExamTimesStatistics/exportDetail?access_token='; //次数统计
export let exportApprovalDetail = host + '/cert/certInfoExamTimesStatistics/exportApprovalDetail?access_token='; //考试批复

export let exportGrduationCycleDetail = host + '/cert/certGrduationCycleStatistical/exportGrduationCycleDetail?access_token='; //导出毕业周期统计列表
export let exportCycleDetail = host + '/cert/certHandingCycleStatisticalDetail/exportCycleDetail?access_token='; //导出办证周期统计列表
export let exportStateDetail = host + '/cert/certStateStatisticalController/exportStateDetail?access_token='; //导出状态统计列表
export let exportInfoStatisticsDetail = host + '/cert/certInfoChangeStatistics/detailExport?access_token='; //导出信息变更统计
export let exportStockStatisticsDetail = host + '/cert/certStudentStockStatistics/detailExport?access_token='; //导出信息变更统计
/**
 *** 牌证导入excel
 **/
export let importAcceptNum = host + '/cert/certExamPlaceProjectBatch/importAcceptNum?access_token=' ;

export let importExamApprovel = host + '/cert/certExamProjectBatch/importExamApprovel?access_token=';
export let importGradeApprovel = host + '/cert/certExamProjectBatch/importGradeApprovel?access_token=';
export let importPreExamApprovel = host + '/cert/certExamProjectBatch/importPreExamApprovel?access_token=';
export let importExamHallCert = host;
export let importStuLogoutMg = host+'/cert/CertStudentLogoutApply/import?access_token=';



/**
 * 教务教练列表导出
 */

export let exportLoadStudentDetail = host + '/teaching/eduLoadStudent/exportLoadStudentDetail?access_token=';//导出教练负荷-学员详情
export let exportExamInfo = host + '/cert/certExamGradeInfo/exportExamGradeInfo?access_token=';//导出教练负荷学员-考试详情
export let exportLoadStudentApprovalInfo = host + '/cert/certExamApprovalInfo/exportGoodsUnitList?access_token=';//导出教练负荷学员-报考详情
export let exportExamUrl = host + '/teaching/eduCourseExam/exportExam?access_token=';//导出考场
export let exportClassroom = host + '/teaching/eduCourseClassroom/exportClassroom?access_token=';
export let exportTraining = host + '/teaching/eduCourseTraining/exportTraining?access_token=';
export let exportQualiRate = host + '/teaching/eduExamQualifiedIndex/exportQualifiedIndex?access_token='
export let exportExamIndex  = host+ '/teaching/eduExamIndex/exportExamIndex?access_token='

/**
 * 营销导出
 */

export let exportComodity =  host + '/marketing/marketGoodsUnit/exportGoodsUnitList?access_token=';//导出商品单元管理
export let exportGoods =  host + '/marketing/marketGoods/exportGoodsList?access_token=';//导出商品管理|商品核销管理
export let exportSetMeal = host + '/marketing/marketCombo/exportSetMeal?access_token=';//导出商品套餐
export let exportClass = host + '/marketing/marketClass/exportClassList?access_token=';//导出班别
export let exportAgencySell = host + '/marketing/marketAgencySell/exportAgencySellList?access_token=';//导出代销商家
export let exportMarketOrder = host + '/marketing/marketOrder/export?access_token=';//导出订单管理
export let exportStore = host + '/marketing/marketStore/exportMStoreList?access_token=';//导出门店
export let exportMarketActivity = host + '/marketing/marketActivity/exportMarketOrderList?access_token=';//导出营销活动
export let exportRegionEnroll = host + '/marketing/marketEnrollQuotaArea/exportRegionEnrollList?access_token=';//导出片区招生指标
export let exportActivity = host + '/marketing/marketOutreachActivity/exportActivityList?access_token=';//导出外展活动
export let exportServiceSpeechExcel = host + '/marketing/marketCustomerServiceSpeech/exportServiceSpeech?access_token=';//导出客户服务话术
export let exportServiceTrack = host + '/marketing/marketCustomerServiceTrack/exportServiceTrack?access_token=';//导出客户服务跟踪记录
export let exportPotentialCustomers = host + '/marketing/marketPotentialCustomerManagement/exportPotentialCustomers?access_token=';//导出潜在客户
export let exportUserInfoByMarket = host + '/cert/certStatisticItemSet/exportUserInfoByMarket?access_token=';//导出服务预警-学员列表
export let exportServiceTrackCount = host + '/marketing/marketCustomerServiceTrack/exportServiceTrackCount?access_token=';//导出服务次数统计




export let exportMarketGoodsUnit = host + '/marketing/marketGoodsUnit/export?access_token=';//导出商品单元管理
export let marketGoodsExport = host + '/marketing/marketGoods/export?access_token=';//商品管理导出
export let marketComboExport = host + '/marketing/marketCombo/export?access_token=';//商品套餐管理导出
export let marketClassExport = host + '/marketing/marketClass/export?access_token=';//班别管理导出

/**
 *** 教务导出excel
 **/
export let teachingEduCoach = host + '/teaching/eduCoach/export?access_token=';  // 教练列表
export let eduTeachingGroup = host + '/teaching/eduTeachingGroup/export?access_token=';  // 导出教学组管理
export let exportEduCoachCopy = host + '/teaching/eduCopy/exportEduCoachCopy?access_token=';  // 导出教练列表备份
export let exportEduGroupCopy = host + '/teaching/eduCopy/exportEduGroupCopy?access_token=';  // 导出教学组备份
export let exportStudentAssign = host + '/teaching/eduLoadStudent/exportStudentAssign?access_token=';  // 导出学员分配记录
export let eduStudentAssignExport = host + '/teaching/eduStudentAssign/export?access_token=';  // 导出什么鬼...













