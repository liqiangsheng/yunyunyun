<template>
    <!--图播管理-->
    <div id="addPicture">
        <div class="addPicturetltle">
            基本信息
        </div>
        <div class="title">
            <div class="titleItem">
                <div class="titleItem_title">标题 <span class="styleRed">*</span></div>
                <div class="titleItem_title1">
                    <div class="div">
                        <div class="span">中</div>
                        <span>{{objData.name}}</span>
                    </div>
                    <div class="div">
                        <div class="span">英</div>
                        <span>{{objData.engName}}</span>

                    </div>
                </div>
            </div>
            <div class="titleItem">
                <div class="titleItem_title">副标题 <span class="styleRed">*</span></div>
                <div class="titleItem_title1">
                    <div class="div">
                        <div class="span">中</div>
                        <span>{{objData.subhead}}</span>
                    </div>
                    <div class="div">
                        <div class="span">英</div>
                        <span>{{objData.subEngHead}}</span>

                    </div>
                </div>
            </div>
            <div class="titleItem">
                <div class="titleItem_title">活动日期<span class="styleRed">*</span></div>
                <div class="titleItem_title1">
                    <span>{{$moment(objData.activityTime).format("YYYY-MM-DD")}}</span>
                </div>
            </div>
        </div>
        <!--首页图-->
        <div class="homePicture boxSizing clearfix">
            <div class="homePicture_title floatLeft">首页图 <span class="styleRed">*</span></div>
            <div class="img relative floatLeft border1px">
                <img :src="objData.homePageUrl.imageUrl" alt="">
            </div>
        </div>
        <!--轮播图-->
        <div class="homePicture boxSizing clearfix">
            <div class="homePicture_title">轮播图 <span class="styleRed">*</span> </div>
            <div class="ul relative clearfix">
                <div class="img relative floatLeft border1px" v-for="(item,index) in objData.bannerList">
                    <img :src="item.imageUrl" alt="">
                </div>
            </div>

        </div>
        <!--图片上传-->
        <div class="addPicturetltle">
            图片上传
        </div>
        <div class="Picturebutton boxSizing">
            <div class="homePicture_title floatLeft">原图 <span class="styleRed">*</span></div>
            <el-button type="primary" plain @click="hotLookShow=!hotLookShow">查看热门图片</el-button>
        </div>
        <!--图片 展示-->
        <div class="boxSizing originPicture clearfix overflowHidden">
            <div class="dragArea">
                <div v-for="(item, index) in allpictrue" :key="index" class="list-complete-item clearfix border1px" :class="{active:item.sortChecked==true}">
                    <div class="dragItem relative">
                        <div class="dragTop relative"
                             @dblclick="dbclick(item,index)" >
                            <img :src="item.imageUrl" alt="">
                        </div>

                        <div class="dragFoot boxSizing">
                            <span>{{index+1}}</span>
                            <span v-if="item.hot==true">热</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--热门图片-->
        <el-dialog :append-to-body="true" class="dialog" title="热门图片" :visible.sync="hotLookShow" :close-on-click-modal="true" width="800px" top="5%">
            <PictureData v-if="hotLookShow" :hotPictureData="hotPicture" @hotData="hotData"></PictureData>
        </el-dialog>
    </div>
</template>


<script>
    import {activityImagesBookfindOne,activityImagesList} from '../../../api/pictureBroadcastManagement/pictureBroadcastApi'
    import PictureData from './pictrueData.vue'
    let temp = null;  //  在这里定义time 为null
    export default {
        components:{
          PictureData
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
                    homePageUrl:{activityImageType:'1',name:'',engName:'',alias:'',imageUrl:'',sort:null,hot:false},//首页图
                    bannerList:[{activityImageType:'3',name:'',engName:'',alias:'',imageUrl:'',sort:null,hot:false}],//轮播图片
                },
                allpictrue:[], //原图
                hotPicture:[],
                qiniutoken:'', //囚牛的token
                jindu:0,//上传的进度
                allSize:0,//上传的尺寸
                loaded:0,//上传的尺寸
            }
        },
        computed:{

        },
        created(){
            this.query(this.$router.history.current.query.id);
        },
        methods: {

           query(id){
               activityImagesBookfindOne(id).then(res=>{
                    console.log(res,"3sdaslook")
                    if(res.data.status==true){
                        this.objData={
                                pubStatus: res.data.data.pubStatus,//草稿
                                activityTime:res.data.data.bookTime,//活动时间
                                name:res.data.data.name,//主标题中
                                engName:res.data.data.engName,//主标题英
                                subhead:res.data.data.subhead,//主标题中
                                subEngHead:res.data.data.subEngHead,//主标题英
                                homePageUrl:res.data.data.advertiseImageList[0],//首页图
                                bannerList:res.data.data.bannerImageList,//轮播图片
                        }
                    }else{
                        this.$message({
                            message:res.data.message,
                            type: 'warning'
                        });
                    }
               })
               let that = this;
               activityImagesList({bookId:id,s:0}).then(res1=>{

                   if(res1.data.status==true){
                       res1.data.data.map((item,index)=>{
                           if(item.activityImageType=='4'){
                               that.allpictrue.push(item); //原图
                           }
                           if(item.hot==true){
                               that.hotPicture.push(item)   //热图
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
            hotData(v){//热门图片的数据
                this.hotLookShow = false;
            },

            dbclick(item,index){//双击事件 图片放大窗口打开
                clearTimeout(temp);  //首先清除计时器
                window.open(item.imageUrl, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')
            },


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
                        span{
                            line-height: 50px;
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
