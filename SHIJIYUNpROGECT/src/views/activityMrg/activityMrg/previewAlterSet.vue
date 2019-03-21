<template>
    <div class="previewAlterSetBox">
            <div class="settingBox">
                <ul>
                    <li v-for="(item,index) in title" :class="{active:index===titleIndex}" @click="titleClick(index)">{{item}}</li>
                </ul>
                <div v-if="titleIndex === 0" class="titleIndex0">
                    <div class="titleIndex_tltle">
                        <h5>标题</h5>
                        <el-input type="textarea" v-model="signup.title"placeholder="请输入标题"></el-input>
                    </div>
                    <div class="titleIndex_header">
                        <p>图片（1张）</p>
                        <div class="upImg2">
                            <input type="file" @change="upDataImg($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                        </div>

                    </div>
                    <div class="titleIndex_bottom">
                        <h5>描述</h5>
                        <el-input type="textarea" rows="4" v-model="signup.describe"placeholder="请输入描述"></el-input>
                    </div>
                    <div class="titleIndex_preview">
                        <span @click="preview(name='标准型')" title="点击预览效果">预览</span>
                    </div>
                </div>
                <!------------------------------->
                <div v-if="titleIndex === 1" class="titleIndex1">
                    <p>图片（1张）</p>
                    <div class="upImg1">
                        <input type="file" @change="upDataImg($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </div>
                    <p><span @click="preview(name='海报型')" title="点击预览效果">预览</span></p>
                </div>


                <el-dialog :append-to-body="true" class="dialog" title="预览" :visible.sync="previewShow" :close-on-click-modal="true" width="900px" top="10%">
                    <previewAlter :previewBigShow="previewBigShow"></previewAlter>
                </el-dialog>
            </div>
    </div>

</template>
<script>
    import previewAlter from  "./alter/previewAlter.vue"
            //报名独立页查询
    import {signupPageLayoutfindOne} from '../../../api/activityMrg/activityMrg'
    export default {
        components:{
            previewAlter
        },
        data() {
            return {
                previewBigShow:"",
                previewShow:false, //预览显示
                titleIndex:0,
                title:['标准型','海报型'],
                signup:{
                    title:"",  // 标题
                    describe:'',  // 描述
                }
            }

        },
        methods: {
            preview(v){ //预览
                console.log(v)
                this.previewBigShow = v;
                this.previewShow = true;
            },
            titleClick(index){ //获取下标
                this.titleIndex = index;
            },
            upDataImg(event,index){
                let filesObj=event.target.files[0];
                let filesName=event.target.files[0].name;
                let img=event.target.parentElement;
//                let url=this.$apiupdate+"/upload/kindeditorjson";       上传的接口
                let param = new FormData(); // 创建form对象
                param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
//                this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
//                    let data=res.data;
//                    if(data.error==0){
//                        img.style.background= "url("+data.url+") center center no-repeat";
//                        img.style.backgroundSize= "100% 100%";
//                        this.upImg=data.url;   //参数是ajax返回的图片地址
//                    }else{
//                        this.$queryFun.successAlert.call(this,"上传失败");
//                    }
//                });
            },
        },


        mounted() {
        },
        created(){
        }
    }
</script>
<style lang="scss">
    .previewAlterSetBox{
        width: 100%;
        height:700px ;
        background: #ffffff;
        padding: 30px;
    .settingBox{
        width: 500px;
        border: 1px solid #ccc;
        padding: 30px;
        box-sizing: border-box;
        height: 100%;
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
                    background:url("../../../assets/images/addImg.png") center no-repeat ;
                    cursor: pointer;
                    position: relative;
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
                background:url("../../../assets/images/addImg.png") center no-repeat ;
                cursor: pointer;
                position: relative;
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
    }
</style>
<style lang="scss" scoped="">

</style>

