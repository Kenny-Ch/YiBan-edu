// miniprogram/pages/ambassador/invitedStudents/invitedStudents.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"暂时无邀请的学生",
    student:[
    //{
    //   name:'小马',
    //   perInfo:{
    //     school:'林伟华中学',
    //     grade:'高二',
    //   },
    //   registerDate:'Mon Aug 03 2020 18:49:18 GMT+0800 (中国标准时间)'
    // },
    ],
    jump:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //const inviteCode = app.globalData.inviteCode
    const inviteCode = options.inviteCode
    var that = this
    wx.cloud.callFunction({
      name: 'getInvitedStu',
      data: {
        inviteCode:inviteCode
      }
    }).then(res => {
      that.setData({
        student:res.result
      })
    }).catch(err=>{
      console.log('获取邀请的学生失败')
      wx.showToast({
        title: '加载失败，请稍候再试',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function () {
        }
      })
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