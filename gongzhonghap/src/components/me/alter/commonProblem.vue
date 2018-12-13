<template>
  <div id="commonProblem">
      <ul class="commonProblem_ul">
         <li v-for="(item,index) in lisrData">

         </li>
      </ul>
     <div class="commonProblem_input">
        <div class="commonProblem_img">
          <img src="/static/images/people.png" alt="">
        </div>
       <div class="commonProblem_text">
         <input type="text" v-model="messageValue"/>
       </div>
       <div class="commonProblem_sendBox">
         <div class="commonProblem_send">发送</div>
         <div class="commonProblem_sendImg">发送图片</div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'commonProblem',
  data(){
    return{
      messageValue:"", //意见的内容
      lisrData:[
        {time:"1541111115484123",url:"./static/images/people.png",state:false},
      ],
    }
  },
  created() {

  },
  methods:{
    okClick(){

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
  bottom:0;
  background: #ffffff;
  overflow-y: auto;
  border-top: 0.01rem solid #eeeeee;
  box-sizing: border-box;
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
