<template>
    <!--新建单活动-->
    <div class="activityMrgSingleBox">
            <ul class="activityMrgSingleItem">
                    <li class="activityMrgSingleItem_left">
                        <h5 class="h5">基本信息</h5>
                        <el-button type="primary" plain>预览</el-button>
                        <h5 class="hFive">页面分段？</h5>
                        <el-radio v-model="radio" label="是">是</el-radio>
                        <el-radio v-model="radio" label="否">否</el-radio>
                    </li>
                    <li  class="activityMrgSingleItem_center"><el-button type="primary" plain>设置分享页</el-button></li>
                    <li class="activityMrgSingleItem_right"><el-button type="primary" plain>全部应用</el-button><el-button type="primary" plain>提交审核</el-button></li>
            </ul>

         <div class="activityMrgSingleBoxItem">
            <ul>
              <li><span>标题</span><el-input v-model="titleValue"></el-input></li>
              <li><span>活动日期</span>
                  <el-date-picker
                          v-model="seloctTime"
                          type="datetimerange"
                          align="right"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
              </li>
              <li><span>活动地点</span><el-input v-model="addreeValue"></el-input></li>
              <li><span>主办单位</span><el-input v-model="hostValue"></el-input></li>
              <li><span>承办单位</span><el-input v-model="undertakeValue"></el-input></li>
              <li><span>协办单位</span><el-input v-model="cooperationValue"></el-input></li>
            </ul>
            <div class="activityMrgSingleBoxItem_right">
                <ul>
                    <li class="firstLi">海报</li>
                    <li class="cententLi"><img src="/static/images/loginBg.jpg" alt=""></li>
                    <li class="lastLi">
                        <a href="javascript:;" class="file"> 上传文件
                            <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                        </a>
                        <div class="ctivtyAddManyItem1Right_botSize">
                            建议尺寸750*560px或4:3, JPG、PNG格式， 图片小于5M
                        </div>
                    </li>
                </ul>
                <div>
                    <el-button type="primary" plain @click="add()">新增</el-button>

                </div>
            </div>
        </div>

       <div class="activityIntroductionBox">
        <div class="activityIntroduction">
            <h5>活动介绍</h5>
            <el-button type="primary" plain>预览</el-button>
        </div>
        <div class="activityIntroductionEditorElem">
            <!--富文本-->
            <div id="editorElem"  v-model="content"></div>

        </div>
        <el-button>预览</el-button>

    </div>

        <div class="activityarrangeBox">
            <div class="activityarrange">
                <h5>活动安排</h5>
                <el-button type="primary" plain>预览</el-button>
            </div>
            <div class="activityarrangeItem">
                <div class="activityarrangeItemLeft">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="activityarrangeItemRight">
                    <el-button type="primary" plain>从Excel导入</el-button>
                    <el-button type="primary" plain>新增</el-button>
                    <p><span>注意事项</span><el-input></el-input>此处若不填写，APP端将隐藏此栏</p>
                </div>


            </div>


        </div>

        <div class="activityIntroductionBox">
            <div class="activityIntroduction">
                <h5>嘉宾介绍</h5>
                <el-button type="primary" plain>预览</el-button>
            </div>
            <div class="activityIntroductionEditorElem">
                <!--富文本-->
                <div id="editorElem1" v-model="content1"></div>

            </div>
            <el-button>预览</el-button>

        </div>

        <div class="activityIntroductionBox">
            <div class="activityIntroduction">
                <h5>其他</h5>
                <el-button type="primary" plain>预览</el-button>
            </div>
            <div class="activityIntroductionEditorElem">
                <!--富文本-->
                <div id="editorElem2" v-model="content2"></div>

            </div>
            <el-button>预览</el-button>

        </div>

    </div>
</template>


