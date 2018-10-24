<template>
    <div class="main-box" clz-type="table">
        <!-- 搜索表单 -->
        <div class="form-box">
            <!-- 响应式24 总宽度-->
            <el-row :span="24">
                <!-- 响应式6 -->
                <el-collapse-transition >
                    <div class="input-box-center"  >
                        <el-form :inline="true" :model="formData" class="demo-form-inline">
                            <el-row :span="24">
                                <el-col :span="6">
                                    <el-form-item label="登录手机号" label-width="30%">
                                        <el-input v-model="formData.account" placeholder="请输入登录手机号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="用户昵称" label-width="30%">
                                        <el-input v-model="formData.name" placeholder="请输入用户昵称"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="用户状态" label-width="30%">
                                        <el-select v-model="formData.statusA" placeholder="请选择用户状态">
                                            <el-option v-for="item in formSelect.statusA" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="btn">
                                    <el-form-item>
                                        <el-button type="primary" size="small" @click="search"  id="search">搜索</el-button>
                                        <el-button type="primary" size="small" @click="reset"  id="reset">重置</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-collapse-transition>
            </el-row>
        </div>
        <!-- 表格数据 -->
        <div class="table-box">
            <div class="btn-content">
                <el-form>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <!-- 每个按钮都要加一个id 以便后端权限配置-->
                                <!-- 左侧按钮 -->
                                <div class="btn-left">
                                    <el-button v-show="userButtonCodes.add" type="primary" size="small" @click="add()" id="add">添加</el-button>
                                    <el-button v-show="userButtonCodes.edit" type="primary" size="small" @click="edit()" id="edit">编辑</el-button>
                                    <el-button v-show="userButtonCodes.enabled" type="primary" size="small" @click="enabled()" id="enabled">启用</el-button>
                                    <el-button v-show="userButtonCodes.disabled" type="primary" class="btn-warning" size="small" @click="disabled()" id="disabled">停用</el-button>
                                </div>
                                <!-- 右侧按钮 -->
                                <div class="btn-right">
                              <!--      <el-button v-show="userButtonCodes.output" type="primary" size="small" @click="handleDownload()" id="output">导出</el-button>-->
                                    <!-- 字段显示开始 -->
                                    <clz-popover v-show="userButtonCodes.fieldSetting"
                                                 id="fieldSetting"
                                                 :formDataLabel="formDataLabel"
                                                 :tableShow="tableShow"
                                                 :tableKey="tableKey"
                                                 :pageName="pageName"
                                                 @tableShow="tableShow = arguments[0]"
                                                 @tableKey="tableKey = arguments[0]"
                                                 @pageName="pageName = arguments[0]">
                                    </clz-popover>
                                    <!-- 字段显示结束 -->
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div>
                <el-table
                        ref="singleTable"
                        :data="tableData"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        stripe
                        v-loading="loading"
                        :key='tableKey'
                        @selection-change="selsChange"
                >
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
                    <!-- 循环表头数据 方便显示隐藏列表 -->
                    <template v-for="tab in tableShow">
                        <el-table-column
                                prop="account"
                                :label="formDataLabel[0]"
                                v-if="tab==formDataLabel[0]"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                :label="formDataLabel[1]"
                                v-if="tab==formDataLabel[1]"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                :label="formDataLabel[2]"
                                v-if="tab==formDataLabel[2]"
                                align="center">
                            <template slot-scope="scope">
                                {{scope.row.status?'停用':'启用'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="roleName"
                                :label="formDataLabel[3]"
                                v-if="tab==formDataLabel[3]"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="createdAt"
                                :label="formDataLabel[4]"
                                v-if="tab==formDataLabel[4]"
                                align="center">
                            <template slot-scope="scope">
                                <span >{{scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
            </div>
            <el-row :span="24">
                <div class="box-page"> <refresh-icon :tableKey="tableKey" @tableKey="tableKey = arguments[0]" @refreshTable="getList()"></refresh-icon>
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
            </el-row>
        </div>
        <!--新增界面-->
        <el-dialog :append-to-body="true" class="dialog" title="添加"  :close-on-click-modal="true"  :visible.sync="addFormVisible"  width="33%" top="10%">
            <div class="fromBox">
                <el-form :model="addForm" label-width="20%"  ref="addForm">
                    <el-form-item label="用户名" label-width="20%">
                        <el-input v-model="addForm.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户手机号" label-width="20%">
                        <el-input v-model="addForm.account" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" label-width="20%">
                        <el-input v-model="addForm.password" placeholder="请输入用户密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="20%">
                        <el-select v-model="addForm.status" placeholder="请选择状态">
                            <el-option v-for="item in formSelect.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分配角色" label-width="20%">
                        <el-select v-model="addForm.roleId" placeholder="请选择分配角色">
                            <el-option v-for="item in formSelect.roleId" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click.native="addSubmit" :loading="addLoading" class="btn-active">提交</el-button>
                    <el-button type="primary" size="small" @click.native="addFormVisible = false">取消</el-button>
                </div>
            </div>

        </el-dialog>
        <!--编辑界面-->
        <el-dialog :append-to-body="true" class="dialog" title="编辑"   :close-on-click-modal="true" :visible.sync="editFormVisible"  width="33%" top="10%">
            <div class="fromBox">
                <el-form :model="editForm" label-width="20%" :rules="rules"  ref="editForm" >
                    <el-form-item label="用户名" label-width="20%">
                        <el-input v-model="editForm.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户手机号" label-width="20%">
                        <el-input v-model="editForm.account" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" label-width="20%">
                        <el-input v-model="editForm.password" placeholder="请输入用户密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="20%">
                        <el-select v-model="editForm.status" placeholder="请选择状态">
                            <el-option v-for="item in formSelect.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分配角色" label-width="20%" prop="roleId">
                        <el-select v-model="editForm.roleId" placeholder="请选择分配角色" >
                            <el-option v-for="item in formSelect.roleId" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click.native="editSubmit('editForm')" :loading="addLoading" class="btn-active">提交</el-button>
                    <el-button type="primary" size="small" @click.native="editFormVisible = false">取消</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import {uMgrSaveOrUpdate, uMgrEnabled, uMgrDisabled, uMgrList, uSysRoleSelectList} from '@/api/system/userManage'
    export default {
        data() {
            return {
                /*字段设置必须值*/
                pageName:'userManagement',  //字段设置请求值
                tableKey: 0,    //table表更新
                formDataLabel:[ '登录手机号', '用户名称', '账号类型', '用户角色', '创建时间'],   //表头数据 表头label
                tableShow:['登录手机号', '用户名称', '账号类型', '用户角色', '创建时间'], //显示字段
                userButtonCodes:{}, //权限按钮
                /*字段设置结束*/


                addLoading: false,
                addFormVisible:false,
                editFormVisible:false,
                visible: false, //显示字段面板隐藏
                loading:false,
                currentPage:1,  //跳转页面
                Selected: [],//列表选中列
                total:1,   //分页总数量
                pageSize:10, //当前页面
                //多选
                checkAll: true,
                checkedOps: [], //选中值
                isIndeterminate: true,
                labelShow:false,
                formData:{  //表单input值
                    account:'',
                    name:'',
                    statusA:'',
                },
                tableData: [
//                    {   //表格默认数据
//                    account:'123456789',
//                    name:'露露',
//                    status:true,
//                    roleName:'子账号',
//                    createdAt:'2017-06-01  10:30:21',
//                    password:'123456'
//                }
                ],
                addForm:{
                    account:'',
                    name:'',
                    status:'',
                    password:'',
                    roleId:''
                },
                editForm:{
                    id:'',
                    account:'',
                    name:'',
                    status:'',
                    password:'',
                    roleId:'',
                },
                formSelect: {
                    statusA: [{
                        value: '',
                        label: '全部'
                    },{
                        value: false,
                        label: '启用'
                    },{
                        value: true,
                        label: '停用'
                    }],
                    status:[{
                        value: false,
                        label: '启用'
                    },{
                        value: true,
                        label: '停用'
                    }],
                    area:[{
                        value: '选项一',
                        label: '宝安区'
                    }],
                    store:[{
                        value: '选项一',
                        label: '宝安门店'
                    }],
                    roleId:[]
                },
                rules: {
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                }
            }
        },
        methods:{
            edit(){
                let sel = [];
                let sele = this.Selected;
                let _this = this;
                if(sele.length>=2){
                    this.$message({
                        message: '不能同时编辑多条',
                        type: 'warning'
                    });
                }else if(sele.length<=0){
                    this.$message({
                        message: '请勾选要编辑的表格',
                        type: 'warning'
                    });
                }else{
                    this.editFormVisible = true;
                    this.editForm = sele[0]
                }
                uSysRoleSelectList().then(res =>{
                    if(res.data.status){
                        this.formSelect.roleId = res.data.data;
                    }
                })
            },
            editSubmit(editForm){
                this.$refs[editForm].validate((valid) => {
                    if (valid) {
                        let status;
                        let objData = {
                            id:this.editForm.id,
                            account:this.editForm.account,
                            name:this.editForm.name,
                            password:this.editForm.password,
                            roleId:this.editForm.roleId,
                            status:this.editForm.status
                        };

                        uMgrSaveOrUpdate(objData).then(res=>{
                            if(res.data.status){
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                                this.getList();    //重新请求列表
                            }
                        });
                        this.editFormVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            add(){
                let sel = [];
                let _this = this;
                this.addForm={
                    account:'',
                    name:'',
                    status:'',
                    password:'',
                    roleId:''
                };
                this.addFormVisible = !this.addFormVisible;
                uSysRoleSelectList().then(res =>{
                    if(res.data.status){
                        this.formSelect.roleId = res.data.data;
                    }
                });
            },
            addSubmit(){
                let _this = this;

                uMgrSaveOrUpdate(this.addForm).then(res=>{
                    if(res.data.status){
                        _this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getList();    //重新请求列表
                    }
                });
                this.addFormVisible = false;
            },
            enabled(){
                let sele = this.Selected;
                let dataId = [];
                if(sele.length<=0){
                    this.$message({
                        message: '请勾选要启用的表格',
                        type: 'warning'
                    });
                }else{
                    for(let i=0;i<this.Selected.length;i++){
                        let obj = {};
                        obj = this.Selected[i].id;
                        dataId.push(obj)
                    }
                    uMgrEnabled(dataId).then(res => {
                        if(res.data.status){
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.getList();    //重新请求列表
                        }
                    });
                    this.addFormVisible = false;
                }
            },
            disabled(){
                let sele = this.Selected;
                let dataId = [];
               if(sele.length<=0){
                    this.$message({
                        message: '请勾选要停用的表格',
                        type: 'warning'
                    });
                }else{
                    for(let i=0;i<this.Selected.length;i++){
                        let obj = {};
                        obj = this.Selected[i].id;
                        dataId.push(obj)
                    }
                    uMgrDisabled(dataId).then(res =>{
                        if(res.data.status){
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.getList();    //重新请求列表
                        }
                    });
                    this.addFormVisible = false;
                }
            },
            reset(){
                this.formData= {
                    account:'',
                    name:'',
                    statusA:''
                }
            },
            search(){   //搜索
                this.currentPage =  1
                this.getList();
            },
            selsChange(sels){
                this.Selected = sels;
            },
            handleCurrentChange(){

            },
            handleSizeChange(){

            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
            getList(){  //获取数据
                let _this =this;
                let data = [];

                let objData = {
                    "p": this.currentPage,
                    "s": this.pageSize,
                    "account":this.formData.account,
                    "name": this.formData.name,
                    "status": this.formData.statusA
                };
                this.loading = true;
                uMgrList(objData).then(res=>{
                    this.loading=false;
                    if(res.data.status){
                        for (let i = 0; i < res.data.data.length; i++) {
                            let obj = {};
                            obj.account = res.data.data[i].account;
                            obj.name = res.data.data[i].name;
                            obj.createdAt = res.data.data[i].createdAt;
                            obj.status = res.data.data[i].status;
                            obj.roleName = res.data.data[i].roleName;
                            obj.roleId = res.data.data[i].roleId;
                            obj.id = res.data.data[i].id;
                            obj.password = res.data.data[i].password;
                            data[i] = obj
                        }
                        _this.tableData = data;
                        _this.total =   res.data.total;
                    }
                });
                this.Jurisdiction(['system','userManage','userManagement']); //资源权限 页面地址
            },

        },
        mounted(){


        },
        created() {

            this.getList();
            if(Object.keys(this.formData).length<=7){     //如果搜索条件框小于7 更多按钮不能点击
                this.disMore = true;    //false表示可以点击
            }
        }
    }
</script>

<style scoped>

</style>
