// miniprogram/pages/decompress/heart/heart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  jump: function(res) {
    const app = getApp()
    let url = res.currentTarget.dataset.url
    if (app.globalData.isNew) {
      wx.showToast({
        title: '请先注册！',
        icon: 'none',
        duration: 1500,
        success: function () {
          wx.redirectTo({
            url: '../../my/login/login',
          })
        }
      })
      return
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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