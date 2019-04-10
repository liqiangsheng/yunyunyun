<template>
    <div class="qrCodeBox">
         <div id="qrcode"></div>
         <div class="url">分享链接: <input id="input" :value="bookId">  <b @click="copy" class="cursor"> 复制链接</b></div>
    </div>


</template>
<script>
    import QRCode from 'qrcodejs2'
    export default {
        components:{QRCode},
        props:['bookId'],
        data() {
            return {

            }

        },
        methods: {
            copy(){
                var e=document.getElementById("input");//对象是input
                e.select(); //选择对象
                document.execCommand("Copy"); //执行浏览器复制命令
                alert("复制成功");
            },
            qrcode (message) {
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 设置宽度
                    height: 200, // 设置高度
                    text: message
                })
          },
        },
        mounted() {
                this.qrcode(this.bookId)
        },
        created(){
        }
    }
</script>
<style lang="scss" scoped>
.qrCodeBox{
    width: 100%;
    margin: 0 auto;
    #qrcode{
        width: 200px;
        height: 200px;
        margin: 0 auto;
        margin-top:25px ;
    }
    .url{
        width: 100%;
        text-align: center;
        margin-top: 20px;
        input{
            width: 700px;
        }
    }
}
</style>

