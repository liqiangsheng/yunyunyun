<template>
    <div class="qrCodeBox">
         <div id="qrcode"></div>
    </div>


</template>
<script>
    import QRCode from 'qrcodejs2'
    export default {
        components:{QRCode},
        props:['activityID'],
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
            if(_Host.LOGIN_API=='http://172.16.0.14:10019'||_Host.LOGIN_API=='http://172.16.0.54:10019'){
                this.qrcode("http://172.16.0.55:8080/#/home?id="+this.activityID)
            }else{
                this.qrcode("https://dcloud.butongtech.com/#/home?id="+this.activityID)
            }

        },
        created(){
            console.log("http://172.16.0.55:8080/#/home?id="+this.activityID)
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

