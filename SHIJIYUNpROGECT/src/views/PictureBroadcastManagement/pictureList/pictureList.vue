<template>
    <!--图播管理-->
    <div id="pictureList">
        <div class="pictureList_header boxSizing">
            <el-button type="primary" plain @click="addPicture">新增图集</el-button>
            <el-input v-model="objData.search" placeholder="图播号、标题、作者搜索"></el-input>
            <el-button type="primary" plain @click="search">搜索</el-button>
        </div>
        <div class="tab_header overflowHidden">
               <div class="floatLeft">内容列表（图 {{0}} 条，视频{{0}}条，直播{{0}}条，音频{{0}}条）</div>
               <div class="floatRigth">
                   <el-button type="primary" plain @click="sorting('提交排序')">提交排序</el-button>
                   <el-button type="primary" plain @click="sorting('清空全部排序')">清空全部排序</el-button>
                   <el-button type="primary" plain @click="sorting('清空本页排序')">清空本页排序</el-button>
               </div>
        </div>

        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" width="50">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column label="图集标题" width="200">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="最后编辑" width="100">
                    <template slot-scope="scope">
                        {{scope.row.editer}}
                    </template>
                </el-table-column>
                <el-table-column label="图播号" width="100">
                    <template slot-scope="scope">
                        {{scope.row.tbCode}}
                    </template>
                </el-table-column>
                <el-table-column label="阅读量" width="100">
                    <template slot-scope="scope">
                        {{scope.row.viewCount}}
                    </template>
                </el-table-column>
                <el-table-column label="点赞" width="100">
                    <template slot-scope="scope">
                        {{scope.row.laudedCount}}
                    </template>
                </el-table-column>
                <el-table-column label="评论" width="100">
                    <template slot-scope="scope">
                        {{scope.row.commentCount}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <span class="cursor" @click="operation('编辑',scope.row)">编辑</span>
                        <span class="cursor"  @click="operation('查看',scope.row)">查看</span>
                        <span class="cursor"  @click="operation('分享',scope.row)">分享</span>
                        <span class="cursor" v-if="scope.row.pubStatus==true"  @click="operation('下架',scope.row)">下架</span>
                        <span class="cursor"  v-if="scope.row.pubStatus==false"   @click="operation('上架',scope.row)">上架</span>
                        <span class="cursor"  @click="operation('删除',scope.row)">删除</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        {{scope.row.pubStatus|pubStatu}}
                    </template>
                </el-table-column>
                <el-table-column label="排序设置" width="100">
                    <template slot-scope="scope">
                        <!--<el-input v-model="" width="80"></el-input>-->
                        <el-input  type="number" v-model="scope.row.sort" width="80" @blur="sortClick(scope.row,scope.$index)"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="obj.p"
                        :page-sizes="[20, 50, 100, 200]"
                        :page-size="obj.s"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <!--分享生成二维码-->
        <el-dialog :append-to-body="true" class="dialog" title="二维码" :visible.sync="qrcodeShow" :close-on-click-modal="true" width="800px" top="30%">
            <qrCode v-if="qrcodeShow" :bookId="bookId"></qrCode>
        </el-dialog>
    </div>
</template>


<script>
    import qrCode from  '../alter/shareErweima.vue'
                                         //列表                          //排序                         //删除           //上下架                          //清空本页排序                               //清除所有的排序
    import {sysAttachmentUpPublicToken,activityImagesBookBackList,activityImagesBookUpdateSorts,activityImagesBookremove,activityImagesBookupdatePubStatus,activityImagesBookupdateclearCurrentPageSort,activityImagesBookupdateclearAllSort} from '../../../api/pictureBroadcastManagement/pictureBroadcastApi'
    export default {
        components:{
            qrCode
        },
        data() {
            return {
                bookId:'',
                qrcodeShow:false,//分享显示
                sortArr:[],//排序传后台
                tableData:[], //table数据
                objData:{
                    search:"",
                },
                obj:{ //分页
                    p:1, //当前页面
                    s:20,//跳转页面
                },
                total:0,   //分页总数量
                flag:false, //排序成功
            }
        },
        created(){
         this.query();
        },
        methods: {
            sortClick(v,i){//每个排序失去焦点
                    for (let i=0;i<this.sortArr.length;i++){
                        if(this.sortArr[i].bookId == v.bookId){
                            this.sortArr.splice(i,1)
                        }
                    }
                this.sortArr.push(v)
            },
            addPicture(){//新增图集
              this.$router.push({path:'/pictureBroadcastMrg/pictureBroadcastMrg/addpictureAll/addpicture'})
            },
            search(){// 搜索
                this.sortArr = [];
                this.query();
            },
            operation(v,item){ //操作
                if(v=='编辑'){
                    this.$router.push({path:'/pictureBroadcastMrg/pictureBroadcastMrg/addpictureAll/eidepicture',query:{id:item.bookId}})
                }else if(v=='查看'){
                    this.$router.push({path:'/pictureBroadcastMrg/pictureBroadcastMrg/addpictureAll/lookpicture',query:{id:item.bookId}})
                }else if(v=='分享'){
                    this.qrcodeShow = true;
                    this.bookId = 'https://dcloud.butongtech.com/#/pictureLiveBroadcast?isBool=false&id='+item.bookId+'&bookId='+item.bookId;
                }else if(v=='下架'){
                    this.$confirm('此操作将下架图片, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        activityImagesBookupdatePubStatus({"pubStatus":false,"bookId":item.bookId}).then(res=>{
                            if(res.data.status==true){
                                this.query();
                                this.$message({
                                    type: 'success',
                                    message: '下架成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.message
                                });
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消下架'
                        });
                    });

                }else if(v=='删除'){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        activityImagesBookremove([item.bookId]).then(res=>{
                            if(res.data.status==true){
                                this.query();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.message
                                });
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(v=='上架'){
                    this.$confirm('此操作将上架图片, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        activityImagesBookupdatePubStatus({"pubStatus":true,"bookId":item.bookId}).then(res=>{
                            if(res.data.status==true){
                                this.query();
                                this.$message({
                                    type: 'success',
                                    message: '上架成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.message
                                });
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消上架'
                        });
                    });
                }
            },
            sortN(){//重新排序
                let arr = this.sortArr.map((item,index)=>{
                    return {bookId:item.bookId,sort:item.sort}
                })
                activityImagesBookUpdateSorts(arr).then(res=>{
                    console.log(res,'sds')
                    if(res.data.status=true){
                         this.flag = true;
                        this.sortArr = [];
                        this.$message({
                            type: 'success',
                            message: res.data.message+'3s后刷新数据'
                        });
                    }else{
                        this.flag = false;
                        this.$message({
                            type: 'warning',
                            message: res.data.message
                        });
                    }
                })
            },
            sorting(v){ //排序
                if(v=='提交排序'){
                   this.sortN();
                   setTimeout(()=>{
                       if(this.flag == true){
                           this.query();
                       }
                   },3000)

                }else if(v=='清空全部排序'){
                    this.$confirm('此操作将清空全部排序, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        activityImagesBookupdateclearAllSort().then(res=>{
                            if(res.data.status=true){
                                this.query();
                                this.$message({
                                    type: 'success',
                                    message: '全部排序已清除'
                                });
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.message
                                });
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消清除全部排序'
                        });
                    });
                }else if(v=='清空本页排序'){
                    let arr=[];
                    arr = this.tableData.map((item,index)=>{
                        return item.bookId
                    })
                    this.$confirm('此操作将清空本页排序, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        activityImagesBookupdateclearCurrentPageSort(arr).then(res=>{
                            if(res.data.status=true){
                                this.query();
                                this.$message({
                                    type: 'success',
                                    message: '本页排序已清除'
                                });
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.message
                                });
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消清除本页排序'
                        });
                    });

                }
            },
            query(){//数据请求
                activityImagesBookBackList(this.objData.search,'sort','ASC',this.obj.p,this.obj.s).then(res=>{
                       if(res.data.status==true){
                           this.total = res.data.total;
                           this.tableData = res.data.data;
                       }else{
                           this.$message({
                               type: 'warning',
                               message: res.data.message
                           });
                       }
                })
            },
            reset(){ //重置
                this.sortArr = [];
                this.objData.search = '',
                this.obj={
                    p:1, //当前页面
                    s:10,//跳转页面'
                },
                    this.query();
            },
            getList(){ // 获取数据
                this.reset();
            },
            handleSizeChange(val) {     //每页显示多少行

                this.obj.s = val;
                this.query();
            },
            handleCurrentChange(val) {  //当前页
//               this.sortN();
                this.obj.p = val;
                this.query();
            },
        }
    };
</script>

<style scoped lang="scss">
  #pictureList{
      width: 100%;
      .pictureList_header{
          width: 100%;
          height: 100px;
          background: #cccccc;
          padding: 30px;
          box-sizing: border-box;
          .el-input{
              width: 300px;
          }
      }
      .tab_header{
          width: 100%;
          height: 100px;
          background: #ffffff;
          overflow: hidden;
          div:nth-child(1){
              width: 50%;
              height: 40px;
              margin: 60px 0 0 40px;
          }
          div:nth-last-of-type(1){
              width: 40%;
              margin-top: 30px;
          }
      }
      .table{
          width: 100%;
      }
  }
</style>
