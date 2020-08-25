// miniprogram/pages/manager/manualMatching/manualMatching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teaTel: '',
    stuTel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  formSubmit: function (e) {
    this.setData({
      teaTel: e.detail.value.teaTel,
      stuTel: e.detail.value.stuTel
    })

    let that = this
    wx.cloud.callFunction({
      name: 'manualMatch',
      data: {
        teaTel: that.data.teaTel,
        stuTel: that.data.stuTel
      }
    }).then(function (res) {
      console.log("【manualMatching调用函数manualMatch】", res)
      wx.showToast({
        title: res.result,
        icon: 'none'
      })
    }).catch(function (err) {
      console.log(err)
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