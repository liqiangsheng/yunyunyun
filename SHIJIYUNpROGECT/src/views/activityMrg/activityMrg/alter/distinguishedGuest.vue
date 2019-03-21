<template>
    <!--嘉宾列表-->
    <div class="distinguishedGuestBox">
        <div class="clickBox">
            <div class="click">
                <el-button type="primary" plain @click="addPreview">新增</el-button>
                <el-button type="primary" plain @click="okSelect">确定</el-button>
            </div>
        </div>

        <!--<draggable :list="listData" :options="{ sort: true}">-->
            <div class="distinguishedGuest">
                <el-table :data="listData" style="width: 100%">
                    <el-table-column label="序号" width="50">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column label="选择" width="50">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.check"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="头像" width="120">
                        <template slot-scope="scope">
                            <div class="li">
                                <img :src="scope.row.headerUrl" alt=""/>
                                <!-- 上传文件-->
                                <input class="file" type="file" @change="onchangeFile($event,scope.row)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="名字" width="200">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入名字" type="text" v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="名号" width="200">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入称号" type="text" v-model="scope.row.honor"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="简介" width="200">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入简介" type="textarea" v-model="scope.row.introduce"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                           <span @click="del(scope.row)" class="cursor">删除</span>
                           <span @click="preview(scope.row)" class="cursor">保存</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
         <!--</draggable>-->
        <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="pages.p"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="pages.s"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>


