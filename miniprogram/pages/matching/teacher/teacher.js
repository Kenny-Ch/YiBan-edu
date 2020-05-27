// miniprogram/pages/matching/teacher/teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      img: '../../../images/my/touxiang.jpg',
      name: '李桂明',
      school: '华南师范大学软件学院',
      subject: ['数学', '英语', '语文'],
      introduce: '分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。作为用户和产品之间的桥梁，社交分享在产品的发展过程中扮演了',
      QR: '../../../images/QR.jpg',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this
    const db = wx.cloud.database()
    db.collection('person').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【teacher查询数据库person】", res)
        for (let i in res.data.perInfo.speciality)
          res.data.perInfo.speciality[i] = that.changeLanguage(res.data.perInfo.speciality[i])
        that.setData({
          user: res.data
        })
      })
      .catch(function(err) {
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