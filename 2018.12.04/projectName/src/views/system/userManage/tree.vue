<template>
    <div class="main-box" clz-type="table">
        <div class="table-box">
            <div id="treeBox">
                <div class="custom-tree-container" style="width: 500px;display: inline-block">
                    <div class="block">
                        <el-tree
                                :data="data"
                                node-key="id"
                                :default-expand-all = false
                                @node-click="handleNodeClick"
                                :props="defaultProps"
                                :expand-on-click-node="false">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                              <el-button
                                      type="text"
                                      size="mini"
                                      @click.stop="() => append(data)">
                                Append
                              </el-button>
                              <el-button
                                      type="text"
                                      size="mini"
                                      @click.stop="() => remove(node, data)">
                                Delete
                              </el-button>
                            </span>
                          </span>
                        </el-tree>
                    </div>
                </div>
            </div>

            <div class="treeContent">
                <el-form ref="formData" :model="formData" label-width="23%">
                    <el-form-item label="名称">
                        <el-input v-model="formData.name" :disabled="editDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input v-model="formData.code" :disabled="editDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="formData.type" placeholder="请选择类型" :disabled="editDisabled">
                            <el-option v-for="item in formSelect.type" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formData.disable" placeholder="请选择状态" :disabled="editDisabled">
                            <el-option v-for="item in formSelect.disable" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序值">
                        <el-input v-model="formData.sort" :disabled="editDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="标识">
                        <el-input v-model="formData.value" :disabled="editDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入备注"
                                :disabled="editDisabled"
                                v-model="formData.description">
                        </el-input>
                    </el-form-item>
                    <el-button type="primary"  size="small" @click="save" id="save" >保存</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    import {saveResource, delResourcePost, getResourceList, } from '@/api/system/userManage'
    let id = 1000;

    export default {
        data() {
            return {
                data:[],
                editDisabled:true,
                formData:{
                    id:'',
                    parentId:'',
                    name:'',
                    code:'',
                    sort:'',
                    value:'',
                    type:'',
                    description:'',
                    disable:'',
                },
                formSelect:{
                    disable:[{
                        value: false,
                        label: '可用'
                    },{
                        value: true,
                        label: '禁用'
                    }],
                    type:[{
                        value: 'page',
                        label: '页面'
                    },{
                        value: 'button',
                        label: '按钮'
                    },{
                        value: 'field',
                        label: '字段'
                    }]
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                loading:false,
                appendData:[]
            }
        },

        methods: {
            handleNodeClick(data) {
                this.formData = data;
                this.editDisabled = true;
            },
            append(data) {
                this.formData ={};
                this.appendData = data;
                this.editDisabled = false;
            },
            remove(node, data) {
                console.log(node)
                return
                delResourcePost(node.data.id).then(res=>{
                    if(res.data.status){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.id === data.id);
                        children.splice(index, 1);
                    }
                });

            },
            save(){
                let data  = this.appendData;
                let formData = this.formData;
                formData.parentId = data.id;
                saveResource(formData).then(res=>{
                    this.editDisabled = true;
                    if(res.data.status){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        const newChild = { id: formData.sort, name: formData.name, children: [] };
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }
                        data.children.push(newChild)
                    }
                });
                this.editDisabled = true;
            },
            getList() {  //获取数据
                this.loading = true;
                let data = {};
                getResourceList(data).then(res => {
                    this.loading = false;
                    if (res.data.status) {
                        this.data = res.data.data;
                    }
                });
            }
        },
        created(){
            this.getList()
        }
    };
</script>

<style scoped>
    .table-box{
        display: inline-block;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
  /*  #clz .el-button{
        background: none;
        border: none;
    }*/
    .el-tree-node__expand-icon{
        font-size: 14px;
        margin: 5px 7px !important;
    }
    #treeBox .el-tree-node__expand-icon .el-icon-caret-right{
        margin: 5px 7px !important;
    }
    #treeBox{
        max-height: 700px;
        min-height: 300px;
        overflow: auto;
        width: 565px;
        display: inline-block;
        float: left;
    }
    .custom-tree-container{
        display: inline-block;flex:none;margin-right: 20px;min-width:388px;width:25%;min-height: 600px;
    }

    .treeContent{
        margin-left: 20px;
        float: left;
        width: 500px;
        border: 1px solid rgb(209, 227, 229);
        text-align: center;
        box-sizing: border-box;
        min-width: 400px;
        padding: 20px;
        display: inline-block;
    }
    .el-select{width: 100%;}
    .el-form-item{ margin-bottom: 10px;}
    .el-tree-node__content>.el-tree-node__expand-icon {
        padding: 6px;
    }
</style>
