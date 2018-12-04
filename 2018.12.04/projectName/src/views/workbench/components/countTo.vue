<template>
	<div class="countTo">
		<div class="box">
			<div class="count">{{count}}<slot ></slot></div>
			<slot name="desc"></slot>
		</div>

		<div class=" icon-box">
			<slot name="icon"></slot>
		</div>

	</div>
</template>

<script>
	export default{
		name:"countTo",
		data(){
			return {
				count:0,
				timer:null
			}
		},
		props:{
			startVal:{
				type:[Number,String],
				default(){
					return 0
				}
			},
			endVal:{
				type:[Number,String],
				default(){
					return 0
				}
			},
			duration:{
				type:[Number,String],
				default(){
					return 500
				}
			}
		},
		watch:{
			endVal:{
				handler(val,oval){
					this._countTo();
				}
			},deep:true
		},
		mounted(){
			this.$nextTick(() =>{
				this._countTo();
			})
		},
		methods:{
			_countTo(){
				var speed = Math.floor((this.endVal - this.startVal)/(this.duration/20));
				if(speed<1){
					this.count = this.endVal;
				}else{
					var buffer = 0;
					this.timer = null;
					this.timer = setInterval(() =>{
						buffer += speed;
						if(buffer >= this.endVal){
							window.clearInterval(this.timer);
							this.count = this.endVal;
						}else{
							this.count = buffer;
						}
					},20)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	p{
		margin: 0;
		padding: 0;
	}
.countTo{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 8px;
	padding: 15px 0;
	.icon-box{
		width: 80px;
		padding: 5px 5px;
		text-align: center;
		//border-right: 1px solid #fff;
		img{
			display: inline-block;
			vertical-align: middle;
			height: 22px;
		}
	}
	.box{
		margin-left: 10%;
		flex: 1;
		box-sizing: border-box;
		.icon{
			width: 48px;
			height: 48px;
			overflow: hidden;
			display: -webkit-box;
			justify-content: center;
			align-items: center;
		}
		.count{
			font-family: PingFangSC-Medium;
			font-size: 32px;
			color: #FFFFFF;
			display: inline-block;
			font-weight: 400 !important;
			span{
				font-size: 18px;
			}
		}
		.desc{
			font-family: MicrosoftYaHei;
			font-size: 14.4px;
			color: #FFFFFF;
			padding-left: 2px;
		}
	}
}
</style>