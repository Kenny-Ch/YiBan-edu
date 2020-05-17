// miniprogram/pages/decompress/heart/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    three: [{
      //normal
      title: "常见",
    }, {
      //study
      title: "学习",
    }, {
      //method
      title: "方法",
    }, {
      //life
      title: "作息",
    }, {
      //family
      title: "家庭",
    }, {
      //society
      title: "社交",
    }],
    i: 0,
    x: 0,
    common: [{
      question: '熬夜学习是否效率更高？',
      abstract_answer: '调查研究表明87%的高中生都有熬夜学习的习惯，他们认为夜深人静更利于思考问题，思维更开阔，记忆力比较深刻，比白天学习更容易吸收。 其实熬夜学习并没有白天学……',
      common: 18,
    }, {
      question: '应该连续学一个科目，还是多学科切换？',
      abstract_answer: '这个问题表面上看是一个非此即彼的回答，要么就只学一个科目，要么就连续多个科目切换。我看其他回答都建议你多个学科切换着学。但我要说的是，在不同层面上，不……',
      common: 16,
    }, {
      question: '高考到底怎样选科最科学?',
      abstract_answer: '新考高已经在浙江、上海、山东、天津、海南、广东六个省市铺开，很多人讲新高考选科的方法，都只是从选科组合未来能报专业（潜在）多少这一个点出发，这不是很严……',
      common: 15,
    }, {
      question: '偏科很严重，有些功课拉分很厉害怎么办？',
      abstract_answer: '对高考来说，强科保持以前的学习方法，确立自己的竞争优势；弱科多花点时间，回归教科书，抓基础，只要抓好了基础，就不会被拉分。',
      common: 3,
    }, {
      question: '制定的目标达不到，计划总是完不成怎么办？',
      abstract_answer: '一般来说，制定了十个计划，可以完成八个；制定八个计划，只能完成六个；制定六个最多能完成四个。有时计划赶不上变化，所以计划并不是非要拿来全部实现的，而是可……',
      common: 4,
    }],
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
    console.log(e.target.dataset.i)
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
  bindChange: function(e) {
    console.log("目前在", e.detail.current);
    var that = this;
    that.setData({
      i: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var Client = wx.getMenuButtonBoundingClientRect();
        var height = res.windowHeight - (res.statusBarHeight + Client.height + (Client.top - res.statusBarHeight) * 2)
        that.setData({
          clientHeight: res.windowHeight,
          height_sys: height - 64,
        });
      }
    });
    this.getQuestions();

  },

  getQuestions: async function() {
    var that = this
    await wx.cloud.callFunction({
      name: 'getQuestions',
      data: {
        'flag': 'pressQue',
      },
      success: function(res) {
        console.log("【question页面调用函数getQuestions】", res.result)
        var qa = [];
        for (let returndata of res.result) {
          qa.push({
            '_id': returndata._id,
            'question': returndata.question,
            'abstract_answer': returndata.officialAnswer,
            'common': returndata.answer.length + 1,
            'tag': returndata.tag
          });
        }
        that.setData({
          common: qa
        })
      },
      fail: console.error
    })
    console.log(that.data)
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