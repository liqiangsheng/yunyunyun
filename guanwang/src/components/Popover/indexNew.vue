<template>
    <div>
        <!-- 显示字段 -->
        <el-popover ref="popover" placement="bottom-end" width="500" v-model="visible">
            <div class="popoverTitle">显示字段 <i id="popoverClose" @click="visible = false">×</i></div>
            <div class="popoverBox">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedOps" @change="handleCheckedCitiesChange" >
                    <el-checkbox v-for="label in formDataLabelData" :label="label" :key="label">{{label}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="popoverBtn">
                <el-button type="primary" size="small"  @click="resetVisible" id="resetVisible">重置</el-button>
                <el-button type="primary" size="small" @click="popoverBtn" class="btn-active">确定</el-button>
            </div>
        </el-popover>
        <el-button v-popover:popover type="primary" size="small" id="fieldSetting" >字段设置</el-button>
    </div>
</template>

<script>
    import { saveHiddenColumn } from '@/api/public'
    export default {
        name: 'popover',
        props:{
            formDataLabel:{
                type: [Array],
                default() {
                    return []
                }
            },
            tableKey:[Number],
            pageName:[String],
            tableShow:{
                type: [Array],
                default() {
                    return []
                }
            }
        },
        data(){
            return{
                visible:false,
                isIndeterminate: true,
                checkAll:true,
                checkedOps: [], //选中值
                formDataLabelData:[],
                myTableKey:this.tableKey,
                tableShowDate:this.tableShow,  //显示字段
            }
        },
        methods:{
            handleCheckAllChange(val) {
                this.checkedOps =val? this.formDataLabelData : [];   //全选
                this.isIndeterminate = false;   //全选的钩子
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;    //选中的选项
                this.checkAll = checkedCount === this.formDataLabel.length; //是否已经全选
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.formDataLabel.length;
            },
            popoverBtn(){      //显示字段确定按钮
                let _this =this;
                let a = new Set(this.formDataLabelData);
                let b = new Set(this.checkedOps);
                let nameList = new Set([...a].filter(x => !b.has(x)));    //两个数组差集
                let data = {
                    "nameList":nameList,
                    "pageCode":this.pageName
                };
                this.visible = false;    //隐藏显示字段面板
                saveHiddenColumn(data).then(res =>{
                    if(res.data.status){
                        _this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.$store.dispatch('GetInfo');
                        this.myTableKey = this.myTableKey+1;    //更新表格key
                        this.tableShowDate = this.checkedOps;    //要显示的字段

                        this.$emit('tableKey', this.myTableKey);    //修改父组件值
                        this.$emit('tableShow', this.tableShowDate);    //修改父组件值

                    }
                });
                this.myTableKey = this.myTableKey+1;    //更新表格key
                this.$emit('tableKey', this.myTableKey);    //修改父组件值
            },
            resetVisible(){
                this.checkedOps = this.formDataLabelData;   //重置
                this.checkAll= true;    //全选按钮勾选
                this.isIndeterminate = false;
            }
        },
        mounted(){
            this.checkedOps = this.tableShowDate;
            this.formDataLabelData = this.formDataLabel
            if(this.checkedOps.length === this.formDataLabelData.length){
                this.checkAll= true;    //全选按钮勾选
                this.isIndeterminate = false;
            }
        /*    this.formDataLabel.forEach(res=>{
                this.formDataLabelData.push(res.label)
            })*/

        }
    }
</script>
