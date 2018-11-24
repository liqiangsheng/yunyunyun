<template>
    <div class="previewAlter">
        <b><span></span>我是中国人</b>
        <img src="/static/images/loginBg.jpg" alt="">
        <p>我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国我是中国人，我我爱我的国</p>
    </div>
</template>


<script>

    export default {
        props:["preservationMessage"],
        data() {
            return {}
        },
        created(){
             console.log(this.preservationMessage);
        },
        methods: {

        }
    };
</script>

<style scoped lang="scss">
    .previewAlter{
        width: 100%;
        b{
            line-height: 24px;
             font-size: 16px;
            span{
                display: inline-block;
                width: 2px;
                height: 14px;
                background: black;
                margin-right: 10px;
            }
        }
        img{
            width: 100%;
            display: block;
            margin: 10px 0;
        }
        p{
            font-size: 14px;
            line-height: 24px;
        }
    }

</style>
