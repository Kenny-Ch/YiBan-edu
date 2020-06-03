// miniprogram/pages/decompress/heart/question/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // question: {
    
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let that = this
    const db = wx.cloud.database()
    await db.collection('question').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【detail调用数据库question】", res)
        that.setData({
          'context': res.data.question,
          'officialAnswer': res.data.officialAnswer,
          'answer': res.data.answer
        })
      })
      .catch(function(err) {
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