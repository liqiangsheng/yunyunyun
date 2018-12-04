<template>
    <div>
        <div class="headerBox" id="one">
            <div class="countTo-list" >
                <v-countTo :startVal="0" :endVal.sync="numbers.stuNum" :duration="1000" class="student">
                    <div slot='icon'><i class="fas fa-users font-size"></i></div>
                    <p slot="desc" class="desc">学员人数</p>
                </v-countTo>
                <v-countTo :startVal="0" :endVal.sync="numbers.carNum" :duration="1000" class="car item-margin">
                    <div slot='icon'><i class="fas fa-car font-size"></i></div>
                    <p slot="desc" class="desc">教练车</p>
                </v-countTo>
                <v-countTo :startVal="0" :endVal.sync="numbers.coachNum" :duration="1000" class="coach item-margin">
                    <div slot='icon'><i class="fas fa-user font-size"></i></div>
                    <p slot="desc" class="desc">教练人数</p>
                </v-countTo>
                <v-countTo :startVal="0" :endVal.sync="numbers.trainNum" :duration="1000" class="course item-margin">
                    <div slot='icon'><i class="fas fa-map font-size"></i></div>
                    <p slot="desc" class="desc">训练场</p>
                </v-countTo>
            </div>
        </div>
        <div  id="two">
            <div class="histogram">
                <ve-histogram :data="chartData" height="330px" :settings="chartSettingsOne"></ve-histogram>
            </div>
            <div class="ring">
                <ve-ring :data="ringChartData" :settings="chartSettings" width="100%" height="290px"></ve-ring>
            </div>
        </div>
       <div id="three">
           <div class="procedure " >
               <div class="procedure-title">
                   <span class="title-left home-left">待办流程</span>
                   <div class="home-right">
                       <span class="more" @click="_goMore">更多</span>
                       <refresh-icon  @refreshTable="_getProcessList()" style="margin-left: 5px;"></refresh-icon>
                   </div>
               </div>
               <el-table
                       :data="processTable"
                       stripe
                       tooltip-effect="dark"
                       :show-header="false"
                       :row-class-name="tableRowClassName"
                       v-loading="processLoad"
                       style="width: 100%">
                   <el-table-column v-for=" (col,index) in processModel "
                                    :key="col.prop"
                                    :prop="col.prop"
                                    :label="col.label"
                                    :formatter="col.formatter"
                                    :width = 'col.width'
                                    v-if="col.render == undefined">
                   </el-table-column>
                   <el-table-column  :label="col.label"  v-else :id="col.prop" :key="col.prop" :width = 'col.width'>
                       <template slot-scope='scope'>
                           <div @click="col.method(scope)">
                               <v-render  :render="col.render" :row="scope" :column="scope.row.column" :index="scope.row.$index"></v-render>
                           </div>
                       </template>
                   </el-table-column>
               </el-table>
           </div>


           <div class="order">
               <div class="order-title">
                   <span class="title-left home-left">消息通知</span>
                   <div class="home-right">
                       <span class="more_two" @click="_getMore">更多</span>
                       <refresh-icon  @refreshTable="_msgList()" style="margin-left: 5px;"></refresh-icon>
                   </div>
               </div>
               <div class="order-table">
                   <el-table
                           :data="msgTable"
                           v-loading="msgTableLoad"
                           @row-click="_changeRead"
                           stripe
                           tooltip-effect="dark"
                           :show-header="false"
                           style="width: 100%"
                           :row-class-name="_setReadedClass" >
                       <el-table-column v-for=" (col,index) in msgModel "
                                        :key="col.prop"
                                        :prop="col.prop"
                                        :width="col.width"
                                        :label="col.label"
                                        :formatter="col.formatter"
                                        v-if="col.render == undefined">
                       </el-table-column>
                       <el-table-column  :label="col.label"  v-else :id="col.prop" :key="col.prop" :width="col.width">
                           <template slot-scope='scope'>
                               <div>
                                   <v-render  :render="col.render" :row="scope" :column="scope.row.column" :index="scope.row.$index"></v-render>
                               </div>
                           </template>
                       </el-table-column>
                   </el-table>
               </div>

           </div>
       </div>

    </div>
</template>

