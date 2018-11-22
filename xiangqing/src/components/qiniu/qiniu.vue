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
    this.getData(this.$Request.token);
  },
  methods:{
    PreviewImage(){

    },
    getData (token) {
     let ajax = new XMLHttpRequest();
      ajax.open('get',this.$http+'/apis/system/sysAttachment/upPublicToken');
     ajax.setRequestHeader("Content-Type","application/json");
     ajax.setRequestHeader("Accept","application/json");
     ajax.setRequestHeader("Authorization","bearer "+token);
     ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState==4 &&ajax.status==200) {
          let res= JSON.parse(ajax.responseText)
          if(res.status == true){
            console.log(res.data);//输入相应的内容
          }else{
            Toast("网络出错啦！请重试")
          }
        }
      }
    }
  }
}

</script>

<style scoped lang="less">

</style>
