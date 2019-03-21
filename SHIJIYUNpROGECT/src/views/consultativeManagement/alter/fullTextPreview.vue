<template>
    <!--全文预览-->
    <div class="fullTextPreview">
           <b><span></span>{{fullTextPreviewObj.title}}</b>
    </div>
</template>


<script>

    export default {
        props:["fullTextPreviewObj"],
        data() {
            return {}
        },
        created(){

        },
        methods: {

        }
    };
</script>

<style scoped lang="scss">
 .fullTextPreview{
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
 }

</style>
