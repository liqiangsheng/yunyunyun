<template>
  <div id="commonProblem">
    <div class="commonProblem_box" ref="scrollBox" v-if="lisrData.length>0">
      <ul class="commonProblem_ul">
        <li v-for="(item,index) in lisrData">
          <div class="commonProblem_title">{{$moment(item.trackTime).format('YYYY/MM/DD HH:mm:ss')}}</div>
          <div class="commonProblem_message" :class="{avtive:item.senderId==userInfo.data.id}">
            <img class="commonProblem_you_img" v-if="item.senderId!=userInfo.data.id" :src="item.senderUrl?item.senderUrl:'https://pub.qinius.butongtech.com/defultphoto.png'" alt="">
            <div class="commonProblem_you" v-if="item.senderId!=userInfo.data.id"><div v-if="item.content" v-html="item.content"></div><img :src="item.url" alt="" v-if="item.url"></div>
            <div class="commonProblem_me" v-if="item.senderId==userInfo.data.id"><div v-if="item.content" v-html="item.content"></div><img :src="item.url" alt="" v-if="item.url"></div>
            <img class="commonProblem_me_img"  v-if="item.senderId==userInfo.data.id" :src="item.senderUrl?item.senderUrl:'https://pub.qinius.butongtech.com/defultphoto.png'" alt="">
          </div>
        </li>
        <div class="messageFoot" @click="updataMore" v-if="lisrData.length>0">
          {{message}}
        </div>
      </ul>

    </div>
    <div v-else class="lengthFalse">
      <img src="/static/images/queshengtu.png" alt="">
      <p>你的个人意见区目前空空也～</p>
    </div>

     <div class="commonProblem_input" @click="footClick" v-if="lisrData.length>0">
        <div class="commonProblem_img">
          <img src="/static/images/people.png" alt=""  disabled="disabled">
        </div>
       <div class="commonProblem_text">
         <input type="text" v-model="messageValue" ref="pathClear"/>
       </div>
       <div class="commonProblem_sendBox">
         <!--<div class="commonProblem_send" @click="sendClick">发送</div>-->
         <div class="commonProblem_send">发送</div>
         <div class="commonProblem_sendImg">发送图片</div>
       </div>
     </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { suggestionTrackListOwner } from '../../../assets/js/promiseHttp';
  export default {
  data(){
    return{
      p:1,
      s:20,
      userInfo:{},
      pageNum:0,
      message:"",
      messageValue:"", //意见的内容
      lisrData:[],
    }
  },
  created() {
  this.$nextTick(function(){
      window.onscroll = function(){ //监听滚动高度

        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      }
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(this.userInfo,"this.userInfo")
    suggestionTrackListOwner(this.userInfo.data.access_token,this.p,this.s).then(res=>{
      if(res.status ==true){
        this.pageNum = Math.ceil(res.total/this.s);
        if(this.pageNum>1){
          this.message = "点击加载更多..."
        }else{
          this.message = "这是我的底线..."
        }
        res.data.forEach((item,index)=>{
          item.content = item.content.replace(/(\r\n)|(\n)/g,'<br>')
          item.content = '<p>'+item.content+'</p>'

        })
        console.log(res.data,"sxjfksdjk")
        this.lisrData = res.data;
      }else{
        Toast("网络出错啦，请重试")

      }
    })

  },
  methods:{
    footClick(){//点击编辑
        this.$emit('sheetVisibleT',true);
    },

    okClick(){

    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        suggestionTrackListOwner(this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status == true){
            this.message = "这是我的底线..."

            this.lisrData = this.lisrData.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        suggestionTrackListOwner(this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status == true){
            this.message = "点击加载更多..."
            this.lisrData =  this.lisrData.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
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
    bottom: 0.5rem;
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
              div{
                padding: 0.05rem 0.1rem;
                box-sizing: border-box;
                display: block;
                background: #ffffff;
                font-size:0.14rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height:0.24rem;
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
              }

              img{
                display: block;
                max-width: 1rem;
                float: right;
                margin-top: 0.1rem;
              }
            }
            .commonProblem_you{ //左
              flex: 1;
              margin-left: 0.1rem;
              div{
                width: 100%;
                padding: 0.05rem 0.1rem;
                box-sizing: border-box;
                display: block;
                background: #ffffff;
                font-size:0.14rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(5,5,9,1);
                line-height:0.24rem;
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
              }
              img{
                display: block;
                max-width: 1rem;
                margin-top: 0.1rem;
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
  .lengthFalse{
    width: 100%;
    padding-top: 1rem;
    img{
      display: block;
      margin: 0 auto;
      width: 1rem;
      height: 0.94rem;
    }
    p{
      width: 100%;
      text-align: center;
      line-height: 0.5rem;
      font-weight:400;
      color:rgba(153,153,153,1);
      margin-top: 0.2rem;
    }
  }
.messageFoot{
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  color: rgba(5,5,5,0.3);
  text-align: center;
  margin-top: 0.1rem;
}
</style>
