// miniprogram/pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      
    },
    // list:[{
    //   icon:'../../images/my/tongxunlu.png',
    //   title:'个人信息'
    // },{
    //   icon:'../../images/my/fankuiheyan.png',
    //   title:'问题与反馈'
    // },{
    //   icon:'../../images/my/shoucang.png',
    //   title:'我的收藏'
    // }],
    appId: "wx8abaf00ee8c3202e",
    extraData: {
      // 把1221数字换成你的产品ID，否则会跳到别的产品
      id: "144926",
      // 自定义参数，具体参考文档
      customData: {
        customInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
      }
    },
    jumpUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



    //判断是不是新用户
    if (app.globalData.isNew) {
      this.setData({
        jumpUrl: 'login/login'
      })
    } else {
      let identity = ''
      if (app.globalData.userInfo.job == 0) 
        identity = '学生'
      else if (app.globalData.userInfo.job == 1)
        identity = '老师'
      else
        identity = ''
      this.setData({
        userinfo: {
          name: app.globalData.userInfo.name,
          url: this.data.userinfo.url,
          identity: identity
        },
        jumpUrl: 'information/information'
      })

    }
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