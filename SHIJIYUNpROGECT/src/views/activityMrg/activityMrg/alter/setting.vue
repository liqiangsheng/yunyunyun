<template>
    <div class="settingBox">
       <ul>
           <li v-for="(item,index) in title" :class="{active:index===titleIndex}" @click="titleClick(index)">{{item}}</li>
       </ul>
       <div v-if="titleIndex === 0" class="titleIndex0">
           <div class="titleIndex_tltle">
               <h5>标题</h5>
               <el-input type="textarea" v-model="signup.title" placeholder="请输入标题"></el-input>
           </div>
           <div class="titleIndex_header">
               <p>图片（1张）</p>
               <div class="upImg2">
                   <img :src="backgroundUrl" alt="">
                   <input type="file" @change="upDataImg($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
               </div>

           </div>
           <div class="titleIndex_bottom">
               <h5>描述</h5>
               <el-input type="textarea" rows="4" v-model="signup.describe"placeholder="请输入描述"></el-input>
           </div>
           <div class="titleIndex_preview">
               <span @click="preview(name='标准型')" title="点击预览效果">预览</span>
               <span @click="addClick(name='新增')" title="点击预览效果" v-if="!noteModeState">新增</span>
               <span @click="addClick(name='修改')" title="点击预览效果" v-else>修改</span>
           </div>
       </div>
        <!------------------------------->
        <div v-if="titleIndex === 1" class="titleIndex1">
           <p>图片（1张）</p>
            <div class="upImg1">
                <img :src="backgroundUrl1" alt="">
                <input type="file" @change="upDataImg1($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            </div>
            <p>
                <span @click="preview(name='海报型')" title="点击预览效果">预览</span>
                <span @click="addClick1(name='新增')" title="点击预览效果" v-if="!noteModeState">新增</span>
                <span @click="addClick1(name='修改')" title="点击预览效果" v-else>修改</span>
            </p>
        </div>


        <el-dialog :append-to-body="true" class="dialog" title="预览" :visible.sync="previewShow" :close-on-click-modal="true" width="900px" top="10%">
            <previewAlter v-if="previewShow" :previewBigShow="previewBigShow" :signup="signup" :backgroundUrl="backgroundUrl" :backgroundUrl1="backgroundUrl1"></previewAlter>
        </el-dialog>
    </div>


