// miniprogram/pages/sponsor/managerSponsor/managerSponsor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: {
    },
  },
  jump: function(res) {
    let url = res.currentTarget.dataset.url
    let that = this
    wx.navigateTo({
      url: url + "&schoolID=" + that.data.school.schoolID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

    const db = wx.cloud.database()
    let that = this
    db.collection('networkSchool').where({
        schoolID: options.schoolID
      }).get()
      .then(function(res) {
        console.log("【sponsor/managerSponsor查询数据库networkSchool】", res)
        that.setData({
          school: res.data[0],
        })
        let month = res.data[0].date.getMonth() + 1
        let date = res.data[0].date.getFullYear() + '-' + month + '-' + res.data[0].date.getDate()
        that.setData({
          ['school.date']: date
        })
        //that.updateNetworkSchoolInfo(options)
      }).catch(function(err) {
        console.log(err)
      })
      wx.stopPullDownRefresh()
  },

  onPullDownRefresh: function() {
    var that = this
    this.onLoad({
      schoolID:that.school.schoolID
    }); //重新加载onLoad()
  },
  updateNetworkSchoolInfo: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'countMembersNum',
      data: {
        schoolID: options.schoolID
      }
    }).then(function(res) {
      console.log("【sponsor/managerSponsor查询人数信息】",res)
      if(res.result!=null)
      that.setData({
        'school.studentNum': res.result.studentNum,
        'school.volunteerNum': res.result.volunteerNum,
        'school.waitCheckTeacherNum': res.result.waitCheckTeacherNum,
        'school.waitMatchStuNum': res.result.waitMatchStuNum
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