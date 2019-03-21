<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
    //            add(){
//                {
//                    "address": "深圳试会展中心",
//                    "aloneEntrance":false,
//                    "bannerUrl":"https://pub.qinius.butongtech.com/%E5%9B%BE-300@2x.png",
//                    "coOrganizers":"深圳市人民政府",
//                    "content":"深圳市人民政府",
//                    "customContent":"深圳市人民政府",
//                    "entranceUrl" :"http://172.16.0.55:8080/#/index",
//                    "faceDetection":false,
//                    "hosts":"深圳市人民政府",
//                    "latitude":"22.53086",
//                    "linkMan":"李强",
//                    "linkPhone":"18565890306",
//                    "longitude" :"114.06003",
//                    "multiActivity":false,
//                    "multiSection":false,
//                    "organizers" :"深圳市人民政府",
//                    "originalPrice" :"168",
//                    "parentId":"0",
//                    "payExpired":"30",
//                    "payPrice":"128",
//                    "payRemark":"没有说明",
//                    "refundRemark":"没有说明",
//                    "regionId":"2018042317050430c6a250e4044f94bb4cc074302b789a",
//                    "shareUrl":"http://172.16.0.55:8080/#/index",
//                    "signEndTime":"2019-12-19 15:30:00",
//                    "signStartTime" :"2019-12-19 06:30:00",
//                    "startTime":"2019-12-19 08:30:00",
//                    "endTime" :"2019-12-19 18:30:00",
//                    "summary" :"我不开心",
//                    "title":"测试的活动",
//                    "scheduleList" :
//                    [{
//                        "startTime":"2019-03-11 08:30:00",
//                        "endTime":"2019-03-11 10:00:00",
//                        "location":"深圳会展中心5楼簕杜鹃厅",
//                        "subject":"《站在科技与设计共生长的时代风口》",
//                        "brief":"简介",
//                        honoredGuestList: [{
//                            "honoredGuestId":"1",
//                            "sort":"1"
//                        }, {
//                            "honoredGuestId":"2",
//                            "sort":"2"
//                        }],
//                        children: [{
//                            "startTime":"2019-03-11 08:30:00",
//                            "endTime":"2019-03-11 09:00:00",
//                            "location":"深圳会展中心5楼簕杜鹃厅",
//                            "subject":"《站在科技与设计共生长的时代风口》-子安排1",
//                            "brief":"简介1",
//                            honoredGuestList: [{
//                                "honoredGuestId":"11",
//                                "sort":"11"
//                            }, {
//                                "honoredGuestId":"12",
//                                "sort":"12"
//                            }]
//                        }, {
//                            "startTime":"2019-03-11 09:00:00",
//                            "endTime":"2019-03-11 10:00:00",
//                            "location":"深圳会展中心5楼簕杜鹃厅",
//                            "subject":"《站在科技与设计共生长的时代风口》-子安排2",
//                            "brief":"简介2",
//                            honoredGuestList: [{
//                                "honoredGuestId":"21",
//                                "sort":"21"
//                            }, {
//                                "honoredGuestId":"22",
//                                "sort":"22"
//                            }]
//                        }]
//                    }]
//                }
//            }
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


