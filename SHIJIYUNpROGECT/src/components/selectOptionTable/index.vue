<template>
    <div id="clz-select-table">
        <div class="clz-box">
            <span class="clz-pl" v-if="tagArray.length<=0">请选择</span>
            <template v-for="(tag,index) in tagArray">
                <span class="clz-tag">
                    {{tag[optionData.value]?tag[optionData.value]:tag}}
                    <i class="el-tag__close el-icon-close" @click="iconClose(index)"></i>
                </span>
            </template>
            <span class="clz-btn" @click="optionData.method">...</span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            selectOption:[Array],
            optionData: [Object],
        },
        data(){
            return{
                tagArray:[],
                selectOptionData:this.selectOption,
                optionDefaultData:this.optionData
            }
        },
        watch:{
            selectOption:{
                handler(curVal,oldVal){
                    this.tagArray = []
                    this.selectOptionData = curVal
                    this.getTag()
                },
                deep:true
            },
            optionData:{
                handler(curVal,oldVal){
                    this.tagArray = []
                    this.optionDefaultData = curVal
                    this.getTag()
                },
                deep:true
            }
        },
        methods:{
            getTag(){
                let selectOptionData  = this.selectOptionData;
                let optionData = this.optionDefaultData.option;
                for(let sel in selectOptionData){
                    if(optionData.length>0){
                        for(let op in optionData){
                            if(selectOptionData[sel] === optionData[op][this.optionDefaultData.key]){
                                this.tagArray.push(optionData[op])
                            }
                        }
                    }else{
                        this.tagArray.push(selectOptionData[sel])
                    }
                }
            },
            iconClose(i){
                this.$emit('close',this.tagArray[i]);
                this.tagArray.splice(i,1);
                let data = [];
                this.tagArray.forEach(res=>{
                    data.push(res[this.optionDefaultData.key])
                })
                this.$emit('update:selectOption',data);
            }
        },
        created(){
            this.getTag()
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
    #clz-select-table{
        position: relative;
        line-height: 0;
        .clz-box{
            border-radius: 4px;
            padding: 0 35px 0 5px;
            box-sizing: border-box;
            border: 1px solid #cccccc;
            position: relative;
            display: inline-block;
            width: 100%;
            min-height: 30px;
            margin: 4px 0;
        }
        .clz-tag{
            -webkit-box-sizing: border-box;
            margin:4px 5px;
            background-color: #f0f2f5;
            box-sizing: border-box;
            display: inline-block;
            padding: 0 10px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #7f7f80;
            border-radius: 4px;
            border: 1px solid #f0f2f5;
            white-space: nowrap;
            max-width: 60%;
            overflow: hidden;
            z-index: 2;
        }
        .clz-btn{
            cursor:pointer;
            margin:5px 5px;
            padding: 0 10px;
            z-index: 2;
            position: absolute;
            right: 0;
            top:0;
            height: 20px;
            line-height: 15px;
            color: #7f7f80;
            background-color: #f0f2f5;
        }
        .clz-input{
            padding: 0 15px;
            box-sizing: border-box;
        }

        .el-tag__close{
            background:#d4d4d4;
            border-radius: 50px;
            color: #ffffff;
            margin-left:3px;
            padding: 1px;
            font-size: 12px;
            cursor:pointer;
        }
        .el-tag__close:hover{
            background:#b3b3b3;
        }
        .clz-pl{
            height: 28px;
            line-height: 28px;
            margin-left: 10px;
            color: #9d9fa4;
        }
    }
</style>
