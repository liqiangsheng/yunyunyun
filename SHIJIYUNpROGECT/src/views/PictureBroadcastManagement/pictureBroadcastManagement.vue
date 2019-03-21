<template>
    <!--图播管理-->
    <div id="pictureBroadcastManagement">
        <div class="last">
            <input id="upload_file" type="file" multiple="multiple" class="file-input" accept="image/png,image/jpeg,image/jpg" @change="inputChange"/>
            <!--<input class="file-input" id="upload_file" type="file" name="image" accept=“image/*” @change="inputChange"/>-->
        </div>
        <div>
             上传进度{{jindu}}%
        </div>
    </div>
</template>


<script>
    import {sysAttachmentUpPublicToken} from '../../api/pictureBroadcastManagement/pictureBroadcastApi'
    export default {
        data() {
            return {
                qiniutoken:'', //囚牛的token
                jindu:0,//上传的进度
                allSize:0,//上传的尺寸
                loaded:0,//上传的尺寸
            }
        },
        created(){
          this.qiniuToken();//初始化七牛token

        },
        methods: {
            inputChange(event){
                console.log(event,"event")
                let arr = [];
                let mydate = new Date()
                let url1="https://pub.qinius.butongtech.com";
                var uuid = "btkjHTLQS"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
                let that= this;
                let config = {
                    useCdnDomain: true,
             };
                if(event.target.files.length>1){ //七牛云多图上传
                    for(let i=0;i<event.target.files.length;i++){
                        let file= event.target.files[i]
                        let observable  = qiniu.upload(file, uuid+i+'.jpg', that.qiniutoken,config)
                        let observer= {
                            next(res){
                                console.log(res,"res")
                                that.jindu = parseInt(res.total.percent);
                                that.allSize = (res.total.size/1000).toFixed(2);
                                that.loaded = (res.total.loaded/1000).toFixed(2);
//                                if(res.total.size==res.total.loaded&&res.total.percent==100){
//                                    that.$message({
//                                        message:"上传完成",
//                                        type: 'success'
//                                    });
//                                }
                                // ...
                            },
                            error(err){
                                that.$message({
                                    message:'第'+i+'张图片上传失败',
                                    type: 'success'
                                });
                                // ...
                            },
                            complete(res){
                                let ImageUrl="https://pub.qinius.butongtech.com/"+ res.key
                                arr.push(ImageUrl);
                                console.log(arr,"图片上传完成")
                                that.$message({
                                    message:'第'+i+'张上传完成',
                                    type: 'success'
                                });
                                // ...
                            }
                        }
                        observable.subscribe(observer)
                    }

                }else{//七牛云单图上传
                    let file  = event.target.files[0];
                        let observable  = qiniu.upload(file, uuid+'.jpg', that.qiniutoken)
                        let observer= {
                            next(res){
//          console.log(res,"上传")
                                that.jindu = res.total.percent;
                                that.allSize = res.total.size;
                                that.loaded = res.total.loaded;
                                console.log(res,"上传。。。")
                                // ...
                            },
                            error(err){
                                that.$message({
                                    message:'图片上传失败',
                                    type: 'success'
                                });
                                // ...
                            },
                            complete(res){
                                console.log(res,"单张完成");
                                let ImageUrl="https://pub.qinius.butongtech.com/"+ res.key
                                arr.push(ImageUrl);
                                that.$message({
                                    message:"上传完成",
                                    type: 'success'
                                });
                                // ...
                            }
                        }
                    observable.subscribe(observer)
                }

            },
            qiniuToken(){
                sysAttachmentUpPublicToken().then(res=>{
                    console.log(res.data.status,"1")
                    console.log(res.data.data,"1")
                    if(res.data.status==true){
                        this.qiniutoken = res.data.data.upToken;
                    }else{
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
