<template>
    <div class="main-box">
        <div class="box_header">
            标题与封面
        </div>
        <div class="box_content">
            <span>视频标题*</span>
            <el-input v-model="titleValue"></el-input>
        </div>

        <div class="box_content1">
            <span class="span1">原创信息*</span>
            <div class="radio">
                <el-radio v-model="radio" label="原创">原创</el-radio>
                <br>
                <el-radio v-model="radio" label="非原创">非原创</el-radio>
            </div>
            <div class="websiteNameValue">
                <el-input v-model="authorValue" placeholder="请输入作者"></el-input>
                <span class="span3">来源</span>
                <el-input v-model="WebsiteValue" placeholder="请输入来源"></el-input>
                标签
                <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions2"
                        @change="handleChange">
                </el-cascader>
            </div>
        </div>

        <div class="box_content2">
            <span class="span1">封面*</span>
            <ul class="list_page_graph">
                <li class="updata">
                    <img src="" alt="">
                    <a href="javascript:;" class="file">
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </a>
                </li>
            </ul>
            <span class="span1">海报*</span>
            <ul class="home_page_graph">
                <li class="updata">
                    <img src="" alt="">
                    <a href="javascript:;" class="file">
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </a>
                </li>
                    <el-radio v-model="poster" label="封面图片应用于海报">封面图片应用于海报</el-radio>
                    <el-radio v-model="poster" label="否">否</el-radio>
            </ul>

        </div>
        <div class="box_content3">
            <span class="span1">摘要</span>
            <div class="abstract">
                （选填，若不填写则会默认抓取正文前54个字）
            </div>

            <el-input v-model="abstractValue" type="textarea" :rows="10"></el-input>
        </div>
        <div class="textValue">视频上传</div>
        <div class="box_content4">
              <div class="video">
                  <input type="file" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf" capture="camcorder" @change="onFileChange">
              </div>
             
        </div>
        <div class="textValue">其他设置</div>
        <div class="other">
            <b>文字防复制</b>
            <br>
            <el-radio v-model="other" label="允许复制">允许复制</el-radio>
             <span>商品的文字内容允许复制，图片点击放大和长按识别二维码功能允许使用</span>
            <br>
            <el-radio v-model="other" label="不允许复制">不允许复制</el-radio>
            <span>商品的文字内容禁止复制，图片点击放大和长按识别二维码功能不允许使用</span>
        </div>
        <div class="other">
            <b>留言设置</b>
            <br>
            <el-radio v-model="other" label="所有人可留言">所有人可留言</el-radio>
            <br>
            <el-radio v-model="other" label="仅关注后可留言">仅关注后可留言</el-radio>
        </div>
        <div class="textValue">发布设置</div>
        <div class="release">
              <div class="releaseTime">
                 <span>发布时间设置*</span>
                  <br>
                  <el-radio v-model="releaseTime" label="立即发布">立即发布</el-radio>
                  <br>
                  <el-radio v-model="releaseTime" label="定时发布">定时发布</el-radio>
                  <el-date-picker
                          v-model="timeValue"
                          type="datetime"
                          placeholder="选择日期时间">
                  </el-date-picker>
                  <br>
                  <el-radio v-model="releaseTime" label="暂不发布">暂不发布</el-radio>
              </div>
            <div class="releaseSetting">
                <span>发布设置</span>
                <br>
                <el-radio v-model="releaseSetting" label="对所有用户发布">对所有用户发布</el-radio>
                <el-radio v-model="releaseSetting" label="仅对设计师发布">仅对设计师发布</el-radio>
                <el-radio v-model="releaseSetting" label="仅对设计爱好者发布">仅对设计爱好者发布</el-radio>
              </div>
        </div>
        <div class="preservation">
            <el-button type="primary" @click="preservationClick(1)">保存</el-button>
            <el-button type="primary" @click="preservationClick(2)">全文预览</el-button>
            <el-button type="primary" @click="preservationClick(3)">发布</el-button>
        </div>
        <el-dialog :append-to-body="true" class="dialog" title="预览" :visible.sync="shortMessageaShow" :close-on-click-modal="true" width="375px" top="10%">
            <shortMessageaAlter :preservationMessage="preservationMessage"></shortMessageaAlter>
        </el-dialog>
    </div>
</template>


<script>
    import shortMessageaAlter from "./alter/previewAlter.vue"
    export default {
        data() {
            return {
                preservationMessage:"2222", //预览的内容
                shortMessageaShow:false,// 预览显示消失
                other:"允许复制",//其他
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        },]
                    }]
                }],//标签
                timeValue:"", //定时发布
                releaseTime:"立即发布", //发布时间
                releaseSetting:"对所有用户发布", //发布设置
                Message:"所有人可留言", //留言
                poster:"封面图片应用于海报", //海报
                selectedOptions2: [], //标签
                radio:"原创", //原创
                abstract:"使用默认摘要", //使用默认摘要
                abstractValue:"", //默认摘要
                titleValue:"", //图文标题
                WebsiteValue:"", //请输入来源
                authorValue:"", //请输入作者
            }
        },
        components:{
            shortMessageaAlter
        },
        created(){

        },
        methods: {
            onFileChange(e){ //视频上传e
//                var files = e.target.files || e.dataTransfer.files;
//                if (!files.length) return;
//                //视频上传
//                if(this.typeName == '视频'){
//                    let _this = this;
//
//                    //视频预览
//                    var reader = new FileReader();
//                    this.file = files[0];
//                    reader.onload = function () {
//                        _this.$refs.video.src = this.result;
//                    };
//                    reader.readAsDataURL(this.file);
//                }


            },
            preservationClick(i){ //1保存2全文预览3发布

            },

            paragraphClick(){//段落预览
                this.shortMessageaShow = true;
            },
            handleChange(value) { //标签
                console.log(value);
            },
            onchangeFile(event){ // 上传
                let filesObj=event.target.files[0];
                let filesName=event.target.files[0].name;
                let img=event.target.parentElement;
                console.log(filesObj)
                console.log(filesName)
                console.log(img)
//        let url=this.$apidomain+"/upload/kindeditorjson";
//                let url=this.$apiupdate+"/upload/kindeditorjson";
//                let param = new FormData(); // 创建form对象
//                param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
//                this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
//                    let data=res.data;
//                    if(data.error===0){
//                        img.style.background= "url("+data.url+") center center no-repeat";
//                        img.style.backgroundSize= "100% 100%";
//                        this.selectorBehindObj[keyImg]=data.url;   //参数是ajax返回的图片地址
//                        item.flag = false;
//                    }else{
//                        alert("上传失败");
//                    }
//
//                });
            },
        }
    };
