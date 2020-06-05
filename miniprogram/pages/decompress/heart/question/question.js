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
    bottomtext:'------到底啦------',
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    await wx.cloud.callFunction({
      name: 'getQuestions',
      data: {
        'flag': 'pressQue',
      },
      success: function(res) {
        console.log("【question页面调用函数getQuestions】", res.result)
        var qa = [];
        for (let returndata of res.result.reverse()) {
          var hh="";
          if(returndata.officialAnswer.length>78){
            hh=returndata.officialAnswer.substring(0, 78)+"……";
          }
          else{
            hh=returndata.officialAnswer;
          }
          qa.push({
            '_id': returndata._id,
            'question': returndata.question,
            'abstract_answer': hh,
            'common': returndata.answer.length + 1,
            'tag': returndata.tag
          });
        }
        that.setData({
          common: qa
        })
        wx.hideLoading()
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