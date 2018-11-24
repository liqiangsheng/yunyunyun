<template>
    <!--新建多活动-->
    <div class="activtyAddManyBox">
        <div class="activtyAddManyItem">
           <div class="h5">大活动</div>
          <div class="activtyAddManyItemIndex">
              <el-button type="primary" plain>首页预览</el-button>
              <el-button type="primary" plain>活动详情预览</el-button>
             <el-button type="primary" plain>设置分享页</el-button>
          </div>
            <div class="activtyAddManyItemIndex1">
                <el-button type="primary" plain>提交审核</el-button>
                <el-button type="primary" plain>全部应用</el-button>
            </div>
        </div>
        <!--*-------->
        <div class="activtyAddManyItem1">
            <div></div>
            <div class="activtyAddManyItem1Left">
                   <div class="activtyAddManyItem1Left_top">
                       <span>名称</span>
                       <el-input v-model="titleValue" placeholder="请输入活动名称"></el-input>
                   </div>
                   <div class="activtyAddManyItem1Left_bot">
                       <span> 介绍</span>
                       <el-input
                               type="textarea"
                               :rows="8"
                               placeholder="请输入内容"
                               v-model="textarea">
                       </el-input>
                   </div>
            </div>
            <div  class="activtyAddManyItem1Right">
                  <div class="activtyAddManyItem1Right_top">海报</div>
                  <div class="activtyAddManyItem1Right_cnt"><img :src="srcImg" alt=""></div>
                  <div  class="activtyAddManyItem1Right_bot">
                      <a href="javascript:;" class="file"> 上传文件
                          <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                      </a>
                      <div class="ctivtyAddManyItem1Right_botSize">
                          建议尺寸750*560px或4:3, JPG、PNG格式， 图片小于5M
                      </div>
                  </div>
            </div>
        </div>
        <!-------->
        <div class="activtyAddManyItem2index1">
            <div class="h5">子活动</div>
            <div class="activtyAddManyItem2index1_cnt">
                <el-button type="primary" plain>首页预览</el-button>
                <el-button type="primary" plain>活动详情预览</el-button>
                <div class="div">（大活动内至少要有一个子活动）</div>
            </div>
        </div>
        <!------>
        <div class="activtyAddManyItemSon" v-for="(item,index) in activityArr">
            <div class="activtyAddManyItemSon1">子活动{{index+1}}</div>
            <div class="activtyAddManyItem1">
                <div class="activtyAddManyItem1Left">
                    <div class="activtyAddManyItem1Left_top">
                        <span>名称</span>
                        <el-input v-model="titleValue" placeholder="请输入活动名称"></el-input>
                    </div>
                    <div class="activtyAddManyItem1Left_bot">
                        <span> 介绍</span>
                        <el-input
                                type="textarea"
                                :rows="8"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </div>
                </div>
                <div  class="activtyAddManyItem1Right">
                    <div class="activtyAddManyItem1Right_top">海报</div>
                    <div class="activtyAddManyItem1Right_cnt"><img :src="srcImg" alt=""></div>
                    <div  class="activtyAddManyItem1Right_bot">
                        <a href="javascript:;" class="file"> 上传文件
                            <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                        </a>
                        <div class="ctivtyAddManyItem1Right_botSize">
                            建议尺寸750*560px或4:3, JPG、PNG格式， 图片小于5M
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->
        <div class="activtyAddManyItem2index2">
            <div class="activtyAddManyItem2index1_cnt">
                <el-button type="primary" plain>首页预览</el-button>
                <el-button type="primary" plain>活动详情预览</el-button>
                <el-button  class="activtyAddManyItem2index1_cntRight" type="primary" plain @click="addSinleClcik(activityArr)">新增</el-button>
            </div>
        </div>
        <!---->
    </div>
</template>


<script>

    export default {
        data() {
            return {
                activityArr:1, // 子活动
                srcImg:"/static/images/loginBg.jpg",
                textarea:"", // 内容
                titleValue:"",//名称
            }
        },

        methods: {

            addSinleClcik(e){ // 新增子活动
                this.activityArr =  e++;
            },
            onchangeFile(event){ // 上传
                let filesObj=event.target.files[0];
                let filesName=event.target.files[0].name;
                let img=event.target.parentElement;
                 console.log(filesObj)
                 console.log(filesName)
                 console.log(img)
//        let url=this.$apidomain+"/upload/kindeditorjson";
//                let url=this.$apiupdate+"/upload/kindeditorjson";
//                let param = new FormData(); // 创建form对象
//                param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
//                this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
//                    let data=res.data;
//                    if(data.error===0){
//                        img.style.background= "url("+data.url+") center center no-repeat";
//                        img.style.backgroundSize= "100% 100%";
//                        this.selectorBehindObj[keyImg]=data.url;   //参数是ajax返回的图片地址
//                        item.flag = false;
//                    }else{
//                        alert("上传失败");
//                    }
//
//                });
            },
        }
    };
</script>

<style scoped lang="scss">
 @import "../../../assets/css/activity/activityMrgAddMany.css";
</style>
