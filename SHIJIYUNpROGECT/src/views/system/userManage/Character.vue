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
                                    <el-form-item label="用户角色" label-width="20%">
                                        <el-input v-model="formData.name" placeholder="请输入用户角色"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="状态" label-width="30%">
                                        <el-select v-model="formData.statusA" placeholder="请选择状态">
                                            <el-option v-for="item in formSelect.statusA" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <div class="fromBtn">
                                        <el-button type="primary" size="small" @click="search"  class="btn-active" id="search">搜索</el-button>
                                        <el-button type="primary" size="small" @click="reset"  id="reset">重置</el-button>
                                        <el-button type="primary" size="small" @click="more" id="more" class="black-button" :disabled="disMore">更多
                                            <i class="el-icon--right " :class="[show ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                                        </el-button>
                                    </div>
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
                                    <el-button  v-show="userButtonCodes.add" type="primary" size="small" @click="add()" id="add">添加</el-button>
                                    <el-button  v-show="userButtonCodes.edit" type="primary" size="small" @click="edit()" id="edit">编辑</el-button>
                                    <el-button  v-show="userButtonCodes.enabled" type="primary" size="small" @click="enabled()" id="enabled">启用</el-button>
                                    <el-button  v-show="userButtonCodes.disabled" type="primary" class="btn-warning" size="small" @click="disabled()" id="disabled">停用</el-button>
                                </div>
                                <!-- 右侧按钮 -->
                                <div class="btn-right">
                                    <el-button  v-show="userButtonCodes.output" type="primary" size="small" v-if='false' @click="handleDownload()" id="output">导出</el-button>
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
                            prop="name"
                            :label="formDataLabel[0]"
                            align="center"
                            v-if="tab==formDataLabel[0]">
                    </el-table-column>
                    <el-table-column
                            :label="formDataLabel[1]"
                            v-if="tab==formDataLabel[1]"
                            align="center">
                        <template slot-scope="scope">
                            {{scope.row.status?'停用':'启用'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="formDataLabel[2]"
                            v-if="tab==formDataLabel[2]"
                            align="center">
                            <template slot-scope="scope">
                                <span class="link-type" @click="authority(scope.row)">{{scope.row.rolePermissions}}</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            :label="formDataLabel[3]"
                            v-if="tab==formDataLabel[3]"
                            align="center">
                        <template slot-scope="scope">
                            <span >{{scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            :label="formDataLabel[4]"
                            v-if="tab==formDataLabel[4]"
                            align="center">
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
        <el-dialog :append-to-body="true" class="dialog" title="添加" :visible.sync="addFormVisible" :close-on-click-modal="true" width="33%" top="10%">
            <div class="fromBox nowrap">
                <el-form  :model="addForm" label-width="23%"  ref="addForm">
                    <el-form-item label="用户角色" label-width="20%">
                        <el-input v-model="addForm.name" placeholder="请输入用户角色"></el-input>
                    </el-form-item>
                    <el-form-item label="code" label-width="20%">
                        <el-input v-model="addForm.code" placeholder="请输入code"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="20%">
                        <el-select v-model="addForm.status" placeholder="请选择状态">
                            <el-option v-for="item in formSelect.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" label-width="20%">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注"
                                v-model="addForm.description">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click.native="addSubmit" :loading="addLoading" class="btn-active">提交</el-button>
                    <el-button type="primary" size="small" @click.native="addFormVisible = false">取消</el-button>
                </div>
            </div>

        </el-dialog>
        <!--编辑界面-->
        <el-dialog :append-to-body="true" class="dialog" title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="true" :show-close="false" width="33%" top="10%">
            <div class="fromBox">
                <el-form :model="editForm" label-width="23%"  ref="addForm">
                    <el-form-item label="用户角色" label-width="20%">
                        <el-input v-model="editForm.name" placeholder="请输入用户角色"></el-input>
                    </el-form-item>
                    <el-form-item label="code" label-width="20%">
                        <el-input v-model="editForm.code" placeholder="请输入code"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="20%">
                        <el-select v-model="editForm.status" placeholder="请选择状态">
                            <el-option v-for="item in formSelect.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" label-width="20%">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注"
                                v-model="editForm.description">
                        </el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click.native="editSubmit" :loading="addLoading" class="btn-active">提交</el-button>
                    <el-button type="primary" size="small" @click.native="editFormVisible = false">取消</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import Authority from './Authority.vue'
    import { getCharTableList ,saveCharOrUpdate,enableCharRoles,disableCharRoles,findPageResource } from '@/api/system/userManage'
    //let localStorage = require('storejs');
    export default{
        props:['tabsData'],
        data(){
            return{
                /*字段设置必须值*/
                pageName:'character',  //字段设置请求值
                tableKey: 0,    //table表更新
                formDataLabel:[ '用户角色', '状态', '角色权限', '创建时间','备注'],   //表头数据 表头label
                tableShow:[ '用户角色', '状态', '角色权限', '创建时间','备注'], //显示字段
                userButtonCodes:{}, //权限按钮
                /*字段设置结束*/

                disMore:false, //更多按钮显示
                show:false, //显示隐藏
                addFormVisible: false,//新增界面是否显示
                editFormVisible:false, //编辑界面
                loading: false, //loading
                currentPage:1,  //跳转页面
                Selected: [],//列表选中列
                total:0,   //分页总数量
                pageSize:10, //当前页面
                labelShow:false,
                formData:{  //表单input值
                    name:'',
                    statusA:'',
                },
                formSelect: {
                    name:[{}],
                    statusA: [{
                        value: '',//key
                        label: '不限' //
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
                    }]
                },
                tableData: [],
                addLoading: false,
                addForm:{
                    name:'',
                    code:'',
                    status:'',
                    description:''
                },
                //编辑界面数据
                editForm: {
                    id:'',
                    name:'',
                    code:'',
                    status:'',
                    description:''
                }
            }
        },
        methods:{
            authority(res){    //权限配置
               // this.$store.state.columns.authority = res;
                let data = {
                    component: Authority,
                    name:'权限配置',
                    data:{
                        res:res,
                        parentName:this.tabsData.name
                    }
                };
                this.$root.hubBus.$emit('menuClick',data);
            },
            reset(){
                this.formData.name='';
                this.formData.statusA=''
            },
            search(){   //搜索
                this.currentPage =  1
                this.loading = true;
                this.getList();
            },
            more(){  //更多按钮事件
                this.show= !this.show
            },
            selsChange(sels){
                this.Selected = sels;
            },
            enabled(){      //批量启用
                let sele = this.Selected;
                if(sele.length>0){
                    let dataId = [];
                    for(let i=0;i<this.Selected.length;i++){
                        let obj = {};
                        obj = this.Selected[i].id;
                        dataId.push(obj)
                    }
                    let _this = this;
                    enableCharRoles(dataId).then(res =>{
                        _this.getList();
                        if(res.data.status){
                            _this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                        }
                    });
                }else{
                    this.$message({
                        message: '请勾选选项',
                        type: 'warning'
                    });
                }

            },
            disabled(){     //批量停用
                let sele = this.Selected;
                if(sele.length>0){
                    let dataId = [];
                    for(let i=0;i<this.Selected.length;i++){
                        let obj = {};
                        obj = this.Selected[i].id;
                        dataId.push(obj)
                    }
                    disableCharRoles(dataId).then(res =>{
                        if(res.data.status){
                            this.getList();
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                        }
                    });
                }else{
                    this.$message({
                        message: '请勾选选项',
                        type: 'warning'
                    });
                }

            },
            add(){
                this.addFormVisible = true;
            },
            addSubmit(){    //添加
                let _this = this;
                saveCharOrUpdate(this.addForm).then(res => {
                    if(res.data.status){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getList();
                        this.addFormVisible = false;
                    }
                });
            },
            edit(){     //编辑
                let sele = this.Selected;
                if(sele.length>=2){
                    this.$message({
                        message: '不能同时编辑多条',
                        type: 'warning',
                    });
                }else if(sele.length<=0){
                    this.$message({
                        message: '请勾选要编辑的表格',
                        type: 'warning',
                    });
                }else{
                    this.editFormVisible = true;
                    this.editForm = sele[0]
                }
            },
            editSubmit(){   //确定编辑
                let data = {
                    id:this.editForm.id,
                    name:this.editForm.name,
                    status:this.editForm.status,
                    description:this.editForm.description
                };
                saveCharOrUpdate(data).then(res =>{
                    if(res.data.status){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getList();
                    }
                });
                this.editFormVisible = false;
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
            handleDownload(){
              
            },
            getList(){  //获取数据
                let objData = [];
                let _this =this;
                let data = {
                    "p": this.currentPage,
                    "s": this.pageSize,
                    "name": this.formData.name,
                    "status": this.formData.statusA
                };
                this.loading = true;
                getCharTableList(data).then(res => {
                    this.loading = false;
                    if(res.data.status){
                        for(let i in res.data.data){
                            let obj = {};
                            obj.id = res.data.data[i].id;
                            obj.name = res.data.data[i].name;
                            obj.code = res.data.data[i].code;
                            obj.createdAt = res.data.data[i].createdAt;
                            obj.rolePermissions = '权限配置';
                            obj.status = res.data.data[i].status;
                            obj.description = res.data.data[i].description;
                            objData[i] = obj
                        }
                        _this.tableData = objData;
                        _this.total =   res.data.total;
                    }
                });
                this.Jurisdiction(['system','userManage','character']); //资源权限 页面地址
            },

        },
        created(){
            this.getList();  //初始化数据
            if(Object.keys(this.formData).length<=7){     //如果搜索条件框小于7 更多按钮不能点击
                this.disMore = true;    //false表示可以点击
            }
        },
        mounted(){

        }
    }
</script>

<style  rel="stylesheet/scss" lang="scss">
    .fromBtn{line-height: 50px;text-align: center;}
</style>
