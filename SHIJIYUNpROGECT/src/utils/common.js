import {sysAttachmentUpPublicToken} from '../api/pictureBroadcastManagement/pictureBroadcastApi'

/***
 * randomData上传七牛云随机图片名字，不同的上传页面传不同页面的参数，自己定义
 * event 为上传图片的点击事件自带的event
 * _this为vue
 * @param event
 * @param randomData
 * @param _this
 */
export function updataImage(event,randomData,_this) {
    let that = _this;
    let url = ''
    return new Promise((resolve,reject)=>{
        sysAttachmentUpPublicToken().then(res=>{
            if(res.data.status==true){
                let mydate = new Date()
                var uuid = randomData+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
                let file=event.target.files[0];
                var formData = new FormData();
                let observable  = qiniu.upload(file, uuid+'.jpg', res.data.data.upToken)
                let observer= {
                    next(res){
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
                        url = "https://pub.qinius.butongtech.com/"+ res.key;
                        that.$message({
                            message:"上传完成",
                            type: 'success'
                        });
                        resolve(url);
                        // ...
                    }
                }
                observable.subscribe(observer)


            }else{
                that.$message({
                    message: res.data.message,
                    type: 'warning'
                });
            }
        })
    })

}