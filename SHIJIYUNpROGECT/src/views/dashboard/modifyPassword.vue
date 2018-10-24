/**
* User: wuxinshuang
* Date: 2018/6/7
* Time: 16:19
* remark:
*/
<template>
    <div class="main-box" clz-type="table">
        <!-- 搜索表单 -->
        <div class="form-box">
            <!-- 响应式24 总宽度-->
            <el-row :span="24">
                <!-- 响应式6 -->
                <el-collapse-transition >
                    <div class="input-box-center"  >
                        <el-form :inline="true" :model="formData" ref="formData" :rules="rules" class="demo-form-inline" label-width="30%">
                            <el-row :span="24">
                                <el-col :span="6">
                                    <el-form-item label="原始密码" prop="oldPassword" >
                                        <el-input type="password" v-model="formData.oldPassword" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="新密码" prop="newPassword" class="item">
                                        <el-input type="password" v-model="formData.newPassword" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="checkPass" class="item">
                                        <el-input type="password" v-model="formData.checkPass" ></el-input>
                                    </el-form-item>
                                    <el-form-item style="text-align: center" class="item">
                                        <el-button type="primary" @click="submitForm('formData')" size="small">提交</el-button>
                                        <el-button type="primary" @click="resetForm('formData')" size="small">重置</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-collapse-transition>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { modify } from '@/api/system/userManage'
    export default {
        name: "modifyPassword",
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formData.checkPass !== '') {
                        this.$refs.formData.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                formData:{
                    oldPassword:'',
                    newPassword:'',
                    checkPass:''
                },
                rules: {
                    oldPassword:[
                        { required: true, message: '请输入原始密码', trigger: 'blur' },
                    ],
                    newPassword: [
                        { validator: validatePass, trigger: 'blur' },
                        {required: true,min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        {required: true, min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        modify(this.formData).then(res => {
                            if(res.data.status){
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                                let data = {
                                    closeTabs: '修改密码',     //关闭页面的名字
                                    backTabs:'',   //要返回父页面的名字
                                };
                                this.$root.hubBus.$emit('closeWindow', data);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .item{
        margin-top: 15px !important;
    }
</style>