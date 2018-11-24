<template>
    <div class="main-box">
         <div class="box_header">
             基本信息
         </div>
        <div class="box_content">
            <span>图文标题*</span>
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
                <span class="span2">转载自</span>
                <el-input v-model="websiteNameValue" placeholder="网站名称"></el-input>
                <span class="span3">来源</span>
                <el-input v-model="WebsiteValue" placeholder="请输入来源、网址"></el-input>
                <span class="span4">作者</span>
                <el-input v-model="authorValue" placeholder="请输入作者"></el-input>
            </div>
        </div>

        <div class="box_content2">
            <span class="span1">列表页图*</span>
            <ul class="list_page_graph">
                <li class="updata">
                    <img src="" alt="">
                    <a href="javascript:;" class="file">
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </a>
                </li>
                <li class="updata">
                    <img src="" alt="">
                    <a href="javascript:;" class="file">
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </a>

                </li>
                <li class="updata">
                    <img src="" alt="">
                    <a href="javascript:;" class="file">
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </a>
                </li>

            </ul>
            <span class="span1">首页图*</span>
            <ul class="home_page_graph">
                <li class="updata">
                    <img src="" alt="">
                    <a href="javascript:;" class="file">
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </a>
                </li>
            </ul>
        </div>
        <div class="box_content3">
            <span class="span1">摘要* </span>
            <div class="abstract">
                <el-radio v-model="abstract" label="使用默认摘要">使用默认摘要</el-radio>
                <br>
                <el-radio v-model="abstract" label="不使用默认摘要">不使用默认摘要</el-radio>
            </div>
            标签
            <el-cascader
                    expand-trigger="hover"
                    :options="options"
                    v-model="selectedOptions2"
                    @change="handleChange">
            </el-cascader>
            <el-input v-model="abstractValue" type="textarea" :rows="5"></el-input>
        </div>
        <div class="textValue">正文填写</div>
        <div class="box_content4" v-for="(item,index) in textArr">

            <ul class="text">
                <li class="textLi1">
                    <b>小标题*</b>
                    <el-input v-model="abstractValue">小标题*</el-input>
                    <div class="updata">
                          <img src="/static/images/logo.png" alt="">
                            <a href="javascript:;" class="file">
                                <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                            </a>
                    </div>
                </li>
                <li class="textLi2">
                    <b>段落正文*</b>
                    <el-input v-model="abstractValue" type="textarea" :rows="8"></el-input>
                    <el-button type="primary" @click="paragraphClick">段落预览</el-button>
                </li>
            </ul>
        </div>
        <div class="addtextArr">
            <el-button type="primary" @click="addtextArrClick(textArr+1)">添加段落</el-button>
        </div>
        <div class="textValue">其他设置</div>
        <div class="other">
            <b>评论设置*</b>
            <el-radio v-model="other" label="允许评论">允许评论</el-radio>
            <el-radio v-model="other" label="不允许评论">不允许评论</el-radio>
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
                other:"允许评论",//其他
                textArr:2, //段落
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
                selectedOptions2: [], //标签
                radio:"原创", //原创
                abstract:"使用默认摘要", //使用默认摘要
                abstractValue:"", //默认摘要
                titleValue:"", //图文标题
                websiteNameValue:"", //网站名称
                WebsiteValue:"", //请输入来源、网址
                authorValue:"", //请输入作者
            }
        },
        components:{
            shortMessageaAlter
        },
        created(){

        },
        methods: {
            preservationClick(i){ //1保存2全文预览3发布

            },
            addtextArrClick(v){//添加段落
             console.log(v)
                this.textArr =v;
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
        height: 540px;
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
            height: 540px;
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
            height: 500px;
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
            width: 200px;
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
        height: 400px;
        border-bottom: 2px solid #fff;
        overflow: hidden;
        margin-top: 10px;

        .text{
            width: 100%;
            padding-left: 20px;
            height: 390px;
            margin-bottom: 10px;
            .textLi1{
                width: 800px;
                height: 100px;
                /*line-height: 100px;*/
                padding-top: 40px;
                box-sizing: border-box;
                b{
                    width: 100px;
                    font-size: 16px;
                    line-height: 40px;
                    display: inline-block;
                    float: left;
                }
                .el-input{
                    width: 300px;
                    margin:0 20px;
                    float: left;
                    font-size: 12px;
                }
                .updata{
                    width: 100px;
                    height: 42px;
                    position: relative;
                    display: inline-block;
                    img{
                        width: 40px;
                        height: 30px;
                        display: inline-block;
                        transform: translateY(5px);
                    }
                    .file{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top:0;
                        z-index: 2;
                        input{
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                        }
                        input:hover{
                            cursor: pointer;
                        }
                    }

                }
            }
            .textLi2{
                width: 100%;
                b{
                    width: 100px;
                    font-size: 16px;
                    line-height: 40px;
                    display: inline-block;
                    float: left;
                }
                .el-textarea{
                    width: 500px;
                }
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
        line-height: 100px;
        padding-left: 20px;
        b{
            font-size: 16px;
            margin-right: 20px;
        }
    }
    .preservation{
        width:100%;
        height: 100px;
        line-height: 100px;
    }
</style>
