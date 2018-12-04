<template>
    <!--按年月查看-->
    <div class="lookbox">
        <div class="li3">
            <el-table
                    :data="dayList"
                    border
                    style="width: 100%">
                <el-table-column prop="date" width="100"></el-table-column>
                <el-table-column prop="name" label="作品写入量"  width="100"> </el-table-column>
                <el-table-column prop="name" label="写入率"  width="100"> </el-table-column>
            </el-table>

        </div>
    </div>
</template>


<script>

    export default {

        data() {
            return {
                dayList:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },

        methods: {

        }
    };
</script>

<style scoped lang="scss">
.lookbox{
    width: 100%;
    min-height:200px ;
    .li3{
        width: 100%;
    }
}
</style>
