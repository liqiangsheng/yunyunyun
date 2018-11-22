<template>
    <div class="main-box">
        <div class="form-box input-box-center">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <div class="boxTitle">基本信息</div>
                <el-row :span="24">
                    <el-col :span="6">
                        <el-form-item label="商品单元名称：" label-width="30%"  prop="goodsName" :rules="filter_rules({required:true})">
                            <el-input v-model="formData.goodsName" placeholder="请输入商品单元名称" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商品单元编码：" label-width="30%" prop="goodsCode" :rules="filter_rules({ required:true,type:'letterAndNumber'})">
                            <el-input v-model="formData.goodsCode" placeholder="请输入商品单元编码" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="价格（元）：" label-width="30%">
                            <el-input v-model="formData.price" placeholder="请输入价格" :maxlength="20" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="代销合作商家：" label-width="30%" prop="agencySellerId" >
                            <el-select v-model="formData.agencySellerId" placeholder="请选择">
                                <el-option v-for="item in formSelect.agencySellerId" :key="item.value"
                                           :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="基础商品单元：" label-width="30%" class="is-required">
                            <select-option-table :selectOption.sync="formData.selectOption" :optionData.sync="optionData" @close="optionClose"></select-option-table>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="附加商品单元：" label-width="30%">
                            <select-option-table :selectOption.sync="formData.attachedGoodsUnitIds" :optionData.sync="optionDataS" @close="optionCloseS"></select-option-table>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="状态：" label-width="30%" prop="disable" :rules="{ required: true, message: '请选择状态'}">
                            <el-select v-model="formData.disable" placeholder="请选择">
                                <el-option v-for="item in formSelect.disable" :key="item.value"
                                           :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="boxTitle">核销信息</div>
                <el-row :span="24">
                    <el-col :span="6">
                        <el-form-item label="核销方式：" label-width="30%" prop="checkWay" :rules="filter_rules({required:true})" >
                            <el-select v-model="formData.checkWay" placeholder="请选择"  @change="checkWayFun">
                                <el-option v-for="item in formSelect.checkWay" :key="item.value"
                                           :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <template v-if="checkWayState">
                        <el-col :span="6">
                            <el-form-item label="办证菜单：" label-width="30%" prop="verificationStage" :rules="filter_rules({required:true})">
                                <el-select v-model="formData.verificationStage" placeholder="请选择" @change="selectedOption">
                                    <el-option v-for="item in formSelect.verificationStage" :key="item.value"
                                               :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="办证科目：" label-width="30%" prop="verificationNode" :rules="filter_rules({required:true})">
                                <el-select v-model="formData.verificationNode" placeholder="请选择" @change="selectedVerificationNode">
                                    <el-option v-for="item in formSelect.verificationNode" :key="item.id"
                                               :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="办证状态：" label-width="30%" prop="verificationNodeStatusData" :rules="filter_rules({required:true,type:'array'})">
                                <el-select
                                        v-model="formData.verificationNodeStatusData"
                                        multiple
                                        default-first-option
                                        @change="verificationChange"
                                        placeholder="请选择办证状态标签">
                                    <el-option
                                            v-for="item in formSelect.overdueNodeStatus"
                                            :key="item.state"
                                            :label="item.description"
                                            :value="item.state">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
                <div class="boxTitle">有效期</div>
                <el-row :span="24">
                    <el-col :span="6">
                        <el-form-item label="自动过期：" label-width="30%" prop="overdue" :rules="filter_rules({required:true})">
                            <el-select v-model="formData.overdue" placeholder="请选择" @change="overdueFun">
                                <el-option v-for="item in formSelect.overdue" :key="item.value"
                                           :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <template v-if="overdueStateShow">
                        <el-col :span="6">
                            <el-form-item label="有效期：" label-width="30%" prop="validityPeriod" :rules="filter_rules({required:true, type:'number' })">
                                <el-input v-model="formData.validityPeriod" placeholder="请输入有效期" :maxlength="4" style="width: 90%;margin-right: 5px;"></el-input>天
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="有效期开始阶段：" label-width="28%" prop="options" :rules="filter_rules({required:true,type:'array'})">
                                <el-cascader
                                        :options="formSelect.options"
                                        @active-item-change="handleItemChange"
                                        @change="itemChange"
                                        :props="props"
                                        v-model="formData.options"
                                >
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
                <el-row :span="24" style="text-align: center;margin-top: 10px;">
                    <el-button type="primary" size="small" @click="cancleSubmit()" id="cancleSubmit">取消</el-button>
                    <el-button type="primary" size="small" @click="saveSubmit('formData')" id="saveSubmit" class="btn-active">保存</el-button>
                </el-row>
            </el-form>
        </div>


        <!-- 选择基本商品单元 -->
        <el-dialog :append-to-body="true" class="dialog" title="选择基础商品单元"  :close-on-click-modal="true"
                   :visible.sync="formTableVisible" width="40%" top="7%" :before-close="formTableVisibleFun">
            <div class="fromBox">
                <el-form :model="dialogData" ref="dialogData" label-width="35%" >
                    <el-form-item label="商品单元编码：" class="item" prop="code">
                        <el-input v-model="dialogData.code" placeholder="请输入商品单元编码" :maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单元名称：" class="item" prop="name">
                        <el-input v-model="dialogData.name" placeholder="请输入商品单元名称" :maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0%" class="itemBtn">
                        <el-button type="primary" size="small" @click="search()">搜索</el-button>
                        <el-button type="primary" size="small" @click="reset('dialogData')" >重置</el-button>
                    </el-form-item>
                    <div>
                        <el-table
                                :data="dialogTableDataOne"
                                v-loading="dialogLoading"
                                border
                                highlight-current-row
                                @current-change="selectTableFun"
                                style="width: 100%">
                            <el-table-column
                                    label="序号"
                                    width="90"
                                    type="index"
                                    align="center"
                                    sortable
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="code"
                                    label="编码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="name"
                                    label="单元名称">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="useClassification"
                                    :formatter='useClassification'
                                    label="用途分类">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="spec"
                                    label="规格">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="price"
                                    label="价格（元）">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div style="text-align: center;">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="dialogData.p"
                                :page-size="dialogData.s"
                                layout="total, prev, pager, next"
                                :total="dialogData.total">
                        </el-pagination>
                    </div>
                    <div style="text-align: center;margin-top: 10px;">
                        <el-button type="primary" size="small" @click.native="saveBtn()"  class="btn-active">保存</el-button>
                        <el-button type="primary" size="small" @click.native="formTableVisibleFun('dialogData')">取消</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>


        <!-- 选择附加商品单元 -->
        <el-dialog :append-to-body="true" class="dialog" title="选择附加商品单元"  :close-on-click-modal="true"
                   :visible.sync="additionalVisible" width="40%" top="7%" :before-close="additionalVisibleFun">
            <div class="fromBox">
                <el-form :model="dialogDataS" ref="dialogDataS" label-width="35%" >
                    <el-form-item label="商品单元编码：" class="item" prop="code">
                        <el-input v-model="dialogDataS.code" placeholder="请输入商品单元编码" :maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单元名称：" class="item" prop="name">
                        <el-input v-model="dialogDataS.name" placeholder="请输入商品单元名称" :maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0%" class="itemBtn">
                        <el-button type="primary" size="small" @click="search()">搜索</el-button>
                        <el-button type="primary" size="small" @click="reset('dialogDataS')" >重置</el-button>
                    </el-form-item>
                    <div>
                        <el-table
                                :data="dialogTableDataTwo"
                                v-loading="dialogLoading"
                                border
                                highlight-current-row
                                @selection-change="selectTableFunAdd"
                                style="width: 100%">
                            <el-table-column
                                    align="center"
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    label="序号"
                                    width="90"
                                    type="index"
                                    align="center"
                                    sortable
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="code"
                                    label="编码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="name"
                                    label="单元名称">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="useClassification"
                                    :formatter='useClassification'
                                    label="用途分类">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="spec"
                                    label="规格">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    property="price"
                                    label="价格（元）">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div style="text-align: center;">
                        <el-pagination
                                @size-change="handleSizeChangeS"
                                @current-change="handleCurrentChangeS"
                                :current-page="dialogDataS.p"
                                :page-size="dialogDataS.s"
                                layout="total, prev, pager, next"
                                :total="dialogDataS.total">
                        </el-pagination>
                    </div>
                    <div style="text-align: center;margin-top: 10px;">
                        <el-button type="primary" size="small" @click.native="saveBtnF()"  class="btn-active">保存</el-button>
                        <el-button type="primary" size="small" @click.native="additionalVisibleFun">取消</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { certProjectSetController01,certProjectSetController02 , marketGoodsList ,commodityMgr03,saveGoodsOrUpdate,marketGoodsUnitList,marketGoodsDetail} from '@/api/marketing/commodityMgr';
    import selectOptionTable from '@/components/selectOptionTable'
    export default {
        name: "commodity-mgr-new-page",
        components:{
            selectOptionTable
        },
        data(){
            return{
                /*商品分类转换成中文*/
                useClassification(){
                    return cache.loadDictCache.goods_unit_usage[arguments[2]]
                },
                overdueStateShow:false, //是否自动过期
                checkWayState:false,
                //弹窗数据
                selectTable:[],
                additionalTable:[],
                formTableVisible:false,
                dialogLoading:false,
                additionalVisible:false,
                optionData:{
                    key:'id',
                    value:'name',
                    option:[],
                    method:(scope) =>{
                        this.getDialogList()
                        this.formTableVisible =true
                    }
                },
                optionDataS:{
                    f:true,
                    key:'id',
                    value:'name',
                    option:[],
                    method:(scope) =>{
                        this.getDialogListS()
                        this.additionalVisible =true
                    }
                },
                dialogTableDataOne:[], //弹窗数据源
                dialogTableDataTwo:[], //弹窗数据源
                dialogData:{
                    type:1,
                    p:1,
                    s:5,
                    total:0,
                    disable:false
                },
                dialogDataS:{
                    type:2,
                    p:1,
                    s:5,
                    total:0,
                    disable:false
                },
                //弹窗数据
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'children'
                },
                // <!--goodsUnitName goodsCode price agencySellerId 1 2 disable checkWay verificationStage verificationNode overdueNodeStatus overdue validityPeriod-->
                formData:{
                    goodsName:'',
                    goodsCode:'',
                    price:0,
                    agencySellerId:'',
                    goodsUnitId:'', //基本商品单元
                    disable:'',
                    checkWay:'1',
                    verificationStage:'',
                    verificationNode:'',
                    verificationNodeStatus:'',
                    //有效期
                    overdueNode:'',
                    overdueNodeStatus:'',
                    overdueState:'',
                    overdue:'',
                    validityPeriod:'',
                    options:[],
                    selectOption:[], //基本商品单元
                    attachedGoodsUnitIds:[], //附加商品单元
                    verificationNodeStatusData:[],

                },
                formSelect:{
                    disable:[{value:false,label:'上架'},{value:true,label:'下架'}],
                    checkWay:[{value:'1',label:'自动核销'},{value:'2',label:'手动核销'}],
                    verificationStage:this.exportArray(cache.loadDictCache.cert_menu,false), //cert_menu
                    verificationNode:[],
                    overdueNodeStatus:[],
                    options:[],
                    overdue:[{value:true,label:'是'},{value:false,label:'否'}],
                    agencySellerId: this.exportArray(cache.loadDictCache.market_agency_sell,false),
                },
                formVisible:false,
                addForm:{},
                value:''
            }
        },
        methods:{
            //清空核销信息
            checkWayDelete(){
                this.formData.verificationStage='';
                this.formData.verificationNode='';
                this.formData.verificationNodeStatus='';
                this.formData.verificationNodeStatusData=[];
            },
            //清空有效期
            overdueDelete(){
                this.formData.validityPeriod ='';
                this.formData.options =[];
                this.formData.overdueNode = '';
                this.formData.overdueNodeStatus = '';
                this.formData.overdueState = '';
            },
            overdueFun(val){
                this.overdueDelete()
                this.overdueStateShow = !!val;
            },
            checkWayFun(val){
                if(val === '1'){
                    this.checkWayState = true
                }else if(val === '2'){  //如果是手动核销
                    this.checkWayDelete()
                    this.checkWayState = false
                }
            },
            //基础
            formTableVisibleFun(){
                this.formTableVisible = false
                this.$refs.dialogData.resetFields();
            },
            //附加
            additionalVisibleFun(){
                console.log(this.$refs)
                this.additionalVisible = false
                this.$refs.dialogDataS.resetFields();
            },
            cancleSubmit(){
                let data = {
                    closeTabs: '编辑商品',     //关闭页面的名字
                    backTabs: '商品管理',   //要返回父页面的名字
                };
                this.$root.hubBus.$emit('closeWindow', data);
            },
            optionClose(res){
                this.formData.goodsUnitId = ""
                this.accumulation()
            },
            optionCloseS(res){
                //延时处理
                let _this = this;
                let a = setInterval(function(){
                    _this.accumulation();
                    clearInterval(a)
                },30)
            },
            verificationChange(val){
                this.formData.verificationNodeStatus = ""
                let data = ""
                val.forEach((res,index)=>{
                    data += res +',';
                    this.formData.verificationNodeStatus = data.substring(0,data.length-1)
                });
            },
            reset(formName){
                this.$nextTick(function(){
                    this.$refs[formName].resetFields();
                })
            },
            search(){
                this.getDialogList()
            },
            getDialogList(){
                let data = this.dialogData;
                this.dialogLoading = true;
                marketGoodsUnitList(data).then(res=>{
                    this.dialogLoading = false;
                    if(res.data.status){
                        this.dialogTableDataOne = res.data.data;
                        this.dialogData.total = res.data.total;
                    }
                })
            },
            getDialogListS(){
                let data = this.dialogDataS;
                this.dialogLoading = true;
                marketGoodsUnitList(data).then(res=>{
                    this.dialogLoading = false;
                    if(res.data.status){
                        this.dialogTableDataTwo = res.data.data;
                        this.dialogDataS.total = res.data.total;
                    }
                })
            },
            //合计价格
            accumulation(){
                let count = 0
                //基数商品
                this.optionData.option.forEach(res=>{
                    if(this.formData.goodsUnitId === res.id){
                        count += res.price
                    }
                });
                //附加商品
                this.formData.attachedGoodsUnitIds.forEach(item=>{
                    this.optionDataS.option.forEach(res=>{
                        if(item === res.id){
                            count += res.price
                        }
                    });
                })
                this.formData.price =count
            },
            //基础商品 和 附加商品的数据源
            getDialogListOption(){
                marketGoodsUnitList({ type:1 ,s:100000}).then(res=>{
                    if(res.data.status){
                        this.optionData.option = res.data.data;
                        this.option = res.data.data
                    }
                })
                marketGoodsUnitList({ type:2 ,s:100000}).then(res=>{
                    if(res.data.status){
                        this.optionDataS.option = res.data.data;
                    }
                })
            },
            handleSizeChange(val){
                this.dialogData.s = val
                this.getDialogList()
            },
            handleCurrentChange(val){
                this.dialogData.p = val
                this.getDialogList()
            },
            handleSizeChangeS(val){
                this.dialogDataS.s = val
                this.getDialogListS()
            },
            handleCurrentChangeS(val){
                this.dialogDataS.p = val
                this.getDialogListS()
            },
            saveBtn(){ //基础商品
                if(this.selectTable !== null){
                    this.formData.price += this.selectTable.price
                    this.formData.selectOption = [this.selectTable.id] //选中值
                    this.formData.goodsUnitId = this.selectTable.id;
                    this.formTableVisible = false
                }else{
                    this.$message({
                        message: '请勾选要保存的商品',
                        type: 'warning'
                    });
                }
                this.accumulation()
            },
            saveBtnF(){  //附加商品
                let attachedGoodsUnitIds =this.formData.attachedGoodsUnitIds; //本地
                let additionalTable =this.additionalTable ;
                if(additionalTable.length>0){
                    if(attachedGoodsUnitIds.length>0) {
                        for(let i = 0; i < additionalTable.length; i++){
                            let obj = additionalTable[i];
                            let num = obj.id;
                            let isExist = false;
                            for(let j = 0; j < attachedGoodsUnitIds.length; j++){
                                let aj = attachedGoodsUnitIds[j];
                                let n = aj;
                                if(n === num){
                                    this.$message({
                                        message: '商品已添加或包含已添加的商品',
                                        type: 'warning'
                                    });
                                    isExist = true;
                                    break;
                                }
                            }
                            if(!isExist){
                                attachedGoodsUnitIds.push(obj.id);
                            }
                        }
                    }else{
                        additionalTable.forEach(res=>{
                            attachedGoodsUnitIds.push(res.id)
                        })
                    }
                }else{
                    this.$message({
                        message: '请勾选要保存的商品',
                        type: 'warning'
                    });
                }
                this.additionalVisible = false
                this.accumulation()
            },
            selectTableFun(val){
                this.selectTable =val;
            },
            selectTableFunAdd(val){
                this.additionalTable = val
            },
            selectedOption(val){
                let obj = {};
                obj.certMenu = val;
                this.loading = true;
                certProjectSetController01(obj).then(res=>{
                    this.loading = false;
                    if(res.data.status){
                        this.formData.verificationNode = "";
                        this.formData.verificationNodeStatusData = [];
                        this.formSelect.verificationNode = res.data.data
                    }
                });
            },
            saveSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.formData.goodsUnitId !== ""){
                            saveGoodsOrUpdate(this.formData).then(res=>{
                                if(res.data.status){
                                    this.$message({
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    let data = {
                                        closeTabs: "编辑商品",     //关闭页面的名字
                                        backTabs: '商品管理',   //要返回父页面的名字
                                    };
                                    this.$root.hubBus.$emit('closeWindow', data);
                                }
                            })
                        }else{
                            this.$message({
                                message: '基础单元不能为空',
                                type: 'warning'
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            selectedVerificationNode(val){
                this.formData.verificationNodeStatusData = []
                certProjectSetController02(val).then(res=>{
                    if(res.data.status) {
                        this.formSelect.overdueNodeStatus = res.data.data;
                    }
                })
            },
            handleItemChange(val,index){
                let obj = {};
                obj.certMenu = val[0];
                certProjectSetController01(obj).then(res=>{
                    if(res.data.status){
                        res.data.data.forEach(res=>{
                            res.children = []
                        });
                        this.formSelect.options.forEach((item,index)=>{
                            if(index === parseInt(val[0]) ){
                                this.formSelect.options[index].children = res.data.data;
                                if(val[1]){
                                    certProjectSetController02(val[1]).then(res=>{
                                        if(res.data.status) {
                                            let dataChidren = [];
                                            res.data.data.forEach(item=>{
                                                dataChidren.push({id:item.state,name:item.description})
                                            });
                                            this.formSelect.options[index].children.forEach((children,j)=>{
                                                if(children.id === val[1]){
                                                    this.formSelect.options[index].children[j].children = dataChidren
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        });
                    }
                });
            },
            itemChange(val){
                this.formData.overdueState= val[0]
                this.formData.overdueNode = val[1]
                this.formData.overdueNodeStatus= val[2]
            },
            optionsData(){
                let certMenu = this.exportArray(cache.loadDictCache.cert_menu,false);
                let data = [];
                certMenu.forEach(res=>{
                    data.push({ id:res.value,name:res.label,children:[]})
                });
                this.formSelect.options = data
            },
            getList(){
                let id =  this.$route.query.id
                marketGoodsDetail(id).then(res=>{
                    if(res.data.status){
                        this.formData = Object.assign(this.formData,res.data.data)

                        //如果是自动核销
                        this.checkWayState = res.data.data.checkWay === "1";
                        //如果是自动过期
                        res.data.data.overdue ? this.overdueStateShow = true:this.overdueStateShow = false

                        //基本商品单元
                        this.formData.goodsUnitId = res.data.data.goodsUnitId; //赋值给后台的数据
                        this.formData.selectOption = [res.data.data.goodsUnitId]; //组件默认值是array 所以做此处理



                        let data = [];
                        if(res.data.data.verificationNodeStatus !== ""){
                            res.data.data.verificationNodeStatus.split(",").forEach(res=>{
                                data.push(res)
                            });
                        }
                       this.formData.verificationNodeStatusData = [...new Set(data)];

                        if(this.formData.verificationStage){
                            let obj = {};
                            obj.certMenu = this.formData.verificationStage;
                            certProjectSetController01(obj).then(res=>{
                                if(res.data.status){
                                    this.formSelect.verificationNode = res.data.data
                                }
                            });
                        }
                        if(this.formData.verificationNode){
                            certProjectSetController02(this.formData.verificationNode).then(res=>{
                                if(res.data.status) {
                                    this.formSelect.overdueNodeStatus = res.data.data;
                                }
                            })
                        }

                        this.formData.options = [
                            res.data.data.overdueState,
                            res.data.data.overdueNode,
                            res.data.data.overdueNodeStatus
                        ]
                       this.handleItemChange(this.formData.options)
                    }
                })
            }
        },
        created(){
            this.optionsData()
            this.getDialogListOption()
            this.getList()
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .main-box{
        .boxTitle{
            border-left: 3px solid #05ccce;
            padding-left: 10px;
            font-size: 15px;
        }
    }
    .item{
        width: 280px;
        display: inline-block;
        float: left;
    }
    .itemBtn{
        display: inline-block;
        float: left;
        margin-left: 10px;
    }
    .tableBox{
        border:1px solid #e6ebf5;
    }
</style>
