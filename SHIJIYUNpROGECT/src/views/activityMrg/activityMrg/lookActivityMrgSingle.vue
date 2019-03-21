<template>
    <!--新建单活动-->
    <div class="activityMrgSingleBox">
        <ul class="activityMrgSingleItem">
            <li class="activityMrgSingleItem_left">
                <h5 class="h5">基本信息</h5>
                <h5 class="hFive">页面分段？</h5>
                <el-radio v-model="radio" disabled label="是">是</el-radio>
                <el-radio v-model="radio" label="否">否</el-radio>
            </li>
            <!--<li  class="activityMrgSingleItem_center"><el-button type="primary" plain>设置分享页</el-button></li>-->
            <!--<li class="activityMrgSingleItem_right"><el-button type="primary" plain @click="Preservation">全部应用</el-button><el-button type="primary" disabled plain>提交审核</el-button></li>-->
        </ul>

        <div class="activityMrgSingleBoxItem">
            <ul>
                <li><span>标题:</span>{{listData.title}}</li>
                <li><span>联系人:</span>{{listData.linkMan}}</li>
                <li><span>联系电话:</span>{{listData.linkPhone}}</li>
                <li><span>活动时间:</span>{{$moment(listData.startTime).format("YYYY/MM/DD")}}-{{$moment(listData.endTime).format("YYYY/MM/DD")}}</li>
                <li><span>开始时间:</span>{{$moment(listData.signStartTime).format("YYYY/MM/DD")}}-{{$moment(listData.signEndTime).format("YYYY/MM/DD")}}</li>
                <li><span>详细地址:</span>{{listData.address}}</li>
                <li><span>活动描述:</span>{{listData.summary}}</li>
                <li><span>经度;</span>{{listData.longitude}}</li>
                <li><span>纬度:</span>{{listData.latitude}}</li>
                <li><span>原价:</span>{{listData.originalPrice}}</li>
                <li><span>优惠价:</span>{{listData.payPrice}}</li>
                <li><span>付款时效:</span>{{listData.payExpired}}</li>
                <li><span>门票数量:</span>{{listData.quantity?listData.quantity:'0'}}</li>
                <li><span>付款说明:</span>{{listData.payRemark||'无'}}</li>
                <li><span>退款说明:</span>{{listData.refundRemark||'无'}}</li>
                <!--<li><span>分享页</span><el-input v-model="shareUrl" disabled></el-input></li>-->
                <li><span>主办单位:</span>{{listData.hosts}}</li>
                <li><span>承办单位:</span>{{listData.organizers||'无'}}</li>
                <li><span>协办单位:</span>{{listData.coOrganizers||'无'}}</li>
                <li><span>是否人脸:</span>{{!listData.faceDetection?'否':'是'}}</li>
                <li><span>活动城市:</span>{{listData.cityName}}</li>
            </ul>
            <div class="activityMrgSingleBoxItem_right">
                <ul>
                    <li class="firstLi">海报</li>
                    <li class="cententLi">
                        <img :src="listData.bannerUrl" alt="">
                    </li>
                </ul>
            </div>
        </div>

        <div class="activityIntroductionBox">
            <div class="activityIntroduction">
                <h5>活动介绍</h5>
            </div>
            <div class="activityIntroductionEditorElem">
                <!--富文本-->
                <div id="editorElem"  v-html="listData.content"></div>
            </div>

        </div>

        <div class="activityarrangeBox">
            <div class="activityarrange">
                <h5>活动安排</h5>
            </div>
            <div class="activityarrangeItem">
                <div class="activityarrangeItemLeft">
                    <el-table :data="listData.scheduleVoList" style="width: 100%">
                        <el-table-column label="开始时间" width="120">
                            <template slot-scope="scope">
                                <!--<input type="text" v-model="scope.row.startTime">-->{{$moment(scope.row.startTime).format("YYYY-MM-DD HH:mm:ss")}}
                            </template>
                        </el-table-column>
                        <el-table-column label="结束时间" width="120">
                            <template slot-scope="scope">
                                {{$moment(scope.row.endTime).format("YYYY-MM-DD HH:mm:ss")}}
                            </template>
                        </el-table-column>
                        <el-table-column  label="主题" width="200">
                            <template slot-scope="scope">
                                {{scope.row.subject}}
                                <!--<input type="text" v-model="scope.row.subject">-->
                            </template>
                        </el-table-column>
                        <el-table-column label="子主题" type="expand" width="50">
                            <template slot-scope="props" >
                                <ul>
                                    <li v-for="(item,index) in props.row.children" v-if="!!props.row.children&&props.row.children.length>0" :key="">
                                        <div class="liItem">
                                            <span>{{index+1}}.</span>
                                        </div>
                                        <div class="liItem">
                                            {{$moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}}
                                        </div>
                                        <div class="liItem">
                                            {{$moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}}
                                        </div>
                                        <div class="liItem">
                                            {{item.subject}}
                                        </div>
                                        <div class="liItem">
                                            {{item.location}}
                                        </div>
                                        <div class="liItem">
                                            <div v-for="(item1,index1) in item.honoredGuestList" :key=""  style="height: 30px;margin-top: 5px">{{item1.name}}</div>
                                        </div>
                                        <div class="liItem">
                                            <div v-for="(item1,index1) in item.honoredGuestList" :key=""  style="height: 30px;margin-top: 5px">{{item1.sort}}</div>
                                        </div>
                                        <div class="liItem">
                                            <div v-for="(item1,index1) in item.honoredGuestList" :key=""  style="height: 30px;margin-top: 5px">{{item1.honor}}</div>
                                        </div>
                                    </li>
                                </ul>

                            </template>
                        </el-table-column>
                        <el-table-column label="活动位置" width="200">
                            <template slot-scope="scope">
                               {{scope.row.location}}
                            </template>
                        </el-table-column>
                        <el-table-column  label="嘉宾名称" width="200">
                            <template slot-scope="scope">
                                <div style="height: 30px;margin-top: 5px" v-for="(item,index) in scope.row.honoredGuestList" :key="">{{item.name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="排序" width="80">
                            <template slot-scope="scope">
                                <div style="height: 30px;margin-top: 5px" v-for="(item,index) in scope.row.honoredGuestList" :key="">{{item.sort}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="名号" width="200">
                            <template slot-scope="scope">
                                <div  style="height: 30px;margin-top: 5px" v-for="(item,index) in scope.row.honoredGuestList" :key="">{{item.honor}}</div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column label="其他" width="200">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button type="primary" plain @click="addSon(scope.$index)">新增子活动</el-button>-->
                            <!--</template>-->

                        <!--</el-table-column>-->
                    </el-table>

                </div>
                <div class="activityarrangeItemRight" v-if="!!listData.matters">
                    <p><span>注意事项: </span>{{listData.matters|'无'}}</p>
                </div>


            </div>


        </div>

        <div class="activityIntroductionBox" v-if="!!listData.customContent">
            <div class="activityIntroduction">
                <h5>其他</h5>
            </div>
            <div class="activityIntroductionEditorElem">
                <!--富文本-->
                <div id="editorElem2" v-html="listData.customContent"></div>
            </div>

        </div>

    </div>
</template>


<script>
    import E from 'wangeditor' //<!--富文本-->
    import distinguishedGuestfrom  from './alter/distinguishedGuest.vue' //嘉宾列表
              //活动查询            //城市
    import {activityInfofindOneTob,sysRegionsinglelevel} from '../../../api/activityMrg/activityMrg'
    export default {
        components:{
            distinguishedGuestfrom
        },
        data() {
            return {
                listData:{}, //数据
                activityId:'', //活动id
                distinguishedGuestIndex:0,//判断是父节点还是子节点
                SonchoiceI:0, //第几个子标题的下标
                SonchoiceIndex:0,//子标题的下标
                distinguishedShow:false,//嘉宾列表显示
                distinguishedindex:0,//嘉宾列表显示
                distinguishedDataChildred:[],//嘉宾列表显示
                qiniutoken:'', //七牛token
                tabhead:['开始时间','结束时间','主题','活动位置','嘉宾名称','国家','名号'],
                tableData: [],//活动安排
                HUcontent1:"", //富文本内容
                HUcontent2:"", //富文本内容
                title:'',//标题
                regionId:'',//地点
                citylist:[],//城市列表
                hosts:'',//主办单位
                organizers:'',//承办单位
                coOrganizers:'',//协办单位
                radio:"是", // 单选
                longitude: '', //经度
                latitude: '', //纬度
                originalPrice: '', //原价
                payPrice: '', //优惠价
                payExpired:'',// 付款失效d
                address:'',//详细地址
                content:'',//活动描述
                linkMan:"",//联系人 ,
                linkPhone:"",//联系电话 ,
                activetyStarTime:[], //活动开始时间
                seloctTime:[], //时间日期选择
                payRemark: '', //付款说明
                refundRemark: '', //退款说明
                summary: '', //活动简介
//                shareUrl: 'https://dcloud.butongtech.com/#/home?id=', //退款说明
                bannerUrl:'',//活动海报
                shareUrl: '', //退款说明
                mattersNeedingAttention:'',//注意事项
                faceDetection:'',
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        created(){
            this.activityId = this.$router.history.current.query.id;
            activityInfofindOneTob(this.activityId).then(res=>{
                console.log(res,"this.activityId ")
                if(res.data.status==true){
                    sysRegionsinglelevel().then(res1=>{
                        console.log(res1,"")
                        if(res1.data.status==true){
                            this.listData = res.data.data;
                            let arr = res1.data.data;
                            arr.forEach((item,index,arr)=>{
                                 if(item.id==res.data.data.regionId)this.listData.cityName=item.name;
                            })

                        }else{
                            this.$message.warning(res.data.message)
                        }

                    })
                }else{
                    this.$message.warning(res.data.message)
                }
            })
//            this.qiniuToken(); //七牛token
//            sysRegionTree().then(res=>{
//                console.log(res,"")
//                if(res.data.status==true){
//                    this.citylist = res.data.data;
//                }else{
//                    this.$message.warning(res.data.message)
//                }
//            })
        },
        methods: {

        },
        mounted(){

        },
    }
</script>

<style scoped lang="scss">

    .activityMrgSingleBox{
        width: 100%;
        background: #FFFFFF;
        .activityMrgSingleItem{
            width: 100%;
            height: 100px;
            background: #e3e3e3;
            .activityMrgSingleItem_left{
                display: inline-block;
                width: 520px;
                height: 100%;
                padding-left: 20px;
                .h5{
                    font-size: 18px;
                    line-height: 100px;
                    display: inline-block;
                    margin: 0;
                    padding: 0;

                }
                button{
                    width: 100px;
                    margin-left: 20px;
                    display: inline-block;
                }
                .hFive{
                    display: inline-block;
                    font-size: 18px;
                    line-height: 100px;
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                    margin-left: 100px;
                }
            }
            .activityMrgSingleItem_center{
                display: inline-block;
                width: 200px;
                height: 100%;
                line-height: 100px;
                button{
                    width: 100px;
                    margin-left: 50px;
                }
            }
            .activityMrgSingleItem_right{
                float: right;
                height: 100%;
                margin-right: 100px;
                line-height: 100px;
                button{
                    width: 100px;
                    margin-left: 20px;
                }
            }
        }
        .activityMrgSingleBoxItem{
            width: 100%;
            overflow: hidden;
            >ul{
                width: 100%;
                padding: 10px 20px;
                box-sizing: border-box;
                overflow: hidden;
                li{
                    width: 340px;
                    height: 50px;
                    float: left;
                    margin-top: 10px;
                    span{
                        display: inline-block;
                        width: 100px;
                        font-size: 14px;
                        height: 50px;
                        line-height: 50px;
                        b{
                            color: red;
                        }
                    }
                    .el-input{
                        width: 220px;
                        height: 50px;
                    }
                    .el-input__inner{
                        width: 220px;
                        height: 40px;
                        transform: translateX(-3px);
                    }
                    .el-cascader{
                        width: 220px;
                        height: 40px;
                        transform: translateX(-3px);
                    }
                }
            }
            >.activityMrgSingleBoxItem_right{
                width: 400px;
                padding: 20px;
                /*float: left;*/
                >ul{
                    width: 500px;
                    overflow: hidden;
                    li{
                        float: left;
                    }
                    .firstLi{
                        width: 50px;
                        padding-top: 20px;
                    }
                    .cententLi{
                        width: 250px;
                        height: 102px;
                        margin: 10px 30px 0 10px;
                        position: relative;
                        border: 1px solid #eaeaea;
                        border-radius: 5px;
                        img{
                            display: block;
                            width: 250px;
                            height: 102px;
                        }
                        input{
                            display: block;
                            position: absolute;
                            left: 0;
                            top:0;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                        }
                        input:hover{
                            cursor: pointer;
                        }
                    }
                    .lastLi{
                        width: 100px;

                    }
                }
            }
        }

    }
    .activityIntroductionBox{
        width: 100%;
        position: relative;
        .activityIntroduction{
            width:100%;
            height: 80px;
            background: #e3e3e3;
            padding: 0 20px;
            line-height: 80px;
            text-align: left;
            position: relative;
            h5{
                width: 100px;
                height: 80px;
                display: inline-block;
                margin: 0;
                padding: 0;
                position: absolute;
                font-size: 18px;
                left:20px;
            }
            button{
                position: absolute;
                width: 100px;
                left: 120px;
                top:20px;
            }
        }
        .activityIntroductionEditorElem{
            width: 800px;
            height: 500px;
            margin: 10px;
            border: 1px solid #cccccc;
            padding: 10px;
            box-sizing: border-box;
            overflow: auto;
        }
        button{
            position: absolute;
            left: 820px;
            top:100px;
        }
    }
    .activityarrangeBox{
        width: 100%;
        position: relative;
        .activityarrange {
            width:100%;
            height: 80px;
            background: #e3e3e3;
            padding: 0 20px;
            line-height: 80px;
            text-align: left;
            position: relative;
            h5{
                width: 100px;
                height: 80px;
                display: inline-block;
                margin: 0;
                padding: 0;
                position: absolute;
                font-size: 18px;
                left:20px;
            }
            button{
                position: absolute;
                width: 100px;
                left: 120px;
                top:20px;
            }
        }
        .activityarrangeItem{
            width: 100%;
            min-height: 300px;
            .activityarrangeItemLeft{
                width: 1450px;
                padding: 20px;
                >.el-table{
                    >.el-table__body-wrapper{
                        >.el-table__body{
                            >tbody{
                                >tr{
                                    >td{
                                        input{
                                            width:90%;
                                            height: 30px;
                                            border: 0;
                                        }
                                    }
                                    >.el-table__expanded-cell{
                                        padding: 0 !important;
                                        >ul{
                                            width: 100%;
                                            li{
                                                width: 100%;
                                                height:80px;
                                                margin-bottom: 10px;
                                                .liItem{
                                                    width: 140px;
                                                    float: left;
                                                }
                                                .liItem:nth-child(6){
                                                    width:150px;
                                                    height: 100%;
                                                    overflow-y: scroll;
                                                }
                                                .liItem:nth-child(7){
                                                    width:100px;
                                                    height: 100%;
                                                    overflow-y: scroll;
                                                }
                                                .liItem:nth-child(8){
                                                    width:150px;
                                                    height: 100%;
                                                    word-break: break-all;
                                                    overflow-y: scroll;
                                                }
                                                .liItem:nth-child(1){
                                                    width: 30px;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                /*table{*/
                /*width:1450px;*/
                /*thead{*/
                /*width: 100%;*/
                /*border:1px solid #ebeef5 ;*/
                /*border-bottom:none ;*/
                /*tr{*/
                /*width: 100%;*/
                /*border-bottom:1px solid #ebeef5 ;*/
                /*height: 48px;*/
                /*th{*/
                /*font-weight: 100;*/
                /*font-size: 14px;*/
                /*border-right:1px solid #ebeef5 ;*/
                /*}*/
                /*th:last-child{*/
                /*border-right:none ;*/
                /*}*/
                /*}*/

                /*}*/
                /*tbody{*/
                /*width: 100%;*/
                /*tr{*/
                /*width: 100%;*/
                /*height: 48px;*/
                /*text-align: center;*/
                /*border:1px solid #ebeef5 ;*/
                /*border-top:none;*/
                /*font-size: 14px;*/
                /*color: #606266;*/
                /*td{*/
                /*border: 1px solid #ebeef5  ;*/
                /*input{*/
                /*width: 90%;*/
                /*border: none;*/
                /*outline: 0;*/
                /*height: 40px;*/
                /*}*/
                /*input:hover{*/
                /*cursor: pointer;*/
                /*}*/
                /*}*/

                /*.address{*/
                /*width:300px;*/
                /*text-align: left;*/
                /*padding: 0 5px;*/
                /*word-break: break-all;*/
                /*}*/
                /*.signUpTime{*/
                /*width:150px;*/
                /*text-align: left;*/
                /*padding: 0 5px;*/
                /*}*/

                /*}*/
                /*}*/
                /*}*/
            }
            .activityarrangeItemRight{
                margin-top: 10px;
                padding: 20px;
                p{
                    display: inline-block;
                    margin-left: 30px;
                    span{
                        width: 100px;
                    }
                    .el-input{
                        width: 200px;
                        margin: 0 20px;
                    }
                }
            }
        }
    }


</style>
