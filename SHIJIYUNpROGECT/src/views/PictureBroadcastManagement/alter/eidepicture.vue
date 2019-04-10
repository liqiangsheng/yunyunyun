<template>
    <!--图播管理-->
    <div id="addPicture">
        <div class="addPicturetltle">
            基本信息
            <el-button type="primary" plain @click="qiniuToken">重新获取七牛token</el-button>
        </div>
        <div class="title">
            <div class="titleItem">
                <div class="titleItem_title">标题 <span class="styleRed">*</span></div>
                <div class="titleItem_title1">
                    <div class="div">
                        <div class="span">中</div>
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="objData.name">
                        </el-input>
                        <span>还可以输入{{regValue1}}字节</span>
                    </div>
                    <div class="div">
                        <div class="span">英</div>
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="objData.engName">
                        </el-input>
                        <span>还可以输入{{regValue2}}字节</span>
                    </div>
                </div>
                <div class="titleItem_title2">
                    （允许100字节长度的文字输入）
                </div>
            </div>
            <div class="titleItem">
                <div class="titleItem_title">副标题 <span class="styleRed">*</span></div>
                <div class="titleItem_title1">
                    <div class="div">
                        <div class="span">中</div>
                        <el-input
                                width="300"
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="objData.subhead">
                        </el-input>
                        <span>还可以输入{{regValue3}}字节</span>
                    </div>
                    <div class="div">
                        <div class="span">英</div>
                        <el-input
                                width="300"
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="objData.subEngHead">
                        </el-input>
                        <span>还可以输入{{regValue4}}字节</span>
                    </div>
                </div>
                <div class="titleItem_title2">
                    （允许100字节长度的文字输入）
                </div>
            </div>
            <div class="titleItem">
                <div class="titleItem_title">活动日期<span class="styleRed">*</span></div>
                <div class="titleItem_title1">
                    <el-date-picker
                            v-model="objData.activityTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <!--首页图-->
        <div class="homePicture boxSizing clearfix">
            <div class="homePicture_title floatLeft">首页图 <span class="styleRed">*</span></div>
            <div class="img relative floatLeft border1px">
                <img :src="objData.homePageUrl.imageUrl" alt="">
                <input type="file" multiple="multiple" class="file-input absolute cursor" accept="image/png,image/jpeg,image/jpg" @change="homePageUrlChange"/>
            </div>
        </div>
        <!--轮播图-->
        <div class="homePicture boxSizing clearfix">
            <div class="homePicture_title">轮播图<span class="styleRed">*</span> <br>(最多上传5张)</div>
            <div class="ul relative clearfix">
                <div class="img relative floatLeft border1px" v-for="(item,index) in objData.bannerList">
                    <img :src="item.imageUrl" alt="">
                    <input type="file" multiple="multiple" class="file-input absolute cursor" accept="image/png,image/jpeg,image/jpg" @change="bannerUrlChange($event,index)"/>
                </div>
            </div>

        </div>
        <!--图片上传-->
        <div class="addPicturetltle">
            图片上传
        </div>
        <div class="Picturebutton boxSizing">
            <div class="homePicture_title floatLeft">原图 <span class="styleRed">*</span></div>
            <div class="Picture_div relative floatLeft">
                <el-button type="primary" plain >批量上传图片</el-button>
                <input type="file" multiple="multiple" class="file-input absolute" accept="image/png,image/jpeg,image/jpg" @change="inputChange"/>
            </div>
            <div class="Picture_jindu floatLeft"> 上传进度 <span class="styleRed">{{jindu}}</span>%</div>
            <el-button type="primary" plain @click="hotLookShow=!hotLookShow">查看热门图片</el-button>
            <div class="floatRigth Picture_right">
                <el-button type="primary" plain  @click="roofPlacement">批量置顶</el-button>
            </div>
            <!--<input class="file-input" id="upload_file" type="file" name="image" accept=“image/*” @change="inputChange"/>-->
        </div>
        <!--图片 展示-->
        <div class="boxSizing originPicture clearfix overflowHidden">
            <draggable :list="objData.allpictrue" :options="{sort: true}"
                       @end="end"
                       class="dragArea">
                <div v-for="(item, index) in objData.allpictrue" :key="index" class="list-complete-item clearfix border1px" :class="{active:item.sortChecked==true}">
                    <div class="dragItem relative">
                        <div class="dragTop relative"
                             @click="singleClick(item,index)"
                             @dblclick="dbclick(item,index)" >
                            <img :src="item.imageUrl" alt="">
                        </div>

                        <div class="dragFoot boxSizing">
                            <span>{{index+1}}</span>
                            <span> <el-checkbox v-model="item.hot" class="floatRigth" @change="hotPicture(item.hot,item,index)"></el-checkbox></span>

                        </div>
                        <div class="absolute againBox cursor">
                            重新上传
                            <input type="file" multiple="multiple" class="file-input absolute cursor" accept="image/png,image/jpeg,image/jpg" @change="againUpdata($event,index)"/>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
        <!--提交按钮-->
        <div class="preservation boxSizing">
            <el-button type="primary" plain  @click="preservation('保存')">保存</el-button>
            <el-button type="primary" plain  @click="roofPlacement('发布')">发布</el-button>
        </div>
        <!--热门图片-->
        <el-dialog :append-to-body="true" class="dialog" title="热门图片" :visible.sync="hotLookShow" :close-on-click-modal="true" width="800px" top="5%">
            <PictureData v-if="hotLookShow" :hotPictureData="objData.hotPicture" @hotData="hotData"></PictureData>
        </el-dialog>
    </div>
</template>


<script>
             //7牛token                 //新增图播               //查询图播               //相册
    import {sysAttachmentUpPublicToken,activityImagesBookupdate,activityImagesBookfindOne,activityImagesList} from '../../../api/pictureBroadcastManagement/pictureBroadcastApi'
    import {updataImage} from '../../../utils/common' //上传图片
    import PictureData from './pictrueData.vue'
    import draggable from 'vuedraggable' //拖拽插件
    let temp = null;  //  在这里定义time 为null
    export default {
        components:{
            draggable,PictureData
        },
        data() {
            return {
                hotLookShow:false, //热门图片的窗口
                objData:{
                    pubStatus:false,//草稿
                    activityTime:'',//活动时间
                    name:'',//主标题中
                    engName:'',//主标题英
                    subhead:'',//主标题中
                    subEngHead:'',//主标题英
                    homePageUrl:{activityImageType:'1',name:'',engName:'',alias:'',imageUrl:'',sort:null,hot:false,id:''},//首页图
                    bannerList:[{activityImageType:'3',name:'',engName:'',alias:'',imageUrl:'',sort:null,hot:false,id:''}],//轮播图片
                    allpictrue:[], //原图
                    hotPicture:[],
                },
                qiniutoken:'', //囚牛的token
                jindu:0,//上传的进度
                allSize:0,//上传的尺寸
                loaded:0,//上传的尺寸
            }
        },
        computed:{
            regValue1:function () {
                return 100-this.objData.name.replace(/[^\x00-\xff]/g,"**").length;
            },
            regValue2:function () {
                return 100-this.objData.engName.replace(/[^\x00-\xff]/g,"**").length;
            },
            regValue3:function () {
                return 100-this.objData.subhead.replace(/[^\x00-\xff]/g,"**").length;
            },
            regValue4:function () {
                return 100-this.objData.subEngHead.replace(/[^\x00-\xff]/g,"**").length;
            }
        },
        created(){
            this.qiniuToken();//初始化七牛token
            this.query(this.$router.history.current.query.id);
        },
        methods: {
            query(id){
                activityImagesBookfindOne(id).then(res=>{
                    if(res.data.status==true){
                        this.objData.pubStatus = res.data.data.pubStatus,//草稿
                        this.objData.activityTime = res.data.data.bookTime;
                        this.objData.name = res.data.data.name;
                        this.objData.engName = res.data.data.engName;
                        this.objData.subhead = res.data.data.subhead;
                        this.objData.subEngHead = res.data.data.subEngHead;
                        this.objData.homePageUrl = !!res.data.data.advertiseImageList?res.data.data.advertiseImageList[0]:{imageUrl:''};
                        this.objData.bannerList = !!res.data.data.bannerImageList?res.data.data.bannerImageList:[];
                        if(!!res.data.data.bannerImageList&&res.data.data.bannerImageList.length<=5){
                            this.objData.bannerList.push({activityImageType:'3',name:'',engName:'',alias:'',imageUrl:'',sort:null,hot:false,id:''})
                        }
                    }else{
                        this.$message({
                            message:res.data.message,
                            type: 'warning'
                        });
                    }
                })
                activityImagesList({bookId:id,s:0}).then(res1=>{
                    if(res1.data.status==true){
                        res1.data.data.map((item,index)=>{
                            item.sortChecked=false;
                            if(item.hot==true){
                                this.objData.hotPicture.push(item)   //热图
                            }
                            if(item.activityImageType=='4'){
                                this.objData.allpictrue.push(item); //原图
                            }
                        })
                    }else{
                        this.$message({
                            message:res1.data.message,
                            type: 'warning'
                        });
                    }
                })
            },
            regFun(){ //验证填写的内容[^\x00-\xff]
                let that = this;
                console.log(that.regValue1,"that.regValue1")
                if(that.regValue1==100||that.regValue1<0){
                    return that.$message({
                        message:"中文的主标题不能为空，长度不能大于100字节",
                        type: 'warning'
                    })
                }
                if(that.regValue2==100||that.regValue2<0){
                    return  that.$message({
                        message:"英文的主标题不能为空，长度不能大于100字节",
                        type: 'warning'
                    });
                }
                if(that.regValue3==100||that.regValue3<0){
                    return that.$message({
                        message:"中文的副标题不能为空，长度不能大于100字节",
                        type: 'warning'
                    });
                }
                if(that.regValue4==100||that.regValue4<0){
                    return that.$message({
                        message:"英文的副标题不能为空，长度不能大于100字节",
                        type: 'warning'
                    });
                }
                that.objData.bookTime =that.$moment(that.objData.activityTime).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":that.$moment(that.objData.activityTime).format('YYYY-MM-DD HH:mm:ss');
                if(!that.objData.bookTime){
                    return that.$message({
                        message:"活动时间不能为空",
                        type: 'warning'
                    });
                }
                if(!that.objData.homePageUrl.imageUrl){
                    return that.$message({
                        message:"首页图片不能为空",
                        type: 'warning'
                    });
                }
                if(that.objData.bannerList[0].imageUrl==''){
                    return that.$message({
                        message:"轮播图片不能少于一张图片",
                        type: 'warning'
                    });
                }
                if(!that.objData.allpictrue){
                    return that.$message({
                        message:"原图片不能不能少于一张图片",
                        type: 'warning'
                    });
                }
            },
            hotData(v){//热门图片的数据
                this.objData.hotPicture = v;
                this.hotLookShow = false;
                console.log(this.objData.hotPicture,"this.objData.hotPicture")
            },
            preservation(v){//保存 发布
                this.regFun();
                this.objData.bannerList.forEach((item,index)=>{
                    if(item.imageUrl == ""){
                        this.objData.bannerList.splice(index,1)
                    }
                })
                console.log(this.objData,"99999")
                this.objData.pubStatus =v=='保存'?false:true;
                this.objData.allpictrue.forEach((item,index)=>{
                    item.sort = index;
                })
                this.objData.bookImageList = [this.objData.homePageUrl,...this.objData.bannerList,...this.objData.allpictrue];
                let data= {//后台需要的参数
                    id: this.$router.history.current.query.id,
                    pubStatus: this.objData.pubStatus,
                    name: this.objData.name,
                    activityTime:'',//活动时间
                    engName: this.objData.engName,
                    subhead: this.objData.subhead,
                    subEngHead: this.objData.subEngHead,
                    bookTime: this.objData.bookTime,
                    bookImageList: this.objData.bookImageList
                }
                activityImagesBookupdate(data).then(res=>{
                    if(res.data.status==true){
                        if(v=='保存'){ //false
                            this.$message({
                                message:'保存成功',
                                type: 'success'
                            });
                        }else if(v=='发布'){ //true
                            this.$message({
                                message:'发布成功',
                                type: 'success'
                            });
                        }
                    }else{
                        this.$message({
                            message:res.data.message,
                            type: 'warning'
                        });
                    }
                })

            },
            hotPicture(bool,item,index){ //热门图片
                if(bool==true){
                    if(this.objData.hotPicture.length>30){
                        that.$message({
                            message:"热门图片只能设置30张",
                            type: 'warning'
                        });
                    }else{
                        this.objData.hotPicture.push(item)
                    }

                }else{
                    this.objData.hotPicture.forEach((item1,index1)=>{
                        if(item.id == item1.id){
                            this.objData.hotPicture.splice(index1,1)
                        }
                    })
                }
                console.log(this.objData.hotPicture,"this.objData.hotPicture")
            },
            roofPlacement(){//批量置顶
                let arr1 = this.objData.allpictrue;
                let arr2 = arr1.map(function(item,index,arr1){
                    if(item.sortChecked==true) return item;
                })
                let arr3 = arr1.map(function(item,index,arr1){
                    if(item.sortChecked==false) return item;
                })
                let arr4 = [];
                arr2.forEach((item,index)=>{
                    if(!!item) arr4.push(item)
                })
                arr3.forEach((item,index)=>{
                    if(!!item) arr4.push(item)
                })
                this.objData.allpictrue = arr4;
                this.objData.allpictrue.splice(this.objData.allpictrue.length,0);
                this.objData.allpictrue.forEach((item,index)=>{
                    item.sortChecked = false;
                })
            },
            againUpdata(event,index){//点击重新上传
                event.cancelBubble=true;
                console.log(event,'9999')
                let that = this;
                updataImage(event,'TBGL',that).then(res=>{
                    that.objData.allpictrue[index].imageUrl = res;
                    that.$set( that.objData.allpictrue, that.objData.allpictrue[index].imageUrl,res);
                })
            },
            singleClick(item,index){//单击事件
                let that = this;
                clearTimeout(temp);  //首先清除计时器
                temp = setTimeout(() => {
                    console.log('我是单击')
                    item.sortChecked = !item.sortChecked;
                }, 300);   //大概时间300ms
            },
            dbclick(item,index){//双击事件 图片放大窗口打开
                clearTimeout(temp);  //首先清除计时器
                window.open(item.imageUrl, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')
            },
            end(){//拖拽结束

            },
            bannerUrlChange(event,index,item){//banner图片上传
                let that = this;
                updataImage(event,'TBGLBANNER',that).then(res=>{
                    that.objData.bannerList[index].imageUrl = res;
                    that.$set( that.objData.bannerList, that.objData.bannerList[index],res);
                    if((index+1)==that.objData.bannerList.length){
                        if(that.objData.bannerList.length<5){
                            that.objData.bannerList.push({activityImageType:'3',name:'',engName:'',alias:'',imageUrl:'',sort:null,hot:false,id:''});
                        }
                    }
                })
            },
            homePageUrlChange(event,item){ //首页图*上传图片
                updataImage(event,'TBGLHOME',this).then(res=>{
                    this.objData.homePageUrl.imageUrl = res;
                })

            },
            inputChange(event){
                let mydate = new Date()
                let url1="https://pub.qinius.butongtech.com";
                var uuid = "TBGL"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
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
                                    type: 'warning'
                                });
                                // ...
                            },
                            complete(res){
                                let ImageUrl="https://pub.qinius.butongtech.com/"+ res.key
//                                that.objData.allpictrue.push({imageUrl:ImageUrl,hotChecked:false,sortChecked:false,sort:'0',id:'0'});
                                that.objData.allpictrue.push({activityImageType:'4',name:'',engName:'',alias:'',imageUrl:ImageUrl,sort:0,hot:false,sortChecked:false,id:''});
//                                that.objData.allpictrue.forEach((item,index)=>{
//                                    item.sort = index;
//                                })
                                console.log( that.objData.allpictrue,"图片上传完成")

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
                                type: 'warning'
                            });
                            // ...
                        },
                        complete(res){
                            console.log(res,"单张完成");
                            let ImageUrl="https://pub.qinius.butongtech.com/"+ res.key
                            that.objData.allpictrue.push({activityImageType:'4',name:'',engName:'',alias:'',imageUrl:ImageUrl,sort:0,hot:false,sortChecked:false,id:''});
//                            that.objData.allpictrue.forEach((item,index)=>{
//                                item.sort = index;
//                            })
                            console.log( that.objData.allpictrue,"图片上传完成")
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
    #addPicture{
        width: 100%;
        background: #ffffff;
        .addPicturetltle{
            width: 100%;
            height: 100px;
            background: #cccccc;
            font-size: 18px;
            font-weight: 900;
            line-height: 100px;
            padding: 0 30px;
        }
        .title{
            width: 100%;
            padding: 20px;
            .titleItem{
                width: 100%;
                padding-bottom: 20px;
                overflow: hidden;
                .titleItem_title{
                    float: left;
                    width: 100px;

                }
                .titleItem_title1{
                    float: left;
                    .div{
                        margin-bottom: 10px;
                        overflow: hidden;
                        .span{
                            width: 50px;
                            line-height: 50px;
                            float: left;
                        }
                        .el-textarea{
                            float: left;
                            width: 400px;
                            margin-right: 20px;
                        }
                        >span{
                            line-height: 100px;
                            display: inline-block;
                            margin-right: 20px;
                        }
                    }


                }
                .titleItem_title2{
                    float: left;
                    line-height: 100px;
                }
            }
        }
        .homePicture{
            width: 100%;
            border-top: 2px solid #cccccc;
            padding: 20px;
            .homePicture_title{
                width: 100px;
            }
            .ul{
                width: 100%;
                margin-top: 20px;
            }
            .img{
                width: 300px;
                height: 200px;
                margin-right: 20px;
                margin-top: 20px;
                img{
                    display: block;
                    width: 300px;
                    height: 200px;
                }
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }
        }
        .Picturebutton{
            width: 100%;
            height: 40px;
            padding: 20px;
            .Picture_right{
                margin-right: 50px;
            }
            .homePicture_title{
                width: 100px;
            }
            .Picture_div{
                width: 126px;
                height: 40px;
                input{
                    width: 126px;
                    height: 40px;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }
            .floatLeft{
                width: 200px;
                line-height: 40px;
            }
        }
        .originPicture{
            width: 100%;
            background: #ffffff;
            padding: 20px;
            .dragArea{
                width: 100%;
                .active{
                    border: 1px solid #0e73bc;
                }
                .list-complete-item{
                    width: 120px;
                    height: 150px;
                    float: left;
                    margin: 10px 0 0 10px;
                    .dragItem:hover{
                        .againBox{
                            display: block;
                        }
                    }
                    .dragItem{
                        width: 100%;
                        .dragTop{
                            width: 100%;
                            height: 100px;
                            img{
                                width: 100%;
                                height: 100px;
                                display: block;
                            }
                        }
                        .againBox{
                            width: 55px;
                            height: 16px;
                            font-size: 10px;
                            right: 0;
                            top: 0;
                            display: none;
                            z-index: 1;
                            input{
                                width: 100%;
                                height: 16px;
                                left: 0;
                                top:0;
                                z-index: 1;
                                opacity: 0;
                            }
                        }

                        .dragFoot{
                            width: 100%;
                            height: 30px;
                            margin-top: 20px;
                            display: flex;
                            span{
                                flex: 1;
                                padding: 0 10px;
                            }
                        }

                    }
                }
            }
        }
        .preservation{
            width: 100%;
            height: 100px;
            background: #cccccc;
            padding: 30px 20px 20px 30%;
        }

    }
</style>
