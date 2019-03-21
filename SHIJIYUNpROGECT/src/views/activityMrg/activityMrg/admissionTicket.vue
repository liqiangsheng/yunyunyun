<template>
    <div class="admissionTicket">
        <div class="table__header">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column width="60" label="序号">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column width="50" label="活动标记">
                    <template slot-scope="scope">
                       {{!!scope.row.multiActivity?'多':'单'}}
                    </template>
                </el-table-column>
                <el-table-column width="240" label="活动号">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column width="240" label="活动名称">
                    <template slot-scope="scope">
                        {{scope.row.title}}
                    </template>
                </el-table-column>
                <el-table-column width="120" label="付款时效(分钟)">
                    <template slot-scope="scope">
                        {{!!scope.row.payExpired?scope.row.payExpired:0}}
                    </template>
                </el-table-column>
                <el-table-column width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="$router.go(-1)">
                            返回活动列表
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

         <div class="admissionTicketTitle">
             费用及组合票管理
         </div>

         <div class="admissionTicket_table">
             <el-table :data="tableList" style="width: 100%">

                 <el-table-column width="50" label="活动标记">
                     <template slot-scope="scope">
                         <template slot-scope="scope">
                            {{!!scope.row.multiActivity?'多':'单'}}
                         </template>
                     </template>
                 </el-table-column>
                 <el-table-column width="180" label="活动号">
                     <template slot-scope="scope">
                         {{scope.row.id}}
                     </template>
                 </el-table-column>
                 <el-table-column width="180" label="活动名称">
                     <template slot-scope="scope">
                         {{scope.row.title}}
                     </template>
                 </el-table-column>
                 <el-table-column width="100" label="原价">
                     <template slot-scope="scope">
                         <el-input type="number" min="0" v-model="scope.row.originalPrice"  width="80"></el-input>
                     </template>
                 </el-table-column>
                 <el-table-column width="100" label="优惠价">
                     <template slot-scope="scope">
                         <el-input type="number" min="0" v-model="scope.row.payPrice"  width="80"></el-input>
                     </template>
                 </el-table-column>
                 <el-table-column width="240" label="组合1　组合2　组合3　组合4">
                     <template slot-scope="scope">
                         <el-checkbox v-model="scope.row.check0" :disabled="tableList1.length>=1?false:true" @change="checkCliclk($event,0,scope.$index)"></el-checkbox>
                         <el-checkbox v-model="scope.row.check1"  :disabled="tableList1.length>=2?false:true" @change="checkCliclk($event,1,scope.$index)"></el-checkbox>
                         <el-checkbox v-model="scope.row.check2"  :disabled="tableList1.length>=3?false:true"  @change="checkCliclk($event,2,scope.$index)"></el-checkbox>
                         <el-checkbox v-model="scope.row.check3"  :disabled="tableList1.length>=4?false:true" @change="checkCliclk($event,3,scope.$index)"></el-checkbox>
                     </template>
                 </el-table-column>

                 <el-table-column width="120" label="组合备注">
                     <template slot-scope="scope">

                     </template>
                 </el-table-column>
                 <el-table-column width="120" label="组合状态">
                     <template slot-scope="scope">

                     </template>
                 </el-table-column>
                 <el-table-column width="60" label="操作">

                 </el-table-column>
             </el-table>
         </div>

         <div>
             <el-table :data="tableList1" style="width: 100%">
                  <el-table-column width="50">
                      <template slot-scope="scope">
                          组合
                      </template>
                  </el-table-column>
                  <el-table-column width="180">
                      <template slot-scope="scope">
                          {{scope.row.id}}
                      </template>
                  </el-table-column>
                  <el-table-column width="180">
                      <template slot-scope="scope">
                          <el-input type="text" min="0" v-model="scope.row.name"  width="80"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column width="100">
                      <template slot-scope="scope">
                          <el-input min="0"  v-model="scope.row.originalPrice" width="80"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column width="100">
                      <template slot-scope="scope">
                          <el-input type="number" min="0" v-model="scope.row.payPrice"  width="80"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column width="240">
                      <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.check0" disabled></el-checkbox>
                          <el-checkbox v-model="scope.row.check1" disabled></el-checkbox>
                          <el-checkbox v-model="scope.row.check2" disabled></el-checkbox>
                          <el-checkbox v-model="scope.row.check3" disabled></el-checkbox>
                      </template>
                  </el-table-column>

                  <el-table-column width="120">
                      <template slot-scope="scope">
                          <el-input  width="100" v-model="scope.row.groupRemark"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column width="120">
                      <template slot-scope="scope">
                              <el-select v-model="scope.row.openStatus" placeholder="请选择">
                                  <el-option
                                          v-for="item in scope.row.statusStateList"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                  </el-option>
                              </el-select>
                      </template>
                  </el-table-column>
                     <el-table-column width="120">
                         <template slot-scope="scope">
                             <span @click="delClick(scope.$index)" style="color: red">删除</span>
                         </template>
                     </el-table-column>
              </el-table>

         </div>
        <div class="admissionTicket_foot">
            <el-button type="primary" @click="addClick">
                增加组合
            </el-button>
            <el-button type="primary" @click="preservation">
              保存
            </el-button>
        </div>
    </div>


