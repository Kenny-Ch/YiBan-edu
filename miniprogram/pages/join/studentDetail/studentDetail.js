// miniprogram/pages/join/studentDetail/studentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student:{
      name:'小明',
      perInfo:{
        tel:'1342152651',
        gender:'男',
        area:['广东省','广州市','番禺区'],
        school:'广州中学',
        grade:'高一',
        qq:'82718271',
        email:'9921212@qq.com',
      },
      subject:[
        {
          name:'语文',
          score:99,
        },
        {
          name:'数学',
          score:100,
        },
        {
          name:'英语',
          score:88,
        },
      ],
      learning:'喜欢晚上学习',
      expectationForTeacher:'希望老师能给我出多一些题目 希望老师能给我出多一些题目希望老师能给我出多一些题目',
      isAdopt:false,  //是否已通过
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