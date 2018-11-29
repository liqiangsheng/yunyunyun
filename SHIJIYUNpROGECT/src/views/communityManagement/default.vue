<template>
    <!--通知默认设置-->
    <div class="main-box">
        <div class="defaultBox">
            <div class="defaultBox_header">
                <b>新用户注册成功后的默认通知</b>
            </div>
            <div class="defaultBox_content">
                <el-input v-model="registerValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="modify('register')">修改</el-button>
                <el-button type="primary" @click="okClick('register')">确定</el-button>
            </div>
            <div class="defaultBox_header">
                <b>删除评论后的默认通知评论者</b>
            </div>
            <div class="defaultBox_content">
                <el-input v-model="commentValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="modify('comment')">修改</el-button>
                <el-button type="primary" @click="okClick('comment')">确定</el-button>
            </div>
            <div class="defaultBox_header">
                <b>删除被举报作品，默认通知作者</b>
            </div>
            <div class="defaultBox_content">
                <el-input v-model="authorValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="modify('author')">修改</el-button>
                <el-button type="primary" @click="okClick('author')">确定</el-button>
            </div>
            <div class="defaultBox_header">
                <b>删除被举报作品，默认通知举报人</b>
            </div>
            <div class="defaultBox_content">
                <el-input v-model="rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                <el-button type="primary" @click="modify('rinformant')">修改</el-button>
                <el-button type="primary" @click="okClick('rinformant')">确定</el-button>
            </div>

        </div>

    </div>
</template>


<script>

    export default {

        data() {
            return {
                registerValue:"系统通知： 尊敬的用户您好，感谢您注册不同平台，期待精彩的开始",
                commentValue:"系统通知： 尊敬的用户你好，你所评论的“xxxxxxxxxxx...”因“敏感词汇”问题已经被删除，请注意合理、合法评论，共同维护良好的网络空间。",
                authorValue:"系统通知： 尊敬的用户你好，你所发表的“xxxxxxxxxxx...”因被用户投诉“xxxx”、“xxxx”等问题已经被删除，请注意合理、依规发表内容，共同维护良好的网络空间。",
                rinformantValue:"系统通知： 尊敬的用户你好，感谢您的举报，我们已经对相关文章进行了下架处理。",
            }
        },

        methods: {
            modify(v){//v
                 if(v==='register'){ //修改
                    this.registerValue = "";
                 }else if(v==="comment"){
                     this.commentValue = "";
                 }else if(v==="author"){
                     this.commentValue = "";
                 }else if(v==="informant"){
                     this.commentValue = "";
                 }
            },
            okClick(v){ //确定 跳后台接口
                if(v==='register'){ //修改
                    this.registerValue = "";
                }else if(v==="comment"){
                    this.commentValue = "";
                }else if(v==="author"){
                    this.commentValue = "";
                }else if(v==="informant"){
                    this.commentValue = "";
                }
            }
        }
    };
</script>

<style scoped lang="scss">
 .defaultBox{
     width: 100%;
     .defaultBox_header{
         width: 100%;
         height: 100px;
         line-height: 100px;
         background: #EEEEEE;
     }
     .defaultBox_content{
         width: 100%;
         padding: 20px;
         height: 200px;
         background: #ffffff;
         box-sizing: border-box;
         .el-textarea{
             width: 500px;
         }
     }
 }
</style>
