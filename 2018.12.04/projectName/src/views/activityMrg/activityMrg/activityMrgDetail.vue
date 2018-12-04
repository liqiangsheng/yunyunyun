<template>
    <!--活动详情查询-->
    <div class="activitydetailBox">
        <div class="activityBox">
           <div class="activityBoxLeft">
              活动项：
           </div>
            <div class="activityBoxRight">
               <table class="activityBoxtable">
                   <thead>
                       <tr>
                           <th width="90">活动号</th>
                           <th width="240">活动名称</th>
                           <th width="90">地点</th>
                           <th width="110">时间</th>
                           <th width="90">收藏</th>
                           <th width="90">报名</th>
                           <th width="90">评论</th>
                           <th width="90">状态</th>
                           <th width="110">报名时间</th>
                           <th width="90">费用</th>
                           <th width="90">管理部门</th>
                           <th width="90">活动审核</th>
                           <th width="90">操作</th>
                           <th width="90">报名入口</th>
                           <th width="90">人脸识别</th>
                           <th width="90">购买设置</th>
                           <th width="90">门票备注</th>
                       </tr>
                   </thead>
                   <tbody>
                     <tr>
                         <td width="90">S10000011</td>
                         <td width="240">第十一届中国（深圳）国际文化产业博览交易会中芬设计园分会场</td>
                         <td width="90">深圳</td>
                         <td width="110">从 2018-11-06 </td>
                         <td width="90">3000</td>
                         <td width="90">3</td>
                         <td width="90">1080</td>
                         <td width="90">接受报名</td>
                         <td width="110">
                             从 2018-09-01到 2018-11-05
                         </td>
                         <td width="90">300</td>
                         <td width="90">运营1组</td>
                         <td width="90">2018-08-02 </td>
                         <td width="120">
                             <span>编辑</span>
                             <span>取消</span>
                             <span>分享</span>
                         </td>
                         <td width="250">
                             <div><span>普通</span><span>独立</span></div>
                             <span>设置</span>
                             <span>登记设置</span>
                             <span>报名详单</span>
                         </td>
                         <td width="90">无</td>
                         <td width="90">单张</td>
                         <td width="90"><el-input></el-input></td>
                     </tr>
                   </tbody>
               </table>
            </div>
        </div>
        <!------------------->
        <div class="activityBoxItem">
        报名列表
        </div>
       <div class="activityBoxItem1">
           <table class="activityBoxItem1Table">
               <thead>
                   <tr>
                       <!--<th v-for="(item,index) in activityBoxItem1Table">{{item}}</th>-->
                       <th width="90">报名号</th>
                       <th width="90">姓名</th>
                       <th width="120">手机号</th>
                       <th width="240">邮箱</th>
                       <th width="90">国家</th>
                       <th width="90">省份</th>
                       <th width="90">城市</th>
                       <th width="240">地址</th>
                   </tr>
               </thead>
               <tbody>
                     <tr>
                        <td width="90">00000001</td>
                        <td width="90">韩梅梅</td>
                        <td width="120">13866997760</td>
                        <td width="240">meimei.han@163.com</td>
                        <td width="90">中国</td>
                        <td width="90">广东省</td>
                        <td width="90">广州市</td>
                        <td width="240">番禺区碧桂园332号1901</td>
                        <td width="120">
                            <span class="cursor">照片</span>
                            <span class="cursor">二维码</span>
                        </td>
                     </tr>
               </tbody>
           </table>
       </div>
        <!-------->
        <div class="box-page"><refresh-icon @refreshTable="getList()"></refresh-icon>
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>

    export default {
        data() {
            return {
                activityBoxItem1Table:["报名号","姓名","手机号","邮箱","国家","省份","城市","地址"],
                pageSize:10, //当前页面
                currentPage:1,  //跳转页面
                total:0,   //分页总数量
            }
        },

        methods: {
            getList(){ // 获取数据
                console.log(1)
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.getList();
            },
        }
    };
</script>

<style scoped lang="scss">
 @import "../../../assets/css/activity/activityMrgDetail.css";

</style>
