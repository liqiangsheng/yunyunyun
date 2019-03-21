<template>
    <!--新建单活动-->
    <div class="activityMrgSingleBox">
        <ul class="activityMrgSingleItem">
            <li class="activityMrgSingleItem_left">
                <h5 class="h5">基本信息</h5>
                <el-button type="primary" plain @click="preview">预览</el-button>
                <h5 class="hFive">页面分段？</h5>
                <el-radio v-model="radio" disabled label="是">是</el-radio>
                <el-radio v-model="radio" label="否">否</el-radio>
            </li>
            <li  class="activityMrgSingleItem_center"><el-button type="primary"disabled plain>设置分享页</el-button></li>
            <li class="activityMrgSingleItem_right"><el-button type="primary" plain @click="Preservation">全部应用</el-button><el-button type="primary" disabled plain>提交审核</el-button></li>
        </ul>

        <div class="activityMrgSingleBoxItem">
            <ul>
                <li><span>标题<b>*</b></span><el-input v-model="listData.title"></el-input></li>
                <li><span>联系人<b>*</b></span><el-input v-model="listData.linkMan"></el-input></li>
                <li><span>联系电话<b>*</b></span><el-input v-model="listData.linkPhone"></el-input></li>
                <li><span>活动时间<b>*</b></span>
                    <el-date-picker
                            v-model="seloctTime"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </li>
                <li><span>开始时间<b>*</b></span>
                    <el-date-picker
                            v-model="activetyStarTime"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </li>
                <li><span>详细地址<b>*</b></span><el-input v-model="listData.address"></el-input></li>
                <li><span>活动描述<b>*</b></span><el-input v-model="listData.summary"></el-input></li>
                <li><span>经度<b>*</b></span><el-input v-model="listData.longitude"></el-input></li>
                <li><span>纬度<b>*</b></span><el-input v-model="listData.latitude"></el-input></li>
                <li><span>原价<b>*</b></span><el-input v-model="listData.originalPrice"></el-input></li>
                <li><span>优惠价<b>*</b></span><el-input v-model="listData.payPrice"></el-input></li>
                <li><span>付款时效<b>*</b></span><el-input v-model="listData.payExpired"></el-input></li>
                <li><span>活动门票<b>*</b></span><el-input v-model="listData.quantity"></el-input></li>
                <li><span>付款说明</span><el-input v-model="listData.payRemark"></el-input></li>
                <li><span>退款说明</span><el-input v-model="listData.refundRemark"></el-input></li>
                <!--<li><span>分享页</span><el-input v-model="shareUrl" disabled></el-input></li>-->
                <li><span>主办单位<b>*</b></span><el-input v-model="listData.hosts"></el-input></li>
                <li><span>承办单位</span><el-input v-model="listData.organizers"></el-input></li>
                <li><span>协办单位</span><el-input v-model="listData.coOrganizers"></el-input></li>
                <li><span>是否人脸</span>
                    <el-select v-model="faceDetection" placeholder="请选择">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </li>
                <li><span>活动城市<b>*</b></span>
                    <el-cascader
                            v-model="cityValue"
                            :options="citylist"
                            :props="{  //自定义城市的id
                                    value: 'id',
                                    label: 'name',
                                    children: 'children'
                                }"
                            filterable
                            change-on-select
                            @change="handleChange">
                    </el-cascader>
                </li>
            </ul>
            <div class="activityMrgSingleBoxItem_right">
                <ul>
                    <li class="firstLi">海报<b style="color: red">*</b></li>
                    <li class="cententLi">
                        <img :src="listData.bannerUrl" alt="">
                        <!-- 上传文件-->
                        <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    </li>
                    <li class="lastLi">
                        <div class="ctivtyAddManyItem1Right_botSize">
                            建议尺寸750*560px或4:3, JPG、PNG格式， 图片小于5M
                        </div>
                    </li>
                </ul>
                <!--<div>-->
                <!--<el-button type="primary" plain @click="add('title')">新增</el-button>-->

                <!--</div>-->
            </div>
        </div>

        <div class="activityIntroductionBox">
            <div class="activityIntroduction">
                <h5>活动介绍<b style="color: red">*</b></h5>
                <el-button type="primary" plain @click="preview">预览</el-button>
            </div>
            <div class="activityIntroductionEditorElem">
                <!--富文本-->
                <div id="editorElem" v-model="content"></div>

            </div>
            <el-button @click="preview">预览</el-button>

        </div>

        <div class="activityarrangeBox">
            <div class="activityarrange">
                <h5>活动安排</h5>
                <el-button type="primary" plain @click="preview">预览</el-button>
            </div>
            <div class="activityarrangeItem">
                <div class="activityarrangeItemLeft">
                    <el-table :data="listData.scheduleVoList" style="width: 100%">
                        <el-table-column label="开始时间" width="120">
                            <template slot-scope="scope">
                                <input type="text" v-model="scope.row.startTime">
                            </template>
                        </el-table-column>
                        <el-table-column label="结束时间" width="120">
                            <template slot-scope="scope">
                                <input type="text" v-model="scope.row.endTime">
                            </template>
                        </el-table-column>
                        <el-table-column  label="主题" width="200">
                            <template slot-scope="scope">
                                <input type="text" v-model="scope.row.subject">
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
                                            <input type="text" placeholder="开始时间" v-model="item.startTime" width="100">
                                        </div>
                                        <div class="liItem">
                                            <input type="text" placeholder="结束时间" v-model="item.endTime" width="120">
                                        </div>
                                        <div class="liItem">
                                            <input type="text" placeholder="主题" v-model="item.subject" width="200">
                                        </div>
                                        <div class="liItem">
                                            <input type="text" placeholder="活动位置" v-model="item.location" width="200">
                                        </div>
                                        <div class="liItem">
                                            <div style="height: 30px;margin-top: 5px" v-for="(item1,index1) in item.honoredGuestList" :key="">{{item1.name}}</div>
                                            <div @click="Sonchoice(props.$index,item,index)" style="width:40px;border: 1px solid #cccccc;border-radius: 5px;text-align: center;line-height: 36px;display: inline-block">选择</div>
                                        </div>
                                        <div class="liItem">
                                            <input type="text" style="margin-top:5px;width: 50px;" placeholder="排序" v-model="item1.sort" width="80" v-for="(item1,index1) in item.honoredGuestList" :key="">
                                        </div>
                                        <div class="liItem">
                                            <input type="text" style="margin-top:5px;width: 50px;display: block" placeholder="名号" v-model="item1.honor" width="80" v-for="(item1,index1) in item.honoredGuestList" :key="">
                                            <!--<input type="text" placeholder="名号" v-model="item.engName" width="200">-->
                                        </div>
                                        <div class="liItem">
                                            <el-button type="primary" plain @click="delchildren(props.$index,item,index)">删除</el-button>
                                        </div>
                                    </li>
                                </ul>

                            </template>
                        </el-table-column>
                        <el-table-column label="活动位置" width="200">
                            <template slot-scope="scope">
                                <input type="text" v-model="scope.row.location">
                            </template>
                        </el-table-column>
                        <el-table-column  label="嘉宾名称" width="200">
                            <template slot-scope="scope">
                                <div style="height: 30px;margin-top: 5px" v-for="(item,index) in scope.row.honoredGuestList" :key="">{{item.name}}</div>
                                <el-button type="primary" plain @click="choice(scope.$index,scope.row)">选择</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column  label="排序" width="80">
                            <template slot-scope="scope">
                                <input type="text" v-model="item.sort" v-for="(item,index) in scope.row.honoredGuestList" style="margin-top: 5px" :key="">
                            </template>
                        </el-table-column>
                        <el-table-column label="名号" width="200">
                            <template slot-scope="scope">
                                <input type="text" style="margin-top:5px;width: 50px;display: block" placeholder="名号" v-model="item.honor" width="80" v-for="(item,index) in scope.row.honoredGuestList" :key="">
                            </template>
                        </el-table-column>
                        <el-table-column label="其他" width="200">
                            <template slot-scope="scope">
                                <el-button type="primary" plain @click="addSon(scope.$index)">新增活动安排</el-button>
                            </template>

                        </el-table-column>
                    </el-table>

                </div>
                <div class="activityarrangeItemRight">
                    <el-button type="primary" plain disabled>从Excel导入</el-button>
                    <el-button type="primary" plain @click="add('table')">新增</el-button>
                    <p><span>注意事项</span><el-input v-model="listData.matters"></el-input>此处若不填写，APP端将隐藏此栏</p>
                </div>


            </div>


        </div>

        <!--<div class="activityIntroductionBox">-->
        <!--<div class="activityIntroduction">-->
        <!--<h5>嘉宾介绍</h5>-->
        <!--<el-button type="primary" plain @click="preview">预览</el-button>-->
        <!--</div>-->
        <!--<div class="activityIntroductionEditorElem">-->
        <!--&lt;!&ndash;富文本&ndash;&gt;-->
        <!--<div id="editorElem1" v-model="HUcontent1"></div>-->

        <!--</div>-->
        <!--<el-button @click="preview">预览</el-button>-->

        <!--</div>-->

        <div class="activityIntroductionBox">
            <div class="activityIntroduction">
                <h5>其他</h5>
                <el-button type="primary" plain @click="preview">预览</el-button>
            </div>
            <div class="activityIntroductionEditorElem">
                <!--富文本-->
                <div id="editorElem2" v-model="HUcontent2"></div>

            </div>
            <el-button @click="preview">预览</el-button>

        </div>
        <!--嘉宾列表-->
        <el-dialog :append-to-body="true" class="dialog" title="嘉宾列表" :visible.sync="distinguishedShow" :close-on-click-modal="true" width="80%" top="5%">
            <distinguishedGuestfrom v-if="distinguishedShow" :honoredGuestArr="honoredGuestArr" @distinguishedGuestList="distinguishedGuestList" :distinguishedGuestIndex="distinguishedGuestIndex" @distinguishedGuestListSon="distinguishedGuestListSon"></distinguishedGuestfrom>
        </el-dialog>
        <!--预览-->
        <el-dialog :append-to-body="true" class="dialog" title="预览" :visible.sync="addpreviewShow" :close-on-click-modal="true" width="1000px" top="5%">
            <addPreview v-if="addpreviewShow" :previewparameter="previewparameter"></addPreview>
        </el-dialog>
    </div>
