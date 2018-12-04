<template>
    <div class="main-box">
        <div class="drafts_header" >
            <el-input  v-model="seachValue" placeholder="输入内容号、标题、作者进行搜索"></el-input>
            <el-button type="primary" @click="seachClick">搜索</el-button>
            <el-input  v-model="seachAllValue" placeholder="输入文章内容进行搜索"></el-input>
            <el-button type="primary" @click="AllseachClick">全文搜索</el-button>
        </div>
        <div class="drafts_message">
            <span>内容列表（图文{{3}}条，视频{{1}}条，直播{{3}}条，音频{{5}}条）</span>
            <el-button type="primary" @click="all_election">全选</el-button>
            <el-button type="primary" @click="reverse_election">反选</el-button>
            <el-button type="primary" @click="batch_release">批量发布</el-button>
        </div>
        <div class="drafts_table">
            <el-table :data="tableData"  max-height="900" border style="width: 100%">
                <el-table-column width="50">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.checked"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column  width="50">
                    <template slot-scope="scope">
                    {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column  width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgPath" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="内容名称"  width="300"> </el-table-column>
                <el-table-column prop="state" label="类型" width="80"> </el-table-column>
                <el-table-column prop="name"  label="作者" width="180"> </el-table-column>
                <el-table-column   label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="primary" @click="release(scope.$index, scope.row)">发布</el-button>
                        <el-button type="primary" @click="del(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
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

    </div>
</template>


<script>

    export default {
        data() {
            return {
                seachValue:"", //搜索
                seachAllValue:"", //全文搜索
                tableData:[
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞"},
                    {checked:true,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:true,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"图文",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/2.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                    {checked:false,imgPath:"./static/images/logo.png",title:"设计界的法拉利是如何产生的",state:"视频",name:"张飞"},
                ],
                pageSize:10, //当前页面
                currentPage:1,  //跳转页面
                total:0,   //分页总数量
            }
        },

        methods: {
            del(i,v){//删除
              console.log(i)
              console.log(v)
            },
            edit(i,v){//编辑
                console.log(i)
                console.log(v)
            },
            release(i,v){//发布
                console.log(i)
                console.log(v)
            },
            reverse_election(){//反选

            },
            all_election(){//全选

            },
            batch_release(){//批量发布

            },
            seachClick(){//搜索

            },
            AllseachClick(){//全文搜索

            },
            getList(){ // 获取数据
                console.log(1)
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
        }
    };
</script>

<style scoped lang="scss">
    img{
        display: block;
        width: 60px;
        height: 40px;
    }
 .drafts_header{
     width: 100%;
     height: 100px;
     background: #fff;
     padding: 20px;
     box-sizing: border-box;
     .el-input{
         width: 300px;
         line-height: 60px;
     }
     .el-button{
         margin: 0 20px;
     }
 }
    .drafts_message{
        width: 100%;
        height: 60px;
        line-height: 60px;
        span{
            margin-right: 30px;
        }
    }
    .drafts_table{
        max-height: 900px;
    }
</style>
