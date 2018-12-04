<template>
	<div class="iform form-box" >
		<el-form :model="formData" :rules="rules" :ref="formName" :label-width="labelWidth + 'px' " >
			<!--横向表单-->
			<div v-if="inline" class="clearfix" >
			  <el-row>	  
  				<el-col :span='!item.colSpan?6:item.colSpan'  v-for='item in formModel' :key="item.prop" class='cols' :style="item.styles">
  					<v-formGroup v-if="item.group" :group="item.childs" :formData="formData" :label='item.label'></v-formGroup>
  					<el-form-item :label-width='item.labelWidth!== undefined?item.labelWidth+"px":labelWidth + "px"' :prop="item.prop" :label="item.label" v-else style='width: 100%;'>
  						<el-input class="cusInput" 
  						  clearable
  							v-if=" item.elemType == 'input' " 
  							v-model="formData[item.prop]" 
  							:disabled='disable?disable:item.disable'
  							:maxlength='item.maxlength'
  							:placeholder="item.placeholder?item.placeholder:item.label"
  							:style="{width:item.width+'px !important',minWidth:'100%'}">
  							 <template slot="append" v-if="item.slot != undefined ">{{item.slot}}</template>
  						</el-input>
  						<el-input type="textarea" 
  						  clearable
  						  :disabled='disable?disable:item.disable'
  							v-else-if=" item.elemType == 'textarea' 
  							" v-model="formData[item.prop]" 
  							:maxlength='item.maxlength'
  							:placeholder="item.placeholder?item.placeholder:item.label"
  							:style="{width:item.width+'px !important',minWidth:'100%'}">
  							</el-input>
  						<el-select clearable 
  							v-else-if=" item.elemType == 'select' " 
  							:disabled='disable?disable:item.disable'
  							v-model="formData[item.prop]"
  							:placeholder="item.placeholder?item.placeholder:item.label"
  							:style="{width:item.width+'px !important',minWidth:'100%'}"
  							@change="item.changeCallback($event, item, formModel, formData)">
  							<el-option v-for=" option in item.options "
                                       :key="option[item.colVal]"
                                       :label="option[item.col]"
                                       :value="option[item.colVal]">

                            </el-option>
  						</el-select>
  						<el-date-picker :editable='dateEditable' 
  							clearable 
  							v-else-if=" item.elemType == 'date' " 
  							v-model="formData[item.prop]" 
  							:type='item.type'
  							:disabled='disable?disable:item.disable'
  							:value-format="item.valFormat"
                :format='item.format'
                @blur="item.changeCallback($event, item, formModel, formData)"
  							:placeholder="item.placeholder?item.placeholder:item.label"
  							:style="{width:item.width+'px !important'}">
  						</el-date-picker>
  						<el-date-picker :editable='dateEditable' 
  							clearable v-else 
  							v-model="formData[item.prop]" 
  							type="month"
  							:value-format="item.valFormat"
                :format='item.format'
  							:disabled='disable?disable:item.disable'
  							range-separator="至" 
  							start-placeholder="开始日期" 
  							end-placeholder="结束日期"
  							placeholder='选择月'
  							:picker-options="item.options"
  							@blur="item.changeCallback($event, item, formModel, formData)"
  							:style="{width:'100%' + '!important'}">
  						</el-date-picker>
  					</el-form-item>
  				</el-col>
  				
  				<div style='float: left;'>
  					<el-form-item>
  						<slot name="iform-btns"></slot>
  					</el-form-item>
  				</div>
				</el-row>
			</div>
			
			<!--竖向表单-->
			
			<el-row class="clearfix v" v-else >
				<el-col :span="20" v-for='item in formModel' :key="item.prop" >
					<v-formGroup v-if="item.group" :group="item.childs" :formData="formData" :label='item.label'></v-formGroup>
					<el-form-item  :label-width='item.labelWidth!== undefined?item.labelWidth+"px":labelWidth + "px"' :prop="item.prop" :label="item.label" v-else>
						<el-input 
							v-if=" item.elemType == 'input' " 
							v-model="formData[item.prop]" 
							:disabled='disable?disable:item.disable'
							:maxlength='item.maxlength'
							:placeholder="item.placeholder?item.placeholder:item.label"
							stle="width:100% !important">
							 <template slot="append" v-if="item.slot != undefined ">{{item.slot}}</template>
						</el-input>
						<el-input type="textarea" 
							v-else-if=" item.elemType == 'textarea' " 
							v-model="formData[item.prop]" 
							:disabled='disable?disable:item.disable'
							:maxlength='item.maxlength'
							:placeholder="item.placeholder?item.placeholder:item.label">
						</el-input>
						<el-select clearable v-else-if=" 
							item.elemType == 'select' " 
							v-model="formData[item.prop]"
							:disabled='disable?disable:item.disable'
							:placeholder="item.placeholder?item.placeholder:item.label"
							@change="item.changeCallback($event, item, formModel, formData)">
							<el-option v-for=" option in item.options " 
								:key="option[item.colVal]" 
								:label="option[item.col]"
								:value="option[item.colVal]">
							</el-option>
						</el-select>
						<el-date-picker 
							:editable='dateEditable' 
							:disabled='disable?disable:item.disable'
							clearable v-else-if=" item.elemType == 'date' " 
							v-model="formData[item.prop]" :type="item.type" 
							:value-format="item.valFormat"
							:format='item.format'
							@change="item.changeCallback($event, item, formModel, formData)"
							:placeholder="item.placeholder?item.placeholder:item.label">
						</el-date-picker>
						<el-date-picker 
							:editable='dateEditable' 
							clearable v-else v-model="formData[item.prop]" 
							type="datetimerange" 
							:disabled='disable?disable:item.disable'
							:value-format="item.valFormat"
              :format='item.format'
              @change="item.changeCallback($event, item, formModel, formData)"
							range-separator="至" start-placeholder="开始日期" 
							end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="20">
					<el-form-item>
						<slot name="iform-btns"></slot>
					</el-form-item>
				</el-col>
			</el-row>
			
		</el-form>
	</div>
