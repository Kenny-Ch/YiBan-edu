// miniprogram/pages/dreamFactory/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    major:{
      img:'cloud://yiban-edu.7969-yiban-edu-1301806073/majorlist/caiwuguanli.jpg',
      title:'财务管理（本科专业）',
      average_salary: 6357,                  //应届平均薪酬
      rate_of_employment: 83.85,                     //就业率
      industry: "房地产",              //最多去向行业
      city: "上海",              //最多去向城市
      introduce:'财务管理专业培养具备管理、经济、法律和理财、金融等方面的知识和能力，能在工商、金融企业、事业单位及政府部门从事财务、金融管理以及教学、科研方面工作的工商管理学科高级专门人才。财务管理是企业管理的一个组成部分，它是根据财经法规制度，按照财务管理的原则，组织企业财务活动，处理财务关系的一项经济管理工作。简单的说，财务管理是组织企业财务活动，处理财务关系的一项经济管理工作。财务管理是研究如何通过计划、决策、控制、考核、监督等管理活动对资金运动进行管理，以提高资金效益的一门经营管理学科。',
      contact:[
        {
          name:'李桂明',
          wechat:'121213',
        },
        {
          name:'李桂明',
          wechat:'121213',
        },
      ],
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