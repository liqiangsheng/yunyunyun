<template>
    <!--活动详情查询-->
    <div class="activitydetailBox">
        <div class="activityBox">
            <div class="activityBoxRight">
                <el-table :data="activityInfo" style="width: 100%">
                    <el-table-column label="活动号" width="240">
                        <template slot-scope="scope">
                          {{scope.row.id}}
                        </template>
                    </el-table-column>
                    <el-table-column label="活动名称" width="200">
                        <template slot-scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column label="地点" width="200">
                        <template slot-scope="scope">
                            {{scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" width="110">
                        <template slot-scope="scope">
                            从{{$moment(scope.row.startTime).format("YYYY-MM-DD")}}到{{$moment(scope.row.endTime).format("YYYY-MM-DD")}}
                        </template>
                    </el-table-column>
                    <el-table-column label="报名" width="100">
                        <template slot-scope="scope">
                            {{scope.row.signCount}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="100">
                        <template slot-scope="scope">
                             <span class='homeBottomstate' v-if="nowTime >scope.row.signStartTime && nowTime <scope.row.signEndTime">
                                      立即报名
                                  </span>
                            <span class='homeBottomstate' v-if="nowTime < scope.row.signStartTime">
                                      即将开始
                                  </span>
                            <span class='homeBottomstate' v-if="nowTime <= scope.row.sendTime && nowTime >= scope.row.sstartTime">
                                      正在进行
                                  </span>
                            <span class='homeBottomstate end' v-if="nowTime >scope.row.endTime">
                                      活动结束
                                  </span>
                            <span class='homeBottomstate end' v-if="nowTime > scope.row.signEndTime && nowTime < scope.row.sstartTime">
                                      报名结束
                                  </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报名时间" width="120">
                        <template slot-scope="scope">
                            从{{$moment(scope.row.signStartTime).format("YYYY-MM-DD")}}到{{$moment(scope.row.signEndTime).format("YYYY-MM-DD")}}
                        </template>
                    </el-table-column>
                    <el-table-column label="管理部门" width="100">
                        <template slot-scope="scope">
                            {{scope.row.responsibleOrg}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <span class="cursor fontColor operation" @click="commonFnc(name='分享',scope.row.id)">分享</span>
                            <span class="cursor fontColor operation" @click="commonFnc(name='查看',scope.row.id)">查看</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报名入口" width="100">
                        <template slot-scope="scope">
                            {{scope.row.noteMode|noteMode}}
                        </template>
                    </el-table-column>
                    <el-table-column label="人脸识别" width="100">
                        <template slot-scope="scope">
                            {{!!scope.row.faceDetection?'是':'否'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="门票备注" width="100">
                        <template slot-scope="scope">
                            {{scope.row.ticketRemark}}
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
        <!------------------->
        <div class="activityBoxItem">
        报名列表
        </div>
       <div class="activityBoxItem1">
           <el-table :data="tbodyList" style="width: 100%">
               <el-table-column :label="item.displayName" width="120" v-for="(item,index) in thead" :key="index">
                   <template slot-scope="scope">
                       <span>{{scope.row[item.code]}}</span>
                   </template>
               </el-table-column>
               <el-table-column width="120">
                   <template slot-scope="scope">
                       <a :href="scope.row.faceUrl" target="_Blank" v-if="!!scope.row.faceUrl" class="cursor">拍照图片</a>
                   </template>
               </el-table-column>
               <el-table-column width="120" >
                   <template slot-scope="scope">
                       <span @click="erweima(scope.row.thirdPartCode)" class="cursor">二维码</span>
                   </template>
               </el-table-column>
           </el-table>
       </div>
        <!-------->
        <div class="box-page"><refresh-icon @refreshTable="getList"></refresh-icon>
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--分享生成二维码-->
        <el-dialog :append-to-body="true" class="dialog" title="二维码" :visible.sync="qrcodeShow" :close-on-click-modal="true" width="300px" top="30%">
            <qrCode v-if="qrcodeShow" :activityID="activityID"></qrCode>
        </el-dialog>
        <!--二维码-->
        <el-dialog :append-to-body="true" class="dialog" title="二维码" :visible.sync="erweimaShow" :close-on-click-modal="true" width="300px" top="30%">
            <erweima v-if="erweimaShow" :erweimaId="erweimaId"></erweima>
        </el-dialog>
    </div>
</template>


<script>
    //         报名活动查询      //报名的详细人资料              //动态生成的报名信息                      //城市
    import {activityInfofindOne,ustomerActivitySignupNotelistTob,activitySignupNoteSettingfindByActivityId,sysRegionsinglelevel} from '../../../api/activityMrg/activityMrg'
    import qrCode from "./alter/qrcode.vue"
    import erweima from "./alter/erweima.vue"
    const date = new Date().getTime();
    export default {
        components:{
            qrCode,erweima
        },
        data() {
            return {
                erweimaId : '',  //二维码字符串
                erweimaShow :false, //二维码显示
                activityID:'', //活动id
                thead:[],//报名的动态头部信息
                tbodyList:[],//实际报名数据
                qrcodeShow:false, // 二维码显示
                activityInfo:[], // 活动信息
                nowTime: date, //现在的时间
                activityBoxItem1Table:["报名号","姓名","手机号","邮箱","国家","省份","城市","地址"],
                pageSize:10, //当前页面
                currentPage:1,  //跳转页面
                total:0,   //分页总数量
                cityName:[], //城市
            }
        },
        created(){
            sysRegionsinglelevel().then(res=>{
                if(res.data.status == true){
                    this.cityName = res.data.data;
                }else{
                    this.$message.warning(res.data.message)
                }
            })
            activityInfofindOne(this.$router.history.current.query.id).then(res=>{
                 console.log(res,"报名号")
                if(res.data.status == true){
                    this.activityInfo = [res.data.data];
                }else{
                    this.$message.warning(res.data.message)
                }
            })
            this.query();
        },
        methods: {
            erweima(id){ //二维码
             this.erweimaId = id;
             this.erweimaShow = true;
            },
            commonFnc(v,id){ //编辑 取消 分享 登记设置
                if(v === '分享'){
                    this.activityID = this.$router.history.current.query.id;
                    this.qrcodeShow = true;
                }else if(v === '查看'){ //去活动查看列表
                    this.$router.push({path:'/activitymrg/activityMrg/activityMrgAddSingle/lookActivityMrgSingle',query:{id}})
                }
            },
            query(){ // 获取数据
                activitySignupNoteSettingfindByActivityId(this.$router.history.current.query.id).then(res=>{
                    if(res.data.status == true){

                        res.data.data.forEach((item,index)=>{
                            if(item.hideStatus == false){
                                this.thead.push(item);
                            }
                        })

                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
                ustomerActivitySignupNotelistTob({activityId:this.$router.history.current.query.id,p:this.currentPage,s:this.pageSize}).then(res=>{
                    if(res.data.status==true){
                        res.data.data.forEach((item,index)=>{
                                if(item.sex){
                                    item.sex = item.sex==0?'男':item.sex==1?'女':'未知';
                                }
                                if(item.regionId){
                                    item.regionId = item.regionName;
                                }
                            if(item.idType){
                                item.idType = item.idType==1?'身份证': item.idType==2?'护照': item.idType==3?'军官证':'未知';
                            }
                            if(item.gainChannel){
                                item.gainChannel = item.gainChannel==1?'微信': item.gainChannel==2?'微博': item.gainChannel==3?'官网': item.gainChannel==4?'展会官方': item.gainChannel==5?'主办方邀请函': item.gainChannel==6?'新闻（报纸/电视/电台）': item.gainChannel==7?'户外广告（公交站台/路牌广告）': item.gainChannel==8?'参展商推广平台': '其他';
                            }else {
                                item.gainChannel = '其他'
                            }
                            if(item.corpDomains){
                                item.corpDomains = item.corpDomains==1?'智能家居设计': item.corpDomains==2?'智能硬件设计': item.corpDomains==3?'VR': item.corpDomains==4?'家具设计': item.corpDomains==5?'消费电子': item.corpDomains==6?'智能制造': item.corpDomains==7?'创客': '其他';
                            }else {
                                item.corpDomains = '其他'
                            }
                            if(item.interestedDomains){
                                item.interestedDomains = item.interestedDomains==1?'智能家居设计': item.interestedDomains==2?'智能硬件设计': item.interestedDomains==3?'VR': item.interestedDomains==4?'家具设计': item.interestedDomains==5?'消费电子': item.interestedDomains==6?'智能制造': item.interestedDomains==7?'创客': '其他';
                            }else {
                                item.interestedDomains = '其他'
                            }


                        })

                        this.tbodyList = res.data.data;
                        this.total = res.data.total;
                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
            },
            getList(){
                this.currentPage = 1;
                this.query();
            },
            handleSizeChange(val) {     //每页显示多少行
                this.pageSize = val;
                this.query();
            },
            handleCurrentChange(val) {  //当前页
                this.currentPage = val;
                this.query();
            },
        }
    };
</script>

<style scoped lang="scss">
    .activitydetailBox{
       width:100%;
    }
    .activityBox{
        width: 100%;
        background: #eeeeee;
        .activityBoxRight{
            width: 100%;
        }
    }

    .activityBoxtable thead tr th{
        text-align: center;
        font-size: 16px;
        background: #5a5e66;
    }
    .activityBoxtable tbody tr td{
        text-align: center;
        font-size: 14px;
        /*padding-top: 20px;*/

        height: 80px;
    }
    .activityBoxItem{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 900;
        background: #FFFFFF;
    }
    .activityBoxItem1{
        width: 100%;
    }


    .cursor{
        color: #0000FF;
        cursor: pointer;
    }


</style>
