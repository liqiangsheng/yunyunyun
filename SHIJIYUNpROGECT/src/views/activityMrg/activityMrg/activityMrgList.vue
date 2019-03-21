<template>
    <!--活动列表-->
    <div class="main-box">
        <div class="form-box">
                <div class="input-box-center"  >
                    <el-form :inline="true" :model="formData" class="demo-form-inline">
                        <el-row>
                                <div class="addActivity">
                                    <span>新建</span>
                                    <el-button type="primary" class="cursor" disabled @click="manyActivity">多活动</el-button>
                                    <el-button type="primary" class="cursor" @click="singleActivity">单活动</el-button>
                                </div>
                                <div class="time">
                                    <p> <span>从</span>
                                        <span class="lineHeight">
                                            <el-date-picker
                                                    v-model="formData.fromTime"
                                                    type="date"
                                                    placeholder="选择日期时间">
                                           </el-date-picker>
                                        </span>
                                    </p>
                                    <p><span>到</span>
                                        <span class="lineHeight">
                                            <el-date-picker
                                                v-model="formData.reachTime"
                                                type="date"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </span>
                                    </p>
                                </div>
                        </el-row>
                        <!---------------->
                        <el-row>

                            <div class="time1">
                                <p> <span>状态</span>
                                    <span class="lineHeight">
                                            <el-select v-model="formData.status" placeholder="请选择状态">
                                                <el-option v-for="(item,index) in formSelect.statusA" :key="index" :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </span>
                                </p>
                                <p> <span class="lineHeight marginLeft">
                                            <el-input v-model="formData.content" placeholder="请输入活动号、标题搜索">
                                            </el-input>
                                        </span>
                                </p>

                            </div>
                            <div class="fromBtn">
                                <el-button type="primary" size="small" @click="search"  class="btn-active" id="search">搜索</el-button>
                                <el-button type="primary" size="small" @click="reset"  id="reset">重置</el-button>
                            </div>

                        </el-row>
                    </el-form>
                </div>
            </div>
            <div class="tabBar">
                  <table>
                      <thead>
                          <tr class="theads">
                              <th v-for="(item,index) in theadName" :key="index">{{item}}</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(item,index) in tbodyData">
                              <!-- 序号-->
                              <td width="50">{{index+1}}</td>
                              <!--标记-->
                              <td width="90">{{item.multiActivity?"多":"单"}}</td>
                              <!--活动号-->
                              <td class="address">{{item.id}}</td>
                              <!--活动名称-->
                              <td class="address">{{item.title}}</td>
                              <!--城市-->
                              <td width="90">{{item.regionName}}</td>
                              <!--活动时间-->
                              <td class="signUpTime">从{{$moment(item.startTime).format("YYYY-MM-DD")}}到{{$moment(item.endTime).format("YYYY-MM-DD")}}</td>
                              <!--报名人数-->
                              <td width="90">{{item.signCount}}</td>
                              <!--状态-->
                              <td width="90">
                                  <span class='homeBottomstate' v-if="nowTime >item.signStartTime && nowTime <item.signEndTime">
                                      立即报名
                                  </span>
                                  <span class='homeBottomstate' v-if="nowTime < item.signStartTime">
                                      即将开始
                                  </span>
                                  <span class='homeBottomstate' v-if="nowTime <= item.sendTime && nowTime >= item.sstartTime">
                                      正在进行
                                  </span>
                                  <span class='homeBottomstate end' v-if="nowTime >item.endTime">
                                      活动结束
                                  </span>
                                  <span class='homeBottomstate end' v-if="nowTime > item.signEndTime && nowTime < item.sstartTime">
                                      报名结束
                                  </span>
                              </td>
                              <!--报名时间-->
                              <td class="signUpTime">从{{$moment(item.signStartTime).format("YYYY-MM-DD")}}到{{$moment(item.signEndTime).format("YYYY-MM-DD")}}</td>
                              <!--管理部门-->
                              <td width="90">
                                  <el-input v-model="item.responsibleOrg" placeholder="无"></el-input>
                              </td>
                              <td width="300">
                                  <span class="cursor fontColor operation" @click="commonFnc(name='查看',item)">查看</span>
                                  <span class="cursor fontColor operation" @click="commonFnc(name='编辑',item)">编辑</span>
                                  <!--<span class="cursor fontColor operation" @click="commonFnc(name='审批发布')">审批发布</span>-->
                                  <!--<span class="cursor fontColor operation" @click="commonFnc(name='冻结')">冻结</span>-->
                                  <!--<span class="cursor fontColor operation" @click="commonFnc(name='取消')">取消</span>-->
                                  <span class="cursor fontColor operation" @click="commonFnc(name='门票',item)">门票</span>
                                  <span class="cursor fontColor operation" @click="commonFnc(name='分享',item)">分享</span>
                                  <span class="cursor fontColor operation" @click="commonFnc(name='删除',item)">删除</span>
                              </td>
                              <!--原价-->
                              <td width="100" style="padding-right: 10px">
                                  <el-input v-model="item.originalPrice" type="number" placeholder="原价"></el-input>
                              </td>
                              <!--优惠-->
                              <td width="100" style="padding-right: 10px">
                                  <el-input v-model="item.payPrice" type="number" placeholder="优惠价"></el-input>
                              </td>
                              <!--门票数量-->
                              <td width="100">
                                  <el-input v-model="item.quantity" type="number" placeholder="门票"></el-input>
                              </td>
                              <td width="140">
                                  <span class="cursor fontColor operation" style="margin: 0 15px 0 0 " @click="signUpSetting(item)">设置</span>{{item.noteMode|noteMode}}
                              </td>
                              <td width="210" style="text-align: left">
                                  <span class="cursor fontColor operation"  @click="commonFnc(name='登记设置',item)">登记设置</span>
                                  <span class="cursor fontColor operation" @click="signUpDetail(item)">报名详单</span>
                              </td>
                              <td class="face"  width="100">
                                  <!--<el-select v-model="item.faceDetection" placeholder="请选择" @change="faceChange()">-->
                                      <!--<el-option label="人脸" value="1"></el-option>-->
                                      <!--<el-option label="无" value="2"></el-option>-->
                                  <!--</el-select>-->
                                  <el-select v-model="item.faceDetectionValue" placeholder="请选择">
                                      <el-option
                                              v-for="item in item.faceDetectionList"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                      </el-option>
                                  </el-select>
                              </td>
                              <td class="remarks"  width="100">
                                  <el-input v-model="item.ticketRemark" @blur="remarksClick" placeholder="请输备注"></el-input>
                              </td>
                              <!--<td  width="90">-->
                                  <!--<span class="cursor fontColor operation" @click="SMSSettings">设置</span>-->
                              <!--</td>-->
                              <td class="timeNum"  width="120">
                                  <el-input type="number" v-model="item.payExpired" min="0" @blur="timeNumBlur(timeNum)"></el-input>
                                 分钟
                              </td>
                              <td class="face"  width="100">
                                  <el-select v-model="item.status" placeholder="请选择">
                                      <el-option
                                              v-for="item in item.statusStateList"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                      </el-option>
                                  </el-select>
                              </td>
                              <td  width="100">
                                  <span class="cursor fontColor operation" @click="determine(item)">确定修改</span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            :current-page="obj.p"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="obj.s"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        <!--短信设置-->
        <!--<el-dialog :append-to-body="true" class="dialog" title="报名短信设置" :visible.sync="addFormVisible" :close-on-click-modal="true" width="540px" top="10%">-->

                <!--<div>-->
                    <!--<h5>提示付款短信</h5>-->
                    <!--<el-input type="textarea" v-model="setForm.payment"placeholder="请输入提示付款短信"></el-input>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<h5>请输入成功提示</h5>-->
                    <!--<el-input type="textarea" v-model="setForm.success"placeholder="请输入成功提示"></el-input>-->
                <!--</div>-->
                    <!--<div>-->
                        <!--<h5>彩信图片（1张，可忽略，无图片将发送普通短信）</h5>-->
                        <!--&lt;!&ndash;<el-upload&ndash;&gt;-->
                                <!--&lt;!&ndash;style="transform: translateX(-70px)"&ndash;&gt;-->
                                <!--&lt;!&ndash;action="https://jsonplaceholder.typicode.com/posts/"&ndash;&gt;-->
                                <!--&lt;!&ndash;list-type="picture-card"&ndash;&gt;-->
                                <!--&lt;!&ndash;:limit="1"&ndash;&gt;-->
                                <!--&lt;!&ndash;:on-preview="handlePictureCardPreview"&ndash;&gt;-->
                                <!--&lt;!&ndash;:on-remove="handleRemove">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="el-icon-plus"></i>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-upload>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-dialog :visible.sync="dialogVisible">&ndash;&gt;-->
                            <!--&lt;!&ndash;<img width="100%" :src="dialogImageUrl" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-dialog>&ndash;&gt;-->
                        <!--<div class="upImg">-->
                            <!--<input type="file" @change="upDataImg($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">-->
                        <!--</div>-->

                    <!--</div>-->

                <!--<div  class="activityMrgList_foot">-->
                    <!--<span @click="addSubmit" :loading="addLoading">提交</span>-->
                    <!--&lt;!&ndash;<span @click.native="addFormVisible = false">取消</span>&ndash;&gt;-->
                <!--</div>-->


        <!--</el-dialog>-->
        <!--单独设置-->
        <el-dialog :append-to-body="true" class="dialog" title="" :visible.sync="shortMessageaShow" :close-on-click-modal="true" width="860px" top="10%">
            <shortMessageaAlter :shortMessageaItem="shortMessageaItem" v-if="shortMessageaShow" @signupPageLayoutinsert="signupPageLayoutinsert"></shortMessageaAlter>
        </el-dialog>
        <!--分享生成二维码-->
        <el-dialog :append-to-body="true" class="dialog" title="二维码" :visible.sync="qrcodeShow" :close-on-click-modal="true" width="300px" top="30%">
            <qrCode v-if="qrcodeShow" :activityID="activityID"></qrCode>
        </el-dialog>
        <!--删除活动-->
        <el-dialog
                :append-to-body="true"
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span>确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleC">确 定</el-button>
              </span>
        </el-dialog>
        </div>

