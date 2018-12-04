<template>
    <div class="main-box" clz-type="table">
        <!-- 搜索表单 -->
        <div class="form-box">
            <!-- 响应式24 总宽度-->
            <el-row :span="24">
                <!-- 响应式6 -->
                <el-collapse-transition>
                    <div class="input-box-center">
                        <el-form :inline="true" :model="formData" class="demo-form-inline">
                            <el-row :span="24">
                                <el-col :span="6">
                                    <el-form-item label="岗位名称" label-width="23%">
                                        <el-input v-model="formData.postName" placeholder="请输入岗位名称"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="状态" label-width="30%">
                                        <el-select v-model="formData.disable" placeholder="请选择状态">
                                            <el-option v-for="item in formSelect.disable" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <div class="fromBtn">
                                        <el-button type="primary" size="small" @click="search" class="btn-active" id="search">搜索</el-button>
                                        <el-button type="primary" size="small" @click="reset" id="reset">重置</el-button>
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
            <!--操作按钮-->
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
                                    <el-button v-show="userButtonCodes.output" type="primary" size="small" @click="handleDownload()" id="output">导出</el-button>
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
            <!--表单数据-->
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
                        <!--postName:'片区主管',
                        status: '启用',
                        postNumber:13,
                        createTime:'2017-06-01 10:30:21',
                        remark:''-->
                        <el-table-column prop="postName" :label="formDataLabel[0]" v-if="tab==formDataLabel[0]" align="center" ></el-table-column>
                        <!--<el-table-column prop="status" :label="formDataLabel[1]" v-if="tab==formDataLabel[1]" align="center"></el-table-column>-->

                        <el-table-column
                                :label="formDataLabel[1]"
                                v-if="tab==formDataLabel[1]"
                                align="center">
                            <template slot-scope="scope">
                                {{scope.row.status?'停用':'启用'}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="postNumber" :label="formDataLabel[2]" v-if="tab==formDataLabel[2]" align="center" ></el-table-column>
                        <el-table-column prop="createTime" :label="formDataLabel[3]" v-if="tab==formDataLabel[3]" align="center" >
                            <template slot-scope="scope">
                                <span >{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" :label="formDataLabel[4]" v-if="tab==formDataLabel[4]" align="center"></el-table-column>


                    </template>

                </el-table>
            </div>
            <!--分页-->
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


        <!--弹出对话框 01 新增-->
        <el-dialog :append-to-body="true" class="dialog" title="添加岗位信息" :close-on-click-modal="true" :visible.sync="addFormVisible"  width="33%" top="10%">
            <div class="fromBox">
                <el-form :model="addForm" ref="addForm"  label-width="18%">
                    <!--postNameAdd:'',    // 岗位名称
                    postStatusAdd:'',  // 岗位状态
                    postRemarkAdd:''    // 岗位备注-->
                    <el-form-item label="岗位名称" >
                        <el-input v-model="addForm.postNameAdd" placeholder="请输入岗位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位状态">
                        <el-select v-model="addForm.postStatusAdd">
                            <el-option v-for="item in addFormSelect.postStatusSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="岗位备注">
                        <el-input type="textarea" v-model="addForm.postRemarkAdd" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" size="small" @click.native="addSaveSubmit" :loading="addLoading" class="btn-active">保存</el-button>
                </div>
            </div>

        </el-dialog>


        <!--弹出对话框 02 编辑-->
        <el-dialog :append-to-body="true" class="dialog" title="编辑岗位信息"  :close-on-click-modal="true" :visible.sync="editFormVisible"  width="33%" top="10%">
            <div class="fromBox">
                <el-form :model="editForm" ref="editForm"  label-width="18%">
                    <!--postNameAdd:'',    // 岗位名称
                    postStatusAdd:'',  // 岗位状态
                    postRemarkAdd:''    // 岗位备注-->
                    <el-form-item label="岗位名称" >
                        <el-input v-model="editForm.postName" placeholder="请输入岗位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位状态">
                        <el-select v-model="editForm.status">
                            <el-option v-for="item in editFormSelect.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="岗位备注">
                        <el-input type="textarea" v-model="editForm.remark" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" size="small" @click.native="editSubmit" :loading="editLoading" class="btn-active">保存</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import { positingSaveOrUpdate, positingEnabled, positingDisabled, positingList, } from '@/api/system/userManage'
    export default {
        data() {
            return {
                /*字段设置必须值*/
                pageName:'postSetting',  //字段设置请求值
                tableKey: 0,    //table表更新
                formDataLabel:[ '岗位名称', '状态', '岗位人员', '创建时间', '备注'],   //表头数据 表头label
                tableShow:['岗位名称', '状态', '岗位人员', '创建时间', '备注'], //显示字段
                userButtonCodes:{}, //权限按钮
                /*字段设置结束*/

                URL:"http://192.168.185.194:10006/sysPosition/",
                addFormVisible: false, addLoading: false,//新增界面是否显示
                editFormVisible: false, editLoading: false,// 编辑界面
                formData: {  //表单input值
                    postName: '',
                    disable: '',
                    postRemark:''
                },
                formSelect: {
                    disable: [{
                        value: '',
                        label: '全部'
                    }, {
                        value: false,
                        label: '启用'
                    }, {
                        value: true,
                        label: '停用'
                    }]
                },

                Selected: [],//列表选中列

                total: 0,   //分页总数量
                pageSize: 10, //当前页面
                currentPage: 1,  //跳转页面
                loading: false, //loading 勾选框默认不选中
                tableData: [],
                addForm: {
                    postNameAdd:'',    // 岗位名称
                    postStatusAdd:'',  // 岗位状态
                    postRemarkAdd:''    // 岗位备注
                },
                addFormSelect: {
                    postStatusSelect: [{value: false, label: '启用'}, {value: true, label: '停用'}]
                },
                // 编辑岗位信息
                editForm: {
                    id:'',
                    postName:'',    // 岗位名称
                    status:'',  // 岗位状态
                    remark: ''    // 岗位备注
                },
                editFormSelect: {
                    status: [{value: false, label: '启用'}, {value: true, label: '停用'}]
                },
            }
        },
        methods: {
            reset() {
                this.formData.postName = '';
                this.formData.disable = ''
            }, search() {   //搜索
                this.currentPage = 1
                this.getList();
            },  edit() {     //编辑

                //编辑
                let sele = this.Selected;

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
                    this.editForm = sele[0];
                }

            }, editSubmit(){   //确定编辑
                let data = {
                    "id": this.editForm.id,
                    "name": this.editForm.postName,
                    "description": this.editForm.remark,
                    "disable": this.editForm.status
                };
                positingSaveOrUpdate(data).then(res=>{
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
            enabled() {    // 启用
                let dataId = [];
                let sele = this.Selected;
               if(sele.length<=0){
                    this.$message({
                        message: '请勾选要启用的表格',
                        type: 'warning'
                    });
                }else{
                   for(let item in this.Selected){
                       dataId.push(this.Selected[item].id);
                   }
                   positingEnabled(dataId).then(res => {
                       if(res.data.status){
                           this.$message({
                               message: res.data.message,
                               type: 'success'
                           });
                           this.getList();    //重新请求列表
                       }
                   });
                }

            },
            disabled() {   // 停用
                let dataId = [];
                let sele = this.Selected;
                if(sele.length<=0){
                    this.$message({
                        message: '请勾选要停用的表格',
                        type: 'warning'
                    });
                }else{
                    for(let item in this.Selected){
                        dataId.push(this.Selected[item].id);
                    }
                    positingDisabled(dataId).then(res => {
                        if(res.data.status){
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.getList();    //重新请求列表
                        }
                    });
                }
            }, selsChange(sels) {
                this.Selected = sels;
            }, handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            }, handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },

            handleDownload() {   //表格下载按钮事件

            }, add() {
                this.addForm  = {
                    postNameAdd:'',    // 岗位名称
                    postStatusAdd:'',  // 岗位状态
                    postRemarkAdd:''    // 岗位备注
                };
                this.addFormVisible = true;
            },
            addSaveSubmit(){    // 新增岗位
                let _this =this;
                let data = {
                    "name": _this.addForm.postNameAdd,
                    "description": _this.addForm.postRemarkAdd,
                    "disable": _this.addForm.postStatusAdd
                };
                positingSaveOrUpdate(data).then(res=>{
                    if(res.data.status){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getList();    //重新请求列表
                    }
                });
                this.addFormVisible = false;
            },
            getList(){  // 获取表格列表
                let _this =this;
                let data = {
                    "p": this.currentPage,
                    "s": this.pageSize,
                    "name": this.formData.postName,
                    "disable": this.formData.disable
                    // "disable": false    // 禁用标识（0.可用 1.禁用）
                };
                positingList(data).then(res=>{
                    if(res.data.status){
                        let response = [];
                        for(let i = 0; i < res.data.data.length; i++){
                            let obj = {};
                            obj.id = res.data.data[i].id;
                            obj.postName = res.data.data[i].name;
                            obj.status = res.data.data[i].disable;
                            obj.postNumber = res.data.data[i].empNum;
                            obj.createTime = res.data.data[i].createdAt;
                            obj.remark = res.data.data[i].description;
                            response[i] = obj;
                        }
                        this.tableData = response;
                        this.total = res.data.total;   // 分页总数量
                    }
                });
                this.Jurisdiction(['system','userManage','postSetting']); //资源权限 页面地址
            }
        },
        mounted() {
            //字段设置: 默认显示字段

        },
        created() {
            this.getList();  //初始化数据
            console.log(this.userButtonCodes)
        }
    }
</script>


<style>
    .fromBtn {
        line-height: 50px;
        text-align: center;
    }
</style>
