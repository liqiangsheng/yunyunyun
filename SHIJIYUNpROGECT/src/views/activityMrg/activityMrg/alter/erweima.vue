<template>
    <div class="qrCodeBox">
         <div id="qrcode"></div>
    </div>


</template>
<script>
    import QRCode from 'qrcodejs2'
    export default {
        components:{QRCode},
        props:['erweimaId'],
        data() {
            return {

            }

        },
        methods: {
            qrcode (message) {
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 设置宽度
                    height: 200, // 设置高度
                    text: message
                })
          },
        },
        mounted() {
                this.qrcode(this.erweimaId)

        },
        created(){
        }
    }
</script>
<style lang="scss" scoped>
.qrCodeBox{
    width: 200px;
    margin: 0 auto;
    #qrcode{
        margin: 0 auto;
        margin-top:25px ;
    }
}
</style>

