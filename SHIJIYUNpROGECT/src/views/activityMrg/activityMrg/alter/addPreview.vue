<template>
    <!--预览-->
    <div id="addpreview">
          <ul>
              <li style="background: #c4e3f3;color: #41bdc7">尺寸</li>
               <li v-for="(item,index) in size" :class="{active:index === sizeIndex}" @click="sizeClick(index)" :key="">{{item}}</li>
          </ul>
        <!---->
         <div class="addpreviewBox" :style="sizeBoxStyle">
                <div class="addpreviewContent">
                    <div class="homeBoxItem">
                        <div class="homeBoxItemImg" v-if="!!objData.bannerUrl">
                            <img :src="objData.bannerUrl" />
                        </div>
                        <div class="homeBoxItemOne">{{objData.title}}</div>
                        <div class="homeBoxItemTwo">
                            <img src="/static/images/time.png" alt="">
                            {{objData.startTime}}
                        </div>
                        <div class="homeBoxItemThree">
                            <img src="/static/images/position.png" alt="">
                            {{objData.address}}
                            <div class="a" >地图<img src="/static/images/right.png"></div>
                        </div>
                        <div class="homeBoxItemFour">
                            <img src="/static/images/price.png" alt="">
                            <span style="color: #FE5F5F" v-if="objData.expenses>0">¥ {{objData.expenses}}</span>
                            <span style="color:#21CB61" v-else="">免费</span>

                        </div>
                        <div class="homeBoxItemFive">
                            <div v-if="!!objData.hosts"><span>主办单位：</span> <span class="homeBoxItemFiveLeft" v-for="(item,index) in objData.hosts">{{item}}</span></div>
                            <div v-if="!!objData.organizers"><span>承办单位：</span><span class="homeBoxItemFiveLeft" v-for="(item,index) in objData.organizers">{{item}}</span></div>
                            <div v-if="!!objData.coOrganizers"><span>协办单位：</span><span class="homeBoxItemFiveLeft" v-for="(item,index) in objData.coOrganizers">{{item}}</span></div>
                        </div>
                    </div>
                    <!--互文本内容-->
                    <div class="homeBoxItemTen" v-if="!!objData.content">
                        <div class='activityArrangementItem' style="margin-bottom: 20px;"><span></span>活动介绍<span></span></div>
                        <div class="homeBoxItemTenContent" id="htmlV" v-html="objData.content"> </div>
                    </div>
                    <!---->
                    <div class="homeBoxItem1" v-if="objData.scheduleList&&objData.scheduleList.length>0">
                        <div class='activityArrangementItem'><span></span>活动安排<span></span></div>
                        <div class='activityArrangementItem1'>
                            <div v-for='(item,index) in objData.scheduleList' class='activityArrangementItemBox'>
                                <div class='activityArrangementItem1Left'>
                                    <div>{{$moment(item.startTime).format('HH:mm:ss')}}</div>
                                    <div class='activityArrangementItem1Leftcenter'>|</div>
                                    <div>{{$moment(item.endTime).format('HH:mm:ss')}}</div>
                                    <img src='/static/images/timePosition.png'/>
                                </div>
                                <div class='activityArrangementItem1Right'>
                                    <div class='activityArrangementItem1RightA'>
                                        <div class='value' v-if="item.subject">{{item.subject}}</div>
                                        <div v-for='(item1,index1) in item.honoredGuestList' v-if="item.honoredGuestList.length>0">
                                            <div class='name'>{{item1.name}}</div>
                                            <div class='founder'>{{item1.honor}}</div>
                                        </div>
                                        <div v-if='item.brief&&item.brief!="null"' class='brief'>{{item.brief}}</div>
                                        <div class='position' v-if="item.location"><img src='/static/images/position.png'/>{{item.location}}</div>
                                    </div>
                                    <div class='activityArrangementItem1RightB' v-if="item.children.length>0" v-for="(items,indexs) in item.children">
                                        <div>{{$moment(items.startTime).format('HH:mm:ss')}}-{{$moment(items.endTime).format('HH:mm:ss')}}</div>
                                        <div class='value'>{{items.subject}}</div>
                                        <div v-for='(item1,index1) in items.honoredGuestList' v-if="items.honoredGuestList.length>0">
                                            <div class='name'>{{item1.name}}</div>
                                            <div class='founder'>{{item1.honor}}</div>
                                        </div>
                                        <div class='position' v-if="items.location"><img src='/static/images/position.png'/>{{items.location}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="loadMore">
                                这里有分页
                            </div>
                        </div>
                    </div>
                        <!---->

                    <!-- ------嘉宾介绍------ -->
                    <div class='guestIntroductionItem' v-if="guests&&guests.length>0">
                        <div class='activityArrangementItem'><span></span>嘉宾介绍<span></span></div>
                        <div class='guestIntroductionItem1'>
                            <div v-for='(item,index) in guests' class='guestIntroductionItem1Box'>
                                <div class='header'>
                                    <div class='headerLeft'><img :src='item.headerUrl'/> </div>
                                    <div class='headerRight'>
                                        <div class='headerRightTop'><span>{{item.name}}</span><span v-show="!!item.alias">/{{item.alias}}</span></div>
                                        <div class='headerRightBot'>{{item.honor}}</div>

                                    </div>
                                </div>
                                <div class='more' @click='moreClick(item,index)' v-if='item.centerIsshow==true'> 更多详情 </div>
                                <div class='takeUp' @click='takeUpClick(item,index)'  v-if='item.centerIsshow==false'>收起</div>
                                <div class='centent'>
                                    <div class='cententQiut' :class="{cententActive:item.centerIsshow==true}">
                                        {{item.introduce}}
                                    </div>

                                </div>

                            </div>
                            <div class="loadMore">
                                这里有分页
                            </div>
                        </div>

                    </div>
                    <!------------------>
                    <!-- ----其他---- -->
                    <div  class='Other' v-if="!!objData.customContent">
                        <div class='activityArrangementItem'><span></span>其他<span></span></div>
                        <!--互文本内容-->
                        <div v-html="objData.customContent" class="homeBoxItemTenContent">
                        </div>
                    </div>
                    <!-- ---------- -->
                    <div class='mattersNeedingAttention mattersNeedingAttentionFoot' v-if="objData.matters">
                        <span>注意事项：</span> {{objData.matters}}
                    </div>
                </div>
         </div>


    </div>


</template>
<script>
    export default {
        props:['previewparameter'],
        components:{
        },
        data() {
            return {
                guests:[],
                objData:{},
                sizeIndex:0,  // 选中的下标
                size:['320*568','360*640','375*677','414*736','375*812','411*731','411*823','768*1024'], // 尺寸
                sizeBoxStyle:{width:'320px',height:'568px'},
            }

        },
        methods: {
            sizeClick(i){ //选中的尺寸
                this.sizeIndex = i;
                console.log(this.previewBigShow)
                switch (i){
                    case 0: this.sizeBoxStyle={width:'320px',height:'568px'}
                         break;
                    case 1: this.sizeBoxStyle={width:'360px',height:'640px'}
                        break;
                    case 2: this.sizeBoxStyle={width:'375px',height:'677px'}
                        break;
                    case 3: this.sizeBoxStyle={width:'414px',height:'736px'}
                        break;
                    case 4: this.sizeBoxStyle={width:'375px',height:'812px'}
                        break;
                    case 5: this.sizeBoxStyle={width:'411px',height:'731px'}
                        break;
                    case 6: this.sizeBoxStyle={width:'411px',height:'823px'}
                        break;
                    case 7: this.sizeBoxStyle={width:'768px',height:'1024px'}
                       break;
                    default:this.sizeBoxStyle={width:'320px',height:'568px'}

                }

            }
        },


        mounted() {
        },
        created(){
            console.log(this.previewparameter)
            if(this.previewparameter.scheduleList&&this.previewparameter.scheduleList.length>0){
                this.previewparameter.scheduleList.forEach((item,index)=>{
                    if(item.children&&item.children.length>0){
                        item.children.forEach((item1,index1)=>{
                            if(item1.honoredGuestList&&item1.honoredGuestList.length>0){
                                item1.honoredGuestList.forEach((item2,index2)=>{
                                    this.guests.push(item2);
                                })
                            }
                        })
                    }
                    if(item.honoredGuestList&&item.honoredGuestList.length>0){
                        item.honoredGuestList.forEach((item1,index1)=>{
                            this.guests.push(item1);
                        })
                    }
                })
            }

            this.previewparameter.hosts = this.previewparameter.hosts.split(",");
            this.previewparameter.organizers = this.previewparameter.organizers.split(",");
            this.previewparameter.coOrganizers = this.previewparameter.coOrganizers.split(",");
            this.objData = this.previewparameter;
        }
    }
</script>
<style>
    #htmlV h1{
        width:100%;
        text-align: center;
        font-size: 14px;
        font-weight: 900;
    }
