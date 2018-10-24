<template>
  <el-dialog :append-to-body='true' 
    title='打印预览' 
    :visible.sync="dialog.visible" 
    class='dialog print'
    @close='_cancel'
    width='1300px'
    :close-on-click-modal="true" top="10%" >
    <div >
      <div class="print_header" align="center">
        <el-button type='primary' size='small' class='btn-active' @click="_print">打印</el-button>
        <el-button type='primary' size='small' @click="_cancel">关闭</el-button>
      </div>
      <div class="searchModel">
        <slot name='search'></slot>
      </div>
      <div class="print-content" style="width: 100%;" >
        <v-imgPrint :data='data' class='_printContent' ref='printContent' v-if='printType === "barcode"'></v-imgPrint>
        <v-normal :data='data' class='_printContent' @refresh='_refreshTable' :title='title' ref='printContent' v-if='printType === "normal"'></v-normal>
        <v-bill :data='data' class='_printContent' @refresh='_refreshTable' :title='title' ref='printContent' v-if='printType === "bill"'></v-bill>
      </div>
    </div>
  </el-dialog>
  
</template>

<script>
  export default {
    name: 'print',
    data () {
      return {
        dialog: {
          visible: true
        },
        printType: ''
      }
    },
    watch: {},
    created () {
      this.printType = this.type
    },
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      type: {
        type: String,
        default () {
          return ''
        }
      },
      title: {
        type: String,
        default () {
          return ''
        }
      }
    },
    methods: {
      _print() {
        this.$refs.printContent.printView()
      },
      _cancel() {
        this.$emit('printClose')
      },
      _refreshTable (formData) {
        this.$emit('refresh', formData)
      },
      closeLoading () {
        this.$refs.printContent.closeLoading()
      }
    },
    components:{
      'v-imgPrint': (resolve) => {require(['./barcodePrint'], resolve)},
      'v-normal': (resolve) => {require(['./normal'], resolve)},
      'v-bill': (resolve) => {require(['./bill'], resolve)}
    }
  }
</script>

<style scoped lang="scss">
.print{
  .print_header{
    margin-bottom: 20px;
  }

}
</style>