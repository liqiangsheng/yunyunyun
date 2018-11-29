<template>
    <!--导出-->
    <div class="excelbox">
        <div class="excel_header">
            按年导出 <el-select v-model="getYear" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
        </div>
        <el-button type="primary" @click="okClick">确定导出</el-button>

    </div>
</template>


<script>

    export default {

        data() {
            return {
                options:["2018"],
                getYear:"",
            }
        },

        methods: {
            okClick(){//确定导出

            }
        }
    };
</script>

<style scoped lang="scss">
    .excelbox{
        width: 500px;
        height: 400px;
        position: relative;
        .excel_header{
            width: 250px;
            line-height: 50px;
        }
        .el-button{
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
</style>
