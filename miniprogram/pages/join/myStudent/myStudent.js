// miniprogram/pages/manager/teacherMatch/teacherMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:{
      student:[                    //待审核的学生
        {
          id:1,
          name:'李桂明',
          school:'广州中学',
          grade:'高二',
          subject:['语文','数学','英语'],
        },
      ],
      studentAdopt:[                    //已通过的学生
        {
          id:2,
          name:'李桂明',
          school:'广州中学',
          grade:'高二',
          subject:['语文','数学','英语'],
        },
        {
          id:3,
          name:'李桂明',
          school:'广州中学',
          grade:'高二',
          subject:['语文','数学','英语'],
        }
      ],
    },
    
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