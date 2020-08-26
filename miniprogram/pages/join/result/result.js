// miniprogram/pages/join/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: true,
    QR: 'cloud://yiban-edu.7969-yiban-edu-1301806073/community/growUp.png',
    shuoming: '请尽快加入以伴志愿者面试群聊，以便快速通过审核。',
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: e.target.dataset.url.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    let that = this
    wx.cloud.downloadFile({
      fileID: 'cloud://yiban-edu.7969-yiban-edu-1301806073/networkSchoolQR/' + app.globalData.userInfo.schoolID + '.jpg', // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res)
        that.setData({
          QR: res.tempFilePath
        })
      },
      fail: console.error
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