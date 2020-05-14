// miniprogram/pages/dreamFactory/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:{
      img:'cloud://yiban-edu.7969-yiban-edu-1301806073/schoollist/scnu.png',
      title:'华南师范大学',
      country_rank:73,
      other_rank:5,
      introduce:'华南师范大学（South China Normal University），简称“华南师大” [1]  ，校本部位于广东省广州市，是广东省人民政府和教育部共建高校，入选国家“双一流”世界一流学科建设高校 [2]  、首批国家“211工程”重点建设大学，入选国家“111计划” [3]  、“卓越教师培养计划”、广东省高水平大学整体建设高校、广东省重点大学、中国政府奖学金来华留学生接收院校、国家大学生文化素质教育基地，中国100所首批联入CERNET和INTERNET网的高校之一。',
      specail:'截至2017年6月，学校下设25个二级学院，拥有84个本科专业，学科布局覆盖哲学、经济学、法学、教育学、文学、历史学、理学、工学、农学、医学、管理学、艺术学12个门类。',
      contact:[
        {
          name:'李桂明',
          wechat:'121213',
        },
        {
          name:'李桂明',
          wechat:'121213',
        },
      ]
    },
  },
  copyText: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.wechat,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制微信号成功'
            })
          }
        })
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