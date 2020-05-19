// miniprogram/pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    day: 1,
    swiperList: [],
    three: [{
      title: "知识储备站",
    }, {
      title: "升学梦工厂",
    }, {
      title: "以伴课堂",
    }],
    i: 0,
    x: 0,
    clientHeight: 0,
    knowledgeReserve: [{
      url: "../display/artical/artical",
      image: "../../images/learningMethod.png",
      left: "学科学习法",
    }, {
      url: "../display/artical/artical",
      image: "../../images/LearningMaterials.png",
      left: "学习资料分享",
    }, {
      url: "../display/artical/artical",
      image: "../../images/experienceSharing.png",
      left: "高考心得分享",
    }],
    dreamFactory: [{
      url: "../display/artical/artical",
      image: "../../images/learningMethod.png",
      left: "选科资讯",
    }, {
      url: "../dreamFactory/schoollist/schoollist",
      image: "../../images/LearningMaterials.png",
      left: "高校资讯",
    }, {
      url: "../display/artical/artical",
      image: "../../images/experienceSharing.png",
      left: "专业了解",
    }],
    companionClass: [{
      url: "../display/classroom/classroom",
      image: "../../images/learningMethod.png",
      left: "精品课堂",
    }, {
      url: "../display/classroom/classroom",
      image: "../../images/LearningMaterials.png",
      left: "学霸讲座",
    }],

    havematch: false,
    haveteacher: true,
    fuwu: true,
  },
  changeSwipe: function(e) {
    var adress = (e.detail.current == 0) ? "知识储备站" : ((e.detail.current == 1) ? "升学梦工厂" : "以伴课堂");
    console.log("目前在", adress);
    var type = e.detail.current;
    this.setData({
      i: type
    });
  },
  tabSelect: function(e) {
    /*获取可视窗口宽度*/
    var w = wx.getSystemInfoSync().windowWidth;
    var leng = this.data.three.length;
    var i = e.target.dataset.i;
    var disX = (i - 2) * w / leng;
    if (i != this.data.i) {
      this.setData({
        i: e.target.dataset.i
      })
    }
    this.setData({
      x: disX
    })
  },
  cardSwiper: function(e) {
    this.setData({
      cardCur: e.detail.current,
    })
  },


  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });


    /**
     * 获取openid并存入全局变量中，同时查询个人信息是否存在
     * 存在则放入全局变量中，并设置isNew为false
     * 不存在则只设置isNew为true
     * isNew也存入全局变量中
     */
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getOpenid',
    }).then(res => {
      console.log('【index调用云函数getOpenid返回值】', res.result)
      app.globalData.openid = res.result.openid

      //获取openid成功后获取个人信息
      wx.cloud.callFunction({
        name: 'getUserInfo',
        data: {
          openid: res.result.openid
        }
      }).then(res => {
        console.log('【index调用云函数getUserInfo返回值】', res.result)
        if (res.result.length == 0) {
          app.globalData.isNew = true
          app.globalData.isMatch = false
        } else {
          this.getDays(res.result[0].registerDate)
          app.globalData.userInfo = res.result[0]
          app.globalData.isNew = false
          if (res.result[0].matchInfo != null) {
            app.globalData.isMatch = true
            app.globalData.matchInfo = res.result[0].matchInfo
          } else {
            app.globalData.isMatch = false
          }
          app.globalData.name = res.result[0].name

          /**
           * 通过判断isMatch和isTeacher(是否已是志愿者老师)来决定顶部选项卡的显示
           */
          var list = [];

          if (app.globalData.isMatch == true) {
            var item = {};
            item.id = 0;
            item.big_title = "已提交匹配登记";
            item.title = "高考陪伴公益行";
            item.small_title = "对教育资源较为落后的四五线城市高中生进行“一对一高考陪伴”，助力高中生考上理想的大学院校！";
            item.button = "查看登记";
            item.url = "../matching/result/result";
            list.push(item)
          } else {
            var item = {};
            item.id = 0;
            item.big_title = "寻找你的以伴老师";
            item.title = "高考陪伴公益行";
            item.small_title = "对教育资源较为落后的四五线城市高中生进行“一对一高考陪伴”，助力高中生考上理想的大学院校！";
            item.button = "开始匹配";
            item.url = "../matching/matching";
            list.push(item)
          }
          if (this.data.fuwu == true) {
            var item = {};
            item.id = 1;
            item.big_title = "伴学服务介绍";
            item.title = "服务介绍细则";
            item.small_title = "“一对一高考陪伴”服务有着明确的服务对象，如您对伴学服务感兴趣，可查看具体介绍";
            item.button = "具体介绍";
            item.url = "../matching/introduce/introduce";
            list.push(item)
          }
          if (res.result[0].job == 0) {
            var item = {};
            item.id = 2;
            item.big_title = "已为伴学志愿者";
            item.title = "一起迈向公益之路";
            item.small_title = "只要你有足够的热情，想为公益事业做出一份自己的贡献，都可以申请成为以伴志愿者！";
            item.button = "查看学生信息";
            item.url = "../matching/introduce/introduce";
            list.push(item)
            that.setData({
              swiperList: list,
            })
          } else {
            var item = {};
            item.id = 2;
            item.big_title = "成为伴学志愿者";
            item.title = "一起迈向公益之路";
            item.small_title = "只要你有足够的热情，想为公益事业做出一份自己的贡献，都可以申请成为以伴志愿者！";
            item.button = "加入我们";
            item.url = "../matching/introduce/introduce";
            list.push(item)
            that.setData({
              swiperList: list,
            })
          }
        }
      })
    }).catch(err => {
      console.log('appjs获取openid失败')
    })


  },

  //计算相隔天数
  getDays: function(date) {
    date = new Date(date)
    var d1 = Date.parse(date)
    var d2 = Date.parse(new Date())
    var d = d2 - d1
    var days = Math.ceil(d / (24 * 3600 * 1000))
    this.setData({
      day: days
    })
  },

  bindChange: function(e) {
    var adress = (e.detail.current == 0) ? "知识储备站" : ((e.detail.current == 1) ? "升学梦工厂" : "以伴课堂");
    var that = this;
    that.setData({
      i: e.detail.current
    });
  },

  //跳转个人信息页面
  jumpToMyPage: function() {
    if (app.globalData.isNew) {
      console.log('【index】用户未注册，跳转注册页面')
      wx.navigateTo({
        url: '/pages/my/login/login',
        fail: (res) => {
          console.log('【index页面跳转注册界面失败】,res')
        },
        success: (result) => {},
      })
    } else {
      console.log('【index】用户已注册，跳转我的页面')
      wx.navigateTo({
        url: '/pages/my/my',
        fail: (res) => {
          console.log('【index页面跳转我的个人信息界面失败】,res')
        },
        success: (result) => {},
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})