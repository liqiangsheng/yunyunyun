<!--- 弹窗表单 --->
<template>
    <el-dialog :append-to-body="true" class="dialog" :title="dialogFormData.title" :visible.sync="formVisible" :close-on-click-modal="true"
               :width="dialogFormData.width" :top="dialogFormData.top" :before-close="dialogClose">
        <div class="fromBox">
            <el-form :model="formData" ref="formData" :label-width="dialogFormData.labelWidth">
                <template v-for="(model,index) in dialogFormData.formModel">
                    <el-form-item  :label="model.name" :key="model.key" :prop="model.key" :rules="model.rules">
                        <el-input v-if=" model.elemType === 'input' "
                                  size="small"
                                  :maxlength="model.maxlength"
                                  v-model="formData[model.key]"
                                  :placeholder="'请输入'+model.name"
                                  :disabled="dialogFormData.disabled"
                                  :clearable="!dialogFormData.disabled">
                        </el-input>
                        <el-input v-if=" model.elemType === 'inputNumber' "
                                  size="small"
                                  :maxlength="model.maxlength"
                                  v-model.number="formData[model.key]"
                                  :placeholder="'请输入'+model.name"
                                  :disabled="dialogFormData.disabled"
                                  :clearable="!dialogFormData.disabled">
                        </el-input>
                        <el-select v-else-if=" model.elemType === 'select' "
                                   :clearable="!dialogFormData.disabled"
                                   size="small"
                                   v-model="formData[model.key]"
                                   :placeholder="'请选择'+model.name"
                                   :disabled="dialogFormData.disabled"
                                   :prop="model.key">
                            <el-option v-for=" (opt,index) in model.child "
                                       :value="opt[model.colValue]"
                                       :label="opt[model.colName]"
                                       :key="index">
                            </el-option>
                        </el-select>
                        <el-date-picker v-else-if=" model.elemType === 'datePicker' "
                                        v-model="formData[model.key]"
                                        :disabled="dialogFormData.disabled"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </template>
            </el-form>
            <div class="dialog-footer" v-if="!dialogFormData.disabled">
                <template v-for="btn in dialogFormData.bottomBtn">
                    <el-button :type="btn.type" :size="btn.size" @click.native="btn.method(thisPint,'formData')" :class="btn.className" v-text="btn.value" >
                    </el-button>
                </template>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "dialog-form",
        data(){
            return{
                submitLoading:false,
                formData:{},
                thisPint:this
            }
        },
        props:{
            dialogDataDefault:{
                type:[Object]
            },
            dialogFormData:{
              type:[Object]
            },
            formVisible:{
                type:[Boolean],
                default() {
                    return false
                }
            },
        },
        watch: {
            dialogDataDefault:{
                handler(curVal,oldVal){
                    this.formData = curVal
                    this.$emit('update:dialogDataDefault', this.formData)
                },
                deep:true
            },
            formVisible:{
                handler(curVal,oldVal){
                    if(curVal){
                        this._createdData()
                    }else{
                        this.$emit('update:dialogDataDefault', {})
                        this.$refs.formData.resetFields();
                    }
                },
                deep:true
            }
        },
        methods:{
            _createdData(){
                let formModel ={};
                this.dialogFormData.formModel.map((item,index) => {
                    formModel[item.key] = ""
                });
                let formData = Object.assign(formModel,this.dialogDataDefault);
                this.formData = formData;
                this.$emit('update:dialogDataDefault', formData)
            },
            dialogClose(){
                this.$refs.formData.resetFields();
                this.$emit('update:formVisible', false)
            }
        },
        created(){
           this._createdData()
        },
        mounted(){}
    }
</script>

<style scoped>

</style>
