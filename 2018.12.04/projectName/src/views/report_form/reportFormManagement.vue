<template>
  <!--16 报表管理-->
  <div class="main-box">
       <div class="reportForm_header">
            <b>注册用户量：</b>
           <b>2000亿</b>
         <el-button type="primary">用户量变化监测</el-button>
       </div>
    <ul>
      <li class="li1">
          <b>一周内日增用户量</b>
          <el-table
                  :data="dayList"
                  border
                  style="width: 100%">
              <el-table-column prop="date" width="100"></el-table-column>
              <el-table-column prop="name" label="用户量"  width="100"> </el-table-column>
          </el-table>
      </li>
      <li class="li1">
          <b>一周内日活人数</b>
          <el-table
                  :data="dayList1"
                  border
                  style="width: 100%">
              <el-table-column prop="date" width="100"></el-table-column>
              <el-table-column prop="name" label="日活人数"  width="100"> </el-table-column>
          </el-table>
      </li>
      <li class="li4">
          <b>周用户留存率</b>
          <el-table
                  :data="dayList2"
                  border
                  style="width: 100%">
              <el-table-column prop="date" width="100"></el-table-column>
              <el-table-column prop="name" label="新进用户"  width="100"> </el-table-column>
              <el-table-column prop="name" label="活跃用户"  width="100"> </el-table-column>
              <el-table-column prop="name" label="留存率"  width="100"> </el-table-column>
          </el-table>
          <span>（14天前至7天前新进用户留存率）</span>
      </li>
      <li class="li3">
          <b>一周内原创内容写入率</b>
          <el-table
                  :data="dayList3"
                  border
                  style="width: 100%">
              <el-table-column prop="date" width="100"></el-table-column>
              <el-table-column prop="name" label="作品写入量"  width="100"> </el-table-column>
              <el-table-column prop="name" label="写入率"  width="100"> </el-table-column>
          </el-table>

      </li>

    </ul>
      <div class="li5">
          <el-button type="primary" @click="lookClick(num='1')">按月查看</el-button>
          <el-button type="primary" @click="excelClick">导出Excel</el-button>
      </div>

      <ul>
          <li class="li1">
              <b>月增用户量</b>
              <el-table
                      :data="dayList4"
                      border
                      style="width: 100%">
                  <el-table-column prop="date" width="100"></el-table-column>
                  <el-table-column prop="name" label="用户量"  width="100"> </el-table-column>
              </el-table>
          </li>
          <li class="li1">
              <b>月活人数</b>
              <el-table
                      :data="dayList5"
                      border
                      style="width: 100%">
                  <el-table-column prop="date" width="100"></el-table-column>
                  <el-table-column prop="name" label="日活人数"  width="100"> </el-table-column>
              </el-table>
          </li>
          <li class="li4">
              <b>月用户留存率</b>
              <el-table
                      :data="dayList6"
                      border
                      style="width: 100%">
                  <el-table-column prop="date" width="100"></el-table-column>
                  <el-table-column prop="name" label="新进用户"  width="100"> </el-table-column>
                  <el-table-column prop="name" label="活跃用户"  width="100"> </el-table-column>
                  <el-table-column prop="name" label="留存率"  width="100"> </el-table-column>
              </el-table>
          </li>
          <li class="li3">
              <b>月原创内容写入率</b>
              <el-table
                      :data="dayList7"
                      border
                      style="width: 100%">
                  <el-table-column prop="date" width="100"></el-table-column>
                  <el-table-column prop="name" label="作品写入量"  width="100"> </el-table-column>
                  <el-table-column prop="name" label="写入率"  width="100"> </el-table-column>
              </el-table>
          </li>

      </ul>
      <div class="li5">
          <el-button type="primary" @click="lookClick(num='2')">按年查看</el-button>
          <el-button type="primary" @click="excelClick">导出Excel</el-button>
      </div>
      <!--按年查看-->
      <el-dialog :append-to-body="true" class="dialog" title="" :visible.sync="lookShow" :close-on-click-modal="true" width="860px" top="10%">
          <LookAlter></LookAlter>
      </el-dialog>

  </div>
</template>

<script>
import Excel from "./alter/excelAlter.vue"
import LookAlter from './alter/lookAter.vue'
export default {
    components:{
        Excel,LookAlter
    },
    data () {
        return {
            excelShow:false, //导出显示
            lookShow:false, //按年查看
            dayList:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList1:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList2:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList3:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList4:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList5:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList6:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dayList7:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],

        }
    },
    mounted(){

    },
    methods: {
        lookClick(v){//按年查看
          this.lookShow = !this.lookShow
        },
        excelClick(){ //导出
            this.excelShow = !this.excelShow;
        }
    }
}
</script>

<style lang="scss" scoped="">
 .reportForm_header{
   width: 100%;
   height: 100px;
   line-height: 100px;
   padding-left: 20px;
   background: rgba(5,5,9,0.3);
   b{
     margin-right: 20px;

   }
 }
ul{
    width:100% ;
    background: #ffffff;
    padding: 20px;
    overflow: hidden;
    li{
       float: left;
    }
    .li1{
      width: 202px;
        background: #ffffff;
        margin: 10px;
        b{
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
        }
    }
    .li4{
        width: 402px;
        background: #ffffff;
        margin: 10px;
        b{
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
        }
        span{
            width: 100%;
            text-align: center;
            display: inline-block;
        }
    }
    .li3{
        width: 302px;
        background: #ffffff;
        margin: 10px;
        b{
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
        }

    }

}
 .li5{
     line-height: 50px;
     padding: 0 20px;
 }
</style>


