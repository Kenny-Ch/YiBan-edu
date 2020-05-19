// miniprogram/pages/matching/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        name: '小明',
        school: '华南师范大学',
        major: '软件工程',
        speciality: ['语文', '数学', '英语'],
      },
      {
        name: '小宏',
        school: '华南师范大学',
        major: '英语',
        speciality: ['语文', '政治', '英语'],
      },
      {
        name: '小东',
        school: '华南师范大学',
        major: '应用数学',
        speciality: ['数学', '物理', '英语'],
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const app = getApp()
    wx.cloud.callFunction({
      name: 'matchTeacher',
      data: {
        weakSubject: app.globalData.matchInfo.weakSubject
      }
    }).then(function(res) {
      console.log("matching/result调用函数matchTeacher", res)
      that.setData({
        list: res.result
      })
    }).catch(function(err) {
      console.log(err)
    })

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