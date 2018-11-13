<template>
  <div id="Qiniu">
    <div class="upload-container">
      <div class="imgBox">
        <input type="file" class="inputstyle" name="file" @change="PreviewImage"  />
        <img :src="imageUrl" alt="" class="fileImg">
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'Qiniu',
  data(){
    return{
      imageUrl:"",
      token:"",
    }
  },
  created(){
    Toast(this.$Request.token)
    let url1 = this.$http + '/apis/activity/activitySchedule/list',prams={};
    prams.activityId = "7";
    prams.orderField = "start_time";
    prams.orderString ="asc" ;
    this.$Aiox.post(url1,prams).then(res=>{
      console.log(res,"dashkdkask")
    })

    console.log(this.$Request)
    this.token = this.$Request.token;
    let url=this.$http+"/apis/system/sysAttachment/upPublicToken";
    console.log(url,"dsaldas")
    this.$Aiox.get(url,{header: { 'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "bearer " + this.token}}).then(res=>{
      console.log(res,"dada")
    })

  },
  methods:{
    PreviewImage(){

    }
  }
}

</script>

<style scoped lang="less">

</style>
