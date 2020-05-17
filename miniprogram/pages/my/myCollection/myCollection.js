// miniprogram/pages/my/myCollection/myCollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    three: [{
      title: "文章",
    }, {
      title: "视频",
    }
    ],
    i: 0,
    x: 0,
    common: [{
     title:'如何正确高效科学学习语文',
     time:'2020/05/15',
    }, {
      title:'如何正确高效科学学习语文',
     time:'2020/05/15',
    }, {
      title:'如何正确高效科学学习语文',
     time:'2020/05/15',
    }, {
      title:'如何正确高效科学学习语文',
     time:'2020/05/15',
    }, {
      title:'如何正确高效科学学习语文',
      time:'2020/05/15',
    }],
  },
  changeSwipe: function(e) {
    console.log("目前在", e.detail.current);
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