</template>

<script>
	import formGroup from './formGroup'
	export default {
		name:'iform',
		data(){
			return{
				formData:{},
				formModel:[],
				dateEditable:false
			}
		},
		props:{
			fields:{
				type:Array,
				default(){
					return []
				}
			},
			fieldData:{
				type:Object,
				default(){
					return {}
				}
			},
			rules:{
				type:Object,
				default(){
					return {}
				}
			},
			formName:{
				type:String,
				default(){
					return 'iFrom'
				}
			},
			labelWidth:{
				type:Number,
				default(){
					return 100
				}
			},
			inline:{
				type:Boolean,
				default(){
					return true
				}
			},
			disable:{
			  type: Boolean,
			  default () {
			    return false
			  }
			}
		},
		watch:{
			formData:{
				handler:function(val,oval){
			//	  console.log(val)
				  this.$emit('update:fieldData', val);
				},
				deep:true
			},
			fieldData:{
			  handler:function(val,oval){
          this.formData = val
          this.$emit('update:fieldData', val);
        },
        deep:true
      }
		},
		created(){
			this.createdData();
			if(!this.isEmptyObject(this.fieldData)){
			  this.formData = this.fieldData
			}
		},
		mounted(){
			this.$nextTick(() =>{
				this.$on('resetForm',function(){
					this.resetForm();
				})
			})
		},
		methods:{
			createdData() {
				let formData = {};
				this.fields.map(item => {
					if(item.group){
						item.childs.map(gItem =>{
							if(gItem.defaultValue != undefined) {
								formData[gItem.prop] = gItem.defaultValue
							} else {
								formData[gItem.prop] = '';
							};
							if(gItem.elemType == 'select' && !gItem.changeCallback){
                  gItem.changeCallback = () => {};
              }
							if(gItem.elemType=='datetimerange' && !gItem.changeCallback){
                  gItem.changeCallback = () => {};
              }
							if(gItem.elemType=='date' && !gItem.changeCallback){
                  gItem.changeCallback = () => {};
              }
						})
					}else{
						if(item.defaultValue != undefined) {
							formData[item.prop] = item.defaultValue
						} else {
							formData[item.prop] = '';
						};
					
						if(item.elemType == 'select' && !item.changeCallback){
                item.changeCallback = () => {};
            }
						if( item.elemType=='datetimerange' && !item.changeCallback){
                  item.changeCallback = () => {};
              }
						if(item.elemType=='date' && !item.changeCallback){
                  item.changeCallback = () => {};
              }
					}
				});
				var formModel = {...this.fields};
				this.formModel = formModel 
				this.$set(this,'formData',formData);
			},

			resetForm(){
				this.$refs[this.formName].resetFields();
				//this.formData = {}
			},
			resetForce() {
			  this.formData = {}
			},
			valiDate(){
				this.$refs[this.formName].validate((valid) => {
          if (valid) {
           	this.$emit('submitForm',this.formData);
          }
        });
			}
		},
		components:{
			'v-formGroup':formGroup
		}
		
	}
</script>

<style lang="scss">
	.iform{
	  box-sizing: border-box;
	  margin-bottom: 15px;
	  .el-form-item{
	    margin-bottom: 24px !important;
	  }
	  
		.el-input.cusInput{
			width: auto !important;
			input{
				padding: 0 23px !important;
			}
		}
		.el-form--inline .el-form-item{
      display: inline-block;
    }
	}
	
</style>