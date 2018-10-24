<template>
    <div class="table-box">
    <div id="model" >
        <div id="btn">
            <el-button type="primary" icon="edit" id="drawingProcess" size="small" @click="button">绘制流程</el-button>
        </div>

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
                    prop="id"
                    label="模型编号"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="模型名称"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="version"
                    label="版本"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
            >
                <template slot-scope="scope">
                    {{scope.row.createTime | parseTime('{y}-{m}-{d}   {h}:{i}:{s}') }}
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="250">
                <template slot-scope="scope">
                    <el-button v-show="userButtonCodes.edit" @click="handleEdit(scope.$index, scope.row)" type="text" id="edit" size="small">编辑</el-button>
                    <el-button v-show="userButtonCodes.drawingProcess" @click="handleRelease(scope.$index, scope.row)" type="text" id="release" size="small" :loading="releaseLoading">发布</el-button>
                </template>
            </el-table-column>
        </el-table>
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


        <el-dialog :append-to-body="true" title="绘制流程" :visible.sync="dialogFormVisible" top="2%" width="33%" :before-close="handleClose">
            <screenfull class='screenfull'></screenfull>
            <iframe v-bind:src="urlId" width="100%" height="800">
            </iframe>
            <!--<div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>-->
        </el-dialog>
    </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { modelList , newModel ,deployment} from '@/api/system/userManage'
    import Screenfull from '../../../components/Screenfull/index.vue';
    import Hamburger from '../../../components/Hamburger/index.vue';
    export default {
        components: {
            Screenfull,
            Hamburger
        },
        data() {
            return {
                releaseLoading:false,
                userButtonCodes:{}, //权限按钮
                tableKey:0,
                currentPage:1,
                pageSize:10,
                total:0,
                editLoading:false,
                editFormVisible: false,//新增界面是否显示
                dialogFormVisible: false,
                loading: false,
                urlId:'',
                tableData: [],
                //编辑界面数据
                editForm: {
                    id:'',
                    name: '',
                    version:'1',
                    createTime: '',
                },
            }
        },
        methods: {
            selsChange(sels) {
                this.Selected = sels;
            }, handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            }, handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
            handleClose(done) {
                let _this =this;
                this.$confirm('是否已经保存？')
                    .then(_ => {
                        done();
                        this.loading = true;
                        _this.getList();
                    })
                    .catch(_ => {

                    });

            },
            //获取列表
            getList(){
                this.loading = true;
                let data={
                    pageSize:this.pageSize,
                    currentPage:this.currentPage
                };
                modelList(data).then(res=>{
                    this.loading = false;
                    if(res.data.status){
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.data;
                    }
                })
                this.Jurisdiction(['system','userManage','model']); //资源权限 页面地址
            },
            //显示编辑界面
            handleEdit(index, row) {
             //   this.dialogFormVisible = true;
                //this.editForm = Object.assign({}, row);
                let access_token =  this.$store.getters.access_token;
            //  this.urlId = 'http://192.168.87.211:10020/workflow/modeler.html?modelId='+ row.id+'&access_token='+access_token;
               // window.location.href = 'http://192.168.87.211:10020/workflow/modeler.html?modelId='+ row.id+'&access_token='+access_token;
               // window.open(process.env.BASE_API+'/workflow/modeler.html?modelId='+ row.id+'&access_token='+access_token);
                window.open('static/workflow/modeler.html?modelId='+ row.id+'&access_token='+access_token);
                //console.log( this.urlId)
            },
            handleRelease(index, row){
                this.releaseLoading = true
                deployment(row.id).then(res=>{
                    this.releaseLoading = false
                    if(res.data.status){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                    }
                })
            },
            //新增按钮
            button(){

                let access_token =  this.$store.getters.access_token;
               /* newModel({"tenantId":"1"}).then(res=>{
                    if(res.data.status){
                       // window.open(process.env.BASE_API+'/workflow/modeler.html?modelId='+ res.data.data.id+'&access_token='+access_token);
                       // window.open('static/workflow/modeler.html?modelId='+ res.data.data.id+'&access_token='+access_token);
                        window.open('static/workflow/modeler.html?modelId='+ res.data.data.id+'&access_token='+access_token);
                    }
                })*/
                let _this = this;
               // console.log(window._Host.BASE_API)
              //  return
                //这个接口需要设置头部content-type
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                if (window.location.href.indexOf('localhost') >= 0 || window.location.hostname === "127.0.0.1"){
                    axios.post('http://10.9.40.211:10020/apis/workflow/api/v1/model/newModel?access_token='+access_token,{"tenantId":"1"})
                        .then(function(res){
                            window.open('static/workflow/modeler.html?modelId='+ res.data.data.id+'&access_token='+access_token);
                        });
                }else{
                    axios.post('/apis/workflow/api/v1/model/newModel?access_token='+access_token,{"tenantId":"1"})
                        .then(function(res){
                            window.open('static/workflow/modeler.html?modelId='+ res.data.data.id+'&access_token='+access_token);
                        });
                }

            }
        },
        created(){
        },
        mounted(){
           this.getList();
        }
    }
</script>

<style>
    #btn{background:#ffffff;height: 50px;line-height: 50px;padding-left: 10px;}
</style>