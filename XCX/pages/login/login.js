// pages/login/login.js
var Base64 = require("../../js/common.js");
var apiDomian = require("../../js/api.js");
let BASE = Base64.Base64();
let API = apiDomian.apidmain();

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenModal:true,//注册
    code:"获取验证码",
    telCode:"",
    isShow:true,
    codeNum:60,
    telValue:"", // 登录手机
    psdValue: "",// 登录验证码
    titleText:"登录你的设计，精彩你的生活",
    hidden:true,
    nocancel: false,
    msg: "引言\n    \n不同重视用户隐私信息的保护，您在使用不同提供的网络服务和产品时，不同可能会收集和使用您的相关信息。不同希望通过本政策向您说明不同可能会收集的信息（包括收集方式）、收集这些信息的用途、及您如何保护这些信息的安全等。请您在使用不同所有产品及服务前，仔细阅读本政策，并确定了解我们对您个人信息的处理规则。如您对本隐私协议有任何疑问，可联系我们进行咨询，如您不同意本隐私协议中的任何条款，您应立即停止使用不同提供的网络服务和产品。一旦您选择使用或在不同更新本隐私政策后（不同会及时提示您更新的情况）继续使用不同提供的网络服务和产品，即表示您认可并接受本政策（含更新版本）的所有内容，并同意不同按本政策收集、使用、保存和共享您的相关信息。    \n目录    \n一、我们可能收集的个人信息    \n二、我们收集信息的用途及使用规则    \n三、我们如何使用Cookie及相关技术    \n三、我们如何进行信息的共享、转让及披露    \n四、我们如何保护和保持您的个人信息    \n五、您如何管理个人信息    \n六、未成年人信息保护    \n七、本政策如何更新及适用范围    \n八、联系我们    \n一、    我们可能收集的信息    \n个人信息，是指以电子或者其他方式记录的能够单独或者与其他信息结合识别自然人个人身份的各种信息，包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码等。    \n为了向您提供更完善、更优质的服务，我们可能会收集以下信息：    \n1、登录信息    \n您在登录账户或使用不同提供的网络服务和产品时，经您的同意和确认后不同可能会收集您所提供的相关个人信息，例如帐号名称、头像和手机号码等，提供上述信息并同意用户协议和本政策后，您可以使用不同的核心业务功能，包括：浏览不同内的内容、发布提问、评论、评价等。    \n2、位置信息    \n当您开启设备定位功能并使用我们基于位置提供的相关服务时，我们会收集有关您位置的信息。该信息属于敏感信息，拒绝提供该信息仅会使您无法使用与位置信息相关的功能，但不影响您正常使用不同的其他功能。    \n3、关键词信息    \n当您使用不同提供的搜索服务时，我们会收集您的查询关键字信息、设备信息等，为了提供高效的搜索服务，这些信息有部分会暂时存储在您的本地存储设备之中。该等关键词信息通常无法单独识别您的个人身份，不属于您的个人信息，不在本政策的限制范围内。只有当您的搜索关键词信息与您的其他信息互有联系并可以识别您的个人身份时，则在结合使用期间，我们会将您的搜索关键词信息作为您的个人信息，与您的搜索历史记录一同按照本政策对其进行处理与保护。    \n4、真实身份信息    \n当您使用不同提供的身份认证服务时，我们会收集您的姓名、身份证号、职业、有关身份证明等信息。如果您不提供这些信息，我们将无法提供相关服务。    \n5、联系方式信息    \n当您向不同进行帐号申诉或参与营销活动时，为了方便与您联系或帮助您解决问题，我们会收集并记录您的姓名、手机号码、电子邮件及其他联系方式等个人信息。如您拒绝提供上述信息，我们可能无法向您及时反馈投诉结果或向您邮寄礼品（如有）。    \n6、日志信息    \n当您使用不同服务时，我们可能会自动收集相关信息并存储为服务日志信息。    \n6.1设备信息    \n例如，设备型号、操作系统版本、唯一设备标识符、电池、信号强度等信息。    \n6.2软件信息    \n例如，软件的版本号、浏览器类型。为确保操作环境的安全或提供服务所需，我们会收集有关您使用的移动应用和其他软件的信息。    \n6.3 IP地址    \n6.4服务日志信息    \n例如，您在使用我们服务时搜索、查看的信息、服务故障信息、引荐网址等信息。    \n6.5通讯日志信息    \n例如，您在使用我们服务时曾经通讯的账户、通讯时间和时长。    \n7、其他用户分享的信息中含有您的信息    \n例如，其他用户发布的照片或分享的视频中可能包含您的信息。    \n8、从第三方合作伙伴获取的信息    \n我们可能会获得您在使用第三方合作伙伴服务时所产生或分享的信息。例如，您使用微信或QQ帐户登录第三方合作伙伴服务时，我们会获得您登录第三方合作伙伴服务的名称、登录时间，方便您进行授权管理。    \n二、    我们收集信息的用途及使用规则    \n（一）我们能将所收集的信息用作下列用途    \n1、在不同提供的网络服务和产品时，用于身份验证、客户服务、安全防范、存档和备份等用途，确保不同向您提供的产品和服务的安全性。    \n2、保证为您所提供的产品或服务功能的正常实现。    \n3、改善不同现有产品和服务，提升用户体验。    \n4、帮助不同设计新产品和服务。    \n5、不同可能使用您的相关信息，向您提供与您更加相关的推广信息。不同也可能使用您的信息，通过不同的服务、电子邮件或其他方式向您发送营销信息，提供或推广不同或第三方的商品和服务。如您不希望不同将您的个人信息用作前述用途，您可以通过不同相关产品或服务中提供的相关渠道，要求不同停止为上述用途使用您的个人信息。    \n6、软件认证或管理软件升级。    \n7、根据法律法规在如下情形收集使用您的相关信息，此种情况下无须获得您的授权：    \n7.1与国家安全、国防安全有关的；    \n7.2与公共安全、公共卫生、重大公共利益有关的；    \n7.3与犯罪侦查、起诉、审判和判决执行等有关的；    \n7.4出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；    \n7.5用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；    \n7.6为合法的新闻报道所必需的；    \n7.7学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；    \n7.8法律法规规定的其他情形。    \n8、您同意的其他用途。    \n为了让您有更好的体验、改善不同的产品和服务或为了您同意的其他用途，在符合相关法律法规的前提下，不同可能将通过某一产品或服务所收集的信息，以汇集信息或者个性化的方式，用于不同的其他产品和服务。例如，在您使用不同的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。如果不同在相关服务中提供了相应选项，您也可以授权不同将该服务所提供和储存的信息用于不同的其他服务。    \n（二）我们对您的信息使用规则    \n1、我们会根据本隐私政策的约定并为实现我们的产品或服务功能对所收集的个人信息进行使用。    \n2、在收集您的个人信息后，我们将通过技术手段对数据进行去标识化处理，去标识化处理的信息将无法识别主体。请您了解并同意，在此情况下我们有权使用已经去标识化的信息；并在不透露您个人信息的前提下，我们有权对用户数据库进行分析并予以商业化的利用。    \n3、请您注意，您在使用我们的产品或服务时所提供的所有个人信息，除非您删除或通过系统设置拒绝我们收集，否则将在您使用我们的产品或服务期间持续授权我们使用。在您注销账号时，我们将停止使用并删除您的个人信息。    \n4、我们会对我们的产品或服务使用情况进行统计，并可能会与公众或第三方共享这些统计信息，以展示我们的产品或服务的整体使用趋势。但这些统计信息不包含您的任何身份识别信息。    \n5、当我们展示您的个人信息时，我们会采用包括内容替换、匿名处理方式对您的信息进行脱敏，以保护您的信息安全。    \n6、当我们要将您的个人信息用于本政策未载明的其它用途时，或基于特定目的收集而来的信息用于其他目的时，会通过您主动做出勾选的形式事先征求您的同意。    \n三、    我们如何使用Cookie相关技术    \n使用Cookie能帮助你实现你的联机体验的个性化，你可以接受或拒绝Cookie，大多数Web浏览器会自动接受Cookie，但你通常可根据自己的需要来修改浏览器的设置以拒绝Cookie。为了让您在访问不同时能得到更好的服务，不同有时会使用Cookie以便知道哪些网站受欢迎。Cookie不会跟踪个人信息。当您登录不同时，不同亦会使用Cookie。在这种情况下，不同会收集并存储有用信息，当您再次访问不同时，我们可辨认您的身份。来自不同的Cookie只能被不同读取。如果您的浏览器被设置为拒绝Cookie，您仍然能够访问不同的大多数网页。    \n三、我们如何进行信息的共享、转让及披露    \n（一）    共享    \n1、我们不会与不同以外的任何第三方共享您的信息，但以下情况除外：    \n1.1事先获得您明确的同意或授权；    \n1.2根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供；    \n1.3在法律法规允许的范围内，为维护不同及关联方或合作伙伴、您或其他不同用户或社会公众利益、财产或安全免遭损害而有必要提供；    \n1.4 只有共享您的信息，才能实现我们的产品或服务的核心功能或提供您需要的服务；    \n1.5应您需求为您处理您与他人的纠纷或争议；   \n1.6符合与您签署的相关协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；    \n1.7基于学术研究而使用；    \n1.8基于符合法律法规的社会公共利益而使用。    \n2、不同可能会将您的个人信息与不同的关联方共享。但不同只会共享必要的个人信息，且受本隐私政策的约束。不同的关联方如要改变个人信息的处理目的，将再次征求您的授权同意。    \n3、不同可能会向合作伙伴等第三方共享您的信息，以保障为您提供的服务顺利完成。但不同仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。不同的合作伙伴无权将共享的个人信息用于任何其他用途。    \n4、对不同与之共享个人信息的公司、组织和个人，不同会要求遵守其遵守保密约定，要求他们按照不同的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。    \n5、为了遵守法律、执行或适用不同的使用条件和其他协议，或者为了保护不同、您或其他不同客户的权利及其财产或安全，比如为防止欺诈等违法活动和减少信用风险，而与其他公司和组织交换信息。不过，这并不包括违反本隐私政策中所作的承诺而为获利目的出售、出租、共享或以其它方式披露的个人信息。    \n（二）转让    \n我们不会将您的信息转让给不同以外的任何第三方，但以下情况除外：    \n1、事先获得您明确的同意或授权；    \n2、根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供；    \n3、符合与您签署的相关协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；    \n4、在涉及合并、收购、资产转让或类似的交易时，如涉及到个人信息转让，不同会要求新的持有您个人信息的公司、组织继续受本隐私政策的约束，否则, 不同将要求该公司、组织重新向您征求授权同意。    \n（三）披露    \n我们仅会在以下情况下，且采取符合业界标准的安全防护措施的前提下，才会公开披露您的信息：    \n1、您同意或授权不同披露的；    \n2、您使用共享功能的；    \n3、根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您个人信息的情况下，不同可能会依据所要求的个人信息类型和披露方式公开披露您的个人信息。在符合法律法规的前提下，当不同收到上述披露信息的请求时，不同会要求必须出具与之相应的法律文件不同对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据；    \n4、在紧急情况下，为了保护您、不同及其他用户的合法权益或公共安全及利益的；    \n5、符合不同相关产品和服务的用户协议或其他类似协议的规定。    \n四、我们如何保护和保持您的个人信息    \n1、不同采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的个人信息遭到未经授权的访问使用、修改、避免数据的损坏或丢失；不同将使用安全技术和程序监测、记录网络运行状态、网络安全事件，并采取必要的技术措施保障网络安全，以防信息的丢失、不当使用、未经授权阅览或披露。    \n2、不同会采取一切合理可行的措施，确保无关的个人信息不被收集。不同只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。    \n3、不同仅允许有必要知晓这些信息的员工、合作伙伴访问个人信息，并为此设置了严格的访问权限控制和监控机制。不同同时要求可能接触到您个人信息的所有人员履行相应的保密义务。如果未能履行这些义务，可能会被追究法律责任或被中止与不同的合作关系。    \n4、互联网并非绝对安全的环境，而且电子邮件、即时通讯、社交软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时请使用复杂密码，并注意保护您的个人信息安全。    \n五、您如何管理个人信息    \n我们将尽一切可能采取适当的技术手段，保证收集到的有关于您的个人信息的准确性，并保证及时进行更新。您也可以通过「设置」页面，按照不同的相关政策及提示，对您的个人信息进行访问、更正及删除。    \n六、未成年人信息保护    \n1、 不同非常重视未成年人个人信息的保护。如果您是18周岁以下的未成年人，在提交个人信息前，应事先得到家长或其法定监护人（以下统称为“监护人”）的同意。    \n2、不同鼓励监护人指导未成年人使用不同提供的网络服务及产品，并建议未成年人鼓励其监护人阅读本政策。    \n3、监护人应承担保护未成年人在网络环境下的隐私权的首要责任。    \n4、不同将根据国家相关法律法规保护未成年人的相关信息。    \n七、本政策如何更新及适用范围    \n1、随着法律法规的出台或修订，我们的《隐私政策》可能会发生变更。条款内容变更后，我们会以公告或站内信的形式通知您我们对条款所做的任何变更，或以其他适当方式提醒您相关内容的更新。    \n2、不同所有的产品和服务均适用本政策。针对某些特定产品和服务的特定隐私政策，将在相关产品和服务的使用协议或单独的隐私协议中特别具体说明。该等特定产品和服务的隐私条款构成本政策的一部分。如相关特定产品和服务的隐私条款与本政策有不一致之处，适用该特定产品和服务的隐私条款。    \n3、本政策仅适用于不同所收集的信息，并不适用于任何第三方提供的产品和服务或第三方的信息使用规则，例如通过不同的产品和服务而接受的第三方产品和服务（包括任何第三方网站）收集的信息，不适用本政策。不同对任何第三方使用由您提供的信息不承担任何责任。    \n八、联系我们    \n如您对本《隐私政策》内容有任何疑问、意见或建议，您可通过客服渠道联系我们，官方客服电话为： 0755-82824078，邮箱：service@butongtech.com 。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
   
    let data = wx.getStorage({ key: 'userInfo'})
    let that = this;
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ObtainCode(){//获取验证码
    var that = this;
    if (!that.data.telValue) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'success',
        duration: 2000
      })
       return
    }
   
    that.setData({
     isShow:false
   });
    var codeNum = this.data.codeNum;
     //请求数据
  
    that.CODE_FUC(that.data.telValue);
     
    var clearTime = setInterval(function(){
     codeNum--;
     that.setData({
       codeNum: codeNum
     });
      if (codeNum <= 0) {
       clearInterval(clearTime)
       that.setData({
         code: '重新发送',
         codeNum: 60,
         isShow:true,
       })
     }

 
   },1000)
  },
  loginBnt(){ //点击登录
    var that = this;
    if (!that.data.telValue){
      wx.showToast({
        title: '请填写手机号',
        icon: 'success',
        duration: 2000
      })
      return;
    } else if (!that.data.psdValue){
      wx.showToast({
        title: '请填写验证码',
        icon: 'success',
        duration: 2000
      })
      return;
    }else{
      //请求数据
      wx.request({
        url: API.apiDomain + '/apis/operation/sysUserOperation/bindMobile',
        data: { "mobile": that.data.telValue, "verifyCode": that.data.psdValue, "mobileType": "XCX" },
        method: "POST",
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        success(res) {
          console.log(res.data.status)
          if (res.data.status ==true){
            wx.setStorageSync("userInfo", res.data.data)
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },1000)
            
          }else{ 
            wx.showModal({
              showCancel:false,
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
           
          }
         
        },
        fail(res){
          wx.showToast({
            title: "未知错误",
            icon: 'success',
            duration: 2000
          })
        },
      
      })
    }
    
    //登录成功保存到本地，还回上一级
    

    
  },
  telPhone(e){ //登录的手机号
    var that = this;
    var phone = e.detail.value;

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (myreg.test(phone)){

      that.setData({
        telValue: e.detail.value
      })

    }else{
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 2000
      })
       return;

    }
    
  },
  codePsd(e){ //登录的验证码
    var that = this;
    that.setData({
      psdValue: e.detail.value
    })
  },
  loginDetail(){//查看协议
   let that = this;
    wx.showModal({
      title:"隐私政策",
      showCancel:false,
      confirmText: "我知道了",
      content:that.data.msg,
    })
  

  },
  loginDetail1() {//查看协议
    let that = this;
    wx.showModal({
      title: "用户协议",
      showCancel: false,
      confirmText: "我知道了",
      content: "一、特别提示\r\n1、在此特别提醒用户成为不同用户之前，请认真阅读本《不同用户协议》（以下简称“协议”），确保用户充分立即本协议中各条款，请审慎阅读并选择接受或不接受本协议。同意并点击确认本协议条款且登录后，才能成为不同的正式用户，并享受不同提供的各类服务。登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。若不同意本协议，或对本协议中的条款存在任何疑问，请立即停止不同用户登录程序，并可以选择不使用本APP服务。 \r\n2、本协议约定不同与用户之间关于用户协议（以下简称“协议”）的权利义务。用户是指申请、登录、使用本服务的个人、单位。本协议可由不同随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新协议条款。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用不同提供的服务，用户继续使用不同提供的服务将视为接受修改后的协议。\r\n二、服务内容\r\n1、不同是不同（深圳）科技有限公司管理的平台, 主要内容包括为用户提供设计交流互动等网络服务。 \r\n2、用户一旦登录成功, 用户有权选择合法并符合规定的字符组合作为自己的账号，并自行设置符合安全要求的密码。用户应当对以其用户帐号进行的所有活动和事件负法律责任。因用户的过失导致帐号和密码脱离用户的控制, 则由此导致的用户自身或任何第三方造成的任何损失或损害, 均应由用户自行承担责任。\r\n3、用户理解并接受不同仅提供相关的网络服务, 除此之外不相关网络服务有关的设备，如个人电脑、手机及其他不接入互联网或移动互联网有关的装置，及所需的费用，如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费，均应由用户自行负担。  \r\n三、用户使用规则\r\n1、用户在申请使用不同网络服务时, 必须对个人资料的真实性、合法性、有效性承担全部责任。同时，用户也有义务在相关资料实际变更时及时更新有关资料信息。若用户填写的信息不完整，则无法使用相关产品或服务或在使用过程中受限制。 \r\n2、用户不得冒充他人；不得利用他人名义发布任何信息；不得恶意使用登录账号导致其他用户误认，否则不同有权停止提供服务，收回其帐号并由用户自行承担法律责任。若用户有被不同封禁的先例或涉嫌虚假注册及滥用他人名义注册，及其他不能得到许可的理由，不同将拒绝其登录申请。     \r\n3、鉴于不同帐号的绑定登录方式，用户同意在登录时允许不同使用手机号码及手机设备识别码等信息用于登录。      \r\n4、用户应妥善保存帐号、密码, 避免以任何脱离用户控制的形式交由他人使用。如用户发现其帐号遭他人非法使用, 应立即通知不同。无论因何种原因导致用户帐号、密码遭他人非法使用, 均应由用户自行承担责任。     \r\n5、在用户登录及使用本服务时，不同需要搜集能识别用户身份的个人信息以便不同可以在必要时联系用户，或为用户提供更好的使用体验。不同搜集的信息包括但不限于用户的姓名、地址; 不同同意对这些信息的使用将受限于第五条用户个人隐私信息保护的约束。     \r\n6、除自行登录不同账号外，用户可以选择通过不同的账号关联系统，授权使用其合法拥有的腾讯微信、腾讯QQ、Facebook等账号登录不同。当用户以上述已有账号登录的，同样适用本协议中对账号的相关约定。      \r\n7、用户在使用不同网络服务过程中, 必须遵循以下原则:      \r\n7.1遵守中国有关的法律和法规;      \r\n7.2遵守所有网络服务有关的网络协议、规定和程序;      \r\n7.3不得为任何非法目的而使用网络服务系统;      \r\n7.4不得利用不同服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为;      \r\n7.5不得利用不同提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料;      \r\n7.6不得侵犯不同和其他任何第三方的与利权、著作权、商标权、名誉权或其他任何合法权益;      \r\n7.7不得利用不同网络服务系统进行任何不利于不同的行为;      \r\n7.8如发现任何非法使用用户帐号或帐号出现安全漏洞的情况, 应立即通告不同。      \r\n8、用户通过使用不同的过程所制作、上传、复制、发布、传播的任何内容，包括但不限于账号头像、名称、用户说明等注册信息及认证资料, 或文字、语音、图片、视频、图文等发送、回复和相关链接页面, 以及其他使用账号或本服务所产生的内容, 不得违反国家相关法律制度, 包含但不限于如下原则:      \r\n8.1反对宪法所确定的基本原则的;      \r\n8.2危害国家安全, 泄露国家秘密, 颠覆国家政权, 破坏国家统一的;      \r\n8.3损害国家荣誉和利益的;      \r\n8.4煽动民族仇恨民族歧视, 破坏民族团结的;      \r\n8.5破坏国家宗教政策, 宣扬邪教和封建迷信的;      \r\n8.6散布谣言, 扰乱社会秩序, 破坏社会稳定的;      \r\n8.7散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;      \r\n8.8侮辱或者诽谤他人, 侵害他人合法权益的;      \r\n8.9含有法律、行政法规禁止的其他内容的。      \r\n9、用户不得利用不同账号或本服务制作、上载、复制、发布、传播下干扰不同正常运营, 以及侵犯其他用户或第三方合法权益的内容:      \r\n9.1含有任何性或性暗示的;      \r\n9.2含有辱骂、恐吓、威胁内容的;      \r\n9.3含有骚扰、垃圾广告、恶意信息、诱骗信息的;      \r\n9.4涉及他人隐私、个人信息或资料的;      \r\n9.5侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的;      \r\n9.6含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。      \r\n10、如用户在使用网络服务时违反任何上述规定, 不同或其授权的人有权要求用户改正或直接采取一切必要的措施，包括但不限于更改或删除用户收藏的内容等、暂停或终止用户使用网络服务的权利，以减轻用户不当行为造成的影响。      \r\n四、服务变更、中断或终止      \r\n1、鉴于网络服务的特殊性, 用户同意不同有权根据业务发展情况随时变更、中断或终止部分或全部的网络服务而无需通知用户, 也无需对任何用户或任何第三方承担任何责任。      \r\n2、用户理解不同需要定期或不定期地对提供网络服务的平台，如互联网网站、移动网络等，或相关的设备进行检修或者维护, 如因此类情况而造成网络服务在合理时间内的中断，不同无需为此承担任何责任, 但不同应尽可能事先进行通告。      \r\n3、如发生下列任何一种情形不同有权随时中断或终止向用户提供本《协议》项下的网络服务，包括收费网络服务，而无需对用户或任何第三方承担任何责任:      \r\n3.1用户提供的个人资料不真实;      \r\n3.2用户违反本《协议》中规定的使用规则。      \r\n3.3本服务条款终止或更新时, 用户明示不愿接受新的服务条款;      \r\n3.4其它不同认为需终止服务的情况。      \r\n五、知识产权      \r\n1、不同提供的网络服务中包含的任何文本、图片、图形、音频和/或视频资料均受版权、商标和/或其它财产所有权法律的保护, 未经相关权利人同意, 上述内容均不得用于任何商业目的。      \r\n2、未经相关权利人同意，用户不得对不同上产品和服务涉及的相关网页、应用、软件等产品进行反向工程、反向汇编、反向编译等。      \r\n3、不同提供的网络服务中所包含的内容的知识产权均受法律保护，未经不同、用户或相关权利人书面允许，任何人不得以任何形式进行使用或创造相关衍生作品。      \r\n4、用户应保证在使用不同和服务时上传的文字、图片、图形、音频和/或视频资料不得侵犯任何第三方知识产权。否则，不同有权删除该侵权信息，并对此不负任何法律责任。若前述第三方提出侵权主张，均由用户自行承担责任，并保证不同不会因此而遭受任何损失。      \r\n六、隐私保护      \r\n1、保护用户隐私是不同的一项基本政策，不同保证不对外公开或向第三方提供单个用户资料及用户在使用网络服务时存储在不同的非公开内容, 但下列情况除外:      \r\n1.1事先获得用户的明确授权;      \r\n1.2根据有关的法律法规要求;      \r\n1.3按照相关政府主管部门的要求;      \r\n1.4为维护社会公众的利益;      \r\n1.5为维护不同的合法权益。      \r\n2、不同可能会和第三方合作向用户提供相关的网络服务, 在此情况下, 如该第三方同意承担不同同等的保护用户隐私的责任, 则不同有权将用户资料等提供给该第三方。      \r\n3、在不透露单个用户隐私资料的前提下不同有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。      \r\n 4、不同制定了以下四项隐私权保护原则, 指导我们如何来处理产品中涉及到用户隐私权和用户信息等方面的问题:      \r\n4.1利用我们收集的信息为用户提供有价值的产品和服务。      \r\n4.2开发符合隐私权标准和隐私权惯例的产品。      \r\n4.3将个人信息的收集透明化, 并由权威第三方监督。      \r\n4.4尽最大的努力保护我们掌握的信息。      \r\n七、免责声明      \r\n1、不同不担保网络服务一定能满足用户的要求, 也不担保网络服务不会中断, 对网络服务的及时性、安全性、准确性也都不作担保。      \r\n2、不同不保证为向用户提供便利而设置的外部链接的准确性和完整性, 同时, 对于该等外部链接指向的不由不同实际控制的任何网页上的内容不同不承担任何责任。      \r\n3、对于因电信系统或互联网网络故障、计算机故障或病毒、信息损坏或丢失、计算机系统问题或其它任何不可抗力原因而产生损失不同不承担任何责任, 但将尽力减少因此而给用户造成的损失和影响。      \r\n4、若不同已经明示其服务提供方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担。      \r\n5、用户明确同意其使用不同所存在的风险将完全由其自己承担，因其使用不同而产生的一切后果也由其自己承担。",
    })


  },
  
  make_base_auth(user, password) {  //base的加密
    var tok = user + ':' + password;
    var hash = BASE.encode(tok);
    return "Basic " + hash;
  } ,
  CODE_FUC(TEL){
    wx.request({
      url: API.apiDomain + "/apis/operation/sysUserOperation/generateMobileVerifyCode",
      method: "GET",
      data: {
        mobile: TEL,
        mobileType: "XCX"
      },
      header: {
        "Accept": "application/json", // 默认值
      },
      success: (res => {
        if (res.data.status == true) {
        wx.showToast({
          title: '短信获取成功',
          icon: 'success',
          duration: 2000
        })
        }else{
          wx.showModal({
            showCancel: false,
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      })
    })
  }, 
  gocegister (){ //去注册
   wx.navigateTo({
     url: '../../pages/register/register',
   })
  }
})