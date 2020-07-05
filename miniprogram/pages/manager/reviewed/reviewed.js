// miniprogram/pages/manager/reviewed/reviewed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    three: [{
      //normal
      title: "树洞评论",
    }, {
      //study
      title: "文章评论",
    }, {
      //method
      title: "视频评论",
    }],
    i: 0,
    x: 0,
    bottomtext: '------到底啦------',
    tree: {
      page: 1,
      haveReviewed: []
    },
    artical: {
      page: 1,
      haveReviewed: []
    },
    video: {
      page: 1,
      haveReviewed: []
    }
  },
  changeSwipe: function(e) {
    var adress = this.data.three[e.detail.current].title;
    console.log("目前在", adress);
    var type = e.detail.current
    this.setData({
      i: type
    })
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
    console.log("目前在", this.data.three[e.detail.current].title);
    var that = this;
    let i = e.detail.current
    let type = ''
    if (i == 0) {
      type = 'tree'
    } else if (i == 1) {
      type = 'artical'
    } else {
      type = 'video'
    }
    that.setData({
      i: i,
      page: 1,
      type: type
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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