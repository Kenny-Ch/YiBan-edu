// miniprogram/pages/my/officialAccount/officialAccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introduction:'以伴教育提供的在线公益高考升学陪伴服务，包括一对一伴学、网络教育系统、以伴课堂三大板块，强调同龄人间无沟通障碍的“陪伴式”“经验式”“高效率”教学，与在校课堂互为补充、相辅相成。',
    QR:'cloud://yiban-edu.7969-yiban-edu-1301806073/yibangzh.jpg',
    shuoming: '可扫描二维码关注以伴公众号哦',
  },
  previewImage: function(e) {
    wx.previewImage({
      urls: e.target.dataset.url.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
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