<script>
    import E from 'wangeditor' //<!--富文本-->
    export default {
        data() {
            return {
                tableData: [{  //table数据
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                content:"", //富文本内容
                content1:"", //富文本内容
                content2:"", //富文本内容
                titleValue:'',//标题
                addreeValue:'',//地点
                hostValue:'',//主办单位
                undertakeValue:'',//承办单位
                cooperationValue:'',//协办单位
                radio:"是", // 单选
                seloctTime: '', //时间日期选择
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },

        methods: {

            add(){ //新增
                console.log(this.content)
                console.log(this.content1)
                console.log(this.content2)
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
        },
        mounted(){
            var editor = new E('#editorElem')
            editor.customConfig.onchange = (html) => {
                this.content = html
            }
            editor.create()
            var editor1 = new E('#editorElem1')
            editor1.customConfig.onchange = (html) => {
                this.content1 = html
            }
            editor1.create()
            var editor2 = new E('#editorElem2')
            editor2.customConfig.onchange = (html) => {
                this.content2 = html
            }
            editor2.create()
        },
    }
</script>

<style scoped lang="scss">
    .activityMrgSingleBox{
        width: 100%;
        background: #FFFFFF;
         .activityMrgSingleItem{
            width: 100%;
            height: 100px;
            background: #e3e3e3;
            .activityMrgSingleItem_left{
                display: inline-block;
              width: 520px;
                height: 100%;
                padding-left: 20px;
                .h5{
                    font-size: 18px;
                    line-height: 100px;
                    display: inline-block;
                    margin: 0;
                    padding: 0;

                }
                button{
                    width: 100px;
                    margin-left: 20px;
                    display: inline-block;
                }
                .hFive{
                    display: inline-block;
                    font-size: 18px;
                    line-height: 100px;
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                    margin-left: 100px;
                }
            }
             .activityMrgSingleItem_center{
                 display: inline-block;
                 width: 200px;
                 height: 100%;
                 line-height: 100px;
                 button{
                     width: 100px;
                     margin-left: 50px;
                 }
             }
             .activityMrgSingleItem_right{
                 float: right;
                 height: 100%;
                 margin-right: 100px;
                 line-height: 100px;
                 button{
                     width: 100px;
                     margin-left: 20px;
                 }
             }
        }
        .activityMrgSingleBoxItem{
            width: 100%;
            height: 400px;
            >ul{
                width: 500px;
                height: 400px;
                float: left;
                padding: 10px 20px;
                box-sizing: border-box;
                li{
                     width: 100%;
                    height: 50px;
                    margin-top: 10px;
                    span{
                        display: inline-block;
                        width: 80px;
                        font-size: 14px;
                        height: 50px;
                        line-height: 50px;
                    }
                    .el-input{
                        width: 300px;
                        height: 50px;
                    }
                    .el-input__inner{
                        width: 300px;
                        height: 40px;
                        transform: translateX(-3px);
                    }
                }
            }
            >.activityMrgSingleBoxItem_right{
                width: 500px;
                height: 400px;
                float: left;
                >ul{
                    width: 500px;
                    height: 300px;
                    li{
                        float: left;
                    }
                    .firstLi{
                        width: 50px;
                        padding-top: 20px;
                    }
                    .cententLi{
                        width: 200px;
                        height: 200px;
                        margin: 10px 30px 0 10px;
                        img{
                            display: block;
                            width: 200px;
                            height: 200px;
                        }
                    }
                    .lastLi{
                        width: 100px;

                    }
                }
            }
        }

    }
    .activityIntroductionBox{
        width: 100%;
        position: relative;
        .activityIntroduction{
            width:100%;
            height: 80px;
            background: #e3e3e3;
            padding: 0 20px;
            line-height: 80px;
            text-align: left;
            position: relative;
            h5{
                width: 100px;
                height: 80px;
                display: inline-block;
                margin: 0;
                padding: 0;
                position: absolute;
                font-size: 18px;
                left:20px;
            }
            button{
                position: absolute;
                width: 100px;
                left: 120px;
                top:20px;
            }
        }
        .activityIntroductionEditorElem{
            width: 800px;
            height: 500px;
            margin-top: 10px;
        }
        button{
            position: absolute;
            left: 820px;
            top:100px;
        }
    }
    .activityarrangeBox{
        width: 100%;
        position: relative;
        .activityarrange {
            width:100%;
            height: 80px;
            background: #e3e3e3;
            padding: 0 20px;
            line-height: 80px;
            text-align: left;
            position: relative;
            h5{
                width: 100px;
                height: 80px;
                display: inline-block;
                margin: 0;
                padding: 0;
                position: absolute;
                font-size: 18px;
                left:20px;
            }
            button{
                position: absolute;
                width: 100px;
                left: 120px;
                top:20px;
            }
        }
        .activityarrangeItem{
            width: 100%;
            min-height: 300px;
            .activityarrangeItemLeft{
                width: 800px;
                padding: 20px;
            }
            .activityarrangeItemRight{
                margin-top: 10px;
                padding: 20px;
                p{
                    display: inline-block;
                    margin-left: 30px;
                    span{
                        width: 100px;
                    }
                    .el-input{
                        width: 200px;
                        margin: 0 20px;
                    }
                }
            }
        }
    }

   
</style>
