<template>
	<div class="form">
		<el-card>
			<el-form :inline="inline" :model="formData" v-if="formModel.length>0" :rules="rules" label-width="100px" :id="formName" :ref="formName">
				
						<el-form-item v-for="model in formModel" v-if="!model.isGroup"  :label="model.name" :key="model.key" :prop="model.key" >
							<el-input v-if=" model.elemType == 'input' "  
								size="small" 
								v-model="formData[model.key]" 
								:placeholder="model.placeholder != undefined?model.placeholder: model.name">
							</el-input>
							<el-select v-else-if=" model.elemType == 'select' " 
								clearable
								size="small" 
								v-model="formData[model.key]" 
								:placeholder="model.placeholder != undefined?model.placeholder: model.name"
								:prop="model.key">
								<el-option v-for=" (opt,index) in model.child " 
									:value="opt[model.colValue]" 
									:label="opt[model.colName]"
									:key="index">
								</el-option>
							</el-select>
							<el-input v-else-if=" model.elemType == 'textarea' " 
								type="textarea"  size="small" 
								v-model="formData[model.key]" 
								:placeholder="model.placeholder != undefined?model.placeholder: model.name"
								:prop="model.key">
							</el-input>
							<el-date-picker v-else-if=" model.elemType == 'date' " 
								clearable
								type="date" size="small" 
								v-model="formData[model.key]" 
								:placeholder="model.name"
								:prop="model.key">
							</el-date-picker>
							<el-date-picker v-else-if=" model.elemType == 'daterange' " 
								clearable
								type="daterange" 
								size="small" 
								v-model="formData[model.key]" 
								:placeholder="model.placeholder != undefined?model.placeholder: model.name"
								:prop="model.key">
							</el-date-picker>
						</el-form-item>
			
						<el-form-item  :label="model.name" :key="model.key" :prop="model.key" v-else>
							<v-formGroup :group="model.group" :groupData='model.groupData'></v-formGroup>
					    </el-form-item>
					
				
				
				<el-form-item @click.native="_formEvent">
					<slot name="query"></slot>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import formGroup from '@/views/temp/formGroup'
	export default {
		name: 'iform',
		components:{
			'v-formGroup':formGroup
		},
		data(){
			return {
				formModel:[],
				formData:{}
			}
		},
		watch:{
			formData:{
				handler:function(val,oval){
					this.$emit('update:fieldFrom', val);
				},
				deep:true
			},
			fieldFrom(val, oval) {
				this.formData = val;
				if(this.isObject(val)) {
					this.initFormData = this.clearObj(val);
				}
			},
		},
		props: {
			inline: {
				type: [String, Boolean],
				default() {
					return true
				}
			},
			fields: {
				type: Array,
				default() {
					return []
				}
			},
			fieldFrom: {
				type: Object,
				default() {
					return {}
				}
			},
			rules:{
				type:Object,
				default(){
					return {};
				}
			},
			formName:{
				default(){
					return 'iform'
				}
			}
		},
		created(){
			this._createdData();
		},
		methods:{
			
			_createdData() {
				let formData = {};
				this.fields.map(item => {
					if(item.defaultValue != undefined) {
						formData[item.key] = item.defaultValue
					} else {
						formData[item.key] = '';
					};
					if(item.typeElem == 'select' && !item.changeCallback){
                        item.changeCallback = () => {};
                    }
				});
				this.formModel = this.fields;
				this.$set(this, 'formData', formData);
			},

			
			_formEvent(event) {
				var name = event.target.name;
				var parentNodeName = event.target.parentNode.attributes.name ? event.target.parentNode.attributes.name.nodeValue : '';
				if(name == "reset" || parentNodeName == 'reset') {
					this.$refs[this.formName].resetFields();
				};
				if(name == 'save' || parentNodeName == 'save') {
					this.$refs[this.formName].validate((valid) => {
						if(valid) {
							
							this.$emit('update:validate', 'success');
						} else {
							this.$emit('update:validate', 'error');
						}
					});
				}
			}
		}
		
	}
</script>

<style  lang="scss"></style>