</template>


<script>
    import E from 'wangeditor' //<!--富文本-->
    import distinguishedGuestfrom  from './alter/distinguishedGuest.vue' //嘉宾列表
    import addPreview  from './alter/addPreview.vue' //预览
              //活动查询            //城市                //国,省,市    //七牛Token               //活动更新
    import {activityInfofindOneTob,sysRegionsinglelevel,sysRegionTree,sysAttachmentUpPublicToken,activityInfoupdate} from '../../../api/activityMrg/activityMrg'
    export default {
        components:{
            distinguishedGuestfrom,addPreview
        },
        data() {
            return {
                honoredGuestArr:[],// 传给嘉宾列表的参数
                previewparameter:{},//预览的参数
                addpreviewShow:false,//预览的弹框
                cityValue:[],//城市数据
                listData:{},//活动数据
                distinguishedGuestIndex:0,//判断是父节点还是子节点
                SonchoiceI:0, //第几个子标题的下标
                SonchoiceIndex:0,//子标题的下标
                distinguishedShow:false,//嘉宾列表显示
                distinguishedindex:0,//嘉宾列表显示
                distinguishedDataChildred:[],//嘉宾列表显示
                qiniutoken:'', //七牛token
                tabhead:['开始时间','结束时间','主题','活动位置','嘉宾名称','国家','名号'],
                tableData: [],//活动安排
                content:'', //活动介绍
                HUcontent1:"", //富文本内容
                HUcontent2:"", //富文本内容
                regionId:'',//地点
                citylist:[],//城市列表
                hosts:'',//主办单位
                organizers:'',//承办单位
                coOrganizers:'',//协办单位
                radio:"是", // 单选
                activetyStarTime:[], //活动开始时间
                seloctTime:[], //时间日期选择
                faceDetection:'',
            }
        },
        created(){

            this.qiniuToken(); //七牛token
            sysRegionTree().then(res=>{
                if(res.data.status==true){
                    this.citylist = res.data.data;
                }else{
                    this.$message.warning(res.data.message)
                }
            })
        this.query();

        },
        methods: {
            query(){
                setTimeout(()=>{
                    activityInfofindOneTob(this.$router.history.current.query.id).then(res=>{
//                console.log(res,"this.activityId ")
                        if(res.data.status==true){
                            sysRegionsinglelevel().then(res1=>{
//                        console.log(res1,"")
                                if(res1.data.status==true){
                                     if(res.data.data.scheduleVoList&&res.data.data.scheduleVoList.length>0){
                                         res.data.data.scheduleVoList.forEach((item,index)=>{
                                             item.startTime = this.$moment(item.startTime).format('YYYY-MM-DD HH:mm:ss');
                                             item.endTime = this.$moment(item.startTime).format('YYYY-MM-DD HH:mm:ss');
                                             item.children.forEach((item1,index1)=>{
                                                 item1.honoredGuestList.forEach(function(item2,index2){
                                                    item2.honoredGuestId = item2.id
                                                  })
                                                 item1.startTime = this.$moment(item1.startTime).format('YYYY-MM-DD HH:mm:ss');
                                                 item1.endTime = this.$moment(item1.startTime).format('YYYY-MM-DD HH:mm:ss');
                                             })
                                             item.honoredGuestList.forEach((item1,index1)=>{
                                                 item1.honoredGuestId = item1.id;

                                             })
                                         })
                                     }
                                    this.listData = res.data.data;
                                    let time = new Date(res.data.data.endTime)
                                    this.activetyStarTime=[new Date(res.data.data.signStartTime),new Date(res.data.data.signEndTime)]; //活动开始时间
                                    this.seloctTime=[new Date(res.data.data.startTime),new Date(res.data.data.endTime)]; //时间日期选择
                                    this.faceDetection = !res.data.data.faceDetection?"否":"是";
                                    this.regionId = res.data.data.regionId;
                                    this.content = res.data.data.content;//活动安排
                                    this.HUconten2 = res.data.data.customContent;//其他
                                    this.$nextTick(function(){
                                        //互文本
                                        var editor = new E('#editorElem')
                                        editor.customConfig.onchange = (html) => {
                                            this.content = html
                                        }
                                        editor.create()
                                        editor.txt.html(res.data.data.content)
//                                var editor1 = new E('#editorElem1')
//                                editor1.customConfig.onchange = (html) => {
//                                    this.HUconten1 = html
//                                }
//                                editor1.create()
                                        var editor2 = new E('#editorElem2')
                                        editor2.customConfig.onchange = (html) => {
                                            this.HUcontent2 = html
                                        }
                                        editor2.create()
                                        editor2.txt.html(res.data.data.customContent)
                                        //互文本
                                    })

                                    this.citylist.forEach((item,index)=>{ //城市的国家
                                        item.children.forEach((item1,index1)=>{//省份
                                            item1.children.forEach((item2,index2)=>{//城市
                                                if(item2.id==res.data.data.regionId){
                                                    this.cityValue = [item.id,item1.id,item2.id]; //初始化城市涨势
                                                }
                                            })
                                        })
                                    })
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
                },200)
            },
            distinguishedGuestListSon(item){//选择了嘉宾列表子
//                console.log(item,'distinguishedGuestListSon')
//                console.log(this.SonchoiceI,'distinguishedGuestListSon')
//                console.log(this.SonchoiceIndex,'distinguishedGuestListSon')
//                SonchoiceI:0, //第几个子标题的下标
//                    SonchoiceIndex:0,//子标题的下标
//                console.log( item.map(function(item1, index, item) { return {honoredGuestId: item1.id, sort: item1.sort,name:item1.name,honor:item1.honor}; })," item.map(function(item1, index, item) { return {honorGuestId: item1.id, sort: item1.sort}; })")
                this.listData.scheduleVoList[this.SonchoiceI].children[this.SonchoiceIndex].honoredGuestList = item.map(function(item1, index, item) { return {honoredGuestId: item1.id, sort: item1.sort,name:item1.name,honor:item1.honor}; });
                this.$set( this.listData.scheduleVoList[this.SonchoiceI].children, this.listData.scheduleVoList[this.SonchoiceI].children[this.SonchoiceIndex].honoredGuestList, item.map(function(item1, index, item) { return {honoredGuestId: item1.id, sort: item1.sort,name:item1.name,honor:item1.honor}; }));
                this.distinguishedShow = false;
            },
            distinguishedGuestList(item){ //选择了嘉宾列表父
//                console.log(item,"1111")
//                console.log(this.distinguishedindex,"22222")
                this.listData.scheduleVoList[this.distinguishedindex].honoredGuestList = item.map(function(item1, index, item) { return {honoredGuestId: item1.id, sort: item1.sort,name:item1.name,honor:item1.honor}; });
//                console.log( this.listData.scheduleVoList,"22222")
                this.$set( this.listData.scheduleVoList, this.listData.scheduleVoList[this.distinguishedindex].honoredGuestList, item.map(function(item1, index, item) { return {honoredGuestId: item1.id, sort: item1.sort,name:item1.name,honor:item1.honor} }))
                this.distinguishedShow = false;
            },
            delchildren(index,item,i){//删除子标题
//                console.log(index);
//                console.log(item,index);
//                console.log(index);
                this.listData.scheduleVoList[index].children.splice(i,1);
            },
            choice(i,v){ //嘉宾选择
//               this.$router.push({})
                this.honoredGuestArr = v.honoredGuestList; //传给嘉宾列表
                this.distinguishedGuestIndex = 0;
                this.distinguishedindex = i;
                this.distinguishedShow = true;
            },
            Sonchoice(i,v,index){ //子活动嘉宾选择
//                console.log(i,"999")
//                console.log(v)
//                console.log(index)
                this.honoredGuestArr = v.honoredGuestList; //传给嘉宾列表
                this.distinguishedGuestIndex = 1;
                this.SonchoiceIndex = index;
                this.SonchoiceI = i;
                this.distinguishedShow = true;
            },
            addSon(v){//新增子活动
//                console.log(v)
                this.$nextTick(function () {
                    this.listData.scheduleVoList[v].children.push({
                        "startTime":"",
                        "endTime":"",
                        "location":"",
                        "subject":"",
                        "brief":"",
                        honoredGuestList: [{
                            alias:'',// 昵称 ,
                            engName:"",// 英文名 ,
                            headerUrl:"",// 用户头像（七牛云图片地址） ,
                            honor:"",// 头衔 ,
                            id:"",//主键id ,
                            idNo:"",//身份证号码 ,
                            introduce:"",//介绍 ,
                            mobile:"",//移动电话号码 ,
                            name:"",//姓名 ,
                            nationRegionId:"",//所属国家/地区（关联system.sys_region表id） ,
                            remark:"",//备注 ,
                            sort:"",//排序值（越小越靠前）
                        }],
                    })
                })

            },
            Preservation(){//全部应用
//                先判断到底是不是必填
                if(this.seloctTime.length>0){
                    this.startTime= this.$moment(this.seloctTime[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.seloctTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    this.endTime = this.$moment(this.seloctTime[1]).format('YYYY-MM-DDTHH:mm:ss').includes("Invalid")?"":this.$moment(this.seloctTime[1]).format('YYYY-MM-DDTHH:mm:ss');
                }else{
                    this.startTime= '';
                    this.endTime= '';
                }
                if(this.activetyStarTime.length>0) {
                    this.signStartTime = this.$moment(this.activetyStarTime[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.activetyStarTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    this.signEndTime= this.$moment(this.activetyStarTime[1]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.activetyStarTime[1]).format('YYYY-MM-DD HH:mm:ss');
                }else{
                    this.signStartTime= '';
                    this.signEndTime= '';
                }
                if(!this.listData.title)return this.$message.warning('活动标题不能为空');
                if(!this.listData.linkMan) return this.$message.warning('活动联系人不能为空');
                if(!this.listData.linkPhone)return  this.$message.warning('活动联系人电话不能为空');
                if(!this.startTime) return this.$message.warning('活动开始时间不能为空');
                if(!this.endTime)return this.$message.warning('活动结束时间不能为空');
                if(!this.signStartTime) return this.$message.warning('活动报名开始时间不能为空');
                if(!this.signEndTime) return this.$message.warning('活动报名结束时间不能为空');
                if(!this.listData.address) return this.$message.warning('详细地址不能为空');
                if(!this.content)return this.$message.warning('活动介绍不能为空');
                if(!this.listData.latitude) return this.$message.warning('经度不能为空');
                if(!this.listData.longitude) return this.$message.warning('经度不能为空');
                if(!this.listData.originalPrice) return this.$message.warning('商品原价不能为空');
                if(!this.listData.payPrice) return this.$message.warning('优惠售价不能为空');
                if(!this.listData.payExpired) return this.$message.warning('付款时效不能为空');
                if(!this.listData.quantity) return this.$message.warning('活动门票不能为空');
                if(!this.listData.hosts) return this.$message.warning('主办单位不能为空');
                if(!this.listData.regionId) return this.$message.warning('活动城市不能为空');
                if(!this.listData.bannerUrl) return this.$message.warning('海报不能为空');
                if(!this.listData.summary) return this.$message.warning('活动描述不能为空');


                activityInfoupdate(this.parameter()).then(res=>{ // 更新活动
                    if(res.data.status=true){
                        this.$message.success('修改成功')
                        this.query();
                    }else{
                        this.$message.warning(res.data.message)
                    }
                })
            },
            parameter(){//传后台的参数
                let faceDetectionBOOL;
                if(this.faceDetection=='是'||this.faceDetection=='true'){
                    faceDetectionBOOL = 1
                }else{
                    faceDetectionBOOL = 0
                }
                let data = {
                    id:this.$router.history.current.query.id,//活动的id
                    address: this.listData.address,//详细地址 , //
                    aloneEntrance:false,// 报名是否独立入口（0：否，1：是） ,
                    bannerUrl:this.listData.bannerUrl,// 海报图片（七牛云） ,//
                    coOrganizers:this.listData.coOrganizers,// 协办单位 ,//
                    content:this.content,// 活动描述 ,
                    customContent:this.HUcontent2,//自定义活动描述 ,
                    endTime :this.endTime, //活动结束时间 ,//
                    entranceUrl :this.listData.entranceUrl,//报名独立入口url ,
                    faceDetection:faceDetectionBOOL,//启用人脸识别（0：否，1：是） ,
                    hosts:this.listData.hosts,//主办单位 ,//
                    latitude:this.listData.latitude,//纬度 ,//
                    linkMan:this.listData.linkMan,//联系人 ,
                    linkPhone:this.listData.linkPhone,//联系电话 ,
                    longitude :this.listData.longitude,// 经度 ,//
                    multiActivity:false,//是否多活动（0：否，1：是） ,
                    multiSection:false,//是否分段（0：否，1：是） ,
                    organizers :this.listData.organizers,// 承办单位 ,//
                    originalPrice :this.listData.originalPrice,// 商品原价 ,//
                    parentId:this.listData.parentId,//主活动id（若是单体活动则为0） ,
                    payExpired:this.listData.payExpired,//付款时效（分钟） ,//
                    payPrice:this.listData.payPrice,// 商品销售价 ,//
                    payRemark:this.listData.payRemark,//付款说明 ,
                    refundRemark:this.listData.refundRemark,//退款说明 ,
                    regionId:this.listData.regionId,//地点id（关联system.sys_region表id） ,
                    shareUrl:this.shareUrl,//分享页url ,
                    signEndTime:this.signEndTime,//报名结束时间 ,//
                    signStartTime :this.signStartTime,//报名开始时间 ,//
                    startTime:this.startTime,// 活动起始时间 ,//
                    summary :this.listData.summary,//活动简介 ,
                    title:this.listData.title,//活动标题 ,//
                    matters:this.listData.matters, //注意事项 ,//
                    scheduleList: this.listData.scheduleVoList, //活动安排
                    quantity:this.quantity //活动的门票数量
                }
                return data;
            },
            preview(){//预览，都是全部预览
                if(this.seloctTime.length>0){
                    this.startTime= this.$moment(this.seloctTime[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.seloctTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    this.endTime = this.$moment(this.seloctTime[1]).format('YYYY-MM-DDTHH:mm:ss').includes("Invalid")?"":this.$moment(this.seloctTime[1]).format('YYYY-MM-DDTHH:mm:ss');
                }else{
                    this.startTime= '';
                    this.endTime= '';
                }
                if(this.activetyStarTime.length>0) {
                    this.signStartTime = this.$moment(this.activetyStarTime[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.activetyStarTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    this.signEndTime= this.$moment(this.activetyStarTime[1]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.activetyStarTime[1]).format('YYYY-MM-DD HH:mm:ss');
                }else{
                    this.signStartTime= '';
                    this.signEndTime= '';
                }
                this.previewparameter=this.parameter();//预览的参数
                this.addpreviewShow=true;//预览的弹框
            },
            add(value){ //新增
                if(value=='table'){ //活动安排的新增
                    console.log("table")
                    this.listData.scheduleVoList.push({
                        "startTime":"",
                        "endTime":"",
                        "location":"",
                        "subject":"",
                        "brief":"",
                        honoredGuestList: [{
                            alias:'',// 昵称 ,
                            engName:"",// 英文名 ,
                            headerUrl:"",// 用户头像（七牛云图片地址） ,
                            honor:"",// 头衔 ,
                            id:"",//主键id ,
                            idNo:"",//身份证号码 ,
                            introduce:"",//介绍 ,
                            mobile:"",//移动电话号码 ,
                            name:"",//姓名 ,
                            nationRegionId:"",//所属国家/地区（关联system.sys_region表id） ,
                            remark:"",//备注 ,
                            sort:"",//排序值（越小越靠前）
                        },],
                        children: []
                    })
                }else if(value == "title"){//暂时没用

                }
//                console.log(this.HUconten)
//                console.log(this.HUconten1)
//                console.log(this.HUconten2)
            },
            qiniuToken(){//七牛云token
                sysAttachmentUpPublicToken().then(res=>{
                    if(res.data.status==true){
                        this.qiniutoken = res.data.data.upToken;
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
            },
            handleChange(value){//城市选择
                let num = value.length-1;
                this.listData.regionId = value[num];
                this.regionId = value[num];
            },
            onchangeFile(event){ // 上传
                let that = this;
                let mydate = new Date()
                var uuid = "YHTLQS"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
                let file=event.target.files[0];
                var formData = new FormData();
                let observable  = qiniu.upload(file, uuid+'.jpg', that.qiniutoken)
                let observer= {
                    next(res){
                        console.log(res,"上传")
                        if(res.total.size>5*1024*1024){
                            that.$message({
                                message:'请上传小于5M的图片',
                                type: 'warning'
                            });
                        };
                        // ...
                    },
                    error(err){
                        that.$message({
                            message:'图片上传失败',
                            type: 'warning'
                        });
                        // ...
                    },
                    complete(res){
                        that.listData.bannerUrl="https://pub.qinius.butongtech.com/"+ res.key;
                        that.$message({
                            message:"上传完成",
                            type: 'success'
                        });
                        // ...
                    }
                }
                observable.subscribe(observer)
            },
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
            margin-top: 10px;
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
                width: 1400px;
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
                                                    width:200px;
                                                    height: 100%;
                                                    overflow-y: scroll;
                                                }
                                                .liItem:nth-child(7){
                                                    width:100px;
                                                    height: 100%;
                                                    overflow-y: scroll;
                                                }
                                                .liItem:nth-child(8){
                                                    width:200px;
                                                    height: 100%;
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
