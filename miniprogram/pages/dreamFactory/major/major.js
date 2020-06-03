// miniprogram/pages/dreamFactory/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // major: {
    //   img: 'cloud://yiban-edu.7969-yiban-edu-1301806073/majorlist/caiwuguanli.jpg',
    //   name: '国际经济与贸易',
    //   type: '经济学',
    //   average_salary:  4000,
    //     //应届平均薪酬
    //   rate_of_employment:   '国际经济与贸易专业毕业生中，94%的学生在毕业之前或刚刚毕业时找到工作，5%的学生在毕业1年以后实现就业。按照10分制进行计算，该专业的应届就业率指数为9.50，与其他专业相比，应届就业率指数属于中等偏上。',
    //     //就业率
    //   industry:   "市场/公关；营销人员；行政/后勤；金融/保险/投资；对外贸易人员b2b、b2c",
    //                  //最多去向行业
    //   city:   "香港；上海；深圳；广州；北京；苏州；澳门；宁波；天津；杭州",
    //                  //最多去向城市
    //   introduce: '国际经济与贸易（International Economics and Trade 或 International Business and Trade ）是大学专业，该专业培养能较系统地掌握经济学原理和国际经济、国际贸易的理论，掌握国际贸易的知识和技能的人才。了解中国对外贸易和当代国际经济贸易的发展现状，熟悉通行的国际贸易惯例与WTO规则，以及中国对外贸易的政策法规，了解主要国家与地区的对外贸易状况，能在涉外经济贸易部门、外资企业及政府机构和科研院所从事国际经济与贸易业务、管理、调研与教学科研等工作的复合型、应用型的高级专门人才。培养具有较强国际贸易实际能力，主要从事进出口业务、外贸企业管理、国际经济技术合作、跨国经营等对外经济和对外贸易活动的高级技术应用性专门人才。',
    //   contact: [{
    //       name: '李桂明',
    //       wechat: '121213',
    //     },
    //     {
    //       name: '李桂明',
    //       wechat: '121213',
    //     },
    //   ],
    // },
  },
  copyText: function(e) {
    wx.setClipboardData({
      data: e.target.dataset.wechat,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
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
  onLoad: function(options) {
    const db = wx.cloud.database()
    let that = this
    db.collection('collegeInfo').doc(options.majorId)
      .get()
      .then(function(res) {
        console.log("【major查询数据库collegeInfo】", res)
        that.setData({
          major: res.data
        })
      }).catch(function(err) {
        console.log(err)
      })
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