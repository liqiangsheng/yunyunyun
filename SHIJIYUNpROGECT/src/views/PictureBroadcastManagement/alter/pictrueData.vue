<template>
    <div class="hotPictureData boxSizing">
        <draggable :list="hotPictureData" :options="{sort: true}"
                   @end="end"
                   class="dragArea clearfix">
            <div v-for="(item,index) in hotPictureData" :key="index" class="list-complete-item clearfix border1px" >
                <div class="dragItem relative">
                    <div class="dragTop relative" @click="singleClick(item,index)">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="dragFoot boxSizing">
                        <span>{{index+1}}</span>
                    </div>
                </div>
            </div>
        </draggable>
        <div class="foot">
            <el-button type="primary" plain @click="sortClick">确定排序并且返回</el-button>
        </div>
    </div>

</template>
<script>
    import draggable from 'vuedraggable' //拖拽插件
    export default {
        props:['hotPictureData'],
        components:{
            draggable
        },
        data() {
            return {

            }
        },
        created(){
          console.log(this.hotPictureData)

        },
        methods: {
            sortClick(){
                this.$emit('hotData',this.hotPictureData)
            },
            singleClick(item,index){//单击 图片放大窗口打开
                window.open(item.imageUrl, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')
            },
            end(){

            },
        }
    };
</script>

<style scoped lang="scss">
.hotPictureData{
    width: 100%;
    .dragArea{
        width: 100%;
        .list-complete-item{
            width: 120px;
            height: 150px;
            float: left;
            margin: 10px 0 0 10px;
            .dragItem{
                width: 100%;
                .dragTop{
                    width: 100%;
                    height: 100px;
                    img{
                        width: 100%;
                        height: 100px;
                        display: block;
                    }
                }
                .againBox{
                    width: 55px;
                    height: 16px;
                    font-size: 10px;
                    right: 0;
                    top: 0;
                    z-index: 1;
                    input{
                        width: 100%;
                        height: 16px;
                        left: 0;
                        top:0;
                        z-index: 1;
                        opacity: 0;
                    }
                }

                .dragFoot{
                    width: 100%;
                    height: 30px;
                    margin-top: 20px;
                    display: flex;
                    span{
                        flex: 1;
                        padding: 0 10px;
                    }
                }

            }
        }
    }
    .foot{
        width: 100%;
        margin-top: 20px;
        padding-left: 38%;
    }
}
</style>
