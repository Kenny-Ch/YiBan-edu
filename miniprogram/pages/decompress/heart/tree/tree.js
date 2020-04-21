// miniprogram/pages/decompress/heart/tree/tree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id:0,
      userimg:'../../../../images/my/touxiang.jpg',
      username:'小明',
      time:'04-19',
      liuyan:'为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径……',
      dianzan:21,
      pinglun:21,
      isShowDian:false,
      isShowPing:false,
    },{
      id:1,
      userimg:'../../../../images/my/touxiang.jpg',
      username:'小明',
      time:'04-19',
      liuyan:'为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径……',
      dianzan:21,
      pinglun:21,
      isShowDian:false,
      isShowPing:false,
    },],

  },
  showDianzan: function (e) {
    var list=this.data.list;
    list[ e.currentTarget.dataset.id].isShowDian=!list[ e.currentTarget.dataset.id].isShowDian;
    this.setData({
      list:list,
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