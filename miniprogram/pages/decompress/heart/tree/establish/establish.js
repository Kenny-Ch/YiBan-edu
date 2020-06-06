// miniprogram/pages/decompress/heart/tree/establish/establish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    placeholder: '这一刻的想法......',
    check: false,
  },
  radiocon: function(e) {
    this.setData({
      check: !this.data.check
    })
    console.log("是否匿名发布 ", this.data.check)
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

  bindGetUserInfo: function(res) {
    console.log("【用户授权信息】", res)
    const app = getApp()
    let that = this
    let _res = res
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请先授权！',
            icon: 'none',
            duration: 1500,
          })
          return
        } else {
          app.globalData.wxname = _res.detail.userInfo.nickName
          app.globalData.avatarUrl = _res.detail.userInfo.avatarUrl
          that.submitTree()
        }
      }
    })
  },

  submitTree: function() {
    const app = getApp()
    let that = this
    wx.cloud.callFunction({
      name: 'uploadComment',
      data: {
        'openid': app.globalData.openid,
        'imgUrl': app.globalData.userInfo.avatarUrl,
        'name': app.globalData.wxname,
        'comment': that.data.context,
        'isAnonymous': that.data.check
      }
    }).then(function(res) {
      console.log("【tree/establish调用函数uploadComment】【上传树洞】", res)
      if (res.result != null) {
        wx.showToast({
          title: '发布成功！',
          icon: 'success',
          duration: 1500,
          mask: true,
          success: function() {
            setTimeout(function() {
              var pages = getCurrentPages() //当前页面栈
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2] //获取上一个页面实例对象
                let date = new Date()
                var util = require('../../../../template/unit.js');  
                let data = {}
                data._id = res.result._id
                data.openid = app.globalData.openid
                data.username = app.globalData.wxname
                data.liuyan = that.data.context
                data.dianzan = 0
                data.pinglun = 0
                data.contextId = res.result._id
                data.time = util.formatTime(date);
                data.userimg = app.globalData.userInfo.avatarUrl
                data.isAnonymous = that.data.check
                data.isLike = false

                beforePage.onChangeList(data); //触发父页面中的方法
                wx.navigateBack({})
              }
            }, 1500)
          }
        })
      } else {
        wx.showToast({
          title: '发布失败，请重试',
          icon: 'fail',
          duration: 1000
        })
      }


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