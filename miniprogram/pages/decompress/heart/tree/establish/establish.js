// miniprogram/pages/decompress/heart/tree/establish/establish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    placeholder: '这一刻的想法......'
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

  onReplyBlur: function(e) {
    this.setData({
      context: e.detail.value
    })
  },

  submitTree: function(e) {
    const app = getApp()
    wx.cloud.callFunction({
      name: 'uploadComment',
      data: {
        'openid': app.globalData.openid,
        'name': app.globalData.name,
        'comment': that.data.context,
        'imgUrl': '',
        'isAnonymous': true
      }
    }).then(function(res) {
      console.log("【tree/establish调用函数uploadComment】【上传树洞】", res)
    }).catch(function(err) {
      console.log(err)
    })
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