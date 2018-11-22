<template>
    <div class="main-box" clz-type="table">
        <!-- 权限设置 -->
        <div class="table-box">
            <div class="tree" v-loading="loading">
                <el-tree
                        :data="data"
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :props="defaultProps">
                </el-tree>

            </div>
            <div class="content">
                <div class="treeBtn">
                    <el-button v-show="userButtonCodes.addParent" type="primary"  size="small" @click="addParent" id="addParent" >新增</el-button>
                    <el-button v-show="userButtonCodes.addChildren" type="primary"  size="small" @click="addChildren" id="addChildren" >新增下级地区</el-button>
                    <el-button v-show="userButtonCodes.editResource" type="primary"  size="small" @click="editResource" id="editResource" >编辑地区</el-button>
                    <el-button v-show="userButtonCodes.delResource" type="primary"  size="small" @click="delResource" id="delResource" class="btn-warning">删除地区</el-button>
                </div>
                <div class="treeContent">
                    <el-form ref="formData" :model="formData"  label-width="23%">
                        <el-form-item label="名称" prop="name" :rules="filter_rules({required:true})">
                            <el-input v-model="formData.name" :disabled="editDisabled" placeholder="请选择名称"></el-input>
                        </el-form-item>
                        <el-form-item label="编码" prop="code" :rules="filter_rules({required:true})">
                            <el-input v-model="formData.code" :disabled="editDisabled" placeholder="请选择编码"></el-input>
                        </el-form-item>
                        <el-form-item label="等级" prop="level" :rules="filter_rules({required:true,type:'select'})">
                            <el-select v-model="formData.level" placeholder="请选择等级" :disabled="editDisabled">
                                <el-option v-for="item in formSelect.level" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="排序值" prop="sort">
                            <el-input v-model="formData.sort" :disabled="editDisabled" placeholder="请选择排序值"></el-input>
                        </el-form-item>
                        <el-button type="primary"  size="small" @click="save('formData')" id="save" :disabled="editDisabled">保存</el-button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'; //引入axios
    import {saveRegion, delRegionPost, getRegionList, } from '@/api/system/userManage'

    export default {
        data() {
            return {
                userButtonCodes:{}, //权限按钮
                editDisabled:true,
                loading:false,
                formData:{
                    id:'',
                    parentId:'',
                    name:'',
                    code:'',
                    sort:'',
                    level:'',
                },
                level:[{
                    value: 'COUNTRY',
                    label: '国家'
                },{
                    value: 'PROVINCE',
                    label: '省'
                },{
                    value: 'CITY',
                    label: '市'
                },{
                    value: 'AREA',
                    label: '区'
                }],
                formSelect:{
                    level:[],
                    type:[{
                        value: 'page',
                        label: '页面'
                    },{
                        value: 'button',
                        label: '按钮'
                    },{
                        value: 'field',
                        label: '领域'
                    }]
                },
                data: [
//                    {
//                    id: 1,
//                    label: '一级 1',
//                    children: [{
//                        id: 4,
//                        label: '二级 1-1',
//                        children: [{
//                            id: 9,
//                            label: '三级 1-1-1'
//                        }, {
//                            id: 10,
//                            label: '三级 1-1-2'
//                        }]
//                    }]
//                }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                this.formData = data;
                this.editDisabled = true;
            },
            addParent(){
                this.formData={
                    id:'',
                    parentId:'',
                    name:'',
                    code:'',
                    sort:'',
                    level:'',
                }
                this.editDisabled = false;
                this.formSelect.level = [...this.level]
            },
            addChildren(){
                let  id = this.formData.id;
                this.formData={
                    id:'',
                    parentId:'',
                    name:'',
                    code:'',
                    sort:'',
                    level:'',
                };
                 this.formData.parentId = id;
                 this.formSelect.level = [...this.level].splice(1,3)
                if(this.formData.parentId){
                    this.editDisabled = false;
                }else{
                    this.$message.warning('请选择父级资源');
                    return false
                }
            },
            editResource(){
                if(this.formData.id){
                    this.editDisabled=false;
                }else{
                    this.$message.warning('请选择要编辑的资源');
                    return false
                }
            },
            delResource(){
                let _this =this;
                let del = this.formData.id;
                if(!del) {
                    _this.$message.warning('请选择要删除的资源');
                    return false
                }
                this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delRegionPost(del).then(res=>{
                        if(res.data.status){
                            _this.getList();
                            _this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.formData.id = ''
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


//                console.log(del)
//                axios({
//                    method:"post",
//                    url:'http://192.168.185.194:10006/sysRegion/delete/'+del,
//                }).then(function(res){
//                    _this.getList();
//                    console.log(res);
//                    //_this.data = res.data.data
//                })
            },
            save(formName){
                let _this =this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        saveRegion(this.formData).then(res=>{
                            _this.editDisabled = true;
                            if(res.data.status){
                                _this.getList();
                                _this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


//                axios({
//                    method:"post",
//                    url:'http://192.168.185.194:10006/sysRegion/saveOrUpdate',
//                    data:this.formData
//                }).then(function(res){
//                    _this.getList();
//                    console.log(res);
//                    //_this.data = res.data.data
//                })

            },
            getList(){  //获取数据
                this.loading = true;
                let data = {};
                getRegionList(data).then(res=>{
                    this.loading = false;
                    if(res.data.status){
                        this.data = res.data.data;
                    }
                });

//                axios({
//                    method:"post",
//                    url:'http://192.168.185.194:10006/sysRegion/tree',
//                }).then(function(res){
//                    console.log(res);
//                    _this.data = res.data.data
//                })
               this.Jurisdiction(['system','userManage','regionalMag']); //资源权限 页面地址
            }
        },
        created(){
            this.getList();  //初始化数据
            console.log(this.userButtonCodes)
        }
    };
</script>


<style scoped>
    .table-box{display: flex;min-width: 865px;}
    .el-tree{min-height: 600px;height: 1270px;}
    .tree{display: inline-block;flex:none;margin-right: 20px;min-width:388px;width:25%;}
    .treeBtn{padding:20px 0;height: 20px;}
    .treeContent{ width: 40%;height: 600px;border: 1px solid rgb(209, 227, 229);text-align: center;box-sizing: border-box;min-width:400px;padding: 20px;}
    .treeContent .el-form{width: 85%;display: inline-block;}
    .el-form-item{margin-bottom: 15px;}
    .el-select{width: 100%;}
</style>
