<template>
    <!--编辑资料填写-->
    <div id="InformationSetting">
        <div class="InformationSetting_Optional">
           <div class="InformationSetting_header">
               已选项 （可拖动项目位置,打 <span style="display: inline-block;width: 10px;height: 10px;background: red"></span> 为必填）
           </div>
            <!-- 调用组件  -->
            <draggable :list="listData1" :options="{group:{name: 'article'}, sort: true}"
                       @start="start22"
                       @end="end22"
                       class="dragArea11">
                <div v-for="(item, index) in listData1" :key="item.id" class="list-complete-item1" v-if="!!listData1&&listData1.length>0">
                    <span>{{index+1}} .</span>
                    <!--<el-checkbox v-model="item.allowEmpty"></el-checkbox>-->
                    <div class="check" :class="{checkActive:item.allowEmpty==false}" @click="checkClcik(item)"></div>
                    <el-input class="list-complete-item-handle2" v-model="item.displayName" oninput="if(value.length>20)value=value.slice(0,20)"> </el-input>
                    <!--<div>-->
                        <!--<i class="el-icon-delete" @click="handleDel(index, item.id,item)"></i>-->
                    <!--</div>-->

                </div>
            </draggable>
            <el-button type="primary" plain style="margin-left:295px;margin-bottom: 20px" @click="definitePreservation">确定保存</el-button>
        </div>
        <div class="InformationSetting_forelection">
            <div class="InformationSetting_header">
                供选项 （可拖动位置）
            </div>
             <!--<draggable :list="listData2" :options="{group:{name: falgs,pull:'clone'},filter: '.undraggable',sort: true}"-->
             <draggable :list="listData2" :options="{group:{name: falgs},filter: '.undraggable',sort: true}"
                        @end="end"
                        class="dragArea">
                 <div v-for="(item, index) in listData2" :key="item.id" class="list-complete-item"  :class="{undraggable : item.flag}">
                     <!--<el-checkbox v-model="item.cheacked"></el-checkbox>-->
                     <span>{{index+1}} .</span>
                     <el-input class="list-complete-item-handle2" v-model="item.displayName" oninput="if(value.length>20)value=value.slice(0,20)"> </el-input>
                     <!--<div>-->
                         <!--<i class="el-icon-delete" @click="handleDel1(index, item.id,item)"></i>-->
                     <!--</div>-->
                 </div>
             </draggable>

        </div>

    </div>

