<template>
  <div class="clearfix _title">
    <h1>
      <slot name='title'></slot>
    </h1>
    <div class="btns">
      <slot name='btns'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageTitle'
  }
</script>

<style lang="scss" scoped>
._title{
  margin-bottom: 20px;
  border-bottom: 1px solid #DDDDDD;
  h1{
    float: left;
    margin: 0;
    span{
      font-size: 20px;
      font-weight: 200;
      padding: 10px 0;
      display: inline-block;
    }
  }
  .btns{
    padding: 10px 0;
    float: right;
    line-height:30px ;
  }
}
</style>