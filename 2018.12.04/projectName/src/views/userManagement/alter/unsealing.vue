<template>
    <ul  class="disabled">
        <li>正在封禁用户： 李雷雷（U10000996）</li>
        <li>
            请填写封禁备注
            <el-input type="textarea"
                      :rows="5"
                      placeholder="请输入封禁备注"
                      v-model="textareaValue">
            </el-input>
        </li>
        <li>
            <el-button type="primary" @click="oKClick()">确定</el-button>
        </li>
    </ul>
</template>


<script>

    export default {
        data() {
            return {
                timeValue:new Date(), // 封禁时间
                textareaValue:"", //请输入封禁备注
            }
        },

        methods: {
            oKClick(){ //确定
                this.$emit("unsealingIs",false)
            }
        }
    };
</script>

<style scoped lang="scss">
    .disabled{
        width: 100%;
        height: 200px;
        li{
            width: 100%;
            margin-top: 10px;
            .el-date-editor{
                width: 300px;
                margin-left: 20px;
            }
            .el-button{
                margin-top: 10px;
                float: right;
            }
        }
    }
</style>
