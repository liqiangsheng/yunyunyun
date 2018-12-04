<template>
    <!--常见问题-->
    <div class="main-box">
        <div class="problem">
               <div class="problemBox" v-for="(item,index) in listArr">
                    <div class="problemBox_header">
                        <b>QA{{index+1}}</b>
                        <el-button type="primary" @click="roof_placement(index)">置顶</el-button>
                        <span>{{index+1}}</span>
                    </div>
                   <div class="problemBox_content">
                        <div class="problemBox_contentItem1">
                           <span>问题</span>
                            <el-input v-model="item.value" placeholder="请输入内容"></el-input>
                        </div>
                       <div class="problemBox_contentItem2">
                           <span>回答</span>
                           <el-input v-model="item.rinformantValue" placeholder="请输入内容" type="textarea":rows="5"></el-input>
                           <el-button type="primary" @click="modify(item,index)">修改</el-button>
                           <el-button type="primary" @click="determine(item,index)">确定</el-button>
                       </div>
                   </div>
               </div>

            <div class="addpreview">
                <el-button type="primary" @click="add">新增问答</el-button>
                <el-button type="primary" @click="preview">预览结果</el-button>
            </div>
        </div>

    </div>
</template>


<script>

    export default {

        data() {
            return {
                listArr:[
                    {value:"",rinformantValue:""},
                    {value:"",rinformantValue:""},
                    {value:"",rinformantValue:""},
                    {value:"",rinformantValue:""},
                    {value:"",rinformantValue:""},
                    ]
            }
        },

        methods: {
            preview(){//预览结果

            },

            add(){//新增问答

            },
            determine(v,i){//确定

            },
            modify(v,i){///修改

            },
            roof_placement(i){//置顶

            }
        }
    };
</script>

<style scoped lang="scss">
    .problem{
        width: 100%;
        .problemBox{
            width: 100%;
            .problemBox_header{
                width: 100%;
                height: 100px;
                line-height: 100px;
                background: #EEEEEE;
                b{
                    display: inline-block;
                    width: 100px;
                    margin-right: 500px;
                }
                .el-button{
                    margin-right: 50px;
                }
                span{
                    display: inline-block;
                    width: 100px;
                    height: 50px;
                    line-height: 50px;
                    margin-top: 25px;
                    background: #ffffff;
                    text-align: center;
                }
            }
            .problemBox_content{
                width: 100%;
                background: #ffffff;
                .problemBox_contentItem1{
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    span{
                        display: inline-block;
                        width: 100px;
                        margin: 25px;
                        height: 50px;
                        line-height: 50px;
                        background: #EEEEEE;
                        text-align: center;
                    }
                    .el-input{
                        width: 700px;
                    }
                }
                .problemBox_contentItem2{
                    width: 100%;
                    height: 200px;
                    line-height: 200px;
                    span{
                        float: left;
                        display: inline-block;
                        width: 100px;
                        margin: 50px 25px;
                        height: 100px;
                        line-height: 150px;
                        background: #EEEEEE;
                        text-align: center;
                    }
                    .el-textarea{
                        float: left;
                        width: 700px;
                        margin-top: 50px;
                        margin-right: 30px;
                    }
                }
            }

        }
        .addpreview{
            width: 100%;
            height: 100px;
            line-height: 100px;
            padding-left: 20px;
            background: #ffffff;
            margin: 20px 0;
        }
    }

</style>
