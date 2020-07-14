// miniprogram/pages/ambassador/ambassador.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: "",
    bindingCode: ""
  },

  getInfo: function (e) {
    const app = getApp()
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("【授权后获取用户信息】", e.detail.userInfo)
          app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
        }
      }
    })
  },

  formSubmit: function (e) {
    let input = e.detail.value
    const app = getApp()
    let that = this
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请先授权！',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return
        } else if (input.tel == "" || input.bindingCode == "") {
          wx.showToast({
            title: '信息填写不完整~',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return
        } else {
          wx.cloud.callFunction({
            name: 'bindTeacher',
            data: {
              openid: app.globalData.openid,
              bindingCode: input.bindingCode,
              tel: input.tel
            }
          }).then(function (res) {
            if (res.result == '绑定成功！') {
              wx.showToast({
                title: res.result,
                icon: 'success',
                mask: true,
                duration: 1500,
                success: function () {
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                title: res.result,
                icon: 'none',
                mask: true,
                duration: 1500
              })
            }

          }).catch(function (err) {
            console.log(err)
          })
        }
      }
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