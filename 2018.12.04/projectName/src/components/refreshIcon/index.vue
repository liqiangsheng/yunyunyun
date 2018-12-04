<template>
    <div id="refresh" @click="refresh()" :class="{'el-icon-refresh':true,'el-icon-refreshRotate':isActive,'el-icon-refreshRotateStart':!isActive}" ></div>
</template>
<script>
    export default {
        props:["tableKey"],
        data() {
            return {
                isActive:false,
                myTableKey:this.tableKey,
            }
        },
        methods:{
            refresh(){
                let _this =this;
                this.isActive=true;
                let refresh = setInterval(function(){
                    _this.isActive=false;
                    clearInterval(refresh);
                },300);
                this.$emit('refreshTable');
                this.myTableKey = this.myTableKey+1;    //更新表格key
                this.$emit('tableKey', this.myTableKey);    //修改父组件值
            }
        },
        destroyed(){
            this.$off('refreshTable');
        }
    }
</script>
<style scoped>
    #refresh{
        display:inline-block;
        cursor:pointer;
        height: 30px;
        /*position: absolute;*/
        margin-left: -18px;
        color: #5a5e66;
    }
    .el-icon-refresh {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
    }
    .el-icon-refresh::before{
        line-height: 30px;
    }

    .el-icon-refreshRotate{
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
        -moz-transform: rotate(-360deg);
        -o-transform: rotate(-360deg);
        -ms-transform: rotate(-360deg);
    }
    .el-icon-refreshRotateStart{
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
    }
</style>