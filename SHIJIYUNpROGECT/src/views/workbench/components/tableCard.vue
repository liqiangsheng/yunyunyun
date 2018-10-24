<template>
	<div class="tableCard">
		<div class="card-header clearfix">
			<div class="table-line">
				<div class="table-name">
					<slot name="tableName"></slot>
				</div>
				<div class="btn-Group">
					<slot name="btnGroup"></slot>
				</div>
			</div>
		</div>
		<div class="card-body">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name:'tableCard',
		data(){
			return{}
		},

	}
</script>

<style lang="scss" scoped>
.tableCard{
	.card-header{
		padding: 10px;
		.table-line{
			border-bottom: 1px solid #dedede;
			width: 100%;
			height: 30px;
			line-height: 30px;
		}
		.table-name{
			float: left;
		}
		.btn-Group{
			float: right;
		}
	}
	.card-body{
		padding: 10px;
	}
}

</style>
