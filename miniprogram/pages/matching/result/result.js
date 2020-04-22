// miniprogram/pages/matching/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      name:'小明',
      school:'华南师范大学',
      major:'软件工程',
      subject:['语文','数学','英语'],
    },
    {
      name:'小宏',
      school:'华南师范大学',
      major:'英语',
      subject:['语文','政治','英语'],
    },
    {
      name:'小东',
      school:'华南师范大学',
      major:'应用数学',
      subject:['数学','物理','英语'],
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var that = this
    // wx.cloud.callFunction({
    //   name: 'uploadMatchInfo',
    //   data: {
    //     'weakSubject': that.data.sub_fra,
    //     'willCheckIn': that.data.punch,
    //     'willMeeting': that.data.class,
    //     'willGetAlong': that.data.getAlong,
    //     'habitAndPlan': that.data.custom,
    //     'expection': that.data.willing

    //   },
    //   success: function (res) {
    //     console.log(res.result)
    //   },
    //   fail: console.error
    // })

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