</style>
<style lang="scss" scoped>
    #addpreview{
        width: 100%;
        min-height: 568px;
        overflow: hidden;
        >ul{
            display: inline-block;
            float: left;
            width: 70px;
            height: 100%;
            border: 1px solid #41bdc7;
            border-bottom: 0;
            >li{
                line-height: 50px;
                text-align: center;
                line-height: 50px;
                border-bottom:1px solid  #41bdc7;
            }
            >li:hover{
                background: #41bdc7;
                cursor: pointer;
            }
            >li.active{
                background: #41bdc7;
            }
        }
        >.addpreviewBox{
             position: relative;
             overflow: hidden;
            border: 1px solid #eaeaea;
            border-radius: 3px;
                .addpreviewContent{
                    width: 100%;
                    height: 100%;
                    background: #ffffff;
                    overflow-y:auto ;
                    padding: 15px;
                    box-sizing: border-box;
                    .homeBoxItem{
                        width: 100%;
                        padding-bottom: 10px;
                    .homeBoxItemImg{
                        width: 100%;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                        .homeBoxItemOne{
                            width: 100%;
                            font-size:18px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(5,5,9,1);
                            line-height:19px;
                            margin-top:15px;
                            padding-bottom: 15px;
                            border-bottom:1px solid rgba(223,223,223,1);
                        }
                        .homeBoxItemTwo,.homeBoxItemFour{
                            width: 100%;
                            height: 50px;
                            border-bottom:1px solid rgba(223,223,223,1);
                            font-size:12px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(5,5,9,1);
                            line-height:50px;
                            img{
                                display: inline-block;
                                width: 18px;
                                height: 18px;
                                transform: translateY(2px);
                                margin-right: 11px;
                            }
                        }
                        .homeBoxItemThree{
                            width: 100%;
                            height: 50px;
                            border-bottom:1px solid rgba(223,223,223,1);
                            font-size:12px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(5,5,9,1);
                            line-height:50px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                            position: relative;
                            img{
                                display: inline-block;
                                width:18px;
                                height: 18px;
                                /*transform: translateY(-0.14rem);*/
                                margin-right: 11px;
                            }
                            .a{
                                width: 52px;
                                padding-left: 10px;
                                display: inline-block;
                                position: absolute;
                                right: 0;
                                top:0;
                                background: #FFFFFF;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(153,153,153,1);
                                img{
                                    transform:translateY(5px) ;
                                }
                            }
                        }
                        .homeBoxItemFive{
                            width: 100%;
                            margin-top: 19px;
                            div{
                                font-size:14px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(5,5,9,1);
                                line-height: 19px;
                                width: 100%;
                                position: relative;
                                span:first-child{
                                    display: inline-block;
                                    width: 80px;
                                    font-family:PingFangSC-Regular;
                                    font-weight:400;
                                    color:rgba(102,102,102,1);
                                    position: absolute;
                                    left: 0%;
                                    top:0;
                                }
                            }
                            .homeBoxItemFiveLeft{
                                display: block;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(102,102,102,1);
                                margin-left: 80px;
                            }
                        }
                }
                    .homeBoxItemTen{
                        width: 100%;
                        background: #FFFFFF;
                        padding-bottom:10px ;
                        .homeBoxItemTenContent{
                            width: 90%;
                            margin: 0 auto;
                            box-sizing: border-box;
                            word-break:break-all;
                            white-space:pre-wrap;
                            p{
                                width: 100%;
                                overflow: hidden;
                            }
                        }
                    }
                    .homeBoxItem1{
                        width: 100%;

                        margin-top: 10px;
                        background: #FFFFFF;
                        padding: 26px 0;
                        .activityArrangementItem{
                            width: 96%;
                            margin: 0 2%;
                            text-align: center;
                            font-size:17px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:#050509;
                            line-height:21px;
                            position: relative;
                            span:nth-child(1){
                                display: inline-block;
                                height:14px;
                                width: 2px;
                                background: #050509;
                                position: absolute;
                                left: 33%;
                                top:3px;
                            }
                            span:nth-last-child(1){
                                display: inline-block;
                                height: 14px;
                                width: 2px;
                                background: #050509;
                                position: absolute;
                                right: 33%;
                                top: 0.03rem;
                            }
                        }
                        .activityArrangementItem1{
                            width: 94%;
                            margin: 0 3%;
                            background: #FAFAFA;
                            margin-top: 20px;
                            padding: 11px;
                            box-sizing: border-box;

                        }

                        .activityArrangementItemBox{
                            display: flex;
                        }
                        .activityArrangementItem1Leftcenter{
                            width: 100%;
                            text-align: center;
                            margin: 5px 0;
                            color: #999999;
                        }
                        .activityArrangementItem1RightA{
                            width: 100%;
                            background: #DFDFDF;
                            border-radius: 4px;
                            padding: 10px;
                            box-sizing: border-box;
                        }
                        .activityArrangementItem1RightB{
                            width: 100%;
                            background: rgba(5, 5, 9, 0.03);
                            border-radius: 4px;
                            margin-top: 10px;
                            padding: 10px;
                            box-sizing: border-box;
                        }
                        .activityArrangementItem1Left{
                            width: 40px;
                            padding: 20px 17px 0 0;
                            font-size:14px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(5,5,9,1);
                            line-height:17px;
                            border-right: 1px solid #DFDFDF;
                            position: relative;
                            img{
                                display: inline-block;
                                width: 14px;
                                height: 14px;
                                position: absolute;
                                right: -7px;
                                top: 20px;
                            }
                        }
                        .activityArrangementItem1Right{
                            flex: 1;
                            padding: 20px 0 0 13px;
                            .value{
                                font-size:15px;
                                font-family:PingFangSC-Medium;
                                font-weight:500;
                                color:rgba(5,5,9,1);
                                line-height:20px;
                                margin-bottom: 16px;
                            }
                            .name{
                                font-size:14px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(5,5,9,1);
                                line-height:20px;
                            }
                            .founder{
                                font-size:14px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(153,153,153,1);
                                line-height:20px;
                                margin-bottom: 16px;
                            }
                            .position{
                                font-size:14px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(153,153,153,1);
                                line-height:20px;
                                img{
                                    display: inline-block;
                                    width: 11px;
                                    height: 13px;
                                    margin-right: 6px;
                                }
                            }
                        }
                    }
                    /* ----------------------- */
                    .guestIntroductionItem{
                        width: 94%;
                        margin: 0 3%;
                        margin-top: 26px;
                        .guestIntroductionItem1{
                            width: 100%;
                            padding: 21px 15px;
                            box-sizing:border-box;
                            border:  1px solid #050509;
                            border-radius: 2px;
                            margin-top: 15px;
                            .guestIntroductionItem1Box{
                                overflow: hidden;
                                width: 100%;
                                border-bottom: 0.01rem solid #EEEEEE;
                                position: relative;
                                margin-bottom:  10px;
                                padding-bottom: 10px;
                                .header{
                                    width: 100%;
                                    display: flex;
                                    height:60px;
                                    .headerLeft{
                                        width: 60px;
                                        height:60px;
                                        img{
                                            display: inline-block;
                                            width: 60px;
                                            height:60px;
                                            border-radius: 50%;
                                        }
                                    }
                                    .headerRight{
                                        flex: 1;
                                        height: 40px;
                                        padding: 10px;
                                        .headerRightTop{
                                            width: 100%;
                                            span:nth-child(1){
                                                font-size:14px;
                                                font-family:PingFangSC-Medium;
                                                font-weight:500;
                                                color:rgba(5,5,9,1);
                                                line-height:20px;
                                            }
                                            span:nth-child(2){
                                                font-size:14px;
                                                font-family:PingFangSC-Medium;
                                                font-weight:500;
                                                color:rgba(153,153,153,1);
                                                line-height:20px;
                                            }
                                        }
                                        .headerRightBot{
                                            font-size:14px;
                                            font-family:PingFangSC-Regular;
                                            font-weight:400;
                                            color:rgba(153,153,153,1);
                                            line-height:20px;
                                        }
                                    }
                                }
                                .centent{
                                    width: 100%;
                                    margin: 17px 0;
                                    .cententActive{
                                        height: 60px;
                                        position: relative;
                                        font-size:12px;
                                        font-family:PingFangSC-Regular;
                                        font-weight:400;
                                        line-height: 20px;
                                        color:rgba(5,5,9,1);
                                        outline: none;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        overflow: hidden;
                                        -webkit-box-orient: vertical;
                                        text-overflow: ellipsis;

                                    }
                                    div:nth-child(2){

                                        width: 100%;
                                        height: 1px;
                                        margin-top: 30px;
                                        background: #DFDFDF;
                                    }
                                    .cententQiut{
                                        font-size:12px;
                                        font-family:PingFangSC-Regular;
                                        font-weight:400;
                                        color:rgba(5,5,9,1);
                                        position: relative;
                                    }
                                }
                                .more{
                                    font-size:12px;
                                    font-family:PingFangSC-Regular;
                                    font-weight:400;
                                    color:rgba(5,5,9,1);
                                    line-height:20px;
                                    position: absolute;
                                    right: 0;
                                    bottom: 5px;
                                    color:rgba(24,139,246,1);
                                    text-decoration:underline;
                                }

                                .takeUp{
                                    font-size:12px;
                                    font-family:PingFangSC-Regular;
                                    font-weight:400;
                                    color:rgba(24,139,246,1);
                                    margin-left: 14px;
                                    text-decoration:underline;
                                    line-height:20px;
                                    position: absolute;
                                    right: 0;
                                    bottom: 10px;

                                }
                            }
                        }
                    }
                    .Other{
                        width: 100%;
                        margin-top: 20px;
                    }
                    /* ------------------------------ */
                    .mattersNeedingAttention{
                        width: 94%;
                        margin: 0 3%;
                        font-size:12px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:16px;
                        border:1px solid #DFDFDF;
                        border-radius:2px;
                        background: #FFFFFF;
                        margin-top: 11px;
                        padding: 10px;
                        box-sizing: border-box;
                        span{
                            font-size:12px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(5,5,9,1);
                            line-height:16px;
                        }
                    }

                    /* ----------------------- */
            }

        }


        .activityArrangementItem{
            width: 96%;
            margin: 0 2%;
            text-align: center;
            font-size:17px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:#050509;
            line-height:21px;
            position: relative;
        }
        .loadMore{
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #999999;
            font-size: 14px;
            text-align: center;
            margin-top: 5px;
        }
        .brief{
            width: 100%;
            line-height: 24px;
            font-size: 12px;
            color: #999999;
        }
    }
</style>


