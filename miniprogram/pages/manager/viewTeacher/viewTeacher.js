  // miniprogram/pages/manager/viewTeacher/viewTeacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:[
      {
        id:1,
        name:'李桂明',
        school:'华南师范大学',
        major:'软件工程',
        subject:['语文','数学','英语'],
      },
      {
        id:2,
        name:'李桂明',
        school:'华南师范大学',
        major:'软件工程',
        subject:['语文','数学','英语'],
      },
      {
        id:3,
        name:'李桂明',
        school:'华南师范大学',
        major:'软件工程',
        subject:['语文','数学','英语'],
      }
    ],
  },
  delete:function(e){
    wx.showModal({
      title: '提示',
      content: '确认要删除该志愿者教师?',
      success: function (res) {
       if (res.confirm) {
        console.log('用户点击确定')
       } 
       else if (res.cancel) {
        console.log('用户点击取消')
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