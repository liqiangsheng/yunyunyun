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
                                    <el-form-item label="手机号码" label-width="30%">
                                        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="姓名" label-width="30%">
                                        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="职务">
                                        <el-select v-model="formData.post" placeholder="全部">
                                            <el-option v-for="item in formSelect.post" :key="item.value"
                                                       :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6" class="btn" label-width="40%">
                                    <el-form-item>
                                        <el-button type="primary" size="small" @click="search()" id="inquire"
                                                   class="btn-active">查询
                                        </el-button>
                                        <el-button type="primary" size="small" @click="reset()" id="reset"
                                                   class="black-button">重置
                                        </el-button>
                                        <el-button type="primary" size="small" @click="more()" id="more"
                                                   class="black-button" :disabled="disMore">更多
                                            <i class="el-icon--right "
                                               :class="[show ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                                        </el-button>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                        </el-form>
                    </div>
                </el-collapse-transition>
            </el-row>
        </div>

        <div>
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
                                        <el-button type="primary" size="small" @click="add()"
                                                   id="addParkPlace">添加
                                        </el-button>
                                        <el-button type="primary" size="small" @click="edit()" id="disable">编辑
                                        </el-button>
                                        <el-button type="primary" size="small" @click="addHiddenFields()" id="enable">
                                            添加隐藏字段
                                        </el-button>
                                    </div>
                                    <!-- 右侧按钮 -->
                                    <div class="btn-right">
                                        <el-button type="primary" size="small" @click="handleDownload()" id="output">
                                            导出
                                        </el-button>
                                        <!-- 显示字段 -->
                                        <el-popover ref="popover" placement="bottom-end" width="350" v-model="visible">
                                            <div class="popoverTitle">显示字段 <i id="popoverClose"
                                                                              @click="visible = false">×</i></div>
                                            <div class="popoverBox">
                                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                                             @change="handleCheckAllChange">全选
                                                </el-checkbox>
                                                <el-checkbox-group v-model="checkedOps"
                                                                   @change="handleCheckedCitiesChange">
                                                    <el-checkbox v-for="label in formDataLabel" :label="label"
                                                                 :key="label">{{label}}
                                                    </el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                            <div class="popoverBtn">
                                                <el-button type="primary" size="small" @click="resetVisible"
                                                           id="resetVisible">重置
                                                </el-button>
                                                <el-button type="primary" size="small" @click="popoverBtn"
                                                           class="btn-active">确定
                                                </el-button>
                                            </div>
                                        </el-popover>
                                        <el-button v-popover:popover type="primary" size="small" @click="fieldSetting()"
                                                   id="fieldSetting">字段设置
                                        </el-button>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div>
                    <el-table
                            ref="multipleTable"
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
                                    prop="jobNumber"
                                    :label="formDataLabel[0]"
                                    align="center"
                                    v-if="tab==formDataLabel[0]">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    :label="formDataLabel[1]"
                                    align="center"
                                    v-if="tab==formDataLabel[1]"
                            ></el-table-column>
                            <el-table-column
                                    prop="depart"
                                    :label="formDataLabel[2]"
                                    align="center"
                                    v-if="tab==formDataLabel[2]"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="post"
                                    :label="formDataLabel[3]"
                                    align="center"
                                    v-if="tab==formDataLabel[3]">
                            </el-table-column>
                            <el-table-column
                                    prop="sex"
                                    :label="formDataLabel[4]"
                                    align="center"
                                    v-if="tab==formDataLabel[4]"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="idNumber"
                                    :label="formDataLabel[5]"
                                    align="center"
                                    v-if="tab==formDataLabel[5]"
                            >
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
        </div>

        <el-dialog :append-to-body="true" class="dialog" title="添加员工信息" v-model="addFormVisible" :close-on-click-modal="true" size="tiny"
        >
            <!--<div class="input-box">-->
            <el-form :model="addFormData">
                <el-row :span="24">
                    <el-col :span="8">
                        <el-form-item label="姓名" label-width="30%">
                            <el-input v-model="addFormData.name"
                                      placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="身份证号" label-width="50%">
                            <el-input v-model="addFormData.idNumber"
                                      placeholder="请输入身份证号"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4" class="uploaderFloat" :push="2">
                        <el-upload
                                class="avatar-uploader"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="工号" label-width="30%">
                            <el-input v-model="addFormData.jobNumber"
                                      placeholder="请输入工号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="出生年月" label-width="50%">
                            <el-input v-model="addFormData.dateOfBirth"
                                      placeholder="请输入出生年月"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="性别" label-width="30%">
                            <template>
                                <el-radio class="radio" v-model="radio" label="1">男</el-radio>
                                <el-radio class="radio" v-model="radio" label="2">女</el-radio>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="民族" label-width="50%">
                            <el-input v-model="addFormData.nation"
                                      placeholder="请输入民族"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row :span="24">
                    <el-col :span="24">
                        <el-form-item label="身份证地址" label-width="22%">
                            <el-input v-model="addFormData.idNumberAddress"
                                      placeholder="请输入地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :span="24">
                    <el-col :span="24">
                        <el-form-item label="身份证发证机关" label-width="22%">
                            <el-input v-model="addFormData.idIssuingAuthority"
                                      placeholder="请输入发证机关"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="14" class="double">
                        <div class="nowrap">
                            <el-form-item label="身份证有效期" label-width="37.5%">
                                <el-date-picker
                                        v-model="formData.plateStartTime"
                                        type="date"
                                        placeholder="开始时间"
                                        class="dataMargin"
                                        align="left"
                                        >
                                </el-date-picker>
                                至
                                <el-date-picker
                                        v-model="formData.plateEndTime"
                                        type="date"
                                        placeholder="结束时间"
                                        align="left"
                                        >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="24">
                        <el-form-item label="手机号码" label-width="22%">
                            <el-input v-model="addFormData.phone"
                                      placeholder="请输入手机号"
                                      maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>


                </el-row>

                <el-row :span="24">
                    <el-col :span="24">
                        <el-form-item label="所属组织" label-width="22%">
                            <el-cascader
                                    expand-trigger="hover"
                                    :options="options"
                                    v-model="selectedOptions"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row :span="24">
                    <el-col :span="24">
                        <el-form-item label="职务" label-width="22%">
                            <el-cascader
                                    expand-trigger="hover"
                                    :options="options"
                                    v-model="selectedOptions1"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--</div>-->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click.native="addFormVisible = false">返回</el-button>
                <el-button type="primary" size="small" @click.native="save()" class="btn-active">
                    保存
                </el-button>

            </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog :append-to-body="true" class="dialog" title="添加" v-model="editFormVisible" :close-on-click-modal="true" size="tiny"
                   top="10%">
            <div class="fromBox">

                <el-form :model="editForm" label-width="23%" ref="addForm">
                    <el-form-item label="姓名" label-width="23%">
                        <el-input v-model="editForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" label-width="23%">
                        <el-input v-model="editForm.depart" placeholder="请输入部门"></el-input>
                    </el-form-item>

                    <el-form-item label="职位" label-width="23%">
                        <el-select v-model="editForm.post" placeholder="请选择">
                            <el-option v-for="item in formSelect.post" :key="item.value" :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="性别" label-width="23%">
                        <el-input v-model="editForm.sex" placeholder="请输入性别"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证号" label-width="23%">
                        <el-input v-model="editForm.idNumber" placeholder="请输入身份证号"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click.native="editSubmit" class="btn-active">提交</el-button>
                <el-button type="primary" size="small" @click.native="editFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import axios from 'axios'; //引入axios
    export default {
        data() {
            return {
                URL: "http://192.168.185.194:10006/sysEmployee/",
                radio: '1',
                imageUrl: '../../../../assets/images/girl.jpg',
                editFormVisible: false,
                addFormVisible: false,
                Selected: [],//列表选中列
                tableKey: 0,
                visible: false,
                disMore: true, //更多按钮显示
                show: false, //显示隐藏
                value1: '', //时间值
                pickerOptions0: {   //时间数据
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                formData: {  //表单input值
                    phone: '',  //手机号码
                    name: '',    //姓名
                    post: '',//职务
                },
                addFormData: {
                    name: '',//姓名
                    idNumber: '',//身份证号
                    jobNumber: '',//工号
                    dateOfBirth: '',//出生年月
                    sex: '',//性别
                    nation: '',//民族
                    idNumberAddress: '',//身份证地址
                    idIssuingAuthority: '',//身份证发证机关
                    startIdTermOfValidity: '',//身份证有效期开始时间
                    endIdTermOfValidity: '',//身份证有效期结束时间
                    phone: '',//手机号码
                    organize: '',//所属组织
                    post: ''//职务
                },
                //编辑界面数据
                editForm: {
                    serialNumber: '',
                    jobNumber: '',
                    name: '',
                    depart: '',
                    post: '',
                    sex: '',
                    idNumber: '',
                },
                formSelect: {   //下拉框数据
                    post: [{    //片区下拉数据
                        value: '选项1',
                        label: '教练'
                    }, {
                        value: '选项2',
                        label: '财务经理'
                    }],
                    region: ''
                },
                formDataLabel: ['工号', '姓名', '部门', '职位', '性别', '身份证号'],   //表头数据 表头label
                tableShow: ['工号', '姓名', '部门', '职位', '性别', '身份证号'],   //显示的字段
                //多选
                checkAll: true,
                checkedOps: [], //选中值
                isIndeterminate: true,
                tableData: [{   //表格默认数据
                    serialNumber: '1',
                    jobNumber: 'SZ-SGJX-0001',
                    name: '刘某某',
                    depart: '财务部',
                    post: '财务经理',
                    sex: '男',
                    idNumber: '214342342343243141',
                }, {
                    serialNumber: '2',
                    jobNumber: 'SZ-SGJX-0002',
                    name: '李某某',
                    depart: '财务部',
                    post: '教练',
                    sex: '女',
                    idNumber: '214342342343243141',
                }],
                options: [{
                    value: 'shengangjiaxiao',
                    label: '深港驾校',
                    children: [{
                        value: 'xiaoban',
                        label: '校办',
                        children: [{
                            value: 'licenseDepartment',
                            label: '牌证部'
                        }, {
                            value: 'administrationDepartment',
                            label: '行政部'
                        }, {
                            value: 'vehicleDepartment',
                            label: '车务部'
                        }, {
                            value: 'financeDepartment',
                            label: '财务部'
                        }, {
                            value: 'academicAffairsDepartment',
                            label: '教务部'
                        }]
                    }, {
                        value: 'futianArea',
                        label: '福田片区',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '车公庙训练场'
                        }, {
                            value: 'dingbudaohang',
                            label: '上梅林考场'
                        }]
                    }]
                }],
                selectedOptions: [],
                selectedOptions1: [],
                loading: false, //loading
                total: 0,   //分页总数量
                pageSize: 10, //当前页面
                currentPage: 1,  //跳转页面
            }
        },
        methods: {
            search() {   //搜索按钮事件

            },
            educe() {  //按钮导出事件

            },
            add() {  //新增员工信息
                this.addFormVisible = true;
            },
            addHiddenFields() {  //添加隐藏字段

            },
            more() {  //更多按钮事件
                this.show = !this.show
            },
            fieldSetting() {     //字段设置

            },
            selsChange(sels) {
                this.Selected = sels;
            }, handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            }, handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
            handleCheckAllChange(event) {
                this.checkedOps = event.target.checked ? this.formDataLabel : [];   //全选
                this.isIndeterminate = false;   //全选的钩子
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;    //选中的选项
                this.checkAll = checkedCount === this.formDataLabel.length; //是否已经全选
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.formDataLabel.length;
            },
            popoverBtn() {      //显示字段确定按钮
                this.tableKey = this.tableKey + 1;    //更新表格key
                this.tableShow = this.checkedOps;    //要显示的字段
                this.visible = false    //隐藏显示字段面板
            },
            resetVisible() {
                this.checkedOps = this.formDataLabel;   //重置
                this.checkAll = true;    //全选按钮勾选
                this.isIndeterminate = false;
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJPG && isLt2M;
            },
            edit() {     //编辑
                let sele = this.Selected;
                let _this = this;
                if (sele.length >= 2) {
                    this.$message({
                        message: '不能同时编辑多条',
                        type: 'warning'
                    });
                } else if (sele.length <= 0) {
                    this.$message({
                        message: '请勾选要编辑的表格',
                        type: 'warning'
                    });
                } else {
                    this.editFormVisible = true;
                    this.editForm.serialNumber = sele[0].serialNumber;
                    this.editForm.jobNumber = sele[0].jobNumber;
                    this.editForm.name = sele[0].name;
                    this.editForm.depart = sele[0].depart;
                    this.editForm.post = sele[0].post;
                    this.editForm.sex = sele[0].sex;
                    this.editForm.idNumber = sele[0].idNumber;
                }
            },
            editSubmit() {
                this.editFormVisible = false;
                this.tableData[this.editForm.serialNumber] = this.editForm;
            },
            getList() {  // 获取表格列表
                let _this = this;
                let data = {
                    "p": this.currentPage,
                    "s": this.pageSize,
                    "name":this.formData.name,
                    "phone":this.formData.phone
                };

                this.request("list", data, function (res) {
//                     console.log(res);
                    let response = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        let obj = {};
                        obj.id = res.data.data[i].id;
                        obj.postName = res.data.data[i].name;
                        obj.status = res.data.data[i].disable;
                        obj.postNumber = res.data.data[i].empNum;
                        obj.createTime = res.data.data[i].createdAt;
                        obj.remark = res.data.data[i].description;
                        response[i] = obj;
                    }

                    // console.log(response);
                    _this.tableData = response;
                    _this.total = res.data.total;   // 分页总数量

                });

                //console.log("表格列表更新");
            },
            request(field, data, fun) {
                axios({
                    method: "POST",
                    url: this.URL + field,
                    data: data
                }).then(fun);
            },
        },
        mounted() {
            this.checkedOps = this.tableShow;   //默认显示字段
            this.isIndeterminate = false;
        },
        created() {
            if (Object.keys(this.formData).length > 7) {     //如果搜索条件框小于7 更多按钮不能点击
                this.disMore = false;
            }
        },
    }
</script>

<style>

    /* table-box */
    .table-box {
        width: 100%;
        background: #ffffff;
        border: 1px solid rgba(221, 221, 221, 0.50);
        border-radius: 4px;
        padding: 10px 20px;
        box-sizing: border-box;
    }

    .uploaderFloat .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: absolute;
        overflow: hidden;
        text-align: right;
    }

    .uploaderFloat .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .uploaderFloat .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 132px;
        line-height: 106px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 132px;
        /*display: block;*/
    }

    .btn-content {
        margin-bottom: 10px;
    }

    .el-form-item {
        margin-bottom: 0;
    }

    .form-box .btn .el-form-item__content .el-button + .el-button {
        margin-left: 20px;
    }

    .popoverBtn {
        text-align: right;
        margin: 15px 25px 15px 25px;
    }

    .nowrap {
        white-space: nowrap
    }
</style>
