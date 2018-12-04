<template>
    <div class="form-box searchForm">
        <!-- 响应式24 总宽度-->
        <el-row :span="24">
            <!-- 响应式6 -->
            <div class="input-box-center">
                <el-form :inline="true" :model="formData" class="demo-form-inline" v-if="formModel.length>0"  label-width="100px"  ref="formData">
                    <el-row :span="24">
                        <div v-for="(model,index) in formModel" :key="model.key" v-if="show ? index !== '': index<=6 " class="item">
                            <el-form-item  v-if="!model.isGroup"  :label="model.name" :key="model.key" :prop="model.key" :label-width="model.labelWidth">
                                <el-input v-if=" model.elemType === 'input' "
                                          size="small"
                                          v-model="formData[model.key]"
                                          :maxLength="model.maxLength"
                                          @focus="event => onFocus(event, model, index)"
                                          @blur="event => onBlur(event, model, index)"
                                          @change="event => onChange(event, model, index)"
                                          :placeholder="model.placeholder || ('请输入'+model.name)"
                                          clearable>
                                </el-input>
                                <el-select v-else-if=" model.elemType === 'select' "
                                           clearable
                                           size="small"
                                           @focus="event => onFocus(event, model, index)"
                                           @blur="event => onBlur(event, model, index)"
                                           @change="event => onChange(event, model, index)"
                                           v-model="formData[model.key]"
                                           :placeholder="model.placeholder || ('请选择'+model.name)"
                                           :prop="model.key">
                                    <el-option v-for=" (opt, index) in model.child "
                                               :value="opt[model.colValue]"
                                               :label="opt[model.colName]"
                                               :key="index">
                                    </el-option>
                                </el-select>
                                <el-date-picker v-else-if=" model.elemType === 'datePicker' "
                                        v-model="formData[model.key]"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                                <el-select v-else-if=" model.elemType === 'optionSelect' "
                                           filterable
                                           @focus="event => onFocus(event, model, index)"
                                           @blur="event => onBlur(event, model, index)"
                                           @change="event => onChange(event, model, index)"
                                           v-model="formData[model.key]"
                                           :placeholder="model.placeholder || ('请选择'+model.name)">
                                    <el-option-group v-for="group in model.child" :key="group.label" :label="group.label">
                                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-option-group>
                                </el-select>

                                <el-cascader v-else-if=" model.elemType === 'cascader' "
                                             :options="model.options"
                                             v-model="formData[model.key]"
                                             :placeholder="model.placeholder || ('请选择'+model.name)"
                                             @focus="event => onFocus(event, model, index)"
                                             @blur="event => onBlur(event, model, index)"
                                             @change="event => onChange(event, model, index)"
                                             clearable>
                                </el-cascader>

                                <el-popover v-else-if=" model.elemType === 'popover' "
                                            :placement="model.placement"
                                            :width="model.width"
                                            trigger="hover">
                                            <div :custome="model.title" style="padding-right: 30px;padding-left: 30px;">
                                                <h2 align="center">{{model.title}}</h2>
                                                <p v-for="item in model.contents">{{item}}</p>
                                            </div>
                                            <i slot="reference" class="el-icon-question"></i>
                                </el-popover>
                            </el-form-item>
                        </div>
                        <el-col :span="6" class="btn">
                            <el-form-item>
                                <el-button type="primary" size="small" @click="searchBtn()" id="searchBtn" class="btn-active" v-if="searchShow">查询</el-button>
                                <el-button type="primary" size="small" @click="reset('formData')" id="reset" class="black-button" v-if="resetShow">重置</el-button>
                                <el-button type="primary" size="small" @click="more()" id="more" class="black-button" v-if="moreShow" :disabled="disMore">更多
                                    <i class="el-icon--right " :class="[show ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "search-form",
        props:{
            formModel: {
                type: [Array],
            },
            searchShow: {
                type: Boolean,
                default: true
            },
            resetShow: {
                type: Boolean,
                default: true
            },
            moreShow: {
                type: Boolean,
                default: true
            },
            formDataDefault:Object,
        },
        data(){
            return {
                disMore:true,
                show:false, //true 全显示 false 分显示
                formData:{}
            }
        },
        methods:{
            _createdData(){
                let formData =Object.assign(this.formDataDefault,formData);
                this.formModel.map(item => {
                    if(item.defaultValue !== undefined) {
                        formData[item.key] = item.defaultValue
                    } else {
                        formData[item.key] = '';
                    }
                    if(item.typeElem === 'select' && !item.changeCallback){
                        item.changeCallback = () => {};
                    }
                });
                this.formData = Object.assign({},formData);
                this.$emit('update:formDataDefault', formData);
                this.disMore = this.formModel.length<=7; //如果组件大于7
            },
            searchBtn () {
                this.$emit('update:formDataDefault', this.formData);
                this.$emit('refreshTable');
            },
            reset(formName){
                this.$refs[formName].resetFields();
            },
            more(){
                this.show = !this.show
            },
            onFocus (event, model, index) {
                if (model.handleFocus && typeof model.handleFocus === 'function') {
                    model.handleFocus(event, model, index)
                }
            },
            onBlur (event, model, index) {
                if (model.handleBlur && typeof model.handleBlur === 'function') {
                    model.handleBlur(event, model, index)
                }
            },
            onChange (event, model, index) {
                if (model.handleChange && typeof model.handleChange === 'function') {
                    model.handleChange(event, model, index)
                }
            }
        },
        created(){
            this._createdData()
        },
        mounted(){
          //  document.getElementsByClassName('item').style.cssFloat="left"
        }
    }
</script>

<style scoped>
    .item{
        width: 400px;
        display: inline-block;
    }
</style>
