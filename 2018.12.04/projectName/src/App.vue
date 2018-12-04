<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
 
  @import './styles/index.scss'; // 全局自定义的css样式
  .icard{
  	margin-bottom: 15px;
  }
  #clz .el-button--danger{
    border-color: #f56c6c !important;
    color: #f56c6c;
  }
  #clz .el-button--danger:hover{
    background-color: #f56c6c !important;
    color: #fff;
  }
 .el-collapse-item__header{
    background-color: #F5F7FA;
  }
  .el-collapse-item__content{
    padding-top: 10px;
  }
  .required{
    position: relative;
    .el-form-item__label:before{
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  .el-collapse-item__header{
    text-indent: 15px;
  }
  
  .formGroup {
    .noRadiusRight input.el-input__inner {
        border-radius: 4px 0 0 4px;
    }
    .noRadiusLeft input.el-input__inner {
        border-radius: 0px 4px 4px 0;
        margin-left: -1px;
    }
    .noRadius {
        border-radius:  0 !important;
        margin-left: -1px;
    }
    .noRadiusRight.el-input__inner {
        border-radius: 4px 0 0 4px;
    }
    .noRadiusLeft.el-input__inner {
       border-radius: 0px 4px 4px 0;
        margin-left: -1px;
    }
}

.el-table__row.statics{
  td{
    color: orange;
    .link-type{
      color: orange;
    }
  }
}
.el-table__row.heightRed{
  td{
    color: firebrick;
    .link-type{
      color: firebrick;
    }
  }
}

.el-table__row{
  td{
    .link-type{
      display: inline-block;
      padding: 2px 15px;
    }
  }
}
tr.disable{
  opacity: 0.6;
}

.el-card{
  box-shadow: none !important;
  border: none;
}
.el-dialog__body{
  overflow: hidden;
}
.btns{
  .left{
    float: left;
    width: 50%;
  }
  .right{
    float: right;
    text-align: right;
    width: 50%;
  }
}
.el-loading-mask{
  right: -1px;
}
</style>


