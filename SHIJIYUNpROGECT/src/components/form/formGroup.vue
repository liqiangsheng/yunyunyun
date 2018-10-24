<template>
	<div class="formGroup" style="width: 100%;">
		<el-form-item v-for="(item,index) in group" class="group-item" :key="item.prop" :prop="item.prop" :label=" index == 0?label:''" :class="{noLabel:index>0}">
			<el-input 
				:class="item.classes"
				:style="{width:item.width+'px !important'}" 
				class="cusInput" v-if=" item.elemType == 'input' " 
				:disabled='item.disable'
				v-model="formData[item.prop]" 
				:placeholder="item.placeholder?item.placeholder:item.label">
				 <template slot="append" v-if="item.slot != undefined ">{{item.slot}}</template>
			</el-input>
			<el-input 
				:class="item.classes"
				:style="{width:item.width+'px !important'}" 
				:disabled='item.disable'
				type="textarea" v-else-if=" item.elemType == 'textarea' " 
				v-model="formData[item.prop]" 
				:placeholder="item.placeholder?item.placeholder:item.label">
			</el-input>
			<el-select 
				:class="item.classes"
				:style="{width:item.width+'px !important'}" 
				clearable v-else-if=" item.elemType == 'select' " 
				v-model="formData[item.prop]" 
				:disabled='item.disable'
				:placeholder="item.placeholder?item.placeholder:item.label"
				@change="item.changeCallback($event, item, group, formData)">
				<el-option 
					v-for=" option in item.options " 
					:key="option[item.colVal]"
					v-if="!option.disable"
					:label="option[item.col]" 
					:value="option[item.colVal]">
				</el-option>
			</el-select>
			<el-date-picker 
				:class="item.classes"
				:style="{width:item.width+'px !important'}" 
				:editable='dateEditable' clearable 
				v-else-if=" item.elemType == 'date' " 
				:format='item.format'
				:type="item.type" 
				:disabled='item.disable'
				v-model="formData[item.prop]"
				@change="item.changeCallback($event, item, group, formData)"
				:placeholder="item.placeholder?item.placeholder:item.label">
			</el-date-picker>
			<el-date-picker 
				:class="item.classes"
				:style="{width:item.width+'px !important'}" 
				:editable='dateEditable' clearable 
				:value-format="item.format"
				v-else-if="item.elemType == 'datetimerange'" 
				v-model="formData[item.prop]" 
				:format='item.format'
				:disabled='item.disable'
				type="datetimerange" range-separator="至" 
				 @change="item.changeCallback($event, item, group, formData)"
				start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
			<span v-else="item.type && item.type == 'append' " class="append">{{item.label}}</span>
		</el-form-item>
		
	</div>
</template>

<script>
	export default {
		name: 'formGroup',
		data() {
			return {
				dateEditable: false
			}
		},
		created(){
		},
		props: {
			group: {
				type: Array,
				default() {
					return [];
				}
			},
			formData: {
				type: Object,
				default() {
					return {}
				}
			},
			label: {
				type: String,
				default() {
					return ''
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.formGroup {
		.group-item {
			display: inline-block;
			vertical-align: top;
		}
		.noLabel {
			margin-left: -100px;
			.el-form-item__content {
				margin-left: 0 !important;
			}
		}
		.append{
			margin: 0 10px;
		}
		
	}
</style>