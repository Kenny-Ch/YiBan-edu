// miniprogram/pages/sponsor/managerSponsor/managerSponsor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:{
      name:'万校计划',
      ID:'0001',
      time:'2020/07/18',
      introduce:'圣诞节圣诞节和大家圣诞节圣诞节',
      tutor:[220,20],
      student:[220,21]
    },
  },
  jump: function(res) {
    let url = res.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
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