</template>
<script>
               //组合票查询              //更新
    import {activityInfofindOneWithGoods,activityInfofindOneupdateOneWithGoods} from '../../../api/activityMrg/activityMrg'
    export default {
        data() {
            return {
                tableData:[],// 活动信息
                tableList:[],//标准票
                tableList1:[],//组合票
            }

        },
        watch:{

        },
        methods: {
            preservation(){//保存
                let arr = JSON.stringify(this.tableList);
                let arr2 = this.tableList;
                let activityGoodsVoList =  arr2.map((item,index,arr2)=>{
                    console.log(item,"dgsagdhashjdja")
                    return{"id":item.id,"originalPrice": item.originalPrice,"payPrice": item.payPrice, "sort": index}
                });
                let arr1 = JSON.parse(arr);
                console.log(arr1,"")
//                this.tableList1
                    let arr3 =this.tableList1;
                 let objData=arr3.map((item,index,arr3)=>{
                    let activityGoodsIdList = arr1.map((item1,index1,arr1)=>{
                           if(item['check'+index]==true){
                               return item1.id
                           }
                    })
                    return {
                        "name":item.name,
                        "originalPrice": item.originalPrice,
                        "payPrice": item.payPrice,
                        "sort": index,
                        "groupRemark": item.groupRemark,
                        "openStatus":item.openStatus=='打开'?1:0,
                        "activityGoodsIdList": activityGoodsIdList}
                })
                let flag = true;
                objData.forEach((item,index)=>{
                     console.log(item)
                     if(!item.activityGoodsIdList[0]){
                         this.$message.warning('你的组合票未选择活动');
                         flag = false
                         return
                     }
                })
             if(!!flag){
                 // console.log(activityGoodsVoList,"activityGoodsVoList")
//                console.log(objData,"activityGoodsIdList")
////                console.log(arr2,"activityGoodsIdList")
////                console.log(arr3,"arr3")
                 let obj = {
                     id:this.$router.history.current.query.id,
                     activityGoodsVoList:activityGoodsVoList,
                     activityGoodsGroupVoList:objData?objData:[],
                 }
                 activityInfofindOneupdateOneWithGoods(obj).then(res=>{
                     console.log(res,"activityInfofindOneupdateOneWithGoods")
                     if(res.data.status == true){
                         this.$message.warning("保存成功");
                         this.query();
                     }else{
                         this.$message.warning(res.data.message);
                     }
                 })
             }
            },
            checkFun(item,index){ //门票方法封装
                if(this.tableList1.length<=index){
                    this.$message.warning('请至少添加'+(index+1)+'组组合票');
                    return;
                }
                let flag1 =false;
                this.tableList.forEach((v,i)=>{
                    if(v['check'+index]==true){
                        flag1 = true
                    }
                })
                if(flag1==false){
                    this.tableList1[index]['check'+index] = false;
                }else{
                    this.tableList1[index]['check'+index]  = true;
                }
                this.tableList1.splice(this.tableList1.length,0)
            },
            checkCliclk(item,index,i){ //点击活动去组合
                console.log(index,"index")
                if(index==0){
                    this.checkFun(item,index);
                }
                if(index==1){
                    this.checkFun(item,index);
                }
                if(index==2){
                    this.checkFun(item,index);
                }
                if(index==3){
                    this.checkFun(item,index);
                }
            },
            delClick(i){ //删除组合
                console.log(i)
                this.$confirm('此操作删除该组合, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableList1.splice(i,1);
                    this.tableList.forEach((item,index)=>{
                        item['check'+i]=false;
                    })
                    this.tableList.splice(this.tableList.length,0)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addClick(){ //增加组合
              if(this.tableList1.length>4){
                  this.$message.warning('最多能有4个组合')
              }else{
                  this.tableList1.push({
                      check0:false,
                      check1:false,
                      check2:false,
                      check3:false,
                      statusStateList:[
                          {lebal:1,value:'打开'},
                          {lebal:0,value:'关闭'}
                      ],
                      "name":"标题",
                      "originalPrice": "0",
                      "payPrice": "0",
                      "sort": 0,
                      "groupRemark": "备注",
                      "openStatus": "打开",
                      "activityGoodsIdList": []
                  })
              }
            },
            query(){
                activityInfofindOneWithGoods(this.$router.history.current.query.id).then(res=>{
                    console.log(res,"201903131130302096615ab5ad4f8b93c1b79c9f6c84f1")
                    if(res.data.status==true){
                        this.tableData = [res.data.data];
                        if(res.data.data.activityGoodsGroupVoList.length>0){//多活动
                            res.data.data.activityGoodsGroupVoList.forEach((item,index)=>{
                                item.check0=false;item.check1=false;item.check2=false;item.check3=false;
                                if(item.groupRemark){
                                    item.groupRemark=  item.groupRemark;
                                }else{
                                    item.groupRemark= '';
                                }
                                item.statusStateList=[
                                    {lebal:1,value:'打开'},
                                    {lebal:0,value:'关闭'}
                                ];
                                if(item.openStatus == 1||item.openStatus == true){
                                    item.openStatus = '打开'
                                }else {
                                    item.openStatus = '关闭'
                                }
                                item.title = res.data.data.title;
                                item.multiActivity = res.data.data.multiActivity;
                            })
                        }

                        res.data.data.activityGoodsVoList.forEach((item,index)=>{ // 单活动
                            item.title = res.data.data.title;
                            item.check0=false;item.check1=false;item.check2=false;item.check3=false;item.disabled=false;
                            item.multiActivity = res.data.data.multiActivity;
                        })
                        setTimeout((item,index)=>{
                            this.tableList =res.data.data.activityGoodsVoList;//单
                            this.tableList1 =res.data.data.activityGoodsGroupVoList;//多
                            let flag1 =false;
                            if(this.tableList1&&this.tableList1.length>0){
                                this.tableList1.forEach((item,index)=>{
                                    this.tableList.forEach((item2,index2)=>{
                                          item.activityGoodsIdList.forEach((item1,index1)=>{
                                           if(item2.id==item1){
                                               item2['check'+index] = true;
                                           }
                                            if(item2['check'+index]==true){
                                                flag1 = true
                                            }
                                            if(flag1==false){
                                                this.tableList1[index]['check'+index] = false;
                                            }else{
                                                this.tableList1[index]['check'+index]  = true;
                                            }
                                        })
                                    })
                                })
                            }
//                            this.tableList1.splice(this.tableList1.length,0)
                        },0)


                    }else{

                    }
                })
            },
        },
        mounted() {
           this.query();
        },
        created(){


        }
    }
</script>
<style lang="scss" scoped>
.admissionTicket{
    width: 100%;
    background: #ffffff;
    .table__header{
        width: 100%;
    }
    .admissionTicketTitle{
        width:100%;
        height: 100px;
        box-sizing: border-box;
        padding: 50px 10px 0 10px;
        font-size: 18px;
        font-weight: 800;
    }
    .admissionTicket_table{
        width: 100%;
    }
    .admissionTicket_foot{
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        padding:20px 0 0 10px ;
    }
}
</style>

