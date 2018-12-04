<template>
	<div class="formGroup">
		<el-form-item v-for="model in group " :key="model.key" :prop="model.key" >
			<el-input v-if=" model.elemType == 'input' "  :style="{width:model.width+'px'}"
				size="small" 
				v-model="formData[model.key]" 
				:placeholder="model.placeholder != undefined?model.placeholder: model.name">
			</el-input>
			<el-select v-else-if=" model.elemType == 'select' " :style="{width:model.width+'px'}"
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
			<el-input v-else-if=" model.elemType == 'textarea' " :style="{width:model.width+'px'}"
				type="textarea"  size="small" 
				v-model="formData[model.key]" 
				:placeholder="model.placeholder != undefined?model.placeholder: model.name"
				:prop="model.key">
			</el-input>
			<el-date-picker v-else-if=" model.elemType == 'date' " :style="{width:model.width+'px'}"
				clearable
				type="date" size="small" 
				v-model="formData[model.key]" 
				:placeholder="model.placeholder != undefined?model.placeholder: model.name"
				:prop="model.key">
			</el-date-picker>
			<el-date-picker v-else-if=" model.elemType == 'daterange' " :style="{width:model.width+'px'}"
				clearable
				type="daterange" 
				size="small" 
				v-model="formData[model.key]" 
				:placeholder="model.placeholder != undefined?model.placeholder: model.name"
				:prop="model.key">
			</el-date-picker>
		</el-form-item>
	</div>
</template>

<script>
	export default {
		name:'formGroup',
		data(){
			return {
				formData:{}
			}
		},
		props:{
			group:{
				type:Array,
				default(){
					return []
				}
			},
			groupData:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
	.formGroup{
		.el-form-item{
			display: inline-block;
		}
	}
</style>