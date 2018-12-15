<template>
  <div id="commonProblem">
    <div class="commonProblem_box" ref="scrollBox">
      <ul class="commonProblem_ul">
        <li v-for="(item,index) in lisrData">
          <div class="commonProblem_title">{{item.time|formatTime1}}</div>
          <div class="commonProblem_message" :class="{avtive:item.state==true}">
            <img class="commonProblem_you_img"  v-if="item.state==false" :src="item.url" alt="">
            <div class="commonProblem_you" v-if="item.state==false"><p v-if="item.type==1">{{item.value}}</p><img :src="item.value" alt="" v-if="item.type==2"></div>
            <div class="commonProblem_me" v-if="item.state==true"><p v-if="item.type==1">{{item.value}}</p><img :src="item.value" alt="" v-if="item.type==2"></div>
            <img class="commonProblem_me_img"  v-if="item.state==true" :src="item.url" alt="">
          </div>
        </li>
      </ul>
    </div>

     <!--<div class="commonProblem_input" @click="footClick">-->
        <!--<div class="commonProblem_img">-->
          <!--<img src="/static/images/people.png" alt=""  disabled="disabled">-->
        <!--</div>-->
       <!--<div class="commonProblem_text">-->
         <!--<input type="text" v-model="messageValue" ref="pathClear"/>-->
       <!--</div>-->
       <!--<div class="commonProblem_sendBox">-->
         <!--&lt;!&ndash;<div class="commonProblem_send" @click="sendClick">发送</div>&ndash;&gt;-->
         <!--<div class="commonProblem_send">发送</div>-->
         <!--<div class="commonProblem_sendImg">发送图片</div>-->
       <!--</div>-->
     <!--</div>-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'commonProblem',
  data(){
    return{
      actions:[{ name:"请下载不同Tech App提意见" },{ name:"iOS",method:this.IOS },{ name:"Android",method:this.Android }],//下载地址
      sheetVisible:false, //是否显示弹框
      messageValue:"", //意见的内容
      lisrData:[
        {time:1541111115484123,url:"./static/images/people.png",state:false,value:"都是根本就发斯蒂芬根深蒂固",type:1},
        {time:1541111115484123,url:"./static/images/people.png",state:true,value:"./static/images/zhifubao.jpg",type:2},
        {time:1541111115484123,url:"./static/images/people.png",state:true,value:"./static/images/11111.jpg",type:2},
        {time:1541111115484123,url:"./static/images/people.png",state:false,value:"./static/images/活动.png",type:2},
        {time:1541111115484123,url:"./static/images/people.png",state:true,value:"你好，感谢反馈意见！如果可以，请附上界面截屏， 以便我们查看问题～",type:1},
        {time:1541111115484123,url:"./static/images/people.png",state:false,value:"你好，我想请问一下，为什么我发布的作品不见了？如截图！～",type:1},
      ],
    }
  },
  created() {
  this.$nextTick(function(){
    window.onscroll = function(){ //监听滚动高度

      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
       }
  })
  },
  methods:{
    footClick(){//点击编辑
        this.sheetVisible = true;
    },
    IOS(){
      location.href="https://itunes.apple.com/cn/app/id1439775835"
    },
    Android(){
      location.href="https://www.pgyer.com/designcloud"
    },
    okClick(){

    },
    sendClick(){//发送
      if(this.messageValue==""){
        Toast("内容不能为空！")
        return
      }
      this.lisrData.push({time:1541111115484123,url:"./static/images/people.png",state:false,value:this.messageValue,type:1});
      this.messageValue = "";
      this.$refs. pathClear.value =''
    }
  }
}

</script>

<style scoped lang="less">
#commonProblem{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom:0;overflow: hidden;
  border-top: 0.01rem solid #eeeeee;
  box-sizing: border-box;
  .commonProblem_box{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    overflow: hidden;
      .commonProblem_ul{
       width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 0.15rem;
        box-sizing: border-box;
        li{
          width: 100%;
          overflow: hidden;
          .commonProblem_title{
            height: 0.5rem;
            width:100%;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height: 0.5rem;
            text-align: center;
          }
          .commonProblem_message{
            float: left;
            width: 80%;
            display: flex;
            .commonProblem_you_img{
              width: 0.4rem;
              height: 0.4rem;
              display: block;
              border-radius: 50%;
            }
            .commonProblem_me_img{
              width: 0.4rem;
              height: 0.4rem;
              display: block;
              border-radius: 50%;
            }

            .commonProblem_me{ //右
              flex: 1;

              margin-right: 0.1rem;
              p{
                padding: 0.05rem 0.1rem;
                box-sizing: border-box;
                display: block;
                background: #ffffff;
                font-size:0.14rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height:0.24rem;
              }
              img{
                display: block;
                max-width: 1rem;
                float: right;
              }
            }
            .commonProblem_you{ //左
              flex: 1;
              margin-left: 0.1rem;
              p{
                padding: 0.05rem 0.1rem;
                box-sizing: border-box;
                display: block;
                background: #ffffff;
                font-size:0.14rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height:0.24rem;
              }
              img{
                display: block;
                max-width: 1rem;
              }
            }
          }
          .commonProblem_message.avtive{
            float: right;
          }
        }
      }
  }

  .commonProblem_input{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.49rem;
    background: #ffffff;
    display: flex;
    border-top: 0.01rem solid #EEEEEE;
    .commonProblem_img{
      width: 0.4rem;
      height: 0.49rem;
      box-sizing: border-box;

      img{
        display: block;
        width: 0.3rem;
        height: 0.3rem;border-radius: 50%;
        margin: 0.1rem 0.05rem;
      }
    }
    .commonProblem_text{
      width: 2rem;
      height:0.37rem;
      margin-top: 0.06rem;

      input{
        width: 100%;
        height: 0.35rem;
        border: 0.01rem solid #EEEEEE;
        border-radius: 0.175rem;
        outline: none;
        text-indent: 0.12rem;
      }
    }
    .commonProblem_sendBox{
      flex: 1;
      padding-left: 0.1rem;
      .commonProblem_send{
        margin-top: 0.05rem;
        width: 0.35rem;
        height: 0.35rem;
        line-height: 0.35rem;
        border-radius: 50%;
        text-align: center;
        font-size: 0.12rem;
        float: left;
        border: 0.01rem solid #EEEEEE;
        margin-right: 0.1rem;
      }
      .commonProblem_sendImg{
        float: left;
        font-size: 0.12rem;
        padding: 0 0.05rem;
        width: 0.6rem;
        height: 0.35rem;
        line-height: 0.35rem;
        margin-top: 0.05rem;
        border: 0.01rem solid #EEEEEE;
        border-radius: 0.04rem;
        text-align: center;
      }
    }
  }
}
</style>
