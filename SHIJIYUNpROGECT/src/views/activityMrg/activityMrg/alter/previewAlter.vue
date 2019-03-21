<template>
    <!--预览-->
    <div id="previewBox">
          <ul>
              <li style="background: #c4e3f3;color: #41bdc7">尺寸</li>
               <li v-for="(item,index) in size" :class="{active:index === sizeIndex}"@click="sizeClick(index)">{{item}}</li>
          </ul>
        <!---->
        <div class="sizeBox" :style="sizeBoxStyle" v-if="previewBigShow === '标准型'" >
            <img :src="backgroundUrl" alt="">
            <div class="sizelogin">
                <p>手机号码 <span style="color: orange">*</span></p>
                <el-input v-model="phoneNum" disabled></el-input>
                <p class="verificationCode">
                    <el-input v-model="phoneNum" disabled placeholder="请输入验证码"></el-input>
                    <button>获取验证码</button>
                </p>
                 <button class="sizeloginBnt">提交</button>
            </div>
            <div class="sizeFoot">
                {{signup.describe}}
            </div>
        </div>
        <!---->
        <div class="sizeBox1" :style="sizeBoxStyle1"  v-if="previewBigShow === '海报型'">
            <img :src="backgroundUrl1" alt="">
            <div class="sizelogin">
                <p style="color: #FFFFFF">手机号码 <span style="color: orange">*</span></p>
                <el-input v-model="phoneNum" disabled></el-input>
                <p class="verificationCode">
                    <el-input v-model="phoneNum" disabled placeholder="请输入验证码"></el-input>
                    <button>获取验证码</button>
                </p>
                <button class="sizeloginBnt">提交</button>
            </div>
        </div>


    </div>


</template>
<script>

    export default {
        props:['previewBigShow','backgroundUrl','backgroundUrl1','signup'],
        components:{
        },
        data() {
            return {
                footText:"粉红色的尽快发货快速的反馈收到了疯狂拉升的快乐发发送的拉菲拉斯打开了疯狂拉升的疯狂老师的上课",
                phoneNum:"18565890306", //手机号码
                verificationCode:"888888", //手机验证码
                sizeIndex:0,  // 选中的下标
                size:['320*568','360*640','375*677','414*736','375*812','411*731','411*823','768*1024'], // 尺寸
                sizeBoxStyle:{width:'320px',height:'568px'},
                sizeBoxStyle1:{width:'320px',height:'568px',background:'url(../../../../../static/images/loginBg.jpg) no-repeat center'},
            }

        },
        methods: {
            sizeClick(i){ //选中的尺寸
                this.sizeIndex = i;
                console.log(this.previewBigShow)
                switch (i){
                    case 0: this.sizeBoxStyle={width:'320px',height:'568px'}
                             this.sizeBoxStyle1={width:'320px',height:'568px'}
                         break;
                    case 1: this.sizeBoxStyle={width:'360px',height:'640px'}
                             this.sizeBoxStyle1={width:'360px',height:'640px'}
                        break;
                    case 2: this.sizeBoxStyle={width:'375px',height:'677px'}
                            this.sizeBoxStyle1={width:'375px',height:'677px'}
                        break;
                    case 3: this.sizeBoxStyle={width:'414px',height:'736px'}
                            this.sizeBoxStyle1={width:'414px',height:'736px'}
                        break;
                    case 4: this.sizeBoxStyle={width:'375px',height:'812px'}
                             this.sizeBoxStyle1={width:'375px',height:'812px'}
                        break;
                    case 5: this.sizeBoxStyle={width:'411px',height:'731px'}
                             this.sizeBoxStyle1={width:'411px',height:'731px'}
                        break;
                    case 6: this.sizeBoxStyle={width:'411px',height:'823px'}
                             this.sizeBoxStyle1={width:'411px',height:'823px'}
                        break;
                    case 7: this.sizeBoxStyle={width:'768px',height:'1024px'}
                             this.sizeBoxStyle1={width:'768px',height:'1024px'}
                       break;
                    default:this.sizeBoxStyle={width:'320px',height:'568px'}
                              this.sizeBoxStyle1={width:'320px',height:'568px'}

                }

            }
        },


        mounted() {
        },
        created(){
//            if(this.previewBigShow =='标准型'){
//
//            }else{
//                this.sizeBoxStyle1={width:'320px',height:'568px',background:'url('+this.backgroundUrl1+') no-repeat center;background-size:100% 100%'}
//            }
            console.log(this.previewBigShow,"previewBigShow")
            console.log(this.signup,"signup")
            console.log(this.backgroundUrl1,"signup")
            console.log(this.backgroundUrl,"signup")
        }
    }
</script>
<style lang="scss">
    #previewBox{
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
        >.sizeBox{
            margin-left: 10px;
            border: 1px solid #41bdc7;
            border-radius: 4px;
            float: left;
            display: inline-block;
            min-width: 320px;
            max-width: 768px;
            min-height: 568px;
            max-height: 1024px;
            img{
                display: inline-block;
                width: 90%;
                height: 30%;
                border: 1px solid #41bdc7;
                margin: 3% 5%;
            }
            >.sizelogin{
                width: 90%;
                margin: 0 5%;
                height: 35%;
                >p{
                    width: 100%;
                    font-size: 16px;
                    >span{
                        display: inline-block;
                        transform: translateY(3px);
                    }
                }
                >.verificationCode{
                    position: relative;
                    button{
                        border: 0;
                        background: #41bdc7;
                        color: #FFFFFF;
                        height: 40px;
                        position: absolute;
                        right: 0;
                        top:0;
                        border-radius: 0 4px 4px 0;
                    }

                }
                >.sizeloginBnt{
                    width: 100%;
                    height: 40px;
                    border: 0;
                    background:#41bdc7 ;
                    color: #FFFFFF;
                    border-radius: 4px;
                }
            }
            >.sizeFoot{
                text-indent: 20px;
                width: 90%;
                margin: 0 5%  ;
                height: 25%;
                border: 1px solid #41bdc7 ;
                border-radius: 4px;
                overflow-y: auto;
                -ms-overflow-y: auto;
            }

        }
        .sizeBox1{
            margin-left: 10px;
            border: 1px solid #41bdc7;
            border-radius: 4px;
            float: left;
            display: inline-block;
            min-width: 320px;
            max-width: 768px;
            min-height: 568px;
            max-height: 1024px;
            position: relative;
            img{
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            >.sizelogin{
                position: absolute;
                left: 5%;
                top: 30%;
                width: 90%;
                height: 35%;
                >p{
                    width: 100%;
                    font-size: 16px;
                    >span{
                        display: inline-block;
                        transform: translateY(3px);
                    }
                }
                >.verificationCode{
                    position: relative;
                    button{
                        border: 0;
                        background: #41bdc7;
                        color: #FFFFFF;
                        height: 40px;
                        position: absolute;
                        right: 0;
                        top:0;
                        border-radius: 0 4px 4px 0;
                    }

                }
                >.sizeloginBnt{
                    width: 100%;
                    height: 40px;
                    border: 0;
                    background:#41bdc7 ;
                    color: #FFFFFF;
                    border-radius: 4px;
                }
            }
        }


    }
</style>
<style lang="scss" scoped="">

</style>

