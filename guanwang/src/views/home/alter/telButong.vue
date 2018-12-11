<template>
  <div id="telButong">
    <ul>
      <li>留下你的电话，你将可能：</li>
      <li>1）　获取优质的设计资源</li>
      <li>2）　分享、推广您的资源和品牌</li>
      <li>3）　获取优质的设计需求</li>
      <li><span>姓　　名</span><el-input type="text" v-model="name" placeholder="请填写姓名"></el-input></li>
      <li><span>电话号码</span><el-input type="number" placeholder="请填写手机号" v-model="tel"></el-input></li>
      <li><span>电子邮箱</span><el-input type="text" placeholder="请填写邮箱" v-model="emil"></el-input></li>
      <li>不同客服会在两个工作日内与您取得联系，请您耐心等待</li>

    </ul>
    <el-button type="primary" @click="ok">确定</el-button>
  </div>
</template>
<script>
  import {proposalContactTrack} from "../../../assets/js/promiseHttp.js"
    export default {
        data(){
            return{
                name:"",
                tel:"",
                emil:'',
            }
        },
        created(){

        },
        methods:{
            ok(){
                if(!this.name){
                    this.$message({
                        message: '请填写姓名',
                        type: 'warning'
                    });
                    return
                }
                if(!this.tel){
                    this.$message({
                        message: '请填写电话号码',
                        type: 'warning'
                    });
                    return
                }
                if(!this.emil){
                    this.$message({
                        message: '请填写正确电子邮件',
                        type: 'warning'
                    });
                    return
                }
                let obj={
                    "email": this.emil,
                    "contactName": this.name,
                    "phone": this.tel,
                }
                proposalContactTrack(obj).then(res=>{
                    if(res.data.status == true){
                        this.$emit("GotelShow",false)
                    }else{
                        this.$message.error('网络出错啦！请重试');
                    }
                })

            }
        }
    }

</script>
<style lang="less" scoped>
#telButong{
  width: 100%;
  ul{
    width: 100%;
    padding-left: 50px;
    li{
      width: 100%;
      margin-bottom: 15px;
      .el-input{
        width: 300px;
        margin-left: 20px;
      }

    }
  }
  .el-button{
    width: 200px;
    margin-left: 35%;
    background: #3DFFFB;
    color: #000000;
    border: 0;
  }
}

</style>
