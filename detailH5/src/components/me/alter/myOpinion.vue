<template>
  <div id="myOpinion">
      <ul class="myOpinion_ul">
        <li v-for="(item,index) in lisrData" class="myOpinion_li">
          <p class="myOpinion_wen">问： {{item.wen}}</p>
          <p class="myOpinion_da"><b>答：</b>{{item.da}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'myOpinion',
  data(){
    return{
      lisrData:[
        {wen:" 我不喜欢某类文章，想多看些其他类的文章怎么办？",da:"请您点击文章列表页中该文右下角的小叉号，并选择细分理由，系统会默认减少该类内容的推荐。 你可以在搜索栏搜索您感兴趣的话题或关键词， 系统会默认记住您的阅读兴趣，给您推荐更多相关内容。"},
        {wen:" 我不喜欢某类文章，想多看些其他类的文章怎么办？",da:"请您点击文章列表页中该文右下角的小叉号，并选择细分理由，系统会默认减少该类内容的推荐。 你可以在搜索栏搜索您感兴趣的话题或关键词， 系统会默认记住您的阅读兴趣，给您推荐更多相关内容。"},
        {wen:" 我不喜欢某类文章，想多看些其他类的文章怎么办？",da:"请您点击文章列表页中该文右下角的小叉号，并选择细分理由，系统会默认减少该类内容的推荐。 你可以在搜索栏搜索您感兴趣的话题或关键词， 系统会默认记住您的阅读兴趣，给您推荐更多相关内容。"},
        {wen:" 我不喜欢某类文章，想多看些其他类的文章怎么办？",da:"请您点击文章列表页中该文右下角的小叉号，并选择细分理由，系统会默认减少该类内容的推荐。 你可以在搜索栏搜索您感兴趣的话题或关键词， 系统会默认记住您的阅读兴趣，给您推荐更多相关内容。"},
        ],
    }
  },
  created() {

  },
  methods:{

  }
}

</script>

<style scoped lang="less">
#myOpinion{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom:0;
  overflow-y: auto;
  border-top: 0.01rem solid #eeeeee;
  box-sizing: border-box;
  .myOpinion_ul{
    width: 100%;
    padding-bottom: 0.15rem;
    li{
      width: 100%;
      padding: 0.15rem;
      box-sizing: border-box;
      background: #ffffff;
      margin-top: 0.15rem;
      .myOpinion_wen{
        width: 100%;
        font-size:0.14rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(5,5,9,1);
        line-height:0.24rem;
        padding-bottom: 0.1rem;
        overflow: hidden;
        border-bottom: 0.01rem solid #eeeeee;
      }
      .myOpinion_da{
        width: 100%;
        margin-top: 0.1rem;
        font-size:0.14rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(5,5,9,1);
        line-height:0.28rem;
      }
    }
  }
}
</style>
