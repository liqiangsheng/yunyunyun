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
    console.log(this.$Request)
    Toast(this.$Request.token)
    this.token = this.$Request.token;
    let url=window.common.apiDomain+"/apis/system/sysAttachment/upPublicToken";
    console.log(url,"dsaldas")
    this.$Aiox.get(url,{header: { 'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": "bearer "+this.$Request.token}}).then(res=>{
      console.log(res,"dada")
            Toast("sfsdfsd")
//      Toast("sfsdfsd")
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
