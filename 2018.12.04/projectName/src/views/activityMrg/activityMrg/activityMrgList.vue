<template>
    <!--活动列表-->
    <div class="main-box">
        <div class="form-box">
                <div class="input-box-center"  >
                    <el-form :inline="true" :model="formData" class="demo-form-inline">
                        <el-row>
                                <div class="addActivity">
                                    <span>新建</span>
                                    <span class="cursor" @click="manyActivity">多活动</span>
                                    <span class="cursor" @click="singleActivity">单活动</span>
                                </div>
                                <div class="time">
                                    <p> <span>从</span>
                                        <span class="lineHeight">
                                            <el-date-picker
                                                    v-model="formData.fromTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间">
                                           </el-date-picker>
                                        </span>
                                    </p>
                                    <p><span>到</span>
                                        <span class="lineHeight">
                                            <el-date-picker
                                                v-model="formData.reachTime"
                                                type="datetime"
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
                                                <el-option v-for="(item,index) in formSelect.statusA" :key="index" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </span>
                                </p>
                                <p> <span class="lineHeight marginLeft">
                                            <el-input v-model="formData.content" placeholder="请输入内容号、标题、作者进行搜索">
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
                          <tr v-for="(item,index) in 10">
                              <!-- 序号-->
                              <!--<td v-for="(item,index) in tbodyName">{{item}}</td>-->
                              <td width="50">{{index+1}}</td>
                              <td width="90">1</td>
                              <td width="90">2</td>
                              <td class="address">广东省深圳市南山区福田区沙保税区某某某某某某地方</td>
                              <td width="90">深圳市</td>
                              <td class="signUpTime">从2018-11-15到2018-11-15</td>
                              <td width="90">6</td>
                              <td width="90">7</td>
                              <td class="signUpTime">从2018-11-15到2018-11-15</td>
                              <td width="90">9</td>
                              <td width="90">10</td>
                              <td width="150">
                                  <span class="cursor fontColor operation" @click="commonFnc(name='编辑')">编辑</span>
                                  <span class="cursor fontColor operation" @click="commonFnc(name='取消')">取消</span>
                                  <span class="cursor fontColor operation" @click="commonFnc(name='分享')">分享</span>
                              </td>
                              <td width="70">
                                  <el-radio-group v-model="entrance" @change="radio(index,entrance)">
                                      <el-radio label="普通"></el-radio>
                                      <br>
                                      <el-radio label="独立"></el-radio>
                                  </el-radio-group>
                              </td>
                              <td width="210" style="text-align: left">
                                  <span class="cursor fontColor operation" style="margin: 0 15px 0 0 " @click="signUpSetting">设置</span>
                                  <span class="cursor fontColor operation"  @click="commonFnc(name='登记设置')">登记设置</span>
                                  <span class="cursor fontColor operation" @click="signUpDetail">报名详单</span>
                              </td>
                              <td class="face"  width="100">
                                  <el-select v-model="face" placeholder="请选择" @change="faceChange()">
                                      <el-option label="人脸" value="1"></el-option>
                                      <el-option label="无" value="2"></el-option>
                                  </el-select>
                              </td>
                              <td class="remarks"  width="100">
                                  <el-input v-model="remarks" @blur="remarksClick" placeholder="请输备注"></el-input>
                              </td>
                              <td  width="90">
                                  <span class="cursor fontColor operation" @click="SMSSettings">设置</span>
                              </td>
                              <td class="timeNum"  width="120">
                                  <el-input type="number" v-model="timeNum" min="0" @blur="timeNumBlur(timeNum)"></el-input>
                                  <span class=" fontColor operation">小时</span>
                              </td>
                              <td class="face"  width="100">
                                  <el-select v-model="SignClose" placeholder="请选择" @change="SignCloseChange()">
                                      <el-option label="打开" value="1"></el-option>
                                      <el-option label="关闭" value="2"></el-option>
                                  </el-select>
                              </td>
                              <td  width="100">
                                  <span class="cursor fontColor operation" @click="determine()">确定修改</span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        <!--短信设置-->
        <el-dialog :append-to-body="true" class="dialog" title="报名短信设置" :visible.sync="addFormVisible" :close-on-click-modal="true" width="540px" top="10%">

                <div>
                    <h5>提示付款短信</h5>
                    <el-input type="textarea" v-model="setForm.payment"placeholder="请输入提示付款短信"></el-input>
                </div>
                <div>
                    <h5>请输入成功提示</h5>
                    <el-input type="textarea" v-model="setForm.success"placeholder="请输入成功提示"></el-input>
                </div>
                    <div>
                        <h5>彩信图片（1张，可忽略，无图片将发送普通短信）</h5>
                        <!--<el-upload-->
                                <!--style="transform: translateX(-70px)"-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <!--list-type="picture-card"-->
                                <!--:limit="1"-->
                                <!--:on-preview="handlePictureCardPreview"-->
                                <!--:on-remove="handleRemove">-->
                            <!--<i class="el-icon-plus"></i>-->
                        <!--</el-upload>-->
                        <!--<el-dialog :visible.sync="dialogVisible">-->
                            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                        <!--</el-dialog>-->
                        <div class="upImg">
                            <input type="file" @change="upDataImg($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                        </div>

                    </div>

                <div  class="activityMrgList_foot">
                    <span @click="addSubmit" :loading="addLoading">提交</span>
                    <!--<span @click.native="addFormVisible = false">取消</span>-->
                </div>


        </el-dialog>
        <!--单独设置-->
        <el-dialog :append-to-body="true" class="dialog" title="" :visible.sync="shortMessageaShow" :close-on-click-modal="true" width="860px" top="10%">
            <shortMessageaAlter></shortMessageaAlter>
        </el-dialog>
        </div>