<script>
    import render from '@/views/temp/expand'
    import countTo from '@/views/workbench/components/countTo'
    import Vue from 'vue'
    import VeHistogram from 'v-charts/lib/histogram'
    import Ring from 'v-charts/lib/ring'
    import {getNumbers,msgList,changeRead,enrollmentFinishingRate,getCertStudentProgress} from '@/api/workBench/workBench'
    import { getParent,timeFormate } from '@/utils/plugins'
    import {getList,detailList} from '@/api/workBench/workBench'
    Vue.component(VeHistogram.name, VeHistogram)
    Vue.component(Ring.name, Ring)
    export default {
        name: "newHome",
        components: {
            'v-countTo': countTo,
            'v-render':render
        },
        data(){
            this.chartSettings = {
                offsetY:180
            };
            this.chartSettingsOne = {
               // offsetY:380
               /* axisSite: { right: ['招生小计'] },
                yAxisType: ['KMB', 'percent'],
                yAxisName: ['数值', '比率']*/
            };
            return{
                // 数量统计
                numbers:{
                    stuNum:0,
                    carNum:0,
                    coachNum:0,
                    trainNum:0,
                },

                //图表
                chartData: {
                    /*columns: ['areaId', '啊啊', '招生小计'],
                    rows: [
                        { 'areaId': '片区1', '啊啊': 1393, '招生小计': 1093},
                        { 'areaId': '片区2', '啊啊': 3530, '招生小计': 3230 },
                    ]*/
                },

                ringChartData:{
                   /* columns: ['科目一', '访问用户'],
                    rows: [
                        { '科目一': '科目一', '访问用户': 1393 },
                        { '科目一': '科目二', '访问用户': 3530 },
                        { '科目一': '科目三', '访问用户': 2923 },
                    ]*/
                },
                tableData:[],

                //代办流程
                processTable:[],
                processModel:[
                    {
                        prop:'code',
                        label:'申请单号'
                    },
                    {
                        prop:'businessName',
                        label:'流程名称',
                        width:300,
                        render:(h,params) => {
                            var row = params.row.row;
                            return h('span',{
                                class:{
                                    'link-type':true
                                }
                            },row.businessName+'_'+row.applyUserName+'_'+this.formatDate(new Date(row.startTime),'yyyy-MM-dd'));
                        },
                        method:(scope) =>{
                            this._getDetail(scope);
                        }
                    },
                    {
                        prop:'applyUserName',
                        label:'创建人'
                    },
                    {
                        prop:'startTime',
                        label:'创建时间',
                        formatter:(row,col,colVal) =>{
                            return this.formatDate(new Date(colVal),'yyyy-MM-dd hh:mm:ss');
                        }
                    },
                    {
                        prop:'actName',
                        label:'下一个节点'
                    },
                    {
                        prop:'assigneeNames',
                        label:'审批人'
                    },
                    {
                        prop:'state',
                        label:'当前状态',
                        formatter:(row,col,colVal) =>{
                            return cache.loadDictCache.approval_state[colVal];
                        }
                    }

                ],
                processLoad:false,


                //消息通知
                msgTable: [],
                msgTableLoad:false,
                msgModel:[
                    {
                        prop:'createdAt',
                        label:'日期',
                        width:100,
                        render(h,params){
                            var row = params.row.row;
                            return h('div',{
                                    class:{
                                        times:true
                                    }
                                },
                                [
                                    h('span',{
                                        class:{
                                            point:true
                                        }
                                    }),
                                    h('span',timeFormate(new Date(row.createdAt)))
                                ]
                            );
                        }
                    },
                    {
                        prop:'type',
                        label:'类型',
                        width:100,
                        formatter:(row,col,colVal) =>{
                            return colVal == 0?'流程消息':'过期提醒'
                        }
                    },
                    {
                        prop:'content',
                        label:'内容',
                        render(h,params){
                            var row = params.row.row;
                            return h('span',{
                                style:{
                                    cursor:'pointer'
                                }
                            },row.content)
                        }
                    }
                ],





            }
        },
        methods:{
            handleSelectionChange(){

            },
            //图表---------------------------------------------------------------------
            getChartDat(){
                enrollmentFinishingRate({}).then(res=>{
                    if(res.data.status){
                        this.chartData = res.data.data;
                        console.log(res.data.data)
                    }
                })
            },
            getRing(){
                getCertStudentProgress({}).then(res=>{
                    if(res.data.status){
                        console.log(res.data.data)
                        this.ringChartData = res.data.data
                    }
                })
            },
         //

            //待办流程------------------------------------------------------------------
            //斑马纹
            tableRowClassName(scope){
                if (scope.rowIndex%2 === 0) {
                    return 'zebra-g';
                }
            },
            //流程列表
            _getProcessList(){
                this.processLoad = true;
                var search = {
                    p:1,
                    s:3,
                    flag:1
                }
                getList(search).then(res =>{
                    this.processTable = res.data.data;

                    setTimeout(() =>{
                        this.processLoad = false;
                    },200)
                })
            },
            //查看流程详情
            _getDetail(scope){
                var params = this.clearObj(scope.row);
                delete params.id;
                params.id = scope.row.businessKey;
                /*CertChCoachProcess*/
                params.processInstanceId = scope.row.procInstId;
                let data = {
                    component: detailList[scope.row.type].component,
                    name:  detailList[scope.row.type].name,
                    isRefresh:true,
                    data:{row:params}
                };
                this.$root.hubBus.$emit('menuClick', data);
            },

            _goMore(){
                this.$router.push({
                    path:'/workbench/process/waitQueue'
                });
            },
            //消息通知-------------------------------------------------------------------
            //获取更多
            _getMore(){
                this.$router.push({
                    path:'messages'
                });
            },
            //获取学员，教练，车辆数
            _getNumbers(){
                getNumbers().then(res =>{
                    if(res.data.status){
                        let datas = res.data.data;
                        if(datas !== undefined && datas.stuNum !== undefined){
                            this.numbers.stuNum = datas.stuNum;
                            this.numbers.carNum = datas.carNum;
                            this.numbers.coachNum = datas.coachNum;
                            this.numbers.trainNum = datas.trainNum;
                        }
                    }
                })
            },
            // 1

            //修改消息状态
            _changeRead(row, event, col){
                if(row.isRead === 0){
                    let params = {
                        id:row.id
                    };
                    changeRead(params).then(res =>{
                        this._msgList();
                        this._check(row, event, col);
                    })
                }else{
                    this._check(row, event, col);
                }
            },
            //设置已读信息的样式
            _setReadedClass(scope){
                let row = scope.row;
                if(row.isRead === 1){
                    return 'disable'
                }
            },
            //拉取消息列表
            _msgList(){
                this.msgTableLoad = true;
                let parmas = {
                    p:1,
                    s:3,
                    type:0,
                    content:''
                }
                msgList(parmas).then(res =>{
                    this.msgTable = res.data.data;
                    setTimeout(() =>{
                        this.msgTableLoad = false
                    },200);
                })
            },
            _check(row, event, col) {
                if(row.isRead === 0){
                    let parent = getParent(event.target, 'tr');
                    parent.classList.add('disable');
                }
                let params = this.clearObj(row);
                delete params.id;
                params.id = row.entityId;
                params.processInstanceId = row.processInstanceId;
                let data = {
                    component: detailList[row.url].component,
                    name:  detailList[row.url].name,
                    isRefresh:true,
                    data:{row:params}
                };
                this.$root.hubBus.$emit('menuClick', data);
            },
        },
        created(){
            this._msgList()
            this._getNumbers();
            this._getProcessList();
            this.getChartDat()
            this.getRing()
        }
    }