</template>
<script>
    import previewAlter from  "./previewAlter.vue"
              //七牛Token               //查询                  //新增报名独立也       //独立页修改
    import {sysAttachmentUpPublicToken,signupPageLayoutfindOne,signupPageLayoutinsert,signupPageLayoutupdata} from '../../../../api/activityMrg/activityMrg'
    export default {
        components:{
            previewAlter
        },
        props:['shortMessageaItem'],//
        data() {
            return {
                noteModeState:false, //根据状态显示
                qiniutoken:'', //七牛token
                previewBigShow:"",
                previewShow:false, //预览显示
                backgroundUrl:'',//背景
                backgroundUrl1:'',//海报背景
                titleIndex:0,
                title:['标准型','海报型'],
                signup:{
                    title:"",  // 标题
                    describe:'',  // 描述
                    id:'', //独立页id
                }
            }

        },
        methods: {
            query(){//
                signupPageLayoutfindOne(this.shortMessageaItem.id).then(res=>{
                    console.log(res.data.data,"res.data.data")
                     if(res.data.status==true){
                         if(this.shortMessageaItem.noteMode==1){
                             this.titleIndex = 1;
                             if(!!res.data.data){
                                 this.noteModeState = true;
                                 this.backgroundUrl1=res.data.data.url//海报背景
                                 this.signup={
                                     id:res.data.data.id
                                 }

                             }else{
                                 this.noteModeState = false;
                                 this.backgroundUrl1='';//海报背景
                             }
                         }else{
                             this.titleIndex = 0;
                             if(!!res.data.data){
                                 this.noteModeState = true;
                                 this.backgroundUrl = res.data.data.url;
                                 this.signup={
                                     title:res.data.data.title,  // 标题
                                     describe:res.data.data.description,  // 描述
                                     id:res.data.data.id
                                 }
                             }else {
                                 this.noteModeState = false;
                                 this.backgroundUrl = '';
                                 this.signup={
                                     title:'',  // 标题
                                     describe:'',  // 描述
                                     id:'',
                                 }
                             }
                         }
                     }else{
                         this.$message({
                             message:res.data.message,
                             type: 'warning'
                         });
                     }
                })
            },
            addClick1(v){//海报的新增修改
                if(!this.backgroundUrl1) return this.$message({ message:'图片不能为空',type: 'warning' });

                if(v=='新增'){
                    let obj = {
                        activityId:this.shortMessageaItem.id,
                        url:this.backgroundUrl1,
                        noteMode:1
                    }
                    signupPageLayoutinsert(obj).then(res=>{
                        if(res.data.status==true){
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$emit('signupPageLayoutinsert',false)
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                    })
                }else if(v=='修改'){
                    let obj = {
                        activityId:this.shortMessageaItem.id,
                        id:this.signup.id,
                        url:this.backgroundUrl1,
                        noteMode:1
                    }
                    signupPageLayoutupdata(obj).then(res=>{
                        if(res.data.status==true){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('signupPageLayoutinsert',false)
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                    })
                }
            },
            addClick(v){//标准的新增修改
                if(!this.signup.title) return this.$message({ message:'标题不能为空',type: 'warning' });
                if(!this.backgroundUrl) return this.$message({ message:'图片不能为空',type: 'warning' });

                if(v=='新增'){
                    let obj = {
                        activityId:this.shortMessageaItem.id,
                        description:this.signup.describe,
                        title:this.signup.title,
                        url:this.backgroundUrl,
                        noteMode:0
                    }
                    signupPageLayoutinsert(obj).then(res=>{
                        if(res.data.status==true){
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$emit('signupPageLayoutinsert',false)
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                    })
                }else if(v=='修改'){
                    let obj = {
                        activityId:this.shortMessageaItem.id,
                        id:this.signup.id,
                        description:this.signup.describe,
                        title:this.signup.title,
                        url:this.backgroundUrl,
                        noteMode:0
                    }
                    signupPageLayoutupdata(obj).then(res=>{
                        if(res.data.status==true){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('signupPageLayoutinsert',false)
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                    })
                }
            },
            preview(v){ //预览
               console.log(v)
                this.previewBigShow = v;
                this.previewShow = true;
            },
            titleClick(index){ //获取下标
                this.titleIndex = index;
            },
            upDataImg(event){ // 上传
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
                            that.backgroundUrl="https://pub.qinius.butongtech.com/"+ res.key;
                            that.$message({
                                message:"上传完成",
                                type: 'success'
                            });
                            // ...
                        }
                    }
                    observable.subscribe(observer)
                },
            upDataImg1(event){ // 上传
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
                        that.backgroundUrl1="https://pub.qinius.butongtech.com/"+ res.key;
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
            this.query();//初始数据
            this.qiniuToken();
            console.log(this.shortMessageaItem.noteMode,"shortMessageaItem")
        }
    }
</script>
<style lang="scss">
.settingBox{
    ul{
        display: flex;
        height: 49px;
        li{
            flex: 1;
            text-align: center;
            line-height: 49px;
            cursor: pointer;
            background: #F0F8FF;
            color: black;
        }
        li.active{
            color: #FFFFFF;
            background: #41bdc7;
        }
    }
    .titleIndex0{
        min-height: 500px;
        >.titleIndex_tltle{
            width: 100%;
            font-size: 16px;
            background: #FFFFFF;
            h5{
                font-size: 16px;
            }
        }
        >.titleIndex_header{
            width: 100%;
            >p:nth-child(1){
                font-weight: 900;
                font-size: 16px;
            }
            >.upImg2{
                width: 160px;
                height: 160px;
                border: 1px solid #41bdc7;
                border-radius:4px ;
                background:url("../../../../assets/images/addImg.png") center no-repeat ;
                cursor: pointer;
                position: relative;
                img{
                    width: 160px;
                    height: 160px;
                    display: block;
                }
                input{
                    position: absolute;
                    width:100%;
                    height: 100%;
                    right: 0;
                    top: 0;
                    opacity: 0;
                    cursor: pointer;
                }
            }
        }
        >.titleIndex_bottom{
            width: 100%;
            >h5{
                font-size: 16px;
            }
        }
        >.titleIndex_preview{
            margin-top: 20px;
            span{
                padding: 7px 12px;
                display: inline-block;
                border: 1px solid #41bdc7;
                background: #fff;
                color: #41bdc7;
                border-radius: 32px;
                float: right;
            }
            span:hover{
                background: #41bdc7;
                color: #ffffff;
                cursor: pointer;
            }
        }
    }
    .titleIndex1{
        min-height: 200px;
        >p:nth-child(1){
            font-weight: 900;
            font-size: 16px;
        }
        >p:nth-child(3){
            font-size: 16px;
            span{
                padding: 7px 12px;
                display: inline-block;
                border: 1px solid #41bdc7;
                background: #fff;
                color: #41bdc7;
                border-radius: 32px;
                float: right;
            }
            span:hover{
                background: #41bdc7;
                color: #ffffff;
                cursor: pointer;
            }
        }
        >.upImg1{
            width: 160px;
            height: 160px;
            border: 1px solid #41bdc7;
            border-radius:4px ;
            background:url("../../../../assets/images/addImg.png") center no-repeat ;
            cursor: pointer;
            position: relative;
            img{
                width: 160px;
                height: 160px;
                display: block;
            }
            input{
                position: absolute;
                width:100%;
                height: 100%;
                right: 0;
                top: 0;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
}

</style>
<style lang="scss" scoped="">

</style>