</template>


<script>
   import shortMessageaAlter from "./alter/setting.vue"
   import qrCode from "./alter/qrcode.vue"
//          活动列表          // 字典               //删除活动   //更新活动
   import {activityInfoList,initLoadDicTree,activityInforemove,activityInfoupupdateInList} from '../../../api/activityMrg/activityMrg'
   const date = new Date().getTime();
    export default {
        components:{
            shortMessageaAlter,qrCode
        },
        data() {
            return {
                activityID:'',
                centerDialogVisible:false,//删除活动
                centerDialogVisibleId:'',//删除活动的Id
                qrcodeShow:false, // 二维码显示
                nowTime: date, //现在的时间
                urlImage:"",  //上传图片的url
                dialogImageUrl: '',//上传图片的url
                dialogVisible: false,//上传图片的url
                setForm:{  //短信设置的数据
                    payment:"",
                    success:"",
                },
                addLoading: false,
                addFormVisible: false,//新增界面是否显示
                shortMessageaItem:{},//独立页的数据
                shortMessageaShow:false, //独立入口弹窗的出现
                SignClose:"", // 报名关闭
                timeNum:0, //  付款时效
                remarks:"", // 备注
                face:"", //人脸识别
                entrance:'普通', //普通独立
                tableKey: 0,    //table表更新
                theadName:['序号','活动标记','活动号','活动名称','地点','时间','报名','状态','报名时间','管理部门','操作','原价','优惠价','门票数量','H5端登录设置','','人脸识别','门票备注？','付款时效','报名关闭','确认设置'],// 列表头部
                tbodyData:[], //body数据
                formData:{
                    fromTime:"", // 从什么时间
                    reachTime:"", // 到什么时间
                    status:"",  // 状态
                    content:"", // 内容
                },
                formSelect:{        //状态选择
                    statusA:[
                        {
                            code:"",
                            name:"--请选择--"
                        }
                    ]
                },
                pickerOptions1: {  // 事件插件
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
               obj:{
                   p:1, //当前页面
                   s:10,//跳转页面
                   activityStatus:"",
                   keyword:"",
                   startTimeFrom:"",
                   startTimeTo:null
               },
                total:0,   //分页总数量
            }
        },

//        watch:{
//          "entrance":function (newEntrance,oldEntrance) {
//              console.log(newEntrance)
//              if(newEntrance=="独立"){
//
//              }
//          }
//        },
        created(){
            initLoadDicTree().then(res=>{
                console.log(res,"res")
                if(res.data.status==true){
                    res.data.data.forEach((item,index)=>{
                        if(item.code=='activity_status'){
                            console.log(item.values)
                            console.log(this.formSelect.statusA)
                            this.formSelect.statusA =[ ...this.formSelect.statusA,...item.values];
                            console.log(this.formSelect.statusA)
                        }
                    })
                }else {
                    this.$message.warning('字典出错啦，请重试')
                }
            })

       this.query()
        },

        methods: {
            centerDialogVisibleC(){ //删除活动

                this.centerDialogVisible = false;
                activityInforemove(this.centerDialogVisibleId).then(res=>{
                    if(res.data.status==true){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.reset();
                    }else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
            },

            query(){//初始化数据
                activityInfoList(this.obj).then(res=>{
                    console.log(res,"活动列表")
                    if(res.data.status==true){
                        res.data.data.forEach((item,index)=>{
                            item.faceDetectionValue='否';
                            item.status='关闭';
                                item.faceDetectionList=[
                                {lebal:false,value:'否'},
                                {lebal:true,value:'是'}
                                ];
                            item.statusStateList=[
                                {lebal:4,value:'打开'},
                                {lebal:5,value:'关闭'}
                            ];
                            if(item.signStatus == 1||item.signStatus == true){
                                item.status = '打开'
                            }else {
                                item.status = '关闭'
                            }
                            if(item.faceDetection == true||item.faceDetection==1){
                                item.faceDetectionValue = '是'
                            }else {
                                item.faceDetectionValue = '否'
                            }
                        })
                        this.tbodyData = res.data.data;
                        this.total = res.data.total;   //分页总数量
                    }else{
                        this.$message.warning('网络出错啦，请重试')
                    }
                })
            },
            commonFnc(v,item){ //编辑 取消 分享 登记设置
                if(v === '编辑'){
                   this.$router.push({path:'/activitymrg/activityMrg/activityMrgAddSingle/eideActivityMrgSingle',query:{id:item.id}})
                }else if(v === '取消'){
                    console.log("取消")
                }else if(v === '分享'){
                    this.activityID = item.id;
                    this.qrcodeShow = true;
                }else if(v === '登记设置'){
                    this.$router.push({path:'/activitymrg/activityMrg/InformationSetting',query:{id:item.id}})
                }else if(v === '审批发布'){
                    console.log("审批发布")
                }else if(v === '冻结'){
                    console.log("冻结")
                }else if(v === '查看'){ //去活动查看列表
                    this.$router.push({path:'/activitymrg/activityMrg/activityMrgAddSingle/lookActivityMrgSingle',query:{id:item.id}})
                }else if(v === '删除'){ //活动删除
                  this.centerDialogVisible = true;
                   this.centerDialogVisibleId=[item.id]
                }else if(v === '门票'){ //活动删除
                    this.$router.push({path:'/activitymrg/activityMrg/admissionTicket',query:{id:item.id}})
                }
            },
            signupPageLayoutinsert(){ //独立页关闭
                this.shortMessageaShow = false;
                this.reset();
            },
            upDataImg(event,index){
                let filesObj=event.target.files[0];
                let filesName=event.target.files[0].name;
                let img=event.target.parentElement;
//                let url=this.$apiupdate+"/upload/kindeditorjson";       上传的接口
                let param = new FormData(); // 创建form对象
                param.append('file',filesObj, filesName);  // 通过append向form对象添加数据

            },
            handleRemove(file, fileList) {//上传图片
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {  //上传图片预览
                //上传图片
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;

            },
            signUpDetail(item){ //报名详单
                this.$router.push({path:"activityMrgDetail",query:{id:item.id}})
            },
            addSubmit(){  //短信设置的弹框

                this.addFormVisible = false;
            },
            determine(item){ // 确定修改
                console.log(item,"确定修改")
                let obj= {
                    id:item.id,
                    quantity:item.quantity?item.quantity:0,
                    responsibleOrg:item.responsibleOrg?item.responsibleOrg:'运营部',
                    ticketRemark:item.ticketRemark?item.ticketRemark:'无',
                    faceDetection:item.faceDetectionValue=="是"?1:0,
                    signStatus:item.status=='打开'?1:0,
                    payExpired:item.payExpired?item.payExpired:0,
                    originalPrice:item.originalPrice?item.originalPrice:0,
                    payPrice:item.payPrice?item.payPrice:0,
            }
                activityInfoupupdateInList(obj).then(res=>{
                      if(res.data.status==true){
                          this.$message.success('修改成功');
                          this.reset();
                      }else{
                          this.$message.warning(res.data.message)
                      }
                })
            },
            SignCloseChange(){ //报名关闭
                console.log("我选择了关闭")
            },
            timeNumBlur(v){ //付款时效小时
                console.log(v)
               if(v<0){
                   this.timeNum= 0;
               }
            },
            faceChange(){ //人脸识别事件
                console.log("我选择了")
            },
            remarksClick(){ // 备注失去焦点
               console.log("备注失去焦点")
            },
            SMSSettings(){ //  短信设置
                console.log("短信设置")
                this.addFormVisible = true;
            },
            radio(index,v){ //普通，独立
              console.log(index)
              console.log(v)
                if(v === "独立"){
                  this.shortMessageaShow = true;
                }else{
                    this.shortMessageaShow = false;
                }
            },
            signUpSetting(item){ // 报名独立的设置
                this.shortMessageaItem = item;
                this.shortMessageaShow = true;
            },
            manyActivity(){ //多活动
               this.$router.push({path:"activityMrgAddMany"})
            },
            singleActivity(){//单活动
                console.log(111111)
                this.$router.push({path:"/activitymrg/activityMrg/activityMrgAddSingle/newActivityMrgAddSingle"})
            },
            search(){ //搜索

                if(this.formData.fromTime){
                    this.formData.fromTime = this.$moment( this.formData.fromTime).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment( this.formData.fromTime).format('YYYY-MM-DD');
                }
                if(this.formData.reachTime){
                    this.formData.reachTime = this.$moment(this.formData.reachTime).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.formData.reachTime).format('YYYY-MM-DD');
                }

                this.obj={
                    activityStatus: this.formData.status,
                    keyword: this.formData.content,
                    p:this.obj.p,
                    s:this.obj.s,
                    startTimeFrom:this.formData.fromTime?this.formData.fromTime:null,
                    startTimeTo: this.formData.reachTime?this.formData.reachTime:null
                }
                this.query();
            },

            reset(){ //重置
                this.formData.status = '',
                this.formData.content = '',
                this.formData.fromTime = "";
                this.formData.reachTime = '';
                this.obj={
                    p:1, //当前页面
                    s:10,//跳转页面
                    activityStatus:"",
                    keyword:"",
                    startTimeFrom:"",
                    startTimeTo:''
                },
                  this.query();
            },
            getList(){ // 获取数据
               this.reset();
            },
            handleSizeChange(val) {     //每页显示多少行
                console.log(val)
                this.obj.s = val;
                this.query();
            },
            handleCurrentChange(val) {  //当前页
                this.obj.p = val;
                this.query();
            },
        }
    };
</script>

<style scoped lang="scss">
    .main-box{
            .addActivity{
                width: 240px;
                border-radius: 4px;
                overflow: hidden;
                padding-left: 10px;
                float: left;
                transform: translateY(25px);
                span{
                    font-size: 16px;
                    color: #262626;
                    line-height: 40px;
                }
                .el-button:nth-child(1){
                    font-size: 18px;
                    font-weight: 900;
                }
                .el-button:nth-child(1){
                    margin: 0 15px;
                }
            }
            .time,.time1{
                float: left;
                margin-left: 20px;
                height: 40px;
                padding: 0;
                transform: translateY(-14px);
                p{
                    float: left;
                    margin-left: 10px;
                    span{
                        display: inline-block;
                        color: #000000;
                        font-size: 14px;

                    }
                }
            }
            .time1{
                margin-left: 258px;
                margin-top: 10px;
            }

    }
    .cursor{
        cursor: pointer;
    }
    .fromBtn{
        transform: translateX(40px);
    }
    .tabBar{
        width: 100%;
        min-height: 800px;
        background: #fff;
        overflow-x: auto;
        -ms-overflow-x: auto;
        table{
            width: 2100px;
            thead{
                width: 100%;
                border:1px solid #ebeef5 ;
                border-bottom:none ;
                tr{
                    width: 100%;
                    border-bottom:1px solid #ebeef5 ;
                    height: 48px;
                    th{
                       font-weight: 100;
                        font-size: 14px;
                    }
                    th:nth-last-child(3){
                        width: 150px;
                    }
                }

            }
            tbody{
                width: 100%;
                tr{
                    width: 100%;
                    height: 48px;
                    text-align: center;
                    border-bottom:1px solid #ebeef5 ;
                    font-size: 14px;
                    color: #606266;
                    .address{
                        width:220px;
                        text-align: left;
                        padding: 0 5px;
                        word-break: break-all;
                    }
                   .signUpTime{
                        width:100px;
                        text-align: left;
                        padding: 0 5px;
                    }

                }
                tr:hover{
                    background: #F0FFFF;
                }
            }
        }

    }
</style>
<style lang="scss">
    .activityMrgList_foot{
        width: 100%;
            span{
                padding: 7px 12px;
                display: inline-block;
                border: 1px solid #41bdc7;
                background: #fff;
                color: #41bdc7;
                border-radius: 32px;
                float: right;
            }
            span:hover{
                background: #41bdc7;
                color: #ffffff;
                cursor: pointer;
            }
    }
    .lineHeight .el-date-editor .el-input__inner{
        line-height: 40px!important;
        height: 40px!important;
    }
    .lineHeight .el-input--suffix .el-input__inner{
        line-height: 40px!important;
        height: 40px!important;
    }
    .lineHeight .el-input .el-input__inner{
        line-height: 40px!important;
        height: 40px!important;
         width: 320px;
    }
    .face .el-input .el-input__inner,.remarks .el-input{
        width: 90px;
    }
    .timeNum .el-input{
        width: 90px;
    }

    .marginLeft  .el-input{
        margin-left: 18px;
    }
    .fontColor{
        color:	#0000FF;
    }
    .operation{
        display: inline-block;
        margin: 0 5px;
    }
    .upImg{
        width: 160px;
        height: 160px;
        border: 1px solid #41bdc7;
        border-radius:4px ;
        background:url("../../../assets/images/addImg.png") center no-repeat ;
        cursor: pointer;
        position: relative;
    }
    .upImg input{
        position: absolute;
        width:100%;
        height: 100%;
        right: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>