// miniprogram/pages/matching/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      // {
      //   name: '小明',
      //   perInfo:{
      //     school: '华南师范大学',
      //     major: '软件工程',
      //     speciality: ['语文', '数学', '英语'],
      //   }    
      // },
      // {
      //   name: '小宏',
      //   perInfo:{
      //     school: '华南师范大学',
      //     major: '英语',
      //     speciality: ['语文', '政治', '英语'],
      //   }  
      // },
      // {
      //   name: '小东',
      //   perInfo:{
      //     school: '华南师范大学',
      //     major: '应用数学',
      //     speciality: ['数学', '物理', '英语'],
      //   }
      // }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const app = getApp()
    wx.cloud.callFunction({
      name: 'matchTeacher',
      data: {
        weakSubject: app.globalData.matchInfo.weakSubject
      }
    }).then(function(res) {
      console.log("matching/result调用函数matchTeacher", res)
      for (let i in res.result)
        for (let j in res.result[i].perInfo.speciality)
          res.result[i].perInfo.speciality[j] = that.changeLanguage(res.result[i].perInfo.speciality[j])
      that.setData({
        list: res.result
      })
    }).catch(function(err) {
      console.log(err)
    })

  },

  //将数据库内科目的英文转成中文显示
  changeLanguage: function(word) {
    switch (word) {
      case 'Chinese':
        word = '语文'
        break
      case 'Mathematics':
        word = '数学'
        break
      case 'English':
        word = '英语'
        break
      case 'Physics':
        word = '物理'
        break
      case 'Chemistry':
        word = '化学'
        break
      case 'Biology':
        word = '生物'
        break
      case 'Politics':
        word = '政治'
        break
      case 'History':
        word = '历史'
        break
      case 'Geography':
        word = '地理'
        break
    }
    return word
  },

  teacherDetail: function(e) {
    let that = this
    const db = wx.cloud.database()
    const app = getApp()
    let openid = e.currentTarget.dataset.openid
    console.log(e.currentTarget.dataset.openid)
    wx.showModal({
      title: '确认选择该老师？',
      content: '一旦确认，无法修改。',
      success: function(res) {
        if (res.confirm) {
          app.globalData.userInfo.matchWaitList.push(openid)
          let list = app.globalData.userInfo.matchWaitList
          wx.cloud.callFunction({
            name: 'uploadMatchList',
            data: {
              _id: app.globalData.userInfo._id,
              matchWaitList: list
            }
          }).then(function(res) {
            console.log("【matching/result调用函数uploadMatchList】", res)
            wx.navigateTo({
              url: '../teacher/teacher?id=' + openid
            })
          }).catch(function(err) {
            console.log(err)
          })
        }
      }
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