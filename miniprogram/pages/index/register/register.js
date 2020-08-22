// miniprogram/pages/index/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro:'欢迎注册以伴小程序，学生主要针对中小学生，而志愿者则针对大学生哦~'
  },

  jumpTo:function (e) {
    var identity=e.currentTarget.dataset.identity
    if(identity=='student'){
      wx.navigateTo({
        url: '../../my/login/login',
        complete: (res) => {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
    else if(identity=='teacher'){
      wx.navigateTo({
        url: '../../join/join',
        complete: (res) => {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
    else if(identity=='sponsor'){
      wx.navigateTo({
        url: '../../sponsor/binding/binding',
        complete: (res) => {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
    else{
      wx.navigateTo({
        url: '../../ambassador/ambassador',
        complete: (res) => {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
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