</template>


<script>
   import shortMessageaAlter from "./alter/setting.vue"
    export default {
        components:{
            shortMessageaAlter
        },
        data() {
            return {
                urlImage:"",  //上传图片的url
                dialogImageUrl: '',//上传图片的url
                dialogVisible: false,//上传图片的url
                setForm:{  //短信设置的数据
                    payment:"",
                    success:"",
                },
                addLoading: false,
                addFormVisible: false,//新增界面是否显示
                shortMessageaShow:false, //独立入口弹窗的出现
                SignClose:"", // 报名关闭
                timeNum:0, //  付款时效
                remarks:"", // 备注
                face:"", //人脸识别
                entrance:'普通', //普通独立
                tableKey: 0,    //table表更新
                theadName:['序号','活动标记','活动号','活动名称','地点','时间','报名','状态','报名时间','费用','管理部门','操作','报名入口','','人脸识别','门票备注？','短信设置','付款时效','报名关闭','确认设置'],// 列表头部
                tbodyName:['0','1','2','广东省深圳市南山区福田区沙保税区某某某某某某地方','4','从2018-11-15到2018-11-15','6','7','从2018-11-15到2018-11-15','9','10','11','12','13','14？','15','16','17','18'],// 列表头部
                formData:{
                    fromTime:"", // 从什么时间
                    reachTime:"", // 到什么时间
                    status:"",  // 状态
                    content:"", // 内容
                },
                formSelect:{        //状态选择
                    statusA:[
                        {
                            label:"",
                            value:"--请选择--"
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
                pageSize:10, //当前页面
                currentPage:1,  //跳转页面
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

        methods: {
            commonFnc(v){ //编辑 取消 分享 登记设置
                if(v === '编辑'){
                     console.log("编辑")
                }else if(v === '取消'){
                    console.log("取消")
                }else if(v === '分享'){
                    console.log("分享")
                }else if(v === '登记设置'){
                    console.log("登记设置")
                }
            },
            upDataImg(event,index){
                let filesObj=event.target.files[0];
                let filesName=event.target.files[0].name;
                let img=event.target.parentElement;
//                let url=this.$apiupdate+"/upload/kindeditorjson";       上传的接口
                let param = new FormData(); // 创建form对象
                param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
//                this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
//                    let data=res.data;
//                    if(data.error==0){
//                        img.style.background= "url("+data.url+") center center no-repeat";
//                        img.style.backgroundSize= "100% 100%";
//                        this.upImg=data.url;   //参数是ajax返回的图片地址
//                    }else{
//                        this.$queryFun.successAlert.call(this,"上传失败");
//                    }
//                });
            },
            handleRemove(file, fileList) {//上传图片
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {  //上传图片预览
                //上传图片
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;

            },
            signUpDetail(){ //报名详单
                this.$router.push({path:"activityMrgDetail"})
            },
            addSubmit(){  //短信设置的弹框
                console.log(11111111)
                this.addFormVisible = false;
            },
            determine(){ // 确定修改
                console.log("确定修改")
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
            signUpSetting(){ // 报名独立的设置
                this.shortMessageaShow = true;
            },
            manyActivity(){ //多活动
               this.$router.push({path:"activityMrgAddMany"})
            },
            singleActivity(){//单活动
                this.$router.push({path:"activityMrgAddSingle"})
            },
            search(){ //搜索

                if(this.formData.fromTime){
                    this.formData.fromTime = this.$moment( this.formData.fromTime).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment( this.formData.fromTime).format('YYYY-MM-DD HH:mm:ss');
                }
                if(this.formData.reachTime){
                    this.formData.reachTime = this.$moment(this.formData.reachTime).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.formData.reachTime).format('YYYY-MM-DD HH:mm:ss');
                }
                console.log(this.formData)
            },
            reset(){ //重置
               this.formData={
                        fromTime:"", // 从什么时间
                        reachTime:"", // 到什么时间
                        status:"",  // 状态
                        content:"", // 内容
                }
            },
            getList(){ // 获取数据
               console.log(1)
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
        }
    };
</script>

<style scoped lang="scss">
    .main-box{
            .addActivity{
                width: 180px;
                border-radius: 4px;
                background: #00B2EE;
                overflow: hidden;
                padding-left: 10px;
                float: left;
                transform: translateY(25px);
                span{
                    font-size: 16px;
                    color: #FFFFFF;
                    line-height: 40px;
                }
                span:nth-child(1){
                    font-size: 18px;
                    font-weight: 900;
                }
                span:nth-child(2){
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
                margin-left: 198px;
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
        min-height: 400px;
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