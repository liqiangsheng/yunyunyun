<template>
  <div id="contact">
       <ul>
         <li>留下你的电话，你将可能：</li>
         <li>1）　获取优质的设计资源</li>
         <li>2）　分享、推广您的资源和品牌</li>
         <li>3）　获取优质的设计需求</li>
         <li v-if="teamName&&teamName!=''"><span style="color: #050509">对接主题</span>/　{{teamName}}</li>
         <li><span>姓　　名</span><input type="text" v-model="name"></li>
         <li><span>电话号码</span><input type="number" v-model="tel"></li>
         <li><span>电子邮箱</span><input type="text" v-model="emil"></li>
         <li>不同客服会在两个工作日内与您取得联系，请您耐心等待</li>

       </ul>
      <div @click="okClcik">确定</div>
    <div @click="NoClcik">取消</div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { proposalContactTrack } from '../../assets/js/promiseHttp'; //数据
export default {
  name: 'contact',
  data(){
    return{
      name:"",
      tel:"",
      emil:'',
      teamName:"",
    }
  },
  created() {
    document.title="填写联系方式"
    console.log(this.$router.history.current.query.teamName)
    if(this.$router.history.current.query.teamName){
      this.teamName = this.$router.history.current.query.teamName;
    }else{
      this.teamName = "";
    }
  },
  methods:{
    okClcik(){//确定
      if(!this.name){
        Toast("请填写姓名")
        return
      }
      if(!this.tel){
        Toast("请填写电话号码")
        return
      }
      if(!this.emil){
        Toast("请填写正确电子邮件")
        return
      }
      let obj={
        "email": this.emil,
        "contactName": this.name,
        "phone": this.tel,
        "contactName":this.teamName,
      }
      //数据提交成功之后回到上一页

      proposalContactTrack(obj).then(res=>{
        if(res.data.status == true){
          Toast(res.data.message)
          setTimeout(()=>{
            this.$router.go(-1);
          },1000)
        }else{
          Toast(res.data.message)
        }
      })
//      this.$router.go(-1);
    } ,
    NoClcik(){//取消
      this.$router.go(-1);
    }
  }
}

</script>

<style scoped lang="less">
  #contact{
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    ul{
      width: 100%;
      padding: 0.15rem;
      box-sizing: border-box;
      li{
        width: 100%;
        line-height: 0.38rem;
        font-size: 0.14rem;
        span{
          width: 0.8rem;
          display: inline-block;
        }
        input{
          width: 2.2rem;
          height: 0.25rem;
          outline: none;
          border: 1px solid rgba(5,5,9,0.3);
          border-radius: 0.02rem;
        }
      }
      li:last-child{
        color: rgba(5,5,9,0.3);
      }
    }
    div{
      width: 90%;
      margin: 0 auto;
      height: 0.49rem;
      border: 1px solid rgba(5,5,9,0.3);
      border-radius: 0.02rem;
      text-align: center;
      line-height: 0.49rem;
      font-size: 0.16rem;
      margin-bottom: 0.15rem;
    }
  }

</style>
