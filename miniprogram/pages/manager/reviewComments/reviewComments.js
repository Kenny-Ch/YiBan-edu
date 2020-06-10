// miniprogram/pages/manager/reviewComments/reviewComments.js
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
    toBeReviewed: [
    // {
    //   name: '李桂明',
    //   time: '2020-06-07 11:12:13',
    //   pinglun: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。用户分享内容到社交媒体或好友。',
    // }],
    // haveReviewed: [{
    //   name: '李桂明',
    //   time: '2020-06-07 11:12:13',
    //   pinglun: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。用户分享内容到社交媒体或好友。',
    //   adopt: true, //已通过
    // }, {
    //   name: '李桂明',
    //   time: '2020-06-07 11:12:13',
    //   pinglun: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。用户分享内容到社交媒体或好友。',
    //   adopt: false, //不通过
    // }
  ],
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
    this.loadComment(type, 1)
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
    this.loadComment('tree', 1)
  },

  loadComment: function(type, index) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        comment: true,
        like: false,
        store: false,
        type: 2,
        inteType: type,
        check: 0,
        page: index,
        num: 10
      }
    }).then(function(res) {
      console.log(res)
      that.setData({
        page: that.data.page + 1
      })
      wx.hideLoading()
    }).catch(function(err) {
      console.log(err)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //防止还未加载却多次上拉的情况
    if (!this.loading) {
      this.loadComment(this.data.type, this.data.page)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})