</template>
<script>
    //         全部标签                                 //编辑保存
    import {activitySignupNoteSettingFindByActivityId,activitySignupNoteSettingUpdate} from '../../../api/activityMrg/activityMrg'
    import draggable from 'vuedraggable' //拖拽插件
    export default {
        components:{
            draggable
        },
        data() {
            return {
                customArr:{id:"13",name:'你的专业',cheacked:true},
                customMessage:'', //子定义保存
                falgs: 'article',
                disabled: false,
                listData1: [], //报名的资料报名（必填）
                listData: [], //提出掉不需要显示的数据；
                listData2: [],//全部
                listData3:[],//不需要显示的数据
            }

        },
        methods: {
            checkClcik(v){
                v.allowEmpty = !v.allowEmpty;
            },
            query(){ //初始化数据
                activitySignupNoteSettingFindByActivityId(this.$router.history.current.query.id).then(res=>{//传活动id
                    if(res.data.status){
                        if(!!res.data.data){
                                for(let i=0;i<res.data.data.length;i++){
//
                                    if(res.data.data[i].code=='noteNo'||res.data.data[i].code=='userId'||res.data.data[i].code=='version'||res.data.data[i].code=="activityId"){
                                        this.listData3.push(res.data.data[i]); //不需要显示的数据
                                    }else{
                                        this.listData.push(res.data.data[i]);//显示的数据
                                    }
                                }
                                setTimeout((item,index)=>{
                                    for(let i=0;i<this.listData.length;i++){ //显示的数据分为显示在客服端跟不显示在客服端
                                        if(this.listData[i].hideStatus==false) {  //显示在客户端的
                                            this.listData1.push(this.listData[i])
                                        }else{  //不显示在客户端的
                                            this.listData2.push(this.listData[i])
                                        }
                                    }
                                },0)

                        }

                    }else{
                        this.$message.warning(res.data.message);
                    }
                })
            },
            definitePreservation(){ //确定保存
//                console.log(this.listData1,"this.listData1")
//                console.log(this.listData2,"this.listData1")
                this.listData1.forEach((item,index)=>{  //选择显示的都是false
                    item.hideStatus = false
                })
                this.listData2.forEach((item,index)=>{//不选择的都是true
                    item.hideStatus = true;
                    item.allowEmpty = true;
                })
                    let settingList =  [...this.listData1,...this.listData2,...this.listData3]; //把多有数据还回给后台
                    settingList.forEach((item,index)=>{ //把数据按移动的顺序从新排序
                        item.sort = index;
                    })
                setTimeout((item,idnex)=>{
                    activitySignupNoteSettingUpdate(settingList).then(res=>{//传给后台，保存
                        if(res.data.status==true){
                            this.$message.success(res.data.message);
                        }else{
                            this.$message.warning(res.data.message);
                        }
                    })
                },100)


            },

            end (ev) {
                console.log(ev)
//                if (ev.to.className === 'dragArea11') {
//                    this.$set(this.listData2[ev.oldIndex], 'flag', true)
//                }
            },
            start22 (event) {
                this.falgs = 'article'
            },
            end22 (ev) {
                this.falgs = 'article'

            },
//            handleDel1 (index, id,v) {
//                this.list2.splice(index, 1);
//            },
//            handleDel (index, id,v) {
////                consolethis.list2[index]
//                let flag = false;
//                this.listData1.splice(index, 1);
//                this.listData2.find((item,idnex1)=>{
//                    if(id==item.id){
//                        flag = true;
//                        this.$set(this.listData2[idnex1], 'flag', false)
//                    }
//                })
//                if(flag){
//                    return
//                }else{
//                    this.listData2.push(v)
//                }
//            }
        },


        mounted() {
        },
        created(){
           this.query();
        }
    }
</script>
<style lang="scss">
#InformationSetting{
    background: #ffffff;
    width: 100%;
    .dragArea11{
        width: 100%;
        padding: 20px;
        overflow: hidden;
        box-sizing: border-box;
        .list-complete-item1{
            width: 270px;
            height: 60px;
            margin-right: 20px;
            float: left;
            >.checkActive{
                background: red;
            }
            >.check{
                display: inline-block;width:10px;height: 10px;border: 1px solid #cccccc;margin-top: 5px
            }
            >span{
                width: 10px;
            }
            .list-complete-item-handle2{
                display: inline-block;
                margin-left: 20px;
                display: inline-block;
                width: 200px;
            }
        }
    }
    .dragArea{
        width: 100%;
        padding: 20px;
        overflow: hidden;
        box-sizing: border-box;
        .list-complete-item{
            width: 270px;
            height: 60px;
            margin-right: 20px;
            float: left;
            >span{
                width: 10px;
            }
            .list-complete-item-handle2{
                display: inline-block;
                margin-left: 20px;
                display: inline-block;
                width: 200px;
            }
        }
    }
    .custom{
        width: 100%;
        background: #ffffff;
        border-top: 1px solid #eaeaea;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        >div{
            width: 150px;
            float: left;
            text-align: center;
            padding-top: 25px;
        }
        >ul{
            width: 500px;
            float: left;
            li{
                width: 100%;
                margin-bottom: 15px;
                .el-input{
                    width: 300px;
                    margin-left: 15px;
                }
            }
        }
        >.el-button{
           position: absolute;
            left: 700px;
            bottom: 50px;
        }
    }
}
</style>
<style lang="scss" scoped="">
.InformationSetting_header{
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background: #eaeaea;
    color: #262626;
    font-size: 20px;
}
     .undraggable {
        background-color: #ffffff;
    }
</style>

