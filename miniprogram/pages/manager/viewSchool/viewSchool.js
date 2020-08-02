// miniprogram/pages/manager/viewSchool/viewSchool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // school: [{
    //     id: 1,
    //     name: '广大教院网校',
    //     schoolID: '0001',
    //     Num: [55, 78],
    //   },
    //   {
    //     id: 2,
    //     name: '广大外文网校',
    //     schoolID: '0002',
    //     Num: [55, 78],
    //   },
    //   {
    //     id: 3,
    //     name: '企通网校',
    //     schoolID: '0003',
    //     Num: [57, 78],
    //   }
    // ],
    bottomtext: '------到底啦------',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp()
    const db = wx.cloud.database()
    let that = this
    wx.cloud.callFunction({
      name: 'getSchoolInfo',
      // 传递给云函数的参数
      data: {},
      success: res => {
        console.log("【manager/viewSchool查询数据库networkSchool】", res)
        that.setData({
          school: res.result[0]
        })
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        // ...
      }
    })
    // db.collection('networkSchool').get()
    //   .then(function(res) {
    //     console.log("【manager/viewSchool查询数据库networkSchool】", res)
    //     that.setData({
    //       school: res.data
    //     })
    //   }).catch(function(err) {
    //     console.log(err);
    //   })
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