</template>
<script>
    import draggable from 'vuedraggable' //拖拽插件
             //列表           //更新嘉宾          //新增嘉宾         //七牛token               //删除嘉宾
    import {honoredGuestList,honoredGuestupdate,honoredGuestInsert,sysAttachmentUpPublicToken,honoredGuestremove} from'../../../../api/activityMrg/activityMrg'
    export default {
        props:['distinguishedGuestIndex','honoredGuestArr'],
        components:{
            draggable
        },
        data() {
            return {
                pages:{p:1,s:100},//分页
                total:0,
                qiniutoken:'',
                listData:[],//嘉宾数据
            }

        },
        methods: {
            okSelect(){ //确定选择
                if(this.distinguishedGuestIndex == 0){ //父
                    let arrList = [];
                    this.listData.forEach((item,index)=>{
                        if(item.check==true){
                            arrList.push(item)
                        }
                    })
                    setTimeout(()=>{
                        if(arrList.length<=0){
                            return this.$message.warning('请选择嘉宾');
                        }
                        this.$emit("distinguishedGuestList",arrList)
                    },0)

                }else{//子
                    let arrList = [];
                    this.listData.forEach((item,index)=>{
                        if(item.check==true){
                            arrList.push(item)
                        }
                    })
                    setTimeout(()=>{
                        if(arrList.length<=0){
                            return this.$message.warning('请选择嘉宾');
                        }
                        this.$emit("distinguishedGuestListSon",arrList)
                    },0)

                }


            },
            addPreview(){//新增
                document.querySelector('.distinguishedGuest').scrollTop = 0;
                let obj={
                    "alias":'',// 昵称 ,
                    "engName":"",// 英文名 ,
                    "headerUrl":"",// 用户头像（七牛云图片地址） ,
                    "honor":"",// 头衔 ,
                    "id":"",//主键id ,
                    "idNo":"",//身份证号码 ,
                    "introduce":"",//介绍 ,
                    "mobile":"",//移动电话号码 ,
                    "name":"",//姓名 ,
                    "nationRegionId":"",//所属国家/地区（关联system.sys_region表id） ,
                    "remark":"",//备注 ,
                    "sort":"",//排序值（越小越靠前）
                    "check":false//多选
                }
              this.listData.unshift(obj)
            },
            preview(item,i){//保存
                if(!item.headerUrl)return this.$message.warning('头像不能为空');
                if(!item.name)return this.$message.warning('名字不能为空');
                if(!item.honor)return this.$message.warning('头衔不能为空');
                if(!item.introduce)return this.$message.warning('简介不能为空');
                if(!!item.id){// 保存

                    honoredGuestupdate(item).then(res=>{
                        if(res.data.status==true){
                            this.$message.success("保存成功");
                            this.query();
                        }else{
                            this.$message.warning(res.data.message);
                        }
                    })
                }else{//新增

                    honoredGuestInsert(item).then(res=>{
                        console.log(res,"999")
                        if(res.data.status==true){
                            this.$message.success("新增成功");
                            this.query();
                        }else{
                            this.$message.warning(res.data.message);
                        }
                    })
                }
            },
            query(){//数据列表
                honoredGuestList(this.pages).then(res=>{
                    console.log(res,"嘉宾")
                    if(res.data.status==true){
                        res.data.data.forEach((item,index)=>{
                            item.check = false;
                            this.honoredGuestArr.forEach((item1,index1)=>{
                                if(item1.honoredGuestId == item.id){
                                    item.check = true;
                                }
                            })
                        })
                        this.listData = res.data.data;
                        this.total = res.data.total;
                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
            },
            del(v){//删除嘉宾
                let obj=[v.id];
                this.$confirm('此操作将删除该嘉宾, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    honoredGuestremove(obj).then(res=>{
                        if(res.data.status==true){
                            this.query();
                        }else{
                            this.$message.warning(res.data.message)
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })


            },
            getList(){ // 获取数据
                this.pages.p = 1;
                this.query();
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pages.s = val;
                this.query();
            },
            handleCurrentChange(val) {  //当前页
                this.pages.p = val;
                this.query();
            },
            onchangeFile(event,v){ // 上传
//                console.log(v,'scope.row')
                let that = this;
                let mydate = new Date()
                var uuid = "YHTLQS"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
                let file=event.target.files[0];
                var formData = new FormData();
                let observable  = qiniu.upload(file, uuid+'.jpg', that.qiniutoken)
                let observer= {
                    next(res){
                        console.log(res,"上传")
                        if(res.total.size>5*1024*1024){
                            that.$message({
                                message:'请上传小于5M的图片',
                                type: 'warning'
                            });
                        };
                        // ...
                    },
                    error(err){
                        that.$message({
                            message:'图片上传失败',
                            type: 'warning'
                        });
                        // ...
                    },
                    complete(res){
                        v.headerUrl="https://pub.qinius.butongtech.com/"+ res.key;
                        that.$message({
                            message:"上传完成",
                            type: 'success'
                        });
                        // ...
                    }
                }
                observable.subscribe(observer)
            },
            qiniuToken(){//七牛云token
                sysAttachmentUpPublicToken().then(res=>{
                    if(res.data.status==true){
                        this.qiniutoken = res.data.data.upToken;
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
            },
        },
        mounted() {

        },
        created(){
            console.log(this.distinguishedGuestIndex,"this.distinguishedGuestIndex")
            console.log(this.honoredGuestArr,"this.distinguishedGuestIndex")
            this.qiniuToken();
          this.query();
        }
    }
</script>
<style lang="scss" scoped>
    .cursor{
        cursor: pointer;
        color: blue;
    }
.distinguishedGuestBox{
    width: 100%;
    height: 900px;
    background: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .clickBox{
        width: 79.5%;height: 60px;
        .click{
            width:200px;
            height: 60px;
            float: left;
            display: inline-block;
            /*float: right;*/
            /*margin: 100px;*/
            .el-button{
                margin-top: 10px;
                margin-left: 0;
            }
        }
    }

    .distinguishedGuest{
        width: 100%;
        height: 800px;
        overflow: hidden;
        overflow-y: scroll;
        .li{
            position: relative;
            width: 100px;
            height: 100px;
            border: 1px solid #cccccc;
            .file{
            position: absolute;
            left: 0;
            top:0;
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            }
            .file:hover{
            cursor: pointer;
            }
            img{
            display: inline-block;
            width: 100px;
            height: 100px;
            }
        }

    }
}
</style>

