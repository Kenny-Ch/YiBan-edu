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

  submitTree: function(e) {
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
          success: function() {
            setTimeout(function() {
              var pages = getCurrentPages(); //当前页面栈
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
                let date = new Date()
                //此方法返回的month从0开始计算月份，因此+1
                let month = date.getMonth() + 1
                let day = date.getDate()
                if (month <= 9)
                  month = '0' + month
                if (day <= 9)
                  day = '0' + day
                let data = {}
                data._id = res.result._id
                data.openid = app.globalData.openid
                data.username = app.globalData.wxname
                data.liuyan = that.data.context
                data.dianzan = 0
                data.pinglun = 0
                data.contextId = res.result._id
                data.time = date.getFullYear() + '-' + month + '-' + day
                data.userimg = app.globalData.userInfo.avatarUrl
                data.isAnonymous = that.data.check
                data.isLike = false

                beforePage.onChangeList(data); //触发父页面中的方法
                wx.navigateBack({
                  delta: 1
                })
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