</script>

<style lang="scss" scoped>
    .home-left{
        float: left;
    }
    .home-right{
        float: right;
        margin-top: -3px;
        width: 47px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #424242;
        .more{
            margin-top: 2px;
            display: inline-block;
            cursor:pointer;
        }
        .more_two{
            margin-top: 3px;
            display: inline-block;
            cursor:pointer;
        }
    }
    .countTo-list {
        display: flex;
        justify-content: space-around;
        .countTo {
            flex: 1;
        }
        .student{
            background-color: #EA5D66;
            .font-size{ font-size: 40px;opacity: 0.7;color: #FFFFFF;}
        }
        .car{
            background-color: #53D191;
            .font-size{ font-size: 46px;opacity: 0.7;color: #FFFFFF;}
        }
        .coach{
            background-color: #51AEF3;
            .font-size{ font-size: 35px;opacity: 0.7;color: #FFFFFF;}
        }
        .course{
            background-color: #FFB306;
            .font-size{ font-size: 36px;opacity: 0.7;color: #FFFFFF;}
        }
    }
    .item-margin{
        margin-left: 10px;
    }
    //上左一
    .histogram{
        box-sizing:border-box;
        background:#ffffff;
        width: 68.7%;
        height: 330px;
        margin-top: 15px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        border-radius: 6px;
        padding: 20px 20px;
        display: inline-block;
        float: left;
        overflow: hidden;
    }
    //下右一
    .ring{
        box-sizing:border-box;
        background:#ffffff;
        width: 30.7%;
        height: 330px;
        margin-top: 15px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        border-radius: 6px;
        padding: 20px 20px;
        display: inline-block;
        float: right;
        overflow: hidden;
    }
    //代办流程
    .procedure{
        box-sizing:border-box;
        background:#ffffff;
        width: 68.7%;
        height: 385px;
        margin-top: 15px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        border-radius: 6px;
        padding: 20px 20px;
        display: inline-block;
        float: left;
      //  overflow: auto;
        .procedure-title{
            line-height: 25px;
            border-bottom: 1px solid #ebeef5;
            height: 25px;
            .title-left{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #424242;
            }
        }
    }
    .order{
        box-sizing:border-box;
        background:#ffffff;
        width: 30.7%;
        height: 385px;
        margin-top: 15px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
        border-radius: 6px;
        padding: 20px 20px;
        display: inline-block;
        float: right;
        overflow: hidden;
        .order-title{
            line-height: 25px;
            border-bottom: 1px solid #ebeef5;
            height: 25px;
            .title-left{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #424242;
            }
        }
        .order-table{
            overflow: auto;
            height: 355px;
        }
    }

   /* #one {
        animation: bounceInUp 1s;
    }
    #two {
        animation: bounceInUp 2s;
    }
    #three {
        animation: bounceInUp 3s;
    }*/
</style>