</script>

<style scoped lang="scss">
    .box_header{
        width: 100%;
        height: 100px;
        background: #FFFFFF;
        padding: 20px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 900;
        box-sizing: border-box;
    }
    .box_content{
        width: 100%;
        height: 120px;
        border-bottom: 2px solid #fff;
        padding-left: 20px;
        line-height:120px;;
        span{
            width: 100px;
        }
        .el-input{
            width: 400px;
            margin-left: 50px;
        }
    }
    .box_content1{
        width: 100%;
        height: 120px;
        border-bottom: 2px solid #fff;
        padding-left: 20px;
        overflow: hidden;
        .span1{
            display: inline-block;
            line-height: 120px;
            margin-right: 20px;
            float: left;
        }
        .radio{
            width: 100px;
            height: 120px;
            float: left;
            margin-left: 50px;
            .el-radio{
                line-height: 60px;
            }
        }
        .websiteNameValue{
            width: 600px;
            float: left;
            height: 60px;
            margin-top: 50px;
            line-height: 80px;
            span{
                margin: 0 15px;
            }
            .el-input{
                width: 100px;
            }
        }
    }
    .box_content2{
        width: 100%;
        height: 250px;
        border-bottom: 2px solid #fff;
        padding-left: 20px;
        overflow: hidden;
        .span1{
            display: inline-block;
            width: 100px;
            font-weight: 900;
            font-size: 16px;
            line-height: 200px;
            float: left;
            margin-left: 20px;
        }
        .list_page_graph{
            width: 375px;
            height:250px;
            float: left;
            li{
                width: 100%;
                height: 150px;
                margin-bottom: 20px;
                border: 1px solid #41BDC7;
                position: relative;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                .file{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    opacity: 0;
                    input{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            li:last-child{
                margin-bottom: 0;
            }
        }
        .home_page_graph{
            width: 375px;
            height: 250px;
            float: left;
            li{
                width: 100%;
                height: 150px;
                margin-bottom: 20px;
                border: 1px solid #41BDC7;
                position: relative;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                .file{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    opacity: 0;
                    input{
                        width: 100%;
                        height: 100%;
                    }
                    input:hover{
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .box_content3{
        width:100%;
        height: 300px;
        border-bottom: 2px solid #fff;
        padding-left: 20px;
        overflow: hidden;
        .span1{
            display: inline-block;
            width: 100px;
            font-weight: 900;
            font-size: 16px;
            line-height: 60px;
            float: left;
            margin-left: 20px;
        }
        .abstract{
            float: left;
            width: 400px;
            line-height: 60px;

        }
        .el-cascader{
            margin-top: 10px;
            margin-left: 10px;
        }
        .el-textarea{
            display: block;
            width: 800px;
            margin-left: 100px;
            font-size: 12px;
        }
    }
    .textValue{
        width: 100%;
        padding-left: 20px;
        height: 100px;
        line-height: 100px;
        font-size: 16px;
        font-weight: 900;
        background: #fff;
    }
    .box_content4{
        width: 100%;
        height: 300px;
        border-bottom: 2px solid #fff;
        overflow: hidden;
        margin-top: 10px;
        .video{
            width: 200px;
            height: 150px;
            border: 1px solid #41BDC7;
            cursor: pointer;
            input{
                width: 100%;
                height: 100%;
                cursor: pointer;
                opacity: 0;
            }
        }

    }
    .addtextArr{
        width: 100%;
        height: 100px;
        line-height: 100px;
    }
    .other{
        width: 100%;
        height: 100px;
        line-height:33px;
        padding-left: 20px;
        border-bottom: 2px solid #fff;
        overflow: hidden;
        margin-top: 10px;
        b{
            font-size: 16px;
            margin-right: 20px;
        }
        span{
            margin-left: 20px;
            font-size: 12px;
            color: rgba(5,5,9,0.3);
        }
    }
    .preservation{
        width:100%;
        height: 100px;
        line-height: 100px;
    }
    .release{
        width: 100%;
        height: 350px;
        border-bottom: 2px solid #fff;
        overflow: hidden;
        margin-top: 10px;
        .releaseTime{
            width: 500px;
            height: 200px;
            line-height: 50px;
            border-bottom: 2px solid #fff;
           .el-date-editor{
               margin-left: 50px;
           }
        }
        .releaseSetting{
            width: 500px;
            height: 100px;
            line-height: 50px;
        }
    }
</style>
