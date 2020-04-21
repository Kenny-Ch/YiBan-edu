// miniprogram/pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    day:30,
    swiperList: [{
      id: 0,
      big_title:"寻找你的以伴老师",
      title: "高考陪伴公益行",
      small_title:"对教育资源较为落后的四五线城市高中生进行“一对一高考陪伴”，助力高中生考上理想的大学院校！",
      button:"开始匹配",
    }, {
      id: 1,
      big_title:"伴学服务介绍",
      title: "服务介绍细则",
      small_title:"“一对一高考陪伴”服务有着明确的服务对象，如您对伴学服务感兴趣，可查看具体介绍",
      button:"具体介绍",
    }],
    three:[{
      title:"知识储备站",
    },{
      title:"升学梦工厂",
    },{
      title:"以伴课堂",
    }],
    i:0,
    x:0,
    clientHeight: 0,
    knowledgeReserve:[{
      url:"../display/artical/artical",
      image:"../../images/learningMethod.png",
      left:"学科学习法",
    },{
      url:"../display/artical/artical",
      image:"../../images/LearningMaterials.png",
      left:"学习资料分享",
    },{
      url:"../display/artical/artical",
      image:"../../images/experienceSharing.png",
      left:"高考心得分享",
    }],
    dreamFactory:[{
      url:"../display/artical/artical",
      image:"../../images/learningMethod.png",
      left:"选科咨讯",
    },{
      url:"../display/artical/artical",
      image:"../../images/LearningMaterials.png",
      left:"高校资讯",
    },{
      url:"../display/artical/artical",
      image:"../../images/experienceSharing.png",
      left:"专业了解",
    }],
    companionClass:[{
      url:"../display/artical/artical",
      image:"../../images/learningMethod.png",
      left:"精品课堂",
    },{
      url:"../display/artical/artical",
      image:"../../images/LearningMaterials.png",
      left:"学霸讲座",
    }],
  },
  changeSwipe:function(e) {
    var adress=(e.detail.current==0)?"知识储备站":((e.detail.current==1)?"升学梦工厂":"以伴课堂");
    console.log("目前在",adress);
    var type =e.detail.current;
    this.setData({
      i: type
    });
  },
  tabSelect: function (e) {
    console.log(e.target.dataset.i)
    /*获取可视窗口宽度*/
  　var w=wx.getSystemInfoSync().windowWidth;
  　var leng=this.data.three.length;
  　var i = e.target.dataset.i;
  　var disX = (i - 2) * w / leng;
  　if(i!=this.data.i){
  　　this.setData({
    　　i: e.target.dataset.i
  　　})
  　}
  　this.setData({
  　　x:disX
  　})
  },
  cardSwiper: function (e) {
    this.setData({
      cardCur: e.detail.current,
    })
  },


 onLoad: function () {
  var that = this;
  wx.getSystemInfo({
   success: function (res) {
    that.setData({
     clientHeight: res.windowHeight
    });
   }
  });


   /**
    * 获取openid并存入全局变量中，同时查询个人信息是否存在
    * 存在则放入全局变量中，并设置isNew为false
    * 不存在则只设置isNes为true
    * isNew也存入全局变量中
    */
   wx.cloud.callFunction({
    // 要调用的云函数名称
    name: 'getOpenid',
  }).then(res => {
    console.log('【index调用云函数getOpenid返回值】',res)
    app.globalData.openid = res.result.openid

    //获取openid成功后获取个人信息
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data:{
        openid: res.result.openid
      }
    }).then(res => {
      console.log('【index调用云函数getUserInfo返回值】',res)
      if(res.result.length == 0){
        app.globalData.isNew = true
      } else {
        app.globalData.userInfo = res.result[0]
        app.globalData.isNew = false
      }
    })


  }).catch(err => {
    console.log('appjs获取openid失败')
  })


 },
 bindChange: function (e) {
   var adress=(e.detail.current==0)?"知识储备站":((e.detail.current==1)?"升学梦工厂":"以伴课堂");
   console.log("目前在",adress);
  var that = this;
  that.setData({ 
    i: e.detail.current 
  });
 },

 //跳转个人信息页面
 jumpToMyPage: function( ){
   wx.navigateTo({
     url: '/pages/my/my',
     fail: (res) => {
       console.log('【index页面跳转我的个人信息界面失败】,res')
     },
     success: (result) => {},
   })
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

  }
})