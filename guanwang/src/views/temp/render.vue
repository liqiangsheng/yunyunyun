<template>
	<div class="render">
		<v-expand ></v-expand>
	</div>
</template>

<script>
	import expand from '@/views/temp/expand'
	export default {
		name:'render',
		data(){
			return {
				
			}
		},
		components:{
			'v-expand':expand
		},
		props:{
			model:{
				type:Object,
				default(){
					return {}
				}
			}
		},

		
	}
</script>

<style>
</style>