<template>
    <div id="welcomeImageBox">
        <div id="welcomeImage">
            <img src="../../assets/images/wl.png" class="logo-img">
            <br/>
            <span class="name">欢迎使用云驾培V2.0</span>
        </div>
    </div>
</template>

<style>
    .logo-img{ margin:0 auto;}

    #welcomeImage{margin: auto;top: -20%;right: 0;left: 0;bottom: 0;position: absolute;width: 230px;height: 100px;text-align: center;}
    #welcomeImage .name{color:#41bdc7;font-size:24px;margin-top: 10px;display: inline-block;}
</style>

<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'sidebar'
            ])
        },
        data() {
            return {}
        },
        created(){

        },
        mounted(){

            let boxHeight = $(".content-container").height()-70;
            $("#welcomeImageBox").height(boxHeight)
        }
    }

</script>